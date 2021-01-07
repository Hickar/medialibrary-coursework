import React from "react";
import styles from "./LoginPage.module.css";
import Section from "./Section";
import background_image from "../assets/login_background.svg";
import {LoginForm} from "./LoginForm";

export function LoginPage() {
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
			<div className={styles.login_card}>
				<LoginForm/>
			</div>
		</Section>
	)
}