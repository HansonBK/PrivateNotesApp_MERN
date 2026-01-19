import React from "react";

import {Routes, Route} from "react-router";
import "./index.css";

import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";



function App() {
  return (
  
    
    <div >
      
     <Routes>       
        <Route path="/" element= {<HomePage />}/>
        <Route path="/register" element= {<RegisterPage />}/> 
        <Route path="/login" element= {<LoginPage />}/>
             
      </Routes>

    </div>
    
  );
}

export default App;