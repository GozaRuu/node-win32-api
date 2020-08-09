/**
 * win32-api
 * FFI definitions of windows win32 api for node-ffi
 *
 * @version 9.5.0
 * @author waiting
 * @license MIT
 * @link https://waitingsong.github.io/node-win32-api
 */

import { DTypes, DUnion, Config } from 'win32-def';
export { Config, DModel, DStruct, DTypes, FModel } from 'win32-def';
import * as ref from 'ref-napi';
import { types } from 'ref-napi';
import * as _UnionDi from 'ref-union-di';
import { Library } from 'ffi-napi';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fixed length "Buffer" type, for use in Struct type definitions.
 *
 * Optionally setting the `encoding` param will force to call
 * `toString(encoding)` on the buffer returning a String instead.
 *
 * @see https://github.com/TooTallNate/ref-struct/issues/28#issuecomment-265626611
 * @ref https://gist.github.com/TooTallNate/80ac2d94b950216a2705
 */
function BufferTypeFactory(length, encoding) {
    const inst = Object.create(types.byte, {
        constructor: {
            configurable: true,
            enumerable: false,
            writable: true,
            value: BufferTypeFactory,
        },
    });
    Object.defineProperty(inst, 'size', {
        configurable: true,
        enumerable: true,
        writable: false,
        value: length,
    });
    Object.defineProperty(inst, 'encoding', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: encoding,
    });
    Object.defineProperty(inst, 'get', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: getFn,
    });
    Object.defineProperty(inst, 'set', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: setFn,
    });
    return inst;
}
function getFn(buffer, offset) {
    const buf = buffer.slice(offset, offset + this.size);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.encoding) {
        const str = buf.toString(this.encoding);
        return str;
    }
    return buf;
}
function setFn(buffer, offset, value) {
    let target;
    if (typeof value === 'string') {
        target = Buffer.from(value, this.encoding);
    }
    else if (Array.isArray(value)) {
        target = Buffer.from(value);
    }
    else if (Buffer.isBuffer(value)) {
        target = value;
    }
    else {
        throw new TypeError('Buffer instance expected');
    }
    if (target.length > this.size) {
        throw new Error(`Buffer given is ${target.length} bytes, but only ${this.size} bytes available`);
    }
    target.copy(buffer, offset);
}

/* eslint-disable id-length */
/** https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew */
const DISPLAY_DEVICEW = {
    cb: DTypes.DWORD,
    DeviceName: BufferTypeFactory(32, 'ucs2'),
    DeviceString: BufferTypeFactory(128, 'ucs2'),
    StateFlags: DTypes.DWORD,
    DeviceID: BufferTypeFactory(128, 'ucs2'),
    DeviceKey: BufferTypeFactory(128, 'ucs2'),
};

const UnionDi = _UnionDi;
const Union = UnionDi(ref);

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-rid_device_info */
const RID_DEVICE_INFO = {
    cbSize: DTypes.DWORD,
    dwType: DTypes.DWORD,
    DUMMYUNIONNAME: Union(DUnion.RID_DEVICE_INFO_DUMMYUNIONNAME),
};

/* eslint-disable id-length */

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DISPLAY_DEVICEW: DISPLAY_DEVICEW,
    RID_DEVICE_INFO: RID_DEVICE_INFO
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const dllInst = new Map(); // for DLL.load() with settings.singleton === true
function load(dllName, dllFuncs, fns, settings) {
    const st = parse_settings(settings);
    if (st.singleton) {
        let inst = get_inst_by_name(dllName);
        if (!inst) {
            inst = Library(dllName, gen_api_opts(dllFuncs, fns));
            set_inst_by_name(dllName, inst);
        }
        return inst;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Library(dllName, gen_api_opts(dllFuncs, fns));
    }
}
/**
 * Generate function definitions via converting macro windows data type (like PVOID) to the expected value.
 * Skip assignment if property undefined
 */
