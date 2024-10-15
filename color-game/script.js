document.addEventListener('DOMContentLoaded', () => {
	let colorsContainer = document.querySelector('#colorsContainer');

	for (let i = 0; i < 6; i++) {
		const div = document.createElement('div');
		div.classList.add('colorBox');

		colorsContainer.appendChild(div);
	}
});
