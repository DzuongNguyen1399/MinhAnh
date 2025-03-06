let progress = 0;  // Track progress (0 to 100)
const progressStep = 50; // Increase by 25% per correct answer
const maxProgress = 100; // Max limit for reward

// Function to start quiz based on section
function startQuiz(section) {
    document.getElementById("quiz-selection").style.display = "none"; // Hide selection
    document.getElementById("quiz-content").style.display = "block"; // Show quiz

    // Load different questions based on section
    if (section === "listening") {
        loadQuestions(listeningQuestions);
    } else if (section === "speaking") {
        loadQuestions(speakingQuestions);
    } else {
        loadQuestions(readingQuestions);
    }
}


// Define different question sets
const listeningQuestions = [
    { question: "What is the synonym of 'Happy'?", answers: ["Excited", "Sad", "Angry", "Bored"], correct: 0 },
    { question: "Which sentence is correct?", answers: ["She go to school.", "She goes to school.", "She going to school.", "She goed to school."], correct: 1 }
];

const speakingQuestions = [
    { question: "How do you introduce yourself?", answers: ["I am name.", "My name is...", "Name my is...", "Myself name is..."], correct: 1 },
    { question: "What do you say when you meet someone?", answers: ["Goodbye", "Hello", "Go away", "Talk later"], correct: 1 }
];

