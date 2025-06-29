function reflectBits(data, width) {
    let reflection = 0;
    for (let i = 0; i < width; i++) {
        if (data & (1 << i)) {
            reflection |= (1 << (width - 1 - i));
        }
    }
    return reflection;
}

function crcCalc(bitstream, poly, init, xorout, refin, refout) {
    const bits = bitstream.split('').map(b => parseInt(b));
    let crc = init;
    const width = poly.toString(2).length - 1;

    if (refin) bits.reverse();

    for (let bit of bits) {
        const topBit = (crc >> (width - 1)) & 1;
        crc = ((crc << 1) | bit) & ((1 << (width + 1)) - 1);
        if (topBit) crc ^= poly;
    }

    if (refout) crc = reflectBits(crc, width);

    return (crc ^ xorout) >>> 0;
}

document.getElementById('crcForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const inputStreamRaw = document.getElementById('bitStream').value.trim();
	const inputStream = parseInt(inputStreamRaw, 2);
	
    const polynomial = parseInt(document.getElementById('polynomial').value.trim(), 16);
    const init = parseInt(document.getElementById('init').value.trim(), 16);
    const xorout = parseInt(document.getElementById('xorout').value.trim(), 16);
    const refin = document.getElementById('refin').checked;
    const refout = document.getElementById('refout').checked;

    try {
        const crc = crcCalc(inputStream, polynomial, init, xorout, refin, refout);
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