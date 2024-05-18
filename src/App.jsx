import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import Product from "./pages/product/Product";
import Pricing from "./pages/pricing/Pricing";
import PageNotFound from "./pages/notFound/PageNotFound";
import Login from "./pages/login/Login";
import AppLayout from "./pages/appLayout/AppLayout";
import CityList from "./components/cityList/CityList";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
import CountryList from "./components/countryList/CountryList";

const App = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log("data", data);
        setCities(data);
      } catch (error) {
        alert("There was an error loading data...");
        console.log("error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
