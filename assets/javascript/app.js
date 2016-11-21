// Initiate the trivia game
$(document).ready(function() {

//======================================================
//Declare the variables to be used
var timer = $("#spanTime").html();
var progress = $("#progress"),
progressKeeper = $("#progressKeeper"),
notice = $("#notice"),
progressWidth = 548,
userAnswers = [],
questionsStatus = $("#questionNumber"),
questionsList = $(".question");
var trivia = { answers: ['c', 'a', 'c', 'a', 'c', 'a', 'c', 'b', 'd', 'a'] },
answers = trivia.answers,
questionLength = answers.length;

//==========================================================
// Create file to reset Game
$('.resetButton').click(function () {
    location.reload();
})

//==========================================================
//Creating some helper functions
function roundReloaded(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

//==============================================================
//Creating function to make it possible for user to select only one radio button at a time
$('input[type=radio]').prop('checked', false);
$('input[type=radio]').on('change', function(){
    $('input[type=radio]').not(this).prop('checked', false);
});

//==================================
function timeUp() {
    $("#overlayTimeup").show();
    $("#overlay-contentTimeup").show();
    setTimeout(function() {
        $("#overlayTimeup").fadeOut();
    }, 5000);
    $('#spanTime').html('00:00');
}
//================================

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
//======================================================================
//===================================================================
//Construct comments on final performance
function finalPerformance(score) {
    var returnString;
    if (score === 100) returnString = "Awesome!";
    else if ((score > 90) && (score < 100)) returnString = "Great!";
    else if ((score > 70) && (score <= 90)) returnString = "Doff my hat!";
    else if ((score > 50) && (score <= 70)) returnString = "mmmh!";
    else if ((score > 35) && (score <= 50)) returnString = "Go back to school!";
    else if ((score > 20) && (score <=  35)) returnString = "Go do something else!";
    else returnString = "We need to talk!";
    return returnString;
}
//======================================================================
//function to calculate final scores
function calculate() {
    progressKeeper.hide();
    var results = checkAnswers(),
    resultSet = '',
    trueCount = 0,
    answerKey = ' Answers <br>',
    score;
    for (var i = 0, ii = results.length; i < ii; i++) {
        if (results[i] == true) trueCount++;
        resultSet += '<div class="resultRow"> Question #'+ (i + 1) + (results[i] == true ? "<div class='correct'><span>Correct</span></div>": "<div class='wrong'><span>Wrong</span></div>") + "</div>";
        answerKey += (i+1) +" : "+ answers[i] + ' &nbsp;  &nbsp;  &nbsp;   ';
    }
    score = roundReloaded(trueCount / questionLength * 100, 2);
    answerKey += "<div id='answer-key'>" + answerKey + "</div>";
    
    resultSet = '<h2 class="resultTitle">' +  finalPerformance(score) + ' You scored '+ score +'%</h2>' + resultSet + answerKey;
    $('#resultKeeper').html(resultSet).show();
    $(this).parents('.questionContainer').fadeOut(500, function () {
        $(this).next().fadeIn(500);
    });
    return false;
    progressKeeper.hide();
    notice.hide();
    $("#main-question-holder input:radio").attr("checked", false)
    $('.answers li input').click(function() {
        $(this).parents('.answers').children('li').removeClass("selected");
        $(this).parents('li').addClass('selected');
    });
}
//========================================================================
//function to stop timer when game is over
function stopTimer(){
    var gameTimer;
    gameTimer = setInterval()
 if (userAnswers.length === questionLength){
    clearInterval(gateTimer);
 }   
}
    
//=================================================================
//Click the start image to start the game
$('.startClick').click(function () {
    setInterval(function () {
        var timer = $('#spanTime').html(); // Write the timer on the html page
        timer = timer.split(':'); // convert the timer string to an array holding minutes and seconds
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        seconds -= 1;
        if ((minutes < 0) && (seconds <= 0)) return clearInterval(timer);
        if (minutes < 10 && minutes.length != 2) minutes = '0' + minutes;
        if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
            seconds >=0;
        } else if (seconds < 10 && seconds.length != 2)
        seconds = '0' + seconds;
        $('#spanTime').html(minutes + ':' + seconds);
        if (minutes == 0 && seconds == 0) clearInterval();
    }, 1000);
    $(this).parents('.questionContainer').fadeOut(500, function() { 
        $(this).next().fadeIn(500, function(){ progressKeeper.show();
        });
        setTimeout(timeUp, 1000 * 2 * 60);
        return false;
    });
    //Create click function to automatically transit from one question to the other
$('input[type="radio"]').change(function(){
    var tempArr = $('input[type=radio]:checked');
    for (var i = 0, ii = tempArr.length; i < ii; i++) {
        userAnswers.push(tempArr[i].getAttribute('data-key'));
    }
    calculate();
    //stopTimer();
    if (answers[userAnswers.length-1] == userAnswers[userAnswers.length-1]) {
        $.fn.center = function () {
            this.css("position", "absolute");
            this.css("top", Math.max(0, (
                ($(window).height() - $(this).outerHeight()) / 2) + 
            $(window).scrollTop()) + "px" );
            this.css("left", Math.max(0,
                ( ($(window).width() - $(this). outerWidth()) / 2) + 
                $(window).scrollLeft()) + "px" );
            return this;
        }
        $("#overlay").show();
        $("#overlay-content").show().center();
        setTimeout(function() {
            $("#overlay").fadeOut();
        }, 5000);
        notice.hide();
        $(this).parents('.questionContainer').fadeOut(500, function () {
            $(this).next().fadeIn(500);
        });
        progress.animate({
            width: progress.width() + Math.round(progressWidth/questionLength), }, 500 );
        return false;
        
    } else {
        $.fn.center = function () {
            this.css("position", "absolute");
            this.css("top", Math.max(0, (
                ($(window).height() - $(this).outerHeight()) / 2) + 
            $(window).scrollTop()) + "px" );
            this.css("left", Math.max(0,
                ( ($(window).width() - $(this). outerWidth()) / 2) + 
                $(window).scrollLeft()) + "px" );
            return this;
        }
        $("#overlaywrong").show();
        $("#overlay-content-wrong").show().center();
        setTimeout(function() {
            $("#overlaywrong").fadeOut();
        }, 5000);
        notice.hide();
        $(this).parents('.questionContainer').fadeOut(500, function () {
            $(this).next().fadeIn(500);
        });
        progress.animate({
            width: progress.width() + Math.round(progressWidth/questionLength), }, 500 );
        return false;
};
});
});
});

//======================================================================================