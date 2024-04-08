let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

//show history panel
let histIcon = document.querySelector('#histIcon');
let histPanel = document.querySelector('.history-box');
let frame = document.querySelector('.frame');
histIcon.onclick = () => {
    histIcon.classList.toggle('bx-x');
    histPanel.classList.toggle('show');
    frame.classList.toggle('show');
}

//call display
document.addEventListener("DOMContentLoaded", function() {
    //obtain element id to use for functions
    let displayInput = document.querySelector('input[name="display"]');
    let squareBtn = document.getElementById('square');
    let negateBtn = document.getElementById('negate');
    let sqrtBtn = document.getElementById('sqrt');
    let equalBtn = document.getElementById('equal');
    let acBtn = document.getElementById('all-Clear');

    //attach click event on button element
    squareBtn.addEventListener('click', squareOps);
    negateBtn.addEventListener('click', negateOps);
    sqrtBtn.addEventListener('click', sqrtOps);
    equalBtn.addEventListener('click', equalOps);
    acBtn.addEventListener('click', allClearOps);
    
    //perform x^2 operation
    function squareOps() {
        let curValue = parseFloat(displayInput.value);
        if(checkValue(curValue) && curValue != '') {
            let squareValue = Math.pow(curValue, 2);
            //check if total is < 6 decimal
            var regex = /\.\d{7,}/;
            if(!isNaN(squareValue)) {
                if(regex.test(squareValue)) {
                    displayInput.value = squareValue.toExponential(3);
                }
                else {
                    displayInput.value = squareValue;
                }
                let logHist = curValue.toString() + "&#178;";
                addLogs(logHist, displayInput.value);
            }
        }
    }

    //perform negation operation
    function negateOps() {
        let curValue = parseFloat(displayInput.value);
        let num = -1 * curValue;
        displayInput.value = num;
    }

    //perform sqrt ops
    function sqrtOps() {
        let curValue = parseFloat(displayInput.value);
        if(checkValue(curValue) && curValue != '') {
            let total = Math.sqrt(curValue);
            //check if total is < 6 decimal
            var regex = /\.\d{7,}/;
            if(!isNaN(total)) {
                if(regex.test(total)) {
                    //change to scientific notation with 3 decimal places
                    displayInput.value = total.toExponential(3);
                }
                else {
                    displayInput.value = total
                }
                //add to history panel
                let logHist = "&#8730;" + curValue.toString();
                addLogs(logHist, displayInput.value);
            }
        }
    }

    //perform equal ops
    function equalOps() {
        let curValue = displayInput.value;
        if(checkValue(curValue) && curValue.trim() != '') {
            let total = eval(curValue);
            //check if total is < 6 decimal
            var regex = /\.\d{7,}/;
            if(regex.test(total)) {
                displayInput.value = total.toExponential(3);
            }
            else {
                displayInput.value = total;
            }
            addLogs(curValue, displayInput.value);
        }
    }

    //check if value length is <= 14
    function checkValue(value) {
        if(value.toString.length <= 14) {
            return true;
        }
        else{
            window.alert("Length can't be more than 14");
            return false;
        }
    }

    //add logs to history panel
    function addLogs(log, total) {
        let history = document.getElementById('log-value');
        history.innerHTML += log + " = " + total + "<br><br>";
    }

    //perform All Clear History ops
    function allClearOps() {
        //clear display
        displayInput.value = '';
        //clear history
        let history = document.getElementById('log-value');
        history.innerHTML = '';
    }
});