const readingQuestions = [
    { question: "What is the past tense of 'Eat'?", answers: ["Eated", "Eats", "Ate", "Eating"], correct: 2 },
    { question: "What is the opposite of 'Fast'?", answers: ["Quick", "Slow", "Speedy", "Rapid"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;
let activeQuestions = [];

// Function to load the correct questions
function loadQuestions(questions) {
    activeQuestions = questions;
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

// Function to display the next question
function showQuestion() {
    if (currentQuestion >= activeQuestions.length) {
        showResult();
        return;
    }

    document.getElementById("question").innerText = activeQuestions[currentQuestion].question;
    document.getElementById("option1").innerText = activeQuestions[currentQuestion].answers[0];
    document.getElementById("option2").innerText = activeQuestions[currentQuestion].answers[1];
    document.getElementById("option3").innerText = activeQuestions[currentQuestion].answers[2];
    document.getElementById("option4").innerText = activeQuestions[currentQuestion].answers[3];
}

// Function to check the answer
function checkAnswer(answerIndex) {
    if (answerIndex === activeQuestions[currentQuestion].correct) {
        score++;
        updateProgress();
    }
    currentQuestion++;
    showQuestion();
}

// Update progress meter
function updateProgress() {
    progress += progressStep;
    if (progress > maxProgress) progress = maxProgress; // Limit to 100%
    
    document.getElementById("progress-bar").style.width = `${progress}%`;
    document.getElementById("progress-text").innerText = `Reward Progress: ${progress}%`;

    // Show reward button when full
    if (progress === maxProgress) {
        document.getElementById("reward-button").style.display = "block";
    }
}


function showRewardScene() {
    // Hide quiz & progress elements
    document.getElementById("quiz-content").style.display = "none"; 
    document.getElementById("progress-container").style.display = "none"; 
    document.getElementById("reward-button").style.display = "none"; 

    // Hide all idle cats
    hideIdleCats();

    // 🍂 Show and Animate the Falling Leaf
    setTimeout(() => {
        const leaf = document.getElementById("falling-leaf");
        leaf.style.display = "block"; // Make sure it's visible before animating

        // Reset and Restart the animation properly
        leaf.style.animation = "none"; // Reset animation
        setTimeout(() => {
            leaf.style.animation = "leafFall 15s ease-in-out forwards"; // Restart animation
        }, 100); // Tiny delay to restart animation
    }, 2000); // Leaf appears 2 seconds after background

    
    // Hide the big cat and moving eyes
    document.getElementById("big-cat-container").style.display = "none";

    // 🛑 Remove the big "TOEIC QUIZ" Title
    const bigTitle = document.getElementById("toeic-title");
    if (bigTitle) {
        bigTitle.style.display = "none"; // Instantly hide it
    }

    // 🎵 Play Background Music
    const music = document.getElementById("ambient-music");
    if (music) {
         music.volume = 0.5; // Adjust volume (0.0 - 1.0)
         music.loop = true; // Ensure it loops continuously
         music.play().catch(error => console.log("Audio play blocked:", error)); // Handle autoplay restrictions
    }

    
    // 🌿 Show the Picnic Background FIRST
    const rewardScene = document.getElementById("reward-scene");
    rewardScene.style.display = "block";
    setTimeout(() => {
        rewardScene.style.opacity = "1";  // Fade in
        rewardScene.style.filter = "blur(0px)"; // Gradually remove blur
    }, 100);

    

    // 🐱 Reveal the Cats as the Leaf Passes Their Positions
    setTimeout(() => {
        const flowerCat = document.getElementById("flower-cat-container");
        flowerCat.style.display = "block"; // Ensure it's visible
        setTimeout(() => {
            flowerCat.style.opacity = "1"; // Make it fade in
        }, 10);
    }, 10500); // Flower cat appears halfway down

    setTimeout(() => {
        const letterCat = document.getElementById("letter-cat-container");
        letterCat.style.display = "block"; // Ensure it's visible
        setTimeout(() => {
            letterCat.style.opacity = "1"; // Make it fade in
        }, 10);
    }, 10500); // Letter cat appears when the leaf is near the 
    
   // ✅ Show the Clickable Flower after the first leaf finishes falling
    setTimeout(() => {
        const clickableFlower = document.getElementById("clickable-flower");
        clickableFlower.style.display = "block";  // 👈 Make it visible
        clickableFlower.classList.add("glowing"); // 👈 Add glow effect
    }, 17000); // Appear after first leaf falls
}

document.getElementById("clickable-flower").addEventListener("click", () => {
    console.log("Flower clicked! Starting second transition...");

    // ✅ Stop bird music and start love song
    const birdMusic = document.getElementById("ambient-music");
    const loveSong = document.getElementById("love-song");

    if (birdMusic) {
        birdMusic.pause();
        birdMusic.currentTime = 0;
    }
    
    if (loveSong) {
        loveSong.volume = 0.6;
        loveSong.loop = true;
        loveSong.play().catch(error => console.log("Audio play blocked:", error));
    }

    // ✅ Hide the clickable flower
    document.getElementById("clickable-flower").style.display = "none";

    // ✅ Start second leaf animation
    showSecondLeafAnimation();

    // ✅ Show new guitar & drum cats after leaf almost finishes falling
    setTimeout(() => {
        document.getElementById("new-guitar-cat").style.display = "block";
        setTimeout(() => {
            document.getElementById("new-guitar-cat").style.opacity = "1";
        }, 50);
    }, 10000);

    setTimeout(() => {
        document.getElementById("new-drum-cat").style.display = "block";
        setTimeout(() => {
            document.getElementById("new-drum-cat").style.opacity = "1";
        }, 50);
    }, 10000);

    // ✅ Make the letter glow after the second leaf fully falls
    setTimeout(() => {
        document.getElementById("paper-letter-container").classList.add("glowing");
    }, 16000);
});

function showSecondLeafAnimation() {
    setTimeout(() => {
        const secondLeaf = document.getElementById("falling-leaf-2");
        secondLeaf.style.display = "block"; // Show second leaf
        secondLeaf.style.animation = "leafFall2 15s ease-in-out forwards"; // Start fall animation
    }, 1000); // Delay after clicking the letter
     // ✅ After the 2nd leaf has fallen, make the letter clickable
    setTimeout(() => {
        const clickableLetter = document.getElementById("clickable-letter");
        clickableLetter.style.display = "block";  // 👈 Make it visible
        clickableLetter.classList.add("glowing"); // 👈 Add glow effect
    }, 17000); // Same duration as 2nd leaf fall
}


// 📜 Letter Click Event
document.getElementById("clickable-letter").addEventListener("click", showLetter);


function showLetter() {
    console.log("Letter clicked! Revealing love letter...");

    const letter = document.getElementById("clickable-letter");

    // ✉️ Stop glowing and disable clicking
    letter.classList.remove("glowing");
    letter.style.pointerEvents = "none"; 
}

// Function to move text slightly up
function moveTextUp() {
    const letterText = document.getElementById("letter-text");
    letterText.classList.add("move-up"); // Apply smooth movement
}

let typingTimeout; // Store timeout reference to prevent duplication

function typeMessage() {
    let letters = document.querySelectorAll(".letter"); // Select all letters
    let delay = 150; // Adjust speed (higher = slower effect)

    // ⏳ Delay starting the text animation by 3 seconds (3000ms)
    setTimeout(() => {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add("show"); // Apply fade-in animation
            }, index * delay); // Increase delay per letter for a dramatic effect
        });
    }, 2500); // **4-second delay before starting**
}

