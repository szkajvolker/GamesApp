import { useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <NavBar onSearch={setSearchTerm} />
      <Home />
      <Content searchTerm={searchTerm} />
      <Footer />
    </main>
  );
}

export default App;
