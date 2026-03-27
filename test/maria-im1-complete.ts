#!/usr/bin/env ts-node
/**
 * Test: Paciente Femenino María — Cuestionario IM1 Completo
 *
 * Flujo:
 *  1. Crea una paciente femenina llamada María vía POST /api/v1/patients
 *  2. Obtiene el cuestionario IM1 y mapea código → ID de pregunta
 *  3. Envía TODAS las respuestas del IM1, incluidas las preguntas
 *     gineco-obstétricas (B4) exclusivas de pacientes femeninas
 *  4. Espera el procesamiento en background (diagnósticos)
 *  5. Valida los diagnósticos esperados para el perfil de María
 *
 * Uso:
 *   npx ts-node test/maria-im1-complete.ts <TOKEN>
 *   npx ts-node test/maria-im1-complete.ts   ← usa el token en BEARER_TOKEN
 *
 * Perfil de María López:
 *  Mujer, 35 años · IMC 22.9 (60 kg / 162 cm) · cuello 32 cm
 *  Sin ronquido  · Sueño 8/10 · 90 min/semana de actividad
 *  Sin alcohol · No fumadora · 2 embarazos previos (no embarazada)
 *
 * Diagnósticos esperados:
 *  NoSAS           → Riesgo bajo (score 0)
 *  Calidad sueño   → Buena calidad de sueño
 *  Actividad fís.  → 80 puntos  (90 min/semana)
 *  Alcohol Mujeres → Riesgo bajo (Mujeres)
 */

// ══════════════════════════════════════════════════════════════
//  ► CONFIGURA EL TOKEN AQUÍ o pásalo como argumento al script
// ══════════════════════════════════════════════════════════════
const BEARER_TOKEN: string = process.argv[2] || 'PEGA_TU_TOKEN_AQUÍ';
const BASE_URL = 'http://localhost:3001';
const API = BASE_URL;
// ══════════════════════════════════════════════════════════════

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
  const res = await fetch(`${API}${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[${method} ${path}] HTTP ${res.status}: ${text}`);
  }
  const wrapper = await res.json() as { data?: T; success?: boolean } & T;
  return ('data' in wrapper && wrapper.data !== undefined) ? wrapper.data as T : wrapper as T;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function separator(char = '─', len = 70) {
  console.log(char.repeat(len));
}

// ──────────────────────────────────────────────────────────────
// 1. Crear paciente femenino María
// ──────────────────────────────────────────────────────────────
async function createPatientMaria(): Promise<string> {
  console.log('\n👤 Creando paciente: María López...');

  const ts = Date.now();
  const patient = await api<any>('POST', '/patients', {
    firstName: 'María',
    lastName:  'López',
    email:     `maria.lopez.${ts}@test.com`,
    phone:     '+58 4161234567',
    birthdate: '1990-03-15T00:00:00.000Z',
    gender:    'Femenino',
  });

  const patientId: string = patient?.id ?? patient?.data?.id;
  if (!patientId) throw new Error('No se recibió el ID del paciente creado.');

  console.log(`   ✔ Paciente creada (id: ${patientId})`);
  return patientId;
}

