import React from "react";
import { HomePage, DiosForm, NotFoundPage, SignUp, Login} from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { DiosProvider } from "./context/diosContext";
import {UserProvider} from './context/userContext'
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <UserProvider>
    <Navbar/>
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 min-h-screen flex items-center">
      <div className="md:h-full px-10 container mx-auto text-gray-300">
        <DiosProvider>
          <div className="container px-5 py-24 mx-auto">
            

            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/nuevo" element={<DiosForm />} />
                <Route path="/dioses/:id" element={<DiosForm />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
              </Routes>
            </div>
          </div>

          <Toaster />
        </DiosProvider>
        
      </div>
     </div>
    </UserProvider>
    </>
    
  );
}

export default App;
