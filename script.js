document.getElementById('crcFormReverse').addEventListener('submit', function(e) {
    e.preventDefault();
	const inputStreamRaw = document.getElementById('inputStreamReverse').value.trim();

	document.getElementById('reverseRes').textContent = "aaaaaaaaaaaa";

fetch('crc_catalog.json')
  .then(response => response.json())
  .then(data => {
	data.forEach(item => {
		const params = {
		inputStreamRaw,
		width: item.width,
		polynomial: item.poly,
		init: item.init,
		refin: item.refin,
		refout: item.refout,
		xorout: item.xorout
		};
		console.log(generic_crc_calc({params}));
	});

  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
 
});

document.getElementById('crcForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const inputStreamRaw = document.getElementById('inputStream').value.trim();
	
    const polynomial = parseInt(document.getElementById('polynomial').value.trim(), 16);
    const init = parseInt(document.getElementById('init').value.trim(), 16);
    const refin = document.getElementById('refin').checked;
    const refout = document.getElementById('refout').checked;
    const xorout = parseInt(document.getElementById('xorout').value.trim(), 16);

	const width = polynomial.toString(2).length;

    try {
		const param = {
			 input:  inputStreamRaw,
			 width:      width,
			 polynomial: polynomial,
			 init:       init,
			 refin:      refin,
			 refout:     refout,
			 xorout:     xorout
		};

		const crc = calculateCRC(param);
		
        document.getElementById('result').textContent = `CRC Result: 0x${crc.toString(16).toUpperCase()}`;
    } catch (err) {
        document.getElementById('result').textContent = `Error: ${err.message}`;
    }
});

function updateStreams() {
    // Get input values
    const inputValue = document.getElementById('inputStream').value;

    // Convert input to hex (if input is ASCII/text)
    let hexValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        // Pad hex with leading zero if needed
		hexValue += "0x"
        hexValue += inputValue.charCodeAt(i).toString(16).padStart(2, '0');
		hexValue += " ";
    }

    document.getElementById('hexBitStream').value = hexValue;

    // Convert input to bit stream (8 bits per char)
    let bitValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        bitValue += inputValue.charCodeAt(i).toString(2).padStart(8, '0');
    }

    // Show hex in bitStream field (optional, if you want to show bitValue there)
    document.getElementById('bitStream').value = bitValue;
}


