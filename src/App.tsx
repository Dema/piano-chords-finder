import "react-piano/dist/styles.css";
import cn from "classnames";
import { detect } from "@tonaljs/chord-detect";
import { get } from "@tonaljs/chord";
import { midiToNoteName } from "@tonaljs/midi";
import React, { useEffect, useState } from "react";
import { ControlledPiano, MidiNumbers } from "react-piano";
import WebMidi, {
  Input,
  InputEventNoteon,
  InputEventNoteoff,
  IEventNote,
} from "webmidi";
import css from "./App.module.css";

const firstNote = MidiNumbers.fromNote("a0");
const lastNote = MidiNumbers.fromNote("g9");
const noteRange = { first: firstNote, last: lastNote };

const noop = () => {};

function App() {
  const [midiEnabled, setMidiEnabled] = useState(false);
  const [selectedInputDevice, setSelectedInputDevice] = useState<Input | null>(
    null
  );
  const [notesPlaying, setNotesPlaying] = useState<IEventNote[]>([]);

  useEffect(() => {
    WebMidi.enable((err) => {
      if (!err) {
        setMidiEnabled(true);
        setSelectedInputDevice(WebMidi.inputs[0]);
      } else {
        console.log(err);
      }
    });
    return () => {
      WebMidi.disable();
    };
  }, []);

  useEffect(() => {
    if (midiEnabled) {
      const noteOnListener = (e: InputEventNoteon) => {
        setNotesPlaying((notes) =>
          notes.concat(e.note).sort((a, b) => a.number - b.number)
        );
      };
      const noteOffListener = (e: InputEventNoteoff) => {
        setNotesPlaying((notes) =>
          notes.filter((n) => n.number !== e.note.number)
        );
      };
      selectedInputDevice?.addListener("noteon", "all", noteOnListener);
      selectedInputDevice?.addListener("noteoff", "all", noteOffListener);
      return () => {
        selectedInputDevice?.removeListener("noteon", "all", noteOnListener);
        selectedInputDevice?.removeListener("noteoff", "all", noteOffListener);
      };
    }
    return () => {};
  }, [selectedInputDevice, midiEnabled]);

  const possibleChords = detect(notesPlaying.map((n) => n.name));

  return (
    <div className={css.App}>
      <div className={css.inputDevice}>
        {selectedInputDevice?.name ?? "Not Connected"}
      </div>

      <div className={css.pianoConainer}>
        <ControlledPiano
          noteRange={noteRange}
          onStopNoteInput={noop}
          onPlayNoteInput={noop}
          activeNotes={notesPlaying.map((n) => n.number)}
          playNote={noop}
          renderNoteLabel={({ midiNumber, isAccidental }: any) => (
            <span className={cn(css.noteName, { [css.sharps]: isAccidental })}>
              {midiToNoteName(midiNumber, {
                pitchClass: isAccidental,
                sharps: true,
              })}
            </span>
          )}
          stopNote={noop}
        />
      </div>
      <div className={css.notes}>
        Notes: {notesPlaying.map((n) => n.name + n.octave).join(", ")}
        {possibleChords.length > 0 && (
          <>
            <div className={css.chordsContainer}>
              Chords:
              <ul className={css.possibleChords}>
                {possibleChords.map((s) => {
                  const chord = get(s);
                  return (
                    <li key={s} className={css.chord}>
                      <span>
                        {s}
                        {chord?.aliases.length > 0 ? (
                          <>
                            , also known as:{" "}
                            {chord?.aliases
                              .map((a) => (chord?.tonic ?? "") + a)
                              .join(", ")}
                          </>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
