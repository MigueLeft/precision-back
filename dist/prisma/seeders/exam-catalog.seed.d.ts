export declare const examCatalogData: ({
    category: string;
    examName: string;
    measurementUnit: string;
    referenceMin: number;
    referenceMax: number;
    dataType: string;
    normalRange: string;
} | {
    category: string;
    examName: string;
    measurementUnit: string;
    referenceMin: null;
    referenceMax: null;
    dataType: string;
    normalRange?: undefined;
} | {
    category: string;
    examName: string;
    measurementUnit: string;
    referenceMin: null;
    referenceMax: number;
    dataType: string;
    normalRange: string;
})[];
export declare function seedExamCatalog(): Promise<void>;
