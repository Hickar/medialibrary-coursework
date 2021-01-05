import React from "react";
import styles from "./LoginPage.module.css";
import Section from "./Section";
import {useState} from "react";
import background_image from "../assets/login_background.svg";

export function LoginPage(props) {
	const [isRegistrationActive, setIsRegistrationActive] = useState(false);

	return (
		<Section>
			<img className={styles.login_background} src={background_image} alt={"Background image"}/>
			<div className={styles.login_card}>
				<h1 className={styles.login_hero}>Hickarium</h1>
				<p className={styles.login_description}>
					Самый простой способ для организации своей медиатеки.
				</p>
				<p className={styles.login_student_info}>
					Першин Егор Алексеевич, ИКБО-12-19
				</p>
			</div>
			{isRegistrationActive === false ? <div className={styles.login_card}>
				<form className={styles.login_form}
							autoComplete={"off"}>
					<div className={styles.login_form_group}>
						<input id={"user_login"}
									 type={"text"}
									 className={styles.login_form_input}
									 required/>
						<label className={styles.login_form_label}>Ваш логин</label>
					</div>
					<div className={styles.login_form_group}>
						<input id={"user_password"}
									 type={"password"}
									 className={styles.login_form_input}
									 required/>
						<label className={styles.login_form_label}>Ваш пароль</label>
					</div>
					<button className={styles.login_form_submit_button} type={"submit"}>Войти</button>
					<p className={styles.login_form_registration_link}
						 onClick={() => setIsRegistrationActive(true)}>Зарегистрироваться</p>
				</form>
			</div> : <div className={styles.login_card}>
				<form className={styles.login_form}
							autoComplete={"off"}
							method={"post"}>
					<div className={styles.login_form_group}>
						<input id={"user_login"}
									 type={"text"}
									 className={styles.login_form_input}
									 required/>
						<label className={styles.login_form_label}>Ваш логин</label>
					</div>
					<div className={styles.login_form_group}>
						<input id={"user_password"}
									 type={"password"}
									 className={styles.login_form_input}
									 required/>
						<label className={styles.login_form_label}>Ваш пароль</label>
					</div>
					<div className={styles.login_form_group}>
						<input id={"user_password"}
									 type={"password"}
									 className={styles.login_form_input}
									 required/>
						<label className={styles.login_form_label}>Повторите пароль</label>
					</div>
					<button className={styles.login_form_submit_button} type={"submit"}>Зарегистрироваться</button>
					<p className={styles.login_form_registration_link}
						 onClick={() => setIsRegistrationActive(false)}>Войти в существующую уч. запись</p>
				</form>
			</div>}
		</Section>
	)
}