// ──────────────────────────────────────────────────────────────
// 2. Obtener cuestionario IM1 y mapear código → id
// ──────────────────────────────────────────────────────────────
async function fetchIM1QuestionMap(): Promise<{ questionnaireId: string; codeToId: CodeToId }> {
  console.log('\n📋 Buscando cuestionario IM1...');

  const list = await api<any>('GET', '/questionnaires?limit=50');
  const items: any[] = list?.data ?? list?.items ?? (Array.isArray(list) ? list : []);
  const q = items.find((x: any) => x.code === 'im1' || x.name?.toLowerCase().includes('im1'));

  if (!q) throw new Error('Cuestionario IM1 no encontrado. ¿Está el servidor corriendo y el seed ejecutado?');
  console.log(`   ✔ Cuestionario encontrado: "${q.name}" (id: ${q.id})`);

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
// 3. Construir respuestas completas del IM1 para María
// ──────────────────────────────────────────────────────────────
/*
 * Convenciones de respuesta por tipo de pregunta:
 *   SINGLE_CHOICE   → answerText = etiqueta de la opción, score = puntuación
 *   MULTIPLE_CHOICE → answerText = valores separados por coma (los VALUE, no la etiqueta)
 *   SCALE           → answerText = String(valor), answerValue = valor, score = valor
 *   NUMERIC         → answerText = String(valor), answerValue = valor  (sin score)
 *   TEXT / TEXTAREA → answerText = String(valor)
 *   DATE            → answerText = 'YYYY-MM-DD'
 */
function buildMariaAnswers(codeToId: CodeToId): object[] {
  const answers: object[] = [];
  const ts = Date.now();

  function add(code: string, def: AnswerDef): void {
    const questionId = codeToId[code];
    if (!questionId) {
      console.warn(`   ⚠ Código no encontrado: ${code} (omitido)`);
      return;
    }
    const a: Record<string, unknown> = { questionId };
    if (def.answerText    !== undefined) a.answerText    = def.answerText;
    if (def.answerValue   !== undefined) a.answerValue   = def.answerValue;
    if (def.answerBoolean !== undefined) a.answerBoolean = def.answerBoolean;
    if (def.score         !== undefined) a.score         = def.score;
    answers.push(a);
  }

  // ── A.1. Datos de identificación ─────────────────────────────────────────
  add('im1_a1_1',  { answerText: 'María' });
  add('im1_a1_2',  { answerText: 'López' });
  add('im1_a1_3',  { answerText: '1990-03-15' });                              // 35 años
  add('im1_a1_4',  { answerText: 'Femenino' });
  add('im1_a1_5',  { answerText: `maria.lopez.${ts}@test.com` });
  add('im1_a1_6',  { answerText: '+58 4161234567' });
  add('im1_a1_7',  { answerText: 'Venezolana' });
  add('im1_a1_8',  { answerText: 'Venezuela' });
  add('im1_a1_9',  { answerText: 'Venezuela' });
  add('im1_a1_10', { answerText: 'Av. Principal Los Palos Grandes, Torre Centro, Piso 3' });
  add('im1_a1_11', { answerText: 'Caracas' });
  add('im1_a1_12', { answerText: 'Distrito Capital' });
  add('im1_a1_13', { answerText: '1060' });

  // ── A.2. Estado civil ─────────────────────────────────────────────────────
  add('im1_a2_1', { answerText: 'casado' });

  // ── A.3. Etnia y raza ─────────────────────────────────────────────────────
  add('im1_a3_1', { answerText: 'sudamerica,centroamerica_caribe' });
  add('im1_a3_2', { answerText: 'hispano_latino,blanco' });

  // ── A.4. Idioma preferido ─────────────────────────────────────────────────
  add('im1_a4_1', { answerText: 'espanol' });

  // ── A.5. Educación (con puntuación) ──────────────────────────────────────
  //    4 = Universitaria → 4 pts
  add('im1_a5_1', { answerText: 'Universitaria', score: 4 });

  // ── A.6. Estatus Socioeconómico (escala 1-10, con puntuación) ────────────
  add('im1_a6_1', { answerText: '6', answerValue: 6, score: 6 });

  // ── B.1. Antecedentes familiares ──────────────────────────────────────────
  add('im1_b1_1', { answerText: 'diabetes,hipertension' });

  // ── B.2. Antecedentes personales ──────────────────────────────────────────
  add('im1_b2_1', { answerText: 'glucosa_limite' });

  // ── B.3. Síntomas recientes (último mes) ──────────────────────────────────
  //    Sin ronquido → sin factor NoSAS por síntomas
  add('im1_b3_1', { answerText: 'estres,fatiga,dolor_cabeza' });

  // ── B.4. Embarazo y antecedentes gineco-obstétricos ───────────────────────
  //    Sección exclusiva para pacientes femeninas
  add('im1_b4_1', { answerText: '2', answerValue: 2 });   // 2 embarazos
  add('im1_b4_2', { answerText: '2', answerValue: 2 });   // 2 partos a término
  add('im1_b4_3', { answerText: '1', answerValue: 1 });   // 1 parto vaginal
  add('im1_b4_4', { answerText: '1', answerValue: 1 });   // 1 cesárea
  add('im1_b4_5', { answerText: '0', answerValue: 0 });   // 0 abortos/pérdidas
  add('im1_b4_6', { answerText: 'no' });                  // no está embarazada

  // ── B.5. Cirugías y hospitalizaciones ─────────────────────────────────────
  add('im1_b5_1', { answerText: 'Cesárea en 2018. Sin complicaciones postoperatorias.' });
  add('im1_b5_2', { answerText: 'Hospitalización por parto normal en 2015. Hospitalización por cesárea en 2018.' });

  // ── B.6. Tratamiento actual (medicamentos) ────────────────────────────────
  add('im1_b6_1', { answerText: 'Ninguno actualmente' });

  // ── B.7. Alergias alimentarias ────────────────────────────────────────────
  add('im1_b7_1', { answerText: 'ninguna' });

  // ── C.1. Adiposidad ───────────────────────────────────────────────────────
  //    60 kg / 162 cm → IMC ≈ 22.9 (normal) · cuello 32 cm (<40 → sin riesgo NoSAS)
  add('im1_c1_1',  { answerText: 'si' });
  add('im1_c1_2',  { answerText: '60',  answerValue: 60  }); // peso kg
  add('im1_c1_3',  { answerText: '162', answerValue: 162 }); // talla cm
  add('im1_c1_4',  { answerText: 'si' });
  add('im1_c1_5',  { answerText: '75',  answerValue: 75  }); // circ. abdominal cm
  add('im1_c1_6',  { answerText: 'no' });                    // sin medicamentos para peso
  add('im1_c1_7',  { answerText: '24',  answerValue: 24  }); // % grasa corporal
  add('im1_c1_8',  { answerText: 'si' });
  add('im1_c1_9',  { answerText: '32',  answerValue: 32  }); // circ. cuello 32 cm ≤ 40
  add('im1_c1_10', { answerText: 'no' });

  // ── C.2. Presión arterial ──────────────────────────────────────────────────
  add('im1_c2_1', { answerText: 'si' });
  add('im1_c2_2', { answerText: '116', answerValue: 116 }); // sistólica normal
  add('im1_c2_3', { answerText: '74',  answerValue: 74  }); // diastólica normal
  add('im1_c2_4', { answerText: 'no' });

  // ── C.3. Glucemia ──────────────────────────────────────────────────────────
  add('im1_c3_1', { answerText: 'si' });
  add('im1_c3_2', { answerText: '94',  answerValue: 94  }); // glucosa en ayunas (normal)
  add('im1_c3_3', { answerText: 'no' });
  add('im1_c3_4', { answerText: '5.3', answerValue: 5.3 }); // HbA1c (normal)
  add('im1_c3_5', { answerText: 'no' });

  // ── C.4. Lípidos ───────────────────────────────────────────────────────────
  add('im1_c4_1', { answerText: 'si' });
  add('im1_c4_2', { answerText: '175', answerValue: 175 }); // colesterol total (normal)
  add('im1_c4_3', { answerText: '115', answerValue: 115 }); // triglicéridos (normal)
  add('im1_c4_4', { answerText: '95',  answerValue: 95  }); // LDL (normal)
  add('im1_c4_5', { answerText: '58',  answerValue: 58  }); // HDL (buen nivel para mujer)
  add('im1_c4_6', { answerText: 'no' });

  // ── D.1. Nutrición (con puntuación) ───────────────────────────────────────
  //    Hábitos alimentarios saludables
  add('im1_d1_1', { answerText: '3 o más al día',                          score: 2 }); // frutas
  add('im1_d1_2', { answerText: '4 o más al día',                          score: 2 }); // vegetales
  add('im1_d1_3', { answerText: '2 o más al día',                          score: 2 }); // granos enteros
  add('im1_d1_4', { answerText: '1 o 2 al día',                            score: 1 }); // frutos secos/legumbres
  add('im1_d1_5', { answerText: 'Todos los días',                          score: 2 }); // lácteos bajos grasa
  add('im1_d1_6', { answerText: 'Evita la sal y comidas procesadas',       score: 2 }); // sal
  add('im1_d1_7', { answerText: '1 o 2 veces a la semana',                 score: 1 }); // carnes rojas
  add('im1_d1_8', { answerText: 'No tomo bebidas azucaradas',              score: 2 }); // bebidas azucaradas
  add('im1_d1_9', { answerText: 'ninguno' });                                            // preferencias dietéticas

  // ── D.2. Actividad física (con puntuación) ─────────────────────────────────
  //    90 min/semana → 80 puntos
  add('im1_d2_1', { answerText: 'Moderadamente activo', score: 2 });
  add('im1_d2_2', { answerText: '90', answerValue: 90  });            // 90 min/sem → 80 pts
  add('im1_d2_3', { answerText: '30', answerValue: 30  });            // 30 min/día
  add('im1_d2_4', { answerText: '3',  answerValue: 3   });            // 3 días/semana
  add('im1_d2_5', { answerText: 'yoga, caminata' });
  add('im1_d2_6', { answerText: 'caminar' });

  // ── D.3. Sueño (con puntuación) ────────────────────────────────────────────
  //    Sin ronquido ni otros factores NoSAS → score NoSAS = 0 → Riesgo bajo
  //    Calidad 8/10 → Buena calidad de sueño
  add('im1_d3_1', { answerText: '8', answerValue: 8, score: 8 });     // calidad 8/10 → Buena
  add('im1_d3_2', { answerText: 'Entre 7 y menos de 9 horas', score: 100 }); // horas óptimas
  add('im1_d3_3', { answerText: 'ninguno' });                          // sin factores NoSAS
  add('im1_d3_4', { answerText: 'Para nada', score: 0 });              // sin insomnio

  // ── D.4. Ansiedad y depresión (con puntuación) ─────────────────────────────
  //    GAD-7 score 1 → Negativo  |  PHQ-9 score 0 → Negativo
  add('im1_d4_1', { answerText: 'Algunos días', score: 1 }); // GAD-7 Q1: nervioso ocasional
  add('im1_d4_2', { answerText: 'Para nada',    score: 0 }); // GAD-7 Q2: control de preocupación
  add('im1_d4_3', { answerText: 'Para nada',    score: 0 }); // PHQ-9 Q1: interés en actividades
  add('im1_d4_4', { answerText: 'Para nada',    score: 0 }); // PHQ-9 Q2: estado de ánimo

  // ── D.5. Hábitos — Alcohol AUDIT-C (con puntuación) ─────────────────────
  //    Mujer: score total = 0 → Riesgo bajo (Mujeres)
  add('im1_d5_1', { answerText: 'Nunca',  score: 0 }); // frecuencia consumo
  add('im1_d5_2', { answerText: '1 o 2',  score: 0 }); // bebidas por ocasión
  add('im1_d5_3', { answerText: 'Nunca',  score: 0 }); // consumo en exceso

  // ── D.5. Hábitos — Tabaquismo ASSIST (con puntuación) ────────────────────
  //    Nunca fumó → solo se responde d5_4 (las preguntas d5_5 y d5_6 son condicionales)
  add('im1_d5_4', { answerText: 'No, nunca he fumado', score: 0 });

  // ── D.5. Hábitos — Drogas ASSIST (con puntuación) ────────────────────────
  //    No consume → solo se responde d5_7 (las preguntas d5_8 a d5_11 son condicionales)
  add('im1_d5_7', { answerText: 'No', score: 0 });

  // ── E.1. Metas y motivaciones personales ─────────────────────────────────
  add('im1_e1_1', { answerText: 'chequeo_general,mejorar_habitos,sentirse_mejor,bienestar_emocional,mejorar_sueno' });

  return answers;
}

// ──────────────────────────────────────────────────────────────
// 4. Esperar procesamiento en background
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
  throw new Error(`Timeout esperando procesamiento para ${pqId}`);
}

