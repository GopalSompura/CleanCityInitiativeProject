import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import WasteCollection from "./Components/Services/WasteCollection";
import Payment from "./Components/Payment";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import Message from "./Components/Services/Message";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Signin" element={<Signin />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/WasteCollection" element={<WasteCollection />}></Route>
        <Route path="/Payment" element={<Payment />}></Route>
        <Route path="/Success" element={<Success />}></Route>
        <Route path="/Cancel" element={<Cancel />}></Route>
        <Route path="/message" element={<Message />}></Route>
      </Routes>
    </>
  );
}

export default App;