function gen_api_opts(dllFuncs, fns) {
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

const apiDef = {
    InitCommonControlsEx: [DTypes.BOOL, [DTypes.LPINITCOMMONCONTROLSEX]],
};

const dllName = "comctl32" /* comctl32 */;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const load$1 = (fns, settings) => load(dllName, apiDef, fns, settings);

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apiDef: apiDef,
    dllName: dllName,
    load: load$1
});

const apiDef$1 = {
    FormatMessageW: [
        DTypes.DWORD,
        [DTypes.DWORD, DTypes.LPCVOID, DTypes.DWORD, DTypes.DWORD, DTypes.LPTSTR, DTypes.DWORD, DTypes.va_list],
    ],
    FreeConsole: [DTypes.BOOL, []],
    /** err code: https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms681381(v=vs.85).aspx */
    GetLastError: [DTypes.DWORD, []],
    /** retrive value from buf by ret.ref().readUInt32() */
    GetModuleHandleW: [DTypes.HMODULE, [DTypes.LPCTSTR]],
    /** flags, optional LPCTSTR name, ref hModule */
    GetModuleHandleExW: [DTypes.BOOL, [DTypes.DWORD, DTypes.LPCTSTR, DTypes.HMODULE]],
    GetProcessHeaps: [DTypes.DWORD, [DTypes.DWORD, DTypes.PHANDLE]],
    GetSystemTimes: [DTypes.BOOL, [DTypes.PFILETIME, DTypes.PFILETIME, DTypes.PFILETIME]],
    HeapFree: [DTypes.BOOL, [DTypes.HANDLE, DTypes.DWORD, DTypes.LPVOID]],
    OpenProcess: [DTypes.HANDLE, [DTypes.DWORD, DTypes.BOOL, DTypes.DWORD]],
    OutputDebugStringW: [DTypes.VOID, [DTypes.LPCTSTR]],
    SetLastError: [DTypes.VOID, [DTypes.DWORD]],
    SetThreadExecutionState: [DTypes.INT, [DTypes.INT]],
};

const dllName$1 = "kernel32" /* kernel32 */;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const load$2 = (fns, settings) => load(dllName$1, apiDef$1, fns, settings);

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apiDef: apiDef$1,
    dllName: dllName$1,
    load: load$2
});

const apiDef$2 = {
    NtQueryInformationProcess: [DTypes.NTSTATUS, [DTypes.HANDLE, DTypes.DWORD32, DTypes.PVOID, DTypes.ULONG, DTypes.PULONG]],
};

const dllName$2 = "ntdll" /* ntdll */;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const load$3 = (fns, settings) => load(dllName$2, apiDef$2, fns, settings);

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apiDef: apiDef$2,
    dllName: dllName$2,
    load: load$3
});

