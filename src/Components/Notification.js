import React, {useContext, useState, useEffect} from "react";
import styles from "./Notification.module.css";
import {NotificationContext} from "./NotificationContext";

export function Notification(props) {
    const setNotification = useContext(NotificationContext);
    const {type: type, text: text, active: active} = props.status;
    const visibilityClass = active ? styles.show : styles.hidden;

    useEffect(() => {
        if (active === true) {
            const timer = setTimeout(() => {
                setNotification({type: "", text: "", active: false});
            }, 5000);
            return () => {
                clearTimeout(timer)
            }
        }
    }, [active]);

    return (
        <div className={styles.notification + " " + styles[type] + " " + visibilityClass}>
            <p className={styles.notification_text}>
                {text}
            </p>
        </div>
    )
}