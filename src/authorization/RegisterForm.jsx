import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid4 from "uuid4";
import { addUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);

    const [userName, setUserName] = useState('');
    const [isValidUserName, setValidUserName] = useState(true);
    const [userNameError, setUserNameError] = useState('');

    const [dateOfBirth, setDateOfBirth] = useState('');
    const [isValidDate, setValidDate] = useState(true);
    const [dateError, setDateError] = useState('');

    const [login, setLogin] = useState('');
    const [isValidLogin, setValidLogin] = useState(true);
    const [loginError, setLoginError] = useState('');

    const [password, setPassword] = useState('');
    const [isValidPassword, setValidPassword] = useState(true);
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const nickInputChangeHandler = (event) => {
        const inputValue = event.target.value.trim();
        if (!inputValue) {
            setValidUserName(false);
            setUserNameError('Username cannot be empty.');
        } else {
            setValidUserName(true);
            setUserName(inputValue);
            setUserNameError('');
        }
    };

    const dateInputChangeHandler = (event) => {
        const inputValue = event.target.value.trim();
        if (!inputValue) {
            setValidDate(false);
            setDateError('Date cannot be empty.');
        } else {
            setValidDate(true);
            setDateOfBirth(inputValue);
            setDateError('');
        }
    };

    const loginInputChangeHandler = (event) => {
        const inputValue = event.target.value;

        if (inputValue.includes(' ')) {
            setValidLogin(false);
            setLoginError('Login cannot contain spaces.');
        } else if (inputValue.length <= 5) {
            setValidLogin(false);
            setLoginError('Length of login (without spaces) should be greater than 5.');
        } else if (!/[A-Z]/.test(inputValue)) {
            setValidLogin(false);
            setLoginError('Login should have at least one uppercase letter.');
        } else if (users.some(user => user.login === inputValue)) {
            setValidLogin(false);
            setLoginError('This login already exists.');
        } else {
            setValidLogin(true);
            setLogin(inputValue);
            setLoginError('');
        }
    };

    const passwordInputChangeHandler = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length < 8) {
            setValidPassword(false);
            setPasswordError('Password should have at least 8 characters.');
        } else if (!/[a-zA-Z]/.test(inputValue)) {
            setValidPassword(false);
            setPasswordError('Password should have at least one letter.');
        } else if (!/\d/.test(inputValue)) {
            setValidPassword(false);
            setPasswordError('Password should have at least one digit.');
        } else {
            setValidPassword(true);
            setPassword(inputValue);
            setPasswordError('');
        }
    };

    const buttonClickHandler = (event) => {
        event.preventDefault();

        if (userName === '') {
            setValidUserName(false);
        }
        if (dateOfBirth === '') {
            setValidDate(false);
        }
        if (login === '') {
            setValidLogin(false);
        }
        if (password === '') {
            setValidPassword(false);
        }

        if (isValidUserName && isValidDate && isValidLogin && isValidPassword) {
            const newUser = {
                id: uuid4(),
                name: userName,
                dateOfBirth: dateOfBirth,
                login: login,
                password: password
            }
            dispatch(addUser(newUser));
            alert('You have successfully registered, now log in to your account')
            navigate("/login");
        }
    }

    return (
        <form className="formsSize bg-light container mt-4 p-5 w-50 rounded-4">
            <h1 className="mb-4">Registration</h1>
            <div className="mb-3">
                <label className="form-label">User name:</label>
                <input type="text" className={`form-control ${isValidUserName ? '' : 'is-invalid'}`} onChange={nickInputChangeHandler} onClick={nickInputChangeHandler} />
                {!isValidUserName && <p className="invalid-feedback">{userNameError}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Date of birth:</label>
                <input type="date" className={`form-control ${isValidDate ? '' : 'is-invalid'}`} onChange={dateInputChangeHandler} onClick={dateInputChangeHandler} />
                {!isValidDate && <p className="invalid-feedback">{dateError}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Login:</label>
                <input type="text" className={`form-control ${isValidLogin ? '' : 'is-invalid'}`} onChange={loginInputChangeHandler} onClick={loginInputChangeHandler} />
                {!isValidLogin && <p className="invalid-feedback">{loginError}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className={`form-control ${isValidPassword ? '' : 'is-invalid'}`} onChange={passwordInputChangeHandler} onClick={passwordInputChangeHandler} />
                {!isValidPassword && <p className="invalid-feedback">{passwordError}</p>}
            </div>
            <button className="btn btn-primary" onClick={buttonClickHandler}>Register</button>
        </form>
    );
};

export default RegisterForm;
