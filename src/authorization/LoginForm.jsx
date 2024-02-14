import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/actions";


const LoginForm = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [isValidLogin, setValidLogin] = useState(true);

    const [password, setPassword] = useState('');
    const [isValidPassword, setValidPassword] = useState(true);

    const [clickFlag, setFlag] = useState(false);

    useEffect(() => {
        if (clickFlag && isValidLogin && isValidPassword) {
            navigate('/quizOptions');
        }
    }, [isValidLogin, isValidPassword, clickFlag]);

    const buttonClickHandler = (event) => {
        event.preventDefault();
        setValidLogin(false);
        setValidPassword(false);

        const user = users.find(user => user.login === login);

        if (user !== undefined) {
            setValidLogin(true);
            if (user.password === password) {
                setValidPassword(true);
                dispatch(setCurrentUser(user));
            } else {
                setValidPassword(false);
            }
        } else {
            setValidLogin(false);
            setValidPassword(false);
        }
        setFlag(true);
    }

    return (
        <form className="formsSize bg-light container mt-4 p-5 w-25 rounded-4">
            <h1>Log in</h1>
            <div className="mb-3">
                <label htmlFor="login" className="form-label">
                    Login:
                </label>
                <input type="text" className={`form-control ${isValidLogin ? '' : 'is-invalid'}`} id="login" onChange={(event) => setLogin(event.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input type="password" className={`form-control ${isValidPassword ? '' : 'is-invalid'}`} id="password" onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={buttonClickHandler}>
                Login
            </button>
        </form>
    );
};

export default LoginForm;
