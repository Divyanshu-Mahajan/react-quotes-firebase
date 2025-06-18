import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link to='/qoutes'>ReactQuotes</Link>
            </div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/quotes" className={({ isActive }) => (isActive ? classes.active : undefined)}>All Quotes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-quotes" className={({ isActive }) => (isActive ? classes.active : undefined)}>Add a Quote</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation
