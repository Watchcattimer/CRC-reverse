document.getElementById('crcFormReverse').addEventListener('submit', function (e) {
    e.preventDefault();

    const inputStreamRaw = document.getElementById('inputStreamReverse').value.trim();
    const inputCrcRaw = parseInt(document.getElementById('crcReverse').value.trim(), 16);

	width = 16;
	polynomial = 0xff;
	init = 0;
	refin  = 0;
	refout = 0;
	xorout = 1;

    try {
		const crc = calculateCRC({
			 input:  inputStreamRaw,
			 width:      width,
			 polynomial: polynomial,
			 init:       init,
			 refin:      refin,
			 refout:     refout,
			 xorout:     xorout
		});
        document.getElementById('reverseRes').textContent = `0x${crc.toString(16).toUpperCase()}`;
    } catch (err) {
        document.getElementById('reverseRes').textContent = `Error: ${err.message}`;
    }
	
	
});


/*
const fs = require('fs');
const path = require('path');
const { generic_crc_calc } = require('./reverseCRC.js'); // adjust path if needed

function runAllCRCs(input) {
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
}*/
