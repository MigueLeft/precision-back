import { QuestionType } from '@prisma/client';

// ==========================================
// QUESTIONNAIRE IM1 DATA
// Historia Clínica IM1 - Cuestionario completo
// ==========================================

export const questionnaireData = {
  code: 'im1',
  name: 'Historia Clínica IM1',
  description:
    'Cuestionario completo de historia clínica y estilo de vida para evaluación integral de salud',
  version: '1.0',
  active: true,
};

// ==========================================
// DIAGNOSTIC GROUPS
// ==========================================

export const diagnosticGroups = [
  {
    name: 'A.5. Educación',
    description: 'Evaluación de riesgo basado en nivel educativo',
    diagnosticCode: 'EDUC',
    scoringMethod: 'CATEGORICAL',
    active: true,
  },
  {
    name: 'A.6. Estatus Socioeconómico',
    description: 'Evaluación de riesgo basado en estatus socioeconómico',
    diagnosticCode: 'SOCIO',
    scoringMethod: 'RANGE',
    active: true,
  },
  {
    name: 'Nutrición',
    description: 'Adherencia a dieta mediterránea y hábitos alimentarios',
    diagnosticCode: 'MEDAS',
    scoringMethod: 'SUM',
    scoringConfig: { maxScore: 14 },
    active: true,
  },
  {
    name: 'D.2. Actividad física - Nivel',
    description: 'Autoidentificación del nivel de actividad física',
    diagnosticCode: 'NIVEL_ACT',
    scoringMethod: 'DIRECT',
    active: true,
  },
  {
    name: 'D.2. Actividad física - Minutos',
    description: 'Puntuación basada en minutos de actividad física semanal',
    diagnosticCode: 'MIN_ACTFIS',
    scoringMethod: 'RANGE',
    active: true,
  },
  {
    name: 'D.3.1. Calidad de sueño',
    description: 'Evaluación de calidad general de sueño',
    diagnosticCode: 'SUENO_CALIDAD',
    scoringMethod: 'DIRECT',
    active: true,
  },
  {
    name: 'D.3.1. Horas de sueño',
    description: 'Evaluación de horas de sueño nocturno',
    diagnosticCode: 'SUENO_HORAS',
    scoringMethod: 'DIRECT',
    active: true,
  },
  {
    name: 'D.3.2. Apnea obstructiva del sueño (NoSAS)',
    description: 'Evaluación de riesgo de apnea del sueño',
    diagnosticCode: 'NOSAS',
    scoringMethod: 'FORMULA',
    scoringConfig: {
      formula: 'neck_circumference + snoring + age + gender',
      maxScore: 17,
    },
    active: true,
  },
  {
    name: 'D.4.1. Síntomas de ansiedad (GAD-7)',
    description: 'Evaluación de síntomas de ansiedad',
    diagnosticCode: 'GAD7',
    scoringMethod: 'SUM',
    scoringConfig: { maxScore: 6 },
    active: true,
  },
  {
    name: 'D.4.2. Síntomas de depresión (PHQ-9)',
    description: 'Evaluación de síntomas de depresión',
    diagnosticCode: 'PHQ9',
    scoringMethod: 'SUM',
    scoringConfig: { maxScore: 6 },
    active: true,
  },
  {
    name: 'D.5.1. Alcohol (AUDIT-C)',
    description: 'Evaluación de consumo de alcohol',
    diagnosticCode: 'AUDIT',
    scoringMethod: 'SUM',
    scoringConfig: { maxScore: 12 },
    active: true,
  },
  {
    name: 'D.5.2. Tabaquismo (ASSIST)',
    description: 'Evaluación de consumo de tabaco',
    diagnosticCode: 'TABACO',
    scoringMethod: 'SUM',
    scoringConfig: { maxScore: 5 },
    active: true,
  },
  {
    name: 'D.5.3. Drogas (ASSIST)',
    description: 'Evaluación de consumo de drogas ilícitas',
    diagnosticCode: 'DROGAS',
    scoringMethod: 'SUM',
    scoringConfig: { maxScore: 7 },
    active: true,
  },
];

// ==========================================
// DIAGNOSTICS
// ==========================================

