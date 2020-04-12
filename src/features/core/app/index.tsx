import { Link, Route, Routes } from "react-router-dom";
import ChordsFinder from "../../chord-finder/pages/Index";
import React, { FC } from "react";
import css from "./index.module.css";

const App: FC = () => {
  return (
    <div className={css.main}>
      <nav className={css.nav}>
        <Link className={css.sectionLink} to="/chords-finder">
          Chords Finder
        </Link>
        <Link className={css.sectionLink} to="/sight-reading">
          Sight Reading
        </Link>
      </nav>
      <div className={css.container}>
        <Routes>
          <Route element={<ChordsFinder />} path="/chords-finder/*" />
        </Routes>
      </div>
    </div>
  );
};

export default App;
