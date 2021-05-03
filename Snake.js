/**Things to add */
// 1-store the highest score in a file 
// 2-high score message 
// 3-add the main nemu (play,chose skin,mute)
// enter your name before playing
// show the best 3 players 
//have mutliple kinds of food that change the GROWTH_RATE
//add the option that the snake can pass into the wall
const gameBoard=document.getElementById('game_board');

const GRID_SIZE=25;
gameBoard.style.setProperty('grid-template-columns','repeat('+GRID_SIZE+', 1fr)');
gameBoard.style.setProperty('grid-template-rows', 'repeat('+GRID_SIZE+', 1fr)');






/**SNAKE BODY PART */
let SNAKE_SPEED =10;
let GROWTH_RATE=1;
let GROW =false;
const snakeBody = [{x:10,y:3},{x:10,y:2},{x:10,y:1},{x:11,y:1},{x:10,y:1}];
const food={x:10,y:15}; 

function draw(snakeBody,game_board){
    gameBoard.innerHTML='';

    for (let i=0;i<snakeBody.length;i++){
        const oneBlock= document.createElement('div');
        oneBlock.style.gridRowStart=snakeBody[i].y;
        oneBlock.style.gridColumnStart=snakeBody[i].x;
        oneBlock.classList.add('snake');
        gameBoard.appendChild(oneBlock);
    }
    
}

function update(snakeBody,game_board){
    //check the snake has moved
    if((direction.x!=0)||(direction.y!=0)){
        const lastX=snakeBody[snakeBody.length-1].x;
        const lastY=snakeBody[snakeBody.length-1].y;
        for (let i=snakeBody.length-1;i>=1;i--){

            snakeBody[i].x=snakeBody[i-1].x;
            snakeBody[i].y=snakeBody[i-1].y;
        }
        if(GROW){
            for (let i=0;i<GROWTH_RATE;i++){

                let newBlock={x:lastX,y:lastY};
                snakeBody.push(newBlock);
                GROW=false;
                // console.log("UPDATE GROW");
                // console.log("New length",snakeBody.length);
            }
        }
        snakeBody[0].x += direction.x;
        snakeBody[0].y += direction.y;
    }
    
}


function onSnake(position,theBody){
    for(let i=0;i<theBody.length;i++){
        if((theBody[i].x==position.x) && (theBody[i].y==position.y)){
            console.log("lasga"); 
            return true;
        }
    }
    return false;
}


// function growSnake(){
//     let newBlock={x:0,y:0};
//     newBlock.x=snakeBody[snakeBody.length-1].x;
//     newBlock.y=snakeBody[snakeBody.length-1].y;
//     snakeBody.push(newBlock);
// }


/**SNAKE FOOD PART */
// function drawFood1(){
//     food.x=Math.floor(Math.random()*GRID_SIZE+1);
//     food.y=Math.floor(Math.random()*GRID_SIZE+1);
//     const theFood= document.createElement('div');
//     theFood.style.gridRowStart=food.y;
//     theFood.style.gridColumnStart=food.x;
//     theFood.classList.add('food');
//     gameBoard.appendChild(theFood);

// }
function generateNewFood(){
    do{
        food.x=Math.floor(Math.random()*GRID_SIZE+1);
        food.y=Math.floor(Math.random()*GRID_SIZE+1);
    }

  
    while(onSnake(food,snakeBody));
}

function drawFood(){
    const theFood= document.createElement('div')
    theFood.style.gridRowStart=food.y
    theFood.style.gridColumnStart=food.x
    theFood.classList.add('food')
    gameBoard.appendChild(theFood)
}

/**GETTING INPUT KEY */

let direction={x:0,y:0};
let lastDirection={x:0,y:0};
window.addEventListener('keydown',e=>{
    
    switch(e.key){
        case 'ArrowUp':
            if(lastDirection.y!=0) {break;}
            direction={x:0,y:-1};
            break;
        case 'ArrowDown':
            if(lastDirection.y!=0) {break;}
            direction={x:0,y:1};
            break;
        case 'ArrowRight':
            if(lastDirection.x!=0) {break;}
            direction={x:1,y:0};
            break;
        case 'ArrowLeft':
            if(lastDirection.x!=0) {break;}
            direction={x:-1,y:0};
            break;
        case ' ':
            stop();
            // console.log("stop/start");
            break;
    
            }
    lastDirection=direction;
        })


/**THE CONTROL   this function  generate a new food*/
function control(){
    // console.log("control");
    const x=snakeBody[0].x;
    const y=snakeBody[0].y;
    // console.log(x,y);
    // console.log(food.x,food.y);
    //check if the food has been eaten
    if( ((food.x - x)%GRID_SIZE==0) && ((food.y - y)%GRID_SIZE==0 ) ){
        // console.log('EEEEEEEAAAAAAATTTTTTT');
        SNAKE_SPEED+=1;
        stop(); stop();
        GROW=true;
        draw(snakeBody,game_board); 
        generateNewFood();
    }
    //check if the snake hitted the wall or if the snake eated him self
    if(hittedTheWall()||eatedHimSelf()){
        displayLoseMessage();
    }
    

}

function eatedHimSelf(){
    let position = snakeBody[0];
    let theBody = snakeBody.slice(1);
    return onSnake(position,theBody);
    
}


function hittedTheWall(){
    let head = snakeBody[0];
    if ( (head.x>GRID_SIZE)||(head.x<1)||(head.y>GRID_SIZE)||(head.y<1) ){
        return true;
    }
    return false;
}

function displayLoseMessage(){
    stop();
    console.log("🐍You losed!!!🐍 \n🎮Play again ?🎮");
    const choise=confirm("🐍 Your score is: "+snakeBody.length+" 🐍\n\n🎮Play again ?🎮");
    if(choise){location.reload();}
    
    
}



/**THE MAIN */ 

// let lastRenderTime=0
// function main(currentTime){
//     const secondsSinceLastRender = (currentTime-lastRenderTime)/1000
//     window.requestAnimationFrame(main)
    
//     if (secondsSinceLastRender<1/SNAKE_SPEED) return
//     lastRenderTime=currentTime
//     console.log(snakeBody);
//     console.log(direction) ;
//     draw(snakeBody,game_board) ;
//     update(snakeBody,game_board);
    
//     //control();
     
    
// }


// window.requestAnimationFrame(main)
// drawFood(food,gameBoard);



// let i=0

let isWorking = true;
alert("🟢Press SPACE to start the game🟢 ");
setTimeout(() => {stop();}, 1000);


function main(){
    // console.log(i++); 
    // ecrireSnake();
    update(snakeBody,game_board);
    // ecrireSnake();
    draw(snakeBody,game_board);
    drawFood();
    control();
}
//The Game Loop
let execution=setInterval(main,2000/SNAKE_SPEED);


function ecrireSnake(){
    console.log('/***D**/');
    snakeBody.forEach(element => {
        console.log(element.x," ",element.y);
    }); 
    console.log('/***F   **/');
}



// let isWorking = true;
// const btn = document.getElementById('btn');
// btn.addEventListener("click",stop);
function stop(){
    if(isWorking){
        clearInterval(execution);
    }
    else{
        execution=setInterval(main,2000/SNAKE_SPEED);
    }
    isWorking= !isWorking
    // console.log("Working==",isWorking);
}


// window.addEventListener('keydown',e=>{
//     if(e.key === 'p'){
//         stop();
//         }
//         })
