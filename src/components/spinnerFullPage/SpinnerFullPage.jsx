import Spinner from "../spinner/Spinner";
import styles from "./spinnerFullPage.module.css";

const SpinnerFullPage = () => {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
};

export default SpinnerFullPage;
