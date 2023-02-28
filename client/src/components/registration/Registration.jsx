import React, { useEffect, useState } from "react";
import Btn from "../common/btn/Btn";
import Input from "../common/input/Input";
import style from "./Registration.module.css";
import man from "./svg/man.svg";
import girl from "./svg/girl.svg";

import { useForm } from "react-hook-form";
import Submit from "../common/submit/Submit";
import { useHttp } from "../../hooks/http.hook";
import { useError } from "../../hooks/error.hook";
import { useUpload } from "../../hooks/useUpload";
import BtnEdit from "../common/btnEdit/BtnEdit";
import InputFileLoad from "../common/inputFileLoad/InputFileLoad";
import Date from "../common/date/Date";
import { useNavigate } from "react-router-dom";
export default function Registration() {
  const { loading, error, clearError, request } = useHttp();
  const [sex, setsex] = useState("man");
  const [birthday, setbirthday] = useState("");
  const textError = useError();
  const { register, handleSubmit } = useForm();
  const { loadFile, image, fileName } = useUpload();
  const navigate = useNavigate();
  const uploadFile = async (file) => {
    try {
      await loadFile(file, "avatar", "/api/upload/file");
    } catch (error) {
      textError(error.message);
    }
  };

  const regHandler = async (body) => {
    try {
      const data = await request("/api/auth/reg", "POST", { ...body });
      textError(data.message);
      if (data.status === 201) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {}
  };
  const onSubmit = async (data) => {
    data.sex = sex;
    data.image = fileName;
    data.birthday = birthday;
    regHandler(data);
  };

  useEffect(() => {
    textError(error);
    clearError();
  }, [error, textError, clearError]);

  return (
    <div className={style.wrapper}>
      <div className={style.registration}>
        <div className={style.header}>Создание аккаунта</div>
        <div className={style.data}>
          <div className={style.inputs}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Имя" name="name" register={register} />
              <Input placeholder="Логин" name="login" register={register} />
              <Input
                placeholder="Пароль"
                name="password"
                register={register}
                type="password"
              />
              <Date
                placeholder="Дата рождения"
                name="birthday"
                setbirthday={setbirthday}
              />
              <Input placeholder="Email" name="email" register={register} />
              <Submit id="submitForm" />
            </form>
          </div>
          <div className={style.pfoto}>
            <div className={style.pfotoProfile}>
              <div className={style.edit}>
                <label htmlFor="uploadFile">
                  <BtnEdit />
                </label>
              </div>
              {image ? <img src={image.path} alt="фотгорафия профиля" /> : null}
            </div>

            <InputFileLoad uploadFile={uploadFile} htmlid="uploadFile" />

            <div className={style.sex}>
              <img
                src={man}
                alt="man"
                onClick={() => setsex("man")}
                className={sex === "man" ? style.activeSex : null}
              />
              <img
                src={girl}
                alt="girl"
                onClick={() => setsex("girl")}
                className={sex === "girl" ? style.activeSex : null}
              />
            </div>
          </div>
        </div>
        <div className={style.wrapperBtn}>
          <label htmlFor={!loading ? "submitForm" : null}>
            <Btn text="Регистрация" loading={loading} />
          </label>
        </div>
      </div>
    </div>
  );
}
