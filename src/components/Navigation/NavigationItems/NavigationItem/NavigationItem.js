import React from 'react';
import { NavLink } from 'react-router-dom';
import classess from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classess.NavigationItem}>
        <NavLink 
            activeClassName={classess.active}
            exact={props.exact}
            to={props.link}>{props.children}</NavLink>
    </li>
);

export default navigationItem