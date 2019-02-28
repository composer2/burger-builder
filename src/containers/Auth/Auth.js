import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount () {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
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

    inputChangedHandler = (e, controlName) => {
        const updatedControls = { 
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            } 
        };
        this.setState({
            controls:updatedControls
        });
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push ({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementArray.map(el => (
            <Input 
                key={el.id }
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                change={(event) => this.inputChangedHandler(event, el.id)}
            />
        ))
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorDetail = null;

        if (this.props.error) {
            errorDetail = ( <p>{this.props.error}</p> );
        }
        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorDetail}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>
                        Submit
                    </Button>
                </form>
                    <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
                        Switch to {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                    </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
   return {
       loading: state.auth.loading,
       error: state.auth.error,
       isAuth: state.auth.token !== null,
       buildingBurger: state.burgerBuilder.building,
       authRedirectPath: state.auth.authPath
   }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.authRedirect('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
