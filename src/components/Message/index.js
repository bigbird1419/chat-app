import classNames from "classnames/bind"
import { useContext, useEffect, useRef } from "react"

import styles from './Message.module.css'
import { AuthContext } from "../../contexts/AuthContext"
import { ChatContext } from "../../contexts/ChatContext"

const cx = classNames.bind(styles)

function Messages({ message }) {
    const { curUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const messRef = useRef()

    useEffect(() => {
        messRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])

    return (
        <div ref={messRef}
            className={cx('flex items-center mb-4', message.senderId === curUser.uid ? 'justify-end' : '')}>
            <div className={cx('flex items-center', message.senderId === curUser.uid ? 'bg-gray-300 px-4 py-2 rounded-full' : '')}>
                {message.senderId === data.user.uid &&
                    <div className={cx('user-img', 'mr-4')}>
                        <img className="w-8 rounded-full" src={data.user.photoURL} alt={data.user.displayName} />
                    </div>
                }
                <div className={cx('user-mess', message.senderId === curUser.uid ? '' : 'bg-colorPrimary px-4 py-2 rounded-full text-white')}>
                    <span>{message.text}</span>
                </div>
            </div>
        </div>
    )
}
export default Messages