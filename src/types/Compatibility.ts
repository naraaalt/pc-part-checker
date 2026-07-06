export interface Diagnostic {

    name: string;

    status: "pass" | "warning" | "fail";

    message: string;

}

export interface CompatibilityResult {

    compatible: boolean;

    diagnostics: Diagnostic[];

}