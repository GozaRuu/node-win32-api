import { FModel } from 'win32-def';
import { DllNames } from '../model';
import { apiDef, Win32Fns } from './api';
import * as constants from './constants';
export { apiDef };
export { constants };
export { Win32Fns };
export declare const dllName = DllNames.user32;
export declare const load: (fns?: string[] | undefined, settings?: FModel.LoadSettings | undefined) => FModel.ExpandFnModel<Win32Fns>;
