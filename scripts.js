let btncheck = document.getElementById("guessclick");
let btnstartover = document.getElementById("restart");
let btnnextround = document.getElementById("nextround");
let ranNum = Math.floor(Math.random() * 101);
let remains = 10;
let time = 0;
let historyinput = new Array(10);
let lastGuessNum;
let score = 0;
let totalscore =0; 
let round = 0;
let timer = 30; 
let finishtime; 
let lastroundtime; 
let longTimerId;
let scorearray =[]; 
let timerId  
timeout();
function show() {
  
  let guessNum = document.getElementById("inputnum").value;

  document.getElementById("repeat").innerHTML = "";

  if (remains == 0) {
    document.getElementById("gameover").innerHTML = `Game Over`;
    document.getElementById("remain").innerHTML = "";
  }
  else {
    if (isNaN(parseInt(guessNum)) || guessNum == '') { document.getElementById("repeat").innerHTML = `Please enter a number!!!`; }
    else {
      if (lastGuessNum == guessNum) { document.getElementById("repeat").innerHTML = `You've already guessed that number!!!`; }
      else {
        if (guessNum > ranNum) {
          remains--;
          lastGuessNum = guessNum;
          document.getElementById("inputnum").value = "";
          document.getElementById("remain").innerHTML = remains;
          event.preventDefault();
          document.getElementById("result").innerHTML += `Your Guessing Number is ${guessNum}. The Random Number is ${ranNum} .Too High!!! <br>`;
        }
        else {
          if (guessNum < ranNum) {
            remains--;
            lastGuessNum = guessNum;
            document.getElementById("remain").innerHTML = remains;
            document.getElementById("inputnum").value = "";
            event.preventDefault();
            document.getElementById("result").innerHTML += `Your Guessing Number is ${guessNum}. The Random Number is ${ranNum} .Too Low!!! <br>`;

          }
          else {
            finishtime= 30 - timer; 
            remains--;
            lastGuessNum = guessNum;
            document.getElementById("remain").innerHTML = remains;
            document.getElementById('result').classList.add('alert-success');
            document.getElementById("inputnum").value = "";
            event.preventDefault();
            document.getElementById("result").innerHTML += `Your Guessing Number is ${guessNum}. The Random Number is ${ranNum}.Correct! You've guessed the correct number in ${finishtime} You are the winner! <br>`;
            if (finishtime >=15)
            { document.getElementById("gameover").innerHTML = `Congratulations!!! You won! You've got 50 points in ${finishtime} seconds`; 
              score= 50; 
             totalscore = totalscore+ score;
             scorearray.push([score,finishtime]); 
             }
            else
            {document.getElementById("gameover").innerHTML = `Congratulations!!! You won! You've got 100 points!`;
             score= 100; 
             totalscore = totalscore+ score; 
             scorearray.push([score,finishtime]);
            }
            
            document.getElementById("timer").innerHTML="0"; 
            clearTimeout(longTimerId);
            
             

          }

        }
      }
    }
  }
}
function reload1() { window.location.reload(); }
function nextround() 

{
   rankscore(); 
   timer=30; 
   timeout();
  round++;
  if (document.getElementById("result").innerHTML == "")
  { scorearray.push([0,timer])  }
  else{
  remains = 10;
  ranNum = Math.floor(Math.random() * 101); 
  document.getElementById("inputnum").innerHTML ="";
  document.getElementById("score").innerHTML += `<p> Round ${round}: You've got ${score} points in ${finishtime} seconds</p>`; 
  document.getElementById("result").innerHTML = "";
  document.getElementById('result').classList.remove('alert-success');
  document.getElementById("remain").innerHTML = "";
  document.getElementById("gameover").innerHTML = "";
  btncheck.removeAttribute('disabled', 'disabled'); 

  score= 0; 
  totalscore = totalscore+ score;
} 
}

function countdown()
{ timer--; 
  document.getElementById("timer").innerHTML=""; 
  document.getElementById("timer").innerHTML= timer; 
}
function outoftime()
{
  clearTimeout(longTimerId);
  document.getElementById("gameover").innerHTML='Time is over! GAME OVER! <p> Play next round, click "Next Round" button</p>';  
  btncheck.setAttribute('disabled', 'disabled'); 
  finishtime=30; 
  score=0; 
  scorearray.push([score,finishtime]);

}
function timeout()
{ 
  console.log(longTimerId)
  clearTimeout(longTimerId);
  clearInterval(timerId)
  timerId = setInterval(() => countdown(), 1000);
longTimerId = setTimeout(() => { clearInterval(timerId); outoftime() ; }, 30000);
}

function rankscore()
{ 
  // scorearray = scorearray.sort(); 
  // a.sort((a, b) => a[1].localeCompare(b[1]));
  let sortedArray = scorearray.sort(
    function(a, b) {
      // a[0] is score
      // a[1] is time 
      if(a[0] > b[0]) {
        return -1;
      }
      if(b[0] > a[0]) {
        return 1;
      }
      if(a[1] < b[1]) {
        return -1;
      }
      if(b[1] < a[1]) {
        return 1;
      }
      return 0;
    } 
  )
  document.getElementById("highestscore").innerHTML= sortedArray; 

 }

btncheck.addEventListener("click", show);
btnstartover.addEventListener("click", reload1);
btnnextround.addEventListener("click", nextround);





