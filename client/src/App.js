import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import InsertMember from "./routes/InsertMember";
import InsertSuccess from "./routes/InsertSuccess";
import Login from "./routes/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/insertSuccess" element={<InsertSuccess />} />
        <Route path="/insertMember" element={<InsertMember />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
