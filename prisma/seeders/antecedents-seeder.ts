import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

// ==========================================
// ANTECEDENTS DATA
// ==========================================

export const antecedentTypesData = [
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

export const familiarAntecedentsData = [
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

export const personalAntecedentsData = [
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

export const psicobiologicoAntecedentsData = [
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

// Antecedents específicos usados en IM1 (además de los ya existentes)
export const im1SpecificAntecedentsData = [
  'diabetes',
  'hipertension',
  'sobrepeso',
  'sobrepeso_obesidad', // Valor específico usado en antecedentes personales IM1
  'obesidad',
  'colesterol_alto',
  'trigliceridos_altos',
  'enfermedad_cardiaca',
  'cancer',
  'asma',
  'depresion',
  'ansiedad',
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function generateAntecedentValue(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_') // Espacios a guiones bajos
    .replace(/[áàâä]/g, 'a') // Acentos
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^\w_]/g, '') // Remover caracteres especiales excepto _
    .replace(/_+/g, '_') // Múltiples _ a uno solo
    .replace(/^_|_$/g, ''); // Remover _ al inicio y final
}

// ==========================================
// ANTECEDENTS SEEDER FUNCTION
// ==========================================

export async function seedAntecedents(prisma: PrismaClient, logger: Logger) {
  logger.log('🧬 Seeding Antecedents...');

  try {
    // 1. Create antecedent types
    logger.log('Creating antecedent types...');
    for (const type of antecedentTypesData) {
      await prisma.antecedentType.upsert({
        where: { name: type.name },
        update: {},
        create: type,
      });
    }

    // 2. Get created types
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

    // 3. Create familiar antecedents
    logger.log('Creating familiar antecedents...');
    for (const antecedent of familiarAntecedentsData) {
      const value = generateAntecedentValue(antecedent);

      // Check if exists first to avoid duplicates
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

    // 4. Create personal antecedents
    logger.log('Creating personal antecedents...');
    for (const antecedent of personalAntecedentsData) {
      const value = generateAntecedentValue(antecedent);

      // Check if exists first to avoid duplicates
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

    // 5. Create psicobiological antecedents
    logger.log('Creating psicobiological antecedents...');
    for (const antecedent of psicobiologicoAntecedentsData) {
      const value = generateAntecedentValue(antecedent);

      // Check if exists first to avoid duplicates
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

    // 6. Create IM1-specific antecedents (ensure they exist with correct values)
    logger.log('Creating IM1-specific antecedents...');
    for (const antecedentValue of im1SpecificAntecedentsData) {
      // First try to find if this antecedent already exists by value
      const existingAntecedent = await prisma.antecedent.findUnique({
        where: { value: antecedentValue },
      });

      if (!existingAntecedent) {
        // Create the antecedent with both Personal and Familiar types
        const antecedentName =
          antecedentValue.charAt(0).toUpperCase() +
          antecedentValue.slice(1).replace(/_/g, ' ');

        // Create for Personal type
        await prisma.antecedent.create({
          data: {
            name: antecedentName,
            value: antecedentValue,
            antecedentTypeId: personalType.id,
          },
        });

        // Create for Familiar type (with suffix to avoid unique constraint issues)
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
    logger.log(`   - ${familiarAntecedentsData.length} Familiar Antecedents`);
    logger.log(`   - ${personalAntecedentsData.length} Personal Antecedents`);
    logger.log(
      `   - ${psicobiologicoAntecedentsData.length} Psicobiological Antecedents`,
    );
    logger.log(
      `   - ${im1SpecificAntecedentsData.length} IM1-specific Antecedents (Personal & Familiar)`,
    );
  } catch (error) {
    logger.error('❌ Error seeding antecedents:', error);
    throw error;
  }
}
