import { ContactMethod, ContactResult } from '@prisma/client';
export declare class CreateContactAttemptDto {
    followUpId: string;
    attemptNumber: number;
    contactMethod?: ContactMethod;
    contactDateTime?: string;
    contactResult: ContactResult;
    contactDuration?: number;
    contactNotes?: string;
    patientResponse?: string;
    appointmentScheduled?: boolean;
    newAppointmentId?: string;
    rescheduleRequested?: boolean;
    rescheduleId?: string;
}
