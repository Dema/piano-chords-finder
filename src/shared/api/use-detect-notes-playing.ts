import {
  IEventNote,
  Input,
  InputEventNoteoff,
  InputEventNoteon,
} from "webmidi";
import { useEffect, useState } from "react";
import { useIsMidiEnabled } from "../../features/core/enable-midi-provider";

export function useDetectNotesPlaying(selectedInputDevice: Input | undefined) {
  const [notesPlaying, setNotesPlaying] = useState<IEventNote[]>([]);
  const midiEnabled = useIsMidiEnabled();

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
  }, [midiEnabled, selectedInputDevice]);

  return notesPlaying;
}
