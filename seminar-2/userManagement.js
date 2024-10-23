const URL = 'http://localhost:3000';

// Very basic hash function
function hashPassword(password) {
	let hash = 0;
	if (password.length === 0) return hash.toString();
	for (let i = 0; i < password.length; i++) {
		const char = password.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash.toString();
}

export const registerUser = async (user) => {
	// Hash the password before storing
	user.password = hashPassword(user.password);

	await fetch(`${URL}/users`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(user),
	});

	let users = JSON.parse(localStorage.getItem('users')) || [];
	users.push(user);
	localStorage.setItem('users', JSON.stringify(users));

	localStorage.setItem('isAuthenticated', 'false');
};

export const loginUser = (email, password) => {
	const users = JSON.parse(localStorage.getItem('users')) || [];
	const hashedPassword = hashPassword(password);

	// Find user with matching email and hashed password
	const user = users.find((u) => u.email === email && u.password === hashedPassword);

	if (user) {
		console.log('User authenticated', user);
		localStorage.setItem('isAuthenticated', 'true');
		localStorage.setItem('username', user.name);
		return true; // Authentication successful
	} else {
		console.log('Authentication failed for email:', email);
		return false; // Authentication failed
	}
};

export const checkAuthentication = () => {
	return localStorage.getItem('isAuthenticated') === 'true';
};

export const logout = () => {
	localStorage.setItem('isAuthenticated', 'false');
	localStorage.removeItem('username');
	console.log('Logged out!');
};

export const getTasks = async () => {
	const res = await fetch(`${URL}/tasks`, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	});
	let tasks = await res.json();
	return tasks;
};
