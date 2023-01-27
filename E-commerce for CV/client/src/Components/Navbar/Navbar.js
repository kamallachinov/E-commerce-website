import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { FavouriteContext } from '../../Pages/Context/FavouriteContext'
function Navbar() {
    const { fav, setFav } = useContext(FavouriteContext)
    return (
        <>
            <div>
                <nav className={styles.navbar}>
                    <img alt='logo' src='https://static.vecteezy.com/system/resources/previews/009/121/843/non_2x/nav-logo-nav-letter-nav-letter-logo-design-initials-nav-logo-linked-with-circle-and-uppercase-monogram-logo-nav-typography-for-technology-business-and-real-estate-brand-vector.jpg' />
                    <ul>
                        <li><Link to={"/"} className={styles.link}>Home</Link></li>
                        <li><Link to={"/create"} className={styles.link}>Add new</Link></li>
                        <li><Link to={"/fav"} className={styles.link}>Favs: {fav.length}</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Navbar