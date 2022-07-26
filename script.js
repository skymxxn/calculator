class Calculator {
	constructor(previousItemTextElement, currentItemTextElement) {
		this.previousItemTextElement = previousItemTextElement
		this.currentItemTextElement = currentItemTextElement
		this.clear()
	} 

	clear() {
		this.currentItem = ''
		this.previousItem = ''
		this.operation = undefined
	}

	delete() {
		this.currentItem = this.currentItem.slice(0, -1)
	}

	appendNumber(number) {
		if (number === '.' && this.currentItem.includes('.')) return
		this.currentItem = this.currentItem + number
	}

	chooseOperation(operation) {
		if (this.currentItem === '') return
		if (this.previousItem !== '') {
			this.compute()
		}
		this.operation = operation
		this.previousItem = this.currentItem
		this.currentItem = ''
	}

	compute() {
		let computation
		const prev = parseFloat(this.previousItem)
		const current = parseFloat(this.currentItem)
		if (isNaN(prev) || isNaN(current)) return
		switch (this.operation) {
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			case '%':
				computation = prev % current
				break
			default:
				return
		}
		this.previousItem = ''
		this.currentItem = computation.toString()
		this.operation = undefined
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`
		} else {
			return integerDisplay
		}
	}

	updateDisplay() {
		this.currentItemTextElement.textContent = this.getDisplayNumber(this.currentItem)
		if (this.operation != null) {
			this.previousItemTextElement.textContent = 
				`${this.getDisplayNumber(this.previousItem)} ${this.operation}`
		} else {
			this.previousItemTextElement.textContent = ''
		}
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousItemTextElement = document.querySelector('[data-previous-item]')
const currentItemTextElement = document.querySelector('[data-current-item]')

const calculator = new Calculator(previousItemTextElement, currentItemTextElement) 

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.textContent)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.textContent)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', button => {
	calculator.compute()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
})