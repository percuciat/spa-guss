import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { LoginPage } from "@/pages/login/LoginPage";
import { ListingPage } from "@/pages/listing/ListingPage";
import { RoundPage } from "@/pages/round/RoundPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/round/:id" element={<RoundPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/listing" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
