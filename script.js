function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b==0){
        alert("Invalid")
    }
    return a/b;
}
var firstNumber
var secondNumber
var operator
var keys = 

function operate(firstNumber,secondNumber,operator){

        switch (operator) {
            case "+":
                add(firstNumber,secondNumber);
                break;
            case "-":
                subtract(firstNumber,secondNumber);
                break;
            case "*":
                multiply(firstNumber,secondNumber);
                break;
            case "/":
                divide(firstNumber,secondNumber);
                break;
            default:
                alert("Try again");
                break;
        }
}