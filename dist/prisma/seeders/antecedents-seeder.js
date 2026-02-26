"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.psicobiologicoAntecedentsData = exports.personalAntecedentsData = exports.familiarAntecedentsData = exports.antecedentTypesData = void 0;
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
    { value: 'diabetes', name: 'Diabetes o glucosa elevada' },
    { value: 'hipertension', name: 'Hipertensión arterial' },
    {
        value: 'cardiopatia',
        name: 'Cardiopatía isquémica (infarto de miocardio, angina de pecho)',
    },
    { value: 'muerte_subita', name: 'Muerte súbita' },
    { value: 'accidente_cerebral', name: 'Accidente cerebrovascular' },
    {
        value: 'colesterol_alto_familiar',
        name: 'Colesterol o triglicéridos elevados',
    },
    { value: 'sobrepeso', name: 'Sobrepeso u Obesidad' },
    { value: 'cancer', name: 'Cáncer' },
    { value: 'tiroides', name: 'Enfermedad de la tiroides' },
    { value: 'poliquistosis', name: 'Poliquistosis renal' },
    { value: 'psiquiatricas', name: 'Enfermedades psiquiátricas' },
    { value: 'asma', name: 'Asma' },
    {
        value: 'autoinmune',
        name: 'Enfermedad autoinmune (lupus, artritis reumatoide)',
    },
];
exports.personalAntecedentsData = [
    { value: 'sobrepeso_obesidad', name: 'Sobrepeso u obesidad' },
    { value: 'grasa_higado', name: 'Grasa en el hígado' },
    { value: 'diabetes', name: 'Diabetes o glucosa elevada' },
    { value: 'prediabetes', name: 'Prediabetes' },
    { value: 'resistencia_insulina', name: 'Resistencia a la insulina' },
    { value: 'hipertension', name: 'Hipertensión arterial' },
    { value: 'colesterol_alto', name: 'Colesterol o triglicéridos elevados' },
    { value: 'acido_urico', name: 'Ácido úrico elevado o gota' },
    { value: 'apnea_sueno', name: 'Apnea obstructiva del sueño' },
    { value: 'infarto', name: 'Infarto al corazón o angina' },
    { value: 'accidente_cerebral', name: 'Accidente cerebrovascular' },
    { value: 'arritmia', name: 'Arritmia cardíaca' },
    { value: 'crecimiento_cardiaco', name: 'Crecimiento cardíaco' },
    { value: 'insuficiencia_cardiaca', name: 'Insuficiencia cardíaca' },
    { value: 'otra_enfermedad_cardiaca', name: 'Otra enfermedad cardíaca' },
    { value: 'neuropatia', name: 'Neuropatía' },
    {
        value: 'neuropatia_diabetes',
        name: 'Neuropatía consecuencia de la diabetes',
    },
    {
        value: 'retinopatia_diabetes',
        name: 'Disminución de la visión o ceguera (retinopatía por la diabetes)',
    },
    {
        value: 'enfermedad_renal_diabetes',
        name: 'Enfermedad renal crónica consecuencia de la diabetes',
    },
    {
        value: 'osteoartritis',
        name: 'Osteoartritis u otro tipo de artritis',
    },
    {
        value: 'artrosis_peso',
        name: 'Artrosis de cadera o rodillas consecuencia del peso',
    },
    { value: 'osteoporosis', name: 'Osteoporosis u osteopenia' },
    {
        value: 'dolor_lumbar',
        name: 'Dolor lumbar u otro problema crónico de espalda',
    },
    {
        value: 'dolor_cuello',
        name: 'Dolor de cuello u otro problema crónico del cuello',
    },
    { value: 'hernia_discal', name: 'Hernia discal' },
    {
        value: 'alzheimer_demencia',
        name: 'Enfermedad de Alzheimer u otra causa de demencia',
    },
    { value: 'otra_enfermedad_neurologica', name: 'Otra enfermedad neurológica' },
    { value: 'disminucion_vision', name: 'Disminución de la visión o ceguera' },
    { value: 'epilepsia', name: 'Epilepsia o convulsiones' },
    { value: 'sordera', name: 'Sordera o pérdida de audición' },
    {
        value: 'discapacidad_aprendizaje',
        name: 'Alguna discapacidad de aprendizaje',
    },
    { value: 'autismo', name: 'Autismo o condición del espectro autista' },
    { value: 'depresion', name: 'Depresión o tristeza crónica' },
    { value: 'ansiedad', name: 'Ansiedad o miedo anticipado' },
    {
        value: 'tept',
        name: 'Trastorno de estrés postraumático (TEPT)',
    },
    { value: 'otra_salud_mental', name: 'Otra condición de salud mental' },
    { value: 'dolor_cabeza', name: 'Dolor de cabeza' },
    { value: 'migrana', name: 'Migraña' },
    { value: 'cancer', name: 'Cáncer' },
    { value: 'nodulos_mamas', name: 'Nódulos en las mamas' },
    {
        value: 'enfermedad_renal_cronica',
        name: 'Enfermedad renal crónica (en personas sin diabetes)',
    },
    { value: 'calculos_rinones', name: 'Cálculos en los riñones' },
    {
        value: 'incontinencia_urinaria',
        name: 'Incontinencia urinaria, problemas para controlar la vejiga',
    },
    {
        value: 'epoc',
        name: 'Enfermedad pulmonar obstructiva crónica u otra enfermedad pulmonar',
    },
    { value: 'asma', name: 'Asma' },
    {
        value: 'alergia',
        name: 'Alergia, como rinitis, alergia al polen, conjuntivitis alérgica, dermatitis, alergia alimentaria u otra alergia',
    },
    { value: 'sinusitis', name: 'Sinusitis' },
    {
        value: 'recuperacion_covid',
        name: 'En proceso de recuperación después de una infección por COVID-19',
    },
    {
        value: 'complicaciones_covid',
        name: 'Complicaciones después de una infección por COVID-19',
    },
    {
        value: 'otra_infeccion_viral',
        name: 'Otra infección viral o bacteriana tal como VIH/SIDA o tuberculosis',
    },
    { value: 'hepatitis', name: 'Hepatitis' },
    { value: 'otra_enfermedad_higado', name: 'Otra enfermedad del hígado' },
    { value: 'colon_irritable', name: 'Colon irritable o colitis' },
    { value: 'gastritis_ulceras', name: 'Gastritis o úlceras (por endoscopia)' },
    { value: 'calculos_vesicula', name: 'Cálculos en la vesícula' },
    { value: 'hemorroides', name: 'Hemorroides' },
    { value: 'tiroides', name: 'Enfermedad de la tiroides' },
    { value: 'miomas_utero', name: 'Miomas en el útero' },
    { value: 'ovario_poliquistico', name: 'Ovario poliquístico' },
    { value: 'problemas_prostata', name: 'Problemas en la próstata' },
    { value: 'infertilidad', name: 'Infertilidad' },
    { value: 'abortos', name: 'Abortos' },
    { value: 'desnutricion', name: 'Desnutrición o bajo peso' },
    { value: 'anemia', name: 'Anemia' },
    { value: 'plaquetas_bajas', name: 'Plaquetas bajas' },
    { value: 'varices', name: 'Várices' },
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
            const existing = await prisma.antecedent.findFirst({
                where: {
                    OR: [
                        { value: antecedent.value },
                        { name: antecedent.name, antecedentTypeId: familiarType.id },
                    ],
                },
            });
            if (!existing) {
                await prisma.antecedent.create({
                    data: {
                        name: antecedent.name,
                        value: antecedent.value,
                        antecedentTypeId: familiarType.id,
                    },
                });
            }
        }
        logger.log('Creating personal antecedents...');
        for (const antecedent of exports.personalAntecedentsData) {
            const existing = await prisma.antecedent.findFirst({
                where: {
                    OR: [
                        { value: antecedent.value },
                        { name: antecedent.name, antecedentTypeId: personalType.id },
                    ],
                },
            });
            if (!existing) {
                await prisma.antecedent.create({
                    data: {
                        name: antecedent.name,
                        value: antecedent.value,
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
                        { name: antecedent, antecedentTypeId: psicobiologicoType.id },
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
        logger.log('✅ Antecedents created successfully');
        logger.log(`📊 Antecedents Summary:`);
        logger.log(`   - 3 Antecedent Types`);
        logger.log(`   - ${exports.familiarAntecedentsData.length} Familiar Antecedents`);
        logger.log(`   - ${exports.personalAntecedentsData.length} Personal Antecedents`);
        logger.log(`   - ${exports.psicobiologicoAntecedentsData.length} Psicobiological Antecedents`);
    }
    catch (error) {
        logger.error('❌ Error seeding antecedents:', error);
        throw error;
    }
}
//# sourceMappingURL=antecedents-seeder.js.map