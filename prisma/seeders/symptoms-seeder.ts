import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

// ==========================================
// SYMPTOMS DATA
// ==========================================

export const symptomCategoriesData = [
  {
    name: 'cardiovascular',
    description: 'Síntomas relacionados con el sistema cardiovascular',
  },
  {
    name: 'respiratorio',
    description: 'Síntomas relacionados con el sistema respiratorio',
  },
  {
    name: 'neurológico',
    description: 'Síntomas relacionados con el sistema nervioso',
  },
  {
    name: 'gastrointestinal',
    description: 'Síntomas relacionados con el sistema digestivo',
  },
  {
    name: 'genitourinario',
    description: 'Síntomas relacionados con el sistema genitourinario',
  },
  {
    name: 'musculoesquelético',
    description: 'Síntomas relacionados con músculos y huesos',
  },
  {
    name: 'dermatológico',
    description: 'Síntomas relacionados con la piel',
  },
  {
    name: 'endocrino',
    description: 'Síntomas relacionados con el sistema endocrino',
  },
  {
    name: 'psicológico',
    description: 'Síntomas relacionados con el estado mental y emocional',
  },
  {
    name: 'general',
    description: 'Síntomas generales y sistémicos',
  },
];

// Síntomas del IM1 organizados por categorías
export const symptomsData = {
  cardiovascular: [
    { value: 'palpitaciones', name: 'Palpitaciones' },
    { value: 'dolor_pecho', name: 'Dolor en el pecho' },
    { value: 'dolor_pantorrillas', name: 'Dolor en las pantorrillas' },
    { value: 'hinchazon_piernas', name: 'Hinchazón en las piernas' },
  ],
  respiratorio: [
    { value: 'dificultad_respirar', name: 'Dificultad para respirar' },
    { value: 'pitos_pecho', name: 'Pitos en el pecho' },
    { value: 'tos', name: 'Tos' },
    { value: 'ronquido', name: 'Ronquido' },
    { value: 'obstruccion_nasal', name: 'Obstrucción nasal/dolor garganta' },
  ],
  neurológico: [
    { value: 'disminucion_memoria', name: 'Disminución de la memoria' },
    { value: 'mareos_vertigos', name: 'Mareos o vértigos' },
    { value: 'adormecimiento', name: 'Adormecimiento o corrientazos' },
    { value: 'problemas_vista', name: 'Problemas en la vista' },
    { value: 'dolor_cabeza', name: 'Dolor de cabeza' },
  ],
  gastrointestinal: [
    { value: 'acidez', name: 'Acidez' },
    { value: 'gases_eructos', name: 'Gases o eructos' },
    { value: 'dolor_abdominal', name: 'Dolor abdominal' },
    { value: 'estrenimiento', name: 'Estreñimiento' },
    { value: 'diarrea', name: 'Diarrea' },
    { value: 'nauseas_vomitos', name: 'Náuseas o vómitos' },
    { value: 'sangramiento_rectal', name: 'Sangramiento rectal' },
    { value: 'sangramiento_encias', name: 'Sangramiento en las encías' },
  ],
  genitourinario: [
    { value: 'orinar_noche', name: 'Orinar de noche' },
    { value: 'ardor_orinar', name: 'Ardor al orinar' },
    { value: 'sangre_orina', name: 'Sangre en la orina' },
    { value: 'sangramiento_genital', name: 'Sangramiento genital excesivo' },
    { value: 'retraso_menstruacion', name: 'Retraso en la menstruación' },
    { value: 'mayor_frecuencia_orina', name: 'Mayor frecuencia de orina' },
  ],
  musculoesquelético: [{ value: 'dolor_espalda', name: 'Dolor de espalda' }],
  dermatológico: [
    { value: 'caida_cabello', name: 'Abundante caída del cabello' },
    { value: 'piel_seca', name: 'Piel seca' },
  ],
  endocrino: [
    { value: 'disminucion_libido', name: 'Disminución de la libido' },
    { value: 'secrecion_pezones', name: 'Secreción por los pezones' },
  ],
  psicológico: [
    { value: 'estres', name: 'Estrés' },
    { value: 'insomnio', name: 'Insomnio' },
    { value: 'tristeza_cronica', name: 'Tristeza crónica' },
    { value: 'miedo_angustia', name: 'Miedo o Angustia' },
    { value: 'levantarse_comer_noche', name: 'Levantarse a comer de noche' },
    { value: 'comer_compulsivamente', name: 'Comer compulsivamente' },
  ],
  general: [
    { value: 'fatiga', name: 'Fatiga' },
    { value: 'exceso_sueno_dia', name: 'Exceso de sueño en el día' },
    { value: 'fiebre', name: 'Fiebre' },
  ],
};

// ==========================================
// SYMPTOMS SEEDER FUNCTION
// ==========================================

export async function seedSymptoms(prisma: PrismaClient, logger: Logger) {
  logger.log('🔍 Seeding Symptoms...');

  try {
    // 1. Create symptom categories
    logger.log('Creating symptom categories...');
    for (const category of symptomCategoriesData) {
      await prisma.symptomCategory.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      });
    }

    // 2. Get created categories
    const categories = await prisma.symptomCategory.findMany();
    const categoryMap = new Map(categories.map((c) => [c.name, c]));

    let totalSymptoms = 0;

    // 3. Create symptoms for each category
    for (const [categoryName, symptoms] of Object.entries(symptomsData)) {
      const category = categoryMap.get(categoryName);
      if (!category) {
        logger.warn(`Category ${categoryName} not found, skipping symptoms`);
        continue;
      }

      logger.log(`Creating symptoms for category: ${categoryName}`);

      for (const symptom of symptoms) {
        // Check if exists first to avoid duplicates
        const existing = await prisma.symptom.findFirst({
          where: {
            OR: [
              { value: symptom.value },
              {
                name: symptom.name,
                symptomCategoryId: category.id,
              },
            ],
          },
        });

        if (!existing) {
          await prisma.symptom.create({
            data: {
              name: symptom.name,
              value: symptom.value,
              symptomCategoryId: category.id,
              active: true,
            },
          });
          totalSymptoms++;
        }
      }
    }

    logger.log('✅ Symptoms created successfully');
    logger.log(`📊 Symptoms Summary:`);
    logger.log(`   - ${symptomCategoriesData.length} Symptom Categories`);
    logger.log(`   - ${totalSymptoms} Symptoms created`);

    // Summary by category
    for (const [categoryName, symptoms] of Object.entries(symptomsData)) {
      logger.log(`   - ${categoryName}: ${symptoms.length} symptoms`);
    }
  } catch (error) {
    logger.error('❌ Error seeding symptoms:', error);
    throw error;
  }
}
