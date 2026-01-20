import React from "react";

import {Routes, Route} from "react-router";
import "./index.css";

import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Me from "./pages/Me.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreatePage from "./pages/CreatePage.jsx";


function App() {
  return (
  
    
    <div >
      
     <Routes>       
        
        <Route path="/register" element= {<RegisterPage />}/> 
        <Route path="/" element= {<LoginPage />}/>

        
          <Route path="/home" element= {
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute> }
          />

           <Route path="/create" element= {
            <ProtectedRoute>
              <CreatePage  />
            </ProtectedRoute> }
          />

          <Route path="/Me" element= {
            <ProtectedRoute>
              <Me />
            </ProtectedRoute> }
          />

        
         
             
      </Routes>

    </div>
    
  );
}

export default App;