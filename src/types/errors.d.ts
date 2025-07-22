
export interface ValidationError extends Error {
    errors: Record<string, { success: boolean, message: string }>;
    keyValue: string;
    code: number;
    status: number;
}