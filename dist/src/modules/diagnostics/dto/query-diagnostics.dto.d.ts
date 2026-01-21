export declare class QueryDiagnosticsDto {
    page?: number;
    limit?: number;
    search?: string;
    diagnosticGroupId?: string;
    fromDate?: string;
    toDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
