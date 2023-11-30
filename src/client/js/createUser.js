import fetch from 'node-fetch';

export const createUser = async () => {
    const response = await fetch('https://website.com/users', { method: 'POST' });
    const userId = await response.text();
    return userId;
};