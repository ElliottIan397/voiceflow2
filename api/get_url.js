import fetch from 'node-fetch';
import { parse } from 'csv-parse/sync';

const CSV_URL = 'https://eandssolutions-my.sharepoint.com/:x:/p/ianelliott/Ea7VC-02OP9CgxcJH8DbZ_YB6WRF5NpAf2M0DXVbL3k-7w?download=1';

export default async function handler(req, res) {
  const { sku } = req.query;

  if (!sku) return res.status(400).json({ error: "Missing 'sku' parameter" });

  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    });

    const product = records.find(row => row.sku === sku);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    return res.status(200).json({
      sku: product.sku,
      product_url: product.product_url,
      image_url: product.image_url,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch or parse CSV' });
  }
}
