'use client';
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useMountEffectOnce } from '@/hooks/useMountEffectOnce'


interface IWasmContext {
    wasm?: typeof import('@/lib/wasm');
    error?: Error;
  }
  
  // Improve initial state
  const initial: IWasmContext = {
    wasm: undefined,
    error: undefined,
  };

const WASMContext = createContext<IWasmContext>(initial)

/**
 * @ref https://github.com/satelllte/nextjs-wasm/blob/main/src/context/WASM.tsx 
 */
export const WasmContextProvider: React.FC<WasmContextProviderProps> = ({
  children
}) => {

    const [state, setState] = useState<IWasmContext>(initial);
  // This has to run only once: https://github.com/rustwasm/wasm-bindgen/issues/3153
  // Though, in development React renders twice when Strict Mode is enabled: https://reactjs.org/docs/strict-mode.html
  // That's why it must be limited to a single mount run
  useMountEffectOnce(() => {
    (async () => {
      try {
        const wasm = await import("@/lib/wasm");
        await wasm.default();
    
        setState({
          wasm,
          error: undefined,
        });
      } catch (error) {
        console.error('Failed to initialize WASM:', error);
        setState({
          wasm: undefined,
          error: error instanceof Error ? error : new Error('Failed to load WASM'),
        });
      }
    })();
  });

  return (
    <WASMContext.Provider value={state}>
      {children}
    </WASMContext.Provider>
  )
}

export const useWasm = () => {
    const context = useContext(WASMContext);
    
    if (context === undefined || context.error) {
      throw new Error('useWasm must be used within a WasmContextProvider');
    }
  
    return context;
  };
  

interface WasmContextProviderProps {
  children: ReactNode
}

