let start = document.querySelector(".start");
let select = document.querySelector("select");
let studentName = document.querySelector(".stdName");
let Name= document.getElementById("Name");
let Name2= document.getElementById("name2");
let Name3= document.getElementById("name3");

let SelectName = document.querySelector(".nameselection");
let Question = document.querySelector(".question");
const option_list = document.querySelector(".questionList");
let Next = document.querySelector("#next");
let brev = document.querySelector("#brev");
let submit = document.getElementById("submit");
const stopWatch = document.getElementsByTagName("h2")[0];
let score = document.getElementById("score");
let resultform = document.getElementById("result");
let userScore = 0;
var arr2 = [];
let seconds = 0;
let minutes = 2;
let timerID;
let arr = [];
let questionNum = 0;
//let stdNamee=[];
//let counter=0;
select.addEventListener('change', (e) => {
  console.log("select");
  studentName.innerHTML = e.target.value;
  //stdNamee.push(studentName.innerHTML);
  console.log(Name.innerHTML);
});



start.onclick = () => {
  
  SelectName.classList.add("hide");
  Question.classList.add("show"); //show info box
  Name2.innerHTML = Name.innerHTML;
  displayQuetions(arr[questionNum]);
  if(questionNum=0){
    brev.classList.add("hide");
  }
  if(questionNum<5){
    submit.classList.add("hide");
  }
  //questionNum++
  timer();
}
submit.onclick = () => {
  Result();

}
Next.onclick = () => {

  arr2.splice(questionNum, 0, document.querySelector("input:checked").id);
  Next.classList.remove("btnShow");

  if (questionNum < questions.length - 1) {
    questionNum++;
    
    if (questionNum > 0) {
      brev.classList.add("btnShow");
    }
    else {
      brev.classList.remove("btnShow");
    }

    if (document.querySelector("input:checked") == null) {
      Next.classList.remove("btnShow");
    }
    else {
      Next.classList.add("btnShow");

    }
    displayQuetions(arr[questionNum]);
    if (document.querySelector(`input[id='${arr2[questionNum]}']`) != null) {
      document.querySelector(`input[id='${arr2[questionNum]}']`).checked = true;
      arr2.splice(questionNum, 1);
    }
    if(questionNum = questions.length - 1) {
      // Next.disabled = true;
      Next.classList.remove("btnShow");
      Next.classList.add("btndis");
    }
  }
}
brev.onclick = () => {

  Next.classList.add("btnShow");
 
  if (questionNum > 0) {
    if (document.querySelector("input:checked") != null && questionNum != questions.length - 1) {
      arr2.splice(questionNum, 0, document.querySelector("input:checked").id);
    }
    questionNum--;
    displayQuetions(arr[questionNum]);
    document.querySelector(`input[id='${arr2[questionNum]}']`).checked = true;
    arr2.splice(questionNum, 1);
  }

}
// timer func
function timer() {
  stopWatch.innerText = "02:00";
  seconds = 0;
  minutes = 2;
  timerID = setInterval(function () {
    if (seconds == 0) {
      seconds = 59;
      minutes--;
    } else seconds--;

    if (seconds > 9) {
      stopWatch.innerText = "0" + minutes + " : " + seconds; //00:00
    } else {
      stopWatch.innerText = "0" + minutes + " : " + "0" + seconds; //00:00
    }
  }, 1000);
  setTimeout(function () {
    clearInterval(timerID);
    Result();
  }, 60 * 2 * 1000);
}
//push randome number
(function () {
  for (var i = 0; i < questions.length; i++) {
    do {
      var randomQuestion = Math.floor(Math.random() * questions.length);
    } while (existingQuestions());
    arr.push(randomQuestion);
  }
  function existingQuestions() {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === randomQuestion) {
        return true;
      }
    }
    return false;
  }
})();
////////////////////////////////fu
function displayQuetions(index) {
  const que_text = document.querySelector(".questionTile");
  let que_tag =
    "<span class='tilte'>" +
    questions[index].question +
    "</span>";
  let option_tag = `<label class="option" for = "${questions[index].options[0]}"> <input type ="radio" id = "${questions[index].options[0]}" name="option" class="quetion-selected" value=${questions[index].options[0]}/> ${questions[index].options[0]}</label><br>
     <label class="option" for = "${questions[index].options[1]}"> <input type ="radio" id = "${questions[index].options[1]}" name="option" class="quetion-selected" value=${questions[index].options[1]}/> ${questions[index].options[1]}</label><br>
     <label class="option" for = "${questions[index].options[2]}"> <input type ="radio" id = "${questions[index].options[2]}" name="option" class="quetion-selected" value=${questions[index].options[2]}/> ${questions[index].options[2]}</label><br>
     <label class="option" for = "${questions[index].options[3]}"> <input type ="radio" id = "${questions[index].options[3]}" name="option" class="quetion-selected" value=${questions[index].options[3]}/> ${questions[index].options[3]}</label>`;
  que_text.innerHTML = que_tag; 
  option_list.innerHTML = option_tag; 

  const option = document.querySelectorAll(".option input");
  for (i = 0; i < option.length; i++) {
    option[i].addEventListener("input", (e) => {
      Next.classList.add("btnShow");
      
    });
  }
}
function Result() {
  let n = 0;
  for (let index = 0; index < arr2.length; index++) {
    if (arr2[index] == questions[arr[index]].answer) {
      userScore++;
    }
  }
  Question.classList.remove("show");
  resultform.classList.add("show");
  Name3.innerHTML = Name.innerHTML;
  if (userScore > 2)
    score.style.color = "lightgreen";
  else
    score.style.color = "red";
  score.innerText = `You got ${userScore} out of ${questions.length}`;
}
