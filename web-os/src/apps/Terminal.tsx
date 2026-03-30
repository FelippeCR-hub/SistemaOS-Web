import { useState } from "react";

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function runCommand() {
    if (input === "help") setLines([...lines, "help, clear"]);
    else if (input === "clear") setLines([]);
    else setLines([...lines, "comando não encontrado"]);
    setInput("");
  }

  return (
    <div style={{ background: "black", color: "lime", height: "100%" }}>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}

      <input
         value={input}
         onChange={(e) => setInput(e.target.value)}
         onKeyDown={(e) => e.key === "Enter" && runCommand()}
         onMouseDown={(e) => e.stopPropagation()}
         style={{ width: "100%", background: "black", color: "lime" }}
/>
    </div>
  );
}