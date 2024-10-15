document.addEventListener('DOMContentLoaded', () => {
	const colorsContainer = document.querySelector('#colorsContainer');
	const radioButtons = document.querySelectorAll('input[type="radio"]');
	const colorValueText = document.querySelector('#colorValue');

	const difficulty = {
		easy: 6,
		hard: 9,
	};
	const difficultyColorRange = 64;
	let numberOfColors = difficulty.easy;

	let newGame = (e) => {
		colorValueText.style.backgroundColor = '';
		colorsContainer.innerHTML = '';
		let winnerIndex = getRandomInt(0, numberOfColors - 1);
		let correctColor;
		let pastColor;

		for (let i = 0; i < numberOfColors; i++) {
			const colorBox = document.createElement('div');
			colorBox.classList.add('colorBox');

			// choose random color
			let color;
			if (numberOfColors === difficulty.easy) {
				color = getRandomColor();
			} else {
				color = i === 0 ? getRandomColor() : getRandomColor(pastColor);
				pastColor = color;
			}
			colorBox.style.backgroundColor = color.hex;
			colorBox.innerHTML = i + 1;

			// click action
			colorBox.addEventListener('click', () => {
				if (color.hex == correctColor.hex) {
					colorValueText.innerHTML = 'You won!';
				} else {
					colorValueText.innerHTML = 'You lost -> correct: ' + (winnerIndex + 1);
				}
				colorValueText.style.backgroundColor = correctColor.hex;

				colorsContainer.querySelectorAll('.colorBox').forEach((con) => {
					con.addEventListener(
						'click',
						(e) => {
							e.stopPropagation();
							e.stopImmediatePropagation();
							e.preventDefault();
						},
						true
					);
				});
			});

			// choose winner
			if (i === winnerIndex) {
				correctColor = color;
			}

			colorsContainer.appendChild(colorBox);
		}

		colorValueText.innerHTML = 'RGB(' + correctColor.R + ', ' + correctColor.G + ', ' + correctColor.B + ')';
	};

	let getRandomColor = (pastColor) => {
		let hex = '#';
		let R, G, B;

		if (pastColor) {
			R = Math.max(0, Math.min(pastColor.R + getRandomInt(-difficultyColorRange, difficultyColorRange), 255));
			G = Math.max(0, Math.min(pastColor.G + getRandomInt(-difficultyColorRange, difficultyColorRange), 255));
			B = Math.max(0, Math.min(pastColor.B + getRandomInt(-difficultyColorRange, difficultyColorRange), 255));
		} else {
			R = getRandomInt(0, 255);
			G = getRandomInt(0, 255);
			B = getRandomInt(0, 255);
		}

		_R = R < 16 ? '0' + R.toString(16) : R.toString(16);
		_G = G < 16 ? '0' + G.toString(16) : G.toString(16);
		_B = B < 16 ? '0' + B.toString(16) : B.toString(16);

		hex = hex + _R + _G + _B;

		return { R, G, B, hex };
	};

	let getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	radioButtons[0].checked = true;
	radioButtons.forEach((radioButton) => {
		radioButton.addEventListener('change', (e) => {
			numberOfColors = difficulty[e.target.value];
			newGame();
		});
	});

	let newGameBtn = document.querySelector('#newGame');
	newGameBtn.addEventListener('click', () => {
		newGame();
	});

	newGame();
});
