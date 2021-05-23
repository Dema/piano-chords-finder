import "./index.css";
import { Route, Switch } from "react-router-dom";
import EnableMidiProvider from "../features/core/enable-midi-provider";
import React, { FC, Suspense, lazy } from "react";

const ChordsFinder = lazy(() => import("../pages/chord-finder"));

const App: FC = () => {
  return (
    <Suspense fallback={null}>
      <EnableMidiProvider>
        <Switch>
          <Route path="/chords-finder">
            <ChordsFinder />
          </Route>
        </Switch>
      </EnableMidiProvider>
    </Suspense>
  );
};

export default App;
