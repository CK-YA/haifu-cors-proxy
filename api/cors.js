export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("Missing `url` query");
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType || "application/octet-stream");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Failed to fetch content");
  }
}
