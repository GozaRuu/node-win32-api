import { DModel as M, FModel as FM } from 'win32-def';
export interface Win32Fns extends FM.DllFuncsModel {
    InitCommonControlsEx: (lpInitCtrls: M.INITCOMMONCONTROLSEX) => M.BOOL;
}
export declare const apiDef: FM.DllFuncs;
