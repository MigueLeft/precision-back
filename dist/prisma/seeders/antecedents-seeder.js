"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.im1SpecificAntecedentsData = exports.psicobiologicoAntecedentsData = exports.personalAntecedentsData = exports.familiarAntecedentsData = exports.antecedentTypesData = void 0;
exports.seedAntecedents = seedAntecedents;
exports.antecedentTypesData = [
    {
        name: 'personal',
        description: 'Antecedentes personales médicos del paciente',
    },
    {
        name: 'psicobiologico',
        description: 'Antecedentes psicobiológicos del paciente',
    },
    {
        name: 'familiar',
        description: 'Antecedentes familiares médicos',
    },
];
exports.familiarAntecedentsData = [
    'Diabetes o glucosa elevada',
    'Hipertensión arterial',
    'Cardiopatía isquémica (infarto de miocardio, angina de pecho)',
    'Muerte súbita',
    'Accidente cerebrovascular',
    'Colesterol o triglicéridos elevados',
    'Sobrepeso u Obesidad',
    'Cáncer',
    'Enfermedad de la tiroides',
    'Poliquistosis renal',
    'Enfermedades psiquiátricas',
    'Asma',
    'Enfermedad autoinmune (lupus, artritis reumatoide)',
];
exports.personalAntecedentsData = [
    'Sobrepeso u obesidad',
    'Grasa en el hígado',
    'Diabetes o glucosa elevada',
    'Prediabetes',
    'Resistencia a la insulina',
    'Hipertensión arterial',
    'Colesterol o triglicéridos elevados',
    'Ácido úrico elevado o gota',
    'Apnea obstructiva del sueño',
    'Infarto al corazón o angina',
    'Accidente cerebrovascular',
    'Arritmia cardíaca',
    'Crecimiento cardíaco',
    'Insuficiencia cardíaca',
    'Otra enfermedad cardíaca',
    'Neuropatía',
    'Neuropatía consecuencia de la diabetes',
    'Disminución de la visión o ceguera (retinopatía por la diabetes)',
    'Enfermedad renal crónica consecuencia de la diabetes',
    'Osteoartritis u otro tipo de artritis',
    'Artrosis de cadera o rodillas consecuencia del peso',
    'Osteoporosis u osteopenia',
    'Dolor lumbar u otro problema crónico de espalda',
    'Dolor de cuello u otro problema crónico del cuello',
    'Hernia discal',
    'Enfermedad de Alzheimer u otra causa de demencia',
    'Otra enfermedad neurológica',
    'Disminución de la visión o ceguera',
    'Epilepsia o convulsiones',
    'Sordera o pérdida de audición',
    'Alguna discapacidad de aprendizaje',
    'Autismo o condición del espectro autista',
    'Depresión o tristeza crónica',
    'Ansiedad o miedo anticipado',
    'Trastorno de estrés postraumático (TEPT)',
    'Otra condición de salud mental',
    'Dolor de cabeza',
    'Migraña',
    'Cáncer',
    'Nódulos en las mamas',
    'Enfermedad renal crónica (en personas sin diabetes)',
    'Cálculos en los riñones',
    'Incontinencia urinaria, problemas para controlar la vejiga',
    'Enfermedad pulmonar obstructiva crónica u otra enfermedad pulmonar',
    'Asma',
    'Alergia, como rinitis, alergia al polen, conjuntivitis alérgica, dermatitis, alergia alimentaria u otra alergia',
    'Sinusitis',
    'En proceso de recuperación después de una infección por COVID-19',
    'Complicaciones después de una infección por COVID-19',
    'Otra infección viral o bacteriana tal como VIH/SIDA o tuberculosis',
    'Hepatitis',
    'Otra enfermedad del hígado',
    'Colon irritable o colitis',
    'Gastritis o úlceras (por endoscopia)',
    'Cálculos en la vesícula',
    'Hemorroides',
    'Enfermedad de la tiroides',
    'Miomas en el útero',
    'Ovario poliquístico',
    'Problemas en la próstata',
    'Infertilidad',
    'Abortos',
    'Desnutrición o bajo peso',
    'Anemia',
    'Plaquetas bajas',
    'Várices',
];
exports.psicobiologicoAntecedentsData = [
    'Palpitaciones',
    'Dolor en el pecho',
    'Dolor en las pantorrillas',
    'Hinchazón en las piernas',
    'Dificultad para respirar',
    'Pitos en el pecho',
    'Tos',
    'Ronquido',
    'Fatiga',
    'Exceso de sueño en el día',
    'Disminución de la memoria',
    'Disminución de la libido',
    'Orinar de noche',
    'Fiebre',
    'Mareos o vértigos',
    'Estrés',
    'Abundante caída del cabello',
    'Piel seca',
    'Secreción por los pezones',
    'Adormecimiento o corrientazos',
    'Problemas en la vista',
    'Acidez',
    'Gases o eructos',
    'Dolor abdominal',
    'Estreñimiento',
    'Diarrea',
    'Náuseas o vómitos',
    'Sangramiento rectal',
    'Obstrucción nasal/dolor garganta',
    'Ardor al orinar',
    'Sangre en la orina',
    'Sangramiento genital excesivo',
    'Retraso en la menstruación',
    'Sangramiento en las encías',
    'Mayor frecuencia de orina',
    'Dolor de espalda',
    'Dolor de cabeza',
    'Insomnio',
    'Tristeza crónica',
    'Miedo o Angustia',
    'Levantarse a comer de noche',
    'Comer compulsivamente',
];
exports.im1SpecificAntecedentsData = [
    'diabetes',
    'hipertension',
    'sobrepeso',
    'sobrepeso_obesidad',
    'obesidad',
    'colesterol_alto',
    'trigliceridos_altos',
    'enfermedad_cardiaca',
    'cancer',
    'asma',
    'depresion',
    'ansiedad',
];
function generateAntecedentValue(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[áàâä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòôö]/g, 'o')
        .replace(/[úùûü]/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/[^\w_]/g, '')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}
