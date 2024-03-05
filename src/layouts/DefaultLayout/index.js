import classnames from 'classnames/bind'

import styles from './DefaultLayout.module.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const cx = classnames.bind(styles)

export default function DefaultLayout({ children }) {
    return (
        <div className="wrapper h-screen overflow-hidden">
            <div className="container pt-4">
                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div className={cx('content', 'shadow-md h-full ')}>
                            <div className={cx('header')}>
                                <Header />
                            </div>
                            <div className={cx('sidebar', 'h-full')}>
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12">
                        <div className={cx('content', 'shadow-md h-full ')}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}