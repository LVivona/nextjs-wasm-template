'use client';
import { useWasm } from "@/context/wasm";
import React from 'react';


export const WasmExampleComponent = () => {
    
    const { wasm, error } = useWasm();
    
    if (!wasm) {
        return <>wasm has not loaded...</>
    }

    if (error){
        return <>{error.message}</>
    }

    return <>{`Compute from wasm 4+3=${wasm.add(4, 3)}`}</>
}