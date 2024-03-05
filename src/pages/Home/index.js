import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"

import styles from './Home.module.css'
import Button from "../../components/Button"


const cx = classNames.bind(styles)
const messages = [
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
        owner: true
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
        owner: true
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
        owner: true
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        title: 'Hi, How are you ?',
    }
]

export default function Home() {
    const [inpMes, setInpMes] = useState('')
    const [messages, setMessages] = useState([])
    const inpRef = useRef(null)

    const handleSendMessage = () => {
        
        setInpMes('')
        inpRef.current.focus()
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="wrapper">
            <div className="container">
                <div className={cx('content', 'shadow-md')}>
                    <div className={cx('home-header', 'flex items-center bg-colorPrimary p-2')}>
                        <div className={cx('user-img', 'mr-4')}>
                            <img className="w-10" src="https://cdn-icons-png.flaticon.com/512/219/219969.png" alt="user" />
                        </div>
                        <div className={cx('user-name', 'text-white font-semibold text-lg')}>
                            <h3>Naveen mandwariya</h3>
                        </div>
                    </div>
                    <div className={cx('message-box')}>
                        <div
                            className={cx('form-mess', 'h-screen overflow-y-auto p-2')}
                            style={{ maxHeight: 'calc(100vh - 150px)' }}
                        >
                            {messages.map((el, ind) => {
                                return (
                                    <div className={cx('flex items-center mb-4', el.owner ? 'justify-end' : '')} key={ind}>
                                        <div className={cx('flex items-center', el.owner ? 'bg-gray-300 px-4 py-2 rounded-full' : '')}>
                                            {!el.owner &&
                                                <div className={cx('user-img', 'mr-4')}>
                                                    <img className="w-8" src={el.img} alt={el.title} />
                                                </div>
                                            }
                                            <div className={cx('user-mess', el.owner ? '' : 'bg-colorPrimary px-4 py-2 rounded-full')}>
                                                <span>{el.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={cx('form-send', 'px-4 py-2 bg-colorPrimary')}>
                            <div className="relative overflow-hidden">
                                <input
                                    className="px-4 py-2 w-100 rounded-full outline-none" type="text" placeholder="Enter message..."
                                    value={inpMes}
                                    onChange={e => setInpMes(e.target.value)}
                                    ref={inpRef}
                                />
                                <Button
                                    className={cx('absolute p-1 top-1/2 right-0 translate-y-[-50%] mr-2 border-l border-l-gray-400')}
                                    onClick={handleSendMessage}
                                >
                                    <i className="far fa-paper-plane"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}