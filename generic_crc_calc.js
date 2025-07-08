function calculateCRC({
  input,  
  width,      
  polynomial, 
  init,       
  refin,      
  refout,     
  xorout      
}) {
  // Reflect bits in a value
  function reflect(val, bits) {
    let result = 0;
    for (let i = 0; i < bits; i++) {
      if ((val >> i) & 1) {
        result |= 1 << (bits - 1 - i);
      }
    }
    return result;
  }

  const topBit = 1 << (width - 1);
  const mask = (1 << width) - 1;
  let crc = init;
  const asciiInput = typeof input === "string"
    ? input
    : String(input);

  for (let idx = 0; idx < asciiInput.length; idx++) {
    let byte = asciiInput.charCodeAt(idx) & 0xFF;
    if (refin) byte = reflect(byte, 8);
    crc ^= (byte << (width - 8)) & mask;
    for (let bit = 0; bit < 8; bit++) {
      if (crc & topBit) {
        crc = ((crc << 1) ^ polynomial) & mask;
      } else {
        crc = (crc << 1) & mask;
      }
    }
  }

  if (refout) crc = reflect(crc, width);
  return (crc ^ xorout) >>> 0;
}