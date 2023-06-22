import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import QrReader from "./pages/QrReader";

const App = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Homepage />} />

                <Route path="/qr-reader" element={<QrReader />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
