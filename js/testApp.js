document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-button');
    const clearBtn = document.getElementById('clear-button');
    const resultSection = document.getElementById('result-section');

  
    const textAnswers = {
        q1: ["prompt", "prompt()"],
        q2: ["confirm", "confirm()"],
        q3: ["break"],
        q4: ["typeof"],
        q5: ["3"],
        q6: ["window", "object window"]
    };

    submitBtn.addEventListener('click', function() {
        let score = 0;
        let totalQuestions = 30; 
        let incorrectQuestions = [];

        for (let i = 1; i <= totalQuestions; i++) {
            let questionId = 'q' + i;
            let isCorrect = false;

            let singleElement = document.getElementById(questionId);
            
            if (singleElement) {
         
                if (singleElement.tagName === 'SELECT') {
                    let selectedOption = singleElement.options[singleElement.selectedIndex];
                    if (selectedOption && selectedOption.getAttribute('data-correct') === 'true') {
                        isCorrect = true;
                        singleElement.style.border = "2px solid green";
                    } else {
                        singleElement.style.border = "2px solid red";
                    }
                } 
             
                else if (singleElement.tagName === 'INPUT' && singleElement.type === 'text') {
                    let userAnswer = singleElement.value.trim().toLowerCase();
                    if (textAnswers[questionId] && textAnswers[questionId].includes(userAnswer)) {
                        isCorrect = true;
                        singleElement.style.border = "2px solid green";
                    } else {
                        singleElement.style.border = "2px solid red";
                    }
                }
            } 
      
            else {
                let inputs = document.querySelectorAll(`input[name="${questionId}"]`);
                if (inputs.length > 0) {
                    let inputType = inputs[0].type;

                    if (inputType === 'radio') {
                        let selected = document.querySelector(`input[name="${questionId}"]:checked`);
                        if (selected && selected.getAttribute('data-correct') === 'true') {
                            isCorrect = true;
                        }
                    } else if (inputType === 'checkbox') {
                      
                        let allCorrectChecked = true;
                        let noIncorrectChecked = true;
                        let atLeastOneChecked = false;

                        inputs.forEach(input => {
                            let shouldBeChecked = input.getAttribute('data-correct') === 'true';
                            if (input.checked) atLeastOneChecked = true;
                            
                            if (shouldBeChecked && !input.checked) allCorrectChecked = false;
                            if (!shouldBeChecked && input.checked) noIncorrectChecked = false;
                        });

                        if (atLeastOneChecked && allCorrectChecked && noIncorrectChecked) {
                            isCorrect = true;
                        }
                    }
                }
            }

            if (isCorrect) {
                score++;
            } else {
                incorrectQuestions.push(i);
            }
        }

        resultSection.style.display = 'block';
        let percentage = (score / totalQuestions * 100).toFixed(0);
        let message = '';
        let color = '';

        if (score === totalQuestions) {
            message = "Идеально! Вы сеньор-разработчик!";
            color = "#006400"; 
        } else if (score >= 25) {
            message = "Отличный результат! Уверенные знания.";
            color = "green";
        } else if (score >= 15) {
            message = "Неплохо, но есть пробелы в теории.";
            color = "#b8860b"; 
        } else {
            message = "Нужно повторить материал.";
            color = "#8b0000"; 
        }

        resultSection.innerHTML = `
            <h3>Результат экзамена:</h3>
            <p>Верных ответов: <b>${score}</b> из <b>${totalQuestions}</b></p>
            <p>Результативность: <b>${percentage}%</b></p>
            <hr style="border-top: 1px dashed #333; margin: 15px 0;">
            <p style="color: ${color}; font-weight: bold; font-size: 18px;">${message}</p>
        `;

        resultSection.scrollIntoView({ behavior: 'smooth' });
    });


    clearBtn.addEventListener('click', function() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.type === 'text') {
                input.value = '';
                input.style.border = '1px solid #333';
            } else {
                input.checked = false;
            }
        });

        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0; 
            select.style.border = '1px solid #333';
        });

        resultSection.style.display = 'none';
        resultSection.innerHTML = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});