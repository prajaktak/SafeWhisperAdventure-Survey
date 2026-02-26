// SafeWhisper Adventure Survey Script

let currentQuestion = 1;
let totalQuestions = 0;
const responses = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    totalQuestions = questions.length;

    updateProgress();
    setupEventListeners();
});

function setupEventListeners() {
    // Navigation buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateCurrentQuestion()) {
                nextQuestion();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', previousQuestion);
    }

    // Listen buttons
    document.querySelectorAll('.listen-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            speakText(text, this);
        });
    });

    // Option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            handleOptionClick(this);
        });
    });

    // Age buttons
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            const age = this.getAttribute('data-age');
            const input = this.closest('.question').querySelector('input[name="age"]');
            if (input) input.value = age;
        });
    });

    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleSubmit);
    });
}

function handleOptionClick(btn) {
    const question = btn.closest('.question');
    const options = question.querySelector('.options');
    const input = question.querySelector('input[type="hidden"]');
    const isMultiSelect = options.classList.contains('multi-select');
    const maxSelections = options.getAttribute('data-max');

    if (isMultiSelect) {
        // Toggle selection
        btn.classList.toggle('selected');

        // Check max selections
        const selected = question.querySelectorAll('.option-btn.selected');
        if (maxSelections && selected.length > parseInt(maxSelections)) {
            btn.classList.remove('selected');
            alert(`You can only pick ${maxSelections} options!`);
            return;
        }

        // Update hidden input
        const values = Array.from(selected).map(b => b.getAttribute('data-value'));
        input.value = values.join(',');

    } else {
        // Single select
        question.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        input.value = btn.getAttribute('data-value');
    }
}

function speakText(text, button) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.rate = 0.85; // Slower for children
    msg.pitch = 1.1; // Slightly higher pitch
    msg.volume = 1.0;

    // Update button text
    const originalText = button.textContent;
    button.textContent = '🔊 Playing...';
    button.disabled = true;

    msg.onend = () => {
        button.textContent = originalText;
        button.disabled = false;
    };

    msg.onerror = () => {
        button.textContent = originalText;
        button.disabled = false;
        console.error('Speech synthesis error');
    };

    window.speechSynthesis.speak(msg);
}

function validateCurrentQuestion() {
    const currentQ = document.querySelector(`.question[data-question="${currentQuestion}"]`);
    const input = currentQ.querySelector('input[type="hidden"]');

    // If it's the last question (thank you page), no validation needed
    if (currentQuestion === totalQuestions) {
        return true;
    }

    // If no input exists (like info/thank you pages), skip validation
    if (!input) {
        return true;
    }

    if (!input.value) {
        alert('Please select an answer before continuing!');
        return false;
    }

    return true;
}

function nextQuestion() {
    if (currentQuestion < totalQuestions) {
        // Hide current question
        document.querySelector(`.question[data-question="${currentQuestion}"]`)
            ?.classList.remove('active');

        currentQuestion++;

        // Show next question
        document.querySelector(`.question[data-question="${currentQuestion}"]`)
            ?.classList.add('active');

        updateProgress();
        updateNavButtons();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        // Hide current question
        document.querySelector(`.question[data-question="${currentQuestion}"]`)
            ?.classList.remove('active');

        currentQuestion--;

        // Show previous question
        document.querySelector(`.question[data-question="${currentQuestion}"]`)
            ?.classList.add('active');

        updateProgress();
        updateNavButtons();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const progressBar = document.getElementById('progress');
    if (progressBar) {
        const progress = (currentQuestion / totalQuestions) * 100;
        progressBar.style.width = progress + '%';
    }
}

function updateNavButtons() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (prevBtn) {
        prevBtn.style.display = currentQuestion === 1 ? 'none' : 'block';
    }

    if (nextBtn) {
        // Hide next button on last question (submit page)
        nextBtn.style.display = currentQuestion === totalQuestions ? 'none' : 'block';
    }
}

function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    // Collect all form data
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Add timestamp
    data.timestamp = new Date().toISOString();
    data.surveyType = e.target.id;

    // Save to localStorage
    saveResponse(data);

    // Show completion message
    e.target.style.display = 'none';
    document.getElementById('completionMessage').style.display = 'block';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('Survey submitted:', data);
}

function saveResponse(data) {
    // Get existing responses
    let responses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');

    // Add new response
    responses.push(data);

    // Save back to localStorage
    localStorage.setItem('surveyResponses', JSON.stringify(responses));

    console.log('Response saved. Total responses:', responses.length);
}

// Export function for researchers to download data
function downloadResponses() {
    const responses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');

    if (responses.length === 0) {
        alert('No responses to download yet!');
        return;
    }

    const dataStr = JSON.stringify(responses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `survey-responses-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

// Make download function available globally
window.downloadResponses = downloadResponses;

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentQuestion < totalQuestions) {
        if (validateCurrentQuestion()) {
            nextQuestion();
        }
    } else if (e.key === 'ArrowLeft' && currentQuestion > 1) {
        previousQuestion();
    }
});

// Initialize navigation buttons visibility
updateNavButtons();
