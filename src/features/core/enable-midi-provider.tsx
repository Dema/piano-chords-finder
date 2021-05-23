import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import WebMidi from "webmidi";

function useEnableMidi() {
  const [midiEnabled, setMidiEnabled] = useState(false);

  useEffect(() => {
    WebMidi.enable((err) => {
      if (!err) {
        setMidiEnabled(true);
      } else {
        setMidiEnabled(false);
        // eslint-disable-next-line no-console
        console.log("ZZ", err);
      }
    }, true);
    return () => {
      setMidiEnabled(false);
      WebMidi.disable();
    };
  }, []);
  return midiEnabled;
}

export const Context = createContext<boolean>(false);

export function useIsMidiEnabled() {
  return useContext(Context);
}

const EnableMidiProvider: FC = ({ children }) => {
  const midiEnabled = useEnableMidi();
  return <Context.Provider value={midiEnabled}>{children}</Context.Provider>;
};

export default EnableMidiProvider;
