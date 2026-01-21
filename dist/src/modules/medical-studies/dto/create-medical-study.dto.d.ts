export declare class CreateMedicalStudyDto {
    patientId: string;
    studyDate: string;
    studyType: string;
    studyLocation?: string;
    resultFilePath?: string;
    resultFileUrl?: string;
    imageFilePath?: string;
    imageFileUrl?: string;
    studyName?: string;
    description?: string;
    findings?: string;
    orderedBy?: string;
    interpretedBy?: string;
    status?: string;
    active?: boolean;
}
