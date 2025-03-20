import { users } from "./constants";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Invoice from "./components/Invoice";
import InvoiceUpload from "./components/InvoiceUpload";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(users[0].name);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar username={username} setUsername={setUsername} users={users} />
        <div className="ml-64 w-[85vw]">
          <Routes>
            <Route
              path="/upload"
              element={
                <InvoiceUpload
                  users={users}
                  username={username}
                  setUsername={setUsername}
                />
              }
            />
            <Route
              path="/invoices"
              element={
                <Invoice
                  users={users}
                  username={username}
                  setUsername={setUsername}
                />
              }
            />
            <Route path="/" element={<Navigate to="/upload" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
