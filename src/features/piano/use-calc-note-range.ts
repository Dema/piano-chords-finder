import { useEffect, useState } from "react";

const PIANO_KEY_WIDTH_PX = 40;
const MIDDLE_C_MIDI_NUM = 60;
const LOWEST_NOTE = 21;
const HIGHEST_NOTE = 127;

export function useCalcNoteRange() {
  const [noteRange, setNoteRange] = useState<{
    first: number;
    last: number;
  }>({
    first: 60,
    last: 62,
  });
  useEffect(() => {
    const listener = () => {
      const windowWidth = window.innerWidth;
      let pianoKeys = Math.floor(windowWidth / PIANO_KEY_WIDTH_PX);
      if (pianoKeys % 2 === 1) {
        pianoKeys++;
      }

      setNoteRange({
        first: Math.max(LOWEST_NOTE, MIDDLE_C_MIDI_NUM - pianoKeys),
        last: Math.min(HIGHEST_NOTE, MIDDLE_C_MIDI_NUM + Math.floor(pianoKeys)),
      });
    };
    listener();
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  return noteRange;
}
