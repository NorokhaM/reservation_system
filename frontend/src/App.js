import "./styles/App.scss";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Error from "./pages/Error";
import { Routes, Route, useLocation } from "react-router-dom";
import FieldFull from "./pages/FieldFull";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import BurgerMenu from './components/BurgerMenu';

function App() {
  const location = useLocation();

  // Скрыть BurgerMenu и SVG на странице Admin
  const hideHeader = location.pathname === "/admin";

  return (
    <>
      {!hideHeader && (
        <>
          <BurgerMenu />
          <svg
            className="app-top-decoration"
            xmlns="http://www.w3.org/2000/svg"
            width="2000"
            height="597"
            viewBox="0 0 1999 597"
          >
            <path d="M0 96.41s420.188 216.922 999.5 0 999.5 0 999.5 0V597H0Zm0 0" />
          </svg>
        </>
      )}
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/fields/:fieldName" element={<FieldFull />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
