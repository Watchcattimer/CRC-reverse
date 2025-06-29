function calculateCRC({
  bitstream,  
  width,      
  polynomial, 
  init,       
  refin,      
  refout,     
  xorout      
}) {
  alert(`bitstream: ${bitstream}`);

  // Helper to reflect bits
  function reflect(val, bits) {
    let res = 0;
    for (let i = 0; i < bits; i++) {
      if (val & (1 << i)) res |= 1 << (bits - 1 - i);
    }
    return res;
  }

  const topbit = 1 << (width - 1);
  const mask = (1 << width) - 1;

  let crc = init;


  for (let i = 0; i < bitstream.length; i++) {
    let byte = bitstream.charCodeAt(i);
    if (refin) {
      byte = reflect(byte, 8);
    }
    crc ^= (byte << (width - 8)) & mask;

    for (let j = 0; j < 8; j++) {
      if (crc & topbit) {
        crc = ((crc << 1) ^ polynomial) & mask;
      } else {
        crc = (crc << 1) & mask;
      }
    }
  }

  if (refout) {
    crc = reflect(crc, width);
  }

  return (crc ^ xorout) >>> 0; // force unsigned
}
