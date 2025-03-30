import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import libraryBg from "../../images/library-4.jpg";
// import ProtectedRoute from './components/protected-route/protected-route';
import { Header, Footer } from "./index.ts";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.ts";

interface User {
  email: string;
  name: string;
  _id: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>({
    email: "",
    name: "",
    _id: "",
  });


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <div
        className="flex flex-wrap sm:items-center sm:justify-center relative w-full min-h-screen bg-repeat bg-[length:400px_400px] font-[BonaNova] text-center"
        style={{
          backgroundImage: `url(${libraryBg}), radial-gradient(circle at top center, rgba(0,0,0,0.750), rgba(0,0,0,.6))`,
          backgroundBlendMode: "overlay",
        }}
      >
        <Routes>
          <Route path="/" element={<div>Home Route</div>} />
          {/* <Route path="/welcome" element={<Welcome />} />
        <Route path="/registration" element={<AccountCreationForm />} />
        <Route path="/registration-confirm" element={<RegistrationConfirmation />} />
        <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
        <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
