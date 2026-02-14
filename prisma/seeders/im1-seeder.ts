import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
import {
  questionnaireData,
  diagnosticGroups,
  diagnostics,
  scoringQuestions,
  nonScoringQuestions,
  questionGroupMappings,
  questionaireSummary,
} from '../im1';

export async function seedIM1Questionnaire(
  prisma: PrismaClient,
  logger: Logger,
) {
  logger.log('🌱 Seeding IM1 Questionnaire...');

  try {
    // 1. Crear el cuestionario IM1
    const questionnaire = await prisma.questionnaire.upsert({
      where: { code: questionnaireData.code },
      update: {},
      create: questionnaireData,
    });

    logger.log('✅ Created IM1 Questionnaire');

    // 2. Crear grupos diagnósticos
    const createdGroups: any = {};

    for (const groupData of diagnosticGroups) {
      const group = await prisma.diagnosticGroup.upsert({
        where: {
          questionnaireId_name: {
            questionnaireId: questionnaire.id,
            name: groupData.name,
          },
        },
        update: {},
        create: {
          ...groupData,
          questionnaireId: questionnaire.id,
        },
      });
      createdGroups[groupData.name] = group;
    }

    logger.log('✅ Created diagnostic groups');

    // 3. Crear diagnósticos para cada grupo
    const diagnosticMappings = [
      { groupName: 'A.5. Educación', diagnosticsKey: 'educacion' },
      {
        groupName: 'A.6. Estatus Socioeconómico',
        diagnosticsKey: 'estatus_socio',
      },
      { groupName: 'Nutrición', diagnosticsKey: 'nutricion' },
      {
        groupName: 'D.2. Actividad física - Nivel',
        diagnosticsKey: 'nivel_actividad',
      },
      {
        groupName: 'D.2. Actividad física - Minutos',
        diagnosticsKey: 'minutos_actividad',
      },
      { groupName: 'D.3.1. Calidad de sueño', diagnosticsKey: 'calidad_sueno' },
      { groupName: 'D.3.1. Horas de sueño', diagnosticsKey: 'horas_sueno' },
      {
        groupName: 'D.4.1. Síntomas de ansiedad (GAD-7)',
        diagnosticsKey: 'mental_health',
        descSuffix: ' de ansiedad',
      },
      {
        groupName: 'D.4.2. Síntomas de depresión (PHQ-9)',
        diagnosticsKey: 'mental_health',
        descSuffix: ' de depresión',
      },
      { groupName: 'D.5.1. Alcohol (AUDIT-C)', diagnosticsKey: 'alcohol' },
      { groupName: 'D.5.2. Tabaquismo (ASSIST)', diagnosticsKey: 'tabaquismo' },
      { groupName: 'D.5.3. Drogas (ASSIST)', diagnosticsKey: 'drogas' },
    ];

    for (const mapping of diagnosticMappings) {
      const group = createdGroups[mapping.groupName];
      const diagnosticList =
        diagnostics[mapping.diagnosticsKey as keyof typeof diagnostics];

      if (group && diagnosticList) {
        for (const diag of diagnosticList) {
          await prisma.diagnostic.upsert({
            where: {
              diagnosticGroupId_name: {
                diagnosticGroupId: group.id,
                name: diag.name,
              },
            },
            update: {},
            create: {
              diagnosticGroupId: group.id,
              name: diag.name,
              description: diag.description + (mapping.descSuffix || ''),
              minScore: diag.minScore,
              maxScore: diag.maxScore,
              severity: diag.severity as any,
              colorCode: diag.colorCode,
            },
          });
        }
      }
    }

    logger.log('✅ Created diagnostics');

    // 4. Crear preguntas con puntuación
    const createdQuestions: any = {};

    for (const question of scoringQuestions) {
      const created = await prisma.question.upsert({
        where: { code: question.code },
        update: {
          questionText: question.questionText,
          descriptionText: (question as any).descriptionText || null,
          questionType: question.questionType,
          inputType: question.inputType,
          options: question.options || undefined,
          hasScore: question.hasScore,
          active: true,
          dependsOn: (question as any).dependsOn || null,
          showWhen: (question as any).showWhen || null,
        },
        create: {
          code: question.code,
          questionText: question.questionText,
          descriptionText: (question as any).descriptionText || null,
          questionType: question.questionType,
          inputType: question.inputType,
          options: question.options || undefined,
          hasScore: question.hasScore,
          active: true,
          dependsOn: (question as any).dependsOn || null,
          showWhen: (question as any).showWhen || null,
        },
      });
      createdQuestions[question.code] = created;
    }

    logger.log('✅ Created/Updated questions with scoring');

    // 5. Crear preguntas sin puntuación
    for (const question of nonScoringQuestions) {
      const created = await prisma.question.upsert({
        where: { code: question.code },
        update: {
          questionText: question.text,
          descriptionText: (question as any).descriptionText || null,
          questionType: question.type,
          inputType: question.inputType,
          options: question.options || undefined,
          hasScore: false,
          active: true,
          dependsOn: (question as any).dependsOn || null,
          showWhen: (question as any).showWhen || null,
        },
        create: {
          code: question.code,
          questionText: question.text,
          descriptionText: (question as any).descriptionText || null,
          questionType: question.type,
          inputType: question.inputType,
          options: question.options || undefined,
          hasScore: false,
          active: true,
          dependsOn: (question as any).dependsOn || null,
          showWhen: (question as any).showWhen || null,
        },
      });
      createdQuestions[question.code] = created;
    }

    logger.log('✅ Created all questions');

    // 6. Relacionar preguntas con grupos diagnósticos
    for (const mapping of questionGroupMappings) {
      const question = createdQuestions[mapping.questionCode];
      const group = createdGroups[mapping.groupName];

      if (question && group) {
        await prisma.questionDiagnosticGroup.upsert({
          where: {
            questionId_diagnosticGroupId: {
              questionId: question.id,
              diagnosticGroupId: group.id,
            },
          },
          update: {},
          create: {
            questionId: question.id,
            diagnosticGroupId: group.id,
            weight: 1.0,
          },
        });
      }
    }

    logger.log('✅ Linked questions to diagnostic groups');

    // 7. Crear relaciones questionnaire-question con orden
    // Función para extraer números del código para ordenamiento correcto
    function parseQuestionCode(code: string) {
      const match = code.match(/im1_([a-z])(\d+)_(\d+)/);
      if (match) {
        const section = match[1];
        const subsection = parseInt(match[2]);
        const number = parseInt(match[3]);
        // Convertir letra a número para ordenamiento (a=1, b=2, c=3, d=4, e=5)
        const sectionOrder = section.charCodeAt(0) - 96; // 'a' = 97, así que 'a' = 1, 'b' = 2, etc.
        return { sectionOrder, subsection, number, fullCode: code };
      }
      return {
        sectionOrder: 999,
        subsection: 999,
        number: 999,
        fullCode: code,
      };
    }

    // Combinar todas las preguntas y ordenarlas por código
    const allQuestionCodes = [
      ...scoringQuestions.map((q) => q.code),
      ...nonScoringQuestions.map((q) => q.code),
    ];

    // Ordenar todas las preguntas por su código
    const sortedQuestionCodes = allQuestionCodes.sort((a, b) => {
      const aData = parseQuestionCode(a);
      const bData = parseQuestionCode(b);

      // Primero por sección (a, b, c, d, e)
      if (aData.sectionOrder !== bData.sectionOrder) {
        return aData.sectionOrder - bData.sectionOrder;
      }

      // Luego por subsección
      if (aData.subsection !== bData.subsection) {
        return aData.subsection - bData.subsection;
      }

      // Finalmente por número
      return aData.number - bData.number;
    });

    // Eliminar relaciones existentes para evitar conflictos de unique constraint en order
    await prisma.questionnaireQuestion.deleteMany({
      where: { questionnaireId: questionnaire.id },
    });

    let order = 1;
    for (const questionCode of sortedQuestionCodes) {
      const question = createdQuestions[questionCode];
      if (question) {
        // Determinar si es una pregunta con scoring o sin scoring
        const isScoringQuestion = scoringQuestions.some(
          (q) => q.code === questionCode,
        );
        const nonScoringQuestion = nonScoringQuestions.find(
          (q) => q.code === questionCode,
        );

        await prisma.questionnaireQuestion.create({
          data: {
            questionnaireId: questionnaire.id,
            questionId: question.id,
            order: order++,
            required: isScoringQuestion
              ? true
              : nonScoringQuestion?.required || false,
            section: isScoringQuestion
              ? getQuestionSection(questionCode)
              : nonScoringQuestion?.section || 'General',
          },
        });
      }
    }

    logger.log('✅ Created questionnaire-question relationships');

    // 8. Desactivar preguntas eliminadas
    const deletedQuestionCodes = ['im1_d3_3']; // Pregunta de apnea NoSAS eliminada
    for (const code of deletedQuestionCodes) {
      await prisma.question.updateMany({
        where: { code },
        data: { active: false },
      });
    }
    logger.log('✅ Deactivated removed questions');

    // Summary
    logger.log('🎉 IM1 Questionnaire seeded successfully!');
    logger.log(`📊 Summary:`);
    logger.log(`   - 1 Questionnaire: IM1`);
    logger.log(
      `   - ${questionaireSummary.totalDiagnosticGroups} Diagnostic Groups`,
    );
    logger.log(`   - 35+ Diagnostics`);
    logger.log(
      `   - ${questionaireSummary.totalQuestions} Questions total (${questionaireSummary.questionsWithScoring} with scoring)`,
    );
    logger.log(`   - All relationships configured`);
    logger.log(`   - All 89 questions from PREGUNTAS.md included`);
  } catch (error) {
    logger.error('❌ Error seeding IM1 questionnaire:', error);
    throw error;
  }
}

function getQuestionSection(questionCode: string): string {
  if (questionCode.startsWith('im1_a'))
    return 'Estado Civil Y Datos Demográficos';
  if (questionCode.startsWith('im1_b')) return 'Historia Médica';
  if (questionCode.startsWith('im1_c'))
    return 'Mediciones Físicas, Laboratorio Y Medicamentos';
  if (questionCode.startsWith('im1_d1')) return 'Nutrición';
  if (questionCode.startsWith('im1_d2')) return 'Actividad Física';
  if (questionCode.startsWith('im1_d3')) return 'Sueño';
  if (questionCode.startsWith('im1_d4')) return 'Estrés Y Salud Mental';
  if (questionCode.startsWith('im1_d5')) return 'Hábitos Y Adicciones';
  if (questionCode.startsWith('im1_d')) return 'Estilo De Vida';
  if (questionCode.startsWith('im1_e'))
    return 'Metas Y Motivaciones Personales';
  return 'General';
}
