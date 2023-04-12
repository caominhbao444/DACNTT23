import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Message from "./pages/Message/Message";
import Loading from "./pages/Loading/Loading";
import SignupDetails from "./pages/Signup/SignupDetails";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<Message />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/signupdetails" element={<SignupDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
