export declare const questionnaireData: {
    code: string;
    name: string;
    description: string;
    version: string;
    active: boolean;
};
export declare const diagnosticGroups: ({
    name: string;
    description: string;
    diagnosticCode: string;
    scoringMethod: string;
    active: boolean;
    scoringConfig?: undefined;
} | {
    name: string;
    description: string;
    diagnosticCode: string;
    scoringMethod: string;
    scoringConfig: {
        maxScore: number;
        formula?: undefined;
    };
    active: boolean;
} | {
    name: string;
    description: string;
    diagnosticCode: string;
    scoringMethod: string;
    scoringConfig: {
        formula: string;
        maxScore: number;
    };
    active: boolean;
})[];
export declare const diagnostics: {
    educacion: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    estatus_socio: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    medas: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    nivel_actividad: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    minutos_actividad: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    calidad_sueno: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    horas_sueno: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    apnea_sueno: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    mental_health: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    alcohol: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    tabaquismo: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
    drogas: {
        name: string;
        description: string;
        minScore: number;
        maxScore: number;
        severity: string;
        colorCode: string;
    }[];
};
export declare const scoringQuestions: ({
    code: string;
    questionText: string;
    questionType: "BOOLEAN";
    inputType: string;
    options: {
        choices: {
            value: string;
            label: string;
            score: number;
        }[];
    };
    hasScore: boolean;
    groupName: string;
} | {
    code: string;
    questionText: string;
    questionType: "SINGLE_CHOICE";
    inputType: string;
    options: {
        choices: {
            value: string;
            label: string;
            score: number;
        }[];
        min?: undefined;
        max?: undefined;
        step?: undefined;
        placeholder?: undefined;
        maxSelections?: undefined;
    };
    hasScore: boolean;
    groupName: string;
} | {
    code: string;
    questionText: string;
    questionType: "SCALE";
    inputType: string;
    options: {
        min: number;
        max: number;
        step: number;
        choices?: undefined;
        placeholder?: undefined;
        maxSelections?: undefined;
    };
    hasScore: boolean;
    groupName: string;
} | {
    code: string;
    questionText: string;
    questionType: "NUMERIC";
    inputType: string;
    options: {
        min: number;
        max: number;
        step: number;
        placeholder: string;
        choices?: undefined;
        maxSelections?: undefined;
    };
    hasScore: boolean;
    groupName: string;
} | {
    code: string;
    questionText: string;
    questionType: "MULTIPLE_CHOICE";
    inputType: string;
    options: {
        choices: {
            value: string;
            label: string;
            score: number;
        }[];
        maxSelections: number;
        min?: undefined;
        max?: undefined;
        step?: undefined;
        placeholder?: undefined;
    };
    hasScore: boolean;
    groupName: string;
})[];
export declare const nonScoringQuestions: ({
    code: string;
    text: string;
    type: "TEXT";
    inputType: string;
    section: string;
    required: boolean;
    options?: undefined;
} | {
    code: string;
    text: string;
    type: "DATE";
    inputType: string;
    section: string;
    required: boolean;
    options?: undefined;
} | {
    code: string;
    text: string;
    type: "SINGLE_CHOICE";
    inputType: string;
    section: string;
    required: boolean;
    options: {
        choices: {
            value: string;
            label: string;
        }[];
    };
} | {
    code: string;
    text: string;
    type: "MULTIPLE_CHOICE";
    inputType: string;
    section: string;
    required: boolean;
    options: {
        choices: {
            value: string;
            label: string;
        }[];
    };
} | {
    code: string;
    text: string;
    type: "NUMERIC";
    inputType: string;
    section: string;
    required: boolean;
    options?: undefined;
})[];
export declare const questionGroupMappings: {
    questionCode: string;
    groupName: string;
}[];
export declare const questionaireSummary: {
    totalQuestions: number;
    questionsWithScoring: number;
    questionsWithoutScoring: number;
    totalDiagnosticGroups: number;
    sections: string[];
};
