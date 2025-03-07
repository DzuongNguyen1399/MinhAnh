let progress = 0;  // Track progress (0 to 100)
const progressStep = 5; // Increase by 5% per correct answer (20 questions = 100%)
const maxCorrectAnswers = 20; // User must answer 20 correctly
const maxProgress = 100; // Max progress limit
let currentQuestionIndex = 0;
let correctAnswers = 0;

// ✅ Start Test Function
function startTest() {
    document.getElementById("quiz-selection").style.display = "none"; // Hide selection
    document.getElementById("quiz-content").style.display = "block"; // Show quiz
    questions = shuffleQuestions(); // Shuffle the questions
    currentQuestionIndex = 0;
    correctAnswers = 0;
    progress = 0;
    updateProgress();
    showQuestion();
}


// ✅ Shuffle Questions Function
function shuffleQuestions() {
    return testQuestions.sort(() => Math.random() - 0.5);
}

// HELP Functions
function showHelp() {
    document.getElementById("help-popup").style.display = "flex";
}

function hideHelp() {
    document.getElementById("help-popup").style.display = "none";
}


// ✅ Question Bank (Shuffled Every Test)
const testQuestions = [
    { question: "Dave bought ……… lamp for his mother’s birthday", answers: ["A lovely new", "A new lovely", "A lovelier new", "A new lovelier"], correct: 0 },
    { question: "The holiday season is by far the busiest time of year for ……… stores", answers: ["Of the most", "Most", "The most of", "Mostly"], correct: 1 },
    { question: "I’m sure that I would enjoy ……… one, the red wine or the white wine", answers: ["Others", "Both", "Either", "Some"], correct: 2 },
    { question: "They rejected the proposal ______ they did not think it was practical.", answers: ["or", "but", "though", "because"], correct: 3 },
    { question: "Susie ______ phoned ______ wrote after she left home.", answers: ["either, or", "neither, nor", "while, and", "though, or"], correct: 1 },
    { question: "Keep the food covered ______ the flies will contaminate it.", answers: ["or", "and", "until", "though"], correct: 0 },
    { question: "I did not go to the show ______ I had already seen it.", answers: ["until", "because", "so", "but"], correct: 1 },
    { question: "An airport is a place (planes land) ….", answers: ["Where planes land", "Which planes land", "That planes land", "Which planes land"], correct: 0 },
    { question: "The company’s new database system will be installed ……… the end of the year.", answers: ["In", "From", "By", "On"], correct: 2 },
    { question: "……… has there been more of a demand for e-business courses at universities than there is now", answers: ["Always", "Never", "Rare", "Often"], correct: 1 },
    { question: "That decision of ……… to repaint the house now was a very smart one", answers: ["Your", "You", "Yourself", "Yours"], correct: 3 },
    { question: "After Larry ….. the film on TV, he decided to buy the book.", answers: ["Have seen", "Had seen", "Had been seeing", "Saw"], correct: 1 },
    { question: "The sun …… in the East.", answers: ["Rise", "Rises", "Rising", "Has risen"], correct: 1 },
    { question: "I …. to visit you yesterday, but you ….. not at home.", answers: ["Wanted/were", "Want/are", "Want/were", "want, is"], correct: 0 },
    { question: "Last winter she ____________ (drive) to Germany.", answers: ["Drove", "Drived", "Did drive", "driven"], correct: 0 },
    { question: "I don't think he will remember the appointment _____ you remind him.", answers: ["so", "if", "unless", "lest"], correct: 2 },
    { question: "_____ he was not interested in music, he agreed to go to the concert.", answers: ["Though", "While", "For", "Since"], correct: 0 },
    { question: "He will show us around himself _____ send someone else.", answers: ["and", "if", "or", "so"], correct: 2 },
    { question: "_____ the teacher explained the lesson several times, some of the students still did not understand it.", answers: ["Although", "Even if", "Unless", "Since"], correct: 0 },
    { question: "While Tom (play)…… the piano, his mother was doing the washing-up.", answers: ["Was playing", "Were playing", "Played", "Play"], correct: 0 },
    { question: "He had taught in this school before he (leave)____ for London.", answers: ["left", "leave", "leaving", "had left"], correct: 0 },
    { question: "Duong sometimes wishes he ____ a cat.", answers: ["Is", "was", "were", "will be"], correct: 2 },
    { question: "Minh Anh likes neither Pho ___ Shrimp.", answers: ["or", "and", "nor", "but"], correct: 2 },
    { question: "Minh Anh rarely ____ rice", answers: ["eat", "eats", "eating", "is eating"], correct: 1 },
    { question: "Noone____ she has 3 birthdays every year", answers: ["believe", "believes", "will believes","is believe"], correct: 1 },
    { question: "Duong will always____ Minh Anh!", answers: ["trust", "trusts", "be trusted", "trusting"], correct: 0 },
    { question: "There is a small____ between 'lạp sườn' and 'lạp xưởng'.", answers: ["different", "difference", "differ", "differences"], correct: 1 },
    { question: "If i ___ an animal, I would be a cat...", answers: ["am", "was", "were", "would"], correct: 2 },
    { question: "Minh Anh has great____ in herself!", answers: ["confident", "confidence", "confide", "confidents"], correct: 1 },
    { question: "Does Minh Anh believe ___ ghosts? She probably does! haha", answers: ["in", "on", "about", "at"], correct: 0 },
    { question: "Minh Anh is hanging out with____ Thuy and Ha ", answers: ["either", "neither", "both", "also"], correct: 2 },
    { question: "Duong ____ for her messages everyday. EVERYDAY.", answers: ["waited", "wait", "waits", "waiting"], correct: 2 },
    { question: "Duong is coming back to vietnam ____ March, 2025. HEHE", answers: ["on", "at", "in", "with"], correct: 2 },
    { question: "Ha said she _____ abandoned by Minh Anh and Thuy :') ", answers: ["is", "was", "were", "will"], correct: 1 },
    { question: "Ha ___ milk tea for Minh Anh yesterday ", answers: ["buy", "buyed", "bought", "bot"], correct: 2 },
    { question: "She ___ too much tea earlier so now she can't sleep", answers: ["drink", "drinks", "drunk", "drank"], correct: 3 },
    { question: "Both Ha and Minh Anh ___ for the roasted chicken last evening", answers: ["pay", "payed", "paid", "paided"], correct: 2 },
    { question: "She only ____ for 5 hours last night because she drank too much tea", answers: ["sleep", "sleeps", "sleeped", "slept"], correct: 3 },
    { question: "I ___ in love when I saw her picture the first time ", answers: ["fall", "falled", "fell", "full"], correct: 2 }
];
// ✅ Show Question Function
function showQuestion() {
    if (correctAnswers >= maxCorrectAnswers) {
        showResult();
        return;
    }

    const questionObj = questions[currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;
    document.getElementById("option1").innerText = questionObj.answers[0];
    document.getElementById("option2").innerText = questionObj.answers[1];
    document.getElementById("option3").innerText = questionObj.answers[2];
    document.getElementById("option4").innerText = questionObj.answers[3];
}

// ✅ Show Question Function
function showQuestion() {
    if (correctAnswers >= maxCorrectAnswers) {
        showResult();
        return;
    }

    const questionObj = questions[currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;
    document.getElementById("option1").innerText = questionObj.answers[0];
    document.getElementById("option2").innerText = questionObj.answers[1];
    document.getElementById("option3").innerText = questionObj.answers[2];
    document.getElementById("option4").innerText = questionObj.answers[3];
}

// ✅ Play Cat Sound when correct
function playCatSound() {
    const catSound = new Audio("Audio/cat-meow.mp3");
    catSound.volume = 0.6; // Adjust volume (0.0 - 1.0)
    catSound.play().catch(error => console.log("Audio play blocked:", error));
}

// ✅ Check Answer Function (Modified)
function checkAnswer(answerIndex) {
    if (questions[currentQuestionIndex].correct === answerIndex) {
        correctAnswers++;
        let catSound = document.getElementById("cat-sound");
        catSound.currentTime = 0;  // Reset time in case it's already playing
        catSound.volume = 0.7;  // Adjust volume (0.0 - 1.0)
        catSound.play().catch(error => console.log("Audio play blocked:", error));

        updateProgress();
    }
    currentQuestionIndex++; // Move to next question
    showQuestion();
}

// ✅ Update Progress Function
function updateProgress() {
    progress = (correctAnswers / maxCorrectAnswers) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
    document.getElementById("progress-text").innerText = `Reward Progress: ${progress}%`;

    // Show reward button when full
    if (correctAnswers >= maxCorrectAnswers) {
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
    setTimeout(() => {
        const secondLeaf = document.getElementById("falling-leaf-2");
        secondLeaf.style.display = "block"; // Show second leaf
        secondLeaf.style.animation = "leafFall2 15s ease-in-out forwards"; // Start fall animation
    }, 1000);

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

    setTimeout(() => {
        const clickableLetter = document.getElementById("clickable-letter");
        // ✅ Ensure it becomes visible first
        clickableLetter.style.display = "block";  
        clickableLetter.classList.add("glowing2");
    }, 17000); // This should match the falling leaf timing
});


// 📜 Letter Click Event
document.getElementById("clickable-letter").addEventListener("click", showLetter);


function showLetter() {
    console.log("Letter clicked! Revealing love letter...");

    const letter = document.getElementById("clickable-letter");

    // ✉️ Stop glowing and disable click
    letter.classList.remove("glowing2");
    letter.style.pointerEvents = "none"; // Prevent multiple clicks

    // 📝 Ensure the letter container is **displayed first** before applying fade-in effect
    const letterContainer = document.getElementById("paper-letter-container");
    
    setTimeout(() => {
        letterContainer.style.display = "block"; // Make sure it's visible
        setTimeout(() => {
            letterContainer.classList.add("show-letter"); // Smooth fade-in with zoom effect
        }, 10); // Tiny delay for transition effect
    }, 1500); // 3-second delay before letter starts appearing
}

let typingTimeout; // Store timeout reference to prevent duplication

function typeMessage() {
    let letters = document.querySelectorAll(".letter"); // Select all letters
    let delay = 110; // Adjust speed (higher = slower effect)

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