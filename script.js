// Matrix Rain Animation
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix rain characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

// Set up the style for the matrix effect
ctx.font = `${fontSize}px 'Courier New'`;

// Animation function
function drawMatrix() {
    // Semi-transparent black background to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green text
    ctx.fillStyle = '#0F0';

    // Loop over each column
    for (let i = 0; i < drops.length; i++) {
        // Get random character
        const char = characters[Math.floor(Math.random() * characters.length)];
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Move the drop down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Run animation
setInterval(drawMatrix, 33);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation Observer
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Terminal Typing Effect
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    return new Promise(resolve => {
        function addChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(addChar, speed);
            } else {
                resolve();
            }
        }
        addChar();
    });
}

// Initialize typing animations for commands
async function initializeCommandLines() {
    const commands = document.querySelectorAll('.command.typing');
    for (const cmd of commands) {
        const text = cmd.textContent;
        await typeText(cmd, text);
    }
}

// Initialize typing animations for content
async function initializeTypingText() {
    const typingElements = document.querySelectorAll('.typing-text');
    for (const element of typingElements) {
        const text = element.textContent;
        await typeText(element, text, 30);
    }
}

// Terminal Window Effects
document.querySelectorAll('.terminal-window').forEach(terminal => {
    const header = terminal.querySelector('.terminal-header');
    const closeBtn = header.querySelector('.close');
    
    // Draggable terminal windows
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    
    header.addEventListener('mousedown', e => {
        isDragging = true;
        initialX = e.clientX - terminal.offsetLeft;
        initialY = e.clientY - terminal.offsetTop;
    });
    
    document.addEventListener('mousemove', e => {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            terminal.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Close button effect
    closeBtn.addEventListener('click', () => {
        terminal.style.transform = 'scale(0.95)';
        terminal.style.opacity = '0';
        setTimeout(() => {
            terminal.style.display = 'none';
        }, 300);
    });
});

// Enhanced Glitch Effect
const glitchText = document.querySelector('.glitch-text');
let glitchIntensity = 1;
let isGlitching = false;

function createGlitchLayers() {
    if (!glitchText) return;
    
    const text = glitchText.textContent;
    const before = document.createElement('span');
    const after = document.createElement('span');
    
    before.textContent = text;
    after.textContent = text;
    before.style.position = 'absolute';
    after.style.position = 'absolute';
    
    glitchText.appendChild(before);
    glitchText.appendChild(after);
    
    return { before, after };
}

const glitchLayers = createGlitchLayers();

function updateGlitchEffect() {
    if (!glitchText || !isGlitching) return;

    const randomOffset = (Math.random() - 0.5) * glitchIntensity;
    const randomColor = Math.random() > 0.5 ? '#0ff' : '#f0f';
    
    if (glitchLayers) {
        glitchLayers.before.style.transform = `translate(${randomOffset}px, ${randomOffset}px)`;
        glitchLayers.after.style.transform = `translate(${-randomOffset}px, ${-randomOffset}px)`;
        glitchLayers.before.style.color = randomColor;
        glitchLayers.after.style.color = randomColor;
    }
}

// Update glitch effect more frequently
const glitchInterval = setInterval(updateGlitchEffect, 50);

// Enhanced hover effect for glitch text
if (glitchText) {
    glitchText.addEventListener('mouseover', () => {
        glitchIntensity = 3;
        isGlitching = true;
    });

    glitchText.addEventListener('mouseout', () => {
        glitchIntensity = 1;
        isGlitching = false;
        if (glitchLayers) {
            glitchLayers.before.style.transform = 'none';
            glitchLayers.after.style.transform = 'none';
        }
    });
}

// Scanline effect
function createScanline() {
    const scanline = document.createElement('div');
    scanline.classList.add('scanline');
    document.body.appendChild(scanline);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initializeCommandLines();
    initializeTypingText();
    createScanline();
    
    // Add random glitch effects to terminal content
    setInterval(() => {
        const terminals = document.querySelectorAll('.terminal-content');
        const randomTerminal = terminals[Math.floor(Math.random() * terminals.length)];
        randomTerminal.style.transform = 'skew(1deg)';
        setTimeout(() => {
            randomTerminal.style.transform = 'skew(0deg)';
        }, 100);
    }, 5000);
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position
        const rotateX = (y - rect.height / 2) / 10;
        const rotateY = -(x - rect.width / 2) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Smooth scrolling with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            // Easing function
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
}); 