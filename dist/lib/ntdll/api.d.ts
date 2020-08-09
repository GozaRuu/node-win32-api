import { DModel as M, FModel as FM } from 'win32-def';
export interface Win32Fns extends FM.DllFuncsModel {
    NtQueryInformationProcess: (ProcessHandle: M.HANDLE, ProcessInformationClass: number, ProcessInformation: M.PVOID, // _Out_
    ProcessInformationLength: M.ULONG, ReturnLength: M.PULONG | null) => M.NTSTATUS;
}
export declare const apiDef: FM.DllFuncs;
