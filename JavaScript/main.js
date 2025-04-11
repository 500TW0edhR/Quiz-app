const questions = [
    {
        question: "白アリはアリではありません。何の仲間でしょうか？",
        answers : [
            { text: "ダニ", correct: false},
            { text: "ゴキブリ", correct: true},
            { text: "蛾", correct: false},
        ]
    },
    {
        question: "手に付いた油性ペンを落とすものは何でしょうか？",
        answers : [
            { text: "ハンドクリーム", correct: true},
            { text: "水溶き片栗粉", correct: false},
            { text: "ミカンの皮", correct: false},
        ]
    },
    {
        question: "駅のキヨスクはトルコ語ですが、何を意味する言葉でしょうか？",
        answers : [
            { text: "茶屋", correct: false},
            { text: "お菓子屋", correct: false},
            { text: "あずま屋", correct: true},
        ]
    },
    {
        question: "茨城県には日本一の大きさがあるものがあります。何でしょうか？",
        answers : [
            { text: "市", correct: false},
            { text: "お寺", correct: false},
            { text: "大仏", correct: true},
        ]
    },
    {
        question: "あるものを入れて足湯をすると足の臭いが軽減できます。あるものとは何でしょうか？",
        answers : [
            { text: "重曹", correct: true},
            { text: "小麦粉", correct: false},
            { text: "片栗粉", correct: false},
        ]
    }
];

// 要素の取得
const questionColumn = document.getElementById("question_column");
const answerButton = document.getElementById("answer_buttons");
const nextQuestion = document.getElementById("next_question");

// クイズの状態を管理する変数
let currentQuestionIndex = 0;
let score = 0;

// クイズ開始用関数
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextQuestion.innerHTML = "Next";
    showQuestion();
}

// 質問を表示する関数
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionColumn.innerHTML = questionNo + ". " + currentQuestion.question;

    // 現在の質問の選択肢を一つずつ処理
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        // 正しい回答の場合、ボタンにcorrect:trueを設定
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

// 前の質問に関係するものをリセットする
function resetState() {
    nextQuestion.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

// 解答が選択された時の処理
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    // 各解答ボタンをループで処理
    // 正しければcorrectのクラス名を追加し他のボタンを選択不可にする
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // nextのボタンを表示
    nextQuestion.style.display = "block";
}

// クイズ終了時にスコアを表示する
function showScore() {
    // 状態をリセット
    resetState();
    // 結果の表示
    questionColumn.innerHTML = `あなたの正解は ${questions.length} 問中 ${score} 問です`;
    // スコア表示時にボタンの表示内容を変更
    nextQuestion.innerHTML = "もう一度挑戦する";
    // ボタンを表示
    nextQuestion.style.display = "block"

}

// nextのボタンが押された時の処理
function handleNextButton() {
    // 次の質問へインクリメント
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        // 次の質問を表示
        showQuestion();
    }
    else {
        // 全ての質問が終了後に表示
        showScore();
    }
}


// nextのボタンがクリックされた場合の処理
nextQuestion.addEventListener("click", () => {
    // まだ問題が残っていれば次の問題の表示を呼び出す
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        // クイズをリスタート
        startQuiz();
    }
});

// 最初にクイズを開始する
startQuiz();
