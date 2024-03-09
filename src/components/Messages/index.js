import classNames from "classnames/bind"
import { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"

import styles from './Messages.module.css'
import { ChatContext } from "../../contexts/ChatContext"
import { db } from "../../services/firebase"
import Message from '../Message'

const cx = classNames.bind(styles)

function Messages() {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
            doc.exists() && setMessages(doc.data().messages)
        })
        return () => unsub
    }, [data.chatId])

    return (
        <div
            className={cx('form-mess', 'h-screen overflow-y-auto p-2')}
            style={{ maxHeight: 'calc(100vh - 150px)' }}
        >
            {messages.map((m) => {
                return (
                    <Message message={m} key={m.id}/>
                )
            })}
        </div>
    )
}

export default Messages