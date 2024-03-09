import classNames from "classnames/bind"
import { memo, useCallback, useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"

import styles from './Search.module.css'
import Button from "../../../components/Button"
import { db } from '../../../services/firebase'
import { AuthContext } from '../../../contexts/AuthContext'

const cx = classNames.bind(styles)

function Search({ onShow = () => { } }) {
    const [valSearch, setValSearch] = useState('')
    const [user, setUser] = useState()
    const { curUser } = useContext(AuthContext)

    const handleClearValSearch = useCallback(() => {
        setValSearch('')
    }, [])
    const handleSetValSearch = useCallback((e) => {
        setValSearch(e.target.value)
    }, [])
    const hanldeSearch = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', valSearch))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                setUser(doc.data())
            })
        } catch (error) {

        }
    }
    const handleKeydown = (e) => {
        e.code === "Enter" && valSearch.length > 0 && hanldeSearch()
    }
    const handleSelect = async () => {
        const combineId = curUser.uid > user.uid ? curUser.uid + user.uid : user.uid + curUser.uid
        try {
            const res = await getDoc(doc(db, 'chats', combineId))
            if (!res.exists()) {
                await setDoc(doc(db, 'chats', combineId), { messages: [] })

                await updateDoc(doc(db, 'userChats', curUser.uid), {
                    [combineId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combineId + '.date']: serverTimestamp()
                })
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combineId + '.userInfo']: {
                        uid: curUser.uid,
                        displayName: curUser.displayName,
                        photoURL: curUser.photoURL
                    },
                    [combineId + '.date']: serverTimestamp()
                })
            }
        } catch (error) {
            throw error
        }
        onShow()
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div onClick={onShow} className={cx('overlay', 'fixed top-0 right-0 bottom-0 left-0 bg-gray-500 opacity-80 z-40 transition-all duration-300')}></div>
                <div className={cx('search-box', 'fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50')}>
                    <div className="rounded-md relative">
                        <input className="min-w-80 px-4 py-2 text-md outline-none"
                            placeholder="Enter name..." type="text"
                            value={valSearch}
                            onChange={e => handleSetValSearch(e)}
                            onKeyDown={e => handleKeydown(e)}
                        />
                        {valSearch.length > 0 &&
                            <Button onClick={handleClearValSearch} className={cx('', 'absolute top-1/2 right-1 translate-y-[-50%] text-colorPrimary')}>
                                <i className="far fa-times-circle"></i>
                            </Button>
                        }
                        <hr />
                    </div>
                    {user &&
                        <div className={cx('rs-search', 'bg-white px-4 py-2 cursor-pointer')}>
                            <div
                                onClick={handleSelect}
                                className="flex items-center mb-2" key={user.uid}
                            >
                                <img className="w-10 rounded-full" src={user.photoURL} alt="user" />
                                <h3 className="ml-4 text-colorPrimary font-normal text-md uppercase">{user.displayName}</h3>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default memo(Search)