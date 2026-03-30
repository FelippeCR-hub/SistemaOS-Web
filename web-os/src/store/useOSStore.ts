import { create } from "zustand";

type AppType = "notepad" | "terminal";

type WindowType = {
  id: number;
  app: AppType;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type OSState = {
  windows: WindowType[];
  zIndex: number;

  openWindow: (app: AppType) => void;
  focusWindow: (id: number) => void;
  moveWindow: (id: number, x: number, y: number) => void;
  closeWindow: (id: number) => void;
  toggleMinimize: (id: number) => void;
  toggleMaximize: (id: number) => void;
};

export const useOSStore = create<OSState>((set) => ({
  windows: [],
  zIndex: 1,

  openWindow: (app) =>
    set((state) => ({
      windows: [
        ...state.windows,
        {
          id: Date.now(),
          app,
          x: 120,
          y: 80,
          width: 500,
          height: 350,
          z: state.zIndex + 1,
          minimized: false,
          maximized: false,
        },
      ],
      zIndex: state.zIndex + 1,
    })),

  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, z: state.zIndex + 1 } : w
      ),
      zIndex: state.zIndex + 1,
    })),

  moveWindow: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    })),

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  toggleMinimize: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: !w.minimized } : w
      ),
    })),

  toggleMaximize: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      ),
    })),
}));