document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const team1 = params.get('team1') || 'فريق 1';
    const team2 = params.get('team2') || 'فريق 2';
    const categories = params.get('categories') ? params.get('categories').split(',') : [];

    // تعيين أسماء الفرق
    document.getElementById('team1Name').textContent = `فريق 1: ${team1}`;
    document.getElementById('team2Name').textContent = `فريق 2: ${team2}`;

    // قراءة الحالة المخزنة من localStorage
    const storedState = localStorage.getItem('gameState');
    const state = storedState ? JSON.parse(storedState) : {
        selectedCategory: null,
        selectedQuestion: null,
        team1Points: 0,
        team2Points: 0
    };

    // عرض الفئات
    displayCategories(categories);

    // إذا كانت هناك فئة مختارة، عرض الأسئلة
    if (state.selectedCategory) {
        showQuestionsForCategory(state.selectedCategory, state.selectedQuestion);
    }

    function displayCategories(categories) {
        const categoriesContainer = document.getElementById('categories');
        categoriesContainer.innerHTML = ''; // Clear previous categories

        categories.forEach(category => {
            const categoryButton = document.createElement('button');
            categoryButton.classList.add('btn', 'btn-primary', 'm-2');
            categoryButton.textContent = category;
            categoryButton.addEventListener('click', function() {
                state.selectedCategory = category;
                localStorage.setItem('gameState', JSON.stringify(state));
                showQuestionsForCategory(category);
            });
            categoriesContainer.appendChild(categoryButton);
        });
    }

    function showQuestionsForCategory(category, selectedQuestion = null) {
        const questions = getQuestionsForCategory(category);
        const questionList = document.createElement('div');

        questions.forEach((question) => {
            const questionButton = document.createElement('button');
            questionButton.classList.add('btn', 'btn-secondary', 'm-2');
            questionButton.textContent = `${question.points} نقطة`;
            questionButton.addEventListener('click', function() {
                state.selectedQuestion = question;
                localStorage.setItem('gameState', JSON.stringify(state));
                showQuestionDetail(question);
            });
            questionList.appendChild(questionButton);
        });

        document.getElementById('categoryContainer').style.display = 'none';
        document.getElementById('mainView').style.display = 'block';
        document.getElementById('questionsContainer').innerHTML = '';
        document.getElementById('questionsContainer').appendChild(questionList);

        if (selectedQuestion) {
            showQuestionDetail(selectedQuestion);
        }
    }

    function showQuestionDetail(question) {
        document.getElementById('questionText').textContent = question.text;
        document.getElementById('showAnswerButton').style.display = 'block';
        document.getElementById('answerContainer').style.display = 'none';
        document.getElementById('teamContainer').style.display = 'none';
        document.getElementById('questionContainer').style.display = 'block';
        document.getElementById('questionsContainer').style.display = 'none';

        document.getElementById('showAnswerButton').addEventListener('click', function() {
            document.getElementById('answerText').textContent = `الإجابة: ${question.answer}`;
            document.getElementById('answerContainer').style.display = 'block';
        });

        document.getElementById('showTeamButton').addEventListener('click', function() {
            document.getElementById('teamContainer').style.display = 'block';
            document.getElementById('teamPoints').textContent = `النقاط: ${question.points}`;
        });
    }

    function setTeam(team) {
        const points = state.selectedQuestion ? parseInt(state.selectedQuestion.points) : 0;

        document.getElementById('teamContainer').style.display = 'none';
        document.getElementById('questionContainer').style.display = 'none';
        document.getElementById('mainView').style.display = 'block';
        document.getElementById('categoryContainer').style.display = 'block';

        if (team === 'فريق 1') {
            state.team1Points += points;
        } else if (team === 'فريق 2') {
            state.team2Points += points;
        }

        localStorage.setItem('gameState', JSON.stringify(state));

        alert(`الفريق الذي حصل على النقاط هو: ${team}\nالنقاط التي حصل عليها: ${points}`);
    }

    function noTeam() {
        document.getElementById('teamContainer').style.display = 'none';
        document.getElementById('questionContainer').style.display = 'none';
        document.getElementById('mainView').style.display = 'block';
        document.getElementById('categoryContainer').style.display = 'block';

        alert('لم يحصل أي فريق على النقاط.');
    }

    function getQuestionsForCategory(category) {
        const questions = {
            "من اللاعب" : [
                { text: 'سؤال 1 من من اللاعب', answer: 'الإجابة 1', points: '300' },
                { text: 'سؤال 2 من من اللاعب', answer: 'الإجابة 2', points: '300' },
                { text: 'سؤال 3 من من اللاعب', answer: 'الإجابة 3', points: '500' },
                { text: 'سؤال 4 من من اللاعب', answer: 'الإجابة 4', points: '500' },
                { text: 'سؤال 5 من من اللاعب', answer: 'الإجابة 5', points: '600' },
                { text: 'سؤال 6 من من اللاعب', answer: 'الإجابة 6', points: '600' }
            ],
            'اعلام': [
                { text: 'سؤال 1 من اعلام', answer: 'الإجابة 1', points: '300' },
                { text: 'سؤال 2 من اعلام', answer: 'الإجابة 2', points: '300' },
                { text: 'سؤال 3 من اعلام', answer: 'الإجابة 3', points: '500' },
                { text: 'سؤال 4 من اعلام', answer: 'الإجابة 4', points: '500' },
                { text: 'سؤال 5 من اعلام', answer: 'الإجابة 5', points: '600' },
                { text: 'سؤال 6 من اعلام', answer: 'الإجابة 6', points: '600' }
            ],
            'معلومات عامه': [
                { text: 'سؤال 1 من معلومات عامه', answer: 'الإجابة 1', points: '300' },
                { text: 'سؤال 2 من معلومات عامه', answer: 'الإجابة 2', points: '300' },
                { text: 'سؤال 3 من معلومات عامه', answer: 'الإجابة 3', points: '500' },
                { text: 'سؤال 4 من معلومات عامه', answer: 'الإجابة 4', points: '500' },
                { text: 'سؤال 5 من معلومات عامه', answer: 'الإجابة 5', points: '600' },
                { text: 'سؤال 6 من معلومات عامه', answer: 'الإجابة 6', points: '600' }
            ],
            'اسلاميات': [
                { text: 'سؤال 1 من اسلاميات', answer: 'الإجابة 1', points: '300' },
                { text: 'سؤال 2 من اسلاميات', answer: 'الإجابة 2', points: '300' },
                { text: 'سؤال 3 من اسلاميات', answer: 'الإجابة 3', points: '500' },
                { text: 'سؤال 4 من اسلاميات', answer: 'الإجابة 4', points: '500' },
                { text: 'سؤال 5 من اسلاميات', answer: 'الإجابة 5', points: '600' },
                { text: 'سؤال 6 من اسلاميات', answer: 'الإجابة 6', points: '600' }
            ],
            'من سجل الهدف': [
                { text: 'سؤال 1 من من سجل الهدف', answer: 'الإجابة 1', points: '300' },
                { text: 'سؤال 2 من من سجل الهدف', answer: 'الإجابة 2', points: '300' },
                { text: 'سؤال 3 من من سجل الهدف', answer: 'الإجابة 3', points: '500' },
                { text: 'سؤال 4 من من سجل الهدف', answer: 'الإجابة 4', points: '500' },
                { text: 'سؤال 5 من من سجل الهدف', answer: 'الإجابة 5', points: '600' },
                { text: 'سؤال 6 من من سجل الهدف', answer: 'الإجابة 6', points: '600' }
            ],
            'امثال كويتيه': [
                { text: 'سؤال 1 من امثال كويتيه', answer: 'الإجابة 1', points: '300' },
                { text: 'سؤال 2 من امثال كويتيه', answer: 'الإجابة 2', points: '300' },
                { text: 'سؤال 3 من امثال كويتيه', answer: 'الإجابة 3', points: '500' },
                { text: 'سؤال 4 من امثال كويتيه', answer: 'الإجابة 4', points: '500' },
                { text: 'سؤال 5 من امثال كويتيه', answer: 'الإجابة 5', points: '600' },
                { text: 'سؤال 6 من امثال كويتيه', answer: 'الإجابة 6', points: '600' }
            ]
        };

        return questions[category] || [];
    }
});
// عند اختيار فئة، يتم تخزينها في localStorage
function selectCategory(category) {
    let selectedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || [];
    if (!selectedCategories.includes(category)) {
        selectedCategories.push(category);
        localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    }
}

