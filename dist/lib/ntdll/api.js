import { DTypes as W } from 'win32-def';
export const apiDef = {
    NtQueryInformationProcess: [W.NTSTATUS, [W.HANDLE, W.DWORD32, W.PVOID, W.ULONG, W.PULONG]],
};
