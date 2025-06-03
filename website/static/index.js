$(document).ready(function() {
    let currentQuestion = 1;
    let totalQuestion = 17;
    var idNum = getUrlParameter('id');

    updateQuestNum();
    loadQuestions();

    function updateQuestNum(){
        $('#numQuestion').text('HRA Questions ' + currentQuestion + '/' + totalQuestion);
    }

    function getUrlParameter(name) {
        // Create a new URLSearchParams object using window.location.search
        let params = new URLSearchParams(window.location.search);

        // Return the value associated with the given query parameter
        return params.get(name);
    }

     $(".btn-next").click(function(){
        var currentQuestionElem = $(this).closest('.container');

        var questionNumber = currentQuestionElem.attr('id');
    
        //handleNextQuestion(questionNumber, questionNumber + 'N');
        
        if ($("input[name='" + questionNumber + 'N' + "']:checked").length > 0 || $("#Q1-15").val().length>0) {
            var nextQuestion = $(this).data('next');
            $(this).closest('.container').addClass('d-none');
            $('#' + nextQuestion).removeClass('d-none');
            currentQuestion++;
            console.log(nextQuestion);
            updateQuestNum(); // Update the current question number
            
        }
        else {
            // Show alert if no option is selected
            $("#alertMessage").show();
            setTimeout(function() {
                $("#alertMessage").fadeOut();
            }, 3000);
        }

        // if($("Q2-16").val().length>0){
        //     var currentQuestionElem = $(this).closest('ending');
        // }
       
    })   

    $("#btnNext16").click(function(){        
        var currentQuestionElem = $(this).closest('.container');
        var questionNumber = currentQuestionElem.attr('id');

        if ($("input[name='" + questionNumber + 'N' + "']:checked").val = "NoEmail") {
           alert(questionNumber)
            var nextQuestion = $(this).data('next');
            $(this).closest('.container').addClass('d-none');
        $('#ending').removeClass('d-none');        
        updateQuestNum();
    }
    }) 


    $(".btn-prev").click(function(){
        var prevQuestion = $(this).data('prev');

        $(this).closest('.container').addClass('d-none');

        $('#' + prevQuestion).removeClass('d-none');
        currentQuestion--;
        updateQuestNum();
    }) 
    
    $("#btnSubmit").click(function(){
        
        let formData = {
            name: $("#userName").html(),
            question1: [],
            question2: $('input[name="question2N"]:checked').val(),
            question3: [],
            question4: $('input[name="question4N"]:checked').val(),
            question5: $('input[name="question5N"]:checked').val(),
            question6: $('input[name="question6N"]:checked').val(),
            question7: $('input[name="question7N"]:checked').val(),
        }
        
        $('input[name="question1N"]:checked').each(function() {
            formData.question1.push($(this).val());
        });

        $('input[name="question3N"]:checked').each(function() {
            formData.question3.push($(this).val());
        });
        console.log(JSON.stringify(formData))
        alert(JSON.stringify(formData))
        $.ajax({
            url: '/submitQuestions',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response){
                alert("HRA Successfully submitted" + response)
            },
            error: function(error){
                console.log('Error:', error);
            }
        })
   
        // question2: $('input[name="question1N"]:checked').val
    })
    $("#btnUpdate").click(function(){
        
        $.ajax({
            url: '/updateQuestions',
            type: 'POST',
            contentType: 'application/json',
            // data: JSON.stringify(formData),
            success: function(response){
                alert("HRA Successfully submitted" + response)
            },
            error: function(error){
                console.log('Error:', error);
            }
        })
   
        // question2: $('input[name="question1N"]:checked').val
    })
    function loadQuestions(){

        let formData = {
            idQ: idNum
        }
        $.ajax({
            url: '/loadQuestions',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response){
               
                let lastQuestion = 0;
                $.each(response, function(questionKey, value){
                    let questionNumber = parseInt(questionKey.replace('question', ''), 10);

                    if(questionNumber > lastQuestion){
                        lastQuestion = questionNumber;
                    }
                });
                
                var nextQuestionNumber = lastQuestion + 1;
                $('#question1').addClass('d-none');  // Hide all questions 
                $('#question' + nextQuestionNumber).removeClass('d-none');
                currentQuestion = nextQuestionNumber;
                updateQuestNum();
            },
            error: function(error){
                console.log('Error:', error);
            }
        })
    }
});
