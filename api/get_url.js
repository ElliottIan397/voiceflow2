const CSV_URL = 'https://eandssolutions-my.sharepoint.com/:x:/p/ianelliott/Ea7VC-02OP9CgxcJH8DbZ_YBViSpmmpQ1F8TDwhNmdeXjQ?download=1';

export default async function handler(req, res) {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, '').replace(/\u00A0/g, ''));
      return Object.fromEntries(headers.map((h, i) => [h, values[i] || ""]));
    });

    return res.status(200).json({
      record_count: rows.length,
      rows
    });

  } catch (err) {
    console.error('CSV Fetch Error:', err);
    return res.status(500).json({ error: 'Failed to fetch or parse CSV.' });
  }
}

  }
}

