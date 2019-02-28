import React from "react";
import classes from "./Toolbar.css"
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToglge from '../SideDrawer/DrawerToglge/DrawerToglge'

const toolbar = (props) => (

    <header className={classes.Toolbar}>
        <DrawerToglge clicked={props.drawerToglgeClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;