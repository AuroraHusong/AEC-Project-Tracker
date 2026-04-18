import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectList from "./pages/ProjectList";
import "./App.css";
import IndivProject from "./pages/IndivProject"
import NewProject from "./pages/NewProject"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects/new" element={<NewProject />}/>
        <Route path="/projects/:id" element={<IndivProject/>}/>
        <Route path="/" element={<ProjectList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;