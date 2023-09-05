import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./Context/UserContext";
import Header1 from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Footer from "./Components/Footer/Footer";
import Quesion from "./Pages/AskQuestion/AskQuestion";
import AnswerQuestion from "./Pages/QuestionDetail/QuestionDetail";
import SharedLayout from "./Components/SharedLayout";
function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    // console.log(token);
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      try {
        // if the token exists in localstorage then use auth to verify token and get user info
        const userRes = await axios.get("http://localhost:4001/api/users", {
          headers: { "x-auth-token": token },
        });
        console.log(userRes);
        setUserData({
          token: token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      {/* <Route path="/" element={<
          SharedLayout />} /> */}
      <Header1 logout={logout} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/ask-question" element={<Quesion />} />
        <Route path="/questions/:id" element={<AnswerQuestion />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
