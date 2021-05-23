import * as css from "./index.module.css";
import { ControlledPiano } from "react-piano";
import { IEventNote } from "webmidi";
import { midiToNoteName } from "@tonaljs/midi";
import { useCalcNoteRange } from "./use-calc-note-range";
import React, { FC, useMemo } from "react";
import cn from "classnames";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

type Props = { notesPlaying: IEventNote[] };
const Piano: FC<Props> = ({ notesPlaying }) => {
  const activeNotes = useMemo(
    () => notesPlaying.map((n) => n.number),
    [notesPlaying]
  );
  const noteRange = useCalcNoteRange();

  return (
    <div className={css.pianoContainer}>
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
  );
};

export default Piano;

const renderNoteLabel = ({
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
);
