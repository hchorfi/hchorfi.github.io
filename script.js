let cards = document.querySelectorAll(".card");
let cards_body = document.getElementById("cards_body");
let mtatchedCard = 0;
let maxScore = 0;
let cardOne, cardTwo;
let disableDeck = false;
let t = [];
let level = 1;
let levelInfo = [[1, 4, 6], [2, 3, 8], [3, 2, 18]];
let seconds = 50;
let score = document.getElementById("score");
let time = document.getElementById("time");
let counter = setInterval(decrimentSec, 1000);

function init(){
    mtatchedCard = 0;
    cards_body.innerHTML = "";
    cardOne, cardTwo;
    disableDeck = false;
    t = [];
    seconds =  50 * level;
    score.innerHTML = `Score: ${maxScore}`;
    clearInterval(counter);
    counter = setInterval(decrimentSec, 1000);
}

function decrimentSec(){
    seconds -= 1;
    time.innerHTML = `Time: ${seconds}s`
    if (seconds === 0){
        clearInterval(counter);
        cards.forEach(card => {
            //card.classList.add("flip");
            card.removeEventListener("click", flipCard);
        });
    }
}

function flipCard(e){
    if (t.includes(e.target))
        return ;
    let clickedCard = e.target;
    console.log(clickedCard);
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.getElementsByTagName("img")[1].src,
        cardTwoImg = cardTwo.getElementsByTagName("img")[1].src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2){
    if(img1 === img2){
        mtatchedCard++;
        maxScore += level * 2;
        score.innerHTML = `Score: ${maxScore}`;
        if(mtatchedCard == levelInfo[level - 1][2]){
            level++;
            setTimeout(() => {
                clearInterval(counter);
                counter = setInterval(decrimentSec, 1000);
                return shuffleCard(level);
            }, 1000);
        }
        t.push(cardOne);
        t.push(cardTwo);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 200);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 600);
}

function shuffleCard(lvl){
    init();
    cardOne = cardTwo = "";
    let arr_img = [];
    for(let j = 0; j < 2; j++){
        for (let i = 1; i <= levelInfo[lvl - 1][2]; i++){
            arr_img.push(i);
        }
    }
    arr_img.sort(() => Math.random() > 0.5 ? 1 : -1);
    arr_img.forEach(x => {
        console.log(x);
        cards_body.innerHTML += `
        <div class=" col-${levelInfo[lvl - 1][1]} col-md-${levelInfo[lvl - 1][1]}">
            <div class="card card-flip">
                <div class="card-front">
                    <img src="img/img0.png" class="img-fluid">
                </div>
                <div class="card-back">
                    <img src="img/img${x}.png" class="img-fluid">
                </div>
            </div>
        </div>`
    });
    cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.classList.add("flip");
        let imgTag = card.getElementsByTagName("img")[1];
        console.log(imgTag);
        imgTag.src = `img/img${arr_img[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard(level);
console.log(levelInfo[level - 1][1]);
// cards.forEach(card => {
//     //card.classList.add("flip");
//     card.addEventListener("click", flipCard);
// });