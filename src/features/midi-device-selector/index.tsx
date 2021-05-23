import { Input } from "webmidi";
import { useEnumerateAvailableDevices } from "../../shared/api/use-enumerate-available-devices";
import DeviceSelection from "../../entities/DeviceSelection";
import React, { FC, useEffect } from "react";

type Props = {
  value: Input | undefined;
  onChange: (value: Input | undefined) => void;
};
const MidiDeviceSelector: FC<Props> = ({ value, onChange }) => {
  const availableDevices = useEnumerateAvailableDevices();

  useEffect(() => {
    if (value == null && availableDevices.length > 0) {
      onChange(availableDevices[0]);
    }
  }, [availableDevices, onChange, value]);

  useEffect(() => {
    if (value != null && !availableDevices.includes(value)) {
      if (availableDevices.length > 0) {
        onChange(availableDevices[0]);
      } else {
        onChange(undefined);
      }
    }
  }, [availableDevices, onChange, value]);

  return (
    <DeviceSelection
      items={availableDevices}
      onChange={onChange}
      value={value}
    />
  );
};

export default MidiDeviceSelector;
