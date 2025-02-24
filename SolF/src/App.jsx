import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Form from "./pages/Login.jsx"; // ✅ Importa correctamente Form

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  {/* ✅ Página principal */}
        <Route path="/form" element={<Form />} /> {/* ✅ Página del formulario */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
