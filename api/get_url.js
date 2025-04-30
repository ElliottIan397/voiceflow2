const CSV_URL = 'https://raw.githubusercontent.com/ElliottIan397/voiceflow2/main/VF_API_TestProject042925.csv';

export default async function handler(req, res) {
  const { sku } = req.query;

  if (!sku) {
    return res.status(400).json({ error: 'Missing SKU' });
  }

  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    const lines = csvText.trim().split(/\r?\n/);
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v =>
        v.trim().replace(/^"|"$/g, '').replace(/\u00A0/g, '')
      );
      return Object.fromEntries(headers.map((h, i) => [h, values[i] || ""]));
    });

    const match = rows.find(row => row.sku.trim() === sku.trim());

    if (!match) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json({
      sku: match.sku,
      product_url: match.product_url,
      image_url: match.image_url,
    });

  } catch (err) {
    console.error('CSV Fetch Error:', err);
    return res.status(500).json({ error: 'Failed to fetch or parse CSV.' });
  }
}
