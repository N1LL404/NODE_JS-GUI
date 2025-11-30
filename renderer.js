// This file runs in the renderer process and has access to DOM
// Use the electronAPI exposed via preload.js for secure IPC communication

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Desktop app loaded!');

    // Initialize app
    await loadAppInfo();
    setupNavigation();
    setupTaskManager();
    setupSettings();
});

// Load app information from main process
async function loadAppInfo() {
    try {
        const version = await window.electronAPI.getAppVersion();
        const platform = await window.electronAPI.getPlatform();
        
        document.getElementById('app-version').textContent = `v${version}`;
        document.getElementById('platform').textContent = getPlatformName(platform);
    } catch (error) {
        console.error('Error loading app info:', error);
    }
}

// Convert platform code to readable name
function getPlatformName(platform) {
    const platforms = {
        'win32': 'Windows',
        'darwin': 'macOS',
        'linux': 'Linux'
    };
    return platforms[platform] || platform;
}

// Setup navigation between pages
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.getAttribute('data-page');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show target page
            pages.forEach(page => page.classList.remove('active'));
            const targetElement = document.getElementById(`${targetPage}-page`);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Update page title
            const titles = {
                'home': 'Welcome Home',
                'dashboard': 'Dashboard',
                'tasks': 'Task Manager',
                'settings': 'Settings'
            };
            pageTitle.textContent = titles[targetPage] || 'MyApp';
        });
    });
}

// Setup task manager functionality
function setupTaskManager() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    let taskCounter = 4;

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const taskItem = createTaskItem(taskCounter);
            taskList.appendChild(taskItem);
            taskCounter++;
            
            // Focus on the label for editing (in a real app, you'd make this editable)
            showNotification('New task added!');
        });
    }

    // Add checkbox listeners to existing tasks
    const checkboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                showNotification('Task completed!');
            }
        });
    });
}

// Create a new task item
function createTaskItem(id) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task${id}`;
    
    const label = document.createElement('label');
    label.htmlFor = `task${id}`;
    label.textContent = `New task ${id}`;
    
    const priority = document.createElement('span');
    priority.className = 'task-priority low';
    priority.textContent = 'Low';
    
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(priority);
    
    // Add event listener to new checkbox
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            showNotification('Task completed!');
        }
    });
    
    return taskItem;
}

// Setup settings functionality
function setupSettings() {
    const darkModeToggle = document.getElementById('dark-mode');
    const animationsToggle = document.getElementById('animations');
    const notificationsToggle = document.getElementById('notifications');
    
    // Dark mode toggle (already in dark mode by default)
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                showNotification('Dark mode enabled');
            } else {
                showNotification('Light mode enabled (not implemented)');
            }
        });
    }
    
    // Animations toggle
    if (animationsToggle) {
        animationsToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.style.setProperty('--animation-enabled', '1');
                showNotification('Animations enabled');
            } else {
                document.body.style.setProperty('--animation-enabled', '0');
                showNotification('Animations disabled');
            }
        });
    }
    
    // Notifications toggle
    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                showNotification('Notifications enabled');
            } else {
                console.log('Notifications disabled');
            }
        });
    }
}

// Show a simple notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6C63FF, #FF6584);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    // Add animation keyframes if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add some interactive effects to cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        showNotification('Card clicked!');
    });
});

// Add interactive effects to stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('click', () => {
        showNotification('Viewing detailed statistics...');
    });
});

// Hero buttons functionality
document.addEventListener('click', (e) => {
    if (e.target.textContent === 'Get Started') {
        showNotification('Welcome! Let\'s get started 🚀');
    } else if (e.target.textContent === 'Learn More') {
        showNotification('Check out the documentation!');
    }
});

console.log('Renderer process initialized successfully!');

