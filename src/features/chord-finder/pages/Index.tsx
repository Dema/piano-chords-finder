import "react-piano/dist/styles.css";
import { ControlledPiano } from "react-piano";
import { detect } from "@tonaljs/chord-detect";
import { midiToNoteName } from "@tonaljs/midi";
import ChordsList from "../molecules/ChordsList";
import DeviceSelection from "../molecules/DeviceSelection";
import React, { useEffect, useState } from "react";
import WebMidi, {
  IEventNote,
  Input,
  InputEventNoteoff,
  InputEventNoteon,
  WebMidiEventConnected,
  WebMidiEventDisconnected,
} from "webmidi";
import cn from "classnames";
import css from "./index.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const PIANO_KEY_WIDTH_PX = 40;
const MIDDLE_C_MIDI_NUM = 60;
const LOWEST_NOTE = 21;
const HIGHEST_NOTE = 127;

function ChordsFinder() {
  const [midiEnabled, setMidiEnabled] = useState(false);
  const [noteRange, setNoteRange] = useState<{ first: number; last: number }>({
    first: 60,
    last: 62,
  });
  const [selectedInputDevice, setSelectedInputDevice] = useState<Input | null>(
    null
  );
  const [availableDevices, setAvailableDevices] = useState<Input[]>([]);

  const [notesPlaying, setNotesPlaying] = useState<IEventNote[]>([]);

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

  useEffect(() => {
    if (selectedInputDevice == null && availableDevices.length > 0) {
      setSelectedInputDevice(availableDevices[0]);
    }
  }, [availableDevices, selectedInputDevice]);

  useEffect(() => {
    const connectedListener = (e: WebMidiEventConnected) => {
      if (e.port.type === "input") {
        setAvailableDevices((devices) =>
          devices.filter((d) => d.id !== e.port.id).concat(e.port as Input)
        );
      }
    };
    const disconnectedListener = (e: WebMidiEventDisconnected) => {
      if (e.port.type === "input") {
        setAvailableDevices((devices) =>
          devices.filter((d) => d.id !== e.port.id)
        );
      }
    };

    WebMidi.enable((err) => {
      if (!err) {
        setMidiEnabled(true);
        WebMidi.addListener("connected", connectedListener);
        WebMidi.addListener("disconnected", disconnectedListener);
      } else {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
    return () => {
      if (WebMidi.enabled) {
        WebMidi.removeListener("connected", connectedListener);
        WebMidi.removeListener("disconnected", disconnectedListener);
      }
      WebMidi.disable();
    };
  }, [selectedInputDevice]);

  useEffect(() => {
    if (midiEnabled && selectedInputDevice) {
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
      selectedInputDevice.addListener("noteon", "all", noteOnListener);
      selectedInputDevice.addListener("noteoff", "all", noteOffListener);
      return () => {
        selectedInputDevice.removeListener("noteon", "all", noteOnListener);
        selectedInputDevice.removeListener("noteoff", "all", noteOffListener);
      };
    }
    return undefined;
  }, [selectedInputDevice, midiEnabled]);

  const chords = detect(notesPlaying.map((n) => n.name));

  return (
    <div className={css.container}>
      <DeviceSelection
        items={availableDevices}
        onChange={setSelectedInputDevice}
        value={selectedInputDevice}
      />
      <div className={css.pianoConainer}>
        <ControlledPiano
          key={`${noteRange.first}:${noteRange.last}`}
          activeNotes={notesPlaying.map((n) => n.number)}
          noteRange={noteRange}
          onPlayNoteInput={noop}
          onStopNoteInput={noop}
          playNote={noop}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderNoteLabel={({ midiNumber, isAccidental }: any) => (
            <div className={cn(css.noteName, { [css.sharps]: isAccidental })}>
              {midiToNoteName(midiNumber, {
                pitchClass: isAccidental,
                sharps: true,
              })}
            </div>
          )}
          stopNote={noop}
        />
      </div>
      <div className={css.notes}>
        Notes: {notesPlaying.map((n) => n.name + n.octave).join(", ")}
      </div>
      <ChordsList chords={chords} />
    </div>
  );
}

export default ChordsFinder;
