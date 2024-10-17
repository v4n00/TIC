const registerUser = (user) => {
	let users = JSON.parse(localStorage.getItem('users')) || [];
	user.password = password;
	users.push(user);
	localStorage.setItem('users', JSON.stringify(users));

	console.log('New user added');
};

export { registerUser };
