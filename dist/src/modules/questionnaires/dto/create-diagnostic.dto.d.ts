export declare class CreateDiagnosticDto {
    diagnosticGroupId: string;
    name: string;
    description?: string;
    minScore: number;
    maxScore: number;
    severity?: string;
    recommendations?: string;
    colorCode?: string;
}
