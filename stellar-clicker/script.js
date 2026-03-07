// ============================================
// Stellar Clicker - Cosmic Mining Adventure
// ============================================

// Game State
let gameState = {
    stellarCoins: 0,
    coinsPerClick: 1,
    coinsPerSecond: 0,
    totalMined: 0,
    upgrades: {},
    skills: {},
    achievements: {},
    userId: null,
    username: 'Guest'
};

// Make gameState globally accessible
window.gameState = gameState;

// Space-Themed Upgrade Definitions
const upgrades = [
    {
        id: 'drone',
        name: 'Drone Fleet',
        description: 'Automated mining drones that extract stellar coins',
        baseCost: 10,
        baseProduction: 0.1,
        icon: '🤖'
    },
    {
        id: 'ai_assistant',
        name: 'AI Assistant',
        description: 'Advanced AI that optimizes mining operations',
        baseCost: 100,
        baseProduction: 1,
        icon: '🤖'
    },
    {
        id: 'asteroid_farm',
        name: 'Asteroid Farm',
        description: 'Harvests stellar coins from nearby asteroids',
        baseCost: 500,
        baseProduction: 4,
        icon: '☄️'
    },
    {
        id: 'quantum_extractor',
        name: 'Quantum Extractor',
        description: 'Extracts coins using quantum mechanics',
        baseCost: 2000,
        baseProduction: 10,
        icon: '⚛️'
    },
    {
        id: 'space_station',
        name: 'Space Station',
        description: 'Massive station producing coins at scale',
        baseCost: 10000,
        baseProduction: 40,
        icon: '🛸'
    },
    {
        id: 'nebula_harvester',
        name: 'Nebula Harvester',
        description: 'Harvests energy from cosmic nebulae',
        baseCost: 50000,
        baseProduction: 200,
        icon: '🌌'
    },
    {
        id: 'black_hole_engine',
        name: 'Black Hole Engine',
        description: 'Generates infinite energy from black holes',
        baseCost: 250000,
        baseProduction: 1000,
        icon: '🕳️'
    }
];

// Skill Tree Definitions
const skillTree = [
    {
        id: 'click_power_1',
        name: 'Click Power I',
        description: '+50% click power',
        icon: '⭐',
        cost: 100,
        effect: (state) => { state.coinsPerClick *= 1.5; },
        requirements: []
    },
    {
        id: 'click_power_2',
        name: 'Click Power II',
        description: '+100% click power',
        icon: '⭐',
        cost: 500,
        effect: (state) => { state.coinsPerClick *= 2; },
        requirements: ['click_power_1']
    },
    {
        id: 'production_boost_1',
        name: 'Production Boost I',
        description: '+25% production',
        icon: '⚡',
        cost: 200,
        effect: (state) => { state.coinsPerSecond *= 1.25; },
        requirements: []
    },
    {
        id: 'production_boost_2',
        name: 'Production Boost II',
        description: '+50% production',
        icon: '⚡',
        cost: 1000,
        effect: (state) => { state.coinsPerSecond *= 1.5; },
        requirements: ['production_boost_1']
    },
    {
        id: 'lucky_strikes',
        name: 'Lucky Strikes',
        description: '10% chance for 10x coins on click',
        icon: '🍀',
        cost: 5000,
        effect: (state) => { state.luckyStrikes = true; },
        requirements: ['click_power_2']
    },
    {
        id: 'auto_clicker',
        name: 'Auto Clicker',
        description: 'Automatically clicks every 5 seconds',
        icon: '🔄',
        cost: 10000,
        effect: (state) => { state.autoClicker = true; },
        requirements: ['production_boost_2']
    }
];

