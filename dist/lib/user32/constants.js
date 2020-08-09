/* eslint-disable no-bitwise */
/* --------- Window Styles ---------------- */
// https://msdn.microsoft.com/en-us/library/windows/desktop/ms632600(v=vs.85).aspx
export const WS_BORDER = 0x00800000;
export const WS_CAPTION = 0x00C00000;
export const WS_CHILD = 0x40000000;
export const WS_CLIPCHILDREN = 0x02000000;
export const WS_CLIPSIBLINGS = 0x04000000;
export const WS_DISABLED = 0x08000000;
export const WS_DLGFRAME = 0x00400000;
export const WS_GROUP = 0x00020000;
export const WS_HSCROLL = 0x00100000;
export const WS_ICONIC = 0x20000000;
export const WS_MAXIMIZE = 0x01000000;
export const WS_MAXIMIZEBOX = 0x00010000;
export const WS_MINIMIZE = 0x20000000;
export const WS_MINIMIZEBOX = 0x00020000;
export const WS_OVERLAPPED = 0x00000000;
export const WS_POPUP = 0x80000000; // The windows is a pop-up window
export const WS_SIZEBOX = 0x00040000;
export const WS_SYSMENU = 0x00080000; // The window has a window menu on its title bar.
export const WS_TABSTOP = 0x00010000;
export const WS_THICKFRAME = 0x00040000;
export const WS_TILED = 0x00000000;
export const WS_VISIBLE = 0x10000000;
export const WS_VSCROLL = 0x00200000;
export const WS_OVERLAPPEDWINDOW = WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU
    | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX;
export const WS_POPUPWINDOW = WS_POPUP | WS_BORDER | WS_SYSMENU;
export const WS_TILEDWINDOW = WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU
    | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX;
/* --------- Extended Window Styles ---------------- */
// https://docs.microsoft.com/en-us/windows/win32/winmsg/extended-window-styles
// https://msdn.microsoft.com/en-us/library/windows/desktop/ff700543(v=vs.85).aspx
export const WS_EX_ACCEPTFILES = 0x00000010;
export const WS_EX_APPWINDOW = 0x00040000;
export const WS_EX_CLIENTEDGE = 0x00000200;
export const WS_EX_COMPOSITED = 0x02000000;
export const WS_EX_CONTEXTHELP = 0x00000400;
export const WS_EX_CONTROLPARENT = 0x00010000;
export const WS_EX_DLGMODALFRAME = 0x00000001;
export const WS_EX_LAYERED = 0x00080000;
export const WS_EX_LAYOUTRTL = 0x00400000;
export const WS_EX_LEFT = 0x00000000;
export const WS_EX_LEFTSCROLLBAR = 0x00004000;
export const WS_EX_LTRREADING = 0x00000000;
export const WS_EX_MDICHILD = 0x00000040;
export const WS_EX_NOACTIVATE = 0x08000000;
export const WS_EX_NOINHERITLAYOUT = 0x00100000;
export const WS_EX_NOPARENTNOTIFY = 0x00000004;
export const WS_EX_NOREDIRECTIONBITMAP = 0x00200000;
export const WS_EX_RIGHT = 0x00001000;
export const WS_EX_RIGHTSCROLLBAR = 0x00000000;
export const WS_EX_RTLREADING = 0x00002000;
export const WS_EX_STATICEDGE = 0x00020000;
export const WS_EX_TOOLWINDOW = 0x00000080;
export const WS_EX_TOPMOST = 0x00000008;
export const WS_EX_TRANSPARENT = 0x00000020;
export const WS_EX_WINDOWEDGE = 0x00000100;
export const WS_EX_OVERLAPPEDWINDOW = WS_EX_WINDOWEDGE | WS_EX_CLIENTEDGE;
export const WS_EX_PALETTEWINDOW = WS_EX_WINDOWEDGE | WS_EX_TOOLWINDOW | WS_EX_TOPMOST;
export const PM_NOREMOVE = 0x0000;
export const PM_REMOVE = 0x0001;
export const PM_NOYIELD = 0x0002;
export const CW_USEDEFAULT = 1 << 31;
