import React from 'react'

import styles from '../../styles/header.module.css';
import Image from 'next/image';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.profileImage}>
                <Image src="/profile.jpg" alt="Profile" width={80} height={80} />
            </div>
            <h1 className={styles.name}>John Doe</h1>
        </header>
    )
}

export default Header
