interface ICheckResult {
    success: boolean;
    latency: number;
    statusCode: number;
    errorMessage?: string;
}

interface IMonitorStrategy {
    check(url: string, timeout: number): Promise<ICheckResult>;
}

export type { ICheckResult, IMonitorStrategy };