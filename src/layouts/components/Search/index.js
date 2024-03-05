import classNames from "classnames/bind"
import { memo, useState } from 'react'

import styles from './Search.module.css'
import Button from "../../../components/Button"

const cx = classNames.bind(styles)
const rsSearch = [
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        name: 'anthony'
    },
    {
        img: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        name: 'anthony'
    }
]

function Search({ onShow = () => { } }) {
    const [valSearch, setValSearch] = useState('')

    const handleClearValSearch = () => {
        setValSearch('')
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div onClick={onShow} className={cx('overlay', 'fixed top-0 right-0 bottom-0 left-0 bg-gray-500 opacity-80 z-40 transition-all duration-300')}></div>
                <div className={cx('search-box', 'fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50')}>
                    <div className="rounded-md relative">
                        <input className="min-w-80 px-4 py-2 text-md outline-none" placeholder="Enter name..." type="text" value={valSearch}
                            onChange={e => setValSearch(e.target.value)}
                        />
                        {valSearch.length > 0 &&
                            <Button onClick={handleClearValSearch} className={cx('', 'absolute top-1/2 right-1 translate-y-[-50%] text-colorPrimary')}>
                                <i class="far fa-times-circle"></i>
                            </Button>
                        }
                        <hr />
                    </div>
                    {rsSearch.length > 0 &&
                        <div className={cx('rs-search', 'bg-white px-4 py-2')}>
                            {rsSearch.map((el, ind) => {
                                return (
                                    <div className="flex items-center mb-2" key={ind}>
                                        <img className="w-10" src={el.img} alt="user" />
                                        <h3 className="ml-4 text-colorPrimary font-normal text-md">{el.name}</h3>
                                    </div>
                                )
                            })}
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default memo(Search)