import { useOSStore } from "../store/useOSStore";
import Window from "./Window";

export default function Desktop() {
  const { windows, openWindow } = useOSStore();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: 20, color: "white" }}>
        <button onClick={() => openWindow("notepad")}>📄 Notepad</button>
        <br />
        <button onClick={() => openWindow("terminal")}>💻 Terminal</button>
      </div>

      {windows.map((w) => (
        <Window key={w.id} data={w} />
      ))}
    </div>
  );
}