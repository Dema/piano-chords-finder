import React, { ChangeEvent, FC, useCallback } from "react";

const KEYS = [
  "Cb",
  "Gb",
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#",
];

type Props = { value: string; onChange: (v: string) => void };
const KeySelector: FC<Props> = ({ value = "C", onChange }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={handleChange} value={value}>
      {KEYS.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default KeySelector;
