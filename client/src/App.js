import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import PostList from "./components/PostList";
import Home from "./routes/Home";
import InsertMember from "./routes/InsertMember";
import InsertSuccess from "./routes/InsertSuccess";
import Login from "./routes/Login";
import MakePost from "./routes/MakePost";
import PostDetail from "./routes/PostDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/insertSuccess" element={<InsertSuccess />} />
        <Route path="/insertMember" element={<InsertMember />} />
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/postDetail" element={<Home />}>
          <Route path=":postCategory/:postId" element={<PostDetail />} />
        </Route>
        <Route path="/makePost" element={<Home />}>
          <Route path=":postCategory" element={<MakePost />} />
        </Route>
        <Route path="/" element={<Home />} >
          <Route path=":postCategory/:page" element={<PostList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
