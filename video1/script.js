// script.js - Minecraft Animation Controller - UPDATED CAPTION TIMING

// DOM Elements
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const replayBtn = document.getElementById('replay-btn');
const progressBar = document.getElementById('progress-bar');
const progressSlider = document.getElementById('progress-slider');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const sceneDots = document.querySelectorAll('.scene-dot');

// Animation Elements
const goodSteve = document.getElementById('good-steve');
const evilSteve = document.getElementById('evil-steve');
const laserBeam = document.getElementById('laser-beam');
const deathAnimation = document.getElementById('death-animation');
const text1 = document.getElementById('text-1');
const text2 = document.getElementById('text-2');
const text3 = document.getElementById('text-3');
const text4 = document.getElementById('text-4');
const text5 = document.getElementById('text-5');

// Animation Variables
let animationTime = 0;
const totalAnimationTime = 10; // 10 seconds
let isPlaying = false;
let animationRequestId;

// Initialize
function init() {
    totalTimeEl.textContent = `${totalAnimationTime.toFixed(1)}s`;
    resetAnimation();
    setupEventListeners();
    
    // Auto-play after a short delay
    setTimeout(() => {
        playAnimation();
    }, 1000);
}

// Setup Event Listeners
function setupEventListeners() {
    playBtn.addEventListener('click', playAnimation);
    pauseBtn.addEventListener('click', pauseAnimation);
    resetBtn.addEventListener('click', resetAnimation);
    replayBtn.addEventListener('click', replayAnimation);
    
    // Progress slider
    progressSlider.addEventListener('input', (e) => {
        if (!isPlaying) {
            const sliderValue = parseInt(e.target.value);
            animationTime = (sliderValue / 100) * totalAnimationTime;
            updateAnimation();
            updateProgress();
        }
    });
    
    // Scene dots
    sceneDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const dotTime = parseFloat(dot.getAttribute('data-time'));
            
            if (dotTime <= totalAnimationTime) {
                // Pause animation if playing
                if (isPlaying) {
                    pauseAnimation();
                }
                
                animationTime = dotTime;
                updateAnimation();
                updateProgress();
            }
        });
    });
}

// Play Animation
function playAnimation() {
    if (isPlaying) return;
    
    isPlaying = true;
    playBtn.disabled = true;
    pauseBtn.disabled = false;
    
    const startTime = Date.now() - (animationTime * 1000);
    
    function updateFrame() {
        if (!isPlaying) return;
        
        const currentTime = Date.now();
        animationTime = (currentTime - startTime) / 1000;
        
        if (animationTime >= totalAnimationTime) {
            animationTime = totalAnimationTime;
            pauseAnimation();
        }
        
        updateAnimation();
        updateProgress();
        
        if (isPlaying) {
            animationRequestId = requestAnimationFrame(updateFrame);
        }
    }
    
    animationRequestId = requestAnimationFrame(updateFrame);
}

// Pause Animation
function pauseAnimation() {
    if (!isPlaying) return;
    
    isPlaying = false;
    cancelAnimationFrame(animationRequestId);
    playBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Reset Animation
function resetAnimation() {
    pauseAnimation();
    animationTime = 0;
    updateAnimation();
    updateProgress();
    playBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Replay Animation
function replayAnimation() {
    resetAnimation();
    setTimeout(() => {
        playAnimation();
    }, 300);
}

// Update Animation based on current time
function updateAnimation() {
    // Reset all animations and states
    resetAllAnimations();
    
    // Apply animations based on current time
    
    // 0-2s: Steve enters and looks around
    if (animationTime >= 0.5) {
        goodSteve.style.animation = 'steveEnter 1.5s forwards';
        goodSteve.style.left = '30%';
    }
    
    if (animationTime >= 2) {
        goodSteve.classList.add('look-around');
    }
    
    // Show text 1 (smaller, appears for shorter time)
    if (animationTime >= 1 && animationTime < 2.5) {
        text1.style.opacity = '1';
    } else {
        text1.style.opacity = '0';
    }
    
    // 3-4s: Evil Steve appears
    if (animationTime >= 3.5) {
        evilSteve.style.animation = 'evilSteveEnter 1.5s forwards';
        evilSteve.style.right = '30%';
    }
    
    // Show text 2 (smaller, appears for shorter time)
    if (animationTime >= 4 && animationTime < 5) {
        text2.style.opacity = '1';
    } else {
        text2.style.opacity = '0';
    }
    
    // 5-6s: Good Steve waves (offers handshake)
    if (animationTime >= 5) {
        // Arm is already waving with CSS animation
    }
    
    // Show text 3 (smaller, appears for shorter time)
    if (animationTime >= 5.2 && animationTime < 6.2) {
        text3.style.opacity = '1';
    } else {
        text3.style.opacity = '0';
    }
    
    // 6.5-7.5s: Evil Steve's eyes turn white
    if (animationTime >= 6.5) {
        const evilEyes = document.querySelectorAll('.evil-steve .steve-eye');
        evilEyes.forEach(eye => {
            eye.classList.add('evil-eye');
        });
    }
    
    // Show text 4 (smaller, appears for shorter time)
    if (animationTime >= 6.8 && animationTime < 7.3) {
        text4.style.opacity = '1';
    } else {
        text4.style.opacity = '0';
    }
    
    // 7.5-8s: Laser beam fires
    if (animationTime >= 7.5) {
        laserBeam.classList.add('laser-fire');
        
        // Show text 5 (smaller, appears for shorter time)
        if (animationTime >= 7.5 && animationTime < 8.2) {
            text5.style.opacity = '1';
        } else {
            text5.style.opacity = '0';
        }
    }
    
    // 8-8.5s: Death animation
    if (animationTime >= 8) {
        // Hide good Steve
        goodSteve.style.opacity = '0';
        
        // Show death animation
        deathAnimation.classList.add('death-show');
        
        // Set random directions for death particles
        const particles = document.querySelectorAll('.death-particle');
        particles.forEach(particle => {
            const tx = (Math.random() - 0.5) * 100;
            const ty = -Math.random() * 100 - 50;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
        });
    }
    
    // Update scene dots
    updateSceneDots();
}

// Reset all animations
function resetAllAnimations() {
    // Remove classes that trigger animations
    goodSteve.classList.remove('look-around');
    
    const evilEyes = document.querySelectorAll('.evil-steve .steve-eye');
    evilEyes.forEach(eye => {
        eye.classList.remove('evil-eye');
    });
    
    laserBeam.classList.remove('laser-fire');
    deathAnimation.classList.remove('death-show');
    
    // Reset element styles
    goodSteve.style.opacity = '1';
    laserBeam.style.opacity = '0';
    laserBeam.style.width = '0';
    
    // Hide all text
    text1.style.opacity = '0';
    text2.style.opacity = '0';
    text3.style.opacity = '0';
    text4.style.opacity = '0';
    text5.style.opacity = '0';
}

// Update Progress Bar and Timer
function updateProgress() {
    const progressPercent = (animationTime / totalAnimationTime) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressSlider.value = progressPercent;
    
    currentTimeEl.textContent = `${animationTime.toFixed(1)}s`;
}

// Update Scene Dots
function updateSceneDots() {
    sceneDots.forEach(dot => {
        const dotTime = parseFloat(dot.getAttribute('data-time'));
        
        if (animationTime >= dotTime) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Initialize the animation when page loads
window.addEventListener('load', init);