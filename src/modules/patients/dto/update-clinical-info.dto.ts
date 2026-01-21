import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateClinicalInfoDto {
  @ApiProperty({
    description: 'Current illness - detailed clinical description',
    example:
      'Paciente acude a consulta refiriendo cuadro clínico de aproximadamente 2 semanas de evolución caracterizado por cefalea frontal de moderada intensidad, intermitente, que mejora parcialmente con analgésicos comunes. Asocia sensación de mareo ocasional y visión borrosa al realizar esfuerzos. Niega náuseas, vómitos o alteraciones de la conciencia. Refiere antecedentes de hipertensión arterial en tratamiento irregular. Al examen físico se encuentra presión arterial de 150/95 mmHg, frecuencia cardíaca de 88 lpm, afebril. Resto del examen físico sin alteraciones significativas.',
    required: false,
  })
  @IsString()
  @IsOptional()
  currentIllness?: string;

  @ApiProperty({
    description: 'Diagnostic plan - list of diagnostic procedures and follow-up',
    example:
      '1. Solicitar perfil lipídico completo, glucemia en ayunas y hemoglobina glicosilada para evaluar control metabólico.\n2. Realizar electrocardiograma de 12 derivaciones para descartar alteraciones cardíacas asociadas a hipertensión.\n3. Solicitar creatinina sérica y depuración de creatinina para evaluar función renal.\n4. Programar monitoreo ambulatorio de presión arterial (MAPA) de 24 horas.\n5. Fondoscopia para evaluar retinopatía hipertensiva.\n6. Educación sobre adherencia al tratamiento antihipertensivo y modificaciones en el estilo de vida.\n7. Control en 2 semanas para evaluar respuesta al tratamiento y resultados de laboratorio.\n8. Considerar ajuste de dosis de antihipertensivos según evolución y cifras tensionales.',
    required: false,
  })
  @IsString()
  @IsOptional()
  diagnosticPlan?: string;

  @ApiProperty({
    description: 'ID of the physician updating clinical information',
    example: 'clxxx987654321',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastClinicalUpdateBy?: string;
}
