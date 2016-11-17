// Initiate the trivia game
  $(document).ready(function() {

  	//Declare all the variables to be used
  	var timer = $('span').html();
  	var progress = $('#progress'), 
    progressKeeper = $('#progressKeeper'), 
    notice = $("#notice"), 
    progressWidth = 548, 
    userAnswers = [], 
    questionsStatus = $("#questionNumber") 
    questionsList = $(".question");
    var trivia = { answers: ['c', 'a', 'c', 'a', 'c', 'a', 'c', 'b', 'd', 'c'] },
    answers = trivia.answers,
    questionLength= answers.length

    //Creating some helper functions
    function roundReloaded(num, dec) { 
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec); 
    return result; 
  	}

  	//comment on final performance
  	function finalPerformance(score) { 
    var returnString; 
        if (score==100) returnString = "Awesome!"
        else if (score>90) returnString = "Great!"
        else if (score>70) returnString = "Doff my hat!"
        else if (score>50) returnString = "mmmh!"
        else if (score>35) returnString = "Go back to school!"
        else if (score>20) returnString = "Go do something else!"
        else returnString = "We need to talk!"
    	return returnString; 
	}
	// function to compare answers assigned with the users answer
	function checkAnswers() { 
    var resultArr = [],  
                flag = false; 
    for (i=0; i<answers.length; i++) { 
        if (answers[i] == userAnswers[i]) { 
            flag = true; 
        } 
        else { 
            flag = false; 
        } 
        resultArr.push(flag); 
    	} 
    return resultArr; 
	}

	$('.startClick').click(function(){ 
	setInterval(function() {
    // Write the timer on the html page
    var timer = $('#spanTime').html();
    // convert the timer string to an array holding minutes and seconds
    timer = timer.split(':');
    var minutes = timer[0];
    var seconds = timer[1];
    seconds -= 1;
    if (minutes < 0) return;

    if (seconds < 0 && minutes != 0) {
        minutes -= 1;
        seconds = 59;
    }
    else if (seconds < 10 && seconds.length != 2) seconds = '0' + seconds;
        if (minutes < 10 && minutes.length != 2) minutes = '0' + minutes
        $('#spanTime').html(minutes + ':' + seconds); 
    	if (parseInt(minutes, 02) == 0 && parseInt(seconds, 00) == 0)
        clearInterval(interval);
	}, 1000);

    $(this).parents('.questionContainer').fadeOut(500, function(){ 
        $(this).next().fadeIn(500, function(){ progressKeeper.show(); }); 
    }); 
         return false; 
	});

  	$('.btnPrev').click(function(){ 
        notice.hide(); 
    $(this).parents('.questionContainer').fadeOut(500, function(){ 
        $(this).prev().fadeIn(500) 
    }); 
    progress.animate({ width: progress.width() - Math.round(progressWidth/questionLength), }, 500 ); 
         return false; 
	});
	$('.btnNext').click(function(){ 
        var tempCheck = $(this).parents('.questionContainer').find('input[type=radio]:checked'); 
    if (tempCheck.length == 0) { 
         notice.fadeIn(300);return false; 
    } 
         notice.hide(); 
    $(this).parents('.questionContainer').fadeOut(500, function(){ 
        $(this).next().fadeIn(500); 
    }); 
    progress.animate({ width: progress.width() + Math.round(progressWidth/questionLength), }, 500 ); 
         return false; 
});
	$('.btnShowResult').click(function(){ 
	// Stuff goes in here
	var tempCheck = $(this).parents('.questionContainer').find('input[type=radio]:checked'); 
	if (tempCheck.length == 0) { 
     notice.fadeIn(300);return false; 
	} 
	var tempArr = $('input[type=radio]:checked'); 
	for (var i = 0, ii = tempArr.length; i < ii; i++) { 
    userAnswers.push(tempArr[i].getAttribute('data-key')); 
    progressKeeper.hide(); 
	var results = checkAnswers(),  
              resultSet = '', 
              trueCount = 0, 
              answerKey = ' Answers <br />', 
              score;
	for (var i = 0, ii = results.length; i < ii; i++){ 
    if (results[i] == true) trueCount++; 
    resultSet += '<div class="resultRow"> Question #' + (i + 1) + (results[i]== true ? "<div class='correct'><span>Correct</span></div>": "<div class='wrong'><span>Wrong</span></div>") + "</div>"; 
    answerKey += (i+1) +" : "+ answers[i] +' &nbsp;  &nbsp;  &nbsp;   '; 
score =  roundReloaded(trueCount / questionLength*100, 2);
answerKey = "<div id='answer-key'>" + answerKey + "</div>"; 
resultSet = '<h2 class="qTitle">' +judgeSkills(score) + ' You scored '+score+'%</h2>' + resultSet + answerKey; 
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
$("#main-quiz-holder input:radio").attr("checked", false);
 
$('.answers li input').click(function() { 
    $(this).parents('.answers').children('li').removeClass("selected"); 
    $(this).parents('li').addClass('selected'); 
});

 })