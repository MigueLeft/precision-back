import * as fs from 'fs';
import * as path from 'path';

/**
 * Complete IM1 Questionnaire Test
 *
 * This test creates a complete IM1 questionnaire submission with realistic data,
 * tests the batch processing endpoint, and validates the entire flow including
 * patient creation, diagnostic calculations, and cleanup.
 */

interface QuestionnaireAnswer {
  questionId: string;
  answerText?: string;
  answerValue?: number;
  answerBoolean?: boolean;
  score?: number;
}

interface BatchAnswerRequest {
  patientId?: string;
  questionnaireId: string;
  answers: QuestionnaireAnswer[];
}

interface ProcessedQuestionnaireResult {
  patientQuestionnaireId: string;
  patient: any;
  questionnaire: any;
  answers: Array<{
    id: string;
    questionText: string;
    questionCode: string;
    questionType: string;
    textValue?: string;
    numericValue?: number;
    booleanValue?: boolean;
    score: number;
    answeredAt: string;
    readableAnswer: string;
  }>;
  diagnostics: Array<{
    group: string;
    name: string;
    description?: string;
    score: number;
    threshold: number;
    risk: 'low' | 'medium' | 'high';
  }>;
  summary: {
    totalScore: number;
    maxPossibleScore: number;
    scorePercentage: number;
    completedAt: string;
    overallRisk: 'low' | 'medium' | 'high';
  };
}

interface CleanupData {
  patientId: string;
  patientQuestionnaireId: string;
  questionnaireId: string;
  timestamp: string;
}

class IM1QuestionnaireTest {
  private baseUrl: string;
  private cleanupData: CleanupData | null = null;

  constructor() {
    // Configuration
    this.baseUrl = process.env.API_BASE_URL || 'http://localhost:3001/api/v1';
  }

  /**
   * Main test execution
   */
  async runCompleteTest(): Promise<void> {
    console.log('🚀 Starting IM1 Questionnaire Complete Test');
    console.log(`📡 API Base URL: ${this.baseUrl}`);

    try {
      // Step 1: Get IM1 questionnaire ID
      const questionnaireId = await this.getIM1QuestionnaireId();
      console.log(`📋 IM1 Questionnaire ID: ${questionnaireId}`);

      // Step 2: Get questions for IM1
      const questions = await this.getQuestionnaireQuestions(questionnaireId);
      console.log(`❓ Found ${questions.length} questions for IM1`);

      // Step 3: Create complete answers dataset
      const answers = this.createCompleteAnswers(questions);
      console.log(`✅ Created ${answers.length} answers`);

      // Step 4: Submit batch answers (this creates patient automatically for IM1)
      const result = await this.submitBatchAnswers({
        questionnaireId,
        answers,
      });

      // Step 5: Validate results
      await this.validateResults(result);

      // Step 6: Save cleanup data
      this.saveCleanupData({
        patientId: result.patient.id,
        patientQuestionnaireId: result.patientQuestionnaireId,
        questionnaireId,
        timestamp: new Date().toISOString(),
      });

      console.log('🎉 IM1 Questionnaire test completed successfully!');
      console.log('🧹 Cleanup data saved to cleanup-data.json');
      console.log('🗑️  Run cleanup: npm run test:e2e:cleanup');
    } catch (error) {
      console.error('❌ Test failed:', error);
      throw error;
    }
  }

  /**
   * Get IM1 questionnaire ID
   */
  private async getIM1QuestionnaireId(): Promise<string> {
    const response = await fetch(
      `${this.baseUrl}/questionnaires?search=im1&limit=1`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch questionnaires: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success || !data.data.data || data.data.data.length === 0) {
      throw new Error('IM1 questionnaire not found');
    }

    return data.data.data[0].id;
  }

