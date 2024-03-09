import classNames from "classnames/bind"
import { useContext, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"

import styles from './Sidebar.module.css'
import { db } from "../../../services/firebase"
import { AuthContext } from "../../../contexts/AuthContext"
import { ChatContext } from '../../../contexts/ChatContext'

const cx = classNames.bind(styles)

export default function Sidebar() {
    const [chats, setChats] = useState([])
    const { curUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const handleSelect = (userInfo) => {
        dispatch({ type: 'CHANGE_USER', payload: userInfo })
    }

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', curUser.uid), doc => {
                setChats(Object.entries(doc.data()))
            })

            return () => unsub
        }
        curUser.uid && getChats()
    }, [curUser.uid])

    return (
        <div className="wrapper">
            <div className="container">
                <div className={cx('content', 'h-screen flex flex-col overflow-y-auto')} style={{ maxHeight: 'calc(100vh - 100px)' }}>
                    {chats?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                        // const timestamp = chat[1]?.date
                        // const date = new Date(timestamp.seconds * 1000);
                        // const day = date.getDate();
                        // const month = date.getMonth() + 1;
                        // const year = date.getFullYear();
                        // const hours = date.getHours();
                        // const minutes = date.getMinutes();
                        // const seconds = date.getSeconds();
                        // const formattedDate = `${day}/${month}/${year}`;
                        // const formattedTime = `${hours}:${minutes}:${seconds}`;
                        return (
                            <div onClick={() => handleSelect(chat[1].userInfo)}
                                className="flex items-center p-2 border-b border-b-gray-300" key={chat[0]}
                            >
                                <div className={cx('user-img', 'mr-4')}>
                                    <img className="w-10 rounded-full"
                                        src={chat[1].userInfo.photoURL}
                                        alt={chat[1].userInfo.displayName}
                                    />
                                </div>
                                <div className={cx('user-info', 'flex flex-col justify-between flex-auto')}>
                                    <div className={cx('user-name', 'mb-1', true ? '' : 'font-bold')}>
                                        <h3 className="uppercase">{chat[1].userInfo.displayName}</h3>
                                    </div>
                                    <div className={cx('user-message', 'flex justify-between')}>
                                        <span>{chat[1].lastMessage?.text}</span>
                                        <span className="text-sm">{}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}