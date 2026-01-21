export declare class CreateExamResultDto {
    patientId: string;
    examId: string;
    medicalStudyId?: string;
    numericValue?: number;
    textValue?: string;
    booleanValue?: boolean;
    resultDate: string;
    observations?: string;
    orderedBy?: string;
    interpretedBy?: string;
}