// ──────────────────────────────────────────────────────────────
// 5. Validar y mostrar diagnósticos
// ──────────────────────────────────────────────────────────────
function validateResults(detail: any): boolean {
  const diagnostics: any[] = detail?.patientDiagnostics ?? [];

  const results = diagnostics.map((pd: any) => ({
    group:    pd.diagnostic?.diagnosticGroup?.name ?? pd.diagnosticGroup?.name ?? '?',
    name:     pd.diagnostic?.name ?? '?',
    score:    Number(pd.obtainedScore ?? 0),
    severity: pd.diagnostic?.severity ?? '?',
  }));

  console.log('\n   📊 Diagnósticos generados para María:');
  if (results.length === 0) {
    console.log('      ⚠ No se generaron diagnósticos todavía.');
    return false;
  }

  results.forEach(r =>
    console.log(`      • [${r.group}] ${r.name}  (score: ${r.score}, severity: ${r.severity})`),
  );

  // ── Validaciones esperadas ──────────────────────────────────
  const expected = {
    nosasRisk:      'Riesgo bajo de apnea del sueño',
    nosasScore:     0,
    sleepQuality:   'Buena calidad de sueño',
    activityPoints: 80,
    alcoholRisk:    'Riesgo bajo (Mujeres)',
  };

  const find = (groupContains: string) =>
    results.find(r => r.group.includes(groupContains));

  let ok = true;
  const check = (label: string, actual: string | number | undefined, exp: string | number) => {
    const pass = String(actual) === String(exp);
    console.log(`      ${pass ? '✔' : '✖'} ${label}: "${actual}" ${pass ? '' : `← esperado: "${exp}"`}`);
    if (!pass) ok = false;
  };

  console.log('\n   🔍 Validaciones:');

  const nosas    = find('NoSAS');
  const sleep    = find('Calidad de sueño');
  const activity = find('Minutos');
  const alcohol  = find('Alcohol');

  check('NoSAS riesgo',        nosas?.name,    expected.nosasRisk);
  check('NoSAS score',         nosas?.score,   expected.nosasScore);
  check('Calidad de sueño',    sleep?.name,    expected.sleepQuality);
  check('Actividad (puntos)',  activity?.score, expected.activityPoints);
  check('Alcohol (Mujeres)',   alcohol?.name,  expected.alcoholRisk);

  return ok;
}