const apiDef$3 = {
    BringWindowToTop: [DTypes.BOOL, [DTypes.HWND]],
    /** url: https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-clienttoscreen */
    ClientToScreen: [DTypes.BOOL, [DTypes.HWND, DTypes.LPPOINT]],
    CloseWindow: [DTypes.BOOL, [DTypes.HWND]],
    CreateWindowExW: [
        DTypes.HWND, [
            DTypes.DWORD, DTypes.LPCTSTR, DTypes.LPCTSTR, DTypes.DWORD,
            DTypes.INT, DTypes.INT, DTypes.INT, DTypes.INT,
            DTypes.HWND, DTypes.HMENU, DTypes.HINSTANCE, DTypes.LPVOID,
        ],
    ],
    DefWindowProcW: [DTypes.LRESULT, [DTypes.HWND, DTypes.UINT, DTypes.WPARAM, DTypes.LPARAM]],
    DestroyWindow: [DTypes.BOOL, [DTypes.HWND]],
    DispatchMessageW: [DTypes.LRESULT, [DTypes.LPMSG]],
    /** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
    EnumDisplayDevicesW: [DTypes.BOOL, [DTypes.LPCWSTR, DTypes.DWORD, DTypes.POINT, DTypes.DWORD]],
    EnumThreadWindows: [DTypes.BOOL, [DTypes.DWORD, DTypes.WNDENUMPROC, DTypes.LPARAM]],
    EnumWindows: [DTypes.BOOL, [DTypes.WNDENUMPROC, DTypes.LPARAM]],
    FindWindowExW: [DTypes.HWND, [DTypes.HWND, DTypes.HWND, DTypes.LPCTSTR, DTypes.LPCTSTR]],
    GetAncestor: [DTypes.HWND, [DTypes.HWND, DTypes.UINT]],
    GetAltTabInfoW: [DTypes.BOOL, [DTypes.HWND, DTypes.INT, DTypes.INT, DTypes.LPWSTR, DTypes.INT]],
    GetClassInfoExW: [DTypes.BOOL, [DTypes.HINSTANCE, DTypes.LPCTSTR, DTypes.LPWNDCLASSEX]],
    GetForegroundWindow: [DTypes.HWND, []],
    GetMessageW: [DTypes.BOOL, [DTypes.LPMSG, DTypes.HWND, DTypes.UINT, DTypes.UINT]],
    GetParent: [DTypes.HWND, [DTypes.HWND]],
    GetRawInputDeviceInfoW: [DTypes.UINT, [DTypes.HANDLE, DTypes.UINT, DTypes.LPVOID, DTypes.PUINT]],
    GetRawInputDeviceList: [DTypes.INT, [DTypes.PRAWINPUTDEVICELIST, DTypes.PUINT, DTypes.UINT]],
    GetTopWindow: [DTypes.HWND, [DTypes.HWND]],
    GetWindow: [DTypes.HWND, [DTypes.HWND, DTypes.UINT]],
    GetWindowInfo: [DTypes.BOOL, [DTypes.HWND, DTypes.PWINDOWINFO]],
    GetWindowLongW: [DTypes.LONG, [DTypes.HWND, DTypes.INT]],
    GetWindowRect: [DTypes.BOOL, [DTypes.HWND, DTypes.RECT]],
    GetWindowTextW: [DTypes.INT, [DTypes.HWND, DTypes.LPTSTR, DTypes.INT]],
    GetWindowThreadProcessId: [DTypes.DWORD, [DTypes.HWND, DTypes.LPDWORD]],
    IsWindowVisible: [DTypes.BOOL, [DTypes.HWND]],
    PeekMessageW: [DTypes.BOOL, [DTypes.LPMSG, DTypes.HWND, DTypes.UINT, DTypes.UINT, DTypes.UINT]],
    PostMessageW: [DTypes.BOOL, [DTypes.HWND, DTypes.UINT, DTypes.WPARAM, DTypes.LPARAM]],
    PrintWindow: [DTypes.BOOL, [DTypes.HWND, DTypes.HDC, DTypes.UINT]],
    RegisterClassExW: [DTypes.ATOM, [DTypes.WNDCLASSEX]],
    SendMessageW: [DTypes.LRESULT, [DTypes.HWND, DTypes.UINT, DTypes.WPARAM, DTypes.LPARAM]],
    SetForegroundWindow: [DTypes.BOOL, [DTypes.HWND]],
    SetWindowTextW: [DTypes.BOOL, [DTypes.HWND, DTypes.LPCTSTR]],
    SetWinEventHook: [DTypes.HWINEVENTHOOK, [DTypes.UINT, DTypes.UINT, DTypes.HMODULE, DTypes.WINEVENTPROC, DTypes.DWORD, DTypes.DWORD, DTypes.UINT]],
    ShowWindow: [DTypes.BOOL, [DTypes.HWND, DTypes.INT]],
    TranslateMessage: [DTypes.BOOL, [DTypes.LPMSG]],
    TranslateMessageEx: [DTypes.BOOL, [DTypes.LPMSG]],
    UnhookWinEvent: [DTypes.BOOL, [DTypes.HWINEVENTHOOK]],
    UpdateWindow: [DTypes.BOOL, [DTypes.HWND]],
};
/* istanbul ignore next */
if (process.arch === 'x64') {
    apiDef$3.GetWindowLongPtrW = [DTypes.LONG_PTR, [DTypes.HWND, DTypes.INT]];
}

/* eslint-disable no-bitwise */
/* --------- Window Styles ---------------- */
// https://msdn.microsoft.com/en-us/library/windows/desktop/ms632600(v=vs.85).aspx
const WS_BORDER = 0x00800000;
const WS_CAPTION = 0x00C00000;
const WS_CHILD = 0x40000000;
const WS_CLIPCHILDREN = 0x02000000;
const WS_CLIPSIBLINGS = 0x04000000;
const WS_DISABLED = 0x08000000;
const WS_DLGFRAME = 0x00400000;
const WS_GROUP = 0x00020000;
const WS_HSCROLL = 0x00100000;
const WS_ICONIC = 0x20000000;
const WS_MAXIMIZE = 0x01000000;
const WS_MAXIMIZEBOX = 0x00010000;
const WS_MINIMIZE = 0x20000000;
const WS_MINIMIZEBOX = 0x00020000;
const WS_OVERLAPPED = 0x00000000;
const WS_POPUP = 0x80000000; // The windows is a pop-up window
const WS_SIZEBOX = 0x00040000;
const WS_SYSMENU = 0x00080000; // The window has a window menu on its title bar.
const WS_TABSTOP = 0x00010000;
const WS_THICKFRAME = 0x00040000;
const WS_TILED = 0x00000000;
const WS_VISIBLE = 0x10000000;
const WS_VSCROLL = 0x00200000;
const WS_OVERLAPPEDWINDOW = WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU
    | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX;
const WS_POPUPWINDOW = WS_POPUP | WS_BORDER | WS_SYSMENU;
const WS_TILEDWINDOW = WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU
    | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX;
/* --------- Extended Window Styles ---------------- */
// https://docs.microsoft.com/en-us/windows/win32/winmsg/extended-window-styles
// https://msdn.microsoft.com/en-us/library/windows/desktop/ff700543(v=vs.85).aspx
const WS_EX_ACCEPTFILES = 0x00000010;
const WS_EX_APPWINDOW = 0x00040000;
const WS_EX_CLIENTEDGE = 0x00000200;
const WS_EX_COMPOSITED = 0x02000000;
const WS_EX_CONTEXTHELP = 0x00000400;
const WS_EX_CONTROLPARENT = 0x00010000;
const WS_EX_DLGMODALFRAME = 0x00000001;
const WS_EX_LAYERED = 0x00080000;
const WS_EX_LAYOUTRTL = 0x00400000;
const WS_EX_LEFT = 0x00000000;
const WS_EX_LEFTSCROLLBAR = 0x00004000;
const WS_EX_LTRREADING = 0x00000000;
const WS_EX_MDICHILD = 0x00000040;
const WS_EX_NOACTIVATE = 0x08000000;
const WS_EX_NOINHERITLAYOUT = 0x00100000;
const WS_EX_NOPARENTNOTIFY = 0x00000004;
const WS_EX_NOREDIRECTIONBITMAP = 0x00200000;
const WS_EX_RIGHT = 0x00001000;
const WS_EX_RIGHTSCROLLBAR = 0x00000000;
const WS_EX_RTLREADING = 0x00002000;
const WS_EX_STATICEDGE = 0x00020000;
const WS_EX_TOOLWINDOW = 0x00000080;
const WS_EX_TOPMOST = 0x00000008;
const WS_EX_TRANSPARENT = 0x00000020;
const WS_EX_WINDOWEDGE = 0x00000100;
const WS_EX_OVERLAPPEDWINDOW = WS_EX_WINDOWEDGE | WS_EX_CLIENTEDGE;
const WS_EX_PALETTEWINDOW = WS_EX_WINDOWEDGE | WS_EX_TOOLWINDOW | WS_EX_TOPMOST;
const PM_NOREMOVE = 0x0000;
const PM_REMOVE = 0x0001;
const PM_NOYIELD = 0x0002;
const CW_USEDEFAULT = 1 << 31;

var constants = /*#__PURE__*/Object.freeze({
    __proto__: null,
    WS_BORDER: WS_BORDER,
    WS_CAPTION: WS_CAPTION,
    WS_CHILD: WS_CHILD,
    WS_CLIPCHILDREN: WS_CLIPCHILDREN,
    WS_CLIPSIBLINGS: WS_CLIPSIBLINGS,
    WS_DISABLED: WS_DISABLED,
    WS_DLGFRAME: WS_DLGFRAME,
    WS_GROUP: WS_GROUP,
    WS_HSCROLL: WS_HSCROLL,
    WS_ICONIC: WS_ICONIC,
    WS_MAXIMIZE: WS_MAXIMIZE,
    WS_MAXIMIZEBOX: WS_MAXIMIZEBOX,
    WS_MINIMIZE: WS_MINIMIZE,
    WS_MINIMIZEBOX: WS_MINIMIZEBOX,
    WS_OVERLAPPED: WS_OVERLAPPED,
    WS_POPUP: WS_POPUP,
    WS_SIZEBOX: WS_SIZEBOX,
    WS_SYSMENU: WS_SYSMENU,
    WS_TABSTOP: WS_TABSTOP,
    WS_THICKFRAME: WS_THICKFRAME,
    WS_TILED: WS_TILED,
    WS_VISIBLE: WS_VISIBLE,
    WS_VSCROLL: WS_VSCROLL,
    WS_OVERLAPPEDWINDOW: WS_OVERLAPPEDWINDOW,
    WS_POPUPWINDOW: WS_POPUPWINDOW,
    WS_TILEDWINDOW: WS_TILEDWINDOW,
    WS_EX_ACCEPTFILES: WS_EX_ACCEPTFILES,
    WS_EX_APPWINDOW: WS_EX_APPWINDOW,
    WS_EX_CLIENTEDGE: WS_EX_CLIENTEDGE,
    WS_EX_COMPOSITED: WS_EX_COMPOSITED,
    WS_EX_CONTEXTHELP: WS_EX_CONTEXTHELP,
    WS_EX_CONTROLPARENT: WS_EX_CONTROLPARENT,
    WS_EX_DLGMODALFRAME: WS_EX_DLGMODALFRAME,
    WS_EX_LAYERED: WS_EX_LAYERED,
    WS_EX_LAYOUTRTL: WS_EX_LAYOUTRTL,
    WS_EX_LEFT: WS_EX_LEFT,
    WS_EX_LEFTSCROLLBAR: WS_EX_LEFTSCROLLBAR,
    WS_EX_LTRREADING: WS_EX_LTRREADING,
    WS_EX_MDICHILD: WS_EX_MDICHILD,
    WS_EX_NOACTIVATE: WS_EX_NOACTIVATE,
    WS_EX_NOINHERITLAYOUT: WS_EX_NOINHERITLAYOUT,
    WS_EX_NOPARENTNOTIFY: WS_EX_NOPARENTNOTIFY,
    WS_EX_NOREDIRECTIONBITMAP: WS_EX_NOREDIRECTIONBITMAP,
    WS_EX_RIGHT: WS_EX_RIGHT,
    WS_EX_RIGHTSCROLLBAR: WS_EX_RIGHTSCROLLBAR,
    WS_EX_RTLREADING: WS_EX_RTLREADING,
    WS_EX_STATICEDGE: WS_EX_STATICEDGE,
    WS_EX_TOOLWINDOW: WS_EX_TOOLWINDOW,
    WS_EX_TOPMOST: WS_EX_TOPMOST,
    WS_EX_TRANSPARENT: WS_EX_TRANSPARENT,
    WS_EX_WINDOWEDGE: WS_EX_WINDOWEDGE,
    WS_EX_OVERLAPPEDWINDOW: WS_EX_OVERLAPPEDWINDOW,
    WS_EX_PALETTEWINDOW: WS_EX_PALETTEWINDOW,
    PM_NOREMOVE: PM_NOREMOVE,
    PM_REMOVE: PM_REMOVE,
    PM_NOYIELD: PM_NOYIELD,
    CW_USEDEFAULT: CW_USEDEFAULT
});

const dllName$3 = "user32" /* user32 */;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const load$4 = (fns, settings) => load(dllName$3, apiDef$3, fns, settings);

var index$4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apiDef: apiDef$3,
    constants: constants,
    dllName: dllName$3,
    load: load$4
});

