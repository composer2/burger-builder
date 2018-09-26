import React from 'react';
import classess from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classess.NavigationItem}>
        <a href={props.link} className={props.active ? classess.active : null}>{props.children}</a>
    </li>
);

export default navigationItem