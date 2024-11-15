import "./styles/App.scss";
import SignIn from './pages/SignIn';
import SignUp from './pages/SighUp';
import Home from './pages/Home';
import Error from "./pages/Error";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (<>
    {/* <Header /> */}
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
      {/* <Route path="/reservation" element={<Reservation />} />
      <Route path="/field-control" element={<FieldControl />} /> */}
    </Routes>
    <Footer />
    </>
  );
}

export default App;