// 📜 Letter Click Event (Start Animation on Click)
document.getElementById("clickable-letter").addEventListener("click", typeMessage);

function showResult() {
    document.getElementById("quiz-content").innerHTML = `
        <h1>🎉 Quiz Completed! 🌟</h1>
        <p>Your Score: ${score} / ${activeQuestions.length}</p>
        <button onclick="location.reload()">🔄 Try Again</button>
    `;
}

document.addEventListener("mousemove", (event) => {
    const eyes = document.querySelectorAll(".eye"); // Select both eyes

    eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect(); // Get eye position
        const eyeX = rect.left + rect.width / 2; // Find the center of the eye
        const eyeY = rect.top + rect.height / 2;

        const deltaX = event.clientX - eyeX;
        const deltaY = event.clientY - eyeY;
        const angle = Math.atan2(deltaY, deltaX); // Calculate angle

        // Rotate the eyeball towards the cursor
        eye.style.transform = `translate(-50%, -50%) rotate(${angle + Math.PI / 2}rad)`;
    });
});


// ✅ Declare all idle timeout variables at the top
let idleTimeout1, idleTimeout2, idleTimeout3, idleTimeout4, idleTimeout5, idleTimeout6,idleTimeout7, idleTimeout8, idleTimeout9;

const idleTimeLimit1 = 10000; // 5 seconds for first cat
const idleTimeLimit2 = 20000; // 10 seconds for second cat (Tom)
const idleTimeLimit3 = 30000; // 15 seconds for Idle Cat 3
const idleTimeLimit4 = 40000; // 20 seconds for Idle Cat 4
const idleTimeLimit5 = 40000; // 20 seconds for Idle Cat 5
const idleTimeLimit6 = 50000; // 25 seconds for Idle Cat 6
const idleTimeLimit7 = 50000; // 25 seconds for Idle Cat 7
const idleTimeLimit8 = 60000; // 30 seconds for Idle Cat 8
const idleTimeLimit9 = 70000; // 35 seconds for Idle Cat 9

// Detect user activity
document.addEventListener("DOMContentLoaded", resetIdleTimer);
document.addEventListener("mousemove", resetIdleTimer);
document.addEventListener("keydown", resetIdleTimer);

function resetIdleTimer() {
    clearTimeout(idleTimeout1);
    clearTimeout(idleTimeout2);
    clearTimeout(idleTimeout3);
    clearTimeout(idleTimeout4);
    clearTimeout(idleTimeout5);
    clearTimeout(idleTimeout6);
    clearTimeout(idleTimeout7);
    clearTimeout(idleTimeout8);
    clearTimeout(idleTimeout9);

    hideIdleCats();  // Hide both cats if appearing

    // Restart the timers
    idleTimeout1 = setTimeout(showIdleCat1, idleTimeLimit1);
    idleTimeout2 = setTimeout(showIdleCat2, idleTimeLimit2);
    idleTimeout3 = setTimeout(showIdleCat3, idleTimeLimit3);
    idleTimeout4 = setTimeout(showIdleCat4, idleTimeLimit4);
    idleTimeout5 = setTimeout(showIdleCat5, idleTimeLimit5);
    idleTimeout6 = setTimeout(showIdleCat6, idleTimeLimit6);
    idleTimeout7 = setTimeout(showIdleCat7, idleTimeLimit7);
    idleTimeout8 = setTimeout(showIdleCat8, idleTimeLimit8);
    idleTimeout9 = setTimeout(showIdleCat9, idleTimeLimit9);
}

// Show first cat (Idle Cat 1)
function showIdleCat1() {
    console.log("User is idle, showing first cat...");
    const idleCat = document.getElementById("idle-cat");

    if (idleCat) {
        idleCat.classList.add("slide"); // Slide first cat in
    } else {
        console.error("Idle cat element not found!");
    }
}

