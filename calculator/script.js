document.addEventListener('DOMContentLoaded', () => {
	for (let i = 9; i >= -1; i--) {
		var btn = document.createElement('button');
		btn.innerHTML = i;
		if (i === 0) {
			btn.setAttribute('id', 'zero');
		}
		document.getElementById('digits').appendChild(btn);

		btn.setAttribute('onClick', 'myFunction(this.innerHTML)');
	}
	btn.innerHTML = '.';
	document.getElementById('cifre').appendChild(btn);
});
