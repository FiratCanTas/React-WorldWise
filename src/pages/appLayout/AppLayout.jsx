import Map from "../../components/map/Map";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./appLayout.module.css";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
