import * as css from "./index.module.css";
import { v4 as uuid } from "uuid";
import React, { FC, useEffect, useState } from "react";
import abc from "abcjs";

type Props = { notation: string };
const ABCjs: FC<Props> = ({ notation }) => {
  const [id] = useState(uuid());

  useEffect(() => {
    abc.renderAbc(id, notation);
  }, [id, notation]);

  return <div className={css.wrapper} id={id} />;
};

export default ABCjs;
