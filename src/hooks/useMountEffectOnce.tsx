'use client';
import { useEffect, useRef } from 'react'

/**
 * @ref https://github.com/satelllte/nextjs-wasm/blob/main/src/hooks/useMountEffectOnce.ts  
 */ 
export const useMountEffectOnce = (fn: () => void) => {
  const wasExecutedRef = useRef(false)
  useEffect(() => {
    if (!wasExecutedRef.current) {
      fn()
    }
    wasExecutedRef.current = true
  }, [fn])
}