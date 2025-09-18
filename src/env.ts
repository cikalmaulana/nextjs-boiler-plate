// src/env.ts
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(3000),

    NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),

    NEXT_PUBLIC_API_URL: z.url(),
    API_INTERNAL_URL: z.url(),

    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

    REDIS_URL: z.string().optional(),
    S3_BUCKET_URL: z.url().optional(),
});

export const env = envSchema.parse(process.env);
