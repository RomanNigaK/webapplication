import React, { useState } from "react";
import style from "./Input.module.css";
export default function Input({
  placeholder,
  name,
  register,
  data = "",
  type = "text",
}) {
  const [value, setvalue] = useState(data);

  return (
    <>
      <div className={style.wrapper}>
        {register ? (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            {...register(name)}
            onChange={(e) => setvalue(e.target.value)}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={(e) => setvalue(e.target.value)}
          />
        )}
      </div>
    </>
  );
}
