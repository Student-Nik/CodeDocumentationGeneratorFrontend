import LandingPage from "./components/landingPage";
import { Routes, Route } from "react-router-dom";
import PdfDocumentationPage from "./components/PdfDocumentationPage";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/codedocumentationgenerator" element={<PdfDocumentationPage />} />
  </Routes>
);

export default App;
