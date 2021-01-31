import styles from "./Settings.module.css";
import React, {useState, useContext} from "react";
import {NotificationContext} from "../Contexts/NotificationContext";

export default function Settings() {
  const [userData, setUserData] = useState({name: "", password: "", new_password: ""});
  const setNotification = useContext(NotificationContext);

  function handleInputChange(e) {
    const target = e.target;
    const userProperty = target.id;
    const value = target.value;

    setUserData(prevState => {
      return {...prevState, [userProperty]: value};
    });
  }

  async function handleUsernameChangeSubmit() {
    const actionURL = `https://medialib.hickar.space/actions.php?updateUsername`;

    const response = await fetch(actionURL, {
      method: "UPDATE",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (data.err) {
      setNotification({type: "error", text: data.data, active: true});
      return;
    }

    setNotification({type: "message", text: data.data, active: true});
  }

  async function handlePasswordChangeSubmit() {
    const actionURL = `${process.env.REACT_APP_HOST_IP_ADDRESS}?updatePassword`;

    const response = await fetch(actionURL, {
      method: "UPDATE",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (data.err) {
      setNotification({type: "error", text: data.data, active: true});
      return;
    }

    setNotification({type: "message", text: data.data, active: true});
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings_group}>
        <div className={styles.settings_group_heading}>
          Изменить никнейм
        </div>
        <input id={"name"}
               type={"text"}
               className={styles.settings_group_input}
               onChange={handleInputChange}
               placeholder={"Введите новый никнейм"}
               required
        />
        <button onClick={handleUsernameChangeSubmit} className={styles.settings_group_button}>
          Изменить
        </button>
      </div>
      <div className={styles.settings_group}>
        <div className={styles.settings_group_heading}>
          Изменить пароль
        </div>
        <input id={"password"}
               type={"password"}
               className={styles.settings_group_input}
               onChange={handleInputChange}
               placeholder={"Введите старый пароль"}
               required
        />
        <input id={"new_password"}
               type={"password"}
               className={styles.settings_group_input}
               onChange={handleInputChange}
               placeholder={"Введите новый пароль"}
               required
        />
        <button onClick={handlePasswordChangeSubmit} className={styles.settings_group_button}>
          Изменить
        </button>
      </div>
    </div>
  );
}
