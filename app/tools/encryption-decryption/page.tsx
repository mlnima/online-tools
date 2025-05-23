"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";


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
    <div className={styles.toolPage}>
      <h1>Encryption Decryption</h1>
      <p>Encrypt or decrypt text using a password. (AES-GCM if available, fallback XOR)</p>
      <div className={styles.radioField}>
        <label>
          <input type="radio" name="enc-dec-mode" checked={mode === 'encrypt'} onChange={() => setMode('encrypt')} />
          <p>Encrypt</p>
        </label>
        <label >
          <input type="radio" name="enc-dec-mode" checked={mode === 'decrypt'} onChange={() => setMode('decrypt')} />
          <p>Decrypt</p>
        </label>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="input-text" className={styles.label}>
            {mode === 'encrypt' ? "Text to Encrypt" : "Text to Decrypt"}
          </label>
          <textarea
            id="input-text"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={6}
            className={styles.inputArea}
            placeholder={mode === 'encrypt' ? "Enter text to encrypt..." : "Enter text to decrypt..."}
          />
          <label htmlFor="password-input" className={styles.label}>Password</label>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.inputField}
            placeholder="Password"
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="output-text" className={styles.label}>
                {mode === 'encrypt' ? 'Encrypted Output:' : 'Decrypted Output:'}
              </label>
              <textarea
                id="output-text"
                value={output}
                readOnly
                rows={6}
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleGo}  className={styles.actionButton} disabled={loading}>
          {loading ? (mode === 'encrypt' ? 'Encrypting...' : 'Decrypting...') : (mode === 'encrypt' ? 'Encrypt' : 'Decrypt')}
        </button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default EncryptionDecryption;

