/* tslint:disable */
/* eslint-disable */
/**
 * @param {Uint8Array} plaintext
 * @returns {WasmTupleObject}
 */
export function _encrypt(plaintext: Uint8Array): WasmTupleObject;
/**
 * @param {Uint8Array} key
 * @param {Uint8Array} ciphertext
 * @returns {Uint8Array}
 */
export function _decrypt(key: Uint8Array, ciphertext: Uint8Array): Uint8Array;
export class WasmTupleObject {
  free(): void;
  /**
   * @param {Uint8Array} key
   * @param {Uint8Array} ciphertext
   * @returns {WasmTupleObject}
   */
  static new(key: Uint8Array, ciphertext: Uint8Array): WasmTupleObject;
  readonly ciphertext: Uint8Array;
  readonly key: Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_wasmtupleobject_free: (a: number, b: number) => void;
  readonly wasmtupleobject_key: (a: number, b: number) => void;
  readonly wasmtupleobject_ciphertext: (a: number, b: number) => void;
  readonly wasmtupleobject_new: (a: number, b: number, c: number, d: number) => number;
  readonly _encrypt: (a: number, b: number) => number;
  readonly _decrypt: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
