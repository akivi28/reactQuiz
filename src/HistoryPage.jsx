import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
    const { currentUser } = useSelector((state) => state.currentUser);
    const { categories } = useSelector((state) => state.categories);
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('dateDesc');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const findCategoryName = (id) => {
        const findCategory = categories.find((category) => {
            return category.id === parseInt(id);
        });
        return findCategory ? findCategory.name : 'any';
    };

    const sortedHistory = currentUser?.history?.sort((a, b) => {
        if (sortOrder === 'dateDesc') {
            return new Date(b.timeOfQuiz) - new Date(a.timeOfQuiz);
        } else if (sortOrder === 'dateAsc') {
            return new Date(a.timeOfQuiz) - new Date(b.timeOfQuiz);
        } else if (sortOrder === 'scoreDesc') {
            return b.countRightAnswers - a.countRightAnswers;
        } else if (sortOrder === 'scoreAsc') {
            return a.countRightAnswers - b.countRightAnswers;
        }
        return 0;
    });

    const filteredHistory = selectedCategory === 'all' ? sortedHistory : sortedHistory?.filter((elem) => elem.quizCategory === selectedCategory);

    return (
        <div className="mainSize bg-light rounded-4 mt-5 p-5">
            <div className="d-flex mb-3">
                <select className="form-select me-3" onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="dateDesc">by date descending</option>
                    <option value="dateAsc">by date ascending</option>
                    <option value="scoreDesc">by score descending</option>
                    <option value="scoreAsc">by score ascending</option>
                </select>

                <select className="form-select" onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="all">All</option>
                    <option value="any">Any</option>
                    {categories.map((elem) => (
                        <option key={elem.id} value={elem.id}>
                            {elem.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {filteredHistory?.map((elem, ind) => (
                    <div key={ind} className="historyItem mb-3">
                        <h2 className="historyScore">{elem.countRightAnswers}/{elem.quizCountOfQuestions}</h2>
                        <div className="catDif">
                            <p>Quiz type: {elem.quizType}</p>
                            <p>Difficulty: {elem.quizDifficulty}</p>
                        </div>
                        <div className="typeDat">
                            <p>Category: {findCategoryName(elem.quizCategory)}</p>
                            <p>Date and time: {new Date(elem.timeOfQuiz).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                hour12: false
                            })}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryPage;
