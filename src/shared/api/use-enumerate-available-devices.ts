import { useEffect, useState } from "react";
import { useIsMidiEnabled } from "../../features/core/enable-midi-provider";
import WebMidi, {
  Input,
  WebMidiEventConnected,
  WebMidiEventDisconnected,
} from "webmidi";

export function useEnumerateAvailableDevices() {
  const midiEnabled = useIsMidiEnabled();
  const [availableDevices, setAvailableDevices] = useState<Input[]>([]);
  useEffect(() => {
    const connectedListener = (e: WebMidiEventConnected) => {
      if (e.port.type === "input") {
        const device = e.port;
        setAvailableDevices((devices) =>
          devices.filter((d) => d.id !== e.port.id).concat(device)
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

    if (midiEnabled) {
      setAvailableDevices([...WebMidi.inputs.values()]);
      WebMidi.addListener("connected", connectedListener);
      WebMidi.addListener("disconnected", disconnectedListener);
    }
    return () => {
      // Just in case it is too late
      if (WebMidi.enabled) {
        WebMidi.removeListener("connected", connectedListener);
        WebMidi.removeListener("disconnected", disconnectedListener);
      }
      WebMidi.disable();
    };
  }, [midiEnabled]);
  return availableDevices;
}
