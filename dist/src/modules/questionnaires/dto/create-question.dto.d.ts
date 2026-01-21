import { QuestionType } from '@prisma/client';
export declare class CreateQuestionDto {
    code: string;
    questionText: string;
    questionType: QuestionType;
    options?: Record<string, any>;
    inputType?: string;
    hasScore?: boolean;
    active?: boolean;
}
