"use client";
import React, { useState } from "react";

async function aesEncrypt(text: string, password: string): Promise<string> {
  if (!window.crypto?.subtle) throw new Error("Web Crypto API not available");
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );
  // Combine salt + iv + ciphertext for export (all base64)
  const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length);
  return btoa(String.fromCharCode(...combined));
}

async function aesDecrypt(data: string, password: string): Promise<string> {
  if (!window.crypto?.subtle) throw new Error("Web Crypto API not available");
  const raw = Uint8Array.from(atob(data), c => c.charCodeAt(0));
  const enc = new TextEncoder();
  const salt = raw.slice(0, 16);
  const iv = raw.slice(16, 28);
  const ciphertext = raw.slice(28);
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}

function xorEncrypt(text: string, password: string): string {
  // Fallback for browsers without crypto.subtle
  let out = "";
  for (let i = 0; i < text.length; i++) {
    out += String.fromCharCode(text.charCodeAt(i) ^ password.charCodeAt(i % password.length));
  }
  return btoa(out);
}

function xorDecrypt(data: string, password: string): string {
  let text = atob(data);
  let out = "";
  for (let i = 0; i < text.length; i++) {
    out += String.fromCharCode(text.charCodeAt(i) ^ password.charCodeAt(i % password.length));
  }
  return out;
}

const EncryptionDecryption: React.FC = () => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGo = async () => {
    setError(null);
    setOutput("");
    setLoading(true);
    try {
      if (!input || !password) throw new Error("Please provide text and password.");
      if (window.crypto?.subtle) {
        if (mode === "encrypt") {
          setOutput(await aesEncrypt(input, password));
        } else {
          setOutput(await aesDecrypt(input, password));
        }
      } else {
        // fallback XOR
        if (mode === "encrypt") {
          setOutput(xorEncrypt(input, password));
        } else {
          setOutput(xorDecrypt(input, password));
        }
      }
    } catch (e: any) {
      setError(e.message || "Encryption/Decryption error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>Encryption Decryption</h1>
      <p>Encrypt or decrypt text using a password. (AES-GCM if available, fallback XOR)</p>
      <div style={{ margin: "24px 0" }}>
        <label>
          <input type="radio" checked={mode === 'encrypt'} onChange={() => setMode('encrypt')} /> Encrypt
        </label>
        <label style={{ marginLeft: 24 }}>
          <input type="radio" checked={mode === 'decrypt'} onChange={() => setMode('decrypt')} /> Decrypt
        </label>
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
        style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        placeholder={mode === 'encrypt' ? "Enter text to encrypt..." : "Enter text to decrypt..."}
      />
      <div style={{ margin: "16px 0" }}>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ fontSize: 16, width: 300 }}
          placeholder="Password"
        />
      </div>
      <button onClick={handleGo} style={{ padding: "8px 24px", fontSize: 16 }} disabled={loading}>
        {loading ? (mode === 'encrypt' ? 'Encrypting...' : 'Decrypting...') : (mode === 'encrypt' ? 'Encrypt' : 'Decrypt')}
      </button>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>{mode === 'encrypt' ? 'Encrypted Output:' : 'Decrypted Output:'}</h3>
          <textarea
            value={output}
            readOnly
            rows={6}
            style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
          />
          <button onClick={handleCopy} style={{ marginTop: 8 }}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default EncryptionDecryption;

