import React from 'react'
import styles from '../styles/chat.module.css'

type Props = {}

const Room = (props: Props) => {

  return (
    <main className={styles.room}>
        <section className={styles.send}>
            <input type="text" />
            <button className={styles['send-btn']}>전송</button>
        </section>
    </main>
  )
}

export default Room