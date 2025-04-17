"use client";
import React, { useRef, useState } from "react";

const ASCII_CHARS = "@%#*+=-:. ";

function imageToAscii(file: File, callback: (ascii: string) => void) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new window.Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = 80;
      const aspect = img.height / img.width;
      canvas.width = width;
      canvas.height = Math.round(width * aspect * 0.55); // font aspect ratio
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx!.getImageData(0, 0, canvas.width, canvas.height).data;
      let ascii = "";
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const char = ASCII_CHARS[Math.floor((avg / 255) * (ASCII_CHARS.length - 1))];
          ascii += char;
        }
        ascii += "\n";
      }
      callback(ascii);
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

export default function ImageToASCIIArt() {
  const [ascii, setAscii] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setAscii("");
    setError("");
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      imageToAscii(file, setAscii);
    } else {
      setError("Please upload a valid image file.");
    }
  }

  function handleCopy() {
    if (ascii) navigator.clipboard.writeText(ascii);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Image to ASCII Art</h1>
      <p>Upload an image to convert it to ASCII art (grayscale, 80 chars wide).</p>
      <input type="file" accept="image/*" ref={inputRef} onChange={handleFile} />
      {error && <div style={{ color: "red", margin: 8 }}>{error}</div>}
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>ASCII Art Output:</label>
        <textarea
          rows={12}
          style={{ width: "100%", fontSize: 12, fontFamily: "monospace" }}
          value={ascii}
          readOnly
        />
        <button onClick={handleCopy} disabled={!ascii} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

