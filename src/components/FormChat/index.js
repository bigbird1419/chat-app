import classNames from "classnames/bind"
import { useState, useContext } from "react"
import { Timestamp, arrayUnion, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { v4 as uuid } from 'uuid'

import styles from './FormChat.module.css'
import Button from "../Button"
import { AuthContext } from "../../contexts/AuthContext"
import { ChatContext } from "../../contexts/ChatContext"
import { db } from "../../services/firebase"

const cx = classNames.bind(styles)

function FormChat() {
    const { curUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const [text, setText] = useState('')

    const handleSend = async () => {
        try {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: curUser.uid,
                    date: Timestamp.now(),
                }),
            })
            await updateDoc(doc(db, "userChats", curUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });
            setText('')
        } catch (error) {
            // throw error
        }
    }
    const handleKeyDown = (e) => {
        e.code === 'Enter' && handleSend()
    }

    return (
        <div className={cx('form-send', 'px-4 py-2 bg-colorPrimary')}>
            <div className="relative overflow-hidden">
                <input
                    className="px-4 py-2 w-100 rounded-full outline-none" type="text" placeholder="Enter message..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => handleKeyDown(e)}
                />
                <Button
                    className={cx('absolute p-1 top-1/2 right-0 translate-y-[-50%] mr-2 border-l border-l-gray-400')}
                    onClick={handleSend}
                >
                    <i className="far fa-paper-plane"></i>
                </Button>
            </div>
        </div>
    )
}

export default FormChat