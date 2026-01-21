import { DiagnosticsService } from './diagnostics.service';
import { QueryDiagnosticsDto } from './dto/query-diagnostics.dto';
export declare class DiagnosticsController {
    private readonly diagnosticsService;
    constructor(diagnosticsService: DiagnosticsService);
    findPatientDiagnostics(patientId: string, queryDto: QueryDiagnosticsDto): Promise<{
        data: {
            id: string;
            patientId: string;
            obtainedScore: number;
            maxPossibleScore: number;
            percentage: number;
            riskLevel: "low" | "high" | "medium";
            diagnosedAt: Date;
            observations: string | null;
            recommendations: import("@prisma/client/runtime/library").JsonValue;
            diagnostic: {
                id: string;
                name: string;
                description: string | null;
                minScore: number;
                maxScore: number;
                severity: string | null;
                recommendations: string | null;
                diagnosticGroup: {
                    id: string;
                    name: string;
                    description: string | null;
                    diagnosticCode: string | null;
                };
            };
            questionnaire: {
                id: string;
                name: string;
                code: string;
                completedAt: Date | null;
            };
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    findLatestPatientDiagnostics(patientId: string): Promise<{
        data: {
            id: any;
            patientId: any;
            obtainedScore: number;
            maxPossibleScore: number;
            percentage: number;
            riskLevel: "low" | "high" | "medium";
            diagnosedAt: any;
            observations: any;
            recommendations: any;
            diagnostic: {
                id: any;
                name: any;
                description: any;
                minScore: number;
                maxScore: number;
                severity: any;
                recommendations: any;
                diagnosticGroup: {
                    id: any;
                    name: any;
                    description: any;
                    diagnosticCode: any;
                };
            };
            questionnaire: {
                id: any;
                name: any;
                code: any;
                completedAt: any;
            };
        }[];
        summary: {
            totalGroups: number;
            highRisk: number;
            mediumRisk: number;
            lowRisk: number;
            lastUpdated: any;
        };
    }>;
}
