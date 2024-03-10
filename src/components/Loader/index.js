import classNames from "classnames/bind"
import { BounceLoader } from 'react-spinners'

import styles from './Loader.module.css'

const cx = classNames.bind(styles)

function Loader() {
    return (
        <div
            className={cx('fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center z-50')}
        >
            <BounceLoader color="#4e6bff" speedMultiplier={1} />
        </div>
    )
}

export default Loader