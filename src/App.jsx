import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityList from "./components/cityList/CityList";
import CountryList from "./components/countryList/CountryList";
import City from "./components/city/City";
import Form from "./components/form/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/protectedRoute/ProtectedRoute";
import SpinnerFullPage from "./components/spinnerFullPage/SpinnerFullPage";
import { lazy, Suspense } from "react";

const Homepage = lazy(() => import("./pages/home/Homepage"));
const Product = lazy(() => import("./pages/product/Product"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));
const Login = lazy(() => import("./pages/login/Login"));
const AppLayout = lazy(() => import("./pages/appLayout/AppLayout"));
const PageNotFound = lazy(() => import("./pages/notFound/PageNotFound"));

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
