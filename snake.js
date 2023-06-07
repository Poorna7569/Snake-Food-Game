let inputdir={x:0,y:0};
let foodsound=new Audio('food.mp3');
let gameoversound=new Audio('gameover.mp3');
let movesound=new Audio('move.mp3');
let musicsound=new Audio('music.mp3');
let speed=5;
let score=0;
let lasttime=0;
let snakearr=[
    {x:13,y:15}
]
food={x:6,y:7}


        

function main(ctime) {
    window.requestAnimationFrame(main);
    
    if ((ctime-lasttime)/1000<1/speed) {
        return;
        
    }
    lasttime=ctime;
    gameengine();
} 

function iscollide(snake){

        for (let i = 1; i < snakearr.length; i++) {
            if (snake[i].x===snake[0].x&& snake[i].y===snake[0].y) {
                return true;
                
            }
        }
            if(snake[0].x>=18 ||snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0){
                return true;
            }
            
            
        
        return false;

}

function gameengine() {
    if (iscollide(snakearr)) {
        
        gameoversound.play();
        musicsound.pause();
        inputdir={x:0,y:0};
        alert("Game Over");
        snakearr=[{x:13,y:15}];
        musicsound.play();
        score=0;
        
    }
    if (snakearr[0].y=== food.y&&snakearr[0].x=== food.x) {
        foodsound.play();
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("High Score",JSON.stringify(highscoreval));
            highscorebox.innerHTML="High Score:"+ highscoreval;
        }
        scorebox.innerHTML="Score: "+score;
        snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y});
        food={x:Math.floor(Math.random() * 16) + 2,y:Math.floor(Math.random() * 16) + 2}

        
    }
    for (let i = snakearr.length-2; i >=0; i--) {
        
        snakearr[i+1]={...snakearr[i]};
        
    }
    snakearr[0].x+=inputdir.x;
    snakearr[0].y+=inputdir.y;

    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeelement=document.createElement('div');
        snakeelement.style.gridRowStart=e.y;
        snakeelement.style.gridColumnStart=e.x;
        
        if (index==0) {
            snakeelement.classList.add('head');
            
        }else{
        snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
        
    });
    foodelement=document.createElement('div');
        foodelement.style.gridRowStart=food.y;
        foodelement.style.gridColumnStart=food.x;
        foodelement.classList.add('food');
        board.appendChild(foodelement);
}


let highscore=localStorage.getItem("highscore")
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval=JSON.parse(highscore);
    highscorebox.innerHTML="High Score: "+ highscore ;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir = {x: 0, y: 1} 
    musicsound.play();
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }

});