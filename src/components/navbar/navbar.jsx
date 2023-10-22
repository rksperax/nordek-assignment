import './Navbar.css'
import { useState } from 'react'
import { navData } from '../../config/data'

const Navbar = () => {
    //Stores the current active link in navbar
    const [activeId, setActiveId] = useState(0)
   



    return (
        <>
            <div className='navbar_container'>
                <img src={'/img/NORPAY LOGO.svg'} />
                <ul className="link_container">

                    {navData.map((item, idx) => {
                        return <li
                            key={idx}
                            className={`nav_links ${activeId === idx ? 'active_link' : ''}`}
                            onClick={() => setActiveId(idx)}
                        >
                            {item}
                        </li>
                    })}
                </ul>
                <button className='nav_button'>Connect Wallet</button>
            </div>
        </>
    )
}

export default Navbar