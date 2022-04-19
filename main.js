//click number, multiple numbers possible, stored as one variable
//click operator
//click second number, store as one vairable
//click equals
//calculate answer and display answer on screen

class Calculator {
    constructor () {
        this.operator = ""
        this.subtotal = ""
        this.displayText = "0"
        this.equation = null
        this.prevAnswer = null
        this.clearPressed = false
        this.operatorRemoved = false
        this.subtotalCalculated = false
    }
    parseInput(value) {
        //check to see if any of the special buttons have been pressed
        switch (value) {
            case "=":
                //if you hit equals after an operator, the answer will use the first operand as the second operand and apply the operator 
                //this needs work
                if (this.equation[this.equation.length-1] === "+" || this.equation[this.equation.length-1] === "-" || this.equation[this.equation.length-1] === "*" || this.equation[this.equation.length-1] === "/") {
                    console.log(this.equation[this.equation.length-1])
                    this.equation = this.equation.substr(0,this.equation.length-1)
                    this.calc(this.calc(this.equation) + this.operator + this.calc(this.equation))
                    console.log(this.equation)
                    return
                }
                this.prevAnswer = this.calc(this.equation)
                console.log(this.prevAnswer)
                this.equation = null
                this.displayText = ""
                this.clear()
                break;
            case "clear":
                this.displayText = "0"
                document.querySelector('.screen').value = this.displayText
                this.clear()
                break;
            case "allClear":
                this.displayText = "0"
                document.querySelector('.screen').value = this.displayText
                this.allClear()
                break;
            case ".":
                if(this.displayText === 0) {
                    this.addText("0.")
                }
                else {
                    this.addText(value)
                }
                break;
            default:
                this.addText(value);
                break;
        }
    }
    addText(value) {
        //check to see if nothing has been added yet
        if(this.displayText === '0') {
            //take the 0 out of the equation
            this.displayText = ''
        }
        //if it's the first number entered
        if(this.equation === null) {
            this.equation = ''
        }
        //to adjust the diplay text so it shows the last number, not the operator
        if (this.operatorRemoved) {
            this.displayText = ""
            this.operatorRemoved = false
        }
        if (this.clearPressed) {
            console.log("clearPressed is true")
            if (value === "+" || value === "-" || value === "*" || value === "/") {
                this.equation = this.prevAnswer
                this.displayText = this.prevAnswer
                this.prevAnswer = ""
                this.updateScreen(this.displayText) 
            }
            else {
                //this condition should start a whole new equation and change clearPressed to false
                this.equation += value
                this.displayText += value
                this.updateScreen(this.displayText) 
                this.clearPressed = false
                return;
            }
        }

        this.equation += value
        this.displayText += value

        //a condition to take off the operator from the display screen so just num shows
        if (value === "+" || value === "-" || value === "*" || value === "/") {
            this.displayText = this.displayText.substr(0,this.displayText.length-1)
            this.operator = this.equation[this.equation.length-1]
            this.subtotal = this.calc(this.equation.substr(0,this.equation.length-1))
            this.updateScreen(this.subtotal)
            this.operatorRemoved = true
        }
        //a condition so screen only shows numbers or a decimal
        if (((!isNaN(this.displayText)) || (this.displayText === "."))){
            this.updateScreen(this.displayText)
            console.log(this.displayText)
        }
        console.log(calculator)
    }
    calc(equation) {
        console.log("calc running" + equation)
        let answer = Function("return " + equation)()
        this.updateScreen(answer)
        return answer;
    }
    clear() {
        //this is not working
        //this.prevAnswer = this.calc(this.equation)
        //this.equation = null
        this.clearPressed = true
    }
    allClear() {
        //maybe this is working?
        this.prevAnswer = null
        this.equation = null
    }
    subtotalCalc() {
        this.subtotalCalculated = true
    }
    updateScreen(text) {
        console.log("update screen running" + text)
        document.querySelector('.screen').value = text
    }
}

const calculator = new Calculator()

const keys = document.querySelector('.calculator_buttons');

keys.addEventListener('click', event => {
    const{target} = event;
    const{value} = target;

    if (!target.matches('button')) {
        return;
    }
    else {
        calculator.parseInput(value)
    }
})








/*case "+":
                operator = "+"
                this.prevTotal = this.displayText
                this.displayText = ""
                
                console.log(this.prevTotal, ",", this.displayText, ",", operator)
                break;
            case "-":
                operator = "-"
                console.log(operator)
                break;
            case "X":
                operator = "X"
                console.log(operator)
                break;
            case "/":
                operator = "/"
                console.log(operator)
                break;*/





// const number = document.querySelectorAll('.button')
// const operator = document.querySelectorAll('#operator')
// const equals = document.querySelectorAll('#equals')
// const clear = document.querySelectorAll('#clear')
//const firstOperand = document.querySelectorAll()
//const secondOperand = document.querySelectorAll()


//const calculator = new Calculator(firstOperand, secondOperand, operator)


// number.forEach(button => {
//     button.addEventListener('click',() => {
//         calculator.appendNumber(button.innerText)
//     })
// })


//calculator.calculate(firstOperand, operator, secondOperand)

    // function startCalc() {

    //     if (this.innerText === "+") {
    //         let operator = "+";
    //     }
    //     else {
    //         firstOperand = firstOperand.concat(this.innerText);
    //         console.log(firstOperand);
    //     }
    // }

//calculator object
//properties: screen, first operand, second operand, operator, waiting for operator boolean value
//methods: calculate, concatenate number, clear screen
