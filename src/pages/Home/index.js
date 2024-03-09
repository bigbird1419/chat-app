import classNames from "classnames/bind"
import { useContext } from "react"

import styles from './Home.module.css'
import { ChatContext } from "../../contexts/ChatContext"
import Messages from "../../components/Messages"
import FormChat from "../../components/FormChat"

const cx = classNames.bind(styles)

export default function Home() {
    const { data } = useContext(ChatContext)

    return (
        <div className="wrapper">
            <div className="container">
                {!data.user.uid ?
                    <div>
                        <h1>Vui long chon 1 nguoiw de chat</h1>
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
            </div>
        </div>
    )
}