import React, {useState, useContext} from "react";
import styles from "./LoginForm.module.css";
import {useHistory} from "react-router";
import {NotificationContext} from "../Contexts/NotificationContext";
import {AuthContext} from "../Contexts/AuthContext";

export default function LoginForm() {
	const [isRegistrationActive, setIsRegistrationActive] = useState(false);
	const [userData, setUserData] = useState({name: "", password: "", password_check: ""});
	const history = useHistory();
	const setNotification = useContext(NotificationContext);
	const setAuthQuery = useContext(AuthContext);

	async function handleSubmit(e) {
		e.preventDefault();

		const actionURL = isRegistrationActive ?
			`https://medialib.hickar.space/actions.php?register` :
			`https://medialib.hickar.space/actions.php?login`;

		const response = await fetch(actionURL, {
			method: "POST",
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

		if (isRegistrationActive) {
			setIsRegistrationActive(false);
		} else {
			setAuthQuery(`https://medialib.hickar.space/actions.php?isAuthed  `);
			history.push("/");
		}

		setNotification({type: "message", text: data.data, active: true});
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
					method={"POST"}>
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
							onClick={handleSubmit}>
				{isRegistrationActive ? "Зарегистрироваться" : "Войти"}
			</button>
			<p className={styles.login_form_registration_link}
				 onClick={() => setIsRegistrationActive(!isRegistrationActive)}>
				{isRegistrationActive ? "Войти в сущетсвующую уч. запись" : "Зарегистрироваться"}
			</p>
		</form>
	)
}