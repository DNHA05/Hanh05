-1
+1
import { z } from 'zod';
import { bypassRequestSchema } from './schema';
import { bypassRequestSchema, statsResponseSchema } from './schema';
export const errorSchemas = {
  validation: z.object({
-0
+9
      },
    },
  },
  stats: {
    get: {
      method: 'GET' as const,
      path: '/api/stats' as const,
      responses: {
        200: statsResponseSchema,
      },
    },
  },
};
export function buildUrl(path: string, params?: Record<string, string | number>): string {
