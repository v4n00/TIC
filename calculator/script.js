document.addEventListener('DOMContentLoaded', () => {
	for (let i = 9; i >= 0; i--) {
		let btn = document.createElement('button');
		btn.innerHTML = i;
		if (i === 0) {
			btn.setAttribute('id', 'zero');
		}
		document.getElementById('digits').appendChild(btn);

		btn.addEventListener('click', () => {
			// after the result is displayed, if a digit is clicked, clear the display
			if (result !== 0 && operator == null) {
				clear();
			}

			if (operator == null) {
				op1 = floatingPoint === false ? op1 * 10 + i : op1 + (i / 10) ** floatingPower++;
			} else {
				if (floatingPoint === true) {
					op2 = op2 == null ? i / 10 : op2 + (i / 10) ** floatingPower++;
				} else {
					op2 = op2 == null ? i : op2 * 10 + i;
				}
			}
			updateDisplay();
		});
	}

	let floatingPointBtn = document.createElement('button');
	floatingPointBtn.innerHTML = '.';
	floatingPointBtn.addEventListener('click', () => (floatingPoint = true));
	document.getElementById('digits').appendChild(floatingPointBtn);

	let op1 = 0;
	let op2 = null;
	let operator = null;
	let floatingPoint = false;
	let floatingPower = 1;
	let err = null;
	let result = 0;
	let operations = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b,
		'1/x': (a) => 1 / a,
		'√': (a) => Math.sqrt(a),
		'^2': (a) => a ** 2,
	};

	let operators = document.querySelectorAll('.operator');
	operators.forEach((op) => {
		op.addEventListener('click', () => {
			operator = op.innerHTML;

			// check if 1 parameter operation is done
			if (operator && operations[operator].length === 1) {
				compute();
			}

			resetFloatingPoint();
			updateDisplay();
		});
	});

	let resetFloatingPoint = () => {
		floatingPoint = false;
		floatingPower = 1;
	};

	let displayElement = document.querySelector('#display p');
	let updateDisplay = () => {
		if (err) {
			displayElement.innerHTML = err;
			err = null;
		} else {
			displayElement.innerHTML = displayNumber(op1);
			if (operator !== null) {
				displayElement.innerHTML += operator;
				if (op2 !== null) {
					displayElement.innerHTML += displayNumber(op2);
				}
			}
		}
	};
	let displayNumber = (number) => {
		return number % 1 === 0 ? number : number.toFixed(1);
	};

	let compute = () => {
		if (operator == null && op2 == null) return;
		if (operator === '/' && op2 === 0) {
			err = 'Cannot divide by zero';
			updateDisplay();
			return;
		}

		result = operations[operator](op1, op2);
		op1 = result;
		op2 = null;
		operator = null;
		updateDisplay();
	};
	document.querySelector('#equal').addEventListener('click', compute);

	let clear = () => {
		op1 = 0;
		op2 = null;
		operator = null;
		floatingPoint = false;
		err = null;
		result = 0;
		updateDisplay();
	};
	document.querySelector('#clear').addEventListener('click', clear);

	let deleteOne = () => {
		if (op2 !== null) {
			op2 = Math.floor(op2 / 10);
		} else {
			op1 = Math.floor(op1 / 10);
		}
		updateDisplay();
	};
	document.querySelector('#delete').addEventListener('click', deleteOne);
});
