import React, {useState, useContext} from "react";
import styles from "./LoginForm.module.css";
import {useHistory} from "react-router";
import {NotificationContext} from "./NotificationContext";

export function LoginForm() {
    const [isRegistrationActive, setIsRegistrationActive] = useState(false);
    const [userData, setUserData] = useState({name: "", password: "", password_check: ""});
    const history = useHistory();
    const setNotification = useContext(NotificationContext);

    async function handleSignUpSubmit(e) {
        e.preventDefault();

        if (userData.password !== userData.password_check) {
            setNotification({type: "error", text: "Пароли должны совпадать", active: true});
            return;
        }

        const response = await fetch("http://medialibrary.local/modules/actions.php?register", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.err) {
            setNotification({type: "error", text: data.message, active: true});
            return;
        }

        setNotification({type: "message", text: data.message, active: true});
        setIsRegistrationActive(false);
    }

    async function handleSignInSubmit(e) {
        e.preventDefault();

        const response = await fetch("http://medialibrary.local/modules/actions.php?login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.err) {
            setNotification({type: "error", text: data.message, active: true});
            return;
        }

        history.push("/dashboard");
    }

    function handleInputChange(e) {
        const target = e.target;
        const userProperty = target.id;
        const value = target.value;

        setUserData(prevState => {
            return {...prevState, [userProperty]: value}
        });
    }

    function isPasswordValid(password) {
        return password.match(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}/g) !== null;
    }

    return (
        <form className={styles.login_form}
              autoComplete={"off"}
              method={"POST"}
        >
            <div className={styles.login_form_group}>
                <input id={"name"}
                       type={"text"}
                       className={styles.login_form_input}
                       onChange={handleInputChange}
                       required/>
                <label className={styles.login_form_label}>Ваш логин</label>
            </div>
            <div className={styles.login_form_group}>
                <input id={"password"}
                       type={"password"}
                       className={styles.login_form_input}
                       onChange={handleInputChange}
                       required/>
                <label className={styles.login_form_label}>Ваш пароль</label>
            </div>
            {isRegistrationActive ? <div className={styles.login_form_group}>
                <input id={"password_check"}
                       type={"password"}
                       className={styles.login_form_input}
                       onChange={handleInputChange}
                       required/>
                <label className={styles.login_form_label}>Повторите пароль</label>
            </div> : null}
            <button className={styles.login_form_submit_button}
                    type={"button"}
                    onClick={isRegistrationActive ? handleSignUpSubmit : handleSignInSubmit}>
                {isRegistrationActive ? "Зарегистрироваться" : "Войти"}
            </button>
            <p className={styles.login_form_registration_link}
               onClick={() => setIsRegistrationActive(!isRegistrationActive)}>
                {isRegistrationActive ? "Войти в сущетсвующую уч. запись" : "Зарегистрироваться"}
            </p>
        </form>
    )
}