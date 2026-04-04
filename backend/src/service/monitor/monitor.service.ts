import type { IMonitorStrategy } from "./monitor.strategy.js";
import db from "../../db/index.js";
import { domains, logs } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export class MonitorService {
  constructor(private strategy: IMonitorStrategy) {}

  async runChecksHttp(userId: string) {
    const allDomains = await db
      .select()
      .from(domains)
      .where(eq(domains.userid, userId));

    await Promise.all(
      allDomains.map(async (domain) => {
        const result = await this.strategy.check(domain.url, domain.timeout);
        await db.insert(logs).values({
          domainId: domain.id,
          statusCode: result.statusCode,
          responseTime: result.latency,
          isSuccess: result.success,
          errorMessage: result.errorMessage || null,
        });

        await db
          .update(domains)
          .set({
            status: result.success ? "up" : "down",
            lastChecked: new Date(),
          })
          .where(eq(domains.id, domain.id));
      }),
    );
  }
}