// ──────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║     Test: Paciente Femenino María — Cuestionario IM1 Completo       ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');

  if (BEARER_TOKEN === 'PEGA_TU_TOKEN_AQUÍ' || BEARER_TOKEN.length < 10) {
    console.error('\n❌ ERROR: No hay token configurado.');
    console.error('   Pasa el token como argumento:  npx ts-node test/maria-im1-complete.ts <TOKEN>');
    process.exit(1);
  }

  try {
    // 1. Crear paciente
    const patientId = await createPatientMaria();

    // 2. Obtener cuestionario IM1
    const { questionnaireId, codeToId } = await fetchIM1QuestionMap();

    // 3. Construir respuestas
    const answers = buildMariaAnswers(codeToId);
    console.log(`\n📝 Total de respuestas preparadas: ${answers.length}`);

    // 4. Enviar cuestionario completo
    separator();
    console.log('\n📤 Enviando cuestionario IM1 completo para María...');

    const submitRes = await api<any>('POST', '/questionnaires/batch-answers', {
      patientId,
      questionnaireId,
      answers,
    });

    const pqId: string = submitRes?.patientQuestionnaireId ?? submitRes?.data?.patientQuestionnaireId;
    if (!pqId) throw new Error('No se recibió patientQuestionnaireId en la respuesta.');
    console.log(`   ✔ Cuestionario enviado (pqId: ${pqId})`);

    // 5. Esperar procesamiento
    await pollUntilDone(pqId);

    // 6. Obtener detalles con diagnósticos
    const detail = await api<any>('GET', `/questionnaires/patient-questionnaires/${pqId}/details`);

    // 7. Validar
    const passed = validateResults(detail);

    separator('═');
    if (passed) {
      console.log('\n✅ TODAS LAS VALIDACIONES PASARON');
      console.log('   María completó el cuestionario IM1 correctamente.\n');
      process.exit(0);
    } else {
      console.log('\n❌ ALGUNAS VALIDACIONES FALLARON — revisa los resultados anteriores.\n');
      process.exit(1);
    }

  } catch (err: any) {
    console.error(`\n❌ Error: ${err.message}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('\n❌ Error inesperado:', err);
  process.exit(1);
});