export const diagnostics = {
  // Educación
  educacion: [
    {
      name: 'Riesgo bajo',
      description: 'Nivel educativo universitario o postgrado',
      minScore: 4,
      maxScore: 5,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Riesgo alto',
      description: 'Nivel educativo primario o secundario',
      minScore: 1,
      maxScore: 3,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // Estatus Socioeconómico
  estatus_socio: [
    {
      name: 'Riesgo bajo',
      description: 'Estatus socioeconómico alto',
      minScore: 8,
      maxScore: 10,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Riesgo intermedio',
      description: 'Estatus socioeconómico medio',
      minScore: 4,
      maxScore: 7,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: 'Riesgo alto',
      description: 'Estatus socioeconómico bajo',
      minScore: 1,
      maxScore: 3,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // MEDAS (Alimentación)
  medas: [
    {
      name: 'Adherencia estricta',
      description: 'Excelente adherencia a dieta mediterránea',
      minScore: 9,
      maxScore: 14,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Adherencia moderada',
      description: 'Adherencia moderada a dieta mediterránea',
      minScore: 7,
      maxScore: 8,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: 'Adherencia deficiente',
      description: 'Baja adherencia a dieta mediterránea',
      minScore: 0,
      maxScore: 6,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // Nivel de Actividad Física
  nivel_actividad: [
    {
      name: 'Poco activo',
      description: 'Autoidentificación como poco activo',
      minScore: 1,
      maxScore: 1,
      severity: 'high',
      colorCode: '#dc3545',
    },
    {
      name: 'Moderadamente activo',
      description: 'Autoidentificación como moderadamente activo',
      minScore: 2,
      maxScore: 2,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: 'Muy activo',
      description: 'Autoidentificación como muy activo',
      minScore: 3,
      maxScore: 3,
      severity: 'low',
      colorCode: '#28a745',
    },
  ],

  // Minutos de Actividad Física
  minutos_actividad: [
    {
      name: '0 puntos',
      description: '0 minutos de actividad física por semana',
      minScore: 0,
      maxScore: 0,
      severity: 'high',
      colorCode: '#dc3545',
    },
    {
      name: '20 puntos',
      description: '1-29 minutos de actividad física por semana',
      minScore: 20,
      maxScore: 20,
      severity: 'high',
      colorCode: '#e74c3c',
    },
    {
      name: '40 puntos',
      description: '30-59 minutos de actividad física por semana',
      minScore: 40,
      maxScore: 40,
      severity: 'medium',
      colorCode: '#f39c12',
    },
    {
      name: '60 puntos',
      description: '60-89 minutos de actividad física por semana',
      minScore: 60,
      maxScore: 60,
      severity: 'medium',
      colorCode: '#f1c40f',
    },
    {
      name: '80 puntos',
      description: '90-119 minutos de actividad física por semana',
      minScore: 80,
      maxScore: 80,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: '90 puntos',
      description: '120-149 minutos de actividad física por semana',
      minScore: 90,
      maxScore: 90,
      severity: 'low',
      colorCode: '#8bc34a',
    },
    {
      name: '100 puntos',
      description: '150+ minutos de actividad física por semana',
      minScore: 100,
      maxScore: 100,
      severity: 'low',
      colorCode: '#28a745',
    },
  ],

  // Calidad de Sueño
  calidad_sueno: [
    {
      name: 'Riesgo bajo de insomnio/depresión',
      description: 'Buena calidad de sueño',
      minScore: 7,
      maxScore: 10,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Riesgo alto de insomnio/depresión',
      description: 'Mala calidad de sueño',
      minScore: 0,
      maxScore: 3,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // Horas de Sueño
  horas_sueno: [
    {
      name: 'Óptimo',
      description: '7-9 horas de sueño',
      minScore: 100,
      maxScore: 100,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Bueno',
      description: '9-10 horas de sueño',
      minScore: 90,
      maxScore: 90,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Aceptable',
      description: '6-7 horas de sueño',
      minScore: 70,
      maxScore: 70,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: 'Insuficiente',
      description: '5-6 horas o ≥10 horas',
      minScore: 40,
      maxScore: 40,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: 'Muy insuficiente',
      description: '4-5 horas de sueño',
      minScore: 20,
      maxScore: 20,
      severity: 'high',
      colorCode: '#dc3545',
    },
    {
      name: 'Crítico',
      description: 'Menos de 4 horas de sueño',
      minScore: 0,
      maxScore: 0,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // Apnea del Sueño
  apnea_sueno: [
    {
      name: 'Riesgo bajo',
      description: 'Bajo riesgo de apnea del sueño',
      minScore: 0,
      maxScore: 7,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Riesgo intermedio',
      description: 'Riesgo intermedio de apnea del sueño',
      minScore: 8,
      maxScore: 10,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: 'Riesgo alto',
      description: 'Alto riesgo de apnea del sueño',
      minScore: 11,
      maxScore: 17,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // Ansiedad y Depresión (mismo patrón)
  mental_health: [
    {
      name: 'Negativo',
      description: 'Sin síntomas significativos',
      minScore: 0,
      maxScore: 2,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Positivo',
      description: 'Síntomas significativos',
      minScore: 3,
      maxScore: 6,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // Alcohol
  alcohol: [
    {
      name: 'Riesgo bajo (Hombres)',
      description: 'Consumo de alcohol bajo riesgo para hombres',
      minScore: 0,
      maxScore: 3,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Riesgo alto (Hombres)',
      description: 'Consumo de alcohol de alto riesgo para hombres',
      minScore: 4,
      maxScore: 12,
      severity: 'high',
      colorCode: '#dc3545',
    },
    {
      name: 'Riesgo bajo (Mujeres)',
      description: 'Consumo de alcohol bajo riesgo para mujeres',
      minScore: 0,
      maxScore: 2,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Riesgo alto (Mujeres)',
      description: 'Consumo de alcohol de alto riesgo para mujeres',
      minScore: 3,
      maxScore: 12,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // Tabaquismo
  tabaquismo: [
    {
      name: 'No consumo',
      description: 'Sin consumo de tabaco',
      minScore: 0,
      maxScore: 0,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Riesgo moderado',
      description: 'Consumo esporádico de tabaco',
      minScore: 1,
      maxScore: 2,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: 'Riesgo alto',
      description: 'Consumo regular de tabaco',
      minScore: 3,
      maxScore: 5,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],

  // Drogas
  drogas: [
    {
      name: 'No consumo',
      description: 'Sin consumo de drogas ilícitas',
      minScore: 0,
      maxScore: 0,
      severity: 'low',
      colorCode: '#28a745',
    },
    {
      name: 'Riesgo moderado',
      description: 'Consumo esporádico de drogas ilícitas',
      minScore: 1,
      maxScore: 2,
      severity: 'medium',
      colorCode: '#ffc107',
    },
    {
      name: 'Riesgo alto',
      description: 'Consumo regular de drogas ilícitas',
      minScore: 3,
      maxScore: 7,
      severity: 'high',
      colorCode: '#dc3545',
    },
  ],
};

// ==========================================
// QUESTIONS WITH SCORING (25 questions total)
// ==========================================

export const scoringQuestions = [
  // A.5. Educación - im1_a5_1
  {
    code: 'im1_a5_1',
    questionText: '¿Cuál es el nivel más alto de educación que completó?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '1', label: 'Ninguno', score: 1 },
        { value: '2', label: 'Primaria', score: 2 },
        { value: '3', label: 'Secundaria', score: 3 },
        { value: '4', label: 'Universitaria', score: 4 },
        { value: '5', label: 'Postgrado', score: 5 },
      ],
    },
    hasScore: true,
    groupName: 'Educación',
  },

  // A.6. Estatus Socioeconómico - im1_a6_1
  {
    code: 'im1_a6_1',
    questionText: 'Escala Subjetiva de Estatus Socio Económico (Escala 1-10)',
    questionType: QuestionType.SCALE,
    inputType: 'range',
    options: {
      min: 1,
      max: 10,
      step: 1,
    },
    hasScore: true,
    groupName: 'Estatus Socioeconómico',
  },

  // D.1.1. MEDAS - Preguntas de alimentación (im1_d1_1 a im1_d1_14)
  ...Array.from({ length: 14 }, (_, i) => {
    const medasTexts = [
      '¿Utiliza aceite de oliva como principal fuente de grasa para cocinar?',
      '¿Cuatro cucharadas o más de aceite de oliva por día?',
      '¿Dos raciones o más de vegetales por día?',
      '¿Tres raciones o más de fruta por día?',
      '¿Menos de una ración de carnes rojas por día?',
      '¿Menos de una ración de mantequilla/margarina por día?',
      '¿Menos de una bebida carbonatada por día?',
      '¿Tres o más raciones de leguminosas por semana?',
      '¿Tres o más raciones de pescado/mariscos por semana?',
      '¿Menos de 2 veces pastelería comercial por semana?',
      '¿Tres veces o más frutos secos por semana?',
      '¿Prefiere pollo/pavo en lugar de carne roja?',
      '¿Dos veces o más por semana vegetales con salsa de tomate/ajo/cebolla en aceite de oliva?',
      '¿Agregás sal a tu comida en la mesa?',
    ];

    const isLastQuestion = i === 13; // La pregunta de sal tiene puntuación inversa
    return {
      code: `im1_d1_${i + 1}`,
      questionText: medasTexts[i],
      questionType: QuestionType.BOOLEAN,
      inputType: 'radio',
      options: {
        choices: [
          {
            value: 'si',
            label: 'Sí',
            score: isLastQuestion ? 0 : 1, // La pregunta de sal tiene puntuación inversa
          },
          {
            value: 'no',
            label: 'No',
            score: isLastQuestion ? 1 : 0,
          },
        ],
      },
      hasScore: true,
      groupName: 'Nutrición',
    };
  }),

  // D.2.1. Nivel de actividad física - im1_d2_1
  {
    code: 'im1_d2_1',
    questionText:
      '¿Con cuál de los siguientes niveles de actividad física usted se identifica?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: 'poco_activo', label: 'Poco activo', score: 1 },
        {
          value: 'moderadamente_activo',
          label: 'Moderadamente activo',
          score: 2,
        },
        { value: 'muy_activo', label: 'Muy activo', score: 3 },
      ],
    },
    hasScore: true,
    groupName: 'Nivel de actividad física',
  },

  // D.2.2. Minutos de actividad física - im1_d2_2
  {
    code: 'im1_d2_2',
    questionText:
      '¿Cuántos minutos en promedio de actividad física moderada o vigorosa hace por semana?',
    questionType: QuestionType.NUMERIC,
    inputType: 'number',
    options: {
      min: 0,
      max: 2000,
      step: 1,
      placeholder: 'Ingrese el número de minutos por semana',
    },
    hasScore: true,
    groupName: 'Minutos actividad física',
  },

  // D.3.1. Calidad de sueño - im1_d3_1
  {
    code: 'im1_d3_1',
    questionText:
      '¿Durante los últimos 7 días, qué puntuación le pondría a la calidad general de su sueño? (Escala 1-10)',
    questionType: QuestionType.SCALE,
    inputType: 'range',
    options: {
      min: 1,
      max: 10,
      step: 1,
    },
    hasScore: true,
    groupName: 'Calidad de sueño',
  },

  // D.3.2. Horas de sueño - im1_d3_2
  {
    code: 'im1_d3_2',
    questionText: '¿Cuántas horas duermes en la noche?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '<4', label: 'Menos de 4 horas', score: 0 },
        { value: '4-5', label: 'Entre 4 y menos de 5 horas', score: 20 },
        { value: '5-6', label: 'Entre 5 y menos de 6 horas', score: 40 },
        { value: '6-7', label: 'Entre 6 y menos de 7 horas', score: 70 },
        { value: '7-9', label: 'Entre 7 y menos de 9 horas', score: 100 },
        { value: '9-10', label: 'Entre 9 y menos de 10 horas', score: 90 },
        { value: '≥10', label: '10 o más horas', score: 40 },
      ],
    },
    hasScore: true,
    groupName: 'Horas de sueño',
  },

  // D.3.3. Apnea del sueño NoSAS - im1_d3_3
  {
    code: 'im1_d3_3',
    questionText:
      'Seleccione todas las opciones que apliquen para el cálculo de riesgo de apnea del sueño (NoSAS):',
    questionType: QuestionType.MULTIPLE_CHOICE,
    inputType: 'checkbox',
    options: {
      choices: [
        {
          value: 'neck_40',
          label: 'Circunferencia del cuello ≥40 cm',
          score: 4,
        },
        { value: 'age_55', label: 'Edad ≥55 años', score: 4 },
        { value: 'snoring', label: 'Ronquidos', score: 3 },
        { value: 'male', label: 'Sexo masculino', score: 2 },
        { value: 'hypertension', label: 'Hipertensión arterial', score: 4 },
      ],
      maxSelections: 5,
    },
    hasScore: true,
    groupName: 'Apnea del sueño (NoSAS)',
  },

  // D.3.4. Insomnio - im1_d3_4
  {
    code: 'im1_d3_4',
    questionText:
      '¿Con qué frecuencia ha tenido dificultades para conciliar el sueño durante las últimas 2 semanas?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Para nada', score: 0 },
        { value: '1', label: 'Algunos días', score: 1 },
        { value: '2', label: 'Más de la mitad de los días', score: 2 },
        { value: '3', label: 'Casi todos los días', score: 3 },
      ],
    },
    hasScore: true,
    groupName: 'Calidad de sueño',
  },

  // D.4.1. Ansiedad GAD-7 - im1_d4_1 y im1_d4_2
  {
    code: 'im1_d4_1',
    questionText:
      'Durante las últimas 2 semanas: Sentirse nervioso, ansioso o inquieto',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Para nada', score: 0 },
        { value: '1', label: 'Algunos días', score: 1 },
        { value: '2', label: 'Más de la mitad de los días', score: 2 },
        { value: '3', label: 'Casi todos los días', score: 3 },
      ],
    },
    hasScore: true,
    groupName: 'Síntomas de ansiedad (GAD-7)',
  },
  {
    code: 'im1_d4_2',
    questionText:
      'Durante las últimas 2 semanas: No poder parar o controlar la preocupación',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Para nada', score: 0 },
        { value: '1', label: 'Algunos días', score: 1 },
        { value: '2', label: 'Más de la mitad de los días', score: 2 },
        { value: '3', label: 'Casi todos los días', score: 3 },
      ],
    },
    hasScore: true,
    groupName: 'Síntomas de ansiedad (GAD-7)',
  },

  // D.4.2. Depresión PHQ-9 - im1_d4_3 y im1_d4_4
  {
    code: 'im1_d4_3',
    questionText:
      'Durante las últimas 2 semanas: Poco interés o placer en hacer cosas',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Para nada', score: 0 },
        { value: '1', label: 'Algunos días', score: 1 },
        { value: '2', label: 'Más de la mitad de los días', score: 2 },
        { value: '3', label: 'Casi todos los días', score: 3 },
      ],
    },
    hasScore: true,
    groupName: 'Síntomas de depresión (PHQ-9)',
  },
  {
    code: 'im1_d4_4',
    questionText:
      'Durante las últimas 2 semanas: Se ha sentido decaído, deprimido o sin esperanzas',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Para nada', score: 0 },
        { value: '1', label: 'Algunos días', score: 1 },
        { value: '2', label: 'Más de la mitad de los días', score: 2 },
        { value: '3', label: 'Casi todos los días', score: 3 },
      ],
    },
    hasScore: true,
    groupName: 'Síntomas de depresión (PHQ-9)',
  },

  // D.5.1. Alcohol AUDIT-C - im1_d5_1, im1_d5_2, im1_d5_3
  {
    code: 'im1_d5_1',
    questionText:
      '¿Con qué frecuencia consume alguna bebida que contenga alcohol?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Nunca', score: 0 },
        { value: '1', label: 'Mensualmente o menos', score: 1 },
        { value: '2', label: '2-4 veces al mes', score: 2 },
        { value: '3', label: '2-3 veces por semana', score: 3 },
        { value: '4', label: '4 o más veces por semana', score: 4 },
      ],
    },
    hasScore: true,
    groupName: 'Alcohol (AUDIT-C)',
  },
  {
    code: 'im1_d5_2',
    questionText:
      '¿Cuántas bebidas alcohólicas consume en un día típico en que toma?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: '1 o 2', score: 0 },
        { value: '1', label: '3 o 4', score: 1 },
        { value: '2', label: '5 o 6', score: 2 },
        { value: '3', label: '7 a 9', score: 3 },
        { value: '4', label: '10 o más', score: 4 },
      ],
    },
    hasScore: true,
    groupName: 'Alcohol (AUDIT-C)',
  },
  {
    code: 'im1_d5_3',
    questionText:
      '¿Con qué frecuencia toma 6 o más bebidas en una sola ocasión?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Nunca', score: 0 },
        { value: '1', label: 'Menos de una vez al mes', score: 1 },
        { value: '2', label: 'Mensualmente', score: 2 },
        { value: '3', label: 'Semanalmente', score: 3 },
        { value: '4', label: 'A diario o casi a diario', score: 4 },
      ],
    },
    hasScore: true,
    groupName: 'Alcohol (AUDIT-C)',
  },

  // D.5.2. Tabaquismo ASSIST - im1_d5_4, im1_d5_5, im1_d5_6
  {
    code: 'im1_d5_4',
    questionText:
      '¿Usted se ha fumado 100 cigarrillos o 20 tabacos o 20 pipas o algún producto de tabaco en toda su vida?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'No, nunca he fumado', score: 0 },
        {
          value: '0_2',
          label:
            'Si he fumado esa cantidad y NO he fumado en los últimos 12 meses',
          score: 0,
        },
        {
          value: '1',
          label:
            'Si he fumado esa cantidad y he fumado en los últimos 12 meses',
          score: 1,
        },
      ],
    },
    hasScore: true,
    groupName: 'Tabaquismo (ASSIST)',
  },
  {
    code: 'im1_d5_5',
    questionText:
      'En los últimos 30 días, ¿con qué frecuencia ha fumado cigarrillos o utilizado otros productos de tabaco?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Nunca', score: 0 },
        { value: '1', label: 'Rara vez', score: 1 },
        { value: '2', label: 'Algunas veces', score: 2 },
        { value: '3', label: 'Casi todos los días', score: 3 },
        { value: '4', label: 'Todos los días', score: 4 },
      ],
    },
    hasScore: true,
    groupName: 'Tabaquismo (ASSIST)',
    dependsOn: 'im1_d5_4',
    showWhen: {
      values: ['1'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_d5_6',
    questionText:
      '¿Ha tenido un fuerte deseo o ansia de consumir productos de tabaco durante los últimos 3 meses?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Nunca', score: 0 },
        { value: '1', label: 'Sí, pero no en los últimos 3 meses', score: 1 },
        { value: '2', label: 'Sí, en los últimos 3 meses', score: 2 },
      ],
    },
    hasScore: true,
    groupName: 'Tabaquismo (ASSIST)',
    dependsOn: 'im1_d5_4',
    showWhen: {
      values: ['1'],
      operator: 'IN',
    },
  },

  // D.5.3. Drogas ASSIST - im1_d5_7, im1_d5_8, im1_d5_9, im1_d5_10
  {
    code: 'im1_d5_7',
    questionText: '¿Ha consumido alguna droga ilícita en los últimos 12 meses?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'No', score: 0 },
        { value: '1', label: 'Sí', score: 1 },
      ],
    },
    hasScore: true,
    groupName: 'Drogas (ASSIST)',
  },
  {
    code: 'im1_d5_8',
    questionText:
      '¿Con qué frecuencia ha consumido drogas ilícitas en los últimos 30 días?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'Nunca', score: 0 },
        { value: '1', label: 'Rara vez', score: 1 },
        { value: '2', label: 'Algunas veces', score: 2 },
        { value: '3', label: 'Casi todos los días', score: 3 },
        { value: '4', label: 'Todos los días', score: 4 },
      ],
    },
    hasScore: true,
    groupName: 'Drogas (ASSIST)',
    dependsOn: 'im1_d5_7',
    showWhen: {
      values: ['1'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_d5_9',
    questionText:
      '¿Alguna vez ha sentido que debía reducir el consumo de drogas?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'No', score: 0 },
        { value: '1', label: 'Sí', score: 1 },
      ],
    },
    hasScore: true,
    groupName: 'Drogas (ASSIST)',
    dependsOn: 'im1_d5_7',
    showWhen: {
      values: ['1'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_d5_10',
    questionText:
      '¿Alguna vez ha recibido críticas por el consumo de drogas por parte de familiares o amigos?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'No', score: 0 },
        { value: '1', label: 'Sí', score: 1 },
      ],
    },
    hasScore: true,
    groupName: 'Drogas (ASSIST)',
    dependsOn: 'im1_d5_7',
    showWhen: {
      values: ['1'],
      operator: 'IN',
    },
  },

  // D.5.11. Drogas ASSIST adicional - im1_d5_11
  {
    code: 'im1_d5_11',
    questionText:
      '¿Ha tenido problemas de salud, sociales, legales o económicos debido al consumo de drogas?',
    questionType: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    options: {
      choices: [
        { value: '0', label: 'No', score: 0 },
        { value: '1', label: 'Sí, pero no en los últimos 3 meses', score: 1 },
        { value: '2', label: 'Sí, en los últimos 3 meses', score: 2 },
      ],
    },
    hasScore: true,
    groupName: 'Drogas (ASSIST)',
    dependsOn: 'im1_d5_7',
    showWhen: {
      values: ['1'],
      operator: 'IN',
    },
  },
];

