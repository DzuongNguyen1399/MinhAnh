const maxCorrectAnswers = 10; // Number of correct answers needed to unlock reward
let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = [];
let is2010Test = false;

const birthdayQuestions = Array.from({ length: 50 }, (_, i) => ({
    question: `Birthday Question ${i + 1}?`,
    answers: ["A", "B", "C", "D"],
    correct: 0
}));

const firstSpecialQuestion2010 = {
    question: `<span style="font-size:2.1em;">Do you like me?</span> <span style="font-size:2.1em;">👀</span>`,
    answers: ["Yes", "No"],
    correct: 0,
    isFirstSpecial: true
};

const secondSpecialQuestion2010 = {
    question: `<span style="font-size:2em;">Ready for our sunny ride together? ☀️</span>`,
    answers: ["Let's go!", "Maybe later"],
    correct: 0,
    isSecondSpecial: true
};

const womensDayQuestions = [
    // 🌸 Prepositions (10)
    {
        question: "The flowers arrived ___ the morning of Women's Day.",
        answers: ["in", "on", "at", "by"],
        correct: [1]
    },
    {
        question: "People walked happily ___ the street during the event.",
        answers: ["along", "under", "between", "in front"],
        correct: [0]
    },


    // 🎁 Themed grammar & fun facts (10)
    {
        question: "A bunch of roses ___ placed on the Women's Day table before guests arrived.",
        answers: ["was", "had been", "were", "has been"],
        correct: [1]
    },
    {
        question: "You ___ bring an expensive gift to Women's Day, but a kind note is nice.",
        answers: ["must", "should", "don't have to", "can't"],
        correct: [2]
    },
    {
        question: "Lan suggested ___ a short thank-you letter for every woman in the office.",
        answers: ["write", "writing", "writes", "to writing"],
        correct: [1]
    },
    {
        question: "This year's Women's Day party is ___ than the one last year.",
        answers: ["fun", "more fun", "funniest", "funny"],
        correct: [1]
    },
    {
        question: "They have been preparing the Women's Day show ___ two weeks.",
        answers: ["since", "for", "by", "during"],
        correct: [1]
    },
   
    {
        question: "The volunteers made Women's Day cards by hand, ___?",
        answers: ["did they", "didn't they", "do they", "don't they"],
        correct: [1]
    },
    {
        question: "If the team had received more money, it ___ more gifts for women.",
        answers: ["will give", "would give", "would have given", "gave"],
        correct: [2]
    },

    // 🌷 Tag questions (10)
    {
        question: "She bought roses for her teacher, ___?",
        answers: ["did she", "didn't she", "does she", "was she"],
        correct: [1]
    },
    {
        question: "They don't usually sell lotus flowers here, ___?",
        answers: ["do they", "don't they", "did they", "aren't they"],
        correct: [0]
    },
    {
        question: "It's beautiful when all the tulips bloom together, ___?",
        answers: ["is it", "isn't it", "wasn't it", "doesn't it"],
        correct: [1]
    },
    {
        question: "Lan has never seen a sunflower field before, ___?",
        answers: ["has she", "hasn't she", "did she", "does she"],
        correct: [0]
    },
    {
        question: "Your mother loves orchids, ___?",
        answers: ["does she", "did she", "doesn't she", "is she"],
        correct: [2]
    },
    {
        question: "We should give flowers to our teachers, ___?",
        answers: ["shouldn't we", "should we", "do we", "did we"],
        correct: [0]
    },
    {
        question: "He was arranging the bouquets this morning, ___?",
        answers: ["isn't he", "wasn't he", "didn't he", "was he"],
        correct: [1]
    },
    {
        question: "They've finished decorating the hall with roses, ___?",
        answers: ["haven't they", "don't they", "didn't they", "had they"],
        correct: [0]
    },
    {
        question: "There aren't any lilies left on the shelf, ___?",
        answers: ["are they", "aren't they", "are there", "aren't there"],
        correct: [2]
    },
    {
        question: "Everyone enjoyed the Women's Day party, ___?",
        answers: ["did they", "didn't they", "doesn't they", "wasn't they"],
        correct: [1]
    },

    // 🌺 Flower extras (10)
    {
        question: "Lotus flowers usually bloom ___ early morning when the sun is soft.",
        answers: ["at", "in", "on", "by"],
        correct: [1]
    },
    {
        question: "In Vietnam, the lotus is known as a symbol of ___ beauty and purity.",
        answers: ["nature", "natural", "naturally", "nation"],
        correct: [1]
    },
    {
        question: "Roses are often ____ to show love, while sunflowers represent long-lasting friendship.",
        answers: ["give", "gave", "gives", "given"],
        correct: [3]
    },
    {
        question: "If you water your flowers every day, they ___ fresh longer.",
        answers: ["stay", "stayed", "staying", "stays"],
        correct: [0]
    },
    {
        question: "The woman who grows the most beautiful orchids in town ___ them herself.",
        answers: ["water", "waters", "watering", "watered"],
        correct: [1]
    },
    {
        question: "Each flower in this bouquet ___ a different wish for Women's Day.",
        answers: ["mean", "means", "meant", "meaning"],
        correct: [1]
    },
    {
        question: "Lan asked her friend ___ help her choose flowers for her teacher.",
        answers: ["for", "to", "with", "of"],
        correct: [1]
    },
    {
        question: "Daisies are smaller than roses, but they are often ___ cheerful.",
        answers: ["as", "so", "more", "most"],
        correct: [2]
    },
    {
        question: "The flower shop owner said she ___ out of tulips that morning.",
        answers: ["was", "is", "were", "be"],
        correct: [0]
    },
    {
        question: "Women in Vietnam often receive flowers and cards ___ October 20th.",
        answers: ["on", "in", "at", "by"],
        correct: [0]
    },

    // 🌼 Flower extras II (10)
    {
        question: "The lotus, which ___ in muddy water, is a symbol of purity in Vietnam.",
        answers: ["grow", "grows", "is grow", "has grown"],
        correct: [1]
    },
    {
        question: "Roses have been loved for centuries because they ___ beauty and love.",
        answers: ["symbol", "symbolize", "symbolized", "are symbolizing"],
        correct: [1]
    },
    {
        question: "If you keep sunflowers near the window, they usually ___ the light.",
        answers: ["follows", "are follow", "follow", "have followed"],
        correct: [2]
    },
    {
        question: "Orchids ___ more slowly than most flowers, but they last much longer.",
        answers: ["grow", "grew", "are grown", "growing"],
        correct: [0]
    },
    {
        question: "A bouquet of lilies ___ the meaning of purity and devotion.",
        answers: ["carry", "carries", "is carry", "carried"],
        correct: [1]
    },
    {
        question: "She asked me where I ___ those pink tulips from.",
        answers: ["buy", "bought", "have bought", "was buy"],
        correct: [1]
    },
    {
        question: "Daisies are small flowers that often ___ new beginnings and cheerfulness.",
        answers: ["represent", "represented", "are representing", "represents"],
        correct: [0]
    },
    {
        question: "If the weather ___ warmer, the flowers would bloom earlier.",
        answers: ["is", "was", "were", "been"],
        correct: [2]
    },
    {
        question: "In many countries, red roses are given to people ___ we love.",
        answers: ["who", "which", "whom", "whose"],
        correct: [2]
    },
    {
        question: "Lan said she ___ her friend a sunflower bouquet for Women's Day.",
        answers: ["gives", "gave", "would give", "has giving"],
        correct: [2]
    }
];

const BIKE_MIN_DELAY_MS = 3000;
const BIKE_MAX_DELAY_MS = 6000;
const BIKE_MIN_INITIAL_DELAY_MS = 6000;
const BIKE_MAX_INITIAL_DELAY_MS = 9000;
const SCENE_SWAP_DELAY_MS = 2000;
const POST_SCENE_CONTINUE_DELAY_MS = 500;
const SUN_AUDIO_START_DELAY_MS = 2000;
const AUDIO_FADE_DURATION_MS = 1000;
const QUIZ_CONTAINER_FADE_MS = 1000;
const SCENE_MODE_CROSSFADE_MS = 600;
const RAIN_TO_SUN_STAGE_DURATION_MS = 1000;
const SUN_POST_TRANSITION_PAUSE_MS = 1500;
const SHOP_INTRO_FADE_MS = 800;
const QUIZ_SCROLL_DELAY_MS = 1000;
const QUIZ_SELECTION_FADE_MS = 200;
const BIKE_BUBBLE_TOGGLE_VISIBLE_MS = 3000;
const BUBBLE_AUTO_CHANCE = 0.25;
const BUBBLE_AUTO_DELAY_MIN_MS = 1000;
const BUBBLE_AUTO_DELAY_MAX_MS = 12000;
const BUBBLE_AUTO_VISIBLE_MS = 3000;
const OPTION_FADE_MS = 300;
const FINAL_LETTER_SCENE_FADE_MS = 2000;
const FINAL_LETTER_OVERLAY_DELAY_MS = FINAL_LETTER_SCENE_FADE_MS + 1000;

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let audioContextInstance = null;
const audioGainNodes = new Map();

const elements = {
    quizSelection: document.getElementById("quiz-selection"),
    quizContent: document.getElementById("quiz-content"),
    question: document.getElementById("question"),
    options: ["option1", "option2", "option3", "option4"].map((id) => document.getElementById(id)),
    progressBar: document.getElementById("progress-bar"),
    progressText: document.getElementById("progress-text"),
    rewardButton: document.getElementById("reward-button"),
    progressContainer: document.getElementById("progress-container"),
    catSound: document.getElementById("cat-sound"),
    correctSound: document.getElementById("correct-sound"),
    rainBikeCat: document.getElementById("cat-bike-rain"),
    sunnyBikeCat: document.getElementById("cat-bike"),
    rainBikeBubble: document.getElementById("bike-bubble-rain"),
    sunBikeBubble: document.getElementById("bike-bubble-sun"),
    sunBikeAttachmentFlower: document.getElementById("bike-attachment-flower"),
    sunBikeAttachmentLetter: document.getElementById("bike-attachment-letter"),
    toggleBar: document.getElementById("quiz-toggle-bar"),
    coinCounter: document.getElementById("coin-counter"),
    coinCount: document.getElementById("coin-count"),
    toeicTitle: document.getElementById("toeic-title"),
    bigCatContainer: document.getElementById("big-cat-container"),
    rainAudio: document.getElementById("rain-audio"),
    sunAudio: document.getElementById("sun-audio"),
    lemonTreeAudio: document.getElementById("lemon-tree-audio"),
    rainOverlay: document.getElementById("rain-overlay"),
    womensDayIntro: document.getElementById("womens-day-intro"),
    womensDayCatseller: document.getElementById("womens-day-catseller"),
    womensDayFlower: document.getElementById("womens-day-flower"),
    womensDayLetter: document.getElementById("womens-day-letter"),
    shopMusic: document.getElementById("shop-music"),
    shopItemViewer: document.getElementById("shop-item-viewer"),
    shopItemViewerItem: document.getElementById("shop-item-viewer-item"),
    shopItemViewerImage: document.getElementById("shop-item-viewer-image"),
    shopItemPriceTag: document.getElementById("shop-item-price-tag"),
    shopItemPriceValue: document.getElementById("shop-item-price-value"),
    shopItemPurchaseButton: document.getElementById("shop-item-purchase"),
    shopItemFeedback: document.getElementById("shop-item-feedback"),
    backToShop: document.getElementById("back-to-shop"),
    finalLetterOverlay: document.getElementById("final-letter-overlay"),
    finalLetterImage: document.getElementById("final-letter-image")
};

const quizContainer = document.querySelector(".quiz-container");
const quizCollapseBody = document.getElementById("quiz-collapse-body");
let test2010State = null;
let rainBikeSwapPending = false;
let pendingFirstSpecialTransition = false;
let removeRainTimeout = null;
let removeSunTimeout = null;
let firstSpecialSwapTimeout = null;
let firstSpecialResumeTimeout = null;
let sunAudioTimeout = null;
let shopMusicTimeout = null;
let shopMusicShouldPlay = false;
let shopMusicResumeHandler = null;
let shopFinalSceneInProgress = false;
let finalSceneItemsUnlocked = false;
let finalLetterSequenceTriggered = false;
let quizContainerHideTimeout = null;
let quizContainerCollapsed = false;
let quizContentHideTimeout = null;
let quizScrollUnfurlTimeout = null;
let answerFeedbackPromise = null;
let coinCountPulseTimeout = null;
let rainToSunStageTimeouts = [];
let womensDayIntroActive = false;
let womensDayIntroTimeout = null;
let womensDayIntroStartCallback = null;
let resumeSceneStateAfterShop = null;
let currentVisualMode = null;
let shopItemViewerActive = false;
let shopItemViewerInitialFlowerDisplay = "";
let currentShopItem = null;
let shopItemFeedbackTimeout = null;
const purchasedShopItems = new Set();

const SHOP_ITEMS = {
    flower: {
        id: "flower",
        name: "Flower Gift",
        value: 10,
        image: "Images/Flowergift.png",
        alt: "Flower gift close-up"
    }
};