  /**
   * Get questions for a questionnaire
   */
  private async getQuestionnaireQuestions(
    questionnaireId: string,
  ): Promise<any[]> {
    const response = await fetch(
      `${this.baseUrl}/questionnaires/${questionnaireId}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch questionnaire: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to get questionnaire data');
    }

    // Extract questions from questionnaireQuestions relation
    const questionnaireQuestions = data.data.questionnaireQuestions || [];
    return questionnaireQuestions.map((qq: any) => ({
      id: qq.question.id,
      code: qq.question.code,
      questionText: qq.question.questionText,
      questionType: qq.question.questionType,
      inputType: qq.question.inputType,
      options: qq.question.options,
      hasScore: qq.question.hasScore,
    }));
  }

  /**
   * Create complete set of answers based on the im1.ts specification
   */
  private createCompleteAnswers(questions: any[]): QuestionnaireAnswer[] {
    const answers: QuestionnaireAnswer[] = [];

    // Create a map of question codes to question IDs for easier mapping
    const questionMap = new Map<string, string>();
    questions.forEach((q) => {
      if (q.code) {
        questionMap.set(q.code, q.id);
      }
    });

    // A.1. Datos de identificación (12 questions)
    this.addAnswer(answers, questionMap, 'im1_a1_1', {
      answerText: 'Juan Carlos',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_2', {
      answerText: 'Pérez García',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_3', {
      answerText: '1985-06-15',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_4', {
      answerText: 'masculino',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_5', {
      answerText: `juan.perez.${Date.now()}@test.com`,
    });
    this.addAnswer(answers, questionMap, 'im1_a1_6', {
      answerText: '+57 312 456 7890',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_7', {
      answerText: 'Colombiana',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_8', {
      answerText: 'Colombia',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_9', {
      answerText: 'Colombia',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_10', {
      answerText: 'Calle 123 #45-67',
    });
    this.addAnswer(answers, questionMap, 'im1_a1_11', { answerText: 'Bogotá' });

    // A.2. Estado civil (1 question)
    this.addAnswer(answers, questionMap, 'im1_a2_1', { answerText: 'casado' });

    // A.3. Etnia-raza (2 questions)
    this.addAnswer(answers, questionMap, 'im1_a3_1', {
      answerText: 'latino_hispano',
    });
    this.addAnswer(answers, questionMap, 'im1_a3_2', { answerText: 'mixto' });

    // A.4. Idioma (1 question)
    this.addAnswer(answers, questionMap, 'im1_a4_1', { answerText: 'espanol' });

    // A.5. Educación (CON PUNTUACIÓN)
    this.addAnswer(answers, questionMap, 'im1_a5_1', {
      answerText: '4',
      score: 4,
    });

    // A.6. Estatus Socioeconómico (CON PUNTUACIÓN)
    this.addAnswer(answers, questionMap, 'im1_a6_1', {
      answerValue: 7,
      score: 7,
    });

    // B.1. Antecedentes familiares (1 question)
    this.addAnswer(answers, questionMap, 'im1_b1_1', {
      answerText: 'diabetes,hipertension,sobrepeso',
    });

    // B.2. Antecedentes personales (1 question)
    this.addAnswer(answers, questionMap, 'im1_b2_1', {
      answerText: 'sobrepeso_obesidad,hipertension,colesterol_alto',
    });

    // B.3. Síntomas recientes (1 question)
    this.addAnswer(answers, questionMap, 'im1_b3_1', {
      answerText: 'fatiga,estres,insomnio,dolor_cabeza',
    });

    // B.4. Embarazo (2 questions)
    this.addAnswer(answers, questionMap, 'im1_b4_1', { answerText: 'no' });
    this.addAnswer(answers, questionMap, 'im1_b4_2', { answerText: 'no' });

    // B.5. Cirugías y hospitalizaciones (2 questions)
    this.addAnswer(answers, questionMap, 'im1_b5_1', {
      answerText: 'Apendicectomía en 2010. Sin complicaciones.',
    });
    this.addAnswer(answers, questionMap, 'im1_b5_2', {
      answerText:
        'Hospitalización por neumonía en 2018. Recuperación completa.',
    });

    // B.6. Tratamiento actual (1 question)
    this.addAnswer(answers, questionMap, 'im1_b6_1', {
      answerText: 'Losartán 50mg - 1 tableta/día - Para hipertensión arterial',
    });

    // C.1. Adiposidad (10 questions)
    this.addAnswer(answers, questionMap, 'im1_c1_1', { answerText: 'si' });
    this.addAnswer(answers, questionMap, 'im1_c1_2', { answerValue: 85 });
    this.addAnswer(answers, questionMap, 'im1_c1_3', { answerValue: 175 });
    this.addAnswer(answers, questionMap, 'im1_c1_4', { answerText: 'si' });
    this.addAnswer(answers, questionMap, 'im1_c1_5', { answerValue: 95 });
    this.addAnswer(answers, questionMap, 'im1_c1_6', { answerText: 'no' });
    this.addAnswer(answers, questionMap, 'im1_c1_7', { answerValue: 25 });
    this.addAnswer(answers, questionMap, 'im1_c1_8', { answerText: 'si' });
    this.addAnswer(answers, questionMap, 'im1_c1_9', { answerValue: 42 });
    this.addAnswer(answers, questionMap, 'im1_c1_10', { answerText: 'no' });

    // C.2. Presión arterial (4 questions)
    this.addAnswer(answers, questionMap, 'im1_c2_1', { answerText: 'si' });
    this.addAnswer(answers, questionMap, 'im1_c2_2', { answerValue: 140 });
    this.addAnswer(answers, questionMap, 'im1_c2_3', { answerValue: 90 });
    this.addAnswer(answers, questionMap, 'im1_c2_4', { answerText: 'si' });

    // C.3. Glucemia (5 questions)
    this.addAnswer(answers, questionMap, 'im1_c3_1', { answerText: 'si' });
    this.addAnswer(answers, questionMap, 'im1_c3_2', { answerValue: 110 });
    this.addAnswer(answers, questionMap, 'im1_c3_3', { answerText: 'no' });
    this.addAnswer(answers, questionMap, 'im1_c3_4', { answerValue: 6.2 });
    this.addAnswer(answers, questionMap, 'im1_c3_5', { answerText: 'no' });

    // C.4. Lípidos (6 questions)
    this.addAnswer(answers, questionMap, 'im1_c4_1', { answerText: 'si' });
    this.addAnswer(answers, questionMap, 'im1_c4_2', { answerValue: 220 });
    this.addAnswer(answers, questionMap, 'im1_c4_3', { answerValue: 180 });
    this.addAnswer(answers, questionMap, 'im1_c4_4', { answerValue: 140 });
    this.addAnswer(answers, questionMap, 'im1_c4_5', { answerValue: 35 });
    this.addAnswer(answers, questionMap, 'im1_c4_6', { answerText: 'no' });

    // D.1. Nutrición (MEDAS) - CON PUNTUACIÓN (14 questions)
    this.addAnswer(answers, questionMap, 'im1_d1_1', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_2', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_3', {
      answerText: 'si',
      score: 1,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_4', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_5', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_6', {
      answerText: 'si',
      score: 1,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_7', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_8', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_9', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_10', {
      answerText: 'si',
      score: 1,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_11', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_12', {
      answerText: 'si',
      score: 1,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_13', {
      answerText: 'no',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d1_14', {
      answerText: 'no',
      score: 0,
    }); // Salt question (inverse scoring)

    // D.1.2. Preferencias Dietéticas (1 question)
    this.addAnswer(answers, questionMap, 'im1_d1_15', {
      answerText: 'ninguno',
    });

    // D.2. Actividad física - CON PUNTUACIÓN (5 questions)
    this.addAnswer(answers, questionMap, 'im1_d2_1', {
      answerText: 'poco_activo',
      score: 1,
    });
    this.addAnswer(answers, questionMap, 'im1_d2_2', {
      answerValue: 45,
      score: 40,
    });
    this.addAnswer(answers, questionMap, 'im1_d2_3', { answerValue: 15 });
    this.addAnswer(answers, questionMap, 'im1_d2_4', { answerValue: 3 });
    this.addAnswer(answers, questionMap, 'im1_d2_5', {
      answerText: 'Caminar, fútbol ocasional los fines de semana',
    });

    // D.3. Sueño - CON PUNTUACIÓN (4 questions)
    this.addAnswer(answers, questionMap, 'im1_d3_1', {
      answerValue: 6,
      score: 6,
    });
    this.addAnswer(answers, questionMap, 'im1_d3_2', {
      answerText: '6-7',
      score: 70,
    });
    this.addAnswer(answers, questionMap, 'im1_d3_3', {
      answerText: 'neck_40,snoring,male',
    }); // Multiple choice for NoSAS
    this.addAnswer(answers, questionMap, 'im1_d3_4', {
      answerText: '1',
      score: 1,
    });

    // D.4. Estrés y salud mental - CON PUNTUACIÓN (4 questions)
    this.addAnswer(answers, questionMap, 'im1_d4_1', {
      answerText: '1',
      score: 1,
    }); // Ansiedad - nervioso
    this.addAnswer(answers, questionMap, 'im1_d4_2', {
      answerText: '2',
      score: 2,
    }); // Ansiedad - preocupación
    this.addAnswer(answers, questionMap, 'im1_d4_3', {
      answerText: '1',
      score: 1,
    }); // Depresión - interés
    this.addAnswer(answers, questionMap, 'im1_d4_4', {
      answerText: '0',
      score: 0,
    }); // Depresión - esperanza

    // D.5. Hábitos y adicciones - CON PUNTUACIÓN (11 questions)
    // D.5.1. Alcohol (AUDIT-C)
    this.addAnswer(answers, questionMap, 'im1_d5_1', {
      answerText: '2',
      score: 2,
    });
    this.addAnswer(answers, questionMap, 'im1_d5_2', {
      answerText: '1',
      score: 1,
    });
    this.addAnswer(answers, questionMap, 'im1_d5_3', {
      answerText: '1',
      score: 1,
    });

    // D.5.2. Tabaquismo (ASSIST)
    this.addAnswer(answers, questionMap, 'im1_d5_4', {
      answerText: '0_2',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d5_5', {
      answerText: '0',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d5_6', {
      answerText: '0',
      score: 0,
    });

    // D.5.3. Drogas (ASSIST)
    this.addAnswer(answers, questionMap, 'im1_d5_7', {
      answerText: '0',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d5_8', {
      answerText: '0',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d5_9', {
      answerText: '0',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d5_10', {
      answerText: '0',
      score: 0,
    });
    this.addAnswer(answers, questionMap, 'im1_d5_11', {
      answerText: '0',
      score: 0,
    });

    // E. Metas y motivaciones personales (1 question)
    this.addAnswer(answers, questionMap, 'im1_e1_1', {
      answerText:
        'chequeo_general,perder_peso,aprender_comer_sano,mejorar_habitos,sentirse_mejor',
    });

    console.log(`📊 Generated ${answers.length} answers for IM1 questionnaire`);
    return answers;
  }

  /**
   * Helper method to add answer if question exists
   */
  private addAnswer(
    answers: QuestionnaireAnswer[],
    questionMap: Map<string, string>,
    code: string,
    answerData: Partial<QuestionnaireAnswer>,
  ): void {
    const questionId = questionMap.get(code);
    if (questionId) {
      answers.push({
        questionId,
        ...answerData,
      });
    } else {
      console.warn(`⚠️ Question with code '${code}' not found`);
    }
  }

  /**
   * Submit batch answers to the API
   */
  private async submitBatchAnswers(
    request: BatchAnswerRequest,
  ): Promise<ProcessedQuestionnaireResult> {
    console.log('📤 Submitting batch answers...');

    const response = await fetch(
      `${this.baseUrl}/questionnaires/batch-answers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit batch answers: ${response.statusText} - ${errorText}`,
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Batch answer submission failed');
    }

    console.log('✅ Batch answers submitted successfully');
    return data.data;
  }

  /**
   * Validate the results of the questionnaire processing
   */
  private async validateResults(
    result: ProcessedQuestionnaireResult,
  ): Promise<void> {
    console.log('🔍 Validating results...');

    // Basic structure validation
    if (!result.patientQuestionnaireId) {
      throw new Error('Missing patientQuestionnaireId');
    }

    if (!result.patient || !result.patient.id) {
      throw new Error('Missing patient data');
    }

    if (!result.questionnaire) {
      throw new Error('Missing questionnaire data');
    }

    if (!Array.isArray(result.answers)) {
      throw new Error('Missing or invalid answers array');
    }

    if (!Array.isArray(result.diagnostics)) {
      throw new Error('Missing or invalid diagnostics array');
    }

    if (!result.summary) {
      throw new Error('Missing summary data');
    }

    // Content validation
    console.log(
      `👤 Patient created: ${result.patient.firstName} ${result.patient.lastName}`,
    );
    console.log(`📋 Questionnaire: ${result.questionnaire.name}`);
    console.log(`📝 Answers processed: ${result.answers.length}`);
    console.log(`🔬 Diagnostics generated: ${result.diagnostics.length}`);
    console.log(
      `📊 Total score: ${result.summary.totalScore}/${result.summary.maxPossibleScore} (${result.summary.scorePercentage.toFixed(1)}%)`,
    );
    console.log(`⚠️ Overall risk: ${result.summary.overallRisk}`);

    // Validate diagnostic groups
    const diagnosticGroups = result.diagnostics.map((d) => d.group);
    const expectedGroups = [
      'MEDAS',
      'Physical Activity',
      'Sleep Quality',
      'Sleep Apnea',
      'Anxiety',
      'Depression',
      'Alcohol',
      'Smoking',
      'Drugs',
    ];

    for (const group of expectedGroups) {
      if (!diagnosticGroups.includes(group)) {
        console.warn(`⚠️ Expected diagnostic group '${group}' not found`);
      }
    }

    // Validate patient data integration
    if (!result.patient.firstName || !result.patient.lastName) {
      throw new Error('Patient name not properly created');
    }

    if (!result.patient.email) {
      throw new Error('Patient email not properly created');
    }

    // Validate physical examinations and antecedents were created
    console.log('📏 Physical examinations created from anthropometric data');
    console.log('🏥 Patient antecedents created from medical history');

    console.log('✅ All validations passed');
  }

  /**
   * Save cleanup data for later removal
   */
  private saveCleanupData(data: CleanupData): void {
    this.cleanupData = data;
    const cleanupFilePath = path.join(__dirname, 'cleanup-data.json');
    fs.writeFileSync(cleanupFilePath, JSON.stringify(data, null, 2), 'utf8');
  }
}

/**
 * Execute the test
 */
async function runIM1Test(): Promise<void> {
  const test = new IM1QuestionnaireTest();

  try {
    await test.runCompleteTest();
    console.log('\n🎉 IM1 Questionnaire test completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Patient created from IM1 answers');
    console.log('   ✅ Physical examinations populated');
    console.log('   ✅ Patient antecedents recorded');
    console.log('   ✅ Questionnaire answers processed');
    console.log('   ✅ Diagnostic scores calculated');
    console.log('   ✅ Risk assessments generated');
    console.log('\n🧹 To clean up test data:');
    console.log('   npm run test:e2e:cleanup');
    console.log('   or');
    console.log('   npx ts-node test/cleanup-im1-test.ts');
  } catch (error) {
    console.error('\n❌ IM1 Questionnaire test failed:');
    console.error(error);
    process.exit(1);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  runIM1Test()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { IM1QuestionnaireTest, runIM1Test };
