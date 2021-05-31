declare module "react-piano" {
  import { Component, ReactNode } from "react";

  interface Keys {
    natural: string;
    flat: string;
    sharp: string;
  }

  export const KeyboardShortcuts: {
    BOTTOM_ROW: Keys[];
    HOME_ROW: Keys[];
    QWERTY_ROW: Keys[];
  };
  interface NoteRange {
    first: number;
    last: number;
  }
  export interface ControlledPianoProps {
    noteRange: NoteRange;
    activeNotes?: number[];
    onPlayNoteInput: (midiNumber: number) => void;
    onStopNoteInput: (midiNumber: number) => void;
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    renderNoteLabel: (params: {
      keyboardShortcut: string;
      midiNumber: number;
      isActive: boolean;
      isAccidental: boolean;
    }) => ReactNode;
    className?: string;
    disabled?: boolean;
    width?: number;
    keyWidthToHeight?: number;
    keyboardShortcuts?: Array<{ key: string; midiNumber: number }>;
  }

  export class ControlledPiano extends Component<ControlledPianoProps> {}
  export class Piano extends Component<ControlledPianoProps> {}

  export interface KeyboardProps {
    noteRange: NoteRange;
    activeNotes?: number[];
    onPlayNoteInput: (midiNumber: number) => void;
    onStopNoteInput: (midiNumber: number) => void;
    renderNoteLabel: (params: {
      keyboardShortcut: string;
      midiNumber: number;
      isActive: boolean;
      isAccidental: boolean;
    }) => ReactNode;
    keyWidthToHeight?: number;
    className?: string;
    disabled?: boolean;
    gliss?: boolean;
    useTouchEvents?: boolean;
    /**
     * If width is not provided, must have fixed width and height in parent container
     * */
    width?: number;
  }
  export class Keyboard extends Component<KeyboardProps> {}

  const MidiNumbers: {
    /**
     * Converts string notes in scientific pitch notation to a MIDI number, or null.
     *
     * Example: "c#0" => 13, "eb5" => 75, "abc" => null
     *
     * References:
     * - http://www.flutopedia.com/octave_notation.htm
     * - https://github.com/danigb/tonal/blob/master/packages/note/index.js
     */
    fromNote: (note: string) => number;
    /**
     * Returns an object containing various attributes for a given MIDI number.
     * Throws error for invalid midiNumbers.
     */

    getAttributes: (note: number) => {
      note: string;
      pitchName: string;
      octave: number;
      midiNumber: number;
      isAccidental: boolean;
    };
    MIN_MIDI_NUMBER: number;
    MAX_MIDI_NUMBER: number;
    NATURAL_MIDI_NUMBERS: number[];
  };
}
