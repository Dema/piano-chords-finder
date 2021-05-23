import * as css from "./index.module.css";
import { Link } from "react-router-dom";
import React, { FC } from "react";

const MainTemplate: FC = ({ children }) => {
  return (
    <div className={css.main}>
      <nav className={css.nav}>
        <Link className={css.sectionLink} to="/chords-finder">
          Chords Finder
        </Link>
        {/*         <Link  className={css.sectionLink} to="/sight-reading">
          Sight Reading
        </Link>
 */}
      </nav>
      <div className={css.container}>{children}</div>
    </div>
  );
};

export default MainTemplate;
