import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchQuiz } from "./redux/actions";
import { useNavigate } from "react-router-dom";

const QuizOptionsPage = () => {
    const dispatch = useDispatch();
    const { loading, categories, error } = useSelector((state) => state.categories);

    const { currentUser } = useSelector((state) => state.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const[countOfQuestions, setCountOfQuestions] = useState(10);
    const[category, setCategory] = useState("any");
    const[difficulty, setDifficulty] = useState("any");
    const[type, setType] = useState("any");

    const buttonClickHandler = (event) => {
        event.preventDefault();
        dispatch(fetchQuiz(countOfQuestions, category, difficulty, type));
        if(!currentUser.history){
            currentUser.history = [];
        }
        currentUser.history.push({
            timeOfQuiz: new Date().toISOString(),
            quizCategory: category,
            quizCountOfQuestions: countOfQuestions,
            quizDifficulty: difficulty,
            quizType: type,
            countRightAnswers: 0
        })
        console.log(currentUser);
        navigate("/quiz")
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const numberInputChangeHandler=(event)=>{
        if(event.target.value < 1){
            event.target.value = 1;
        }
        if(event.target.value > 50){
            event.target.value = 50;
        }
        setCountOfQuestions(event.target.value);
    }

    const selectChangeHandler=(event, setState)=>{
        setState(event.target.value);
    }

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h5>Error: {error}</h5>;
    }

    return (
        <div className="container mt-5 bg-light w-50 p-5 rounded-4 d-flex flex-column align-items-center" style={{ maxWidth: '500px' , minWidth: '250px'}}>
            <h2 className="mb-4">Quiz options</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">
                        Number of questions
                        <input type="number" className="form-control" defaultValue={10} onChange={numberInputChangeHandler}/>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Select category:
                        <select className="form-select" onChange={(e) => selectChangeHandler(e, setCategory)}>
                            <option value="any">Any category</option>
                            {categories.map((elem) => (
                                <option key={elem.id} value={elem.id}>
                                    {elem.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Select difficulty:
                        <select className="form-select" onChange={(e) => selectChangeHandler(e, setDifficulty)}>
                            <option value="any">Any difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Select type:
                        <select className="form-select" onChange={(e) => selectChangeHandler(e, setType)}>
                            <option value="any">Any type</option>
                            <option value="multiple">Multiple choice</option>
                            <option value="boolean">True / False</option>
                        </select>
                    </label>
                </div>

                <button className="btn btn-primary" onClick={buttonClickHandler}>
                    Start
                </button>
            </form>
        </div>
    );
};

export default QuizOptionsPage;
