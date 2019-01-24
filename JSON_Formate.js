var data;
var request;
var response;
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

//GET init
response = 0;

//POST scores
request = {
    max: 0,
};

response = {
    scores: [
        {
            user: '',
            score: 0,
            time: '00:00:00',
        }
    ]
};

    //POST start-game
    request = {
        gameId: 0,
        username: '',
    };

    response = {
        success: false,
    };

    //POST answer
    request = {
        gameId: 0,
        questionId: 0,
        answer: 0,
    };

    response = {
        success: false,
    };

    //POST end-game
    request = {
        gameId: 0,
        score: 0,
        time: '00:00:00',
    };

    response = {
        success: false,
    };

    //GET analyse
    response = {
        player: {
            totalPlayers: 0,
            finishedPercent: 0,
        },
        question: [
            {
                id: '',
                totalAnswers: 0,
                correctPercent: 0,
                falsePercent: 0,
                noAnswerPercent: 0,
            }
        ],
    };