function setShopItemFeedback(message, { error = false, duration = 2000 } = {}) {
    if (!elements.shopItemFeedback) {
        return;
    }
    if (shopItemFeedbackTimeout) {
        clearTimeout(shopItemFeedbackTimeout);
        shopItemFeedbackTimeout = null;
    }
    const hasMessage = Boolean(message);
    elements.shopItemFeedback.textContent = hasMessage ? message : "";
    elements.shopItemFeedback.classList.toggle("visible", hasMessage);
    elements.shopItemFeedback.classList.toggle("error", hasMessage && error);
    if (hasMessage && duration > 0) {
        shopItemFeedbackTimeout = setTimeout(() => {
            shopItemFeedbackTimeout = null;
            if (elements.shopItemFeedback) {
                elements.shopItemFeedback.classList.remove("visible", "error");
                elements.shopItemFeedback.textContent = "";
            }
        }, duration);
    }
}

function updateWomensDayShopItems() {
    const flowerPurchased = purchasedShopItems.has("flower");
    if (elements.womensDayFlower) {
        elements.womensDayFlower.disabled = flowerPurchased;
        const targetDisplay = !flowerPurchased
            ? (shopItemViewerInitialFlowerDisplay || "")
            : "none";
        elements.womensDayFlower.style.display = targetDisplay;
        elements.womensDayFlower.setAttribute("aria-hidden", flowerPurchased ? "true" : "false");
    }
    if (elements.womensDayLetter) {
        const letterActive = flowerPurchased && !shopFinalSceneInProgress && !finalSceneItemsUnlocked;
        elements.womensDayLetter.classList.toggle("available", flowerPurchased);
        elements.womensDayLetter.disabled = !letterActive;
        elements.womensDayLetter.setAttribute("aria-hidden", flowerPurchased ? "false" : "true");
    }
}

function applyFinalSceneUI() {
    if (!finalSceneItemsUnlocked) {
        return;
    }
    updateWomensDayShopItems();
    quizContainerCollapsed = true;
    setQuizCollapsedState(true);

    if (quizContainer) {
        quizContainer.style.display = "none";
        quizContainer.style.opacity = "0";
        quizContainer.style.pointerEvents = "none";
    }
    if (quizCollapseBody) {
        quizCollapseBody.style.display = "none";
        quizCollapseBody.style.opacity = "0";
        quizCollapseBody.style.pointerEvents = "none";
    }
    if (elements.quizSelection) {
        elements.quizSelection.style.display = "none";
    }
    if (elements.quizContent) {
        elements.quizContent.style.display = "none";
        elements.quizContent.style.visibility = "hidden";
        elements.quizContent.style.opacity = "0";
    }
    if (quizScrollUnfurlTimeout) {
        clearTimeout(quizScrollUnfurlTimeout);
        quizScrollUnfurlTimeout = null;
    }
    if (quizContainerHideTimeout) {
        clearTimeout(quizContainerHideTimeout);
        quizContainerHideTimeout = null;
    }
    if (quizContentHideTimeout) {
        clearTimeout(quizContentHideTimeout);
        quizContentHideTimeout = null;
    }
    if (elements.progressContainer) {
        elements.progressContainer.style.display = "none";
    }
    if (elements.coinCounter) {
        elements.coinCounter.style.display = "none";
    }
    document.body.classList.remove("coin-counter-enabled");
    document.body.classList.remove("back-to-shop-enabled");
    document.body.classList.remove("coin-counter-shop-visible");
    if (elements.backToShop) {
        elements.backToShop.style.display = "none";
        elements.backToShop.disabled = true;
    }
    setToggleBarEnabled(false);
    if (elements.options) {
        elements.options.forEach((button) => {
            if (!button) {
                return;
            }
            button.disabled = true;
            button.style.pointerEvents = "none";
            button.style.display = "none";
        });
    }
    if (elements.rewardButton) {
        elements.rewardButton.style.display = "none";
    }
}
const bikeBubbleStates = {
    rain: createBikeBubbleState("rain", elements.rainBikeCat, elements.rainBikeBubble, {
        offsetX: { left: -90, right: 110 },
        offsetY: 70
    }),
    sun: createBikeBubbleState("sun", elements.sunnyBikeCat, elements.sunBikeBubble, {
        offsetX: { left: -100, right: 125 },
        offsetY: 35
    })
};

const sunBikeAttachmentStates = [];
if (elements.sunnyBikeCat && elements.sunBikeAttachmentFlower) {
    const flowerState = createBikeAttachmentState(elements.sunnyBikeCat, elements.sunBikeAttachmentFlower, {
        anchorX: 0.62,
        anchorY: 0.38,
        offsetX: { left: 11, right: -90 },
        offsetY: 11,
        scale: 0.68,
        rotation: -4
    });
    if (flowerState) {
        sunBikeAttachmentStates.push(flowerState);
    }
}
if (elements.sunnyBikeCat && elements.sunBikeAttachmentLetter) {
    const letterState = createBikeAttachmentState(elements.sunnyBikeCat, elements.sunBikeAttachmentLetter, {
        anchorX: 0.47,
        anchorY: 0.6,
        offsetX: { left: -20, right: 62 },
        offsetY: 0,
        scale: 0.42,
        rotation: -12
    });
    if (letterState) {
        sunBikeAttachmentStates.push(letterState);
    }
}

hideSunBikeAttachments({ immediate: true });

if (elements.rainBikeCat) {
    elements.rainBikeCat.addEventListener("animationend", handleBikeAnimationEnd);
    elements.rainBikeCat.addEventListener("click", () => toggleBikeBubble("rain"));
}

if (elements.sunnyBikeCat) {
    elements.sunnyBikeCat.addEventListener("animationend", handleBikeAnimationEnd);
    elements.sunnyBikeCat.addEventListener("click", () => toggleBikeBubble("sun"));
}

if (elements.sunBikeAttachmentLetter) {
    elements.sunBikeAttachmentLetter.addEventListener("click", handleSunBikeLetterClick);
}

if (elements.toggleBar) {
    elements.toggleBar.addEventListener("click", toggleQuizContainer);
}

if (elements.womensDayCatseller) {
    elements.womensDayCatseller.addEventListener("click", handleWomensDayCatsellerClick);
}

if (elements.womensDayFlower) {
    elements.womensDayFlower.addEventListener("click", handleWomensDayFlowerClick);
}

if (elements.womensDayLetter) {
    elements.womensDayLetter.addEventListener("click", handleWomensDayLetterClick);
}

if (elements.shopItemViewer) {
    elements.shopItemViewer.addEventListener("click", handleShopItemViewerBackdropClick);
}

if (elements.womensDayFlower) {
    shopItemViewerInitialFlowerDisplay = elements.womensDayFlower.style.display || "";
}

if (elements.shopItemViewerItem) {
    elements.shopItemViewerItem.addEventListener("click", () => hideShopItemViewer());
}

if (elements.shopItemPurchaseButton) {
    elements.shopItemPurchaseButton.addEventListener("click", (event) => {
        event.stopPropagation();
        handleShopItemPurchaseClick();
    });
}

if (elements.shopMusic) {
    elements.shopMusic.addEventListener("playing", () => {
        if (shopMusicShouldPlay) {
            detachShopMusicResumeListener();
        }
    });
    elements.shopMusic.addEventListener("pause", () => {
        if (shopMusicShouldPlay) {
            attemptPlayShopMusic();
        }
    });
    elements.shopMusic.addEventListener("ended", () => {
        if (shopMusicShouldPlay) {
            attemptPlayShopMusic({ reset: true });
        }
    });
}

if (elements.backToShop) {
    elements.backToShop.addEventListener("click", handleBackToShopClick);
}

setToggleBarEnabled(false);
setQuizCollapsedState(false);
updateWomensDayShopItems();

function start2010Test() {
    if (womensDayIntroActive) {
        return;
    }
    const startQuiz = () => initializeQuiz(testQuestions, { is2010: true });
    if (!elements.womensDayIntro) {
        startQuiz();
        return;
    }
    womensDayIntroStartCallback = startQuiz;
    showWomensDayIntro();
}

function initializeQuiz(questionSet, { is2010 = false } = {}) {
    if (finalSceneItemsUnlocked) {
        return;
    }
    is2010Test = is2010;
    resumeSceneStateAfterShop = null;

    if (is2010) {
        setup2010State();
    } else {
        test2010State = null;
        questions = questionSet ? questionSet.slice() : [];
        rainBikeSwapPending = false;
        pendingFirstSpecialTransition = false;
        if (firstSpecialSwapTimeout) {
            clearTimeout(firstSpecialSwapTimeout);
            firstSpecialSwapTimeout = null;
        }
        if (firstSpecialResumeTimeout) {
            clearTimeout(firstSpecialResumeTimeout);
            firstSpecialResumeTimeout = null;
        }
        stopBikeRide(elements.rainBikeCat);
        stopBikeRide(elements.sunnyBikeCat);
        stopRainAudio();
        stopSunAudio();
        if (quizContainer) {
            quizContainer.classList.remove("quiz-rain");
            quizContainer.style.margin = "28px auto";
            quizContainer.style.position = "relative";
            quizContainer.style.left = "";
            quizContainer.style.top = "";
        }
    }

    currentQuestionIndex = 0;
    correctAnswers = 0;
    updateCoinCounter();

    if (elements.quizSelection) {
        const selection = elements.quizSelection;
        if (!selection.dataset.prevDisplay) {
            selection.dataset.prevDisplay = selection.style.display && selection.style.display !== "none"
                ? selection.style.display
                : "";
        }
        selection.classList.remove("quiz-selection-hidden");
        selection.style.display = "none";
    }
    if (elements.quizContent) {
        elements.quizContent.style.display = "block";
    }
    if (elements.rewardButton) {
        elements.rewardButton.style.display = "none";
    }
    if (elements.progressContainer) {
        elements.progressContainer.style.display = is2010 ? "none" : "block";
    }
    if (elements.coinCounter) {
        elements.coinCounter.style.display = "";
    }
    document.body.classList.toggle("coin-counter-enabled", is2010);
    if (elements.backToShop) {
        elements.backToShop.style.display = "";
    }
    document.body.classList.toggle("back-to-shop-enabled", is2010);

    const scrollTarget = quizCollapseBody || quizContainer;
    if (is2010) {
        scheduleQuizReveal({ delay: QUIZ_SCROLL_DELAY_MS, hideToggleBar: true });
    } else if (scrollTarget) {
        scrollTarget.classList.remove("scroll-unfurl");
        scrollTarget.classList.remove("scroll-rollup");
        void scrollTarget.offsetWidth;
        if (quizScrollUnfurlTimeout) {
            clearTimeout(quizScrollUnfurlTimeout);
            quizScrollUnfurlTimeout = null;
        }
        if (quizCollapseBody) {
            quizCollapseBody.classList.add("scroll-unfurl");
        } else {
            showQuizUI();
        }
    }

    if (is2010) {
        if (quizContainer) {
            quizContainer.classList.add("quiz-rain");
            quizContainer.classList.remove("quiz-sun");
        }
        setVisualMode("rain", { rainDelay: getRandomInitialBikeDelay() });
        setToggleBarEnabled(true);
        setQuizCollapsedState(true);
        if (elements.toggleBar) {
            elements.toggleBar.style.visibility = "hidden";
            elements.toggleBar.style.pointerEvents = "none";
        }
    } else {
        setVisualMode(null);
        setToggleBarEnabled(false);
        setQuizCollapsedState(false);
    }
    setIdleCatsEnabled(!is2010);
    toggleTitle(!is2010);
    toggleBigCat(!is2010);

    updateProgress();
    showQuestion();
}