// Achievement Definitions
const achievements = [
    {
        id: 'first_100',
        name: 'First Stellar',
        description: 'Mine 100 stellar coins',
        requirement: (state) => state.stellarCoins >= 100,
        icon: '🥉'
    },
    {
        id: 'thousandaire',
        name: 'Stellar Thousandaire',
        description: 'Mine 1,000 stellar coins',
        requirement: (state) => state.stellarCoins >= 1000,
        icon: '🥈'
    },
    {
        id: 'millionaire',
        name: 'Cosmic Millionaire',
        description: 'Mine 1,000,000 stellar coins',
        requirement: (state) => state.stellarCoins >= 1000000,
        icon: '🥇'
    },
    {
        id: 'first_upgrade',
        name: 'First Purchase',
        description: 'Buy your first upgrade',
        requirement: (state) => Object.values(state.upgrades).some(count => count > 0),
        icon: '🛒'
    },
    {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Reach 100 coins per second',
        requirement: (state) => state.coinsPerSecond >= 100,
        icon: '⚡'
    },
    {
        id: 'skill_master',
        name: 'Skill Master',
        description: 'Unlock 5 skills',
        requirement: (state) => Object.keys(state.skills).length >= 5,
        icon: '🎓'
    }
];

// DOM Elements
const coinCounter = document.getElementById('coin-counter');
const coinsPerClickDisplay = document.getElementById('coins-per-click');
const coinsPerSecondDisplay = document.getElementById('coins-per-second');
const totalMinedDisplay = document.getElementById('total-mined');
const clickButton = document.getElementById('click-button');
const clickEffect = document.getElementById('click-effect');
const upgradesList = document.getElementById('upgrades-list');
const achievementsList = document.getElementById('achievements-list');
const skillTreeContainer = document.getElementById('skill-tree');
const onlineCountDisplay = document.getElementById('online-count');
const loginModal = document.getElementById('login-modal');
const leaderboardModal = document.getElementById('leaderboard-modal');
const leaderboardList = document.getElementById('leaderboard-list');

// API Base URL
const API_BASE = '/api/stellar';

// Initialize Game
async function initGame() {
    setupEventListeners();
    
    // Check for existing session
    if (window.authModule && window.authModule.checkSession) {
        const session = window.authModule.checkSession();
        if (session) {
            gameState.userId = session.userId;
            gameState.username = session.username || session.email.split('@')[0];
        }
    }
    
    await loadGame();
    renderUpgrades();
    renderSkillTree();
    renderAchievements();
    updateDisplay();
    startPassiveIncome();
    startAutoClicker();
    
    // Auto-save every 5 seconds
    setInterval(saveGame, 5000);
    
    // Update online count every 10 seconds
    setInterval(updateOnlineCount, 10000);
    updateOnlineCount();
    
    // Send heartbeat for online tracking
    setInterval(sendHeartbeat, 30000);
    sendHeartbeat();
    
    // Save on page unload
    window.addEventListener('beforeunload', saveGame);
    
    // Update leaderboard periodically
    setInterval(updateLeaderboard, 30000);
    
    // Update user info display
    updateUserInfo();
}

// Setup Event Listeners
function setupEventListeners() {
    // Click handler
    clickButton.addEventListener('click', handleClick);
    clickButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleClick();
    });
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            switchTab(tab);
        });
    });
    
    // Modal handlers
    document.getElementById('login-toggle').addEventListener('click', () => {
        loginModal.style.display = 'block';
    });
    
    document.getElementById('leaderboard-toggle').addEventListener('click', () => {
        leaderboardModal.style.display = 'block';
        updateLeaderboard();
    });
    
    document.querySelectorAll('.close-modal').forEach(close => {
        close.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });
    
    // Login handlers
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('signup-btn').addEventListener('click', handleSignup);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('guest-link').addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
    });
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) btn.classList.add('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === `${tabName}-tab`) content.classList.add('active');
    });
}

// Click Handler
function handleClick() {
    let coinsEarned = gameState.coinsPerClick;
    
    // Lucky strikes chance
    if (gameState.skills.lucky_strikes && Math.random() < 0.1) {
        coinsEarned *= 10;
    }
    
    gameState.stellarCoins += coinsEarned;
    gameState.totalMined += coinsEarned;
    updateDisplay();
    createClickEffect(coinsEarned);
    checkAchievements();
    saveGame();
    updateLeaderboardEntry();
}

