const userManager = (() => {
	let users = [];

	return {
		registerUser: (user) => {
			user.id = users.length + 1;
			users.push(user);
			return user;
		},
	};
})();

export { userManager };
