const fs = require('fs');
const path = require('path');
const { generic_crc_calc } = require('./reverseCRC.js'); // adjust path if needed

function runAllCRCs(input) {
	
// Inside reverseCRC.js
fetch('crc_catalog.json')
  .then(response => response.json())
  .then(crcCatalog => {
    // crcCatalog now contains the JSON object
	alert(crcCatalog)
    // ...your code using crcCatalog...
  })
  .catch(error => console.error('Error loading JSON:', error));
	
  
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