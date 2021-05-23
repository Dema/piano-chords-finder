/* eslint-disable jsx-a11y/no-onchange */
import * as css from "./index.module.css";
import React, { FC, SyntheticEvent, useCallback } from "react";
import type { Input } from "webmidi";

type Props = {
  items: Input[];
  value: Input | undefined;
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

  return (
    <div className={css.inputDevice}>
      <span>
        Connected device:
        <br />
        {value?.name ?? "Not Connected"}
      </span>
      <select className={css.select1} onChange={handleChange} value={selected}>
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
