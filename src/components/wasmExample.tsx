"use client";
import { useWasm } from "@/context/wasm";
import { WasmTupleObject } from "@/lib/otp/otp_wasm";
import React, {
  HtmlHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const encoder = new TextEncoder();
const decoder = new TextDecoder("ascii");

export const WasmExampleComponent = () => {
  const { wasm, error } = useWasm();
  const inputRef = useRef(null);
  const [encryption, setEncryption] = useState<WasmTupleObject | null>(null);
  const [output, setOutput] = useState<string>("");

  const handleInput = () => {
    if (wasm && encryption)
        return wasm._decrypt(encryption.key, encryption.ciphertext);;

  };

  useEffect(() => {
    setOutput(decoder.decode(handleInput()) ?? "");
  }, [inputRef.current.value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (inputRef.current && wasm) {
      let x: WasmTupleObject = wasm._encrypt(encoder.encode(inputRef.current.value));
      setEncryption(x);
    }
  };

  if (!wasm) {
    return <>wasm has not loaded...</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  // console.log(decoder.decode(encryption.ciphertext), decoder.decode(encryption.key))

  return (
    <>
      {`Compute from wasm ${output}`}
      <br />
      <>
        {decoder.decode(encryption?.ciphertext)}{" "}
        {decoder.decode(encryption?.key)}
      </>
      <input
        className=" ml-2 text-black"
        ref={inputRef}
        onChange={handleOnChange}
      ></input>
    </>
  );
};
