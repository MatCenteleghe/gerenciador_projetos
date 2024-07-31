import { HashRouter, Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";

import Container from "./components/layouts/Container";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Projects from "./components/pages/Projects";
import SingleProject from "./components/pages/SingleProject";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/newProject" element={<NewProject />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/projects/:id" element={<SingleProject />}></Route>
        </Routes>
      </Container>
      <Footer />
    </HashRouter>
  );
}
export default App;
