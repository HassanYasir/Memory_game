
let parent = document.querySelector(".game-container")

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let i1 = randomInt(0, 2)
let i2 = randomInt(2, 4)
let i3 = randomInt(4, 6)
let i4 = randomInt(6, 8)
let i5 = randomInt(8, 10)
let i6 = randomInt(10, 12)
let someArray = [
  {
    name: "black-jaguar",
    img: "/Logos/black-jaguar.png"
  },
  {
    name: "wildlife",
    img: "/Logos/wildlife.png"
  },
  {
    name: "horse",
    img: "/Logos/horse.png"
  },
  {
    name: "fish",
    img: "/Logos/fish.png"
  },
  {
    name: "falcon",
    img: "/Logos/falcon.png"
  },
  {
    name: "elephant",
    img: "/Logos/elephant.png"
  },
  {
    name: "deer",
    img: "/Logos/deer.png"
  },
  {
    name: "cow",
    img: "/Logos/cow.png"
  },
  {
    name: "chicken",
    img: "/Logos/chicken.png"
  },
  {
    name: "cat",
    img: "/Logos/cat.png"
  },
  {
    name: "bull",
    img: "/Logos/bull.png"
  },
  {
    name: "bee",
    img: "/Logos/bee.png"
  }
]
let cardArray = [
  {
    name: someArray[i1].name,
    img: someArray[i1].img
  },
  {
    name: someArray[i2].name,
    img: someArray[i2].img
  },
  {
    name: someArray[i3].name,
    img: someArray[i3].img
  },
  {
    name: someArray[i4].name,
    img: someArray[i4].img
  },
  {
    name: someArray[i5].name,
    img: someArray[i5].img
  },
  {
    name: someArray[i6].name,
    img: someArray[i6].img
  }

]

let cardsList = cardArray.concat(cardArray)

// step two shuffle array elements

const arrShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))

    let temp = array[i]
    array[i] = array[j]
    array[j] = temp

  }
  return array = array
}

arrShuffle(cardsList)

let clickCount = 0;
let firstCard = "";
let secondCard = "";
let matchCount = 0;
let checkGameEnd = 0;

const winAudio = new Audio("./audio/win.mp3")
const flip = new Audio("./audio/flip.mp3")
const maches = new Audio("./audio/maches.mp3")
const popup = document.getElementById("pop-up")
const againbtn = document.querySelector(".play-again")


// * creating function for check the Match

const checkMatch = () => {
  let slectedCards = document.querySelectorAll(".card-slect")
  Array.from(slectedCards).forEach((elems) => {
    elems.classList.add("card-match")

    matchCount += 1
    checkGameEnd++
    console.log(checkGameEnd)

    if (checkGameEnd === 12) {
      winAudio.play()
      setTimeout(() => {
        popup.showModal()
        againbtn.addEventListener("click",()=>{
          setTimeout(()=>{
            window.location.reload()
          },10)
        })
        
      }, 1000)

    }


  })


}

// creating the reset function

const resetGame = () => {
  clickCount = 0;
  firstCard = "";
  secondCard = "";

  let slectedCards = document.querySelectorAll(".card-slect")
  Array.from(slectedCards).forEach((elems) => {
    elems.classList.remove("card-slect")
  })
}

// creating check game over function





parent.addEventListener("click", (e) => {
  let currentCard = e.target.id === "g-container" ? false : e.target




  e.target.id === "g-container" ? clickCount : clickCount++
  if (clickCount < 3) {

    if (clickCount === 1) {
      firstCard = currentCard.parentNode.dataset.name;
      currentCard.parentNode.classList.add("card-slect")
      flip.play()

    }
    else {
      secondCard = currentCard.parentNode.dataset.name;
      currentCard.parentNode.classList.add("card-slect")

    }

    if (firstCard !== "" && secondCard !== "") {
      flip.play()

      if (firstCard === secondCard) {
        // function for checking the match of cards

        setTimeout(() => {
          checkMatch()
          maches.play()
          resetGame()

        }, 1000)



      } else {
        setTimeout(() => {

          resetGame()

        }, 2000)
      }

    }

  }

})




for (let i = 0; i < cardsList.length; i++) {

  let div = document.createElement("div")
  let frontDiv = document.createElement("div")
  frontDiv.classList.add("front-div")
  let backDiv = document.createElement("div")
  backDiv.classList.add("back-div")
  div.classList.add("box")
  div.dataset.name = cardsList[i].name
  parent.appendChild(div);
  div.appendChild(frontDiv)
  div.appendChild(backDiv)
  backDiv.style.backgroundImage = `url(${cardsList[i].img})`
}