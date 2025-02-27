import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx"; 
import SignUp from "./pages/SIgnUP.jsx";
import DashboardModel from "./pages/DashboardModels.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} /> 
        <Route path="/sign" element={<SignUp />} />
        <Route 
          path="/model" 
          element={
            <ProtectedRoute>
              <DashboardModel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;