async function seedAntecedents(prisma, logger) {
    logger.log('🧬 Seeding Antecedents...');
    try {
        logger.log('Creating antecedent types...');
        for (const type of exports.antecedentTypesData) {
            await prisma.antecedentType.upsert({
                where: { name: type.name },
                update: {},
                create: type,
            });
        }
        const personalType = await prisma.antecedentType.findUnique({
            where: { name: 'personal' },
        });
        const psicobiologicoType = await prisma.antecedentType.findUnique({
            where: { name: 'psicobiologico' },
        });
        const familiarType = await prisma.antecedentType.findUnique({
            where: { name: 'familiar' },
        });
        if (!personalType || !psicobiologicoType || !familiarType) {
            throw new Error('Could not create or find antecedent types');
        }
        logger.log('Creating familiar antecedents...');
        for (const antecedent of exports.familiarAntecedentsData) {
            const value = generateAntecedentValue(antecedent);
            const existing = await prisma.antecedent.findFirst({
                where: {
                    OR: [
                        { value: value },
                        {
                            name: antecedent,
                            antecedentTypeId: familiarType.id,
                        },
                    ],
                },
            });
            if (!existing) {
                await prisma.antecedent.create({
                    data: {
                        name: antecedent,
                        value: value,
                        antecedentTypeId: familiarType.id,
                    },
                });
            }
        }
        logger.log('Creating personal antecedents...');
        for (const antecedent of exports.personalAntecedentsData) {
            const value = generateAntecedentValue(antecedent);
            const existing = await prisma.antecedent.findFirst({
                where: {
                    OR: [
                        { value: value },
                        {
                            name: antecedent,
                            antecedentTypeId: personalType.id,
                        },
                    ],
                },
            });
            if (!existing) {
                await prisma.antecedent.create({
                    data: {
                        name: antecedent,
                        value: value,
                        antecedentTypeId: personalType.id,
                    },
                });
            }
        }
        logger.log('Creating psicobiological antecedents...');
        for (const antecedent of exports.psicobiologicoAntecedentsData) {
            const value = generateAntecedentValue(antecedent);
            const existing = await prisma.antecedent.findFirst({
                where: {
                    OR: [
                        { value: value },
                        {
                            name: antecedent,
                            antecedentTypeId: psicobiologicoType.id,
                        },
                    ],
                },
            });
            if (!existing) {
                await prisma.antecedent.create({
                    data: {
                        name: antecedent,
                        value: value,
                        antecedentTypeId: psicobiologicoType.id,
                    },
                });
            }
        }
        logger.log('Creating IM1-specific antecedents...');
        for (const antecedentValue of exports.im1SpecificAntecedentsData) {
            const existingAntecedent = await prisma.antecedent.findUnique({
                where: { value: antecedentValue },
            });
            if (!existingAntecedent) {
                const antecedentName = antecedentValue.charAt(0).toUpperCase() +
                    antecedentValue.slice(1).replace(/_/g, ' ');
                await prisma.antecedent.create({
                    data: {
                        name: antecedentName,
                        value: antecedentValue,
                        antecedentTypeId: personalType.id,
                    },
                });
                await prisma.antecedent.create({
                    data: {
                        name: antecedentName,
                        value: `${antecedentValue}_familiar`,
                        antecedentTypeId: familiarType.id,
                    },
                });
            }
        }
        logger.log('✅ Antecedents created successfully');
        logger.log(`📊 Antecedents Summary:`);
        logger.log(`   - 3 Antecedent Types`);
        logger.log(`   - ${exports.familiarAntecedentsData.length} Familiar Antecedents`);
        logger.log(`   - ${exports.personalAntecedentsData.length} Personal Antecedents`);
        logger.log(`   - ${exports.psicobiologicoAntecedentsData.length} Psicobiological Antecedents`);
        logger.log(`   - ${exports.im1SpecificAntecedentsData.length} IM1-specific Antecedents (Personal & Familiar)`);
    }
    catch (error) {
        logger.error('❌ Error seeding antecedents:', error);
        throw error;
    }
}
//# sourceMappingURL=antecedents-seeder.js.map