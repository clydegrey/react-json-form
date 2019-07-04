const emailIsValid = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const required = input => input === 0 || input === '0' || !!input;

export { emailIsValid, required };