function setVisualMode(mode, { preserveRainBike = false, rainDirection = "right", sunDirection = "right", rainDelay, sunDelay } = {}) {
    clearRainToSunStages();
    if (removeRainTimeout) {
        clearTimeout(removeRainTimeout);
        removeRainTimeout = null;
    }
    if (removeSunTimeout) {
        clearTimeout(removeSunTimeout);
        removeSunTimeout = null;
    }

    currentVisualMode = mode;

    if (mode === "rain") {
        document.body.classList.add("rain-mode");
        if (quizContainer) {
            quizContainer.classList.add("quiz-rain");
            quizContainer.classList.remove("quiz-sun");
        }
        activateBikeBubble("rain");
        deactivateBikeBubble("sun", { immediate: true });
        if (!preserveRainBike) {
            rainBikeSwapPending = false;
            stopBikeRide(elements.sunnyBikeCat);
            const delay =
                typeof rainDelay === "number"
                    ? rainDelay
                    : (pendingFirstSpecialTransition ? SCENE_SWAP_DELAY_MS : getRandomInitialBikeDelay());
            playRainAudio();
            startBikeRide(elements.rainBikeCat, rainDirection, delay);
            populateRainOverlay();
        }
        removeSunTimeout = setTimeout(() => {
            document.body.classList.remove("sun-mode");
            removeSunTimeout = null;
        }, Math.max(SCENE_MODE_CROSSFADE_MS, AUDIO_FADE_DURATION_MS));
        hideSunBikeAttachments({ immediate: true });
        return;
    }

    if (mode === "sun") {
        const transitioningFromRain = document.body.classList.contains("rain-mode");
        if (transitioningFromRain && !preserveRainBike) {
            transitionRainToSun({ sunDirection, sunDelay });
            return;
        }
        document.body.classList.add("sun-mode");
        activateBikeBubble("sun");
        deactivateBikeBubble("rain", { immediate: true });
        if (quizContainer) {
            quizContainer.classList.remove("quiz-rain");
            quizContainer.classList.add("quiz-sun");
        }
        const sunSceneDelay = typeof sunDelay === "number" ? sunDelay : POST_SCENE_CONTINUE_DELAY_MS;
        const crossFadeRemovalDelay = Math.max(sunSceneDelay, AUDIO_FADE_DURATION_MS) + SCENE_MODE_CROSSFADE_MS;
        removeRainTimeout = setTimeout(() => {
            document.body.classList.remove("rain-mode");
            removeRainTimeout = null;
        }, crossFadeRemovalDelay);
        if (!preserveRainBike) {
            stopBikeRide(elements.rainBikeCat);
            rainBikeSwapPending = false;
            stopRainAudio(true, true);
            stopSunAudio({ reset: true, fade: false });
            scheduleSunAudioStart(SUN_AUDIO_START_DELAY_MS);
            startBikeRide(elements.sunnyBikeCat, sunDirection, sunDelay);
            clearRainOverlay();
        }
        updateSunBikeAttachments({ immediate: true });
        return;
    }

    document.body.classList.remove("rain-mode", "sun-mode");
    document.body.classList.remove("rain-dry-stage", "sun-dim-mode");
    if (quizContainer) {
        quizContainer.classList.remove("quiz-rain");
        quizContainer.classList.remove("quiz-sun");
    }
    deactivateBikeBubble("rain", { immediate: true });
    deactivateBikeBubble("sun", { immediate: true });

    if (!preserveRainBike) {
        stopBikeRide(elements.rainBikeCat);
        stopBikeRide(elements.sunnyBikeCat);
        rainBikeSwapPending = false;
        stopRainAudio();
        stopSunAudio();
        clearRainOverlay();
    }
    hideSunBikeAttachments({ immediate: true });
}

function queueRainToSunStage(callback, delay) {
    const timeoutId = setTimeout(() => {
        rainToSunStageTimeouts = rainToSunStageTimeouts.filter((id) => id !== timeoutId);
        callback();
    }, delay);
    rainToSunStageTimeouts.push(timeoutId);
}

function clearRainToSunStages({ removeClasses = true } = {}) {
    if (rainToSunStageTimeouts.length) {
        rainToSunStageTimeouts.forEach(clearTimeout);
        rainToSunStageTimeouts = [];
    }
    if (removeClasses) {
        document.body.classList.remove("rain-dry-stage", "sun-dim-mode");
    }
}

function transitionRainToSun({ sunDirection = "right", sunDelay } = {}) {
    clearRainToSunStages({ removeClasses: false });
    document.body.classList.add("rain-mode");
    document.body.classList.remove("sun-mode");
    document.body.classList.remove("sun-dim-mode");
    document.body.classList.add("rain-dry-stage");

    if (quizContainer) {
        quizContainer.classList.add("quiz-rain");
        quizContainer.classList.remove("quiz-sun");
    }

    stopBikeRide(elements.rainBikeCat);
    rainBikeSwapPending = false;
    stopRainAudio(true, true);
    stopSunAudio({ reset: true, fade: false });
    deactivateBikeBubble("sun", { immediate: true });
    clearRainOverlay();

    const stageDelay = RAIN_TO_SUN_STAGE_DURATION_MS;

    queueRainToSunStage(() => {
        document.body.classList.add("sun-dim-mode");
        activateBikeBubble("sun");
        deactivateBikeBubble("rain", { immediate: true });
        scheduleSunAudioStart(SUN_AUDIO_START_DELAY_MS);
        startBikeRide(elements.sunnyBikeCat, sunDirection, sunDelay);
        updateSunBikeAttachments({ immediate: true });

        queueRainToSunStage(() => {
            document.body.classList.remove("rain-mode", "rain-dry-stage", "sun-dim-mode");
            document.body.classList.add("sun-mode");
            if (quizContainer) {
                quizContainer.classList.remove("quiz-rain");
                quizContainer.classList.add("quiz-sun");
            }
        }, stageDelay);
    }, stageDelay);
}

function toggleTitle(visible) {
    if (elements.toeicTitle) {
        elements.toeicTitle.style.display = visible ? "block" : "none";
    }
}

function toggleBigCat(visible) {
    if (elements.bigCatContainer) {
        elements.bigCatContainer.style.display = visible ? "block" : "none";
    }
}

function setQuizCollapsedState(collapsed) {
    quizContainerCollapsed = collapsed;
    if (elements.toggleBar) {
        elements.toggleBar.setAttribute("aria-expanded", String(!collapsed));
        elements.toggleBar.classList.toggle("collapsed", collapsed);
        elements.toggleBar.setAttribute(
            "aria-label",
            collapsed ? "Expand quiz container" : "Collapse quiz container"
        );
        const hiddenLabel = elements.toggleBar.querySelector(".visually-hidden");
        if (hiddenLabel) {
            hiddenLabel.textContent = collapsed ? "Expand quiz container" : "Collapse quiz container";
        }
    }
}

function setToggleBarEnabled(enabled) {
    if (!elements.toggleBar) {
        return;
    }
    const shouldEnable = !finalSceneItemsUnlocked && enabled;
    elements.toggleBar.style.display = shouldEnable ? "block" : "none";
    elements.toggleBar.style.visibility = shouldEnable ? "visible" : "hidden";
    elements.toggleBar.disabled = !shouldEnable;
}

function scheduleQuizReveal({ delay = QUIZ_SCROLL_DELAY_MS, hideToggleBar = false, onReveal } = {}) {
    if (finalSceneItemsUnlocked) {
        return;
    }
    const target = quizCollapseBody || quizContainer;
    const safeDelay = Math.max(0, typeof delay === "number" ? delay : 0);

    const runReveal = () => {
        quizScrollUnfurlTimeout = null;
        showQuizUI();
        if (typeof onReveal === "function") {
            onReveal();
        }
    };

    if (quizScrollUnfurlTimeout) {
        clearTimeout(quizScrollUnfurlTimeout);
        quizScrollUnfurlTimeout = null;
    }

    if (!target) {
        quizScrollUnfurlTimeout = setTimeout(runReveal, safeDelay);
        return;
    }

    target.classList.remove("scroll-unfurl", "scroll-rollup");
    void target.offsetWidth;

    if (!target.dataset.prevDisplay) {
        const currentDisplay =
            target.style.display && target.style.display !== "none" ? target.style.display : "";
        if (currentDisplay) {
            target.dataset.prevDisplay = currentDisplay;
        } else {
            delete target.dataset.prevDisplay;
        }
    }

    target.style.display = "none";
    target.style.opacity = "0";
    target.style.pointerEvents = "none";

    if (hideToggleBar && elements.toggleBar) {
        elements.toggleBar.style.visibility = "hidden";
        elements.toggleBar.style.pointerEvents = "none";
    }

    quizScrollUnfurlTimeout = setTimeout(runReveal, safeDelay);
}

function showWomensDayIntro() {
    if (finalSceneItemsUnlocked) {
        return;
    }
    const intro = elements.womensDayIntro;
    const startCallback = womensDayIntroStartCallback;
    if (!intro) {
        womensDayIntroStartCallback = null;
        if (typeof startCallback === "function") {
            startCallback();
        }
        return;
    }
    womensDayIntroActive = true;
    if (womensDayIntroTimeout) {
        clearTimeout(womensDayIntroTimeout);
        womensDayIntroTimeout = null;
    }
    hideShopItemViewer(true);
    document.body.classList.remove("coin-counter-shop-visible");
    intro.classList.remove("fade-out");
    intro.setAttribute("aria-hidden", "false");

    setVisualMode(null);
    hideSunBikeAttachments({ immediate: true });
    stopRainAudio();
    stopSunAudio();
    scheduleShopMusicStart(1000);
    if (elements.progressContainer) {
        if (!elements.progressContainer.dataset.prevDisplay) {
            elements.progressContainer.dataset.prevDisplay =
                elements.progressContainer.style.display && elements.progressContainer.style.display !== "none"
                    ? elements.progressContainer.style.display
                    : "";
        }
        elements.progressContainer.style.display = "none";
    }
    if (elements.quizSelection) {
        elements.quizSelection.style.display = "none";
    }
    if (elements.quizContent) {
        elements.quizContent.style.display = "none";
    }
    setToggleBarEnabled(false);
    setQuizCollapsedState(false);
    toggleTitle(false);
    toggleBigCat(false);
    setIdleCatsEnabled(false);
    document.body.classList.add("shop-mode");
    if (elements.coinCounter) {
        elements.coinCounter.style.display = "";
    }
    document.body.classList.add("coin-counter-enabled");
    updateCoinCounter();
    updateWomensDayShopItems();

    const introDelay = Math.max(QUIZ_CONTAINER_FADE_MS, QUIZ_SELECTION_FADE_MS);

    setTimeout(() => {
        requestAnimationFrame(() => {
            intro.classList.add("visible");
            document.body.classList.add("coin-counter-shop-visible");
        });
    }, introDelay);
}

function hideWomensDayIntro(onComplete) {
    const intro = elements.womensDayIntro;
    if (!intro) {
        womensDayIntroActive = false;
        hideShopItemViewer(true);
        document.body.classList.remove("coin-counter-shop-visible");
        stopShopMusic({ fade: true });
        if (typeof onComplete === "function") {
            onComplete();
        }
        return;
    }
    if (womensDayIntroTimeout) {
        clearTimeout(womensDayIntroTimeout);
        womensDayIntroTimeout = null;
    }
    hideShopItemViewer(true);
    document.body.classList.remove("coin-counter-shop-visible");
    stopShopMusic({ fade: true });
    intro.classList.add("fade-out");
    womensDayIntroActive = false;
    womensDayIntroTimeout = setTimeout(() => {
        intro.classList.remove("visible", "fade-out");
        intro.setAttribute("aria-hidden", "true");
        document.body.classList.remove("shop-mode");
        womensDayIntroTimeout = null;
        if (typeof onComplete === "function") {
            onComplete();
        }
    }, SHOP_INTRO_FADE_MS);
}

function handleWomensDayCatsellerClick(event) {
    if (event) {
        event.preventDefault();
    }
    if (!womensDayIntroActive && typeof womensDayIntroStartCallback !== "function") {
        return;
    }
    const startCallback = womensDayIntroStartCallback;
    womensDayIntroStartCallback = null;
    if (elements.womensDayCatseller) {
        elements.womensDayCatseller.disabled = true;
    }
    hideWomensDayIntro(() => {
        if (elements.womensDayCatseller) {
            elements.womensDayCatseller.disabled = false;
        }
        if (typeof startCallback === "function") {
            startCallback();
        }
    });
}

function handleWomensDayFlowerClick(event) {
    if (event) {
        event.preventDefault();
    }
    if (!womensDayIntroActive) {
        return;
    }
    if (purchasedShopItems.has("flower")) {
        return;
    }
    const item = SHOP_ITEMS.flower;
    currentShopItem = item;
    showShopItemViewer({
        src: item.image,
        alt: item.alt,
        value: item.value
    });
}

function showShopItemViewer({ src, alt, value, showPurchase = true, hideFlower = true } = {}) {
    if (!elements.shopItemViewer || !elements.shopItemViewerImage || shopItemViewerActive) {
        return;
    }
    if (typeof src === "string" && src) {
        elements.shopItemViewerImage.src = src;
    }
    elements.shopItemViewerImage.alt = typeof alt === "string" ? alt : "";
    if (elements.shopItemPriceValue) {
        const displayValue = showPurchase && value != null ? String(value) : "";
        elements.shopItemPriceValue.textContent = displayValue;
    }
    if (elements.shopItemPriceTag) {
        elements.shopItemPriceTag.style.display = showPurchase ? "" : "none";
    }
    setShopItemFeedback("", { duration: 0 });
    if (elements.shopItemViewer) {
        elements.shopItemViewer.classList.remove("shake");
    }
    shopItemViewerActive = true;
    document.body.classList.add("shop-item-view-active");
    elements.shopItemViewer.classList.add("visible");
    elements.shopItemViewer.setAttribute("aria-hidden", "false");
    if (hideFlower && elements.womensDayFlower) {
        if (shopItemViewerInitialFlowerDisplay === "") {
            shopItemViewerInitialFlowerDisplay = elements.womensDayFlower.style.display || "";
        }
        elements.womensDayFlower.disabled = true;
        elements.womensDayFlower.style.display = "none";
    }
    if (elements.shopItemPurchaseButton) {
        elements.shopItemPurchaseButton.style.display = showPurchase ? "" : "none";
        elements.shopItemPurchaseButton.disabled = !showPurchase;
    }
}

function handleWomensDayLetterClick(event) {
    if (event) {
        event.preventDefault();
    }
    if (!womensDayIntroActive || !purchasedShopItems.has("flower") || shopFinalSceneInProgress) {
        return;
    }
    shopFinalSceneInProgress = true;
    if (elements.womensDayLetter) {
        elements.womensDayLetter.disabled = true;
    }
    triggerFinalSceneTransition();
}

