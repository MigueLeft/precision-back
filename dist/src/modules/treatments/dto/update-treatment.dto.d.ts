import { CreateTreatmentDto } from './create-treatment.dto';
declare const UpdateTreatmentDto_base: import("@nestjs/common").Type<Partial<Omit<CreateTreatmentDto, "patientId">>>;
export declare class UpdateTreatmentDto extends UpdateTreatmentDto_base {
}
export {};
