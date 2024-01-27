import EditorContainer from "@/components/editor/EditorContainer";
import Provider from "./providers/Provider";

function App() {
  return (
    <Provider>
      <div className="w-full h-full border p-6">
        <EditorContainer />
      </div>
    </Provider>
  );
}

export default App;
