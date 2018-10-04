var data;

/*Da wo 'Cookie' dransteht, kann der
Wert dem Cookie entnommen werden.*/

/*Beim Start des Spiels
(findet verm. schon bei der Weiteleitung statt)
Das BE vergibt dann eine GameID und schreibt die
in einen Cookie*/
data = {
    username: 'Testuser'
}

//Bei Beantworten einer Frage
data = {
    gameId: 1,  //Cookie
    questionId: 2,
    answer: true
}

//Bei Abschluss des Spiels
data = {
    gameId: 1,   //Cookie
    score: 999,
    time: "00:05:43"
}
