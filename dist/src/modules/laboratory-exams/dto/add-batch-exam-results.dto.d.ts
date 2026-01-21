declare class ExamResultItemDto {
    examId: string;
    numericValue?: number;
    textValue?: string;
    resultDate: string;
    isAbnormal?: boolean;
    observations?: string;
    orderedBy?: string;
    medicalStudyId?: string;
}
export declare class AddBatchExamResultsDto {
    patientId: string;
    results: ExamResultItemDto[];
}
export {};
