const ANIMATION_SPEED = 20;

const cardsContainer = document.getElementById("motion-demo");
let currentCard = null;
let currentCardTitle = null;
let currentCardCloseBtn = null;
let currentCardLink = null;
let isAnimating = false;
let currentOffset = 0;
let targetOffset = 0;
let lastTargetOffset = 0;
let moveToRight = false;
let intervalId = null;

const startAnimating = () => {
    isAnimating = true;

    const cardsContainerBoundingRect = cardsContainer.getBoundingClientRect();
    const cardBoundingRect = currentCard.getBoundingClientRect();
    let offset = cardsContainerBoundingRect.x + cardsContainerBoundingRect.width/2 - cardBoundingRect.x - cardBoundingRect.width/2;

    moveToRight = offset > 0;
    currentOffset = 0;
    targetOffset = offset;

    intervalId = setInterval(animate, 1000/60);
}

const animate = () => {
    if (moveToRight) {
        currentOffset += ANIMATION_SPEED;
        if (currentOffset >= targetOffset) {
            currentOffset = targetOffset;
            isAnimating = false;
        }
    } else {
        currentOffset -= ANIMATION_SPEED;
        if (currentOffset <= targetOffset) {
            currentOffset = targetOffset;
            isAnimating = false;
        }
    }

    let percentage = targetOffset === 0 ? Math.abs(currentOffset/lastTargetOffset) : Math.abs(currentOffset/targetOffset);
    if (isNaN(percentage)) percentage = 0;

    currentCard.style.transform = `translateX(${currentOffset}px) scale(${percentage+1})`;
    currentCardTitle.style.fontSize = `${1.6 - percentage * 0.5}rem`;
    currentCardTitle.style.lineHeight = `${1.6 - percentage * 0.5}rem`;

    if (!isAnimating) {
        clearInterval(intervalId);
        if (targetOffset !== 0) {
            currentCardCloseBtn.classList.add("motion-demo__card-close-button--show");
            currentCardLink.classList.add("motion-demo__card-link--opened");
        } else {
            currentCard.style.zIndex = "unset";
            currentCard.classList.remove("motion-demo__card--opened");
            currentCard = null;
            currentCardTitle = null;
            currentCardCloseBtn = null;
            currentCardLink = null;
        }
    }
}

const closeCard = () => {
    isAnimating = true;

    currentOffset = targetOffset;
    lastTargetOffset = targetOffset;
    targetOffset = 0;
    moveToRight = currentOffset < 0;


    currentCardLink.classList.remove("motion-demo__card-link--opened");
    currentCardCloseBtn.classList.remove("motion-demo__card-close-button--show");
    
    setTimeout(() => {
        intervalId = setInterval(animate, 1000/60);
    }, 200);
}



cardsContainer.addEventListener("click", (e) => {
    if (currentCard) return;

    currentCard = e.target.closest(".motion-demo__card");
    currentCard.classList.add("motion-demo__card--opened");

    currentCardTitle = currentCard.querySelector(".motion-demo__card-title");
    currentCard.style.zIndex = 10;

    currentCardCloseBtn = currentCard.querySelector(".motion-demo__card-close-button");

    currentCardLink = currentCard.querySelector(".motion-demo__card-link");

    if (currentCard) startAnimating();
});

const closeButtons = document.querySelectorAll(".motion-demo__card-close-button");
for (let btn of closeButtons) btn.addEventListener("click", closeCard);