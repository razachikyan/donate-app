import React from "react";

import styles from './styles.module.css'

export const Header: React.FC<{ text: string }> = ({text}) => {
    return <header className={styles.header}>{ text}</header>
}