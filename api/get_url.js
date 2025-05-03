import { parse } from 'csv-parse/sync';
import fetch from 'node-fetch';

const CSV_URL = 'https://raw.githubusercontent.com/ElliottIan397/voiceflow2/main/VF_API_TestProject042925.csv';

export default async function handler(req, res) {
  const { sku } = req.query;

  if (!sku) {
    return res.status(400).json({ error: 'Missing SKU' });
  }

  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true
    });

    const match = records.find(row => row.sku?.trim() === sku.trim());

    if (!match) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // 🔍 Debug log
    console.log('Matched SKU record:', match);

    return res.status(200).json({
      sku: match.sku,
      product_url: match.product_url,
      image_url: match.image_url
    });
  } catch (err) {
    console.error('CSV Fetch or Parse Error:', err);
    return res.status(500).json({ error: 'Failed to fetch or parse CSV.' });
  }
}
