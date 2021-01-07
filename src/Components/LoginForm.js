import React from "react";
import styles from "./LoginForm.module.css";
import {useState} from "react";

export function LoginForm() {
    const [isRegistrationActive, setIsRegistrationActive] = useState(false);
    const [userData, setUserData] = useState({userName: "", userPassword: "", userPasswordCheck: ""});

    async function handleSignUpSubmit(e) {
        e.preventDefault();
        if (userData.userPassword !== userData.userPasswordCheck) return;

        const response = await fetch("http://medialibrary.local/actions.php?register", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const val = response.json();
        console.log("Response: " + await Promise.resolve(val));
    }

    function handleSignInSubmit(e) {
        e.preventDefault();
        return fetch("http://medialibrary.local/actions.php?login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function handleInputChange(e) {
        const target = e.target;
        const userProperty = target.id;
        const value = target.value;

        setUserData(prevState => {
            return {...prevState, [userProperty]: value}
        });
    }

    return (
        <form className={styles.login_form}
              autoComplete={"off"}
              method={"POST"}
        >
            <div className={styles.login_form_group}>
                <input id={"userName"}
                       type={"text"}
                       className={styles.login_form_input}
                       onChange={handleInputChange}
                       required/>
                <label className={styles.login_form_label}>Ваш логин</label>
            </div>
            <div className={styles.login_form_group}>
                <input id={"userPassword"}
                       type={"password"}
                       className={styles.login_form_input}
                       onChange={handleInputChange}
                       required/>
                <label className={styles.login_form_label}>Ваш пароль</label>
            </div>
            {isRegistrationActive ? <div className={styles.login_form_group}>
                <input id={"userPasswordCheck"}
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
        // <>
        //     {isRegistrationActive === false ?
        //         <form className={styles.login_form}
        //               autoComplete={"off"}
        //               method={"GET"}>
        //             <div className={styles.login_form_group}>
        //                 <input id={"userName"}
        //                        type={"text"}
        //                        className={styles.login_form_input}
        //                        onChange={handleInputChange}
        //                        required/>
        //                 <label className={styles.login_form_label}>Ваш логин</label>
        //             </div>
        //             <div className={styles.login_form_group}>
        //                 <input id={"userPassword"}
        //                        type={"password"}
        //                        className={styles.login_form_input}
        //                        onChange={handleInputChange}
        //                        required/>
        //                 <label className={styles.login_form_label}>Ваш пароль</label>
        //             </div>
        //             <button className={styles.login_form_submit_button}
        //                     type={"button"}
        //                     onClick={handleSignInSubmit}>
        //                 Войти
        //             </button>
        //             <p className={styles.login_form_registration_link}
        //                onClick={() => setIsRegistrationActive(!isRegistrationActive)}>
        //                 Зарегистрироваться
        //             </p>
        //         </form>
        //         :
        //         <form className={styles.login_form}
        //               autoComplete={"off"}
        //               method={"POST"}>
        //             <div className={styles.login_form_group}>
        //                 <input id={"userName"}
        //                        type={"text"}
        //                        className={styles.login_form_input}
        //                        onChange={handleInputChange}
        //                        required/>
        //                 <label className={styles.login_form_label}>Ваш логин</label>
        //             </div>
        //             <div className={styles.login_form_group}>
        //                 <input id={"userPassword"}
        //                        type={"password"}
        //                        className={styles.login_form_input}
        //                        onChange={handleInputChange}
        //                        required/>
        //                 <label className={styles.login_form_label}>Ваш пароль</label>
        //             </div>
        //             <div className={styles.login_form_group}>
        //                 <input id={"userPasswordCheck"}
        //                        type={"password"}
        //                        className={styles.login_form_input}
        //                        onChange={handleInputChange}
        //                        required/>
        //                 <label className={styles.login_form_label}>Повторите пароль</label>
        //             </div>
        //             <button className={styles.login_form_submit_button}
        //                     type={"button"}
        //                     onClick={handleSignUpSubmit}>
        //                 Войти
        //             </button>
        //             <p className={styles.login_form_registration_link}
        //                onClick={() => setIsRegistrationActive(!isRegistrationActive)}>
        //                 Войти в существующую уч. запись
        //             </p>
        //         </form>}
        // </>
    )
}