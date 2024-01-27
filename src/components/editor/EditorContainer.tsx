import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "./Editor";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

function EditorContainer() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("javascript", "");
  const [compiledContent, setCompiledContent] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCompiledContent(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
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
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
}

export default EditorContainer;
