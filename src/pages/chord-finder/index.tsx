import "react-piano/dist/styles.css";
import * as css from "./index.module.css";
import { Input } from "webmidi";
import { useDetectNotesPlaying } from "../../shared/api/use-detect-notes-playing";
import ChordsList from "../../entities/ChordsList";
import MidiDeviceSelector from "../../features/midi-device-selector";
import Notes from "../../ui/molecules/Notes";
import Piano from "../../features/piano";
import React, { FC, useState } from "react";

const ChordFinder: FC = () => {
  const [selectedInputDevice, setSelectedInputDevice] =
    useState<Input | undefined>(undefined);

  const notesPlaying = useDetectNotesPlaying(selectedInputDevice);

  return (
    <div className={css.container}>
      <MidiDeviceSelector
        onChange={setSelectedInputDevice}
        value={selectedInputDevice}
      />
      <Piano notesPlaying={notesPlaying} />
      <div className={css.noteDescription}>
        <Notes notes={notesPlaying} />
        <ChordsList notes={notesPlaying} />
      </div>
    </div>
  );
};

export default ChordFinder;
