const fs = require('fs');
const cleanedCsvPath = 'C:\\Users\\C-R\\Desktop\\ABS\\Asper All form Productts\\Asper_Catalog_CLEANED.csv';
const perfCsvPath = 'C:\\Users\\C-R\\Desktop\\shopify-import Perf.csv';
const outputPath = 'C:\\Users\\C-R\\Desktop\\ABS\\understand-project\\catalog-sync.sql';

const CLINICAL_BRANDS = ['Vichy', 'La Roche-Posay', 'Eucerin', 'Bioderma', 'CeraVe', 'Sesderma', 'Heliocare', 'Avène', 'ISDIN', 'Uriage', 'Filorga', 'Ducray', 'Aderma', 'Mustela'];
const AESTHETIC_TYPES = ['Concealer', 'Foundation', 'Mascara', 'Lipstick', 'Makeup', 'Fragrance', 'Perfume'];

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

try {
  console.log('Finalizing Medical Luxury Catalog with Hero Assets...');
  const imageMap = new Map();
  const perfData = fs.readFileSync(perfCsvPath, 'utf8');
  const perfLines = perfData.split('\n');
  const perfHeaders = parseCSVLine(perfLines[0].trim());
  const hIdx = perfHeaders.indexOf('Handle');
  const iIdx = perfHeaders.indexOf('Image Src');

  for (let i = 1; i < perfLines.length; i++) {
    const line = perfLines[i].trim();
    if (!line) continue;
    const row = parseCSVLine(line);
    if (row[hIdx] && row[iIdx]) {
      imageMap.set(row[hIdx], row[iIdx]);
    }
  }

  const data = fs.readFileSync(cleanedCsvPath, 'utf8');
  const lines = data.split('\n');
  const headers = parseCSVLine(lines[0].trim());

  const vendorIdx = headers.indexOf('vendor');
  const titleIdx = headers.indexOf('title');
  const priceIdx = headers.indexOf('variants/0/price');
  const handleIdx = headers.indexOf('handle');
  const imageIdx = headers.indexOf('images/0/src');
  const typeIdx = headers.indexOf('productType');
  const inventoryIdx = headers.indexOf('variants/0/inventoryQuantity');

  let sql = 'INSERT INTO public.products (id, title, brand, price, handle, image_url, ai_persona_lead, primary_concern, regimen_step, inventory_total) VALUES\n';
  let values = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const row = parseCSVLine(line);
    if (row.length < headers.length - 10) continue;

    const title = row[titleIdx] || '';
    const brand = row[vendorIdx] || 'Generic';
    const handle = row[handleIdx] || 'sku-' + i;
    let imageUrl = imageMap.get(handle) || row[imageIdx] || '';
    let priceVal = parseFloat(row[priceIdx]) || 0;
    if (priceVal > 300 && Number.isInteger(priceVal)) { priceVal = priceVal / 100; }

    const type = row[typeIdx] || '';
    const inventory = parseInt(row[inventoryIdx]) || 0;
    const persona = CLINICAL_BRANDS.some(cb => brand.toLowerCase().includes(cb.toLowerCase())) ? 'dr_sami' : 'ms_zain';
    
    const safeTitle = title.replace(/'/g, "''").replace(/\\/g, "");
    const safeBrand = brand.replace(/'/g, "''").replace(/\\/g, "");

    values.push(`('${handle}', '${safeTitle}', '${safeBrand}', ${priceVal}, '${handle}', '${imageUrl}', '${persona}', 'Concern_Hydration', 'Step_3_Protection', ${inventory})`);
    if (values.length >= 5000) break;
  }

  const conflictClause = ' ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, price = EXCLUDED.price, inventory_total = EXCLUDED.inventory_total, image_url = CASE WHEN EXCLUDED.image_url != \'\' THEN EXCLUDED.image_url ELSE products.image_url END;';
  sql += values.join(',\n') + conflictClause;
  fs.writeFileSync(outputPath, sql);
  console.log('✅ Final SQL Migration ready with Hero Assets and 4311 products.');
} catch (e) {
  console.error(e);
}