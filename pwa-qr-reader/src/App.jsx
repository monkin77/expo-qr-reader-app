import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import QrReader from "./pages/QrReader";
import QrReader2 from "./pages/QrReader2";

const App = () => {
    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#25292e",
                    zIndex: -1,
                }}
            />

            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Homepage />} />

                    <Route path="/qr-reader" element={<QrReader />} />

                    <Route path="/qr-reader2" element={<QrReader2 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
