
// Initiate the trivia game
$(document).ready(function() {

//Declare all the variables to be used
var timer = $("#spanTime").html();
var progress = $("#progress"),
progressKeeper = $("#progressKeeper"),
notice = $("#notice"),
progressWidth = 548,
userAnswers = [], 
questionsStatus = $("#questionNumber"),
questionsList = $(".question");
var trivia = { answers: ['c', 'a', 'c', 'a', 'c', 'a', 'c', 'b', 'd', 'c'] },
answers = trivia.answers,
questionLength = answers.length;

//Creating some helper functions
    function roundReloaded(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
    }

//comment on final performance
//if statements will work without the braces as long as there is only one return line in the string
function finalPerformance(score) {
    var returnString;
    if (score === 100) {
        returnString = "Awesome!";
    } else if (score > 90) {
        returnString = "Great!";
    } else if (score > 70) {
        returnString = "Doff my hat!";
    } else if (score > 50) {
        returnString = "mmmh!";
    } else if (score > 35) {
        returnString = "Go back to school!";
    } else if (score > 20) {
        returnString = "Go do something else!";
    } else {
        returnString = "We need to talk!";
       
    }
    return returnString;
}

// function to compare answers assigned with the users answer
function checkAnswers() {
    var i;
    var resultArr = [], 
        flag = false;
        for (i = 0; i < answers.length; i++) {
            if (answers[i] == userAnswers[i]) { 
                flag = true;
            } else {
                flag = false;
            }
            resultArr.push(flag);
        }
        return resultArr;
    }

$('.startClick').click(function () {
    var that = this
    var interval = setInterval(function () {
        var timer = $('#spanTime').html(); // Write the timer on the html page
        timer = timer.split(':'); // convert the timer string to an array holding minutes and seconds
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        seconds -= 1;
        if (minutes < 0) return clearInterval(interval);
            if (minutes < 10 && minutes.length != 2) minutes = '0' + minutes;
            if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                seconds = 59;
            } else if (seconds < 10 && seconds.length != 2)
            seconds = '0' + seconds;
            $('#spanTime').html(minutes + ':' + seconds);
            if (minutes == 0 && seconds == 0) clearInterval(interval);
        }, 1000);  

        //reassign this to another variable name. it is not showing up because it is inside. use that for this for instance    
        $(that).parents('.questionContainer').fadeOut(500, function() { 
        $(that).next().fadeIn(500, function(){ progressKeeper.show();
        });
        return false; 
});

setTimeout(timeUp, 1000 * 2 * 60);
function timeUp() {
     $('#spanTime').html('00:00');
   // $('#spanTime').html(Time is Up);
    alert('Your Time is Up');
}


$('.btnPrev').click(function (){
    notice.hide();
    $(this).parents('.questionContainer').fadeOut(500, function () {
        $(this).prev().fadeIn(500)
    });
progress.animate({ 
    width: progress.width() - Math.round(progressWidth / questionLength), 
}, 500 );
return false;
});
	
$('.btnNext').click(function (){
    var tempCheck = $(this).parents('.questionContainer').find('input[type=radio]:checked');
    if (tempCheck.length == 0) {
        notice.fadeIn(300);
        return false;    
    }
    //var answervalue = [];
    for (var i; i = 0; i < answers.length, i++);
            //answervalue.push(answers[i]);
        if ((answers[i] !== userAnswers[i])) {
        alert("Your answer is wrong " + "The correct answer is " + answers[i]);
    }

    notice.hide();
    $(this).parents('.questionContainer').fadeOut(500, function (){
        $(this).next().fadeIn(500);
    }); 
    progress.animate({ width: progress.width() + Math.round(progressWidth/questionLength), }, 500 ); 
         return false;
     });
});

$('.btnShowResult').click(function () {
    var tempCheck = $(this).parents('.questionContainer').find('input[type=radio]:checked');
    if (tempCheck.length == 0) {
        notice.fadeIn(300);
        return false;
    }
    var tempArr = $('input[type=radio]:checked');
    for (var i = 0, ii = tempArr.length; i < ii; i++) {
        userAnswers.push(tempArr[i].getAttribute('data-key'));
        progressKeeper.hide();
        var results = checkAnswers(),
        resultSet = '',
        trueCount = 0,
        answerKey = ' Answers <br>',
        score;
        for (var i = 0, ii = results.length; i < ii; i++){
            if (results[i] == true) trueCount++;
            resultSet += '<div class="resultRow"> Question #' + (i + 1) + (results[i] == true ? "<div class='correct'><span>Correct</span></div>": "<div class='wrong'><span>Wrong</span></div>") + "</div>";
            answerKey += (i+1) +" : "+ answers[i] +' &nbsp;  &nbsp;  &nbsp;   '; //&nbsp is non-breaking space
            score =  roundReloaded(trueCount / questionLength * 100, 2);
            answerKey = "<div id='answer-key'>" + answerKey + "</div>";
            resultSet = '<h2 class="qTitle">' +  finalPerformance(score) + ' You scored '+ score +'%</h2>' + resultSet + answerKey;
            $('#resultKeeper').html(resultSet).show();
            $(this).parents('.questionContainer').fadeOut(500, function(){
                $(this).next().fadeIn(500);
            });
            return false;
        }
    }
});

progressKeeper.hide();
notice.hide();
$("#main-question-holder input:radio").attr("checked", false);
$('.answers li input').click(function () {
    $(this).parents('.answers').children('li').removeClass("selected");
    $(this).parents('li').addClass('selected'); 
});
})