// Create click effect animation
function createClickEffect(amount) {
    const effect = document.createElement('span');
    effect.textContent = `+${formatNumber(amount)}`;
    effect.style.left = `${Math.random() * 100 - 50}px`;
    clickEffect.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 800);
}

// Calculate upgrade cost (exponential growth: +15% per purchase)
function getUpgradeCost(upgradeId) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    const count = gameState.upgrades[upgradeId] || 0;
    return Math.floor(upgrade.baseCost * Math.pow(1.15, count));
}

// Calculate total production from all upgrades
function calculateProduction() {
    let total = 0;
    upgrades.forEach(upgrade => {
        const count = gameState.upgrades[upgrade.id] || 0;
        total += upgrade.baseProduction * count;
    });
    
    // Apply skill multipliers
    if (gameState.skills.production_boost_1) total *= 1.25;
    if (gameState.skills.production_boost_2) total *= 1.5;
    
    return total;
}

// Buy Upgrade
function buyUpgrade(upgradeId) {
    const cost = getUpgradeCost(upgradeId);
    
    if (gameState.stellarCoins >= cost) {
        gameState.stellarCoins -= cost;
        gameState.upgrades[upgradeId] = (gameState.upgrades[upgradeId] || 0) + 1;
        gameState.coinsPerSecond = calculateProduction();
        updateDisplay();
        renderUpgrades();
        checkAchievements();
        saveGame();
        updateLeaderboardEntry();
    }
}

// Render Upgrades
function renderUpgrades() {
    upgradesList.innerHTML = '';
    
    upgrades.forEach(upgrade => {
        const count = gameState.upgrades[upgrade.id] || 0;
        const cost = getUpgradeCost(upgrade.id);
        const canAfford = gameState.stellarCoins >= cost;
        
        const upgradeItem = document.createElement('div');
        upgradeItem.className = `upgrade-item ${canAfford ? 'affordable' : ''}`;
        
        upgradeItem.innerHTML = `
            <div class="upgrade-header">
                <span class="upgrade-name">${upgrade.icon} ${upgrade.name}</span>
                <span class="upgrade-count">Owned: ${count}</span>
            </div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-stats">
                <span class="upgrade-cost">Cost: ${formatNumber(cost)} coins</span>
                <span class="upgrade-production">+${formatNumber(upgrade.baseProduction)}/s</span>
            </div>
            <button class="buy-button" ${!canAfford ? 'disabled' : ''} onclick="buyUpgrade('${upgrade.id}')">
                Buy ${upgrade.name}
            </button>
        `;
        
        upgradesList.appendChild(upgradeItem);
    });
}

// Render Skill Tree
function renderSkillTree() {
    skillTreeContainer.innerHTML = '';
    
    skillTree.forEach(skill => {
        const isUnlocked = gameState.skills[skill.id] || false;
        const canUnlock = !isUnlocked && 
            gameState.stellarCoins >= skill.cost &&
            skill.requirements.every(req => gameState.skills[req]);
        const isLocked = !isUnlocked && !canUnlock;
        
        const skillNode = document.createElement('div');
        skillNode.className = `skill-node ${isUnlocked ? 'unlocked' : canUnlock ? 'available' : 'locked'}`;
        
        skillNode.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-name">${skill.name}</div>
            ${!isUnlocked ? `<div class="skill-cost">${formatNumber(skill.cost)}</div>` : ''}
        `;
        
        if (canUnlock) {
            skillNode.addEventListener('click', () => unlockSkill(skill.id));
        }
        
        skillTreeContainer.appendChild(skillNode);
    });
}

// Unlock Skill
function unlockSkill(skillId) {
    const skill = skillTree.find(s => s.id === skillId);
    if (!skill || gameState.skills[skillId] || gameState.stellarCoins < skill.cost) return;
    
    if (!skill.requirements.every(req => gameState.skills[req])) return;
    
    gameState.stellarCoins -= skill.cost;
    gameState.skills[skillId] = true;
    
    // Apply skill effect
    if (skill.effect) {
        skill.effect(gameState);
    }
    
    // Recalculate stats
    gameState.coinsPerSecond = calculateProduction();
    
    updateDisplay();
    renderSkillTree();
    checkAchievements();
    saveGame();
}

// Render Achievements
function renderAchievements() {
    achievementsList.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isUnlocked = gameState.achievements[achievement.id] || false;
        
        const achievementItem = document.createElement('div');
        achievementItem.className = `achievement-item ${isUnlocked ? 'unlocked' : ''}`;
        
        achievementItem.innerHTML = `
            <span class="achievement-icon">${achievement.icon}</span>
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
        
        achievementsList.appendChild(achievementItem);
    });
}

