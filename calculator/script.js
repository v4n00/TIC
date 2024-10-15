for (let i = 9; i >= -1; i--) {
	var btn = document.createElement('BUTTON');
	btn.innerHTML = i;
	if (i === 0) {
		btn.setAttribute('id', 'zero');
	}
	document.getElementById('cifre').appendChild(btn);

	btn.setAttribute('onClick', 'myFunction(this.innerHTML)');
}

btn.innerHTML = '.';
document.getElementById('cifre').appendChild(btn);

function myFunction(clicked) {
	let display = document.querySelector('#display p').innerHTML;
	display = clicked;
	if (isNaN(Number(clicked))) {
		console.log('nu este cifra');
	} else {
		console.log(clicked);
	}
}
