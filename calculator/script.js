document.addEventListener('DOMContentLoaded', () => {
	for (let i = 9; i >= -1; i--) {
		var btn = document.createElement('button');
		btn.innerHTML = i;
		if (i === 0) {
			btn.setAttribute('id', 'zero');
		}
		document.getElementById('digits').appendChild(btn);

		btn.addEventListener('click', () => {
			//TODO: implement floating point numbers
			if (operator === null) {
				op1 = op1 * 10 + i;
				updateDisplay();
			} else {
				op2 = op2 === null ? i : op2 * 10 + i;
				updateDisplay();
			}
		});
	}
	btn.innerHTML = '.';
	document.getElementById('digits').appendChild(btn);

	let op1 = 0;
	let op2 = null;
	let operator = null;
	let err = null;
	let display = 0;
	let operations = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b,
	};

	let operators = document.querySelectorAll('.operator');
	operators.forEach((op) => {
		op.addEventListener('click', () => {
			if (op2 !== null) {
				compute();
			}
			operator = op.innerHTML;
			updateDisplay();
		});
	});

	let displayElement = document.querySelector('#display p');
	let updateDisplay = () => {
		displayElement.innerHTML = op1;
		if (operator !== null) {
			displayElement.innerHTML += operator;
			if (op2 !== null) {
				displayElement.innerHTML += op2;
			}
		}
	};

	let compute = () => {
		if (operator == null || op2 == null) return;
		if (operator === '/' && op2 === 0) {
			err = 'Cannot divide by zero';
			return;
		}

		display = operations[operator](op1, op2);
		op1 = display;
		op2 = null;
		operator = null;
		updateDisplay();
	};
	document.querySelector('#equal').addEventListener('click', compute);

	let clear = () => {
		op1 = 0;
		op2 = null;
		operator = null;
		err = null;
		display = 0;
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
