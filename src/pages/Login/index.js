import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import styles from './Login.module.css'
import Button from '../../components/Button'
import routes from '../../constants/routes'
import { auth } from '../../services/firebase'
import Loader from '../../components/Loader'

const cx = classNames.bind(styles)

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErr, setIsErr] = useState(false)
    const [contentErr, setContentErr] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const hanldeSignIn = async (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setContentErr('Email và mật khẩu không được để trống')
            setIsErr(true)
            return
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
            setContentErr('Email chưa đúng định dạng')
            setIsErr(true)
            return
        } else if (password.length < 8) {
            setContentErr('Mật khẩu phải từ 8 kí tự')
            setIsErr(true)
            return
        }
        try {
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            setIsLoading(false)
            setContentErr('')
            setIsErr(false)
            navigate('/')
        } catch (error) {
            console.log(error)
            setContentErr('Có lỗi xảy ra, vui lòng thử lại!!!')
            setIsErr(true)
        }
    }

    useEffect(() => {
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
                    <div className="row">
                        <div className="col-12">
                            <div className="content mt-20">
                                <h1 className="text-center font-bold text-6xl text-colorPrimary">Login</h1>
                                <div className={cx('form-box', 'flex flex-col justify-center items-center mt-10')}>
                                    <form className='flex flex-col justify-center items-center'>
                                        <input className={cx('min-w-80 p-2 mb-2  border focus:border-colorPrimary focus:outline-colorPrimary')} type='text' placeholder='Enter your email...'
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <input className={cx('min-w-80 p-2 mb-4 border focus:border-colorPrimary focus:outline-colorPrimary')} type='password' placeholder='Enter your password...'
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <Button
                                            onClick={e => hanldeSignIn(e)}
                                            className={cx('min-w-80 bg-colorPrimary p-2 text-md text-white')}>Sign in</Button>
                                    </form>
                                    <div className='min-w-80 text-right mt-2'>
                                        <Button className={cx('text-colorPrimary text-sm')} to={routes.signup}>
                                            Sign up?
                                        </Button>
                                    </div>
                                    {isErr &&
                                        <div className='text-center mt-4'>
                                            <span className='text-colorSecondary text-xl'>{contentErr}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}