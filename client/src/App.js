import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import PostList from "./components/PostList";
import Home from "./routes/Home";
import InsertMember from "./routes/InsertMember";
import InsertSuccess from "./routes/InsertSuccess";
import Login from "./routes/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/insertSuccess" element={<InsertSuccess />} />
        <Route path="/insertMember" element={<InsertMember />} />
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/" element={<Home />} >
          <Route path=":postCategory" element={<PostList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
