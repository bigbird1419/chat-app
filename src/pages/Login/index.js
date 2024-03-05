import classNames from 'classnames/bind'
import { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'

import styles from './Login.module.css'
import Button from '../../components/Button'
import routes from '../../constants/routes'
import { auth } from '../../services/firebase'
import { CurUserContext } from '../../contexts/curUserContext'

const cx = classNames.bind(styles)

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user } = useContext(CurUserContext)

    const hanldeSignIn = (e) => {
        e.preventDefault()
        const res = signInWithEmailAndPassword(auth, email, password)
        console.log(res)
    }

    return (
        <div className="wrapper">
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
                            </div>
                            {/* <div className="form mt-10 flex flex-col justify-center items-center">
                                <div className='min-w-80 flex justify-center items-center px-4 py-2 border text-colorPrimary border border-primary mb-4 cursor-pointer transition-all duration-300 rounded-sm hover:bg-colorPrimary hover:text-white'>
                                    <i className="fab fa-facebook mr-2"></i>
                                    Login via Facebook
                                </div>
                                <div className='min-w-80 flex justify-center items-center px-4 py-2 border text-colorSecondary border border-primary mb-4 cursor-pointer transition-all duration-300 rounded-sm hover:bg-colorPrimary hover:text-white'>
                                    <i className="fab fa-google mr-2"></i>
                                    Login via Google
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}