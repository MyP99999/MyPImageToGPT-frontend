import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/useAuth";
import TokensProvider from "./context/useTokens";
import HistoryProvider from "./context/useHistory";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <TokensProvider>
        <HistoryProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </HistoryProvider>
      </TokensProvider>
    </AuthProvider>
  </BrowserRouter>
);
