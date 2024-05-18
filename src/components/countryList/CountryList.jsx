import Spinner from "../spinner/Spinner";
import styles from "./countryList.module.css";
import Message from "../message/Message";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return <ul className={styles.countryList}></ul>;
};

export default CountryList;
