import React from 'react';
import classes from './Order.css';


const order = (props) => {

    const ingredients = Object.entries(props.ingredients).map(ingredient => { 
    return (<li key={ingredient[0]}>{ingredient[0]} : ({ingredient[1]}) </li>);
    });
 
    return (
        <div className={classes.Order}>
            <p>Ingredients:</p>
            <ul className={classes.List}>
                {ingredients}
            </ul>
            <p> Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;