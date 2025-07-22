interface ResponseWithMessage<T> {
    data?: T | null | undefined;
    success: boolean;
    message?: string;
    error?: unknown | Error | undefined;
    statusCode: number;
    totalRecords?: number;
}