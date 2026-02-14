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
    nutricion: {
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
    };
    hasScore: boolean;
    groupName: string;
    descriptionText?: undefined;
    dependsOn?: undefined;
    showWhen?: undefined;
} | {
    code: string;
    questionText: string;
    descriptionText: string;
    questionType: "SCALE";
    inputType: string;
    options: {
        min: number;
        max: number;
        step: number;
        choices?: undefined;
        placeholder?: undefined;
    };
    hasScore: boolean;
    groupName: string;
    dependsOn?: undefined;
    showWhen?: undefined;
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
    };
    hasScore: boolean;
    groupName: string;
    descriptionText?: undefined;
    dependsOn?: undefined;
    showWhen?: undefined;
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
    };
    hasScore: boolean;
    groupName: string;
    dependsOn: string;
    showWhen: {
        values: string[];
        operator: string;
    };
    descriptionText?: undefined;
})[];
export declare const nonScoringQuestions: ({
    code: string;
    text: string;
    type: "TEXT";
    inputType: string;
    section: string;
    required: boolean;
    options?: undefined;
    dependsOn?: undefined;
    showWhen?: undefined;
} | {
    code: string;
    text: string;
    type: "DATE";
    inputType: string;
    section: string;
    required: boolean;
    options?: undefined;
    dependsOn?: undefined;
    showWhen?: undefined;
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
    dependsOn?: undefined;
    showWhen?: undefined;
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
    dependsOn?: undefined;
    showWhen?: undefined;
} | {
    code: string;
    text: string;
    type: "SINGLE_CHOICE";
    inputType: string;
    section: string;
    required: boolean;
    dependsOn: string;
    showWhen: {
        values: string[];
        operator: string;
    };
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
    dependsOn: string;
    showWhen: {
        values: string[];
        operator: string;
    };
    options?: undefined;
} | {
    code: string;
    text: string;
    type: "NUMERIC";
    inputType: string;
    section: string;
    required: boolean;
    options?: undefined;
    dependsOn?: undefined;
    showWhen?: undefined;
} | {
    code: string;
    text: string;
    type: "TEXT";
    inputType: string;
    section: string;
    required: boolean;
    options: {
        choices: {
            value: string;
            label: string;
        }[];
    };
    dependsOn?: undefined;
    showWhen?: undefined;
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
