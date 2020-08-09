import { load as hload } from '../helper';
import { apiDef } from './api';
import * as constants from './constants';
export { apiDef };
export { constants };
export const dllName = "user32" /* user32 */;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const load = (fns, settings) => hload(dllName, apiDef, fns, settings);
