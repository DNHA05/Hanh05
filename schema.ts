import { z } from "zod";

export const bypassRequestSchema = z.object({
  url: z.string().url("Vui lòng nhập một URL hợp lệ"),
});

export type BypassRequest = z.infer<typeof bypassRequestSchema>;

export type BypassResponse = {
  success: boolean;
  result: string;
};

export const statsResponseSchema = z.object({
  views: z.number(),
});

export type StatsResponse = z.infer<typeof statsResponseSchema>;
