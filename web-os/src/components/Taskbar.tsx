import { useOSStore } from "../store/useOSStore";

export default function Taskbar() {
  const { windows, toggleMinimize, focusWindow } = useOSStore();

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 40,
        background: "#111827",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        gap: 10,
      }}
    >
      {windows.map((w) => (
        <button
          key={w.id}
          onClick={() => {
            toggleMinimize(w.id);
            focusWindow(w.id);
          }}
        >
          {w.app}
        </button>
      ))}
    </div>
  );
}