function triggerFinalSceneTransition() {
    finalSceneItemsUnlocked = true;
    applyFinalSceneUI();
    playLemonTreeTheme({ restart: true });
    stopShopMusic({ fade: true });
    hideShopItemViewer(true);

    if (womensDayIntroTimeout) {
        clearTimeout(womensDayIntroTimeout);
        womensDayIntroTimeout = null;
    }

    updateWomensDayShopItems();

    const finalize = () => {
        womensDayIntroStartCallback = null;
        resumeSceneAfterShop();
        shopFinalSceneInProgress = false;
    };

    const intro = elements.womensDayIntro;
    if (!intro) {
        womensDayIntroActive = false;
        finalize();
        return;
    }

    const previousTransition = intro.style.transition;
    intro.classList.remove("fade-out");
    intro.style.transition = "opacity 2s ease, visibility 2s ease";
    intro.style.pointerEvents = "none";
    intro.style.visibility = "visible";
    intro.style.opacity = "1";
    document.body.classList.remove("coin-counter-shop-visible");

    requestAnimationFrame(() => {
        intro.style.opacity = "0";
    });

    const FINAL_SCENE_FADE_MS = 2000;
    setTimeout(() => {
        intro.style.transition = previousTransition;
        intro.style.opacity = "";
        intro.style.visibility = "";
        intro.style.pointerEvents = "";
        intro.classList.remove("visible");
        intro.setAttribute("aria-hidden", "true");
        womensDayIntroActive = false;
        document.body.classList.remove("shop-mode");
        updateWomensDayShopItems();
        finalize();
    }, FINAL_SCENE_FADE_MS);
}

function hideShopItemViewer(immediate = false) {
    if (!shopItemViewerActive && !immediate) {
        return;
    }
    if (shopItemFeedbackTimeout) {
        clearTimeout(shopItemFeedbackTimeout);
        shopItemFeedbackTimeout = null;
    }
    if (elements.shopItemViewer) {
        elements.shopItemViewer.classList.remove("visible");
        elements.shopItemViewer.setAttribute("aria-hidden", "true");
        elements.shopItemViewer.classList.remove("shake");
    }
    document.body.classList.remove("shop-item-view-active");
    shopItemViewerActive = false;
    currentShopItem = null;
    setShopItemFeedback("");
    if (elements.shopItemPriceTag) {
        elements.shopItemPriceTag.style.display = "";
    }
    if (elements.shopItemPurchaseButton) {
        elements.shopItemPurchaseButton.style.display = "";
        elements.shopItemPurchaseButton.disabled = false;
    }
    updateWomensDayShopItems();
}

function handleShopItemViewerBackdropClick(event) {
    if (!shopItemViewerActive) {
        return;
    }
    if (event.target === elements.shopItemViewer || event.target === elements.shopItemViewerImage) {
        hideShopItemViewer();
    }
}

function handleShopItemPurchaseClick() {
    if (!shopItemViewerActive || !currentShopItem) {
        return;
    }
    const cost = Number(currentShopItem.value) || 0;
    if (cost <= 0) {
        setShopItemFeedback("This item is not available for purchase.");
        return;
    }
    if (correctAnswers < cost) {
        setShopItemFeedback("You don't have enough CatCoins.", { error: true });
        if (elements.shopItemViewer) {
            elements.shopItemViewer.classList.add("shake");
            setTimeout(() => {
                if (elements.shopItemViewer) {
                    elements.shopItemViewer.classList.remove("shake");
                }
            }, 450);
        }
        return;
    }
    correctAnswers -= cost;
    updateCoinCounter();
    updateProgress();
    const purchasedItem = currentShopItem;
    setShopItemFeedback("PURCHASED !", { duration: 1300 });
    triggerCoinFlash().catch(() => {});
    if (elements.shopItemPurchaseButton) {
        elements.shopItemPurchaseButton.disabled = true;
    }
    setTimeout(() => {
        if (purchasedItem && purchasedItem.id) {
            purchasedShopItems.add(purchasedItem.id);
        }
        hideShopItemViewer();
    }, 1300);
}

function handleBackToShopClick(event) {
    if (event) {
        event.preventDefault();
    }
    if (finalSceneItemsUnlocked) {
        return;
    }
    if (
        !is2010Test ||
        womensDayIntroActive ||
        pendingFirstSpecialTransition ||
        answerFeedbackPromise ||
        document.body.classList.contains("shop-mode")
    ) {
        return;
    }
    resumeSceneStateAfterShop = captureSceneStateForShop();
    womensDayIntroStartCallback = resumeSceneAfterShop;
    showWomensDayIntro();
}

function captureSceneStateForShop() {
    const state = {
        mode: currentVisualMode,
        quizCollapsed: quizContainerCollapsed
    };
    if (elements.toggleBar) {
        state.toggleBar = {
            enabled: !elements.toggleBar.disabled,
            visibility: elements.toggleBar.style.visibility || "",
            pointerEvents: elements.toggleBar.style.pointerEvents || "",
            display: elements.toggleBar.style.display || ""
        };
    }
    if (elements.quizContent) {
        state.quizContent = {
            display: elements.quizContent.style.display || "",
            visibility: elements.quizContent.style.visibility || "",
            opacity: elements.quizContent.style.opacity || ""
        };
    }
    if (quizCollapseBody) {
        state.quizLayout = {
            target: "collapse",
            display: quizCollapseBody.style.display || "",
            opacity: quizCollapseBody.style.opacity || "",
            pointerEvents: quizCollapseBody.style.pointerEvents || ""
        };
    } else if (quizContainer) {
        state.quizLayout = {
            target: "container",
            display: quizContainer.style.display || "",
            opacity: quizContainer.style.opacity || "",
            pointerEvents: quizContainer.style.pointerEvents || ""
        };
    }
    return state;
}

function resumeSceneAfterShop() {
    const state = resumeSceneStateAfterShop || {};
    resumeSceneStateAfterShop = null;

    const mode = state.mode ? state.mode : "rain";
    const finalSceneActive = finalSceneItemsUnlocked;

    if (elements.progressContainer) {
        elements.progressContainer.style.display = "none";
    }

    if (finalSceneActive) {
        if (elements.quizSelection) {
            elements.quizSelection.style.display = "none";
        }
        if (elements.quizContent) {
            elements.quizContent.style.display = "none";
            elements.quizContent.style.visibility = "hidden";
            elements.quizContent.style.opacity = "0";
        }
        if (quizCollapseBody) {
            quizCollapseBody.style.display = "none";
            quizCollapseBody.style.opacity = "0";
            quizCollapseBody.style.pointerEvents = "none";
        }
        if (quizContainer) {
            quizContainer.style.display = "none";
            quizContainer.style.opacity = "0";
            quizContainer.style.pointerEvents = "none";
        }
        setToggleBarEnabled(false);
        setQuizCollapsedState(true);
    } else {
        if (elements.quizSelection) {
            elements.quizSelection.style.display = "none";
        }
        if (elements.quizContent) {
            if (state.quizContent) {
                elements.quizContent.style.display = state.quizContent.display || "block";
                elements.quizContent.style.visibility = state.quizContent.visibility || "visible";
                elements.quizContent.style.opacity = state.quizContent.opacity || "1";
            } else {
                elements.quizContent.style.display = "block";
                elements.quizContent.style.visibility = "visible";
                elements.quizContent.style.opacity = "1";
            }
        }

        if (state.quizLayout) {
            if (state.quizLayout.target === "collapse" && quizCollapseBody) {
                quizCollapseBody.style.display = state.quizLayout.display || "";
                quizCollapseBody.style.opacity = state.quizLayout.opacity || "1";
                quizCollapseBody.style.pointerEvents = state.quizLayout.pointerEvents || "auto";
            } else if (quizContainer) {
                quizContainer.style.display = state.quizLayout.display || "";
                quizContainer.style.opacity = state.quizLayout.opacity || "1";
                quizContainer.style.pointerEvents = state.quizLayout.pointerEvents || "auto";
            }
        } else if (quizContainer) {
            quizContainer.style.display = "block";
            quizContainer.style.opacity = "1";
            quizContainer.style.pointerEvents = "auto";
        }

        setToggleBarEnabled(state.toggleBar ? state.toggleBar.enabled : true);

        const applySavedToggleBarState = () => {
            if (elements.toggleBar && state.toggleBar) {
                elements.toggleBar.style.visibility =
                    state.toggleBar.visibility || (state.toggleBar.enabled ? "visible" : "hidden");
                elements.toggleBar.style.pointerEvents =
                    state.toggleBar.pointerEvents || (state.toggleBar.enabled ? "auto" : "none");
                elements.toggleBar.style.display =
                    state.toggleBar.display || (state.toggleBar.enabled ? "block" : "none");
            }
            if (typeof state.quizCollapsed === "boolean") {
                setQuizCollapsedState(state.quizCollapsed);
            }
        };

        if (mode === "rain" || mode === "sun") {
            scheduleQuizReveal({ hideToggleBar: true, onReveal: applySavedToggleBarState });
        } else {
            showQuizUI();
            applySavedToggleBarState();
        }
    }

    toggleTitle(false);
    toggleBigCat(false);
    setIdleCatsEnabled(false);

    if (!finalSceneActive) {
        document.body.classList.add("coin-counter-enabled");
        document.body.classList.add("back-to-shop-enabled");
        if (elements.coinCounter) {
            elements.coinCounter.style.display = "";
        }
        if (elements.backToShop) {
            elements.backToShop.style.display = "";
            elements.backToShop.disabled = false;
        }
    } else {
        document.body.classList.remove("coin-counter-enabled");
        document.body.classList.remove("back-to-shop-enabled");
        if (elements.coinCounter) {
            elements.coinCounter.style.display = "none";
        }
        if (elements.backToShop) {
            elements.backToShop.style.display = "none";
            elements.backToShop.disabled = true;
        }
    }

    setVisualMode(mode);
    updateSunBikeAttachments({ immediate: true });

    if (finalSceneActive) {
        applyFinalSceneUI();
    } else {
        updateWomensDayShopItems();
    }
}

function updateCoinCounter() {
    if (!elements.coinCount) {
        return;
    }
    elements.coinCount.textContent = `x ${correctAnswers}`;
}

function playCoinFeedback(sourceButton, { coinClass = "", duration = 1000 } = {}) {
    const soundPromise = playAudioClip(is2010Test ? elements.correctSound : elements.catSound, {
        volume: is2010Test ? 0.5 : 0.7,
        rate: is2010Test ? 1.35 : 1
    });
    if (!is2010Test) {
        return soundPromise.then(() => undefined);
    }
    const coinPromise = spawnOptionCoin(sourceButton, { extraClass: coinClass, duration });
    return Promise.all([soundPromise, coinPromise]).then(() => undefined);
}

function playAudioClip(audio, { volume = 0.7, rate = 1 } = {}) {
    return new Promise((resolve) => {
        if (!audio) {
            resolve();
            return;
        }
        try {
            audio.pause();
            audio.currentTime = 0;
        } catch (err) {
            // ignore seek errors
        }
        audio.volume = volume;
        audio.playbackRate = rate;

        const cleanup = () => {
            audio.removeEventListener("ended", onEnded);
            clearTimeout(fallbackTimeout);
            audio.playbackRate = 1;
            resolve();
        };

        const onEnded = () => {
            cleanup();
        };

        audio.addEventListener("ended", onEnded, { once: true });

        const duration = audio.duration && isFinite(audio.duration) ? audio.duration / rate : 0.6;
        const fallbackTimeout = setTimeout(cleanup, duration * 1000 + 50);

        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === "function") {
            playPromise.catch((error) => {
                console.warn("Audio play blocked:", error);
                cleanup();
            });
        }
    });
}

function spawnOptionCoin(sourceButton, { extraClass = "", duration = 1000 } = {}) {
    if (!is2010Test) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        const button = sourceButton instanceof HTMLElement ? sourceButton : null;
        let rect = null;
        if (button && button.getBoundingClientRect) {
            rect = button.getBoundingClientRect();
        } else if (elements.quizContent && elements.quizContent.getBoundingClientRect) {
            rect = elements.quizContent.getBoundingClientRect();
        }
        if (!rect) {
            resolve();
            return;
        }

        const coin = document.createElement("img");
        coin.src = "Images/catcoin.png";
        coin.alt = "";
        coin.className = "option-coin-pop";
        if (extraClass) {
            coin.classList.add(extraClass);
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        coin.style.left = `${centerX + window.scrollX}px`;
        coin.style.top = `${centerY + window.scrollY}px`;

        document.body.appendChild(coin);
        setTimeout(() => {
            coin.remove();
            resolve();
        }, Math.max(0, duration));
    });
}

function triggerCoinFlash({ flashClass = "coin-flash", duration = 800 } = {}) {
    if (!elements.coinCounter) {
        return Promise.resolve();
    }
    const computed = window.getComputedStyle(elements.coinCounter);
    if (computed.display === "none") {
        return Promise.resolve();
    }
    const flashClasses = new Set(["coin-flash", "coin-flash-special"]);
    flashClasses.add(flashClass);
    flashClasses.forEach((cls) => elements.coinCounter.classList.remove(cls));
    void elements.coinCounter.offsetWidth;
    if (flashClass) {
        elements.coinCounter.classList.add(flashClass);
    }
    const waitDuration = Math.max(0, duration);
    return new Promise((resolve) => {
        setTimeout(() => {
            if (flashClass) {
                elements.coinCounter.classList.remove(flashClass);
            }
            resolve();
        }, waitDuration);
    });
}

