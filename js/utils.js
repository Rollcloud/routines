/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
function stringToHTML(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
}

/**
 * Create a hash of the provided input using CRC-32
 * Source: https://stackoverflow.com/a/50579690
 * @param {*} r         The provided input
 * @returns {Number}    The hashed result
 */
function crc32(r) {
  for (var a, o = [], c = 0; c < 256; c++) {
    a = c;
    for (let f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ (a >>> 1) : a >>> 1;
    o[c] = a;
  }
  for (var n = -1, t = 0; t < r.length; t++) n = (n >>> 8) ^ o[255 & (n ^ r.charCodeAt(t))];
  return (-1 ^ n) >>> 0;
}

Number.prototype.toURL = function () {
  const nolookalikes = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz";
  let num = this;
  let base = nolookalikes.length;
  let result = "";

  while (num > 0) {
    let bit = num % base;
    result = nolookalikes[bit] + result; // put bit to the left of any previous bits in the bitstring
    num = Math.floor(num / base);
  }
  return result;
};

export { stringToHTML, crc32 };
