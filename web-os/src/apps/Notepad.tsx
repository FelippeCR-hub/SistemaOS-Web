import { useState, useEffect } from "react";

export default function Notepad() {
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("notepad");
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notepad", text);
  }, [text]);

  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{ width: "100%", height: "100%" }}
    />
  );
}