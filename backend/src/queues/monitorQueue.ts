import { Queue } from "bullmq";
import { redisConfig } from "../config/redis.js";

export const monitorQueue = new Queue("ping-queue", {
  connection: redisConfig,
});
