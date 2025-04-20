"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

// NTLM hash = MD4(UTF-16LE(PASSWORD))
function ntlmHash(password: string): string {
  // Minimal MD4 implementation for NTLM
  function toUtf16Le(str: string) {
    return new Uint8Array(str.split('').flatMap(c => {
      const code = c.charCodeAt(0);
      return [code & 0xff, code >> 8];
    }));
  }
  function lrot(n: number, b: number) { return ((n << b) | (n >>> (32 - b))) >>> 0; }
  function md4(buf: Uint8Array): string {
    // MD4 implementation, returns hex string
    let s = new Uint32Array(4);
    s[0] = 0x67452301; s[1] = 0xefcdab89; s[2] = 0x98badcfe; s[3] = 0x10325476;
    const origLen = buf.length;
    let arr = new Uint8Array(((origLen + 9 + 63) & ~63));
    arr.set(buf);
    arr[origLen] = 0x80;
    const bitLen = origLen * 8;
    arr[arr.length - 8] = bitLen & 0xff;
    arr[arr.length - 7] = (bitLen >> 8) & 0xff;
    arr[arr.length - 6] = (bitLen >> 16) & 0xff;
    arr[arr.length - 5] = (bitLen >> 24) & 0xff;
    for (let i = 0; i < arr.length; i += 64) {
      let X = new Uint32Array(16);
      for (let j = 0; j < 16; j++) {
        X[j] = arr[i + j * 4] | (arr[i + j * 4 + 1] << 8) | (arr[i + j * 4 + 2] << 16) | (arr[i + j * 4 + 3] << 24);
      }
      let [a, b, c, d] = s;
      // Round 1
      a = lrot(a + ((b & c) | (~b & d)) + X[0], 3);
      d = lrot(d + ((a & b) | (~a & c)) + X[1], 7);
      c = lrot(c + ((d & a) | (~d & b)) + X[2], 11);
      b = lrot(b + ((c & d) | (~c & a)) + X[3], 19);
      a = lrot(a + ((b & c) | (~b & d)) + X[4], 3);
      d = lrot(d + ((a & b) | (~a & c)) + X[5], 7);
      c = lrot(c + ((d & a) | (~d & b)) + X[6], 11);
      b = lrot(b + ((c & d) | (~c & a)) + X[7], 19);
      a = lrot(a + ((b & c) | (~b & d)) + X[8], 3);
      d = lrot(d + ((a & b) | (~a & c)) + X[9], 7);
      c = lrot(c + ((d & a) | (~d & b)) + X[10], 11);
      b = lrot(b + ((c & d) | (~c & a)) + X[11], 19);
      a = lrot(a + ((b & c) | (~b & d)) + X[12], 3);
      d = lrot(d + ((a & b) | (~a & c)) + X[13], 7);
      c = lrot(c + ((d & a) | (~d & b)) + X[14], 11);
      b = lrot(b + ((c & d) | (~c & a)) + X[15], 19);
      // Round 2
      a = lrot(a + ((b & (c | d)) | (c & d)) + X[0] + 0x5a827999, 3);
      d = lrot(d + ((a & (b | c)) | (b & c)) + X[4] + 0x5a827999, 5);
      c = lrot(c + ((d & (a | b)) | (a & b)) + X[8] + 0x5a827999, 9);
      b = lrot(b + ((c & (d | a)) | (d & a)) + X[12] + 0x5a827999, 13);
      a = lrot(a + ((b & (c | d)) | (c & d)) + X[1] + 0x5a827999, 3);
      d = lrot(d + ((a & (b | c)) | (b & c)) + X[5] + 0x5a827999, 5);
      c = lrot(c + ((d & (a | b)) | (a & b)) + X[9] + 0x5a827999, 9);
      b = lrot(b + ((c & (d | a)) | (d & a)) + X[13] + 0x5a827999, 13);
      a = lrot(a + ((b & (c | d)) | (c & d)) + X[2] + 0x5a827999, 3);
      d = lrot(d + ((a & (b | c)) | (b & c)) + X[6] + 0x5a827999, 5);
      c = lrot(c + ((d & (a | b)) | (a & b)) + X[10] + 0x5a827999, 9);
      b = lrot(b + ((c & (d | a)) | (d & a)) + X[14] + 0x5a827999, 13);
      a = lrot(a + ((b & (c | d)) | (c & d)) + X[3] + 0x5a827999, 3);
      d = lrot(d + ((a & (b | c)) | (b & c)) + X[7] + 0x5a827999, 5);
      c = lrot(c + ((d & (a | b)) | (a & b)) + X[11] + 0x5a827999, 9);
      b = lrot(b + ((c & (d | a)) | (d & a)) + X[15] + 0x5a827999, 13);
      // Round 3
      a = lrot(a + (b ^ c ^ d) + X[0] + 0x6ed9eba1, 3);
      d = lrot(d + (a ^ b ^ c) + X[8] + 0x6ed9eba1, 9);
      c = lrot(c + (d ^ a ^ b) + X[4] + 0x6ed9eba1, 11);
      b = lrot(b + (c ^ d ^ a) + X[12] + 0x6ed9eba1, 15);
      a = lrot(a + (b ^ c ^ d) + X[2] + 0x6ed9eba1, 3);
      d = lrot(d + (a ^ b ^ c) + X[10] + 0x6ed9eba1, 9);
      c = lrot(c + (d ^ a ^ b) + X[6] + 0x6ed9eba1, 11);
      b = lrot(b + (c ^ d ^ a) + X[14] + 0x6ed9eba1, 15);
      a = lrot(a + (b ^ c ^ d) + X[1] + 0x6ed9eba1, 3);
      d = lrot(d + (a ^ b ^ c) + X[9] + 0x6ed9eba1, 9);
      c = lrot(c + (d ^ a ^ b) + X[5] + 0x6ed9eba1, 11);
      b = lrot(b + (c ^ d ^ a) + X[13] + 0x6ed9eba1, 15);
      a = lrot(a + (b ^ c ^ d) + X[3] + 0x6ed9eba1, 3);
      d = lrot(d + (a ^ b ^ c) + X[11] + 0x6ed9eba1, 9);
      c = lrot(c + (d ^ a ^ b) + X[7] + 0x6ed9eba1, 11);
      b = lrot(b + (c ^ d ^ a) + X[15] + 0x6ed9eba1, 15);
      s[0] = (s[0] + a) >>> 0;
      s[1] = (s[1] + b) >>> 0;
      s[2] = (s[2] + c) >>> 0;
      s[3] = (s[3] + d) >>> 0;
    }
    return Array.from(s).map(x => x.toString(16).padStart(8, '0')).join("");
  }
  return md4(toUtf16Le(password)).toUpperCase();
}

export default function NtlmHashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleGenerate() {
    setError("");
    try {
      if (!input) {
        setError("Please enter a password.");
        setOutput("");
        return;
      }
      setOutput(ntlmHash(input));
    } catch (e) {
      setError("Error generating NTLM hash.");
      setOutput("");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>NTLM Hash Generator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Enter password..."
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleGenerate} className={styles.actionButton} style={{ marginBottom: 16 }}>Generate</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={2}
        placeholder="NTLM hash output..."
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
