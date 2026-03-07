// MongoDB Authentication Module
// This module handles authentication via MongoDB backend API

const API_BASE = '/api/stellar';

// Export auth functions for use in script.js
window.authModule = {
    currentUser: null,
    token: null, // Store user session in localStorage
    
    async signUp(email, password) {
        try {
            const response = await fetch(`${API_BASE}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                return { error: data.error || 'Signup failed' };
            }

            // Store user session
            this.currentUser = data.user;
            this.token = data.user.userId;
            localStorage.setItem('stellarAuth', JSON.stringify({
                userId: data.user.userId,
                email: data.user.email,
                username: data.user.username
            }));

            return { success: true, user: data.user };
        } catch (error) {
            return { error: error.message || 'Network error' };
        }
    },
    
    async signIn(email, password) {
        try {
            const response = await fetch(`${API_BASE}/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                return { error: data.error || 'Login failed' };
            }

            // Store user session
            this.currentUser = data.user;
            this.token = data.user.userId;
            localStorage.setItem('stellarAuth', JSON.stringify({
                userId: data.user.userId,
                email: data.user.email,
                username: data.user.username
            }));

            return { success: true, user: data.user };
        } catch (error) {
            return { error: error.message || 'Network error' };
        }
    },
    
    async signOut() {
        try {
            this.currentUser = null;
            this.token = null;
            localStorage.removeItem('stellarAuth');
            return { success: true };
        } catch (error) {
            return { error: error.message };
        }
    },
    
    async saveUserData() {
        if (!this.currentUser) return;
        try {
            const gameState = window.gameState || {};
            await fetch(`${API_BASE}/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.currentUser.userId,
                    gameState: gameState
                })
            });
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    },
    
    async loadUserData() {
        if (!this.currentUser) return null;
        try {
            const response = await fetch(`${API_BASE}/load?userId=${this.currentUser.userId}`);
            if (response.ok) {
                const data = await response.json();
                return data.gameState;
            }
            return null;
        } catch (error) {
            console.error('Error loading user data:', error);
            return null;
        }
    },
    
    // Check for existing session on page load
    checkSession() {
        try {
            const saved = localStorage.getItem('stellarAuth');
            if (saved) {
                const session = JSON.parse(saved);
                this.currentUser = session;
                this.token = session.userId;
                return session;
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
        return null;
    },
    
    onAuthStateChanged(callback) {
        // Check for existing session
        const session = this.checkSession();
        callback(session ? { uid: session.userId, email: session.email } : null);
        
        // Note: For real-time updates, you'd need to poll or use WebSockets
        // For now, we'll rely on manual checks
    }
};
