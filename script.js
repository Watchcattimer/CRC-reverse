document.getElementById('crcFormReverse').addEventListener('submit', function(e) {
    e.preventDefault();
	const inputStreamRaw = document.getElementById('inputStreamReverse').value.trim();

fetch('crc_catalog.json')
  .then(response => response.json()) // Parses JSON
  .then(data => {
	  const crc_name = data.map(entry => `${entry.name}`);
	  
      document.getElementById('reverseRes').textContent = crc_name;
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
		const crc = calculateCRC({
			 input:  inputStreamRaw,
			 width:      width,
			 polynomial: polynomial,
			 init:       init,
			 refin:      refin,
			 refout:     refout,
			 xorout:     xorout
		});
        document.getElementById('result').textContent = `CRC Result: 0x${crc.toString(16).toUpperCase()}`;
    } catch (err) {
        document.getElementById('result').textContent = `Error: ${err.message}`;
    }
});

const inputStreamFormat = document.querySelector('input[name="inputStreamFormat"]:checked').value;
let bits;

if (inputStreamFormat === 'binary') {
    bits = bitstream.split('').map(b => parseInt(b));
    if (bits.some(b => b !== 0 && b !== 1)) {
        throw new Error('Invalid binary input: only 0 and 1 allowed');
    }
} else { // hex input
    // Convert hex string to bits array
    bits = [];
    for (let i = 0; i < bitstream.length; i++) {
        const nibble = parseInt(bitstream[i], 16);
        if (isNaN(nibble)) throw new Error('Invalid hex input');
        for (let j = 3; j >= 0; j--) {
            bits.push((nibble >> j) & 1);
        }
    }
}

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


