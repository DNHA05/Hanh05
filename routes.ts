import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.stats.get.path, async (req, res) => {
    try {
      const API = "https://api.countapi.xyz/hit/harblx.online/visits";
      const countRes = await fetch(API);
      const data = await countRes.json();
      res.json({ views: data.value || 0 });
    } catch (err) {
      res.json({ views: 0 });
    }
  });

  app.post(api.bypass.process.path, async (req, res) => {
    try {
      const input = api.bypass.process.input.parse(req.body);
      
      const API_BASE = "https://api.izen.lol/v1/bypass";
      // Using the API key from the provided HTML file, decoded from base64
      const API_KEY = "30eb2b74-2ebb-4852-ad0f-17a0e6fa35b7";

      const externalRes = await fetch(`${API_BASE}?url=${encodeURIComponent(input.url)}`, {
        headers: { "x-api-key": API_KEY }
      });
      
      const data = await externalRes.json();
      
      res.json({
        success: true,
        result: data.data || data.result || "Vượt link thất bại"
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      
      console.error("Bypass API Error:", err);
      res.status(500).json({
        message: "Lỗi kết nối API"
      });
    }
  });

  return httpServer;
}
