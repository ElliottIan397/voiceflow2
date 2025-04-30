const CSV_URL = 'https://eandssolutions-my.sharepoint.com/:x:/p/ianelliott/Ea7VC-02OP9CgxcJH8DbZ_YBViSpmmpQ1F8TDwhNmdeXjQ?download=1';

export default async function handler(req, res) {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    // Split using universal line endings
    const lines = csvText.trim().split(/\r?\n/);

    // Return raw lines for inspection
    return res.status(200).json({
      first_5_lines: lines.slice(0, 5),
      total_lines: lines.length
    });

  } catch (err) {
    console.error('CSV Fetch Error:', err);
    return res.status(500).json({ error: 'Failed to fetch or parse CSV.' });
  }
}