/**
 * https://docs.microsoft.com/en-us/windows/win32/winmsg/windowing
 */
// https://docs.microsoft.com/zh-cn/windows/win32/winmsg/window-messages
const MN_GETHMENU = 0x01E1;
const WM_ERASEBKGND = 0x0014;
const WM_GETFONT = 0x0031;
const WM_GETTEXT = 0x000D;
const WM_GETTEXTLENGTH = 0x000E;
const WM_SETFONT = 0x0030;
const WM_SETICON = 0x0080;
const WM_SETTEXT = 0x000C;
// https://docs.microsoft.com/zh-cn/windows/win32/winmsg/window-notifications
const WM_ACTIVATEAPP = 0x001C;
const WM_CANCELMODE = 0x001F;
const WM_CHILDACTIVATE = 0x0022;
const WM_CLOSE = 0x0010;
const WM_CREATE = 0x0001;
const WM_DESTROY = 0x0002;
const WM_ENABLE = 0x000A;
const WM_ENTERSIZEMOVE = 0x0231;
const WM_EXITSIZEMOVE = 0x0232;
const WM_GETICON = 0x007F;
const WM_GETMINMAXINFO = 0x0024;
const WM_INPUTLANGCHANGE = 0x0051;
const WM_INPUTLANGCHANGEREQUEST = 0x0050;
const WM_MOVE = 0x0003;
const WM_MOVING = 0x0216;
const WM_NCACTIVATE = 0x0086;
const WM_NCCALCSIZE = 0x0083;
const WM_NCCREATE = 0x0081;
const WM_NCDESTROY = 0x0082;
const WM_NULL = 0x0000;
const WM_QUERYDRAGICON = 0x0037;
const WM_QUERYOPEN = 0x0013;
const WM_QUIT = 0x0012;
const WM_SHOWWINDOW = 0x0018;
const WM_SIZE = 0x0005;
const WM_SIZING = 0x0214;
const WM_STYLECHANGED = 0x007D;
const WM_STYLECHANGING = 0x007C;
const WM_THEMECHANGED = 0x031A;
const WM_USERCHANGED = 0x0054;
const WM_WINDOWPOSCHANGED = 0x0047;
const WM_WINDOWPOSCHANGING = 0x0046;
/** https://docs.microsoft.com/en-us/windows/win32/dataxchg/wm-copydata */
const WM_COPYDATA = 0x004A;
// https://docs.microsoft.com/en-us/windows/win32/menurc/menu-notifications
const WM_COMMAND = 0x0111;
const WM_CONTEXTMENU = 0x007B;
const WM_ENTERMENULOOP = 0x0211;
const WM_EXITMENULOOP = 0x0212;
const WM_GETTITLEBARINFOEX = 0x033F;
const WM_MENUCOMMAND = 0x0126;
const WM_MENUDRAG = 0x0123;
const WM_MENUGETOBJECT = 0x0124;
const WM_MENURBUTTONUP = 0x0122;
const WM_NEXTMENU = 0x0213;
const WM_UNINITMENUPOPUP = 0x0125;

