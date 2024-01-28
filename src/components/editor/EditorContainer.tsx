import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import Editor from "./Editor";
import { useTheme } from "@/providers/theme-provider";

function EditorContainer() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("javascript", "");
  const [compiledContent, setCompiledContent] = useState("");
  const { theme } = useTheme();
  const color =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCompiledContent(`
        <html>
          <body>${html}</body>
          <style>
          body {
            background-color: ${color === "dark" ? "black" : "white"};
            color: ${color === "dark" ? "white" : "black"};
          }
          ${css}</style>
          <script>${javascript}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, javascript]);
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="w-full rounded-lg border editor-container"
    >
      <ResizablePanel>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <div className="h-full w-full">
              <Editor
                displayName="html"
                language="xml"
                onChange={setHtml}
                value={html}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="h-full w-full">
              <Editor
                displayName="css"
                language="css"
                onChange={setCss}
                value={css}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="h-full w-full">
              <Editor
                displayName="js"
                language="javascript"
                onChange={setJavascript}
                value={javascript}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="h-full w-full">
          <iframe
            srcDoc={compiledContent}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
            style={{
              backgroundColor: "white",
            }}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
}

export default EditorContainer;
