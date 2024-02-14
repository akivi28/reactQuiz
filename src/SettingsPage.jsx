import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { clearCurrentUser } from "./redux/actions";

const SettingsPage = () => {
    const { currentUser } = useSelector((state) => state.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);


    if(currentUser){
        const formattedDate = new Date(currentUser.dateOfBirth).toISOString().split('T')[0];

        const [userName, setUserName] = useState(currentUser.name);
        const [isValidUserName, setValidUserName] = useState(true);
        const [userNameError, setUserNameError] = useState('');

        const [dateOfBirth, setDateOfBirth] = useState(formattedDate);
        const [isValidDate, setValidDate] = useState(true);
        const [dateError, setDateError] = useState('');

        const [password, setPassword] = useState(currentUser.password);
        const [isValidPassword, setValidPassword] = useState(true);
        const [passwordError, setPasswordError] = useState('');

        const dispatch = useDispatch();

        const nickInputChangeHandler = (event) => {
            const inputValue = event.target.value.trim();
            setUserName(inputValue);

            if (!inputValue) {
                setValidUserName(false);
                setUserNameError('Username cannot be empty.');
            } else {
                setValidUserName(true);
                setUserNameError('');
            }
        };

        const dateInputChangeHandler = (event) => {
            const inputValue = event.target.value.trim();
            setDateOfBirth(inputValue);

            if (!inputValue) {
                setValidDate(false);
                setDateError('Date cannot be empty.');
            } else {
                setValidDate(true);
                setDateError('');
            }
        };

        const passwordInputChangeHandler = (event) => {
            const inputValue = event.target.value;
            setPassword(inputValue);

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
                setPasswordError('');
            }
        };

        const saveButtonClickHandler = () =>{
            if(isValidDate && isValidPassword && isValidUserName){
                currentUser.name = userName;
                currentUser.dateOfBirth = dateOfBirth;
                currentUser.password = password;
            }
        };

        const exitButtonClickHandler =()=>{
            navigate('/');
            dispatch(clearCurrentUser());
            
        }
        return (
            <div className="mainSize bg-light rounded-4 mt-5 p-5">
                <div className="mb-3">
                    <label className="form-label">Change name</label>
                    <input type="text" className="form-control" value={userName} onChange={nickInputChangeHandler} onClick={nickInputChangeHandler} />
                    {!isValidUserName && <p className="error-message">{userNameError}</p>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Change date of birth</label>
                    <input type="date" className="form-control" value={dateOfBirth} onChange={dateInputChangeHandler} onClick={dateInputChangeHandler} />
                    {!isValidDate && <p className="error-message">{dateError}</p>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Change password</label>
                    <input type="text" className="form-control" value={password} onChange={passwordInputChangeHandler} onClick={passwordInputChangeHandler} />
                </div>
                {!isValidPassword && <p className="error-message">{passwordError}</p>}
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary w-25" onClick={saveButtonClickHandler}>Save</button>
                    <button className="btn btn-danger w-25" onClick={exitButtonClickHandler}>Exit</button>
                </div>
            </div>
        );
    }
}

export default SettingsPage;
