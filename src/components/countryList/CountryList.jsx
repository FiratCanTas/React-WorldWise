import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./countryList.module.css";
import CountryItem from "./../countryItem/CountryItem";
import { useCities } from "../../contexts/CitiesContext";

const CountryList = () => {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce((array, city) => {
    if (!array.map((item) => item.country).includes(city.country)) {
      return [...array, { country: city.country, emoji: city.emoji }];
    } else {
      return array;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountryList;
