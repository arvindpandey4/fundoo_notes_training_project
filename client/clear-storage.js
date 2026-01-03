console.log('🧹 Clearing localStorage...');
console.log('Before:', {
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token')
});

localStorage.removeItem('user');
localStorage.removeItem('token');

console.log('After:', {
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token')
});

console.log('✅ localStorage cleared! Please refresh the page.');
