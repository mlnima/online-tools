import React, { useState } from "react";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");

  function handleEncode() {
    setError("");
    try {
      setEncoded(encodeURIComponent(input));
    } catch (e) {
      setError("Error encoding URL.");
      setEncoded("");
    }
  }

  function handleDecode() {
    setError("");
    try {
      setDecoded(decodeURIComponent(input));
    } catch (e) {
      setError("Error decoding URL.");
      setDecoded("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>URL Encoder/Decoder</h1>
      <p>Coming Soon</p>
    </div>
  );
}