// Check Achievements
function checkAchievements() {
    achievements.forEach(achievement => {
        if (!gameState.achievements[achievement.id]) {
            if (achievement.requirement(gameState)) {
                gameState.achievements[achievement.id] = true;
                showAchievementNotification(achievement);
                renderAchievements();
                saveGame();
            }
        }
    });
}

// Show Achievement Notification
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        border: 2px solid #ffd700;
        border-radius: 10px;
        padding: 20px;
        z-index: 1000;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 10px;">${achievement.icon}</div>
        <div style="font-weight: bold; color: #ffd700; margin-bottom: 5px;">Achievement Unlocked!</div>
        <div style="color: #e0e0e0;">${achievement.name}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Start Passive Income
function startPassiveIncome() {
    setInterval(() => {
        if (gameState.coinsPerSecond > 0) {
            gameState.stellarCoins += gameState.coinsPerSecond;
            gameState.totalMined += gameState.coinsPerSecond;
            updateDisplay();
            checkAchievements();
            saveGame();
        }
    }, 1000);
}

// Start Auto Clicker
function startAutoClicker() {
    if (gameState.skills.auto_clicker) {
        setInterval(() => {
            handleClick();
        }, 5000);
    }
}

// Update Display
function updateDisplay() {
    coinCounter.textContent = formatNumber(gameState.stellarCoins);
    coinsPerClickDisplay.textContent = formatNumber(gameState.coinsPerClick);
    coinsPerSecondDisplay.textContent = formatNumber(gameState.coinsPerSecond);
    totalMinedDisplay.textContent = formatNumber(gameState.totalMined);
    
    // Re-render upgrades to update affordability
    renderUpgrades();
}

// Format Numbers (K, M, B, T)
function formatNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toLocaleString();
}

// Save Game
async function saveGame() {
    try {
        // Save to localStorage
        localStorage.setItem('stellarClickerSave', JSON.stringify(gameState));
        
        // Save to database if logged in
        if (gameState.userId && window.authModule && window.authModule.currentUser) {
            try {
                await fetch(`${API_BASE}/save`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: gameState.userId,
                        gameState: gameState
                    })
                });
            } catch (e) {
                console.error('Failed to save to database:', e);
            }
        }
    } catch (e) {
        console.error('Failed to save game:', e);
    }
}

