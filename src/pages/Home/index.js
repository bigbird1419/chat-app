import classNames from "classnames/bind"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import styles from './Home.module.css'
import { ChatContext } from "../../contexts/ChatContext"
import Messages from "../../components/Messages"
import FormChat from "../../components/FormChat"
import { AuthContext } from "../../contexts/AuthContext"
import Loader from "../../components/Loader"

const cx = classNames.bind(styles)

export default function Home() {
    const { curUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const [isLoading, setIsLoading] = useState(true)

    const navigation = useNavigate()

    useEffect(() => {
        if (Object.keys(curUser).length === 0) {
            navigation('/login')
        }
        const id = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(id)
    })

    return (
        <div className="wrapper">
            {isLoading ?
                <Loader /> :
                <div className="container">
                    {!data.user.uid ?
                        <div>
                            <h1 className='text-2xl text-colorPrimary font-bold'>Chọn người dùng để xem tin nhắn</h1>
                        </div>
                        :
                        <div className={cx('content', 'shadow-md')}>
                            <div className={cx('home-header', 'flex items-center bg-colorPrimary p-2')}>
                                <div className={cx('user-img', 'mr-4')}>
                                    <img className="w-10 rounded-full" src={data.user.photoURL} alt="user" />
                                </div>
                                <div className={cx('user-name', 'text-white font-semibold text-lg')}>
                                    <h3 className="uppercase">{data.user.displayName}</h3>
                                </div>
                            </div>
                            <div className={cx('message-box')}>
                                <Messages />
                                <FormChat />
                            </div>
                        </div>
                    }
                </div>}
        </div>
    )
}