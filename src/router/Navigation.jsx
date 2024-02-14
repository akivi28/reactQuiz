import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    
    return (
        <ul className="navigationStyle nav nav-pills bg-light w-50 d-flex justify-content-around rounded-3 fs-3">
            <li className="nav-item flex-fill">
                <Link className="nav-link text-center" to="/quizOptions">
                    Quiz
                </Link>
            </li>
            <li className="nav-item flex-fill">
                <Link className="nav-link text-center" to="/history">
                    History
                </Link>
            </li>
            <li className="nav-item flex-fill">
                <Link className="nav-link text-center" to="/settings">
                    Settings
                </Link>
            </li>
        </ul>

    );
};

export default Navigation;
