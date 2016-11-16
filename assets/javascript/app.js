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
	}, 1000);

    $(this).parents('.questionContainer').fadeOut(500, function(){ 
        $(this).next().fadeIn(500, function(){ progressKeeper.show(); }); 
    }); 
         return false; 
	});
  
  })