import { memo } from "react"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"

import styles from './DropdownMenu.module.css'

const cx = classNames.bind(styles)

function DropdownMenu({
    content = [],
    onShow = () => { },
    className,
    ...passProps
}) {
    const classes = cx('wrapper bg-white min-w-32 transition-all duration-300 shadow-md', {
        [className]: className,
    });
    const classesChild = cx('flex justify-start items-center p-2 border-b border-b-gray-300 hover:bg-gray-300')

    return (
        <div className={classes}>
            {content.map((el, ind) => {
                if (el.href) {
                    return <a href={el.href} key={ind} className={classesChild}>{el.title}</a>
                } else if (el.to) {
                    return <Link onClick={el?.func} to={el.to} key={ind} className={classesChild}>{el.title}</Link>
                } else {
                    return <div key={ind} className={classesChild}>{el.title}</div>
                }
            })}
        </div>
    )
}

export default memo(DropdownMenu)