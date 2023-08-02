import React from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";
import { Outlet, Link } from "react-router-dom";

function App() {

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <Link to="/tracks" className={styles.active}>
                Tracks
              </Link>
            </li>
            <li>
              <Link to="/playlist">Playlists</Link>
            </li>
          </ul>
        </nav>
      </main>

      <Outlet />
    </>
  );
}

export default App;
