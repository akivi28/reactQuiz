import React from "react";
import { Link } from "react-router-dom";

const FirstForm =()=>{
    return (
    <div className="firstForm formsSize">
        <h1>QUIZZES</h1>
        <Link to={'/registration'}>
            <button className="btn btn-primary">Registration</button>
        </Link>
        <br />
        <Link to={'/login'}>
            <button className="btn btn-primary">Log in</button>
        </Link>
    </div>)
}

export default FirstForm