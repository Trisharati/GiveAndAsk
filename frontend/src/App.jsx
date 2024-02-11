import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ProfileDetails from "./components/ProfileDetails";
import EditProfile from "./components/EditProfile";
import Giveableslist from "./components/Giveableslist";
import Giveableform from "./components/Giveableform";
import Askform from "./components/Askform";
import Asklist from "./components/Asklist";
import Matches from "./components/Matches";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route
            path="/navbar"
            element={<PrivateRoute Component={Navbar} />}
          ></Route>
          <Route
            path="/profiledetails"
            element={<PrivateRoute Component={ProfileDetails} />}
          />
          <Route
            path="/editprofile"
            element={<PrivateRoute Component={EditProfile} />}
          />
          <Route
            path="/giveablelist"
            element={<PrivateRoute Component={Giveableslist} />}
          />
          <Route
            path="/giveableform"
            element={<PrivateRoute Component={Giveableform} />}
          />
          <Route
            path="/asklist"
            element={<PrivateRoute Component={Asklist} />}
          />
          <Route
            path="/askform"
            element={<PrivateRoute Component={Askform} />}
          />
          <Route
            path="/matches"
            element={<PrivateRoute Component={Matches} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
