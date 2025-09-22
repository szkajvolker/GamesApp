import { useState } from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <NavBar onSearch={setSearchTerm} />
      <Hero />
      <Content searchTerm={searchTerm} />
      <Footer />
    </main>
  );
}

export default App;
