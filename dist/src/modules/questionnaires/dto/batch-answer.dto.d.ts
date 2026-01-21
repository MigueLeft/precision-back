declare class AnswerItemDto {
    questionId: string;
    answerText?: string;
    answerValue?: number;
    answerBoolean?: boolean;
    score?: number;
}
export declare class BatchAnswerDto {
    patientId?: string;
    questionnaireId: string;
    answers: AnswerItemDto[];
}
export declare class ProcessedQuestionnaireResultDto {
    patientQuestionnaireId: string;
    patient: any;
    questionnaire: any;
    answers: {
        id: string;
        questionText: string;
        questionCode: string;
        questionType: string;
        textValue?: string;
        numericValue?: number;
        booleanValue?: boolean;
        score: number;
        answeredAt: Date;
        readableAnswer: string;
    }[];
    diagnostics: {
        group: string;
        name: string;
        description?: string;
        score: number;
        threshold: number;
        risk: 'low' | 'medium' | 'high';
    }[];
    summary: {
        totalScore: number;
        maxPossibleScore: number;
        scorePercentage: number;
        completedAt: Date;
        overallRisk: 'low' | 'medium' | 'high';
        relationsProcessingStatus?: 'pending' | 'processing' | 'completed' | 'failed';
    };
    answersBySection?: {
        sectionName: string;
        questions: {
            questionText: string;
            answer: string;
            score: number;
        }[];
        sectionScore: number;
        maxSectionScore: number;
    }[];
}
export {};
