import "./index.css";
import * as css from "./index.module.css";
import { Link, Route, Switch } from "react-router-dom";
import React, { FC, Suspense, lazy } from "react";

const ChordsFinder = lazy(
  () => import("../features/chord-finder/pages/chord-finder")
);

const App: FC = () => {
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
      <div className={css.container}>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/chords-finder">
              <ChordsFinder />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