function getRandomBikeDelay() {
    return BIKE_MIN_DELAY_MS + Math.random() * (BIKE_MAX_DELAY_MS - BIKE_MIN_DELAY_MS);
}

function getRandomInitialBikeDelay() {
    return BIKE_MIN_INITIAL_DELAY_MS + Math.random() * (BIKE_MAX_INITIAL_DELAY_MS - BIKE_MIN_INITIAL_DELAY_MS);
}

function hideQuizUI({ keepInteraction = false } = {}) {
    const target = quizCollapseBody || quizContainer;
    const currentQuestion = questions ? questions[currentQuestionIndex] : null;
    const isRunawayQuestion = currentQuestion && currentQuestion.isFirstSpecial;

    if (target) {
        if (quizScrollUnfurlTimeout) {
            clearTimeout(quizScrollUnfurlTimeout);
            quizScrollUnfurlTimeout = null;
        }
        target.classList.remove("scroll-unfurl", "scroll-rollup");
        void target.offsetWidth;
        target.classList.add("scroll-rollup");
        target.style.transition = "opacity 1s ease";
        if (quizContainerHideTimeout) {
            clearTimeout(quizContainerHideTimeout);
            quizContainerHideTimeout = null;
        }
        if (!target.dataset.prevDisplay) {
            target.dataset.prevDisplay = target.style.display && target.style.display !== "none"
                ? target.style.display
                : "";
        }
        target.style.opacity = "0";
        target.style.pointerEvents = keepInteraction ? "auto" : "none";
        quizContainerHideTimeout = setTimeout(() => {
            target.style.display = "none";
            quizContainerHideTimeout = null;
        }, QUIZ_CONTAINER_FADE_MS);
    }
    if (elements.toggleBar && elements.toggleBar.style.display !== "none") {
        if (elements.toggleBar._visibilityTimeout) {
            clearTimeout(elements.toggleBar._visibilityTimeout);
            elements.toggleBar._visibilityTimeout = null;
        }
        if (keepInteraction) {
            elements.toggleBar.style.visibility = "visible";
            elements.toggleBar.style.pointerEvents = "auto";
        } else {
            elements.toggleBar._visibilityTimeout = setTimeout(() => {
                elements.toggleBar.style.visibility = "hidden";
                elements.toggleBar.style.pointerEvents = "none";
                elements.toggleBar._visibilityTimeout = null;
            }, QUIZ_CONTAINER_FADE_MS);
        }
    }
    if (elements.quizContent) {
        if (!elements.quizContent.style.transition) {
            elements.quizContent.style.transition = "opacity 2s ease";
        }
        elements.quizContent.style.opacity = "0";
        if (quizContentHideTimeout) {
            clearTimeout(quizContentHideTimeout);
            quizContentHideTimeout = null;
        }
        quizContentHideTimeout = setTimeout(() => {
            if (elements.quizContent) {
                elements.quizContent.style.visibility = "hidden";
            }
            quizContentHideTimeout = null;
        }, QUIZ_CONTAINER_FADE_MS);
    }
    if (elements.options) {
        elements.options.forEach((button) => {
            if (!button) {
                return;
            }
            button.classList.remove("option-fade-in");
            button.classList.add("option-fade-out");
            if (keepInteraction) {
                button.dataset.toggleDisplay = button.style.display || "";
                button.dataset.toggleDisabled = button.disabled ? "true" : "false";
            } else {
                delete button.dataset.toggleDisplay;
                delete button.dataset.toggleDisabled;
            }
            if (!isRunawayQuestion || !keepInteraction) {
                button.classList.remove("runaway-option");
                button.style.position = "";
                button.style.left = "";
                button.style.top = "";
                button.style.transform = "";
            }
            button.disabled = true;
            button.style.pointerEvents = "none";
            if (button._toggleHideTimeout) {
                clearTimeout(button._toggleHideTimeout);
            }
            button._toggleHideTimeout = setTimeout(() => {
                button.style.display = "none";
                button.classList.remove("option-fade-out");
                button._toggleHideTimeout = null;
            }, OPTION_FADE_MS);
        });
    }
    setQuizCollapsedState(true);
}

function showQuizUI() {
    if (finalSceneItemsUnlocked) {
        return;
    }
    const target = quizCollapseBody || quizContainer;
    if (target) {
        if (quizContainerHideTimeout) {
            clearTimeout(quizContainerHideTimeout);
            quizContainerHideTimeout = null;
        }
        if (quizScrollUnfurlTimeout) {
            clearTimeout(quizScrollUnfurlTimeout);
            quizScrollUnfurlTimeout = null;
        }
        const prevDisplay = target.dataset.prevDisplay || "block";
        target.style.display = prevDisplay || "block";
        target.classList.remove("scroll-rollup", "scroll-unfurl");
        void target.offsetWidth;
        target.classList.add("scroll-unfurl");
        target.style.opacity = "1";
        target.style.pointerEvents = "auto";
        delete target.dataset.prevDisplay;
    }
    if (elements.quizContent) {
        if (quizContentHideTimeout) {
            clearTimeout(quizContentHideTimeout);
            quizContentHideTimeout = null;
        }
        elements.quizContent.style.visibility = "visible";
        elements.quizContent.style.opacity = "1";
    }
    if (elements.options) {
        elements.options.forEach((button) => {
            if (!button) {
                return;
            }
            const targetDisplay = button.dataset.toggleDisplay !== undefined
                ? (button.dataset.toggleDisplay || "inline-block")
                : "inline-block";
            if (button._toggleHideTimeout) {
                clearTimeout(button._toggleHideTimeout);
                button._toggleHideTimeout = null;
            }
            button.style.display = targetDisplay;
            button.disabled = button.dataset.toggleDisabled === "true" ? true : false;
            button.style.pointerEvents = button.disabled ? "none" : "auto";
            button.classList.remove("option-fade-out");
            void button.offsetWidth;
            button.classList.add("option-fade-in");
            setTimeout(() => {
                button.classList.remove("option-fade-in");
            }, OPTION_FADE_MS);
            delete button.dataset.toggleDisplay;
            delete button.dataset.toggleDisabled;
        });
    }
    const currentQuestion = questions ? questions[currentQuestionIndex] : null;
    if (currentQuestion && currentQuestion.isFirstSpecial) {
        applyRunawayNoButton();
    }
    if (elements.toggleBar && elements.toggleBar.style.display !== "none") {
        if (elements.toggleBar._visibilityTimeout) {
            clearTimeout(elements.toggleBar._visibilityTimeout);
            elements.toggleBar._visibilityTimeout = null;
        }
        elements.toggleBar.style.visibility = "visible";
        elements.toggleBar.style.pointerEvents = "auto";
    }
    setQuizCollapsedState(false);
}

function toggleQuizContainer() {
    if (!quizCollapseBody || pendingFirstSpecialTransition) {
        return;
    }
    if (quizContainerCollapsed) {
        showQuizUI();
    } else {
        hideQuizUI({ keepInteraction: true });
    }
}

function populateRainOverlay() {
    const overlay = elements.rainOverlay;
    if (!overlay) {
        return;
    }
    overlay.innerHTML = "";

    const frontRow = document.createElement("div");
    frontRow.className = "rain front-row";
    const backRow = document.createElement("div");
    backRow.className = "rain back-row";

    let increment = 0;
    let frontDrops = "";
    let backDrops = "";

    while (increment < 100) {
        const randoHundo = Math.floor(Math.random() * 98) + 1; // 1 - 98
        const randoFiver = Math.floor(Math.random() * 4) + 2;  // 2 - 5
        increment += randoFiver;

        const delay = (randoHundo / 100).toFixed(2);
        const duration = (0.45 + randoHundo / 100).toFixed(2);
        const bottom = 82 + randoFiver * 2;

        const dropTemplate = (isBack) => `
            <div class="drop" style="${isBack ? "right" : "left"}: ${increment}%; bottom: ${bottom}%; animation-delay: ${delay}s; animation-duration: ${duration}s;">
                <div class="stem" style="animation-delay: ${delay}s; animation-duration: ${duration}s;"></div>
                <div class="splat" style="animation-delay: ${delay}s; animation-duration: ${duration}s;"></div>
            </div>`;

        frontDrops += dropTemplate(false);
        backDrops += dropTemplate(true);
    }

    frontRow.innerHTML = frontDrops;
    backRow.innerHTML = backDrops;
    overlay.append(frontRow, backRow);
}

function clearRainOverlay() {
    if (elements.rainOverlay) {
        elements.rainOverlay.innerHTML = "";
    }
}

function ensureBaseVolume(audio, defaultVolume = 1) {
    if (!audio) {
        return defaultVolume;
    }
    if (!audio.dataset.baseVolume) {
        const base = audio.volume > 0 ? audio.volume : defaultVolume;
        audio.dataset.baseVolume = String(base);
    }
    return parseFloat(audio.dataset.baseVolume);
}

function playLemonTreeTheme({ restart = false } = {}) {
    const audio = elements.lemonTreeAudio;
    if (!audio) {
        return;
    }
    try {
        if (restart) {
            audio.pause();
            audio.currentTime = 0;
        }
    } catch (err) {
        // ignore reset failures
    }
    audio.loop = true;
    audio.volume = ensureBaseVolume(audio, 0.6);
    if (!restart && !audio.paused) {
        return;
    }
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((error) => {
            console.warn("Unable to start lemon tree audio:", error);
        });
    }
}

function ensureAudioContext() {
    if (typeof window === "undefined") {
        return null;
    }
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
        return null;
    }
    if (!audioContextInstance) {
        audioContextInstance = new Ctx();
    }
    if (audioContextInstance.state === "suspended") {
        audioContextInstance.resume().catch(() => {});
    }
    return audioContextInstance;
}

function ensureGain(audio, gainValue = 1) {
    if (!audio) {
        return null;
    }
    const context = ensureAudioContext();
    if (!context) {
        return null;
    }
    let gainNode = audioGainNodes.get(audio);
    if (!gainNode) {
        try {
            const source = context.createMediaElementSource(audio);
            gainNode = context.createGain();
            gainNode.gain.value = gainValue;
            source.connect(gainNode).connect(context.destination);
            audioGainNodes.set(audio, gainNode);
        } catch (err) {
            gainNode = audioGainNodes.get(audio);
            if (!gainNode) {
                return null;
            }
            gainNode.gain.value = gainValue;
        }
    } else {
        gainNode.gain.value = gainValue;
    }
    return gainNode;
}

function fadeOutAudio(audio, duration = AUDIO_FADE_DURATION_MS, reset = true) {
    if (!audio) {
        return;
    }
    if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        audio._fadeTimeout = null;
    }
    const baseVolume = ensureBaseVolume(audio, 0.8);
    const startVolume = audio.volume;
    const steps = Math.max(1, Math.floor(duration / 50));
    const stepDuration = duration / steps;
    const stepSize = startVolume / steps;
    let currentStep = 0;

    const fadeStep = () => {
        currentStep += 1;
        const newVolume = Math.max(0, startVolume - stepSize * currentStep);
        audio.volume = newVolume;
        if (currentStep >= steps || newVolume <= 0.01) {
            audio.pause();
            if (reset) {
                try {
                    audio.currentTime = 0;
                } catch (err) {
                    // ignore inability to reset currentTime
                }
            }
            audio.volume = baseVolume;
            audio._fadeTimeout = null;
            return;
        }
        audio._fadeTimeout = setTimeout(fadeStep, stepDuration);
    };

    fadeStep();
}

function playRainAudio() {
    const audio = elements.rainAudio;
    if (!audio) {
        return;
    }
    audio.loop = true;
    if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        audio._fadeTimeout = null;
    }
    const base = ensureBaseVolume(audio, 1);
    audio.volume = base;
    ensureGain(audio, 1);
    if (audio.paused) {
        try {
            audio.currentTime = 0;
            const playPromise = audio.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {});
            }
        } catch (err) {
            // Ignore autoplay restrictions
        }
    }
}

function scheduleSunAudioStart(delay = SUN_AUDIO_START_DELAY_MS) {
    if (sunAudioTimeout) {
        clearTimeout(sunAudioTimeout);
        sunAudioTimeout = null;
    }
    const audio = elements.sunAudio;
    if (!audio) {
        return;
    }
    if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        audio._fadeTimeout = null;
    }
    sunAudioTimeout = setTimeout(() => {
        sunAudioTimeout = null;
        audio.loop = true;
        const base = ensureBaseVolume(audio, 1);
        audio.volume = base;
        ensureGain(audio, 3.8);
        if (audio.paused) {
            try {
                audio.currentTime = 0;
                const playPromise = audio.play();
                if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(() => {});
                }
            } catch (err) {
                // ignore autoplay block
            }
    }
    }, delay);
}

