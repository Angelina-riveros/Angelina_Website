let timer;
let timeLeft = 0;
let running = false;

const display = document.getElementById('timer-display');
const input = document.getElementById('time-input');
const startBtn = document.getElementById('start-button');
const stopBtn = document.getElementById('stop-button');
const resetBtn = document.getElementById('reset-button');
const ovenImg = document.getElementById('ovenImg');
const steamContainer = document.querySelector('.steam-container');
const treatImgs = document.querySelectorAll('.treatImg');

function updateDisplay() {
    let hours = Math.floor(timeLeft / 3600);
    let minutes = Math.floor((timeLeft % 3600) / 60);
    let seconds = timeLeft % 60;
    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
function showRandomTreat() {
    treatImgs.forEach(img => img.style.display = 'none'); // Hide all treats
    const randomIndex = Math.floor(Math.random() * treatImgs.length);
    treatImgs[randomIndex].style.display = 'inline-block'; // Show one random treat
}

function startTimer() {
    if (running || timeLeft <= 0) return;
    running = true;
    if (ovenImg){
        ovenImg.classList.add('shake');
        ovenImg.style.display = 'block';
    }
    if (steamContainer) {
        steamContainer.classList.add('active-steam');
    }
    treatImgs.forEach(img => img.style.display = 'none');
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            running = false;
            if (ovenImg){ 
                ovenImg.classList.remove('shake');
                ovenImg.style.display = 'none';
            }
            if (steamContainer) steamContainer.classList.remove('active-steam');
            showRandomTreat();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    running = false;
    if (ovenImg){
        ovenImg.classList.remove('shake');
        ovenImg.style.display = 'none';
    }
    if (steamContainer) steamContainer.classList.remove('active-steam');    
//    document.querySelector('.steam-container').style.display = 'none';
}

function resetTimer() {
    stopTimer();
    //if (steamContainer) steamContainer.classList.remove('active-steam');
    timeLeft = parseInt(input.value, 10) || 0;
    updateDisplay();
    treatImgs.forEach(img => img.style.display = 'none');
    if (ovenImg) ovenImg.style.display = 'block';
}

startBtn.addEventListener('click', () => {
    if (!running) startTimer();
});
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
input.addEventListener('change', resetTimer);

// Initialize display
resetTimer();
