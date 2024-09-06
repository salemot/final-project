function startGame() {
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;

    if (!team1 || !team2) {
        alert('يرجى إدخال أسماء الفريقين');
        return;
    }

    const categoriesParam = encodeURIComponent(selectedCategories.join(','));
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    localStorage.setItem('team1', team1);
    localStorage.setItem('team2', team2);

    const url = `questions.html?categories=${categoriesParam}&team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`;
    window.location.href = url;
}