// ==========================================
// NON-SCORING QUESTIONS (64 questions total)
// ==========================================

export const nonScoringQuestions = [
  // A.1. Datos de identificación (12 questions)
  {
    code: 'im1_a1_1',
    text: 'Nombre',
    type: QuestionType.TEXT,
    inputType: 'text',
    section: 'Estado Civil Y Datos Demográficos',
    required: true,
  },
  {
    code: 'im1_a1_2',
    text: 'Apellidos',
    type: QuestionType.TEXT,
    inputType: 'text',
    section: 'Estado Civil Y Datos Demográficos',
    required: true,
  },
  {
    code: 'im1_a1_3',
    text: 'Fecha de nacimiento',
    type: QuestionType.DATE,
    inputType: 'date',
    section: 'Estado Civil Y Datos Demográficos',
    required: true,
  },
  {
    code: 'im1_a1_4',
    text: 'Sexo',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Estado Civil Y Datos Demográficos',
    required: true,
    options: {
      choices: [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
        { value: 'otro', label: 'Otro' },
      ],
    },
  },
  {
    code: 'im1_a1_5',
    text: 'Correo Electrónico',
    type: QuestionType.TEXT,
    inputType: 'email',
    section: 'Estado Civil Y Datos Demográficos',
    required: true,
  },
  {
    code: 'im1_a1_6',
    text: 'Teléfono',
    type: QuestionType.TEXT,
    inputType: 'tel',
    section: 'Estado Civil Y Datos Demográficos',
    required: true,
  },
  {
    code: 'im1_a1_7',
    text: 'Nacionalidad',
    type: QuestionType.TEXT,
    inputType: 'text',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
  },
  {
    code: 'im1_a1_8',
    text: 'País de origen',
    type: QuestionType.TEXT,
    inputType: 'text',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
  },
  {
    code: 'im1_a1_9',
    text: 'País de residencia (donde has vivido los últimos 6 meses)',
    type: QuestionType.TEXT,
    inputType: 'text',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
  },
  {
    code: 'im1_a1_10',
    text: 'Dirección',
    type: QuestionType.TEXT,
    inputType: 'text',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
  },
  {
    code: 'im1_a1_11',
    text: 'Ciudad',
    type: QuestionType.TEXT,
    inputType: 'text',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
  },

  // A.2. Estado civil (1 question)
  {
    code: 'im1_a2_1',
    text: '¿Cuál es su estado civil?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
    options: {
      choices: [
        { value: 'nunca_casado', label: 'Nunca casado' },
        { value: 'casado', label: 'Actualmente casado' },
        { value: 'separado', label: 'Separado' },
        { value: 'divorciado', label: 'Divorciado' },
        { value: 'viudo', label: 'Viudo' },
        { value: 'conviviendo', label: 'Conviviendo' },
        { value: 'no_responde', label: 'No desea responder' },
      ],
    },
  },

  // A.3. Etnia-raza (2 questions)
  {
    code: 'im1_a3_1',
    text: '¿Cuál es su etnia?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
    options: {
      choices: [
        { value: 'latino_hispano', label: 'Latino / Hispano' },
        { value: 'no_latino_hispano', label: 'No Latino / No hispano' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_a3_2',
    text: '¿Cuál es su raza?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
    options: {
      choices: [
        { value: 'blanco', label: 'Blanco / Caucásicos' },
        { value: 'negro', label: 'Negro' },
        { value: 'asiatico', label: 'Asiático' },
        { value: 'indigena', label: 'Indígena' },
        { value: 'mixto', label: 'Mixto' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },

  // A.4. Idioma (1 question)
  {
    code: 'im1_a4_1',
    text: '¿Con que idioma te sientes más cómodo hablando?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Estado Civil Y Datos Demográficos',
    required: false,
    options: {
      choices: [
        { value: 'espanol', label: 'Español' },
        { value: 'ingles', label: 'Inglés' },
        { value: 'otro', label: 'Otro idioma' },
        { value: 'no_responde', label: 'No desea responder' },
      ],
    },
  },

  // B.1. Antecedentes familiares (1 question)
  {
    code: 'im1_b1_1',
    text: '¿Tiene familiares que padezcan o hayan padecido alguna de las siguientes condiciones?',
    type: QuestionType.MULTIPLE_CHOICE,
    inputType: 'checkbox',
    section: 'Historia Médica',
    required: false,
    options: {
      choices: [
        { value: 'diabetes', label: 'Diabetes o glucosa elevada' },
        { value: 'hipertension', label: 'Hipertensión arterial' },
        {
          value: 'cardiopatia',
          label:
            'Cardiopatía isquémica (infarto de miocardio, angina de pecho)',
        },
        { value: 'muerte_subita', label: 'Muerte súbita' },
        { value: 'accidente_cerebral', label: 'Accidente cerebrovascular' },
        {
          value: 'colesterol_alto_familiar',
          label: 'Colesterol o triglicéridos elevados',
        },
        { value: 'sobrepeso', label: 'Sobrepeso u Obesidad' },
        { value: 'cancer', label: 'Cáncer' },
        { value: 'tiroides', label: 'Enfermedad de la tiroides' },
        { value: 'poliquistosis', label: 'Poliquistosis renal' },
        { value: 'psiquiatricas', label: 'Enfermedades psiquiátricas' },
        { value: 'asma', label: 'Asma' },
        {
          value: 'autoinmune',
          label: 'Enfermedad autoinmune (lupus, artritis reumatoide)',
        },
        { value: 'ninguna', label: 'Ninguna de las anteriores' },
      ],
    },
  },

  // B.2. Antecedentes personales (1 question)
  {
    code: 'im1_b2_1',
    text: 'Un médico le ha dicho que padece o ha padecido alguna de las siguientes enfermedades:',
    type: QuestionType.MULTIPLE_CHOICE,
    inputType: 'checkbox',
    section: 'Historia Médica',
    required: false,
    options: {
      choices: [
        { value: 'sobrepeso_obesidad', label: 'Sobrepeso u obesidad' },
        { value: 'grasa_higado', label: 'Grasa en el hígado' },
        { value: 'diabetes', label: 'Diabetes o glucosa elevada' },
        { value: 'prediabetes', label: 'Prediabetes' },
        { value: 'resistencia_insulina', label: 'Resistencia a la insulina' },
        { value: 'hipertension', label: 'Hipertensión arterial' },
        {
          value: 'colesterol_alto',
          label: 'Colesterol o triglicéridos elevados',
        },
        { value: 'acido_urico', label: 'Ácido úrico elevado o gota' },
        { value: 'apnea_sueno', label: 'Apnea obstructiva del sueño' },
        { value: 'infarto', label: 'Infarto al corazón o angina' },
        { value: 'accidente_cerebral', label: 'Accidente cerebrovascular' },
        { value: 'arritmia', label: 'Arritmia cardíaca' },
        { value: 'cancer', label: 'Cáncer' },
        { value: 'depresion', label: 'Depresión o tristeza crónica' },
        { value: 'ansiedad', label: 'Ansiedad o miedo anticipado' },
        { value: 'asma', label: 'Asma' },
        { value: 'tiroides', label: 'Enfermedad de la tiroides' },
      ],
    },
  },

  // B.3. Síntomas recientes (1 question)
  {
    code: 'im1_b3_1',
    text: 'Señale los síntomas que usted ha padecido en el último mes:',
    type: QuestionType.MULTIPLE_CHOICE,
    inputType: 'checkbox',
    section: 'Historia Médica',
    required: false,
    options: {
      choices: [
        { value: 'palpitaciones', label: 'Palpitaciones' },
        { value: 'dolor_pecho', label: 'Dolor en el pecho' },
        { value: 'dolor_pantorrillas', label: 'Dolor en las pantorrillas' },
        { value: 'hinchazon_piernas', label: 'Hinchazón en las piernas' },
        { value: 'dificultad_respirar', label: 'Dificultad para respirar' },
        { value: 'pitos_pecho', label: 'Pitos en el pecho' },
        { value: 'tos', label: 'Tos' },
        { value: 'ronquido', label: 'Ronquido' },
        { value: 'fatiga', label: 'Fatiga' },
        { value: 'exceso_sueno_dia', label: 'Exceso de sueño en el día' },
        { value: 'disminucion_memoria', label: 'Disminución de la memoria' },
        { value: 'disminucion_libido', label: 'Disminución de la libido' },
        { value: 'orinar_noche', label: 'Orinar de noche' },
        { value: 'fiebre', label: 'Fiebre' },
        { value: 'mareos_vertigos', label: 'Mareos o vértigos' },
        { value: 'estres', label: 'Estrés' },
        { value: 'caida_cabello', label: 'Abundante caída del cabello' },
        { value: 'piel_seca', label: 'Piel seca' },
        { value: 'secrecion_pezones', label: 'Secreción por los pezones' },
        { value: 'adormecimiento', label: 'Adormecimiento o corrientazos' },
        { value: 'problemas_vista', label: 'Problemas en la vista' },
        { value: 'acidez', label: 'Acidez' },
        { value: 'gases_eructos', label: 'Gases o eructos' },
        { value: 'dolor_abdominal', label: 'Dolor abdominal' },
        { value: 'estrenimiento', label: 'Estreñimiento' },
        { value: 'diarrea', label: 'Diarrea' },
        { value: 'nauseas_vomitos', label: 'Náuseas o vómitos' },
        { value: 'sangramiento_rectal', label: 'Sangramiento rectal' },
        {
          value: 'obstruccion_nasal',
          label: 'Obstrucción nasal/dolor garganta',
        },
        { value: 'ardor_orinar', label: 'Ardor al orinar' },
        { value: 'sangre_orina', label: 'Sangre en la orina' },
        {
          value: 'sangramiento_genital',
          label: 'Sangramiento genital excesivo',
        },
        { value: 'retraso_menstruacion', label: 'Retraso en la menstruación' },
        { value: 'sangramiento_encias', label: 'Sangramiento en las encías' },
        { value: 'mayor_frecuencia_orina', label: 'Mayor frecuencia de orina' },
        { value: 'dolor_espalda', label: 'Dolor de espalda' },
        { value: 'dolor_cabeza', label: 'Dolor de cabeza' },
        { value: 'insomnio', label: 'Insomnio' },
        { value: 'tristeza_cronica', label: 'Tristeza crónica' },
        { value: 'miedo_angustia', label: 'Miedo o Angustia' },
        {
          value: 'levantarse_comer_noche',
          label: 'Levantarse a comer de noche',
        },
        { value: 'comer_compulsivamente', label: 'Comer compulsivamente' },
      ],
    },
  },

  // B.4. Embarazo (2 questions)
  {
    code: 'im1_b4_1',
    text: '¿Si es mujer, está embarazada actualmente?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Historia Médica',
    required: false,
    dependsOn: 'im1_a1_4',
    showWhen: {
      values: ['femenino'],
      operator: 'IN',
    },
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_b4_2',
    text: '(En caso afirmativo) ¿Cuánto tiempo de embarazo tiene?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Historia Médica',
    required: false,
    dependsOn: 'im1_b4_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
    options: {
      choices: [
        { value: 'menos_12_semanas', label: 'Menos de 12 semanas' },
        { value: '12_24_semanas', label: '12 a 24 semanas' },
        { value: 'mas_24_semanas', label: 'Más de 24 semanas' },
      ],
    },
  },

  // B.5. Cirugías y hospitalizaciones (2 questions)
  {
    code: 'im1_b5_1',
    text: '¿Has tenido cirugías previas? (Indica la razón de la cirugía y en qué año)',
    type: QuestionType.TEXT,
    inputType: 'textarea',
    section: 'Historia Médica',
    required: false,
  },
  {
    code: 'im1_b5_2',
    text: '¿Has tenido hospitalizaciones previas? (Indica la razón de la hospitalización y en qué año)',
    type: QuestionType.TEXT,
    inputType: 'textarea',
    section: 'Historia Médica',
    required: false,
  },

  // B.6. Tratamiento actual (1 question)
  {
    code: 'im1_b6_1',
    text: 'Medicamentos actuales (Medicamento, Presentación, Dosis, Frecuencia, Duración)',
    type: QuestionType.TEXT,
    inputType: 'textarea',
    section: 'Historia Médica',
    required: false,
  },

  // C. Mediciones físicas (30 questions)
  // C.1. Adiposidad (10 questions)
  {
    code: 'im1_c1_1',
    text: '¿Sabes cuánto pesas y mides?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_c1_2',
    text: '¿Cuál es su peso? (Kg o lbs)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c1_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c1_3',
    text: '¿Cuál es su talla? (cm o pies/pulgadas)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c1_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c1_4',
    text: '¿Sabes cuánto mide tu circunferencia abdominal?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_c1_5',
    text: '¿Cuál es su circunferencia abdominal? (cm o pulgadas)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c1_4',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c1_6',
    text: '¿Sabes cuánto es tu porcentaje de grasa?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_c1_7',
    text: '¿Cuánto es tu porcentaje de grasa? (%)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c1_6',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c1_8',
    text: '¿Conoces la circunferencia de tu cuello?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_c1_9',
    text: '¿Cuál es la circunferencia de tu cuello? (cm o pulgadas)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c1_8',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c1_10',
    text: '¿Tomas medicamentos para bajar de peso?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },

  // C.2. Presión arterial (4 questions)
  {
    code: 'im1_c2_1',
    text: '¿Sabes el valor de tu presión arterial?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_c2_2',
    text: '¿Cuál es su valor de presión arterial sistólica (Alta)? (mmHg)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c2_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c2_3',
    text: '¿Cuál es su valor de presión arterial diastólica (Baja)? (mmHg)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c2_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c2_4',
    text: '¿Toma medicamentos para bajar la presión arterial?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },

  // C.3. Glucemia (5 questions)
  {
    code: 'im1_c3_1',
    text: '¿Sabes en cuánto está su valor de azúcar (glucosa) en sangre?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_c3_2',
    text: '¿Cuál es su valor de glucosa (azúcar) en sangre en ayunas? (mg/dl)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c3_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c3_3',
    text: '¿Sabes en cuánto está su valor de Hemoglobina Glicosilada (HbA1C) en sangre?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_c3_4',
    text: '¿Cuál es su valor de Hemoglobina Glicosilada (HbA1C) en sangre? (%)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c3_3',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c3_5',
    text: '¿Toma medicamentos para bajar los niveles de azúcar?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },

  // C.4. Lípidos (6 questions)
  {
    code: 'im1_c4_1',
    text: '¿Sabes en cuánto está su valor de colesterol y triglicéridos en sangre?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },
  {
    code: 'im1_c4_2',
    text: '¿Cuál es su valor de colesterol total en sangre? (mg/dl)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c4_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c4_3',
    text: '¿Cuál es su valor de triglicéridos en sangre? (mg/dl)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c4_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c4_4',
    text: '¿Cuál es su valor de colesterol LDL en sangre? (mg/dl)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c4_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c4_5',
    text: '¿Cuál es su valor de colesterol HDL en sangre? (mg/dl)',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    dependsOn: 'im1_c4_1',
    showWhen: {
      values: ['si'],
      operator: 'IN',
    },
  },
  {
    code: 'im1_c4_6',
    text: '¿Toma medicamentos para bajar los niveles de colesterol o triglicéridos?',
    type: QuestionType.SINGLE_CHOICE,
    inputType: 'radio',
    section: 'Mediciones Físicas, Laboratorio Y Medicamentos',
    required: false,
    options: {
      choices: [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
        { value: 'no_responde', label: 'No desea responder / No sabe' },
      ],
    },
  },

  // D.1.2. Preferencias Dietéticas (1 question)
  {
    code: 'im1_d1_15',
    text: 'Has seguido algún patrón dietético anteriormente. ¿Señale cuál o cuáles?',
    type: QuestionType.MULTIPLE_CHOICE,
    inputType: 'checkbox',
    section: 'Nutrición',
    required: false,
    options: {
      choices: [
        { value: 'mediterranea', label: 'Mediterránea' },
        { value: 'vegetariana', label: 'Vegetariana' },
        { value: 'paleolitica', label: 'Paleolítica (Paleo)' },
        { value: 'ayuno_intermitente', label: 'Ayuno Intermitente' },
        { value: 'cetogenica', label: 'Cetogénica (keto)' },
        {
          value: 'reemplazo_comidas',
          label: 'Reemplazo de Comidas con batidos',
        },
        {
          value: 'bajo_indice_glicemico',
          label: 'Dieta de bajo índice glicémico',
        },
        { value: 'especial_atleta', label: 'Dieta especial para atleta' },
        {
          value: 'especial_enfermedad',
          label: 'Dieta especial por alguna enfermedad',
        },
        { value: 'ninguno', label: 'Ninguno o no sabe' },
      ],
    },
  },

  // D.2. Actividad física adicional (3 questions)
  {
    code: 'im1_d2_3',
    text: 'Minutos al día realizando la actividad física',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Actividad Física',
    required: false,
  },
  {
    code: 'im1_d2_4',
    text: 'Número de días por semana que realiza la actividad física',
    type: QuestionType.NUMERIC,
    inputType: 'number',
    section: 'Actividad Física',
    required: false,
  },
  {
    code: 'im1_d2_5',
    text: '¿Qué deporte(s) practicas o practicabas?',
    type: QuestionType.TEXT,
    inputType: 'textarea',
    section: 'Actividad Física',
    required: false,
  },

  // E. Metas y motivaciones personales (1 question)
  {
    code: 'im1_e1_1',
    text: '¿Cuáles son tus principales metas al consultarnos? (Selección múltiple)',
    type: QuestionType.MULTIPLE_CHOICE,
    inputType: 'checkbox',
    section: 'Metas Y Motivaciones Personales',
    required: false,
    options: {
      choices: [
        {
          value: 'saber_condiciones',
          label: 'Saber qué condiciones o enfermedades padeces',
        },
        {
          value: 'chequeo_general',
          label: 'Hacerte un chequeo general de salud',
        },
        {
          value: 'aclarar_diagnosticos',
          label: 'Aclarar si los diagnósticos que me dieron son correctos',
        },
        {
          value: 'plan_tratamiento',
          label: 'Obtener un plan de tratamiento adecuado',
        },
        {
          value: 'verificar_tratamiento',
          label: 'Saber si mi tratamiento actual es correcto',
        },
        {
          value: 'prevenir_enfermedades',
          label: 'Prevenir enfermedades futuras',
        },
        { value: 'envejecer_sanamente', label: 'Envejecer sanamente' },
        {
          value: 'curar_enfermedades',
          label: 'Curar o evitar que avancen tus enfermedades existentes',
        },
        { value: 'perder_peso', label: 'Perder peso' },
        {
          value: 'ganar_masa_muscular',
          label: 'Perder grasa y ganar masa muscular',
        },
        { value: 'aprender_comer_sano', label: 'Aprender a comer sano' },
        {
          value: 'dieta_personalizada',
          label: 'Obtener una dieta personalizada',
        },
        { value: 'verse_mejor', label: 'Verte mejor' },
        {
          value: 'mejorar_relacion_comida',
          label: 'Mejorar tu relación con la comida',
        },
        { value: 'hacer_ejercicio', label: 'Hacer ejercicio' },
        {
          value: 'plan_ejercicio',
          label: 'Obtener un plan de ejercicio personalizado',
        },
        {
          value: 'volver_deporte',
          label: 'Volver a practicar el deporte que antes hacía',
        },
        { value: 'salud_emocional', label: 'Mejorar mi salud emocional' },
        {
          value: 'mejorar_habitos',
          label: 'Mejorar tus hábitos de rutina diaria',
        },
        { value: 'sentirse_mejor', label: 'Sentirte mejor' },
        { value: 'aumentar_energia', label: 'Aumentar tu energía y vitalidad' },
        { value: 'reducir_estres', label: 'Reducir el estrés' },
        { value: 'dormir_mejor', label: 'Dormir mejor' },
        { value: 'calidad_vida', label: 'Mejorar tu calidad de vida' },
        {
          value: 'ser_aceptado',
          label: 'Ser aceptado por las personas que me rodean',
        },
        {
          value: 'complacer_familia',
          label: 'Complacer a mis padres o a mi pareja',
        },
        { value: 'autoestima', label: 'Mejorar mi autoestima' },
        { value: 'dejar_fumar', label: 'Dejar de fumar' },
        { value: 'dejar_alcohol', label: 'Dejar de ingerir alcohol' },
        {
          value: 'no_se',
          label: 'No sé / no tengo claras mis metas y motivaciones',
        },
      ],
    },
  },
];

// ==========================================
// QUESTION-GROUP MAPPINGS
// ==========================================

export const questionGroupMappings = [
  { questionCode: 'im1_a5_1', groupName: 'Educación' },
  { questionCode: 'im1_a6_1', groupName: 'Estatus Socioeconómico' },
  { questionCode: 'im1_d2_1', groupName: 'Nivel de actividad física' },
  { questionCode: 'im1_d2_2', groupName: 'Minutos actividad física' },
  { questionCode: 'im1_d3_1', groupName: 'Calidad de sueño' },
  { questionCode: 'im1_d3_2', groupName: 'Horas de sueño' },
  { questionCode: 'im1_d3_3', groupName: 'Apnea del sueño (NoSAS)' },
  { questionCode: 'im1_d3_4', groupName: 'Calidad de sueño' },
  { questionCode: 'im1_d4_1', groupName: 'Síntomas de ansiedad (GAD-7)' },
  { questionCode: 'im1_d4_2', groupName: 'Síntomas de ansiedad (GAD-7)' },
  { questionCode: 'im1_d4_3', groupName: 'Síntomas de depresión (PHQ-9)' },
  { questionCode: 'im1_d4_4', groupName: 'Síntomas de depresión (PHQ-9)' },
  { questionCode: 'im1_d5_1', groupName: 'Alcohol (AUDIT-C)' },
  { questionCode: 'im1_d5_2', groupName: 'Alcohol (AUDIT-C)' },
  { questionCode: 'im1_d5_3', groupName: 'Alcohol (AUDIT-C)' },
  { questionCode: 'im1_d5_4', groupName: 'Tabaquismo (ASSIST)' },
  { questionCode: 'im1_d5_5', groupName: 'Tabaquismo (ASSIST)' },
  { questionCode: 'im1_d5_6', groupName: 'Tabaquismo (ASSIST)' },
  { questionCode: 'im1_d5_7', groupName: 'Drogas (ASSIST)' },
  { questionCode: 'im1_d5_8', groupName: 'Drogas (ASSIST)' },
  { questionCode: 'im1_d5_9', groupName: 'Drogas (ASSIST)' },
  { questionCode: 'im1_d5_10', groupName: 'Drogas (ASSIST)' },
  { questionCode: 'im1_d5_11', groupName: 'Drogas (ASSIST)' },
  // MEDAS questions mapping
  ...Array.from({ length: 14 }, (_, i) => ({
    questionCode: `im1_d1_${i + 1}`,
    groupName: 'Nutrición',
  })),
];

// ==========================================
// SUMMARY
// ==========================================

// Total questions: 91 (27 with scoring + 64 without scoring)
// Total diagnostic groups: 13
// Total diagnostics: 35+
export const questionaireSummary = {
  totalQuestions: 90,
  questionsWithScoring: 27,
  questionsWithoutScoring: 63,
  totalDiagnosticGroups: 13,
  sections: [
    'Datos de Identificación',
    'Estado Civil',
    'Etnia y Raza',
    'Idioma',
    'Educación',
    'Estatus Socioeconómico',
    'Antecedentes Familiares',
    'Antecedentes Personales',
    'Síntomas Recientes',
    'Embarazo',
    'Cirugías y Hospitalizaciones',
    'Tratamiento Actual',
    'Mediciones Físicas',
    'Nutrición',
    'Actividad Física',
    'Sueño',
    'Salud Mental',
    'Hábitos y adicciones',
    'Metas y Motivaciones',
  ],
};
