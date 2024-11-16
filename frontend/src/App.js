import "./styles/App.scss";
import SignIn from './pages/SignIn';
import SignUp from './pages/SighUp';
import Home from './pages/Home';
import Error from "./pages/Error";
import { Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer";
import FieldFull from "./pages/FieldFull";

function App() {
  return (<>
    {/* <Header /> */}
    <svg className="app-top-decoration" xmlns="http://www.w3.org/2000/svg" width="2000" height="597" viewBox="0 0 1999 597"><path d="M0 96.41s420.188 216.922 999.5 0 999.5 0 999.5 0V597H0Zm0 0"/></svg>
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="/fields/:fieldName" element={<FieldFull />} />
      <Route path="*" element={<Error />} />
      {/* <Route path="/reservation" element={<Reservation />} />
      <Route path="/field-control" element={<FieldControl />} /> */}
    </Routes>
    {/* <Footer /> */}
    </>
  );
}

export default App;
