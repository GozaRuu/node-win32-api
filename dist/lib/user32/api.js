import { DTypes as W } from 'win32-def';
export const apiDef = {
    BringWindowToTop: [W.BOOL, [W.HWND]],
    /** url: https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-clienttoscreen */
    ClientToScreen: [W.BOOL, [W.HWND, W.LPPOINT]],
    CloseWindow: [W.BOOL, [W.HWND]],
    CreateWindowExW: [
        W.HWND, [
            W.DWORD, W.LPCTSTR, W.LPCTSTR, W.DWORD,
            W.INT, W.INT, W.INT, W.INT,
            W.HWND, W.HMENU, W.HINSTANCE, W.LPVOID,
        ],
    ],
    DefWindowProcW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM]],
    DestroyWindow: [W.BOOL, [W.HWND]],
    DispatchMessageW: [W.LRESULT, [W.LPMSG]],
    /** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
    EnumDisplayDevicesW: [W.BOOL, [W.LPCWSTR, W.DWORD, W.POINT, W.DWORD]],
    EnumThreadWindows: [W.BOOL, [W.DWORD, W.WNDENUMPROC, W.LPARAM]],
    EnumWindows: [W.BOOL, [W.WNDENUMPROC, W.LPARAM]],
    FindWindowExW: [W.HWND, [W.HWND, W.HWND, W.LPCTSTR, W.LPCTSTR]],
    GetAncestor: [W.HWND, [W.HWND, W.UINT]],
    GetAltTabInfoW: [W.BOOL, [W.HWND, W.INT, W.INT, W.LPWSTR, W.INT]],
    GetClassInfoExW: [W.BOOL, [W.HINSTANCE, W.LPCTSTR, W.LPWNDCLASSEX]],
    GetForegroundWindow: [W.HWND, []],
    GetMessageW: [W.BOOL, [W.LPMSG, W.HWND, W.UINT, W.UINT]],
    GetParent: [W.HWND, [W.HWND]],
    GetRawInputDeviceInfoW: [W.UINT, [W.HANDLE, W.UINT, W.LPVOID, W.PUINT]],
    GetRawInputDeviceList: [W.INT, [W.PRAWINPUTDEVICELIST, W.PUINT, W.UINT]],
    GetTopWindow: [W.HWND, [W.HWND]],
    GetWindow: [W.HWND, [W.HWND, W.UINT]],
    GetWindowInfo: [W.BOOL, [W.HWND, W.PWINDOWINFO]],
    GetWindowLongW: [W.LONG, [W.HWND, W.INT]],
    GetWindowRect: [W.BOOL, [W.HWND, W.RECT]],
    GetWindowTextW: [W.INT, [W.HWND, W.LPTSTR, W.INT]],
    GetWindowThreadProcessId: [W.DWORD, [W.HWND, W.LPDWORD]],
    IsWindowVisible: [W.BOOL, [W.HWND]],
    PeekMessageW: [W.BOOL, [W.LPMSG, W.HWND, W.UINT, W.UINT, W.UINT]],
    PostMessageW: [W.BOOL, [W.HWND, W.UINT, W.WPARAM, W.LPARAM]],
    PrintWindow: [W.BOOL, [W.HWND, W.HDC, W.UINT]],
    RegisterClassExW: [W.ATOM, [W.WNDCLASSEX]],
    SendMessageW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM]],
    SetForegroundWindow: [W.BOOL, [W.HWND]],
    SetWindowTextW: [W.BOOL, [W.HWND, W.LPCTSTR]],
    SetWinEventHook: [W.HWINEVENTHOOK, [W.UINT, W.UINT, W.HMODULE, W.WINEVENTPROC, W.DWORD, W.DWORD, W.UINT]],
    ShowWindow: [W.BOOL, [W.HWND, W.INT]],
    TranslateMessage: [W.BOOL, [W.LPMSG]],
    TranslateMessageEx: [W.BOOL, [W.LPMSG]],
    UnhookWinEvent: [W.BOOL, [W.HWINEVENTHOOK]],
    UpdateWindow: [W.BOOL, [W.HWND]],
};
/* istanbul ignore next */
if (process.arch === 'x64') {
    apiDef.GetWindowLongPtrW = [W.LONG_PTR, [W.HWND, W.INT]];
}
