import { useCallback, useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import markdownContent from "./markdownContent";
import MarkdownPreview from "./MarkdownPreview";

export default function App() {
  const [text, setText] = useState(markdownContent);
  const [time, setTime] = useState(Date.now());
  const [theme, setTheme] = useState("green");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = useMemo(() => ({ text, theme }) , [text , theme]);
  // const options = { text, theme };

  const render = useCallback((text) => marked.parse(text) , [])
  // const render = (text) => marked.parse(text);

  return (
    <div className="app">
      <h1>Performance with React</h1>
      <h2>Current Time: {time}</h2>

      <label htmlFor="theme">
        Choose a theme
        <select onChange={(e) => setTheme(e.target.value)}>
          {["green", "blue", "yellow", "red"].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </label>

      <div className="markdown">
        <textarea
          className="markdown-editor"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <MarkdownPreview options={options} render={render} />
      </div>
    </div>
  );
}
