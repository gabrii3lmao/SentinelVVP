import type { ICheckResult, IMonitorStrategy } from "./monitor.strategy.js";
import axios from "axios";

export class AxiosMonitorStrategy implements IMonitorStrategy {
  async check(url: string, timeout: number): Promise<ICheckResult> {
    const start = Date.now();
    try {
      const response = await axios.get(url, { timeout });
      const latency = Date.now() - start;

      return {
        success: true,
        latency,
        statusCode: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        latency: Date.now() - start,
        statusCode: error.response ? error.response.status : 0,
        errorMessage: error.message,
      };
    }
  }
}
