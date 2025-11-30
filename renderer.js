// This file runs in the renderer process and has access to DOM
// Use the electronAPI exposed via preload.js for secure IPC communication

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Desktop app loaded!');

    // Initialize app
    await loadAppInfo();
    setupNavigation();
    setupTaskManager();
    setupSettings();
    await setupGoBackend();
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
                'golang': 'Go Backend Integration',
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

// ============================================================================
// Go Backend Integration
// ============================================================================

let goServerUrl = '';

// Setup Go backend integration
async function setupGoBackend() {
    try {
        goServerUrl = await window.electronAPI.getGoServerUrl();
        document.getElementById('go-server-url').textContent = `Server: ${goServerUrl}`;
        
        // Check if Go server is running
        await checkGoServerStatus();
        
        // Setup event listeners
        setupGoEventListeners();
    } catch (error) {
        console.error('Error setting up Go backend:', error);
    }
}

// Check if Go server is running
async function checkGoServerStatus() {
    const statusElement = document.getElementById('go-server-status');
    
    try {
        const response = await fetch(`${goServerUrl}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            const data = await response.json();
            statusElement.innerHTML = '<span class="status-dot connected"></span><span>Connected to Go server ✓</span>';
            console.log('Go server status:', data);
        } else {
            throw new Error('Server responded with error');
        }
    } catch (error) {
        statusElement.innerHTML = '<span class="status-dot disconnected"></span><span>Go server not available ✗</span>';
        console.error('Go server connection failed:', error);
        showNotification('Go server is not running. Build and it will start automatically.');
    }
}

// Setup Go-related event listeners
function setupGoEventListeners() {
    // System Info button
    const systemInfoBtn = document.getElementById('get-system-info-btn');
    if (systemInfoBtn) {
        systemInfoBtn.addEventListener('click', getSystemInfo);
    }
    
    // Greet button
    const greetBtn = document.getElementById('greet-btn');
    if (greetBtn) {
        greetBtn.addEventListener('click', getGreeting);
    }
    
    // Compute button
    const computeBtn = document.getElementById('compute-btn');
    if (computeBtn) {
        computeBtn.addEventListener('click', computeFibonacci);
    }
    
    // List files button
    const listFilesBtn = document.getElementById('list-files-btn');
    if (listFilesBtn) {
        listFilesBtn.addEventListener('click', listFiles);
    }
}

// Get system info from Go
async function getSystemInfo() {
    const resultBox = document.getElementById('system-info-result');
    
    try {
        showLoading(resultBox, 'Fetching system information...');
        
        const response = await fetch(`${goServerUrl}/system`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const formatted = `
Operating System: ${data.os}
Architecture: ${data.architecture}
CPU Cores: ${data.cpus}
Go Version: ${data.goVersion}
        `.trim();
        
        showResult(resultBox, formatted, 'success');
        showNotification('System info retrieved successfully!');
    } catch (error) {
        showResult(resultBox, `Error: ${error.message}`, 'error');
        console.error('Error fetching system info:', error);
    }
}

// Get greeting from Go
async function getGreeting() {
    const nameInput = document.getElementById('name-input');
    const resultBox = document.getElementById('greet-result');
    const name = nameInput.value.trim() || 'World';
    
    try {
        showLoading(resultBox, 'Getting greeting...');
        
        const response = await fetch(`${goServerUrl}/greet?name=${encodeURIComponent(name)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const formatted = `
${data.greeting}
Time: ${new Date(data.time).toLocaleString()}
        `.trim();
        
        showResult(resultBox, formatted, 'success');
    } catch (error) {
        showResult(resultBox, `Error: ${error.message}`, 'error');
        console.error('Error getting greeting:', error);
    }
}

// Compute Fibonacci
async function computeFibonacci() {
    const fibInput = document.getElementById('fib-input');
    const resultBox = document.getElementById('compute-result');
    const number = parseInt(fibInput.value);
    
    if (isNaN(number) || number < 0 || number > 45) {
        showResult(resultBox, 'Please enter a number between 0 and 45', 'error');
        return;
    }
    
    try {
        showLoading(resultBox, 'Computing Fibonacci...');
        
        const response = await fetch(`${goServerUrl}/compute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: number })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const formatted = `
Fibonacci(${data.input}) = ${data.result}
Computation time: ${data.timeMs}ms
        `.trim();
        
        showResult(resultBox, formatted, 'success');
        showNotification(`Computed in ${data.timeMs}ms! 🚀`);
    } catch (error) {
        showResult(resultBox, `Error: ${error.message}`, 'error');
        console.error('Error computing Fibonacci:', error);
    }
}

// List files
async function listFiles() {
    const resultBox = document.getElementById('files-result');
    
    try {
        showLoading(resultBox, 'Loading files...');
        
        const response = await fetch(`${goServerUrl}/files`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const files = await response.json();
        
        if (!files || files.length === 0) {
            showResult(resultBox, 'No files found', 'success');
            return;
        }
        
        let formatted = 'Files in project directory:\n\n';
        files.forEach(file => {
            const icon = file.isDir ? '📁' : '📄';
            const size = file.isDir ? '' : ` (${formatBytes(file.size)})`;
            formatted += `${icon} ${file.name}${size}\n`;
        });
        
        showResult(resultBox, formatted.trim(), 'success');
        showNotification(`Found ${files.length} files/folders`);
    } catch (error) {
        showResult(resultBox, `Error: ${error.message}`, 'error');
        console.error('Error listing files:', error);
    }
}

// Helper function to show loading state
function showLoading(element, message) {
    element.className = 'result-box show';
    element.innerHTML = `<pre>${message}</pre>`;
}

// Helper function to show result
function showResult(element, text, type = 'success') {
    element.className = `result-box show ${type}`;
    element.innerHTML = `<pre>${text}</pre>`;
}

// Helper function to format bytes
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

console.log('Renderer process initialized successfully!');

