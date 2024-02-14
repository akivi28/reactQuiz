import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import he from 'he';

const Quiz = () => {
    const { currentUser } = useSelector((state) => state.currentUser);
    const navigate = useNavigate();
    const { loading, questions, error } = useSelector((state) => state.quizQuestions);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [correctAnswersCounter, setCorrectAnswerCounter] = useState(0);

    useEffect(() => {
        if (!currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        if (questions && questions[questionIndex]) {
            const answers = [...questions[questionIndex].incorrect_answers, questions[questionIndex].correct_answer];
            setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
        }
    }, [questions, questionIndex]);

    const buttonClickHandler = () => {
        if (questions[questionIndex].correct_answer === selectedAnswer) {
            setCorrectAnswerCounter(correctAnswersCounter + 1);
        }

        if (questionIndex === questions.length - 1) {
            currentUser.history[currentUser.history.length - 1].countRightAnswers = correctAnswersCounter;
            navigate("/history")
        }
        setSelectedAnswer('');
        setQuestionIndex(questionIndex + 1);
    }

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h5>Error: {error}</h5>;
    }

    if (questions && questions.length > 0 && questions[questionIndex]) {
        return (
            <div className='mainSize bg-light w-50 mt-5 p-5 rounded-4 position-relative'>
                <h2 className='countOfQuestions text-primary'>{questionIndex + 1}/{questions.length}</h2>
                <h3>{he.decode(questions[questionIndex].category)}</h3>
                <p>{he.decode(questions[questionIndex].question)}</p>
                {shuffledAnswers.map((answer, index) => (
                    <div key={index}>
                        <input
                            type='radio'
                            value={answer}
                            onChange={(event) => setSelectedAnswer(event.target.value)}
                            name='answer'
                            checked={selectedAnswer === answer}
                        />
                        <label className='m-2'>{he.decode(answer)}</label>
                    </div>
                ))}
                <button className='btn btn-primary' onClick={buttonClickHandler}>Next</button>
            </div>
        );
    } else {
        return (
            <div className='mainSize bg-light w-50 mt-5 p-5 rounded-4 position-relative'>
                <p>No questions available. Try choosing a different category or reducing the number of questions.</p>
                <Link to="/quizOptions" className="btn btn-primary mt-3">Go Back to Quiz Options</Link>
            </div>
        );
    }
}

export default Quiz;
