import { CreateRescheduleDto } from './create-reschedule.dto';
declare const UpdateRescheduleDto_base: import("@nestjs/common").Type<Partial<CreateRescheduleDto>>;
export declare class UpdateRescheduleDto extends UpdateRescheduleDto_base {
    rescheduleStatus?: string;
}
export {};
