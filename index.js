const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator__display");
const keys = document.querySelector(".calculator__keys");
const operatorKeys = keys.querySelectorAll("[data-operator]");
var keyEntries= [];
var opEntries =[];

operatorKeys.forEach(opKey=> opKey.addEventListener("click", ()=>{
    
    operatorKeys.forEach(operatorkey => {
        return operatorkey.classList.remove("active");
    });
    opKey.classList.add("active");
}))

keys.addEventListener("click", e=>{
    const key = e.target;
    const keyValue = key.textContent;
    displayValue = display.textContent;
    const type = key.dataset.type;
    var { previousKeyType}= calculator.dataset;

    if (type == "number"){
        if ((display.textContent.includes(".") && keyValue == ".") ){
            return;
        }

        if (displayValue.length>= 22){
            if (previousKeyType != "operator"){
                return;
            }
        }

        if (display.textContent == "0" && keyValue =="."){
            display.textContent = "0" + keyValue;
        }

        if (display.textContent === "0" || previousKeyType === "operator" || previousKeyType ==="equal"){
            
            display.textContent = keyValue;
            display.style.fontSize = "3rem";
            
        }else{
            display.textContent = displayValue + keyValue;
        }

        if (display.textContent.length >=10){
            display.style.fontSize = "2rem";
        }
        if (display.textContent.length>=15){
            display.style.fontSize = "1.5rem"
        }
    }

    if (type == "clear"){
        display.style.fontSize = "3rem";
        display.textContent = "0";
        keyEntries =[];
        opEntries=[];
        calculator.dataset.operator="";
        operatorKeys.forEach(operatorkey => {
            operatorkey.classList.remove("active");
        })
    }

    if (type == "clear-single"){
        if (displayValue.length == 1){
            display.textContent = "0";
            display.style.fontSize = "3rem";
            keyEntries=[];
        } else{
            //display.textContent = displayValue.slice(0,-1);
            var view = displayValue.slice(0, -1);
            if (view.length < 10){
                display.style.fontSize = "3rem";
                display.textContent = view;
            } else if(view.length < 15){
                display.style.fontSize = "2rem";
                display.textContent = view;
            } else{
                display.textContent = view;
            }
        }    
    }

   if (type == "operator"){
        calculator.dataset.firstNum = displayValue;
        calculator.dataset.operator = key.dataset.operator;
       
        opEntries.push(key.dataset.operator);
        
        if (previousKeyType == "operator"){
            opEntries.shift();
            return;
        }
        keyEntries.push(displayValue);
        
        if (keyEntries.length == 2){
            calculate(keyEntries[0], keyEntries[1], opEntries[0]);
            keyEntries = [display.textContent];
            opEntries.shift();
        }

        if (calculator.dataset.operator == "percent"){
            var result = (calculator.dataset.firstNum )/100;
            display.textContent = result;
            keyEntries=[display.textContent];
        }

        if (calculator.dataset.operator == "sqrt"){
            var result = Math.sqrt(calculator.dataset.firstNum);
            display.textContent = result;
            keyEntries=[display.textContent];
        }
        
   }

   if (type == "equal"){
       //const firstNum = calculator.dataset.firstNum;
       const operator = calculator.dataset.operator;
       //const secondNum = displayValue;
       keyEntries.push(displayValue);
       if (previousKeyType == "equal"){
           return
       }else{
        //var result = calculate(firstNum, secondNum, operator);
        calculate(keyEntries[0], keyEntries[1], operator);
        keyEntries=[];
        //display.textContent = result;
       }

       operatorKeys.forEach(operatorkey => {
        operatorkey.classList.remove("active");
    })
       
   }


    calculator.dataset.previousKeyType = type;

})



function calculate(firstNum, secondNum=0, operator){
    let result = "";
    if(!operator){
        result = firstNum;
    }
    if (secondNum){
        secondNum = Number(secondNum);
    }
    firstNum = Number(firstNum);
   
    if (operator == "neg") {
        result= firstNum;
    }
    if (operator == "sqrt"){
        result= firstNum;
    }
    if (operator == "plus") {
        result= firstNum+secondNum;
    }
    if (operator == "minus") {
        result= firstNum - secondNum;
    }
    if (operator == "times") {
        result= firstNum * secondNum;
    }
    if (operator == "divide") {
        result= firstNum/secondNum;
    }
    if (operator == "plus") {
        result= firstNum+secondNum;
    }


    if (result.toString().length >= 10){
        display.style.fontSize = "2rem";
    } 
    if (result.toString().length >= 15){
        display.style.fontSize = "1.5rem";
    }


    display.textContent = result;
    calculator.dataset.operator="";
    console.log(result);

}