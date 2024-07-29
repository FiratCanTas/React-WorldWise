import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../../hooks/useUrlPosition";
import Spinner from "./../spinner/Spinner";
import Message from "./../message/Message";
import Flag from "./../flag/Flag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";

const Form = () => {
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [emoji, setEmoji] = useState(null);
  const [geocodingError, setGeocodingError] = useState("");
  const { createCity, isLoading } = useCities();

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(
          `${import.meta.env.VITE_CITIES_URL}/?latitude=${lat}&longitude=${lng}`
        );

        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        }

        setGeocodingError("");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newCity = {
      cityName,
      emoji,
      country,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createCity(newCity);
    navigate("/app/cities");
  };

  return (
    <form
      className={`${styles.form} ${isLoading && styles.loading}`}
      onSubmit={handleFormSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji && <Flag emoji={emoji} />}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {country}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
};

export default Form;