var winmsg = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MN_GETHMENU: MN_GETHMENU,
    WM_ERASEBKGND: WM_ERASEBKGND,
    WM_GETFONT: WM_GETFONT,
    WM_GETTEXT: WM_GETTEXT,
    WM_GETTEXTLENGTH: WM_GETTEXTLENGTH,
    WM_SETFONT: WM_SETFONT,
    WM_SETICON: WM_SETICON,
    WM_SETTEXT: WM_SETTEXT,
    WM_ACTIVATEAPP: WM_ACTIVATEAPP,
    WM_CANCELMODE: WM_CANCELMODE,
    WM_CHILDACTIVATE: WM_CHILDACTIVATE,
    WM_CLOSE: WM_CLOSE,
    WM_CREATE: WM_CREATE,
    WM_DESTROY: WM_DESTROY,
    WM_ENABLE: WM_ENABLE,
    WM_ENTERSIZEMOVE: WM_ENTERSIZEMOVE,
    WM_EXITSIZEMOVE: WM_EXITSIZEMOVE,
    WM_GETICON: WM_GETICON,
    WM_GETMINMAXINFO: WM_GETMINMAXINFO,
    WM_INPUTLANGCHANGE: WM_INPUTLANGCHANGE,
    WM_INPUTLANGCHANGEREQUEST: WM_INPUTLANGCHANGEREQUEST,
    WM_MOVE: WM_MOVE,
    WM_MOVING: WM_MOVING,
    WM_NCACTIVATE: WM_NCACTIVATE,
    WM_NCCALCSIZE: WM_NCCALCSIZE,
    WM_NCCREATE: WM_NCCREATE,
    WM_NCDESTROY: WM_NCDESTROY,
    WM_NULL: WM_NULL,
    WM_QUERYDRAGICON: WM_QUERYDRAGICON,
    WM_QUERYOPEN: WM_QUERYOPEN,
    WM_QUIT: WM_QUIT,
    WM_SHOWWINDOW: WM_SHOWWINDOW,
    WM_SIZE: WM_SIZE,
    WM_SIZING: WM_SIZING,
    WM_STYLECHANGED: WM_STYLECHANGED,
    WM_STYLECHANGING: WM_STYLECHANGING,
    WM_THEMECHANGED: WM_THEMECHANGED,
    WM_USERCHANGED: WM_USERCHANGED,
    WM_WINDOWPOSCHANGED: WM_WINDOWPOSCHANGED,
    WM_WINDOWPOSCHANGING: WM_WINDOWPOSCHANGING,
    WM_COPYDATA: WM_COPYDATA,
    WM_COMMAND: WM_COMMAND,
    WM_CONTEXTMENU: WM_CONTEXTMENU,
    WM_ENTERMENULOOP: WM_ENTERMENULOOP,
    WM_EXITMENULOOP: WM_EXITMENULOOP,
    WM_GETTITLEBARINFOEX: WM_GETTITLEBARINFOEX,
    WM_MENUCOMMAND: WM_MENUCOMMAND,
    WM_MENUDRAG: WM_MENUDRAG,
    WM_MENUGETOBJECT: WM_MENUGETOBJECT,
    WM_MENURBUTTONUP: WM_MENURBUTTONUP,
    WM_NEXTMENU: WM_NEXTMENU,
    WM_UNINITMENUPOPUP: WM_UNINITMENUPOPUP
});

export { BufferTypeFactory, index$1 as C, winmsg as CS, index$1 as Comctl32, winmsg as Constants, index as DStructExt, index$2 as K, index$2 as Kernel32, index$3 as Ntdll, index$4 as U, index$4 as User32 };
//# sourceMappingURL=index.esm.js.map
