import classNames from "classnames/bind"

import styles from './Sidebar.module.css'

const cx = classNames.bind(styles)
const contentMessage = [
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: false
    },
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: true
    },
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: false
    },
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: false
    },
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: true
    },
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: false
    },
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: false
    },
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: true
    },
    {
        userImg: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        userName: 'Bootstrap',
        title: 'Xin chafo ng anh em',
        time: '12:00 Am',
        isSeen: false
    },
]

export default function Sidebar() {



    return (
        <div className="wrapper">
            <div className="container">
                <div className={cx('content', 'h-screen flex flex-col overflow-y-auto')}  style={{ maxHeight: 'calc(100vh - 100px)' }}>
                    {contentMessage.map((el, ind) => {
                        return (
                            <div className="flex items-center p-2 border-b border-b-gray-300" key={ind}>
                                <div className={cx('user-img', 'mr-4')}>
                                    <img className="w-10" src={el.userImg} alt={el.userName}/>
                                </div>
                                <div className={cx('user-info', 'flex flex-col justify-between flex-auto')}>
                                    <div className={cx('user-name', 'mb-1', el.isSeen?'':'font-bold')}>
                                        <h3>{el.userName}</h3>
                                    </div>
                                    <div className={cx('user-message', 'flex justify-between')}>
                                        <span>{el.title}</span>
                                        <span className="text-sm">{el.time}</span>
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