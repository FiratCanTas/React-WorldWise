import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import Product from "./pages/product/Product";
import Pricing from "./pages/pricing/Pricing";
import AppNav from "./components/appNav/AppNav";
import PageNotFound from "./pages/notFound/PageNotFound";
import Login from './pages/login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/app" element={<AppNav />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
