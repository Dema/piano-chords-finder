import { Input } from "webmidi";

import React, { FC, SyntheticEvent, useCallback } from "react";
import css from "./index.module.css";

type Props = {
  items: Input[];
  value: Input | null;
  onChange: (value: Input) => void;
};
const DeviceSelection: FC<Props> = ({ value, items, onChange }) => {
  const selected = value ? items.indexOf(value) : undefined;
  const handleChange = useCallback(
    (e: SyntheticEvent<HTMLSelectElement>) => {
      onChange(items[Number(e.currentTarget.value)]);
    },
    [items, onChange]
  );

  console.log("items", items);
  return (
    <div className={css.inputDevice}>
      <span>
        Connected device:
        <br />
        {value?.name ?? "Not Connected"}
      </span>
      <select className={css.select1} onBlur={handleChange} value={selected}>
        {items.map((item, idx) => (
          <option key={idx} value={idx}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeviceSelection;