function stopSunAudio(options = {}) {
    const { reset = true, fade = true } = options;
    if (sunAudioTimeout) {
        clearTimeout(sunAudioTimeout);
        sunAudioTimeout = null;
    }
    const audio = elements.sunAudio;
    if (!audio) {
        return;
    }
    if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        audio._fadeTimeout = null;
    }
    if (fade) {
        fadeOutAudio(audio, AUDIO_FADE_DURATION_MS, reset);
    } else {
        audio.pause();
        if (reset) {
            try {
                audio.currentTime = 0;
            } catch (err) {
                // ignore
            }
        }
        audio.volume = ensureBaseVolume(audio, 1);
    }
}

function detachShopMusicResumeListener() {
    if (!shopMusicResumeHandler) {
        return;
    }
    document.removeEventListener("pointerdown", shopMusicResumeHandler);
    document.removeEventListener("keydown", shopMusicResumeHandler);
    shopMusicResumeHandler = null;
}

function attachShopMusicResumeListener() {
    if (shopMusicResumeHandler || !shopMusicShouldPlay) {
        return;
    }
    shopMusicResumeHandler = () => {
        detachShopMusicResumeListener();
        attemptPlayShopMusic();
    };
    document.addEventListener("pointerdown", shopMusicResumeHandler);
    document.addEventListener("keydown", shopMusicResumeHandler);
}

function attemptPlayShopMusic({ reset = false } = {}) {
    if (!shopMusicShouldPlay) {
        return;
    }
    const audio = elements.shopMusic;
    if (!audio) {
        return;
    }
    detachShopMusicResumeListener();
    audio.loop = true;
    audio.dataset.baseVolume = "0.42";
    const base = ensureBaseVolume(audio, 0.42);
    audio.volume = base;
    ensureGain(audio, 0.84);
    if (reset) {
        try {
            audio.currentTime = 0;
        } catch (err) {
            // ignore inability to reset playback position
        }
    }
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
        playPromise
            .then(() => {
                if (shopMusicShouldPlay) {
                    detachShopMusicResumeListener();
                }
            })
            .catch(() => {
                attachShopMusicResumeListener();
            });
    } else if (audio.paused) {
        attachShopMusicResumeListener();
    }
}

function scheduleShopMusicStart(delay = 1000) {
    shopMusicShouldPlay = true;
    if (shopMusicTimeout) {
        clearTimeout(shopMusicTimeout);
        shopMusicTimeout = null;
    }
    const audio = elements.shopMusic;
    if (!audio) {
        return;
    }
    if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        audio._fadeTimeout = null;
    }
    audio.dataset.baseVolume = "0.42";
    if (shopMusicShouldPlay && !audio.paused && !audio.ended) {
        audio.loop = true;
        const base = ensureBaseVolume(audio, 0.42);
        audio.volume = base;
        ensureGain(audio, 0.84);
        detachShopMusicResumeListener();
        return;
    }
    const safeDelay = Math.max(0, delay);
    shopMusicTimeout = setTimeout(() => {
        shopMusicTimeout = null;
        attemptPlayShopMusic({ reset: true });
    }, safeDelay);
}

function stopShopMusic({ reset = true, fade = true } = {}) {
    shopMusicShouldPlay = false;
    detachShopMusicResumeListener();
    if (shopMusicTimeout) {
        clearTimeout(shopMusicTimeout);
        shopMusicTimeout = null;
    }
    const audio = elements.shopMusic;
    if (!audio) {
        return;
    }
    if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        audio._fadeTimeout = null;
    }
    audio.dataset.baseVolume = "0.42";
    if (fade) {
        fadeOutAudio(audio, AUDIO_FADE_DURATION_MS, reset);
    } else {
        audio.pause();
        if (reset) {
            try {
                audio.currentTime = 0;
            } catch (err) {
                // ignore inability to reset
            }
        }
        audio.volume = ensureBaseVolume(audio, 0.42);
    }
}

function stopRainAudio(reset = true, fade = true) {
    const audio = elements.rainAudio;
    if (!audio) {
        return;
    }
    if (audio._fadeTimeout) {
        clearTimeout(audio._fadeTimeout);
        audio._fadeTimeout = null;
    }
    if (fade) {
        fadeOutAudio(audio, AUDIO_FADE_DURATION_MS, reset);
    } else {
        audio.pause();
        if (reset) {
            try {
                audio.currentTime = 0;
            } catch (err) {
                // Ignore if cannot reset currentTime
            }
        }
        audio.volume = ensureBaseVolume(audio, 1);
    }
}

function stopBikeRide(cat) {
    if (!cat) {
        return;
    }
    if (cat._rideTimeout) {
        clearTimeout(cat._rideTimeout);
        cat._rideTimeout = null;
    }
    cat.classList.remove("show", "ride-right", "ride-left");
    delete cat.dataset.direction;
    hideBikeBubbleForCat(cat, true);
    if (cat === elements.sunnyBikeCat) {
        hideSunBikeAttachments({ immediate: false });
    }
}

function startBikeRide(cat, direction, delayOverride) {
    if (!cat) {
        return;
    }
    stopBikeRide(cat);
    const delay = typeof delayOverride === "number" ? delayOverride : getRandomBikeDelay();
    cat._rideTimeout = setTimeout(() => {
        if (!cat.isConnected) {
            return;
        }
        void cat.offsetWidth;
        cat.dataset.direction = direction;
        cat.dataset.lastDirection = direction;
        cat.dataset.nextDirection = direction === "right" ? "left" : "right";
        cat.classList.add("show");
        cat.classList.add(direction === "right" ? "ride-right" : "ride-left");
        const state = getBikeBubbleStateByCat(cat);
        if (state) {
            state.manualVisible = false;
            scheduleAutoBubble(state);
        }
        if (cat === elements.sunnyBikeCat) {
            updateSunBikeAttachments({ immediate: true });
        }
        cat._rideTimeout = null;
    }, delay);
}

function createBikeAttachmentState(catEl, attachmentEl, options = {}) {
    if (!catEl || !attachmentEl) {
        return null;
    }
    const offsets = options.offsetX && typeof options.offsetX === "object" ? options.offsetX : {};
    const state = {
        cat: catEl,
        element: attachmentEl,
        anchorX: typeof options.anchorX === "number" ? options.anchorX : 0.5,
        anchorY: typeof options.anchorY === "number" ? options.anchorY : 0.5,
        offsetX: {
            left: typeof offsets.left === "number" ? offsets.left : 0,
            right: typeof offsets.right === "number" ? offsets.right : 0
        },
        offsetY: typeof options.offsetY === "number" ? options.offsetY : 0,
        scale: typeof options.scale === "number" ? options.scale : 1,
        rotation: typeof options.rotation === "number" ? options.rotation : 0,
        mirrorRotation: options.mirrorRotation !== false,
        rafId: null,
        visible: false
    };
    attachmentEl.style.left = "-99999px";
    attachmentEl.style.top = "-99999px";
    return state;
}

function updateBikeAttachmentPosition(state) {
    if (!state || !state.element || !state.cat) {
        return;
    }
    if (!state.visible) {
        return;
    }
    const rect = state.cat.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) {
        return;
    }
    const direction = state.cat.dataset.direction || state.cat.dataset.lastDirection || "right";
    const anchorX = rect.left + rect.width * state.anchorX;
    const anchorY = rect.top + rect.height * state.anchorY;
    const offsetX = direction === "left" ? state.offsetX.left : state.offsetX.right;
    const left = anchorX + offsetX;
    const top = anchorY + state.offsetY;
    state.element.style.left = `${left}px`;
    state.element.style.top = `${top}px`;
    const flip = direction === "right" ? -1 : 1;
    const rotation = state.mirrorRotation ? state.rotation * flip : state.rotation;
    state.element.style.transform = `translate(-50%, -50%) scale(${state.scale * flip}, ${state.scale}) rotate(${rotation}deg)`;
}

function startBikeAttachmentFollower(state) {
    if (!state || !state.element || !state.cat) {
        return;
    }
    if (!finalSceneItemsUnlocked) {
        return;
    }
    if (state.visible && state.rafId) {
        return;
    }
    state.visible = true;
    state.element.classList.add("visible");
    const step = () => {
        if (!state.visible) {
            state.rafId = null;
            return;
        }
        updateBikeAttachmentPosition(state);
        state.rafId = requestAnimationFrame(step);
    };
    updateBikeAttachmentPosition(state);
    state.rafId = requestAnimationFrame(step);
}

function stopBikeAttachmentFollower(state, { immediate = false } = {}) {
    if (!state || !state.element) {
        return;
    }
    if (state.rafId) {
        cancelAnimationFrame(state.rafId);
        state.rafId = null;
    }
    if (!state.visible && !immediate) {
        return;
    }
    state.visible = false;
    state.element.classList.remove("visible");
    if (immediate) {
        state.element.style.left = "-99999px";
        state.element.style.top = "-99999px";
    }
}

function showSunBikeAttachments({ immediate = false } = {}) {
    if (!finalSceneItemsUnlocked || !elements.sunnyBikeCat) {
        return;
    }
    if (!elements.sunnyBikeCat.classList.contains("show")) {
        return;
    }
    sunBikeAttachmentStates.forEach((state) => {
        if (!state) {
            return;
        }
        startBikeAttachmentFollower(state);
        if (immediate) {
            updateBikeAttachmentPosition(state);
        }
    });
}

function hideSunBikeAttachments({ immediate = false } = {}) {
    sunBikeAttachmentStates.forEach((state) => {
        if (!state) {
            return;
        }
        stopBikeAttachmentFollower(state, { immediate });
    });
}

function updateSunBikeAttachments({ immediate = false } = {}) {
    if (!finalSceneItemsUnlocked) {
        hideSunBikeAttachments({ immediate: true });
        return;
    }
    if (elements.sunnyBikeCat && elements.sunnyBikeCat.classList.contains("show")) {
        showSunBikeAttachments({ immediate });
    } else {
        hideSunBikeAttachments({ immediate });
    }
}

function handleSunBikeLetterClick(event) {
    if (!elements.sunBikeAttachmentLetter || finalLetterSequenceTriggered) {
        return;
    }
    if (!finalSceneItemsUnlocked) {
        return;
    }
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    finalLetterSequenceTriggered = true;
    elements.sunBikeAttachmentLetter.style.pointerEvents = "none";
    stopBikeRide(elements.sunnyBikeCat);
    stopBikeRide(elements.rainBikeCat);

    [elements.sunAudio, elements.rainAudio].forEach((audio) => {
        if (!audio) {
            return;
        }
        try {
            audio.pause();
            audio.currentTime = 0;
        } catch (err) {
            // ignore errors resetting audio
        }
    });

    

    document.body.classList.add("final-letter-transition");

    const overlay = elements.finalLetterOverlay;
    if (overlay) {
        overlay.setAttribute("aria-hidden", "false");
    }

    setTimeout(() => {
        if (overlay) {
            overlay.classList.add("visible");
        }
    }, FINAL_LETTER_OVERLAY_DELAY_MS);
}

function createBikeBubbleState(key, catEl, bubbleEl, { offsetX, offsetY } = {}) {
    if (!catEl || !bubbleEl) {
        return null;
    }
    const resolvedOffsetX = offsetX && typeof offsetX === "object"
        ? {
              left: Number(offsetX.left) || 0,
              right: Number(offsetX.right) || 0
          }
        : { left: 0, right: 0 };
    return {
        key,
        cat: catEl,
        bubble: bubbleEl,
        offsetX: resolvedOffsetX,
        offsetY: typeof offsetY === "number" ? offsetY : 0,
        enabled: false,
        visible: false,
        manualVisible: false,
        hideTimeoutId: null,
        displayTimeoutId: null,
        rideShowTimeout: null,
        rideHideTimeout: null,
        rafId: null
    };
}

function activateBikeBubble(key) {
    const state = bikeBubbleStates[key];
    if (!state) {
        return;
    }
    state.manualVisible = false;
    state.enabled = true;
}

function deactivateBikeBubble(key, { immediate = false } = {}) {
    const state = bikeBubbleStates[key];
    if (!state) {
        return;
    }
    state.enabled = false;
    clearRideBubbleTimers(state, true);
    hideBikeBubbleState(state, { immediate, scheduleNext: false });
}

function showBikeBubbleState(state, { manual = false } = {}) {
    if (!state || !state.enabled || state.visible) {
        return;
    }
    if (!state.cat || !state.bubble) {
        return;
    }
    if (!state.cat.classList.contains("show")) {
        return;
    }

    reflectBubbleForDirection(state);
    clearRideBubbleTimers(state, false);
    state.visible = true;
    state.manualVisible = manual;
    state.bubble.style.display = "block";

    requestAnimationFrame(() => {
        if (!state.visible) {
            return;
        }
        reflectBubbleForDirection(state);
        updateBikeBubblePosition(state);
        state.bubble.classList.add("visible");
        startBikeBubbleFollower(state);
    });

    if (state.hideTimeoutId) {
        clearTimeout(state.hideTimeoutId);
        state.hideTimeoutId = null;
    }
    const visibleDuration = state.manualVisible
        ? BIKE_BUBBLE_TOGGLE_VISIBLE_MS
        : BUBBLE_AUTO_VISIBLE_MS;
    state.hideTimeoutId = setTimeout(() => {
        state.hideTimeoutId = null;
        hideBikeBubbleState(state, { scheduleNext: false });
    }, visibleDuration);
}

