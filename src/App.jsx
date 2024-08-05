import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import Product from "./pages/product/Product";
import Pricing from "./pages/pricing/Pricing";
import PageNotFound from "./pages/notFound/PageNotFound";
import Login from "./pages/login/Login";
import AppLayout from "./pages/appLayout/AppLayout";
import CityList from "./components/cityList/CityList";
import CountryList from "./components/countryList/CountryList";
import City from "./components/city/City";
import Form from "./components/form/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
