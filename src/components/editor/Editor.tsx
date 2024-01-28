import { useTheme } from "@/providers/theme-provider";
import { Editor as CodeMirror, EditorChange } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/theme/tomorrow-night-eighties.css";
import { Controlled as ControlledEditor } from "react-codemirror2";

interface ICodeEditor {
  language: string;
  displayName: string;
  value: string;
  onChange(value: string): void;
}

function Editor({ language, displayName, value, onChange }: ICodeEditor) {
  function handleChange(
    _editor: CodeMirror,
    _data: EditorChange,
    value: string
  ) {
    onChange(value);
  }

  const { theme } = useTheme();
  const color =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <div>
      <p className="p-2">{displayName}</p>
      <div>
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className="codeMirrorWrapper"
          options={{
            lineWrapping: true,
            mode: language,
            theme: color === "dark" ? "tomorrow-night-eighties" : "",
            lineNumbers: true,
          }}
        />
      </div>
    </div>
  );
}

export default Editor;