function hideBikeBubbleState(state, { immediate = false, scheduleNext = false } = {}) {
    if (!state || !state.bubble) {
        return;
    }
    const shouldSchedule = scheduleNext && state.enabled;

    if (state.hideTimeoutId) {
        clearTimeout(state.hideTimeoutId);
        state.hideTimeoutId = null;
    }

    if (state.displayTimeoutId) {
        clearTimeout(state.displayTimeoutId);
        state.displayTimeoutId = null;
    }

    if (!state.visible) {
        return;
    }

    state.visible = false;
    state.manualVisible = false;
    state.bubble.classList.remove("visible");
    state.bubble.style.display = "none";
    stopBikeBubbleFollower(state);
    reflectBubbleForDirection(state);

    if (shouldSchedule) {
        scheduleAutoBubble(state);
    }
}

function hideBikeBubbleForCat(cat, immediate) {
    const state = getBikeBubbleStateByCat(cat);
    if (!state) {
        return;
    }
    if (immediate) {
        clearRideBubbleTimers(state, true);
    }
    const shouldSchedule = !immediate && state.enabled;
    hideBikeBubbleState(state, { immediate: Boolean(immediate), scheduleNext: shouldSchedule });
}

function showBikeBubbleForCat(cat) {
    const state = getBikeBubbleStateByCat(cat);
    if (!state) {
        return;
    }
    state.enabled = true;
    clearRideBubbleTimers(state, true);
    if (state.visible) {
        hideBikeBubbleState(state, { immediate: true, scheduleNext: false });
        return;
    }
    showBikeBubbleState(state, { manual: true });
}

function clearRideBubbleTimers(state, hideBubble = false) {
    if (!state) {
        return;
    }
    if (state.rideShowTimeout) {
        clearTimeout(state.rideShowTimeout);
        state.rideShowTimeout = null;
    }
    if (state.rideHideTimeout) {
        clearTimeout(state.rideHideTimeout);
        state.rideHideTimeout = null;
    }
    if (hideBubble) {
        hideBikeBubbleState(state, { immediate: true, scheduleNext: false });
    }
}

function scheduleAutoBubble(state) {
    if (!state || !state.enabled || state.manualVisible) {
        return;
    }
    clearRideBubbleTimers(state, false);
    if (Math.random() >= BUBBLE_AUTO_CHANCE) {
        return;
    }
    const delay = BUBBLE_AUTO_DELAY_MIN_MS + Math.random() * (BUBBLE_AUTO_DELAY_MAX_MS - BUBBLE_AUTO_DELAY_MIN_MS);
    state.rideShowTimeout = setTimeout(() => {
        state.rideShowTimeout = null;
        if (!state.enabled || !state.cat || !state.cat.classList.contains("show")) {
            return;
        }
        showBikeBubbleState(state, { manual: false });
        state.rideHideTimeout = setTimeout(() => {
            state.rideHideTimeout = null;
            hideBikeBubbleState(state, { immediate: false, scheduleNext: false });
        }, BUBBLE_AUTO_VISIBLE_MS);
    }, delay);
}

function startBikeBubbleFollower(state) {
    if (!state) {
        return;
    }
    stopBikeBubbleFollower(state);
    const step = () => {
        if (!state.visible) {
            state.rafId = null;
            return;
        }
        reflectBubbleForDirection(state);
        updateBikeBubblePosition(state);
        state.rafId = requestAnimationFrame(step);
    };
    state.rafId = requestAnimationFrame(step);
}

function stopBikeBubbleFollower(state) {
    if (!state) {
        return;
    }
    if (state.rafId) {
        cancelAnimationFrame(state.rafId);
        state.rafId = null;
    }
}

function updateBikeBubblePosition(state) {
    if (!state || !state.visible || !state.cat || !state.bubble) {
        return;
    }
    const catRect = state.cat.getBoundingClientRect();
    if (!catRect || (catRect.width === 0 && catRect.height === 0)) {
        return;
    }
    const direction = state.cat.dataset.direction || state.cat.dataset.lastDirection || "right";
    const offsetX = direction === "left" ? state.offsetX.left : state.offsetX.right;
    const bubbleWidth = state.bubble.offsetWidth || 0;
    const bubbleHeight = state.bubble.offsetHeight || 0;
    const left = catRect.left + catRect.width * 0.5 - bubbleWidth * 0.5 + offsetX;
    const top = catRect.top - bubbleHeight + state.offsetY;
    state.bubble.style.left = `${left}px`;
    state.bubble.style.top = `${top}px`;
}

function reflectBubbleForDirection(state) {
    if (!state || !state.bubble) {
        return;
    }
    const direction = state.cat.dataset.direction || state.cat.dataset.lastDirection || "right";
    const scaleX = direction === "left" ? -1 : 1;
    const currentScale = state.visible ? 1 : 0.9;
    state.bubble.style.transform = `scale(${scaleX * currentScale}, ${currentScale})`;
}

function getBikeBubbleStateByCat(cat) {
    if (!cat) {
        return null;
    }
    if (cat === elements.rainBikeCat) {
        return bikeBubbleStates.rain;
    }
    if (cat === elements.sunnyBikeCat) {
        return bikeBubbleStates.sun;
    }
    return null;
}

function toggleBikeBubble(key) {
    const state = bikeBubbleStates[key];
    if (!state || !state.enabled) {
        return;
    }
    clearRideBubbleTimers(state, false);

    if (state.hideTimeoutId) {
        clearTimeout(state.hideTimeoutId);
        state.hideTimeoutId = null;
    }

    if (state.displayTimeoutId) {
        clearTimeout(state.displayTimeoutId);
        state.displayTimeoutId = null;
    }

    if (state.visible) {
        hideBikeBubbleState(state, { immediate: true, scheduleNext: false });
        return;
    }

    if (!state.cat || !state.cat.classList.contains("show")) {
        return;
    }

    showBikeBubbleState(state, { manual: true });
}

function beginFirstSpecialSwap(nextDirection) {
    if (!pendingFirstSpecialTransition) {
        return;
    }
    const direction = nextDirection || "right";
    stopBikeRide(elements.rainBikeCat);
    rainBikeSwapPending = false;
    stopRainAudio(false, true);

    if (firstSpecialSwapTimeout) {
        clearTimeout(firstSpecialSwapTimeout);
    }
    if (firstSpecialResumeTimeout) {
        clearTimeout(firstSpecialResumeTimeout);
    }

    firstSpecialSwapTimeout = setTimeout(() => {
        firstSpecialSwapTimeout = null;
        setVisualMode("sun", { sunDirection: direction, sunDelay: SCENE_SWAP_DELAY_MS });
        firstSpecialResumeTimeout = setTimeout(() => {
            firstSpecialResumeTimeout = null;
            showQuizUI();
            pendingFirstSpecialTransition = false;
            currentQuestionIndex++;
            advanceQuizFlow();
        }, SCENE_SWAP_DELAY_MS + POST_SCENE_CONTINUE_DELAY_MS + SUN_POST_TRANSITION_PAUSE_MS);
    }, 1000);
}

function handleBikeAnimationEnd(event) {
    const cat = event.target;
    if (!cat.classList.contains("bike-cat")) {
        return;
    }

    const bodyHasActiveMode = document.body.classList.contains("rain-mode") || document.body.classList.contains("sun-mode");

    if (!bodyHasActiveMode) {
        stopBikeRide(cat);
        return;
    }

    const finishedDirection = cat.dataset.direction === "left" ? "left" : "right";
    let nextDirection = finishedDirection === "right" ? "left" : "right";
    stopBikeRide(cat);
    cat.dataset.lastDirection = finishedDirection;
    cat.dataset.nextDirection = nextDirection;

    if (cat === elements.rainBikeCat && pendingFirstSpecialTransition) {
        beginFirstSpecialSwap(nextDirection);
        return;
    }

    startBikeRide(cat, nextDirection);
}

// ✅ Start Test Function
function startTest() {
    initializeQuiz(shuffleArray(testQuestions));
}


// ✅ Shuffle Questions Function
function shuffleArray(source) {
    const array = source.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function cloneQuestion(question) {
    return {
        ...question,
        answers: question.answers.slice(),
        correct: Array.isArray(question.correct) ? question.correct.slice() : question.correct
    };
}

function isAnswerCorrect(question, answerIndex) {
    if (!question) {
        return false;
    }
    const { correct } = question;
    if (Array.isArray(correct)) {
        return correct.includes(answerIndex);
    }
    return correct === answerIndex;
}

function setup2010State() {
    const pool = shuffleArray(womensDayQuestions)
        .slice(0, 30)
        .map(cloneQuestion);

    const sections = [
        pool.slice(0, 10),
        pool.slice(10, 20),
        pool.slice(20, 30),
    ];

    test2010State = {
        sections,
        sectionIndex: 0,
        questionsAnsweredInSection: 0,
        correctInSection: 0,
        totalStandardAnswered: 0,
        firstSpecialInserted: false,
        firstSpecialCompleted: false,
        secondSpecialInserted: false,
        secondSpecialCompleted: false,
    };

    questions = sections.flat();
    rainBikeSwapPending = false;
    pendingFirstSpecialTransition = false;
    stopBikeRide(elements.sunnyBikeCat);
}

// HELP Functions
function showHelp() {
    document.getElementById("help-popup").style.display = "flex";
}

function hideHelp() {
    document.getElementById("help-popup").style.display = "none";
}

function birthdayOption() {
    alert("Can only be accessed on 17/07/2025! 🎂🎉");
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
    { question: "Minh Anh promised to complete 55 units ……… the end of the week.", answers: ["In", "From", "By", "On"], correct: 2 },
    { question: "……… have her words hurt him more than they do now.", answers: ["Always", "Never", "Rare", "Often"], correct: 1 },
    { question: "That decision of ……… to repaint the house now was a very smart one", answers: ["Your", "You", "Yourself", "Yours"], correct: 3 },
    { question: "After he ….. her in person, he decided she is the one <3.", answers: ["Have seen", "Had seen", "Had been seeing", "Saw"], correct: 1 },
    { question: "The sun …… in the East.", answers: ["Rise", "Rises", "Rising", "Has risen"], correct: 1 },
    { question: "I …. to visit you yesterday, but you ….. not at home.", answers: ["Wanted/were", "Want/are", "Want/were", "want, is"], correct: 0 },
    { question: "Last winter she ____________ (drive) to Germany.", answers: ["Drove", "Drived", "Did drive", "driven"], correct: 0 },
    { question: "I don't think he will remember the appointment _____ you remind him.", answers: ["so", "if", "unless", "lest"], correct: 2 },
    { question: "_____ he was not interested in music, he agreed to go to the concert.", answers: ["Though", "While", "For", "Since"], correct: 0 },
    { question: "He will show us around himself _____ send someone else.", answers: ["and", "if", "or", "so"], correct: 2 },
    { question: "_____ the teacher explained the lesson several times, some of the students still did not understand it.", answers: ["Although", "Even if", "Unless", "Since"], correct: 0 },
    { question: "While Tom (play)…… the piano, his mother was doing the washing-up.", answers: ["Was playing", "Were playing", "Played", "Play"], correct: 0 },
    { question: "He had expressed his love for her before he (leave)____ for Germany.", answers: ["left", "leave", "leaving", "had left"], correct: 0 },
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
    { question: "___ we stopped talking, I will always love you", answers: ["If", "Even though", "But", "Regardless"], correct: 1 },
    { question: "He often drinks from that same mug because it was a special gift from someone special, ___ he had feelings.", answers: ["that", "whom", "for whom", "who"], correct: 2},
    { question: "She ___ too much tea earlier so now she can't sleep", answers: ["drink", "drinks", "drunk", "drank"], correct: 3 },
    { question: "Both Ha and Minh Anh ___ for the roasted chicken last evening", answers: ["pay", "payed", "paid", "paided"], correct: 2 },
    { question: "She only ____ for 5 hours last night because she drank too much tea", answers: ["sleep", "sleeps", "sleeped", "slept"], correct: 3 },
    { question: "I ___ in love when I saw her picture the first time ", answers: ["fall", "falled", "fell", "full"], correct: 2 }
];



// ✅ Show Question Function
function showQuestion() {
    const questionObj = questions[currentQuestionIndex];

    if (!questionObj) {
        console.warn(`No question found for index ${currentQuestionIndex}.`);
        return;
    }

    if (!elements.question) {
        console.warn("Question element is missing from the page.");
        return;
    }

    elements.question.innerHTML = questionObj.question;

    elements.options.forEach((button, index) => {
        if (!button) {
            return;
        }

        button.disabled = false;
        resetOptionStyles(button);
        const answer = questionObj.answers[index];

        if (answer === undefined) {
            button.style.display = "none";
            button.onclick = null;
            return;
        }

        button.style.display = "inline-block";
        button.innerText = answer;
        button.onclick = (event) => checkAnswer(index, event.currentTarget);
    });

    if (is2010Test && questionObj.isFirstSpecial) {
        applyRunawayNoButton();
    }
}

function resetOptionStyles(button) {
    if (!button) {
        return;
    }

    button.style.position = "";
    button.style.left = "";
    button.style.top = "";
    button.style.transform = "";
    button.style.transition = "";
}

function applyRunawayNoButton() {
    const [yesBtn, noBtn] = elements.options;

    if (!yesBtn || !noBtn) {
        return;
    }

    yesBtn.style.position = "absolute";
    yesBtn.style.left = "50%";
    yesBtn.style.top = "40%";
    yesBtn.style.transform = "translateX(-50%)";

    noBtn.style.position = "absolute";
    noBtn.style.left = "50%";
    noBtn.style.top = "55%";
    noBtn.style.transform = "translateX(-50%)";
    noBtn.style.transition = "left 0.12s cubic-bezier(.68,-0.55,.27,1.55), top 0.12s cubic-bezier(.68,-0.55,.27,1.55)";

    yesBtn.onclick = () => checkAnswer(0, yesBtn);
    noBtn.onclick = (e) => {
        e.preventDefault();
        noBtn.style.transform = "";

        if (!quizContainer) {
            return;
        }

        const maxX = quizContainer.offsetWidth - noBtn.offsetWidth;
        const maxY = quizContainer.offsetHeight - noBtn.offsetHeight;

        const btnRect = noBtn.getBoundingClientRect();
        const containerRect = quizContainer.getBoundingClientRect();
        const currentX = btnRect.left - containerRect.left;
        const currentY = btnRect.top - containerRect.top;

        const minDistance = 120;
        const maxDistance = 300;

        let randX = currentX;
        let randY = currentY;
        let distance = 0;
        let tries = 0;

        while (tries < 40) {
            const angle = Math.random() * 2 * Math.PI;
            const moveDistance = minDistance + Math.random() * (maxDistance - minDistance);
            let tryX = currentX + Math.cos(angle) * moveDistance;
            let tryY = currentY + Math.sin(angle) * moveDistance;

            tryX = Math.max(0, Math.min(maxX, tryX));
            tryY = Math.max(0, Math.min(maxY, tryY));
            distance = Math.hypot(tryX - currentX, tryY - currentY);

            if (distance >= minDistance) {
                randX = tryX;
                randY = tryY;
                break;
            }

            tries++;
        }

        if (tries >= 40) {
            randX = Math.random() * maxX;
            randY = Math.random() * maxY;
        }

        noBtn.style.left = `${randX}px`;
        noBtn.style.top = `${randY}px`;
    };
}

// ✅ Check Answer Function (Modified)
function checkAnswer(answerIndex, sourceButton) {
    if (answerFeedbackPromise) {
        return;
    }
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        console.warn(`Attempted to answer missing question at index ${currentQuestionIndex}.`);
        return;
    }

    if (is2010Test) {
        if (currentQuestion.isFirstSpecial) {
            handle2010FirstSpecialAnswer(answerIndex, currentQuestion, sourceButton);
            return;
        }

        if (currentQuestion.isSecondSpecial) {
            handle2010SecondSpecialAnswer(answerIndex, currentQuestion, sourceButton);
            return;
        }
    }

    const isCorrect = isAnswerCorrect(currentQuestion, answerIndex);
    const finalizeAdvance = () => {
        if (is2010Test) {
            update2010StandardStats(isCorrect);
        }
        currentQuestionIndex++;
        if (is2010Test) {
            handle2010PostQuestion();
        }
        advanceQuizFlow();
    };

    const feedback = handleAnswerCorrectness(isCorrect, sourceButton);
    if (feedback && typeof feedback.then === "function") {
        answerFeedbackPromise = feedback
            .catch(() => {})
            .then(() => finalizeAdvance())
            .finally(() => {
                answerFeedbackPromise = null;
            });
    } else {
        finalizeAdvance();
    }
}

