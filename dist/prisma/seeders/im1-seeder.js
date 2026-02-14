"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedIM1Questionnaire = seedIM1Questionnaire;
const im1_1 = require("../im1");
async function seedIM1Questionnaire(prisma, logger) {
    logger.log('🌱 Seeding IM1 Questionnaire...');
    try {
        const questionnaire = await prisma.questionnaire.upsert({
            where: { code: im1_1.questionnaireData.code },
            update: {},
            create: im1_1.questionnaireData,
        });
        logger.log('✅ Created IM1 Questionnaire');
        const createdGroups = {};
        for (const groupData of im1_1.diagnosticGroups) {
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
            const diagnosticList = im1_1.diagnostics[mapping.diagnosticsKey];
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
                            severity: diag.severity,
                            colorCode: diag.colorCode,
                        },
                    });
                }
            }
        }
        logger.log('✅ Created diagnostics');
        const createdQuestions = {};
        for (const question of im1_1.scoringQuestions) {
            const created = await prisma.question.upsert({
                where: { code: question.code },
                update: {
                    questionText: question.questionText,
                    descriptionText: question.descriptionText || null,
                    questionType: question.questionType,
                    inputType: question.inputType,
                    options: question.options || undefined,
                    hasScore: question.hasScore,
                    active: true,
                    dependsOn: question.dependsOn || null,
                    showWhen: question.showWhen || null,
                },
                create: {
                    code: question.code,
                    questionText: question.questionText,
                    descriptionText: question.descriptionText || null,
                    questionType: question.questionType,
                    inputType: question.inputType,
                    options: question.options || undefined,
                    hasScore: question.hasScore,
                    active: true,
                    dependsOn: question.dependsOn || null,
                    showWhen: question.showWhen || null,
                },
            });
            createdQuestions[question.code] = created;
        }
        logger.log('✅ Created/Updated questions with scoring');
        for (const question of im1_1.nonScoringQuestions) {
            const created = await prisma.question.upsert({
                where: { code: question.code },
                update: {
                    questionText: question.text,
                    descriptionText: question.descriptionText || null,
                    questionType: question.type,
                    inputType: question.inputType,
                    options: question.options || undefined,
                    hasScore: false,
                    active: true,
                    dependsOn: question.dependsOn || null,
                    showWhen: question.showWhen || null,
                },
                create: {
                    code: question.code,
                    questionText: question.text,
                    descriptionText: question.descriptionText || null,
                    questionType: question.type,
                    inputType: question.inputType,
                    options: question.options || undefined,
                    hasScore: false,
                    active: true,
                    dependsOn: question.dependsOn || null,
                    showWhen: question.showWhen || null,
                },
            });
            createdQuestions[question.code] = created;
        }
        logger.log('✅ Created all questions');
        for (const mapping of im1_1.questionGroupMappings) {
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
        function parseQuestionCode(code) {
            const match = code.match(/im1_([a-z])(\d+)_(\d+)/);
            if (match) {
                const section = match[1];
                const subsection = parseInt(match[2]);
                const number = parseInt(match[3]);
                const sectionOrder = section.charCodeAt(0) - 96;
                return { sectionOrder, subsection, number, fullCode: code };
            }
            return {
                sectionOrder: 999,
                subsection: 999,
                number: 999,
                fullCode: code,
            };
        }
        const allQuestionCodes = [
            ...im1_1.scoringQuestions.map((q) => q.code),
            ...im1_1.nonScoringQuestions.map((q) => q.code),
        ];
        const sortedQuestionCodes = allQuestionCodes.sort((a, b) => {
            const aData = parseQuestionCode(a);
            const bData = parseQuestionCode(b);
            if (aData.sectionOrder !== bData.sectionOrder) {
                return aData.sectionOrder - bData.sectionOrder;
            }
            if (aData.subsection !== bData.subsection) {
                return aData.subsection - bData.subsection;
            }
            return aData.number - bData.number;
        });
        await prisma.questionnaireQuestion.deleteMany({
            where: { questionnaireId: questionnaire.id },
        });
        let order = 1;
        for (const questionCode of sortedQuestionCodes) {
            const question = createdQuestions[questionCode];
            if (question) {
                const isScoringQuestion = im1_1.scoringQuestions.some((q) => q.code === questionCode);
                const nonScoringQuestion = im1_1.nonScoringQuestions.find((q) => q.code === questionCode);
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
        const deletedQuestionCodes = ['im1_d3_3'];
        for (const code of deletedQuestionCodes) {
            await prisma.question.updateMany({
                where: { code },
                data: { active: false },
            });
        }
        logger.log('✅ Deactivated removed questions');
        logger.log('🎉 IM1 Questionnaire seeded successfully!');
        logger.log(`📊 Summary:`);
        logger.log(`   - 1 Questionnaire: IM1`);
        logger.log(`   - ${im1_1.questionaireSummary.totalDiagnosticGroups} Diagnostic Groups`);
        logger.log(`   - 35+ Diagnostics`);
        logger.log(`   - ${im1_1.questionaireSummary.totalQuestions} Questions total (${im1_1.questionaireSummary.questionsWithScoring} with scoring)`);
        logger.log(`   - All relationships configured`);
        logger.log(`   - All 89 questions from PREGUNTAS.md included`);
    }
    catch (error) {
        logger.error('❌ Error seeding IM1 questionnaire:', error);
        throw error;
    }
}
function getQuestionSection(questionCode) {
    if (questionCode.startsWith('im1_a'))
        return 'Estado Civil Y Datos Demográficos';
    if (questionCode.startsWith('im1_b'))
        return 'Historia Médica';
    if (questionCode.startsWith('im1_c'))
        return 'Mediciones Físicas, Laboratorio Y Medicamentos';
    if (questionCode.startsWith('im1_d1'))
        return 'Nutrición';
    if (questionCode.startsWith('im1_d2'))
        return 'Actividad Física';
    if (questionCode.startsWith('im1_d3'))
        return 'Sueño';
    if (questionCode.startsWith('im1_d4'))
        return 'Estrés Y Salud Mental';
    if (questionCode.startsWith('im1_d5'))
        return 'Hábitos Y Adicciones';
    if (questionCode.startsWith('im1_d'))
        return 'Estilo De Vida';
    if (questionCode.startsWith('im1_e'))
        return 'Metas Y Motivaciones Personales';
    return 'General';
}
//# sourceMappingURL=im1-seeder.js.map