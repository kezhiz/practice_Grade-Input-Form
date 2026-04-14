const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//getContext() method會回傳一個canvas的drawing context 繪畫環境
//drawing context 可以在canvas畫圖

const unit = 20; //蛇一單位長度
const row = canvas.height / unit; //320/20=16
const column = canvas.width / unit; //320/20=16

let snake = []; //array中每個元素都是一個物件
function creatSnake() {
  //蛇出現在左上角
  //物件的作用是儲存身體x,y座標
  snake[0] = {
    x: 80,
    y: 0,
  };

  snake[1] = {
    x: 60,
    y: 0,
  };

  snake[2] = {
    x: 40,
    y: 0,
  };

  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, unit, unit);
  }
  //選定隨機座標
  pickALocation() {
    let overlapping = false;
    let new_x;
    let new_y;

    function checkOverLap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          console.log("overlapping...");
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      } //隨機x座標=蛇的座標x && 隨機y座標=蛇的座標y
    }
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverLap(new_x, new_y);
    } while (overlapping); //是true的時候要持續do

    this.x = new_x;
    this.y = new_y;
  }
}
//初始設定
creatSnake();
let myFruit = new Fruit();
window.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
  if (e.key == "ArrowRight" && d != "Left") {
    //d的值不能等於他的對面方向
    d = "Right";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  } else if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  }

  //每次按下上下左右鍵,在下一幀被畫出來之前,
  //不接受任何keydown
  //防止連續按鍵導致蛇在邏輯上自殺
  window.removeEventListener("keydown", changeDirection);
}

let highestScore;
loadHighestScore();
let score = 0;
document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;

function draw() {
  //每次畫圖之前,確認蛇有沒有咬到自己
  for (
    let i = 1;
    i < snake.length;
    i++ //0是頭的位置
  ) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame);
      alert("遊戲結束");
      return;
    }
  }

  //每一次畫之前都要先填滿畫布,不然會有殘留
  ctx.fillStyle = "rgb(1, 0, 12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  myFruit.drawFruit();

  //畫出蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else ctx.fillStyle = "lightblue";
    ctx.strokeStyle = "white";

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }

    //x,y,width,height
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit); //線條
  }

  //以d變數方向,決定蛇下一幀要放在哪個座標
  let snakeX = snake[0].x; //snake[0]是物件,snake[0].x是number
  let snakeY = snake[0].y;

  if (d == "Left") {
    snakeX -= unit; //往左x座標減一單位
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Right") {
    snakeX += unit;
  } else if (d == "Down") {
    snakeY += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //確認蛇是否吃到果實
  //x,y重疊時
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    //重新選定果實隨機位置
    myFruit.pickALocation();
    score++;
    setHighestScore(score); //判斷需不需要更新
    document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
    document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
  //畫出頭之後再讓他能讀取keydown
  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100); //每0.1s執行

function loadHighestScore() {
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore")); //拿出來的是string
  }
}

function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
