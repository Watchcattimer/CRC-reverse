const fs = require('fs');
const path = require('path');
const { generic_crc_calc } = require('./reverseCRC.js'); // adjust path if needed

function runAllCRCs(input) {

  alert(input)
	
	
  // Load the CRC catalog
  const crcCatalogPath = path.join(__dirname, 'crc_catalog.json');
  const catalogData = fs.readFileSync(crcCatalogPath, 'utf8');
  const crcCatalog = JSON.parse(catalogData);

  const results = {};

  // Loop through all CRC definitions in the catalog
  for (const [crcName, def] of Object.entries(crcCatalog)) {
    // Construct the parameter object for generic_crc_calc
    const params = {
      input,
      width: def.width,
      polynomial: def.polynomial,
      init: def.init,
      refin: def.refin,
      refout: def.refout,
      xorout: def.xorout
    };
    results[crcName] = generic_crc_calc(params);
  }


  return results;
}