function handleAnswerCorrectness(isCorrect, sourceButton, options = {}) {
    if (!isCorrect) {
        updateProgress();
        return null;
    }

    const {
        coinValue = 1,
        coinPopClass = "",
        coinPopDuration = 1000,
        coinFlashClass = "",
        coinFlashDuration = 800,
        counterDelay = 0,
        counterPulseClass = "",
        counterPulseDuration = 500
    } = options || {};

    correctAnswers += coinValue;

    if (!is2010Test) {
        playAudioClip(elements.catSound, { volume: 0.7 }).catch(() => {});
        updateCoinCounter();
        updateProgress();
        return null;
    }

    const flashPromise = triggerCoinFlash({
        flashClass: coinFlashClass || "coin-flash",
        duration: coinFlashDuration
    }).catch((err) => {
        console.warn("Coin flash issue:", err);
    });

    const feedbackPromise = playCoinFeedback(sourceButton, {
        coinClass: coinPopClass,
        duration: coinPopDuration
    }).catch((err) => {
        console.warn("Coin feedback issue:", err);
    });

    return Promise.all([flashPromise, feedbackPromise]).then(() => {
        const finalize = () => {
            updateCoinCounter();
            if (elements.coinCount && counterPulseClass) {
                if (coinCountPulseTimeout) {
                    clearTimeout(coinCountPulseTimeout);
                    coinCountPulseTimeout = null;
                }
                elements.coinCount.classList.remove(counterPulseClass);
                void elements.coinCount.offsetWidth;
                elements.coinCount.classList.add(counterPulseClass);
                const pulseDuration = Math.max(0, counterPulseDuration);
                if (pulseDuration > 0) {
                    coinCountPulseTimeout = setTimeout(() => {
                        if (elements.coinCount) {
                            elements.coinCount.classList.remove(counterPulseClass);
                        }
                        coinCountPulseTimeout = null;
                    }, pulseDuration);
                }
            }
            updateProgress();
        };
        const safeDelay = Math.max(0, counterDelay);
        if (safeDelay > 0) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    finalize();
                    resolve(true);
                }, safeDelay);
            });
        }
        finalize();
        return true;
    });
}

function advanceQuizFlow() {
    if (!is2010Test && correctAnswers >= maxCorrectAnswers) {
        if (elements.rewardButton) {
            elements.rewardButton.style.display = "block";
        }
        return;
    }

    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    showQuestion();
}

function handle2010FirstSpecialAnswer(answerIndex, question, sourceButton) {
    if (answerFeedbackPromise) {
        return;
    }

    const isCorrect = isAnswerCorrect(question, answerIndex);

    if (!isCorrect) {
        return;
    }

    const finalize = () => {
        if (test2010State) {
            test2010State.firstSpecialCompleted = true;
        }
        handleFirstSpecialCompleted();
    };

    const feedback = handleAnswerCorrectness(true, sourceButton, {
        coinValue: 10,
        coinPopClass: "option-coin-pop--special",
        coinPopDuration: 1200,
        coinFlashClass: "coin-flash-special",
        coinFlashDuration: 1400,
        counterDelay: 600,
        counterPulseClass: "coin-count-pop",
        counterPulseDuration: 500
    });
    if (feedback && typeof feedback.then === "function") {
        answerFeedbackPromise = feedback
            .catch(() => {})
            .then(() => finalize())
            .finally(() => {
                answerFeedbackPromise = null;
            });
    } else {
        finalize();
    }
}

function handle2010SecondSpecialAnswer(answerIndex, question, sourceButton) {
    if (answerFeedbackPromise) {
        return;
    }

    const isCorrect = isAnswerCorrect(question, answerIndex);

    if (!isCorrect) {
        return;
    }

    const finalize = () => {
        if (test2010State) {
            test2010State.secondSpecialCompleted = true;
        }
        handleSecondSpecialCompleted();
        currentQuestionIndex++;
        advanceQuizFlow();
    };

    const feedback = handleAnswerCorrectness(true, sourceButton);
    if (feedback && typeof feedback.then === "function") {
        answerFeedbackPromise = feedback
            .catch(() => {})
            .then(() => finalize())
            .finally(() => {
                answerFeedbackPromise = null;
            });
    } else {
        finalize();
    }
}

// ✅ Update Progress Function
function updateProgress() {
    const max = maxCorrectAnswers;
    const safeCorrect = Math.min(correctAnswers, max);
    const progress = (safeCorrect / max) * 100;
    if (elements.progressBar) {
        elements.progressBar.style.width = `${progress}%`;
    }
    if (elements.progressText) {
        elements.progressText.innerText = `Reward Progress: ${Math.round(progress)}%`;
    }

    // Show reward button when full
    if (!is2010Test && safeCorrect >= max) {
        if (elements.rewardButton) {
            elements.rewardButton.style.display = "block";
        }
        showResult();
    }
}

function handleFirstSpecialCompleted() {
    pendingFirstSpecialTransition = true;
    rainBikeSwapPending = true;
    hideQuizUI();

    const rainCat = elements.rainBikeCat;
    if (!rainCat) {
        beginFirstSpecialSwap();
        return;
    }

    const nextDirection = rainCat.dataset.nextDirection || "right";

    if (rainCat._rideTimeout) {
        clearTimeout(rainCat._rideTimeout);
        rainCat._rideTimeout = null;
        beginFirstSpecialSwap(nextDirection);
        return;
    }

    if (!rainCat.classList.contains("show")) {
        beginFirstSpecialSwap(nextDirection);
    }
}

function handleSecondSpecialCompleted() {
    // Sunny ride continues automatically; no additional scene change required.
}

function update2010StandardStats(isCorrect) {
    if (!test2010State) {
        return;
    }

    const state = test2010State;
    state.questionsAnsweredInSection++;
    state.totalStandardAnswered++;

    if (isCorrect) {
        state.correctInSection++;
    }
}

function handle2010PostQuestion() {
    if (!test2010State) {
        return;
    }

    const state = test2010State;

    if (!state.firstSpecialInserted && state.sectionIndex === 0 && state.correctInSection >= 5) {
        insertSpecialQuestion(firstSpecialQuestion2010);
        state.firstSpecialInserted = true;
        return;
    }

    const currentSection = state.sections[state.sectionIndex];
    if (currentSection && state.questionsAnsweredInSection >= currentSection.length) {
        if (state.sectionIndex === 0 && !state.firstSpecialInserted) {
            insertSpecialQuestion(firstSpecialQuestion2010);
            state.firstSpecialInserted = true;
            return;
        }

        state.sectionIndex++;
        state.questionsAnsweredInSection = 0;
        state.correctInSection = 0;

        if (state.sectionIndex === 2 && !state.secondSpecialInserted) {
            insertSpecialQuestion(secondSpecialQuestion2010);
            state.secondSpecialInserted = true;
        }
    }
}

function insertSpecialQuestion(question) {
    questions.splice(currentQuestionIndex, 0, question);
}


function showRewardScene() {
    // Hide quiz & progress elements
    if (elements.quizContent) {
        elements.quizContent.style.display = "none";
    }
    if (elements.progressContainer) {
        elements.progressContainer.style.display = "none";
    }
    if (elements.rewardButton) {
        elements.rewardButton.style.display = "none";
    }

    setVisualMode(null);
    setIdleCatsEnabled(false);

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
    if (!elements.quizContent) {
        return;
    }

    elements.quizContent.innerHTML = `
     <h1>🎉 Quiz Completed! 🌟</h1>
     
     <button class="try-again-btn" onclick="location.reload()">Try Again!</button>
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


const idleCats = [
    { id: "idle-cat", className: "slide", delay: 10000 },
    { id: "idle-cat-2", className: "slide-2", delay: 20000 },
    { id: "idle-cat-3", className: "slide-3", delay: 30000 },
    { id: "idle-cat-4", className: "slide-4", delay: 40000 },
    { id: "idle-cat-5", className: "slide-5", delay: 40000 },
    { id: "idle-cat-6", className: "slide-6", delay: 50000 },
    { id: "idle-cat-7", className: "slide-7", delay: 50000 },
    { id: "idle-cat-8", className: "slide-8", delay: 60000 },
    { id: "idle-cat-9", className: "slide-9", delay: 70000 },
];

let idleTimeouts = [];
let idleCatsEnabled = true;

["DOMContentLoaded", "mousemove", "keydown"].forEach((eventName) => {
    document.addEventListener(eventName, resetIdleTimer);
});

function resetIdleTimer() {
    if (!idleCatsEnabled) {
        return;
    }

    idleTimeouts.forEach(clearTimeout);
    idleTimeouts = [];

    hideIdleCats();

    idleTimeouts = idleCats.map(({ delay, id, className }) =>
        setTimeout(() => showIdleCat(id, className), delay)
    );
}

function showIdleCat(id, className) {
    const idleCat = document.getElementById(id);

    if (!idleCat) {
        console.error(`Idle cat element "${id}" not found!`);
        return;
    }

    idleCat.classList.add(className);
}

function hideIdleCats() {
    idleCats.forEach(({ id, className }) => {
        const idleCat = document.getElementById(id);
        if (idleCat) {
            idleCat.classList.remove(className);
        }
    });
}

function setIdleCatsEnabled(enabled) {
    idleCatsEnabled = enabled;
    if (!enabled) {
        idleTimeouts.forEach(clearTimeout);
        idleTimeouts = [];
        hideIdleCats();
    } else {
        resetIdleTimer();
    }
}

// Start the idle timer when the page loads
resetIdleTimer();
