import { FModel } from 'win32-def';
export declare function load<T>(dllName: string, dllFuncs: FModel.DllFuncs, fns?: FModel.FnName[], settings?: FModel.LoadSettings): T;
/**
 * Generate function definitions via converting macro windows data type (like PVOID) to the expected value.
 * Skip assignment if property undefined
 */
export declare function gen_api_opts(dllFuncs: FModel.DllFuncs, fns?: FModel.FnName[]): FModel.DllFuncs;
