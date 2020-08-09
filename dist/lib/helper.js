/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ffi from 'ffi-napi';
import { Config } from 'win32-def';
const dllInst = new Map(); // for DLL.load() with settings.singleton === true
export function load(dllName, dllFuncs, fns, settings) {
    const st = parse_settings(settings);
    if (st.singleton) {
        let inst = get_inst_by_name(dllName);
        if (!inst) {
            inst = ffi.Library(dllName, gen_api_opts(dllFuncs, fns));
            set_inst_by_name(dllName, inst);
        }
        return inst;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ffi.Library(dllName, gen_api_opts(dllFuncs, fns));
    }
}
/**
 * Generate function definitions via converting macro windows data type (like PVOID) to the expected value.
 * Skip assignment if property undefined
 */
export function gen_api_opts(dllFuncs, fns) {
    const ret = {};
    if (fns && Array.isArray(fns) && fns.length) {
        for (const fn of fns) {
            const ps = dllFuncs[fn];
            if (typeof ps !== 'undefined') {
                Object.defineProperty(ret, fn, {
                    value: ps,
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
            }
        }
    }
    else {
        for (const fn of Object.keys(dllFuncs)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const ps = dllFuncs[fn];
            if (typeof ps !== 'undefined') {
                Object.defineProperty(ret, fn, {
                    value: ps,
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
            }
        }
    }
    return ret;
}
function get_inst_by_name(dllName) {
    return dllInst.get(dllName);
}
function set_inst_by_name(dllName, inst) {
    dllInst.set(dllName, inst);
}
function parse_settings(settings) {
    const st = { ...Config.settingsDefault };
    if (typeof settings !== 'undefined' && Object.keys(settings).length) {
        Object.assign(st, settings);
    }
    return st;
}
