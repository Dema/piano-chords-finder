import "react-piano/dist/styles.css";
import * as css from "./index.module.css";
import { ControlledPiano } from "react-piano";
import { detect } from "@tonaljs/chord-detect";
import { midiToNoteName } from "@tonaljs/midi";
import ChordsList from "../molecules/ChordsList";
import DeviceSelection from "../molecules/DeviceSelection";
import Notes from "../molecules/Notes";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import WebMidi, {
  IEventNote,
  Input,
  InputEventNoteoff,
  InputEventNoteon,
  WebMidiEventConnected,
  WebMidiEventDisconnected,
} from "webmidi";
import cn from "classnames";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const PIANO_KEY_WIDTH_PX = 40;
const MIDDLE_C_MIDI_NUM = 60;
const LOWEST_NOTE = 21;
const HIGHEST_NOTE = 127;

const ChordFinder: FC = () => {
  const [midiEnabled, setMidiEnabled] = useState(false);
  const [noteRange, setNoteRange] = useState<{ first: number; last: number }>({
    first: 60,
    last: 62,
  });
  const [selectedInputDevice, setSelectedInputDevice] =
    useState<Input | null>(null);
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
        const device = e.port;
        setAvailableDevices((devices) =>
          devices.filter((d) => d.id !== e.port.id).concat(device)
        );
        setSelectedInputDevice(device);
      }
    };
    const disconnectedListener = (e: WebMidiEventDisconnected) => {
      if (e.port.type === "input") {
        setAvailableDevices((devices) =>
          devices.filter((d) => d.id !== e.port.id)
        );
        setSelectedInputDevice(null);
      }
    };

    WebMidi.enable((err) => {
      if (!err) {
        setMidiEnabled(true);
        if (WebMidi.enabled) {
          WebMidi.addListener("connected", connectedListener);
          WebMidi.addListener("disconnected", disconnectedListener);
        }
      } else {
        // eslint-disable-next-line no-console
        console.log("ZZ", err);
      }
    }, true);
    return () => {
      if (WebMidi.enabled) {
        WebMidi.removeListener("connected", connectedListener);
        WebMidi.removeListener("disconnected", disconnectedListener);
      }
      WebMidi.disable();
    };
  }, []);

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
  const renderNoteLabel = useCallback(
    ({
      midiNumber,
      isAccidental,
    }: {
      // eslint-disable-next-line react/no-unused-prop-types
      midiNumber: number;
      // eslint-disable-next-line react/no-unused-prop-types
      isAccidental: boolean;
    }) => (
      <div className={cn(css.noteName, { [css.sharps]: isAccidental })}>
        {midiToNoteName(midiNumber, {
          pitchClass: isAccidental,
          sharps: true,
        })}
      </div>
    ),
    []
  );

  const activeNotes = useMemo(
    () => notesPlaying.map((n) => n.number),
    [notesPlaying]
  );
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
          activeNotes={activeNotes}
          noteRange={noteRange}
          onPlayNoteInput={noop}
          onStopNoteInput={noop}
          playNote={noop}
          renderNoteLabel={renderNoteLabel}
          stopNote={noop}
        />
      </div>

      <div className={css.noteDescription}>
        {<Notes notes={notesPlaying} />}
        <ChordsList chords={chords} />
      </div>
    </div>
  );
};

export default ChordFinder;
