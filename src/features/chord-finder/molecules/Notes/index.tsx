import * as css from "./index.module.css";
import ABCjs from "../../../../ui/molecules/ABCjs";
import React, { FC, useMemo } from "react";
import type { IEventNote } from "webmidi";

const MIDI_MAP = [
  "C",
  "^C",
  "D",
  "^D",
  "E",
  "F",
  "^F",
  "G",
  "^G",
  "A",
  "^A",
  "B",
];
const midiToABC = (note: IEventNote) => {
  const octave = (note.number - 12) / 12;
  let suffix = "";
  if (octave < 4) {
    suffix = Array.from({ length: octave })
      .map((a) => ",")
      .join("");
  } else if (octave > 4) {
    suffix = Array.from({ length: octave - 4 })
      .map((a) => "'")
      .join("");
  }
  return MIDI_MAP[note.number % 12] + suffix;
};

type Props = { notes: IEventNote[] };
const Notes: FC<Props> = ({ notes }) => {
  const notation = useMemo(() => {
    const treble = `V:1\n|[${notes.map(midiToABC).join("")}]|`;
    const bass = `V:2 clef=bass\n|[${notes.map(midiToABC).join("")}]|`;
    return ["M:4/4", treble, bass].join("\n");
  }, [notes]);

  return (
    <div className={css.staveWrapper}>
      Notes: {notes.map((n) => `${n.name}${n.octave}`).join(", ")}
      <ABCjs notation={notation} />
    </div>
  );
};

export default Notes;
