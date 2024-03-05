import classNames from "classnames/bind"
import { useCallback, useContext, useState } from "react"
import { signOut } from "firebase/auth"

import styles from './Header.module.css'
import Button from '../../../components/Button'
import Search from "../Search"
import DropdownMenu from '../../../components/DropdownMenu'
import { auth } from '../../../services/firebase'
import { AuthContext } from "../../../contexts/AuthContext"

const cx = classNames.bind(styles)

export default function Header() {
    const [isShowSeachBox, setIsShowSeachBox] = useState(false)
    const [isShowDropMenu, setIsShowDropMenu] = useState(false)
    const {curUser} = useContext(AuthContext)
    const contentDropMenu = [
        {
            title: 'Log out',
            to: '/login',
            func: () => signOut(auth)
        }
    ]

    const handleShowSeachBox = useCallback(() => {
        setIsShowSeachBox(val => !val)
    }, [])
    const handleShowDropMenu = useCallback(() => {
        setIsShowDropMenu(val => !val)
    }, [])

    return (
        <div className="wrapper">
            <div className="container">
                <div className={cx('content', 'flex justify-between items-center bg-colorPrimary p-2')}>
                    <div className={cx('user-img', 'flex items-center')}>
                        <img className="w-10 rounded-full mr-2" src={curUser?.photoURL || 'https://cdn-icons-png.flaticon.com/512/219/219969.png'} alt={curUser?.displayName} />
                        <span className="uppercase text-white">{curUser?.displayName}</span>
                    </div>
                    <div className={cx('control-box', 'flex justify-between items-center')}>
                        <div className={cx('control-search', 'mr-4')}>
                            <Button onClick={handleShowSeachBox} className={cx('', 'p-2 text-white text-md')}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                            {isShowSeachBox && <Search onShow={handleShowSeachBox} />}
                        </div>
                        <div className={cx('control-ellips', 'relative mr-4')}>
                            <Button onClick={handleShowDropMenu} className={cx('', 'p-2 text-white text-md')}>
                                <i className="fas fa-ellipsis-v"></i>
                            </Button>
                            {isShowDropMenu &&
                                <DropdownMenu onShow={handleShowDropMenu} content={contentDropMenu} className={cx('absolute top-100 right-0')} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}