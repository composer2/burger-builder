import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },  
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true,
            }
        },
        formIsValid: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let element in this.state.orderForm) {
            formData[element] = this.state.orderForm[element].value;
        }
        const order = {
          ingredients: this.props.ings,
          price: this.props.price,
          orderData: formData
        };
        this.props.onOrderBurger(order);
    }

    checkValidity (value, rules) {
        let isValid = true;
        if(rules && rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules && rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules && rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIndentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIndentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIndentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIndentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push ({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementArray.map(el =>(
                <Input
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    change={(event) => this.inputChangedHandler(event, el.id)} />
            ))}
            <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      ings: state.ingredients,
      price: state.totalPrice,
      loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));