// Show second cat (Tom)
function showIdleCat2() {
    console.log("User is idle for longer, showing second cat...");
    const idleCat2 = document.getElementById("idle-cat-2");

    if (idleCat2) {
        idleCat2.classList.add("slide-2"); // Slide second cat (Tom) in
    } else {
        console.error("Idle cat 2 (Tom) element not found!");
    }
}

// Show third cat (Idle Cat 3)
function showIdleCat3() {
    console.log("User is idle for even longer, showing third cat...");
    const idleCat3 = document.getElementById("idle-cat-3");

    
    if (idleCat3) {
        idleCat3.classList.add("slide-3"); // Slide 3rd cat  in
    } else {
        console.error("Idle cat 3 element not found!");
    }
}

// Show 4th cat (Idle Cat 4)
function showIdleCat4() {
    console.log("User is idle for even longer, showing 4th cat...");
    const idleCat4 = document.getElementById("idle-cat-4");

    
    if (idleCat4) {
        idleCat4.classList.add("slide-4"); // Slide 4th cat  in
    } else {
        console.error("Idle cat 4 element not found!");
    }
}

// Show 5th cat (Idle Cat 5)
function showIdleCat5() {
    console.log("User is idle for even longer, showing 5th cat...");
    const idleCat5 = document.getElementById("idle-cat-5");

    
    if (idleCat5) {
        idleCat5.classList.add("slide-5"); // Slide 5th cat  in
    } else {
        console.error("Idle cat 5 element not found!");
    }
}

// Show 6th cat (Idle Cat 6)
function showIdleCat6() {
    console.log("User is idle for even longer, showing 6th cat...");
    const idleCat6 = document.getElementById("idle-cat-6");

    
    if (idleCat6) {
        idleCat6.classList.add("slide-6"); // Slide 6th cat  in
    } else {
        console.error("Idle cat 6 element not found!");
    }
}

// Show 7th cat (Idle Cat 7)
function showIdleCat7() {
    console.log("User is idle for even longer, showing 7th cat...");
    const idleCat7 = document.getElementById("idle-cat-7");

    
    if (idleCat7) {
        idleCat7.classList.add("slide-7"); // Slide 7th cat  in
    } else {
        console.error("Idle cat 7 element not found!");
    }
}

// Show 8th cat (Idle Cat 8)
function showIdleCat8() {
    console.log("User is idle for even longer, showing 8th cat...");
    const idleCat8 = document.getElementById("idle-cat-8");

    
    if (idleCat8) {
        idleCat8.classList.add("slide-8"); // Slide 8th cat  in
    } else {
        console.error("Idle cat 8 element not found!");
    }
}

// Show 9th cat (Idle Cat 9)
function showIdleCat9() {
    console.log("User is idle for even longer, showing 9th cat...");
    const idleCat9 = document.getElementById("idle-cat-9");

    
    if (idleCat9) {
        idleCat9.classList.add("slide-9"); // Slide 9th cat  in
    } else {
        console.error("Idle cat 9 element not found!");
    }
}


// Hide all cats when user moves
function hideIdleCats() {
    console.log("User is active, hiding all cats...");
    const idleCat = document.getElementById("idle-cat");
    const idleCat2 = document.getElementById("idle-cat-2");
    const idleCat3 = document.getElementById("idle-cat-3");
    const idleCat4 = document.getElementById("idle-cat-4");
    const idleCat5 = document.getElementById("idle-cat-5");
    const idleCat6 = document.getElementById("idle-cat-6");
    const idleCat7 = document.getElementById("idle-cat-7");
    const idleCat8 = document.getElementById("idle-cat-8");
    const idleCat9 = document.getElementById("idle-cat-9");

    if (idleCat) {
        idleCat.classList.remove("slide");
    }
    if (idleCat2) {
        idleCat2.classList.remove("slide-2");
    }
    if (idleCat3) {
        idleCat3.classList.remove("slide-3");
    }
    if (idleCat4) {
        idleCat4.classList.remove("slide-4");
    }
    if (idleCat5) {
        idleCat5.classList.remove("slide-5");
    }
    if (idleCat6) {
        idleCat6.classList.remove("slide-6");
    }
    if (idleCat7) {
        idleCat7.classList.remove("slide-7");
    }
    if (idleCat8) {
        idleCat8.classList.remove("slide-8");
    }
    if (idleCat9) {
        idleCat9.classList.remove("slide-9");
    }
}

// Start the idle timer when the page loads
resetIdleTimer();