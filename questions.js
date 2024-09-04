// questions.js

document.addEventListener('DOMContentLoaded', function() {
    // قراءة معلمات URL
    const params = new URLSearchParams(window.location.search);
    const team1 = params.get('team1');
    const team2 = params.get('team2');
    const categories = params.get('categories').split(',');

    // تعيين أسماء الفرق
    document.getElementById('team1Name').textContent = `فريق 1: ${team1}`;
    document.getElementById('team2Name').textContent = `فريق 2: ${team2}`;

    // تعيين الأزرار حسب الفئات
    const questionsContainer = document.getElementById('questionsContainer');
    
    categories.forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.classList.add('btn', 'btn-primary');
        categoryButton.textContent = category;
        categoryButton.addEventListener('click', function() {
            showQuestionsForCategory(category);
        });
        questionsContainer.appendChild(categoryButton);
    });

    function showQuestionsForCategory(category) {
        const questions = getQuestionsForCategory(category);
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-section');

        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = `فئة: ${category}`;
        questionContainer.appendChild(categoryHeader);

        const questionList = document.createElement('ul');
        questions.forEach((question, index) => {
            const questionItem = document.createElement('li');
            questionItem.textContent = `سؤال ${index + 1}: ${question}`;
            questionList.appendChild(questionItem);
        });

        questionContainer.appendChild(questionList);
        questionsContainer.innerHTML = ''; // مسح الأزرار السابقة
        questionsContainer.appendChild(questionContainer);
    }

    function getQuestionsForCategory(category) {
        // يمكنك تخصيص الأسئلة لكل فئة هنا
        const questions = {
            'من اللاعب': ['سؤال 1 من من اللاعب', 'سؤال 2 من من اللاعب', 'سؤال 3 من من اللاعب'],
            'اعلام': ['سؤال 1 من اعلام', 'سؤال 2 من اعلام', 'سؤال 3 من اعلام'],
            'معلومات عامه': ['سؤال 1 من معلومات عامه', 'سؤال 2 من معلومات عامه', 'سؤال 3 من معلومات عامه'],
            'اسلاميات': ['سؤال 1 من اسلاميات', 'سؤال 2 من اسلاميات', 'سؤال 3 من اسلاميات'],
            'من سجل الهدف': ['سؤال 1 من من سجل الهدف', 'سؤال 2 من من سجل الهدف', 'سؤال 3 من من سجل الهدف'],
            'امثال كويتيه': ['سؤال 1 من امثال كويتيه', 'سؤال 2 من امثال كويتيه', 'سؤال 3 من امثال كويتيه'],
            'مقتطفات من افلام': ['سؤال 1 من مقتطفات من افلام', 'سؤال 2 من مقتطفات من افلام', 'سؤال 3 من مقتطفات من افلام']
        };
        return questions[category] || [];
    }
});
