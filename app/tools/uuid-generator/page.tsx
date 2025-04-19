import React, { useState } from "react";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("");

  function generateUuid() {
    // Generate UUIDv4
    // RFC4122 version 4 compliant UUID generator
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    setUuid(uuidv4());
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>UUID Generator</h1>
      <p>Coming Soon</p>
    </div>
  );
}
