import React, { useEffect, useState } from "react";
import styles from "./profile-edit.module.css";
import strokeImg from "../../images/stroke.png";
import ymaps from "ymaps";
import { DataPicker } from "../../components/datapicker/datapicker";
import getUserProfile from "../../services/utils/api/get-user-profile";

export const theme = ["серьезный", "романтический", "дерзкий"];

export const ProfileEdit = () => {
  // const user = JSON.parse(localStorage.getItem('accessToken')).avatar_id;

  const [avatarDirty, setAvatarDirty] = useState(false);
  const [birthDirty, setBirthDirty] = useState(false);
  const [cityDirty, setCityDirty] = useState(false);
  const [avatarValidMessage, setAvatarValidMessage] = useState(
    "Поле обязательно для заполнения"
  );
  const [birthValidMessage, setBirthValidMessage] = useState(
    "Поле обязательно для заполнения"
  );
  const [cityValidMessage, setCityValidMessage] = useState(
    "Поле обязательно для заполнения"
  );
  const [formValid, setFormValid] = useState(false);

  const [state, setState] = useState({
    avatar: "",
    birthday: undefined,
    city: "",
    telegram: "",
    github: "",
    template: "",
    slogan: "",
    dosugFile: "",
    dosugText: "",
    familyFile: "",
    familyText: "",
    jobText: "",
    motivationText: "",
  });

  useEffect(() => {
    avatarValidMessage || birthValidMessage || cityValidMessage
      ? setFormValid(false)
      : setFormValid(true);
  }, [avatarValidMessage, birthValidMessage, cityValidMessage]);


  

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setState({ ...state, avatar: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  ymaps.load("https://api-maps.yandex.ru/2.1/?lang=en_US").then((maps) => {
    const suggestView1 = new maps.SuggestView("city-input");
  });

  const cityHandler = (e) => {
    setState({ ...state, city: e.target.value });
    if (e.target.value) {
      setCityValidMessage("");
    } else setCityValidMessage("Поле обязательно для заполнения");
  };
  const birthHandler = (e) => {
    setState({ ...state, birthday: e.target.value });
    if (e.target.value) {
      setBirthValidMessage("");
    } else setBirthValidMessage("Поле обязательно для заполнения");
  };
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "avatar":
        setAvatarDirty(true);
        break;
      case "birthday":
        setBirthDirty(true);
        break;
      case "city":
        setCityDirty(true);
        break;
      default:
        setAvatarDirty(false);
        setBirthDirty(false);
        setCityDirty(false);
    }
  };

  const handlerFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handlerFormSubmit}
      id="profile-form"
      name="profile-form"
      className={styles.form}
    >
      <fieldset className={styles.inputContainer}>
        <p className={styles.text}>Загрузите фото *</p>
        <p className={styles.note}>(Размер не менее 440x440 пикселей)</p>
        <label htmlFor="upload-photo" className={styles.avatarLabel}>
          <img
            className={styles.avatar}
            style={{ display: state.avatar ? "block" : "none" }}
            src={state.avatar}
            alt="аватар"
          />
          <div className={styles.uploadButton}></div>
          <input
            className={styles.fileInput}
            type="file"
            name="avatar"
            id="upload-photo"
            accept="image/*"
            onChange={imageHandler}
            onBlur={blurHandler}
          />
        </label>
        <label className={styles.input} htmlFor="birthday">
          Дата рождения *
          <DataPicker
            date={state.birthday}
            maxDate={new Date()}
            onDateChange={birthHandler}
            value={state.birthday}
            onBlur={blurHandler}
          />
          {birthDirty && birthValidMessage && (
            <span className={styles.error}>{birthValidMessage}</span>
          )}
        </label>

        <label className={styles.input} htmlFor="city-input">
          Выберите город *
          <input
            type="text"
            id="city-input"
            className={styles.textInput}
            placeholder="@example"
            value={state.city}
            onChange={(e) => cityHandler(e)}
            onBlur={blurHandler}
            name="city"
          />
          {cityDirty && cityValidMessage && (
            <span className={styles.error}>{cityValidMessage}</span>
          )}
        </label>

        <label className={styles.input} htmlFor="tg-input">
          Ник в телеграм
          <input
            type="text"
            id="tg-input"
            className={styles.textInput}
            placeholder="@example"
          />
        </label>

        <label className={styles.input} htmlFor="git-input">
          Ник на гитхабе
          <input
            type="text"
            id="git-input"
            className={styles.textInput}
            placeholder="@example"
          />
        </label>

        <label className={styles.input} htmlFor="character-input">
          Выберите шаблон
          <select id="character-input" className={styles.textInput}>
            <option>серьезный</option>
            <option>дерзкий</option>
            <option>романтичный</option>
          </select>
        </label>

        <label className={styles.input} htmlFor="slogan-input">
          Девиз, цитата
          <textarea
            id="slogan-input"
            maxLength="100"
            className={styles.textarea}
            placeholder="Не более 100 символов"
          ></textarea>
        </label>

        <label className={styles.input} htmlFor="dosug-input">
          Увлечения, досуг, интересы
          <label className={styles.fileUpload}>
            <input
              type="file"
              name="dosugImage"
              id="dosugImage"
              accept="image/*"
              className={styles.fileInput}
            />
            <img src={strokeImg} alt="скрепка" className={styles.stroke} />
            <span className={styles.filesNote}>
              Рекомендуемый размер фото 230x129
            </span>
          </label>
          <textarea
            id="dosug-input"
            maxLength="300"
            className={styles.textarea}
            placeholder="Не более 300 символов"
          ></textarea>
        </label>

        <label className={styles.input} htmlFor="family-input">
          Семья, статус, домашние животные
          <label className={styles.fileUpload}>
            <input
              type="file"
              name="dosugImage"
              id="dosugImage"
              accept="image/*"
              className={styles.fileInput}
            />
            <img src={strokeImg} alt="скрепка" className={styles.stroke} />
            <span className={styles.filesNote}>
              Рекомендуемый размер фото 230x129
            </span>
          </label>
          <textarea
            id="family-input"
            maxLength="300"
            className={styles.textarea}
            placeholder="Не более 300 символов"
          ></textarea>
        </label>

        <label className={styles.input} htmlFor="job-input">
          Из какой сферы пришёл? Кем работаешь?
          <textarea
            id="job-input"
            maxLength="300"
            className={styles.textarea}
            placeholder="Не более 300 символов"
          ></textarea>
        </label>

        <label className={styles.input} htmlFor="motivation-input">
          Почему решил учиться на веб-разработчика?
          <textarea
            id="motivation-input"
            maxLength="300"
            className={styles.textarea}
            placeholder="Не более 300 символов"
          ></textarea>
        </label>
      </fieldset>
      <fieldset className={styles.submitContainer}>
        <p>Поля, отмеченные звездочкой, обязательны для заполнения</p>
        <button disabled={!formValid} type="submit" className={styles.profileSaveButton}>
          Сохранить
        </button>
      </fieldset>
    </form>
  );
};
