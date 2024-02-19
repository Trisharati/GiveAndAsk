
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const LoginForm = lazy(() => import("./components/LoginForm"))
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import ProfileDetails from "./components/ProfileDetails";
import EditProfile from "./components/EditProfile";
import Giveableslist from "./components/Giveableslist";
import Giveableform from "./components/Giveableform";
import Askform from "./components/Askform";
import Asklist from "./components/Asklist";
import Matches from "./components/Matches";
import MyGives from "./components/MyGives";
import MyAsks from "./components/MyAsks";
import Home from "./components/Home";
import EditMyGive from "./components/EditMyGive";
import EditMyAsk from "./components/EditMyAsk";
import LazyLoading from "./components/LazyLoading";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route
            path="/home"
            element={<PrivateRoute Component={Home} />}
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
            path="/my-gives/:userId"
            element={<PrivateRoute Component={MyGives} />}
          />
          <Route
            path="/giveableform"
            element={<PrivateRoute Component={Giveableform} />}
          />
          <Route
            path="/editmygive/:giveId"
            element={<PrivateRoute Component={EditMyGive} />}
          />
          <Route
            path="/asklist"
            element={<PrivateRoute Component={Asklist} />}
          />
          <Route
            path="/my-asks/:userId"
            element={<PrivateRoute Component={MyAsks} />}
          />
          <Route
            path="/editmyask/:askId"
            element={<PrivateRoute Component={EditMyAsk} />}
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
