#!/usr/bin/env ts-node
/**
 * IM1 Questionnaire - E2E Test (5 pacientes)
 *
 * Valida:
 *  - Apnea obstructiva del sueño (NoSAS) — score calculado desde múltiples preguntas
 *  - Calidad de sueño — 5 niveles (Excelente / Buena / Regular / Mala / Terrible)
 *  - Minutos de actividad física — escala 0-100 puntos
 *  - Alcohol — diagnósticos por sexo (Hombres / Mujeres)
 *
 * Uso:
 *   npx ts-node test/im1-e2e.ts <TOKEN>
 *   npx ts-node test/im1-e2e.ts  ← usa el token definido en BEARER_TOKEN
 */

// ==============================================================
//  ► CONFIGURA EL TOKEN AQUÍ o pásalo como argumento al script
// ==============================================================
const BEARER_TOKEN: string = process.argv[2] || 'PEGA_TU_TOKEN_AQUÍ';
const BASE_URL = 'http://localhost:3001';
// ==============================================================

const POLL_INTERVAL_MS = 600;
const POLL_TIMEOUT_MS  = 20_000;

// ──────────────────────────────────────────────────────────────
// Tipos
// ──────────────────────────────────────────────────────────────
interface AnswerDef {
  answerText?:    string;
  answerValue?:   number;
  answerBoolean?: boolean;
  score?:         number;
}

interface PatientProfile {
  label:    string;
  answers:  Record<string, AnswerDef>; // key = question code
  expected: {
    nosasRisk:      'Riesgo bajo' | 'Riesgo alto';
    nosasScore:     number;
    sleepQuality:   string;   // nombre del diagnóstico esperado
    activityPoints: number;   // puntos esperados para minutos de actividad
    alcoholRisk:    string;   // nombre del diagnóstico de alcohol esperado
  };
}

type CodeToId = Record<string, string>;

// ──────────────────────────────────────────────────────────────
// Helpers HTTP
// ──────────────────────────────────────────────────────────────
function headers() {
  return {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
  };
}

