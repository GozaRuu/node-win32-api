import { load as hload } from '../helper';
import { apiDef } from './api';
export { apiDef };
export const dllName = "ntdll" /* ntdll */;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const load = (fns, settings) => hload(dllName, apiDef, fns, settings);
