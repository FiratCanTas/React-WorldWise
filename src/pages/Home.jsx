import { Link } from "react-router-dom";
import PageNav from "../components/pageNav/PageNav";
import AppNav from "../components/appNav/AppNav";

const Home = () => {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>WorldWise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
};

export default Home;
