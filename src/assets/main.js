function setHiddenFields() {
    answer = Math.floor(Math.random() * 10000).toString();
    while(answer.length < 4) {
            answer = "0" + answer;
        }
    document.getElementById('answer').value = answer;
}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
    if(input.length != 4) {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    } else
        return true;
}

function getResults(input) {
    let answer = document.getElementById('answer').value;
    let correct = 0;
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for(i = 0; i < input.length; i++)
    {
        if(input.charAt(i) == answer.charAt(i))
        {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';

    document.getElementById('results').innerHTML += html;
    return correct;
}

function showAnswer(result) {
    let answer = document.getElementById('answer').value;
    let code = document.getElementById('code');
    if (result) {
        code.className += " success";
        code.innerHTML = answer;
    } else {
        code.className += " failure";
        code.innerHTML = answer;
    }
}

function showReplay() {
    document.getElementById('guessing-div').style = "display:none";
    document.getElementById('replay-div').style = "display:block";
}


function guess(){
    let answer = document.getElementById('answer').value;
    let attempt = document.getElementById('attempt').value;
    let input = document.getElementById('user-guess').value;
    let results = document.getElementById('results');

    setMessage("");

    if(answer == "") {
        setHiddenFields();
    }
    if(attempt == "") {
        attempt = 0;
    }

    if(!validateInput(input)) {
        setMessage('Guesses must be exactly 4 characters long.');
        return;
    } else {
        attempt++;
        document.getElementById('attempt').value = attempt;
    }

    correct = getResults(input);

    if(correct == input.length) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if(attempt >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}