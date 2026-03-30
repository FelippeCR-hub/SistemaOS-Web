import { useOSStore } from "../store/useOSStore";
import Notepad from "../apps/Notepad";
import Terminal from "../apps/Terminal";

export default function Window({ data }: any) {
  const {
    moveWindow,
    focusWindow,
    closeWindow,
    toggleMinimize,
    toggleMaximize,
  } = useOSStore();

  if (data.minimized) return null;

  function handleMouseDown(e: React.MouseEvent) {
    if (data.maximized) return;

    const startX = e.clientX;
    const startY = e.clientY;

    function onMove(eMove: MouseEvent) {
      moveWindow(
        data.id,
        data.x + (eMove.clientX - startX),
        data.y + (eMove.clientY - startY)
      );
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  return (
    <div
      onMouseDown={() => focusWindow(data.id)}
      style={{
        position: "absolute",
        top: data.maximized ? 0 : data.y,
        left: data.maximized ? 0 : data.x,
        width: data.maximized ? "100vw" : data.width,
        height: data.maximized ? "100vh" : data.height,
        background: "#f1f1f1",
        borderRadius: data.maximized ? 0 : 8,
        zIndex: data.z,
        boxShadow: data.maximized ? "none" : "0 10px 30px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
      }}
    >
  
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e);
            }}
            style={{
              background: "#1f2937",
              color: "white",
              padding: "6px 10px",
              cursor: "move",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
        <span>{data.app}</span>

        <div>
          <button onClick={() => toggleMinimize(data.id)}>—</button>
          <button onClick={() => toggleMaximize(data.id)}>⬜</button>
          <button onClick={() => closeWindow(data.id)}>X</button>
        </div>
      </div>

  
      <div style={{ flex: 1 }}>
        {data.app === "notepad" && <Notepad />}
        {data.app === "terminal" && <Terminal />}
      </div>
    </div>
  );
}