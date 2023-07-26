import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import WasteCollection from "./Components/Services/WasteCollection";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Signin" element={<Signin />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/WasteCollection" element={<WasteCollection />}></Route>
      </Routes>
    </>
  );
}

export default App;
