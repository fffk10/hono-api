import { createRoot } from "react-dom/client";
import Layout from "./layout";
import Home from "./home";

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(<App />);
