export default async function handler(req, res) {
  const { sku } = req.query;

  if (!sku) return res.status(400).json({ error: "Missing 'sku' parameter" });

  const records = [
    {
      sku: "CPT/TN450J",
      product_url: "https://store.reliancegroupusa.com/brother-tn450-jumbo-yield-black-toner-cartridge",
      image_url: "https://img.powerecommerce.com/images/products/brother/tn450.jpg"
    },
    {
      sku: "CPT/TN350",
      product_url: "https://store.reliancegroupusa.com/brother-tn350-black-toner-cartridge",
      image_url: "https://img.powerecommerce.com/images/Products/brother/TN350.jpg"
    }
  ];

  const product = records.find(row => row.sku === sku);

  if (!product) return res.status(404).json({ error: 'Product not found' });

  return res.status(200).json({
    sku: product.sku,
    product_url: product.product_url,
    image_url: product.image_url
  });
}
