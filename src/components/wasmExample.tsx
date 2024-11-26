"use client";

import { useWasm } from "@/context/wasm";
import { WasmTupleObject } from "@/lib/otp/otp_wasm";
import React, { useEffect, useRef, useState, useCallback } from "react";

const encoder = new TextEncoder();
const decoder = new TextDecoder("ascii");

export const WasmExampleComponent: React.FC = () => {
  const { wasm, error } = useWasm();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [encryption, setEncryption] = useState<WasmTupleObject | null>(null);
  const [output, setOutput] = useState<string>("");

  const handleDecrypt = useCallback(() => {
    if (wasm && encryption) {
      const decrypted = wasm._decrypt(encryption.key, encryption.ciphertext);
      return decrypted ? decoder.decode(decrypted) : "";
    }
    return "";
  }, [wasm, encryption]);

  useEffect(() => {
    if (encryption && wasm) {
      const decryptedOutput = handleDecrypt();
      setOutput(decryptedOutput);
    }
  }, [encryption, wasm, handleDecrypt]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (wasm && inputValue) {
      const encodedInput = encoder.encode(inputValue);
      const result = wasm._encrypt(encodedInput);
      setEncryption(result);
    }
  };

  if (!wasm) {
    return <div>wasm has not loaded...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div>{`Computed from wasm: ${output}`}</div>
      <div>
        <span>
          Encrypted Ciphertext:{" "}
          {encryption?.ciphertext
            ? decoder.decode(encryption.ciphertext)
            : "N/A"}
        </span>
        <br />
        <span>
          Encryption Key:{" "}
          {encryption?.key ? decoder.decode(encryption.key) : "N/A"}
        </span>
      </div>
      <input
        className="ml-2 text-black"
        ref={inputRef}
        onChange={handleOnChange}
        placeholder="Enter text to encrypt"
      />
    </div>
  );
};
