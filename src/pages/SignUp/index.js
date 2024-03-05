import classNames from 'classnames/bind'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

import styles from './SignUp.module.css'
import Button from '../../components/Button'
import routes from '../../constants/routes'
import { auth, db } from '../../services/firebase'
import userImg from '../../assets/user.jpg'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

export default function SignUp() {
    const [isErr, setIsErr] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const navigate = useNavigate()

    const hanldeSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(res.user, {
                displayName,
                photoURL: userImg
            })
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: userImg
            })
            setIsErr(false)
            navigate('/')
        } catch (error) {
            console.log(error)
            setIsErr(true)
        }
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content mt-20">
                            <h1 className="text-center font-bold text-6xl text-colorPrimary">Sign Up</h1>
                            <div className={cx('form-box', 'flex flex-col justify-center items-center mt-10')}>
                                <form className='flex flex-col justify-center items-center'>
                                    <input className={cx('min-w-80 p-2 mb-2  border focus:border-colorPrimary focus:outline-colorPrimary')} type='text' placeholder='Display name...'
                                        onChange={e => setDisplayName(e.target.value)}
                                    />
                                    <input className={cx('min-w-80 p-2 mb-2  border focus:border-colorPrimary focus:outline-colorPrimary')} type='text' placeholder='Enter your email...'
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <input className={cx('min-w-80 p-2 mb-4 border focus:border-colorPrimary focus:outline-colorPrimary')} type='password' placeholder='Enter your password...'
                                        onChange={e => setPassword(e.target.value)}
                                    />

                                    <Button
                                        onClick={e => hanldeSignUp(e)}
                                        className={cx('min-w-80 bg-colorPrimary p-2 text-md text-white')}
                                    >Sign up</Button>
                                </form>
                                <div className='min-w-80 text-right mt-2'>
                                    <Button className={cx('text-colorPrimary text-sm')} to={routes.login}>
                                        Login ?
                                    </Button>
                                </div>
                                {isErr &&
                                    <div className='text-center mt-4'>
                                        <span className='text-colorSecondary text-xl'>Loi vcl dcm</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}