async function api<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[${method} ${path}] HTTP ${res.status}: ${text}`);
  }
  const wrapper = await res.json() as { data?: T; success?: boolean } & T;
  // La API envuelve en { success, data, timestamp } o devuelve el objeto directamente
  return ('data' in wrapper && wrapper.data !== undefined) ? wrapper.data as T : wrapper as T;
}

// ──────────────────────────────────────────────────────────────
// 1. Obtener el cuestionario IM1 y mapear código → id
// ──────────────────────────────────────────────────────────────
async function fetchIM1QuestionMap(): Promise<{ questionnaireId: string; codeToId: CodeToId }> {
  console.log('\n📋 Buscando cuestionario IM1...');

  // Lista de cuestionarios con búsqueda amplia
  const list = await api<any>('GET', '/questionnaires?limit=50');
  const items: any[] = list?.data ?? list?.items ?? (Array.isArray(list) ? list : []);
  const q = items.find((x: any) => x.code === 'im1' || x.name?.includes('IM1'));

  if (!q) throw new Error('Cuestionario IM1 no encontrado. ¿Está el servidor corriendo y el seed ejecutado?');

  console.log(`   ✔ Cuestionario encontrado: "${q.name}" (id: ${q.id})`);

  // Detalle con todas las preguntas
  const detail = await api<any>('GET', `/questionnaires/${q.id}`);
  const questionnaireQuestions: any[] = detail?.questionnaireQuestions ?? [];

  if (questionnaireQuestions.length === 0) {
    throw new Error('No se encontraron preguntas en el cuestionario IM1.');
  }

  const codeToId: CodeToId = {};
  for (const qq of questionnaireQuestions) {
    const question = qq.question ?? qq;
    if (question?.code && question?.id) {
      codeToId[question.code] = question.id;
    }
  }

  console.log(`   ✔ ${Object.keys(codeToId).length} preguntas mapeadas (código → id)`);
  return { questionnaireId: q.id, codeToId };
}

// ──────────────────────────────────────────────────────────────
// 2. Construir el payload de respuestas
// ──────────────────────────────────────────────────────────────
function buildPayload(
  questionnaireId: string,
  codeToId: CodeToId,
  patient: PatientProfile,
): object {
  const answers: object[] = [];

  for (const [code, def] of Object.entries(patient.answers)) {
    const questionId = codeToId[code];
    if (!questionId) {
      // La pregunta no existe en este cuestionario — omitir sin error
      continue;
    }
    const answer: Record<string, unknown> = { questionId };
    if (def.answerText    !== undefined) answer.answerText    = def.answerText;
    if (def.answerValue   !== undefined) answer.answerValue   = def.answerValue;
    if (def.answerBoolean !== undefined) answer.answerBoolean = def.answerBoolean;
    if (def.score         !== undefined) answer.score         = def.score;
    answers.push(answer);
  }

  return { questionnaireId, answers };
}

// ──────────────────────────────────────────────────────────────
// 3. Esperar a que el procesamiento en background termine
// ──────────────────────────────────────────────────────────────
async function pollUntilDone(pqId: string): Promise<void> {
  const start = Date.now();
  process.stdout.write('   ⏳ Procesando diagnósticos');

  while (Date.now() - start < POLL_TIMEOUT_MS) {
    await sleep(POLL_INTERVAL_MS);
    process.stdout.write('.');

    const status = await api<any>('GET', `/questionnaires/patient-questionnaires/${pqId}/relations-status`);
    if (status?.relationsProcessingStatus === 'completed') {
      console.log(' ✔ completado');
      return;
    }
    if (status?.relationsProcessingStatus === 'failed') {
      console.log(' ✖');
      throw new Error(`Procesamiento fallido: ${status?.relationsProcessingError}`);
    }
  }

  console.log(' ⚠ timeout');
  throw new Error(`Timeout esperando procesamiento de diagnósticos para ${pqId}`);
}

// ──────────────────────────────────────────────────────────────
// 4. Obtener y validar diagnósticos
// ──────────────────────────────────────────────────────────────
function validateAndPrint(patient: PatientProfile, detail: any): boolean {
  const diagnostics: any[] = detail?.patientDiagnostics ?? [];

  // Aplanar en { groupName, diagnosticName, score }
  const results = diagnostics.map((pd: any) => ({
    group:       pd.diagnostic?.diagnosticGroup?.name ?? pd.diagnosticGroup?.name ?? '?',
    name:        pd.diagnostic?.name ?? '?',
    score:       Number(pd.obtainedScore ?? 0),
    severity:    pd.diagnostic?.severity ?? '?',
  }));

  // ── Helpers de búsqueda ──
  const find = (groupContains: string) =>
    results.find(r => r.group.includes(groupContains));

  let ok = true;
  const check = (label: string, actual: string | number | undefined, expected: string | number) => {
    const pass = String(actual) === String(expected);
    const icon = pass ? '✔' : '✖';
    console.log(`      ${icon} ${label}: "${actual}" ${pass ? '' : `← esperado: "${expected}"`}`);
    if (!pass) ok = false;
  };

  console.log('\n   📊 Diagnósticos generados:');
  if (results.length === 0) {
    console.log('      ⚠ No se generaron diagnósticos aún.');
    return false;
  }

  results.forEach(r =>
    console.log(`      • [${r.group}] ${r.name}  (score: ${r.score}, severity: ${r.severity})`),
  );

  console.log('\n   🔍 Validaciones:');

  // NoSAS
  const nosas = find('NoSAS');
  check('NoSAS riesgo',        nosas?.name,  patient.expected.nosasRisk + ' de apnea del sueño');
  check('NoSAS score',         nosas?.score, patient.expected.nosasScore);

  // Calidad de sueño
  const sleep = find('Calidad de sueño');
  check('Calidad sueño',       sleep?.name,  patient.expected.sleepQuality);

  // Minutos de actividad física
  const activity = find('Minutos');
  check('Actividad (puntos)',  activity?.score, patient.expected.activityPoints);

  // Alcohol
  const alcohol = find('Alcohol');
  check('Alcohol diagnóstico', alcohol?.name,  patient.expected.alcoholRisk);

  return ok;
}

// ──────────────────────────────────────────────────────────────
// 5. Perfiles de los 5 pacientes
// ──────────────────────────────────────────────────────────────
/*
 * Formato de respuestas por tipo de pregunta:
 *  SINGLE_CHOICE → answerText = label de la opción, score = score de la opción
 *  MULTIPLE_CHOICE → answerText = valores seleccionados unidos con ", " (los VALUES, no labels)
 *  SCALE  → answerText = String(valor), answerValue = valor, score = valor
 *  NUMERIC → answerText = String(valor), answerValue = valor  (sin score)
 *  TEXT / DATE → answerText = String(valor)
 */

const PATIENTS: PatientProfile[] = [

  // ────────────────────────────────────────────────────────────
  // Paciente 1 – Carlos Mendoza
  //  Hombre, 62 años, obeso (IMC 33.8), cuello 43 cm, ronquido
  //  NoSAS esperado: sexo(2)+edad>55(4)+cuello>40(4)+ronquido(2)+IMC>30(5) = 17 → ALTO
  //  Calidad sueño: 2/10 → Mala
  //  Actividad: 0 min → 0 pts
  //  Alcohol hombre: score 5 → Riesgo alto (Hombres)
  // ────────────────────────────────────────────────────────────
  {
    label: 'Carlos Mendoza (M, 62 años, obeso, roncador, mala calidad sueño)',
    answers: {
      // Datos personales
      im1_a1_1: { answerText: 'Carlos' },
      im1_a1_2: { answerText: 'Mendoza' },
      im1_a1_3: { answerText: '1963-06-15' },                          // 62 años
      im1_a1_4: { answerText: 'Masculino' },
      im1_a1_5: { answerText: 'carlos.mendoza@test.com' },
      im1_a1_6: { answerText: '+58 4141234567' },
      // Educación
      im1_a5_1: { answerText: 'Universitaria', score: 4 },
      // Socioeconómico (escala 1-10)
      im1_a6_1: { answerText: '4', answerValue: 4, score: 4 },
      // Síntomas — con ronquido
      im1_b3_1: { answerText: 'ronquido, fatiga, exceso_sueno_dia' },
      // Medidas físicas
      im1_c1_1: { answerText: 'Sí' },
      im1_c1_2: { answerText: '100', answerValue: 100 },               // peso kg
      im1_c1_3: { answerText: '172', answerValue: 172 },               // talla cm → IMC ≈ 33.8
      im1_c1_8: { answerText: 'Sí' },
      im1_c1_9: { answerText: '43', answerValue: 43 },                 // cuello > 40 cm
      // Nutrición (todos malos para variedad)
      im1_d1_1: { answerText: 'No todos los días', score: 0 },
      im1_d1_2: { answerText: 'No todos los días', score: 0 },
      im1_d1_3: { answerText: 'No todos los días', score: 0 },
      im1_d1_4: { answerText: 'No todos los días', score: 0 },
      im1_d1_5: { answerText: 'No consumo productos lácteos bajos en grasa', score: 0 },
      im1_d1_6: { answerText: 'No evito la sal y comidas procesadas', score: 0 },
      im1_d1_7: { answerText: 'Más de dos veces a la semana', score: 0 },
      im1_d1_8: { answerText: '5 o más a la semana', score: 0 },
      // Actividad física
      im1_d2_1: { answerText: 'Poco activo', score: 1 },
      im1_d2_2: { answerText: '0', answerValue: 0 },                   // 0 min → 0 pts
      // Sueño
      im1_d3_1: { answerText: '2', answerValue: 2, score: 2 },         // calidad 2/10 → Mala
      im1_d3_2: { answerText: 'Entre 5 y menos de 6 horas', score: 40 },
      im1_d3_4: { answerText: 'Casi todos los días', score: 3 },
      // Ansiedad / Depresión
      im1_d4_1: { answerText: 'Para nada', score: 0 },
      im1_d4_2: { answerText: 'Para nada', score: 0 },
      im1_d4_3: { answerText: 'Para nada', score: 0 },
      im1_d4_4: { answerText: 'Para nada', score: 0 },
      // Alcohol — score total 5 (≥4) → Riesgo alto Hombres
      im1_d5_1: { answerText: '2-4 veces al mes', score: 2 },
      im1_d5_2: { answerText: '3 o 4', score: 1 },
      im1_d5_3: { answerText: 'Mensualmente', score: 2 },
      // Tabaquismo / Drogas (no consume)
      im1_d5_4: { answerText: 'No, nunca he fumado', score: 0 },
      im1_d5_7: { answerText: 'No', score: 0 },
    },
    expected: {
      nosasRisk:      'Riesgo alto',
      nosasScore:     17,
      sleepQuality:   'Mala calidad de sueño',
      activityPoints: 0,
      alcoholRisk:    'Riesgo alto (Hombres)',
    },
  },

  // ────────────────────────────────────────────────────────────
  // Paciente 2 – María García
  //  Mujer, 34 años, IMC normal (21.3), cuello 33 cm, sin ronquido
  //  NoSAS esperado: 0 → BAJO
  //  Calidad sueño: 10/10 → Excelente
  //  Actividad: 150 min → 100 pts
  //  Alcohol mujer: score 0 → Riesgo bajo (Mujeres)
  // ────────────────────────────────────────────────────────────
  {
    label: 'María García (F, 34 años, IMC normal, sin ronquido, excelente sueño)',
    answers: {
      im1_a1_1: { answerText: 'María' },
      im1_a1_2: { answerText: 'García' },
      im1_a1_3: { answerText: '1991-07-22' },                          // 34 años
      im1_a1_4: { answerText: 'Femenino' },
      im1_a1_5: { answerText: 'maria.garcia@test.com' },
      im1_a1_6: { answerText: '+58 4249876543' },
      im1_a5_1: { answerText: 'Postgrado', score: 5 },
      im1_a6_1: { answerText: '8', answerValue: 8, score: 8 },
      // Sin ronquido en síntomas
      im1_b3_1: { answerText: 'fatiga, estres' },
      im1_c1_1: { answerText: 'Sí' },
      im1_c1_2: { answerText: '58', answerValue: 58 },                 // peso kg
      im1_c1_3: { answerText: '165', answerValue: 165 },               // talla cm → IMC ≈ 21.3
      im1_c1_8: { answerText: 'Sí' },
      im1_c1_9: { answerText: '33', answerValue: 33 },                 // cuello normal
      // Nutrición (hábitos muy saludables)
      im1_d1_1: { answerText: '3 o más al día', score: 2 },
      im1_d1_2: { answerText: '4 o más al día', score: 2 },
      im1_d1_3: { answerText: '2 o más al día', score: 2 },
      im1_d1_4: { answerText: '2 o más al día', score: 2 },
      im1_d1_5: { answerText: 'Todos los días', score: 2 },
      im1_d1_6: { answerText: 'Evita la sal y comidas procesadas', score: 2 },
      im1_d1_7: { answerText: 'No como carnes rojas o procesadas', score: 2 },
      im1_d1_8: { answerText: 'No tomo bebidas azucaradas', score: 2 },
      im1_d2_1: { answerText: 'Muy activo', score: 3 },
      im1_d2_2: { answerText: '150', answerValue: 150 },               // 150 min → 100 pts
      // Sueño excelente
      im1_d3_1: { answerText: '10', answerValue: 10, score: 10 },      // calidad 10/10 → Excelente
      im1_d3_2: { answerText: 'Entre 7 y menos de 9 horas', score: 100 },
      im1_d3_4: { answerText: 'Para nada', score: 0 },
      im1_d4_1: { answerText: 'Para nada', score: 0 },
      im1_d4_2: { answerText: 'Para nada', score: 0 },
      im1_d4_3: { answerText: 'Para nada', score: 0 },
      im1_d4_4: { answerText: 'Para nada', score: 0 },
      // Alcohol score 0 → Riesgo bajo Mujeres (≤2)
      im1_d5_1: { answerText: 'Nunca', score: 0 },
      im1_d5_2: { answerText: '1 o 2', score: 0 },
      im1_d5_3: { answerText: 'Nunca', score: 0 },
      im1_d5_4: { answerText: 'No, nunca he fumado', score: 0 },
      im1_d5_7: { answerText: 'No', score: 0 },
    },
    expected: {
      nosasRisk:      'Riesgo bajo',
      nosasScore:     0,
      sleepQuality:   'Excelente calidad de sueño',
      activityPoints: 100,
      alcoholRisk:    'Riesgo bajo (Mujeres)',
    },
  },

  // ────────────────────────────────────────────────────────────
  // Paciente 3 – Roberto Torres
  //  Hombre, 51 años, sobrepeso (IMC 27.8), cuello 41 cm, ronquido
  //  NoSAS esperado: sexo(2)+cuello>40(4)+ronquido(2)+IMC 25-30(3) = 11 → ALTO
  //  Calidad sueño: 5/10 → Regular
  //  Actividad: 90 min → 80 pts
  //  Alcohol hombre: score 3 → Riesgo bajo (Hombres) (<4)
  // ────────────────────────────────────────────────────────────
  {
    label: 'Roberto Torres (M, 51 años, sobrepeso IMC 27.8, cuello 41 cm, ronquido, regular sueño)',
    answers: {
      im1_a1_1: { answerText: 'Roberto' },
      im1_a1_2: { answerText: 'Torres' },
      im1_a1_3: { answerText: '1974-09-10' },                          // 51 años
      im1_a1_4: { answerText: 'Masculino' },
      im1_a1_5: { answerText: 'roberto.torres@test.com' },
      im1_a1_6: { answerText: '+58 4161112233' },
      im1_a5_1: { answerText: 'Secundaria', score: 3 },
      im1_a6_1: { answerText: '5', answerValue: 5, score: 5 },
      // Con ronquido
      im1_b3_1: { answerText: 'ronquido, palpitaciones, fatiga' },
      im1_c1_1: { answerText: 'Sí' },
      im1_c1_2: { answerText: '85', answerValue: 85 },                 // peso kg
      im1_c1_3: { answerText: '175', answerValue: 175 },               // talla cm → IMC ≈ 27.8
      im1_c1_8: { answerText: 'Sí' },
      im1_c1_9: { answerText: '41', answerValue: 41 },                 // cuello > 40 cm
      im1_d1_1: { answerText: '1 o 2 al día', score: 1 },
      im1_d1_2: { answerText: '1 o 2 al día', score: 1 },
      im1_d1_3: { answerText: 'No todos los días', score: 0 },
      im1_d1_4: { answerText: 'No todos los días', score: 0 },
      im1_d1_5: { answerText: 'No todos los días', score: 1 },
      im1_d1_6: { answerText: 'No evito la sal y comidas procesadas', score: 0 },
      im1_d1_7: { answerText: '1 o 2 veces a la semana', score: 1 },
      im1_d1_8: { answerText: '4 o menos a la semana', score: 1 },
      im1_d2_1: { answerText: 'Moderadamente activo', score: 2 },
      im1_d2_2: { answerText: '90', answerValue: 90 },                 // 90 min → 80 pts
      // Sueño regular
      im1_d3_1: { answerText: '5', answerValue: 5, score: 5 },         // calidad 5/10 → Regular
      im1_d3_2: { answerText: 'Entre 6 y menos de 7 horas', score: 70 },
      im1_d3_4: { answerText: 'Algunos días', score: 1 },
      im1_d4_1: { answerText: 'Algunos días', score: 1 },
      im1_d4_2: { answerText: 'Para nada', score: 0 },
      im1_d4_3: { answerText: 'Para nada', score: 0 },
      im1_d4_4: { answerText: 'Algunos días', score: 1 },
      // Alcohol score 3 → Riesgo bajo Hombres (<4)
      im1_d5_1: { answerText: '2-4 veces al mes', score: 2 },
      im1_d5_2: { answerText: '3 o 4', score: 1 },
      im1_d5_3: { answerText: 'Nunca', score: 0 },
      im1_d5_4: { answerText: 'No, nunca he fumado', score: 0 },
      im1_d5_7: { answerText: 'No', score: 0 },
    },
    expected: {
      nosasRisk:      'Riesgo alto',
      nosasScore:     11,
      sleepQuality:   'Regular calidad de sueño',
      activityPoints: 80,
      alcoholRisk:    'Riesgo bajo (Hombres)',
    },
  },

  // ────────────────────────────────────────────────────────────
  // Paciente 4 – Ana Rodríguez
  //  Mujer, 58 años, IMC normal (22.0), cuello 34 cm, sin ronquido
  //  NoSAS esperado: edad>55(4) = 4 → BAJO (<8)
  //  Calidad sueño: 10/10 → Excelente
  //  Actividad: 120 min → 90 pts
  //  Alcohol mujer: score 2 → Riesgo bajo (Mujeres) (≤2)
  // ────────────────────────────────────────────────────────────
  {
    label: 'Ana Rodríguez (F, 58 años, IMC normal, sin ronquido, excelente sueño)',
    answers: {
      im1_a1_1: { answerText: 'Ana' },
      im1_a1_2: { answerText: 'Rodríguez' },
      im1_a1_3: { answerText: '1967-04-05' },                          // 58 años → >55
      im1_a1_4: { answerText: 'Femenino' },
      im1_a1_5: { answerText: 'ana.rodriguez@test.com' },
      im1_a1_6: { answerText: '+58 4124445566' },
      im1_a5_1: { answerText: 'Postgrado', score: 5 },
      im1_a6_1: { answerText: '7', answerValue: 7, score: 7 },
      // Sin ronquido
      im1_b3_1: { answerText: 'estres, dolor_cabeza' },
      im1_c1_1: { answerText: 'Sí' },
      im1_c1_2: { answerText: '60', answerValue: 60 },                 // peso kg
      im1_c1_3: { answerText: '165', answerValue: 165 },               // talla cm → IMC ≈ 22.0
      im1_c1_8: { answerText: 'Sí' },
      im1_c1_9: { answerText: '34', answerValue: 34 },                 // cuello normal
      im1_d1_1: { answerText: '3 o más al día', score: 2 },
      im1_d1_2: { answerText: '4 o más al día', score: 2 },
      im1_d1_3: { answerText: '2 o más al día', score: 2 },
      im1_d1_4: { answerText: '1 o 2 al día', score: 1 },
      im1_d1_5: { answerText: 'Todos los días', score: 2 },
      im1_d1_6: { answerText: 'Evita la sal y comidas procesadas', score: 2 },
      im1_d1_7: { answerText: '1 o 2 veces a la semana', score: 1 },
      im1_d1_8: { answerText: 'No tomo bebidas azucaradas', score: 2 },
      im1_d2_1: { answerText: 'Moderadamente activo', score: 2 },
      im1_d2_2: { answerText: '120', answerValue: 120 },               // 120 min → 90 pts
      // Sueño excelente
      im1_d3_1: { answerText: '10', answerValue: 10, score: 10 },      // 10/10 → Excelente
      im1_d3_2: { answerText: 'Entre 7 y menos de 9 horas', score: 100 },
      im1_d3_4: { answerText: 'Para nada', score: 0 },
      im1_d4_1: { answerText: 'Algunos días', score: 1 },
      im1_d4_2: { answerText: 'Para nada', score: 0 },
      im1_d4_3: { answerText: 'Para nada', score: 0 },
      im1_d4_4: { answerText: 'Para nada', score: 0 },
      // Alcohol score 2 → Riesgo bajo Mujeres (≤2)
      im1_d5_1: { answerText: 'Mensualmente o menos', score: 1 },
      im1_d5_2: { answerText: '3 o 4', score: 1 },
      im1_d5_3: { answerText: 'Nunca', score: 0 },
      im1_d5_4: { answerText: 'No, nunca he fumado', score: 0 },
      im1_d5_7: { answerText: 'No', score: 0 },
    },
    expected: {
      nosasRisk:      'Riesgo bajo',
      nosasScore:     4,
      sleepQuality:   'Excelente calidad de sueño',
      activityPoints: 90,
      alcoholRisk:    'Riesgo bajo (Mujeres)',
    },
  },

  // ────────────────────────────────────────────────────────────
  // Paciente 5 – Luis Vargas
  //  Hombre, 46 años, obeso (IMC 32.9), cuello 38 cm, ronquido
  //  NoSAS esperado: sexo(2)+IMC>30(5)+ronquido(2) = 9 → ALTO
  //  Calidad sueño: 1/10 → Mala
  //  Actividad: 30 min → 40 pts
  //  Alcohol hombre: score 1 → Riesgo bajo (Hombres) (<4)
  // ────────────────────────────────────────────────────────────
  {
    label: 'Luis Vargas (M, 46 años, obeso IMC 32.9, cuello 38 cm, ronquido, mala calidad sueño)',
    answers: {
      im1_a1_1: { answerText: 'Luis' },
      im1_a1_2: { answerText: 'Vargas' },
      im1_a1_3: { answerText: '1980-01-28' },                          // 46 años
      im1_a1_4: { answerText: 'Masculino' },
      im1_a1_5: { answerText: 'luis.vargas@test.com' },
      im1_a1_6: { answerText: '+58 4187778899' },
      im1_a5_1: { answerText: 'Universitaria', score: 4 },
      im1_a6_1: { answerText: '5', answerValue: 5, score: 5 },
      // Con ronquido
      im1_b3_1: { answerText: 'ronquido, exceso_sueno_dia, fatiga' },
      im1_c1_1: { answerText: 'Sí' },
      im1_c1_2: { answerText: '95', answerValue: 95 },                 // peso kg
      im1_c1_3: { answerText: '170', answerValue: 170 },               // talla cm → IMC ≈ 32.9
      im1_c1_8: { answerText: 'Sí' },
      im1_c1_9: { answerText: '38', answerValue: 38 },                 // cuello ≤40 (no suma)
      im1_d1_1: { answerText: 'No todos los días', score: 0 },
      im1_d1_2: { answerText: 'No todos los días', score: 0 },
      im1_d1_3: { answerText: 'No todos los días', score: 0 },
      im1_d1_4: { answerText: 'No todos los días', score: 0 },
      im1_d1_5: { answerText: 'No todos los días', score: 1 },
      im1_d1_6: { answerText: 'No evito la sal y comidas procesadas', score: 0 },
      im1_d1_7: { answerText: 'Más de dos veces a la semana', score: 0 },
      im1_d1_8: { answerText: '5 o más a la semana', score: 0 },
      im1_d2_1: { answerText: 'Poco activo', score: 1 },
      im1_d2_2: { answerText: '30', answerValue: 30 },                 // 30 min → 40 pts
      // Sueño malo
      im1_d3_1: { answerText: '1', answerValue: 1, score: 1 },         // calidad 1/10 → Mala
      im1_d3_2: { answerText: 'Entre 5 y menos de 6 horas', score: 40 },
      im1_d3_4: { answerText: 'Más de la mitad de los días', score: 2 },
      im1_d4_1: { answerText: 'Algunos días', score: 1 },
      im1_d4_2: { answerText: 'Algunos días', score: 1 },
      im1_d4_3: { answerText: 'Algunos días', score: 1 },
      im1_d4_4: { answerText: 'Para nada', score: 0 },
      // Alcohol score 1 → Riesgo bajo Hombres (<4)
      im1_d5_1: { answerText: 'Mensualmente o menos', score: 1 },
      im1_d5_2: { answerText: '1 o 2', score: 0 },
      im1_d5_3: { answerText: 'Nunca', score: 0 },
      im1_d5_4: { answerText: 'No, nunca he fumado', score: 0 },
      im1_d5_7: { answerText: 'No', score: 0 },
    },
    expected: {
      nosasRisk:      'Riesgo alto',
      nosasScore:     9,
      sleepQuality:   'Mala calidad de sueño',
      activityPoints: 40,
      alcoholRisk:    'Riesgo bajo (Hombres)',
    },
  },
];

// ──────────────────────────────────────────────────────────────
// Utilidades
// ──────────────────────────────────────────────────────────────
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function separator(char = '─', len = 70) {
  console.log(char.repeat(len));
}

// ──────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║          IM1 Questionnaire E2E Test — 5 pacientes                   ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');

  if (BEARER_TOKEN === 'PEGA_TU_TOKEN_AQUÍ' || BEARER_TOKEN.length < 10) {
    console.error('\n❌ ERROR: No hay token configurado.');
    console.error('   Pasa el token como argumento:  npx ts-node test/im1-e2e.ts <TOKEN>');
    console.error('   O edita la variable BEARER_TOKEN en el archivo.\n');
    process.exit(1);
  }

  // Obtener mapa de preguntas
  let questionnaireId: string;
  let codeToId: CodeToId;
  try {
    ({ questionnaireId, codeToId } = await fetchIM1QuestionMap());
  } catch (err: any) {
    console.error(`\n❌ No se pudo obtener el cuestionario IM1: ${err.message}`);
    process.exit(1);
  }

  const results: { label: string; passed: boolean; error?: string }[] = [];

  for (let i = 0; i < PATIENTS.length; i++) {
    const patient = PATIENTS[i];
    separator();
    console.log(`\n👤 Paciente ${i + 1}/${PATIENTS.length}: ${patient.label}`);

    try {
      // Construir y enviar payload
      const payload = buildPayload(questionnaireId, codeToId, patient);
      console.log(`   📤 Enviando ${(payload as any).answers.length} respuestas...`);

      const submitRes = await api<any>('POST', '/questionnaires/batch-answers', payload);
      const pqId: string = submitRes?.patientQuestionnaireId ?? submitRes?.data?.patientQuestionnaireId;

      if (!pqId) throw new Error('No se recibió patientQuestionnaireId en la respuesta.');
      console.log(`   ✔ Cuestionario enviado (pqId: ${pqId})`);

      // Esperar procesamiento en background
      await pollUntilDone(pqId);

      // Obtener detalles completos con diagnósticos
      const detail = await api<any>('GET', `/questionnaires/patient-questionnaires/${pqId}/details`);

      // Validar
      const passed = validateAndPrint(patient, detail);
      results.push({ label: patient.label, passed });

    } catch (err: any) {
      console.error(`\n   ❌ Error: ${err.message}`);
      results.push({ label: patient.label, passed: false, error: err.message });
    }
  }

  // Resumen final
  separator('═');
  console.log('\n📋 RESUMEN FINAL\n');
  let totalPassed = 0;
  for (const r of results) {
    const icon = r.passed ? '✅' : '❌';
    console.log(`  ${icon} ${r.label}`);
    if (r.error) console.log(`       Error: ${r.error}`);
    if (r.passed) totalPassed++;
  }
  separator();
  console.log(`\n  Resultado: ${totalPassed}/${results.length} pacientes pasaron todas las validaciones.\n`);

  process.exit(totalPassed === results.length ? 0 : 1);
}

main().catch(err => {
  console.error('\n❌ Error inesperado:', err);
  process.exit(1);
});