// Load Game
async function loadGame() {
    try {
        // Try to load from database if logged in
        if (gameState.userId && window.authModule && window.authModule.currentUser) {
            try {
                const response = await fetch(`${API_BASE}/load?userId=${gameState.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.gameState) {
                        Object.assign(gameState, data.gameState);
                        gameState.coinsPerSecond = calculateProduction();
                        return;
                    }
                }
            } catch (e) {
                console.error('Failed to load from database:', e);
            }
        }
        
        // Fallback to localStorage
        const saved = localStorage.getItem('stellarClickerSave');
        if (saved) {
            const loadedState = JSON.parse(saved);
            Object.assign(gameState, loadedState);
            gameState.coinsPerSecond = calculateProduction();
        }
    } catch (e) {
        console.error('Failed to load game:', e);
    }
}

// Update Online Count
async function updateOnlineCount() {
    try {
        const response = await fetch(`${API_BASE}/online`);
        if (response.ok) {
            const data = await response.json();
            onlineCountDisplay.textContent = data.count || 0;
        }
    } catch (e) {
        console.error('Failed to update online count:', e);
    }
}

// Update Leaderboard
async function updateLeaderboard() {
    try {
        const response = await fetch(`${API_BASE}/leaderboard`);
        if (response.ok) {
            const data = await response.json();
            renderLeaderboard(data.leaderboard || []);
        }
    } catch (e) {
        console.error('Failed to update leaderboard:', e);
    }
}

// Render Leaderboard
function renderLeaderboard(leaderboard) {
    leaderboardList.innerHTML = '';
    
    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No players yet. Be the first!</p>';
        return;
    }
    
    leaderboard.forEach((entry, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        
        const rank = index + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
        
        item.innerHTML = `
            <div class="leaderboard-rank">${medal || rank}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${entry.username || 'Anonymous'}</div>
                <div class="leaderboard-stats">Total Mined: ${formatNumber(entry.totalMined || 0)}</div>
            </div>
            <div class="leaderboard-coins">${formatNumber(entry.stellarCoins || 0)}</div>
        `;
        
        leaderboardList.appendChild(item);
    });
}

// Update Leaderboard Entry
async function updateLeaderboardEntry() {
    if (!gameState.userId) return;
    
    try {
        await fetch(`${API_BASE}/leaderboard/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: gameState.userId,
                username: gameState.username,
                stellarCoins: gameState.stellarCoins,
                totalMined: gameState.totalMined
            })
        });
    } catch (e) {
        console.error('Failed to update leaderboard entry:', e);
    }
}

// Authentication Handlers
async function handleLogin() {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    if (window.authModule && window.authModule.signIn) {
        const result = await window.authModule.signIn(email, password);
        if (result.error) {
            alert('Login failed: ' + result.error);
        } else {
            gameState.userId = result.user.userId;
            gameState.username = result.user.username || result.user.email.split('@')[0];
            await loadGame();
            updateDisplay();
            loginModal.style.display = 'none';
            updateUserInfo();
        }
    } else {
        alert('Authentication not available. Using guest mode.');
        loginModal.style.display = 'none';
    }
}

async function handleSignup() {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    if (window.authModule && window.authModule.signUp) {
        const result = await window.authModule.signUp(email, password);
        if (result.error) {
            alert('Signup failed: ' + result.error);
        } else {
            gameState.userId = result.user.userId;
            gameState.username = result.user.username || result.user.email.split('@')[0];
            await saveGame();
            loginModal.style.display = 'none';
            updateUserInfo();
        }
    } else {
        alert('Authentication not available. Using guest mode.');
        loginModal.style.display = 'none';
    }
}

async function handleLogout() {
    if (window.authModule && window.authModule.signOut) {
        await window.authModule.signOut();
        gameState.userId = null;
        gameState.username = 'Guest';
        await loadGame();
        updateDisplay();
        updateUserInfo();
        loginModal.style.display = 'none';
    }
}

function updateUserInfo() {
    const userInfo = document.getElementById('user-info');
    const loginForm = document.getElementById('login-form');
    const userEmail = document.getElementById('user-email');
    
    if (gameState.userId) {
        userEmail.textContent = gameState.username;
        loginForm.style.display = 'none';
        userInfo.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        userInfo.style.display = 'none';
    }
}

// Send heartbeat for online tracking
async function sendHeartbeat() {
    if (!gameState.userId) return;
    
    try {
        await fetch(`${API_BASE}/online`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: gameState.userId })
        });
    } catch (e) {
        // Silently fail - not critical
    }
}

// Initialize on page load
initGame();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
