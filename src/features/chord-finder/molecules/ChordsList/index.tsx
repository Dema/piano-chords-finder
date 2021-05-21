import * as css from "./index.module.css";
import { get } from "@tonaljs/chord";
import React, { FC } from "react";

type Props = { chords: string[] };
const ChordsList: FC<Props> = ({ chords }) => {
  return (
    <div className={css.chordsContainer}>
      Chords:
      <ul className={css.chordsList}>
        {chords.map((s) => {
          const chord = get(s);
          return (
            <li key={s} className={css.chord}>
              <span>
                {s}
                {chord.aliases.length > 0 ? (
                  <>
                    , also known as:{" "}
                    {chord.aliases
                      .map((a) => (chord.tonic ?? "") + a)
                      .join(", ")}
                  </>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChordsList;
