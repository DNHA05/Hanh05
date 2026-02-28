-0
+6
  success: boolean;
  result: string;
};
export const statsResponseSchema = z.object({
  views: z.number(),
});
export type StatsResponse = z.infer<typeof statsResponseSchema>;
