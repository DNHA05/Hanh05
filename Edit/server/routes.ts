-0
+11
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
