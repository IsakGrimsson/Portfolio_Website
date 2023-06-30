var unitSize;
var mazeArray;
var gameState;
var answers;
var enemies;
var character;
var colorPallet;

function preload() 
{ //This function loads the different fonts used in the game
    menuFont = loadFont('assets/menuFont.ttf');
    gameFont = loadFont('assets/gameFont.ttf');
    deathFont = loadFont('assets/deathFont.ttf');
}

function setup()
{  //initializes variables that aren't tied to levels, and the starts the game
    let canvas = createCanvas(700, 500);
    canvas.parent("game-container");
    window.addEventListener("keydown", disableSpacebarShortcut);
    unitSize = 25;
    //The levels in the game
    mazeArray = [
                    [[20,0,7,1],[20,19,7,1],[27,0,1,20],[0,0,20,1],[0,0,1,20],[19,0,1,20],[0,19,20,1],[1,3,4,1],[7,1,1,4],[16,1,1,4],[4,7,4,1],[12,4,1,4],[15,7,4,1],[1,12,4,1],[7,12,1,4],[12,12,4,1],[3,15,1,4],[12,15,1,4],[15,16,4,1]],
    
                    [[20,0,7,1],[20,19,7,1],[27,0,1,20],[0,0,20,1],[0,0,1,20],[19,0,1,20],[0,19,20,1],[6,1,1,3],[13,1,1,3],[11,4,2,2],[1,6,3,1],[16,6,3,1],[7,7,2,2],[14,9,2,2],[3,13,3,1],[16,13,3,1],[9,14,2,2],[6,16,1,3],[13,16,1,3]],
    
                    [[20,0,7,1],[20,19,7,1],[27,0,1,20],[0,0,20,1],[0,0,1,20],[19,0,1,20],[0,19,20,1],[5,1,1,2],[14,1,1,2],[8,3,1,2],[11,3,1,5],[1,5,2,1],[5,5,1,1],[14,5,1,1],[17,5,2,1],[3,8,6,1],[11,8,2,1],[15,8,2,1],[3,11,2,1],[7,11,2,1],[11,11,6,1],[1,14,2,1],[5,14,1,1],[14,14,1,1],[17,14,2,1],[5,17,1,2],[8,12,1,5],[11,15,1,2],[14,17,1,2]],
    
                    [[20,0,7,1],[20,19,7,1],[27,0,1,20],[0,0,20,1],[0,0,1,20],[19,0,1,20],[0,19,20,1],[4,3,5,1],[3,3,1,3],[1,8,5,1],[14,3,3,1],[16,4,1,5],[11,1,1,5],[8,6,1,3],[11,8,3,1],[6,11,3,1],[11,11,1,3],[14,11,5,1],[3,11,1,5],[3,16,3,1],[8,14,1,5],[11,16,5,1],[16,14,1,3]],         
    
                    [[20,0,7,1],[20,19,7,1],[27,0,1,20],[0,0,20,1],[0,0,1,20],[19,0,1,20],[0,19,20,1],[3,1,1,2],[9,1,1,2],[16,1,1,2],[6,3,7,1],[6,3,1,3],[13,3,1,4],[1,5,3,1],[3,6,1,2],[9,6,2,2],[13,9,4,1],[16,5,1,4],[17,5,2,1],[6,8,1,2],[3,10,6,1],[13,12,6,1],[1,16,3,1],[3,13,1,3],[6,14,1,5],[6,13,5,1],[13,15,1,2],[9,16,4,1],[11,17,1,2],[16,15,1,4]]
                  ];
    //A database for the colorRNG function, with most white and black colors removed
    colorPallet = ['MediumVioletRed','DeepPink','PaleVioletRed','HotPink','LightPink','Pink,DarkRed','Firebrick','Crimson','IndianRed','LightCoral','Salmon','DarkSalmon','LightSalmon','OrangeRed','Tomato','DarkOrange','Coral','Orange','DarkKhaki','Gold','Khaki','PeachPuff','Yellow','PaleGoldenrod','Moccasin','PapayaWhip','LightGoldenrodYellow','LemonChiffon','LightYellow','Maroon','Brown','SaddleBrown','Sienna','Chocolate','DarkGoldenrod','Peru','RosyBrown','Goldenrod','SandyBrown','Tan','Burlywood','Wheat','NavajoWhite','Bisque','BlanchedAlmond','Cornsilk','DarkGreen','Green','DarkOliveGreen','ForestGreen','SeaGreen','Olive','OliveDrab','MediumSeaGreen','LimeGreen','Lime','SpringGreen','MediumSpringGreen','DarkSeaGreen','MediumAquamarine','YellowGreen','LawnGreen','Chartreuse','LightGreen','GreenYellow','PaleGreen','Teal','DarkCyan','LightSeaGreen','CadetBlue','DarkTurquoise','MediumTurquoise','Turquoise','Aqua','Cyan','Aquamarine','PaleTurquoise','LightCyan','Navy','DarkBlue','MediumBlue','MidnightBlue','RoyalBlue','SteelBlue','DodgerBlue','DeepSkyBlue','CornflowerBlue','SkyBlue','LightSkyBlue','LightSteelBlue','LightBlue','PowderBlue','Indigo','Purple','DarkMagenta','DarkViolet','DarkSlateBlue','BlueViolet','DarkOrchid','Fuchsia','Magenta','SlateBlue','MediumSlateBlue','MediumOrchid','MediumPurple','Orchid','Violet','Plum','Thistle','Lavender','MistyRose','DarkSlateGray','DimGray','SlateGray','Gray','LightSlateGray','DarkGray','Silver'];
    //Initializes various gameStates  
    gameState = { lives:3, livesPrevious:3, level:1, menuTimer:0, playerReady:false, victoryScreen:false,deathScreen:false,levelScreen:false,permaDeath:false};
    colorRNG(); //randomly assigns color to the mazeArray
    startGame(); //Initialize the 1st level
}

function draw()
{    
    drawBackground(); // Draws a background meant to look like a math exercise book
    if(gameState.permadeath == true)
    { //Displays a Game Lost Screen Message if you run out of lives
        drawPermaDeath();
    }
    else if(gameState.victoryScreen == true)
    { //displays a victory message and ends your playthrough if you win 5 levels
        drawVictoryScreen();
    }
    else if(gameState.deathScreen == true)
    { //Draws a death screen if you die and have more than 1 life
        drawdeathScreen();
    }
    else if(gameState.levelScreen == true)
    { //Draws a level complete screen if you win a level
        drawLevelScreen();
    }
    else if(gameState.playerReady == true)
    { // The main gameplay loop
        drawMaze();         //draws the current lvl from mazeArray   
        drawCharacter();    //draws the player Character
        drawEnemies();      //draws the enemies
        enemiesAI();        //controls the enemies movement
        distanceCheck();    //Checks the distance between characters and enemies or answers
        directionCheck();   //Controls the movement of the Player Character
        livesCheck();       //Checks to see if you have lost a life
        drawSideMenu();     //Draws the SideMenu 
        drawAnswers();      //Draws the answers to the screen
        checkStopWatch();   //Checks to see if you still have time left
    }
    else 
    { //Draws the MainMenu Screen of the game that is displayed upon startup/refresh
        drawMainMenu();
        drawMenuPopup();
    }
}

function startGame()
{ //Itializes variable for the start of every level, Runs at the starts of every level
    
    character = {x:250, y:250, isUp:false, isDown:false, isLeft: false, isRight: false, timeLeft:60 };
    
    //sets the character at the right position for the Mainmenu
    if(gameState.playerReady == false)
    {
        character.y = height+13.5;
        character.x = width+300;
    }
    
    answers = [
        { x: 450, y: 50, nr: 0, correct: false},
        { x: 50, y: 450, nr: 0, correct: false},
        { x: 450, y: 450, nr: 0, correct: false},
        { x: 50, y: 50, nr: 0, correct: false}
    ];
    
    assignAnswers(); //Creates and Assigns new answers
    
    enemies = [{x:450,y:50,isUp:false,isDown:true,isLeft:false,isRight:false},
               {x:50,y:450,isUp:false,isDown:true,isLeft:false,isRight:false},
               {x:450,y:450,isUp:true,isDown:false,isLeft:false,isRight:false},
               {x:50,y:50,isUp:true,isDown:false,isLeft:false,isRight:false}];
    
}

function answerBinary(answerDecimal,lvl)
{ //converts a decimal number to a Binary string
    var n = 2 + 2*lvl;
    var remainder;
    var answerString = "";
    for(i=0;i<n;i++)
    {
        remainder = answerDecimal%2;
        answerDecimal = floor(answerDecimal/2);
        if(remainder == 0)
        {
            answerString = "0" + answerString;
        }
        else
        {
            answerString = "1" + answerString;
        }
    }
    return answerString;
}

function assignAnswers()
{   //Creates and assigns new answers
    //answerRNG() returns a number value, with a size based on: what lvl the player is on
    
    //Creates the correct answer
    var answerSlot = floor(random(0,4));
    answers[answerSlot].nr = answerRNG(gameState.level);
    answers[answerSlot].correct = true;
    
    
    //Creates the wrong answers
    for(i=0;i<4;i++)
    {
        //Create a variable to subtract/add from the correct answer
        var plusMinus = answerRNG(gameState.level-1);
        if(i<answerSlot)
        {
            answers[i].nr = answers[answerSlot].nr-plusMinus;
        }
        else if(i>answerSlot)
        {   
            answers[i].nr = answers[answerSlot].nr+plusMinus;
        }
    }
}

function answerRNG(lvl)
{//answerRNG() returns a number value, with a size based on: what lvl the player is on
    var answer;
    if(lvl==0)
    {
        answer = floor(random(1,8));
    }
    else if(lvl==1)
    {
        answer = floor(random(8,16));
    }
    else if(lvl==2)
    {
        answer = floor(random(16,64));
    }
    else if(lvl==3)
    {
        answer = floor(random(64,256));
    }
    else if(lvl==4)
    {
        answer = floor(random(256,1024));
    }
    else
    {
        answer = floor(random(1024,4096));
    }
    return answer;
}

function drawAnswers()
{   //Draws the answers to the screen
    textFont(gameFont);
    strokeWeight(2);
    textSize(24);
    stroke('white');
    fill('Black');   
    var tempString = '';
    
    //Answer numbers
    for(i=0;i<4;i++)
    {
        tempString = answers[i].nr;
        text(tempString,answers[i].x-20,answers[i].y+8);
    }
    
    //Answer Boxes
    stroke('grey');
    noFill();   
    rect(answers[0].x-20,answers[0].y-20,40,40);
    rect(answers[1].x-20,answers[1].y-20,40,40);
    rect(answers[2].x-20,answers[2].y-20,40,40);
    rect(answers[3].x-20,answers[3].y-20,40,40);
}

function drawPermaDeath()
{//Displays a Game Lost Screen Message if you run out of lives
    textFont(deathFont);
    
    strokeWeight(8);
    textSize(42);
    stroke('Black');
    fill('Firebrick');
    text('Your Final Grade Is:',80,200);
    textSize(64);
    if(gameState.level == 5)
    {
        console.log("B");
        text('B',300,300);  
    }
    else if(gameState.level == 4)
    {
        console.log("C+");
        text('C+',300,300);  
    }
    else if(gameState.level == 3)
    {
        console.log("C-");
        text('C-',300,300);  
    }
    else if(gameState.level == 2)
    {
        console.log("D");
        text('D',300,300);  
    }
    else if(gameState.level == 1)
    {
        console.log("F");
        text('F',300,300);  
    }
    strokeWeight(2);
    textSize(24);
    text('Better luck next time',175,400);
    text('Press Spacebar to Continue',125,450);
}

function drawVictoryScreen()
{//displays a victory message and ends your playthrough if you win 5 levels
    textFont(gameFont);
    
    strokeWeight(8);
    textSize(48);
    stroke('Black');
    fill('DeepSkyBlue');
    text('You aced Binary Math!',80,200);
    textSize(64)
    text('A+',300,300);
    strokeWeight(2);
    textSize(24);
    text('Press Spacebar to Continue',175,400);
}

function drawLevelScreen()
{//displays a level complete message when you complete a level
    textFont(gameFont);
    
    strokeWeight(4);
    textSize(48);
    stroke('Black');
    fill('DeepSkyBlue');
    text('Level Complete',width/2-200,height/2-75);
    strokeWeight(2);
    textSize(24);
    text('Press Spacebar to Continue',width/2-200,height/2+75);
}

function drawdeathScreen()
{//Draws a death screen if you die and have more than 1 life
    textFont(deathFont);
    
    strokeWeight(4);
    textSize(48);
    stroke('Black');
    fill('Firebrick');
    text('You died.',width/2-200,height/2-75);
    strokeWeight(2);
    textSize(24);
    text('Press Spacebar to Continue',width/2-200,height/2+75);
    
}

function drawMenuPopup()
{   //Draws the GameCharacter and popup text ontop of the MainMenu
    textFont(gameFont);
    console.log(gameState.menuTimer);
    gameState.menuTimer +=1;
    
    if(gameState.menuTimer <= 120)
	{   //Sends the character across the screen at the start of the menu
        character.x -= 7.75;
        strokeWeight(3);
        textSize(32);
        stroke('Black');
        fill('DeepSkyBlue');
        text('Aaaahh!',character.x,400);
        
        //Draw character going left 
        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-24,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-14, character.y-24);
        curveVertex(character.x-14, character.y-24);
        curveVertex(character.x-11, character.y-19);
        curveVertex(character.x+1, character.y-19);
        curveVertex(character.x+4, character.y-24);
        curveVertex(character.x+4, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-11, character.y-24);
        curveVertex(character.x-11, character.y-24);
        curveVertex(character.x-11, character.y-22);
        curveVertex(character.x-8, character.y-21);
        curveVertex(character.x-6, character.y-22);
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-22);
        curveVertex(character.x-2, character.y-21);
        curveVertex(character.x-4, character.y-22);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-4, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+4, character.y-24.5,character.x-14, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-13,character.y-50,5,9);
        ellipse(character.x+22,character.y-50,5,9);
        line(character.x-16,character.y-48,character.x-19,character.y-40);
        line(character.x+20,character.y-48,character.x+19,character.y-40);
	}	 
    else
    {//stops the character and creates more text
        strokeWeight(3);
        textSize(32);
        stroke('Black');
        fill('DeepSkyBlue');
        text('Aaaahh! This is so boring',character.x,400); 
        text('Click "SPACEBAR" to come with me',12.5,440);
        //Draw the character standing still
        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-19,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-9, character.y-24);
        curveVertex(character.x-9, character.y-24);
        curveVertex(character.x-6, character.y-19);
        curveVertex(character.x+6, character.y-19);
        curveVertex(character.x+9, character.y-24);
        curveVertex(character.x+9, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-22);
        curveVertex(character.x-3, character.y-21);
        curveVertex(character.x-1, character.y-22);
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-22);
        curveVertex(character.x+3, character.y-21);
        curveVertex(character.x+1, character.y-22);
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+9, character.y-24.5,character.x-9, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-13,character.y-50,5,9);
        ellipse(character.x+13,character.y-50,5,9);
        line(character.x-16,character.y-48,character.x-19,character.y-40);
        line(character.x+16,character.y-48,character.x+19,character.y-40);
    }
    if(gameState.menuTimer >= 150)
    {//Game instructions displayed on the screen
        strokeWeight(3);
        textSize(32);
        stroke('Black');
        fill('DeepSkyBlue');
        
        text(' All you need to do is convert the number\n on the right side of your screen from\n binary to the correct decimal number\n before the time runs outs',12.5,80);       
    }
    if(gameState.menuTimer >= 200)
    {//More game instructions
        text(' Oh and stay away from any complicated\n math symbols',12.5,250);       
    }
    if(gameState.menuTimer >= 230)
    {//More game instructions
        text(' Sounds easy right?',370,325);       
    }
    if(gameState.menuTimer >= 250)
    {//Prompt for the player to stop waiting for more text
        text('...',670,325);       
    } 
}

function drawMainMenu()
{//Draws the MainMenu Screen of the game that is displayed upon startup/refresh
    textFont(menuFont);
    stroke('white');
    fill('black');
    strokeWeight(4);
    textSize(64);
    text('Welcome to Binary Math',12.5,50);
    strokeWeight(2);
    textSize(32);
    //The if statements that follow are made to remove text, so the players can easily read drawMenuPopup()
    if(gameState.menuTimer <= 150)
    {
        text('Today we are going to learn how to convert \n numbers from binary into decimal and vice \n versa.',50,125);  
    }
    if(gameState.menuTimer <= 200)
    {
    text(' 0000 is 0    0100 is 4     1000 is 8    1100 is 12\n 0001 is 1',50,240);
    }
    text('0101 is 5     1001 is 9     1101 is 13',225,280);
    text(' 0010 is 2    0110 is 6',50,320);
    if(gameState.menuTimer <= 230)
    {
        text('1010 is 10    1110 is 14',390,320);   
    }
    text(' 0011 is 3    0111 is 7      1011 is 11    1111 is 15',50,360);
    text('Any questions?',490,400);
    
}

function drawSideMenu()
{   //Draws the Side Menu
    textFont(gameFont);
    strokeWeight(2);
    textSize(32);
    stroke('Black');
    fill('LimeGreen');
    text('Time left',513,275);  
    fill('red');
    text('Lives left', 513, 70);   
    fill('DeepSkyBlue');
    text('Level', 545,400);   
    strokeWeight(4);
    textSize(64);
    text(gameState.level+'/5', 537.5, 465);
    fill('red');
    text(gameState.lives, 572, 135);
    fill('LimeGreen');
    //Makes the timer shake when you have 10 seconds or less left
    if(character.timeLeft<11)
    {
        text(floor(character.timeLeft),552+random(-3,3),340+random(-3,3));
    }
    text(floor(character.timeLeft),552,340);  
    fill('yellow')
    textSize(32);
    strokeWeight(4);
    text('Convert:',523,190);
    textSize(24);
    strokeWeight(3);
    
    //Searches the answers array to find the correct answer, then converts it to binary with answerBinary() and displays it
    for(i=0;i<answers.length;i++)
    {
        if(answers[i].correct == true)
        {
            text(answerBinary(answers[i].nr,gameState.level),510,220);   
        }      
    }
    
}

function drawEnemies()
{   //draws the enemies
    noStroke();
    
    //Pi
    fill('red');
    beginShape();
    curveVertex(enemies[0].x-20,enemies[0].y-5);
    curveVertex(enemies[0].x-20,enemies[0].y-5);
    curveVertex(enemies[0].x-15,enemies[0].y-15);
    curveVertex(enemies[0].x+15,enemies[0].y-15);
    curveVertex(enemies[0].x+15,enemies[0].y-8);
    curveVertex(enemies[0].x+9,enemies[0].y-8);
    curveVertex(enemies[0].x+9,enemies[0].y+10);
    curveVertex(enemies[0].x+15,enemies[0].y+10);
    curveVertex(enemies[0].x+9,enemies[0].y+15);
    curveVertex(enemies[0].x+2,enemies[0].y+15); 
    curveVertex(enemies[0].x+2,enemies[0].y-8);
    curveVertex(enemies[0].x-3,enemies[0].y-8);
    curveVertex(enemies[0].x-3,enemies[0].y+15);
    curveVertex(enemies[0].x-15,enemies[0].y+15);    
    curveVertex(enemies[0].x-9,enemies[0].y+9); 
    curveVertex(enemies[0].x-10,enemies[0].y-8);
    curveVertex(enemies[0].x-15,enemies[0].y-8);
    curveVertex(enemies[0].x-20,enemies[0].y-5);
    curveVertex(enemies[0].x-20,enemies[0].y-5);
    endShape();
    
    //Sigma
    fill('green');
    beginShape();
    vertex(enemies[1].x-12, enemies[1].y+15);
    vertex(enemies[1].x+13, enemies[1].y+15);
    vertex(enemies[1].x+13, enemies[1].y+10);
    vertex(enemies[1].x-2, enemies[1].y+10);
    vertex(enemies[1].x+5, enemies[1].y);
    vertex(enemies[1].x-2, enemies[1].y-10);
    vertex(enemies[1].x+13, enemies[1].y-10);
    vertex(enemies[1].x+13, enemies[1].y-15);
    vertex(enemies[1].x-12, enemies[1].y-15);
    vertex(enemies[1].x-2, enemies[1].y);
    vertex(enemies[1].x-12, enemies[1].y+15);
    endShape();
    
    //Infinity
    fill('blue');
    ellipse(enemies[2].x-7.5,enemies[2].y,20,20);
    ellipse(enemies[2].x+7.5,enemies[2].y,20,20);
    ellipse(enemies[2].x-7.5,enemies[2].y,20,20)
    fill('white');
    ellipse(enemies[2].x-7.5,enemies[2].y,9,9);
    ellipse(enemies[2].x+7.5,enemies[2].y,9,9);
    
    //squareRoot
    fill ('DarkOrchid');
    beginShape();
    curveVertex(enemies[3].x-20, enemies[3].y);
    curveVertex(enemies[3].x-20, enemies[3].y);
    curveVertex(enemies[3].x-20, enemies[3].y-3);
    curveVertex(enemies[3].x-10, enemies[3].y-3);
    curveVertex(enemies[3].x-3, enemies[3].y+12);
    curveVertex(enemies[3].x+3, enemies[3].y-18);
    curveVertex(enemies[3].x+18, enemies[3].y-22);
    curveVertex(enemies[3].x+18, enemies[3].y-17);
    curveVertex(enemies[3].x+7, enemies[3].y-13);
    curveVertex(enemies[3].x-2, enemies[3].y+22);
    curveVertex(enemies[3].x-14, enemies[3].y+2);
    curveVertex(enemies[3].x-20, enemies[3].y+2);
    curveVertex(enemies[3].x-20, enemies[3].y);
    endShape();  
    
}

function enemiesAI()
{   //Controls the enemies movement, for the direction the enemy is heading in, checks if a wall is directly in front
    //IF SO, then it sends it in a new direction 20% backwards, 40% 40% to either side.
    
    for(j=0;j<4;j++)
    {
        if(enemies[j].isLeft==true)
        {
            enemies[j].x -= 1.25;
            for(i=0;i<mazeArray[gameState.level-1].length;i++)
            {
                if( (((unitSize*mazeArray[gameState.level-1][i][0]+unitSize*mazeArray[gameState.level-1][i][2])-enemies[j].x) >= -12.5)&&
                    (((unitSize*mazeArray[gameState.level-1][i][0])-enemies[j].x) <= 12.5)&&
                    ((enemies[j].y>=(unitSize*mazeArray[gameState.level-1][i][1]))&&
                    (enemies[j].y<=((unitSize*mazeArray[gameState.level-1][i][1])+(unitSize*mazeArray[gameState.level-1][i][3])))))
                {
                    enemies[j].isLeft = false;
                    var coinflip = floor(random(0,5));
                    if(coinflip < 2)
                    {
                        enemies[j].isUp = true;
                    }
                    else if(coinflip == 2)
                    {
                        enemies[j].isRight = true;
                    }
                    else
                    {
                        enemies[j].isDown = true;
                    }
                }
            }   
        }
        if(enemies[j].isRight==true)
        {
            enemies[j].x += 1.25;
            for(i=0;i<mazeArray[gameState.level-1].length;i++)
            {
                if( ((enemies[j].x-(unitSize*mazeArray[gameState.level-1][i][0])) >= -12.5)&&
                    ((enemies[j].x-(unitSize*mazeArray[gameState.level-1][i][0])) <= 12.5)&&
                    ((enemies[j].y>=(unitSize*mazeArray[gameState.level-1][i][1]))&&
                    (enemies[j].y<=((unitSize*mazeArray[gameState.level-1][i][1])+(unitSize*mazeArray[gameState.level-1][i][3])))))
                {
                   enemies[j].isRight = false;
                    var coinflip = floor(random(0,5));
                    if(coinflip == 0)
                    {
                        enemies[j].isLeft = true;
                    }
                    else if(coinflip==1||coinflip==2)
                    {
                        enemies[j].isUp = true;
                    }
                    else
                    {
                        enemies[j].isDown = true;
                    } 
                }
            }
        }
        if(enemies[j].isUp==true)
        {
            enemies[j].y -= 1.25;
            for(i=0;i<mazeArray[gameState.level-1].length;i++)
            {
                if( (((unitSize*mazeArray[gameState.level-1][i][1])-enemies[j].y)+unitSize*mazeArray[gameState.level-1][i][3] >= -12.5)&&
                    (((unitSize*mazeArray[gameState.level-1][i][1])-enemies[j].y)+unitSize*mazeArray[gameState.level-1][i][3] < 12.5)&&
                    ((enemies[j].x>=(unitSize*mazeArray[gameState.level-1][i][0])+5)&&
                    (enemies[j].x<=((unitSize*mazeArray[gameState.level-1][i][0])+5+(unitSize*mazeArray[gameState.level-1][i][2])))))
                {
                    enemies[j].isUp = false;
                    var coinflip = floor(random(0,5));
                    if(coinflip < 2)
                    {
                        enemies[j].isRight = true;
                    }
                    else if(coinflip < 4)
                    {
                        enemies[j].isLeft = true;
                    }
                    else
                    {
                        enemies[j].isDown = true;
                    }
                }
            }
        }
        if(enemies[j].isDown==true)
        {
            enemies[j].y += 1.25;
            for(i=0;i<mazeArray[gameState.level-1].length;i++)
            {
                if( ((enemies[j].y-(unitSize*mazeArray[gameState.level-1][i][1])) >= -12.5)&&
                    ((enemies[j].y-(unitSize*mazeArray[gameState.level-1][i][1])) <= 12.5)&&
                    ((enemies[j].x>=(unitSize*mazeArray[gameState.level-1][i][0])+5)&&
                    (enemies[j].x<=((unitSize*mazeArray[gameState.level-1][i][0])+5+(unitSize*mazeArray[gameState.level-1][i][2])))))
                {
                    enemies[j].isDown = false;
                    var coinflip = floor(random(0,5));
                    if(coinflip <2)
                    {
                        enemies[j].isRight = true;
                    }
                    else if(coinflip == 2)
                    {
                        enemies[j].isUp = true;
                    }
                    else
                    {
                        enemies[j].isLeft = true;
                    }
                }
        }
    }
    }
}

function distanceCheck()
{   //Checks the distance between characters and enemies or answers
    

    for(i=0;i<4;i++)
    {
        if(dist(character.x,character.y,enemies[i].x,enemies[i].y)<=24)
        {//Checks if the character is in range of an enemy, if he is the character loses a life
            gameState.lives -= 1;
            if(gameState.lives == 0)
            {
                gameState.permadeath = true;
            }
            else
            {
                gameState.deathScreen = true;
            }
        }
        if(dist(character.x,character.y,answers[i].x,answers[i].y)<=24)
        {//Checks if the character is in range of an answer, if he is we call checkAnswer()
            checkAnswer(i);
        }  
    }
}

function checkAnswer(i)
{   //Checks if your answer is correct or if you've run out of time
    if(answers[i].correct == true)
    {
        if(gameState.level == 5)
        {
            gameState.victoryScreen = true; 
        }
        else
        {
        gameState.level += 1;
        gameState.levelScreen = true;
        }
    }
    else
    {
        gameState.lives -= 1;
        if(gameState.lives == 0)
        {
            gameState.permadeath = true;
        }
        else
        {
            gameState.deathScreen = true;
        }
    }
} 

function livesCheck()
{   //Checks to see if you have lost a life
    if(gameState.lives != gameState.livesPrevious)
    {
        gameState.livesPrevious -= 1;
        startGame();
    }
}

function checkStopWatch()
{   //Checks to see if you still have time left
    if(character.timeLeft < 0)
    {
    gameState.lives = gameState.livesPrevious-1;
    gameState.deathScreen = true;
    }
    character.timeLeft -=0.0165;  //Reduces how much time you have left each frame to simulate something close to 60 seconds per level
}

function drawBackground()
{   //Draws a background meant to look like a mathsbook exercise background
    background(255,255,255);
    strokeWeight(1);
    stroke('Gainsboro');
    
    for(i=0;i<20;i++)
    {
        line(0,i*unitSize,width,i*unitSize);
    }
    for(i=0;i<30;i++)
    {
        line(i*unitSize,0,i*unitSize,height);
    }
    
    line(0,height-1,width,height-1);
    line(width-1,0,width-1,height);  
}

function drawMaze()
{//draws the current level from mazeArray  
    strokeWeight(3);
    fill(200,200,200);
    
    for(i=0;i<mazeArray[gameState.level-1].length;i++)
    {
        var temp = mazeArray[gameState.level-1][i][4];
        fill(colorPallet[temp]);
        rect(unitSize*mazeArray[gameState.level-1][i][0],
             unitSize*mazeArray[gameState.level-1][i][1],
             unitSize*mazeArray[gameState.level-1][i][2],
             unitSize*mazeArray[gameState.level-1][i][3]);
    }
}

function colorRNG()
{//Assigns a random color to each rectangle in mazeArray
    for(i=0;i<mazeArray.length;i++)
    {
        for(j=0;j<mazeArray[i].length;j++)
        {
            var temp = floor(random(0,colorPallet.length-1));
            mazeArray[i][j].push(temp);  
        }
    }
}

function drawCharacter()
{ //Draws the player Character   
    character.y += 28; //The character was orignally designed to float 28pixels over the ground, this is no longer appropriate so we push the character down 28 characters and then reverse this at the end of the Function
    

	if(character.isLeft && character.isUp)
	{ //Moving Left and Up
        
        //Rotating the character 45degrees
        push();
        translate(character.x,character.y-27);
        rotate(0.6);
        translate(-character.x,-(character.y-27)); 
        
        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-24,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-14, character.y-24);
        curveVertex(character.x-14, character.y-24);
        curveVertex(character.x-11, character.y-19);
        curveVertex(character.x+1, character.y-19);
        curveVertex(character.x+4, character.y-24);
        curveVertex(character.x+4, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-11, character.y-24);
        curveVertex(character.x-11, character.y-24);
        curveVertex(character.x-11, character.y-22);
        curveVertex(character.x-8, character.y-21);
        curveVertex(character.x-6, character.y-22);
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-22);
        curveVertex(character.x-2, character.y-21);
        curveVertex(character.x-4, character.y-22);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-4, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+4, character.y-24.5,character.x-14, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-13,character.y-50,5,9);
        ellipse(character.x+22,character.y-50,5,9);
        line(character.x-16,character.y-48,character.x-19,character.y-40);
        line(character.x+20,character.y-48,character.x+19,character.y-40);

        //rotating back
        pop();
	}
	else if(character.isRight && character.isUp)
	{ //Going Right and Up
        //Rotating 45 degrees
        push();
        translate(character.x,character.y-27);
        rotate(-0.6);
        translate(-character.x,-(character.y-27));

        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-14,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-1, character.y-19);
        curveVertex(character.x+11, character.y-19);
        curveVertex(character.x+14, character.y-24);
        curveVertex(character.x+14, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-22);
        curveVertex(character.x+2, character.y-21);
        curveVertex(character.x+4, character.y-22);
        curveVertex(character.x+4, character.y-24);
        curveVertex(character.x+4, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+11, character.y-24);
        curveVertex(character.x+11, character.y-24);
        curveVertex(character.x+11, character.y-22);
        curveVertex(character.x+8, character.y-21);
        curveVertex(character.x+6, character.y-22);
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+14, character.y-24.5,character.x-4, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-22,character.y-50,5,9);
        ellipse(character.x+13,character.y-50,5,9);
        line(character.x-20,character.y-48,character.x-19,character.y-40);
        line(character.x+16,character.y-48,character.x+19,character.y-40);

        //Rotate back
        pop();
	}
    else if(character.isLeft && character.isDown)
	{ //Moving Left and Down
        
        //Rotate 45 degrees
        push();
        translate(character.x,character.y-27);
        rotate(-0.6);
        translate(-character.x,-(character.y-27));
        
        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-24,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-14, character.y-24);
        curveVertex(character.x-14, character.y-24);
        curveVertex(character.x-11, character.y-19);
        curveVertex(character.x+1, character.y-19);
        curveVertex(character.x+4, character.y-24);
        curveVertex(character.x+4, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-11, character.y-24);
        curveVertex(character.x-11, character.y-24);
        curveVertex(character.x-11, character.y-22);
        curveVertex(character.x-8, character.y-21);
        curveVertex(character.x-6, character.y-22);
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-22);
        curveVertex(character.x-2, character.y-21);
        curveVertex(character.x-4, character.y-22);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-4, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+4, character.y-24.5,character.x-14, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-13,character.y-50,5,9);
        ellipse(character.x+22,character.y-50,5,9);
        line(character.x-16,character.y-48,character.x-19,character.y-40);
        line(character.x+20,character.y-48,character.x+19,character.y-40);

        //Rotate Back
        pop();
	}
	else if(character.isRight && character.isDown)
	{   //Character moving Right and down
        
        //Rotate 45 degrees
        push();
        translate(character.x,character.y-27);
        rotate(0.6);
        translate(-character.x,-(character.y-27));

        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-14,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-1, character.y-19);
        curveVertex(character.x+11, character.y-19);
        curveVertex(character.x+14, character.y-24);
        curveVertex(character.x+14, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-22);
        curveVertex(character.x+2, character.y-21);
        curveVertex(character.x+4, character.y-22);
        curveVertex(character.x+4, character.y-24);
        curveVertex(character.x+4, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+11, character.y-24);
        curveVertex(character.x+11, character.y-24);
        curveVertex(character.x+11, character.y-22);
        curveVertex(character.x+8, character.y-21);
        curveVertex(character.x+6, character.y-22);
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+14, character.y-24.5,character.x-4, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-22,character.y-50,5,9);
        ellipse(character.x+13,character.y-50,5,9);
        line(character.x-20,character.y-48,character.x-19,character.y-40);
        line(character.x+16,character.y-48,character.x+19,character.y-40);

        //Rotate back
        pop();
	}
	else if(character.isLeft)
	{   //Moving left
        
        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-24,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-14, character.y-24);
        curveVertex(character.x-14, character.y-24);
        curveVertex(character.x-11, character.y-19);
        curveVertex(character.x+1, character.y-19);
        curveVertex(character.x+4, character.y-24);
        curveVertex(character.x+4, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-11, character.y-24);
        curveVertex(character.x-11, character.y-24);
        curveVertex(character.x-11, character.y-22);
        curveVertex(character.x-8, character.y-21);
        curveVertex(character.x-6, character.y-22);
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-22);
        curveVertex(character.x-2, character.y-21);
        curveVertex(character.x-4, character.y-22);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-4, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+4, character.y-24.5,character.x-14, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-13,character.y-50,5,9);
        ellipse(character.x+22,character.y-50,5,9);
        line(character.x-16,character.y-48,character.x-19,character.y-40);
        line(character.x+20,character.y-48,character.x+19,character.y-40);

	}
	else if(character.isRight)
	{   //Moving Right
        
        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-14,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-4, character.y-24);
        curveVertex(character.x-1, character.y-19);
        curveVertex(character.x+11, character.y-19);
        curveVertex(character.x+14, character.y-24);
        curveVertex(character.x+14, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-22);
        curveVertex(character.x+2, character.y-21);
        curveVertex(character.x+4, character.y-22);
        curveVertex(character.x+4, character.y-24);
        curveVertex(character.x+4, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+11, character.y-24);
        curveVertex(character.x+11, character.y-24);
        curveVertex(character.x+11, character.y-22);
        curveVertex(character.x+8, character.y-21);
        curveVertex(character.x+6, character.y-22);
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+14, character.y-24.5,character.x-4, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-22,character.y-50,5,9);
        ellipse(character.x+13,character.y-50,5,9);
        line(character.x-20,character.y-48,character.x-19,character.y-40);
        line(character.x+16,character.y-48,character.x+19,character.y-40);

	}
	else if(character.isUp)
	{   //Moving Up
        
        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-19,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-9, character.y-24);
        curveVertex(character.x-9, character.y-24);
        curveVertex(character.x-6, character.y-19);
        curveVertex(character.x+6, character.y-19);
        curveVertex(character.x+9, character.y-24);
        curveVertex(character.x+9, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-22);
        curveVertex(character.x-3, character.y-21);
        curveVertex(character.x-1, character.y-22);
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-22);
        curveVertex(character.x+3, character.y-21);
        curveVertex(character.x+1, character.y-22);
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+9, character.y-24.5,character.x-9, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-22,character.y-53,5,9);
        ellipse(character.x+22,character.y-53,5,9);
        line(character.x-20,character.y-50,character.x-19,character.y-35);
        line(character.x+20,character.y-50,character.x+19,character.y-35);

    
}
	else
	{   //Standing Still
        
        //body
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        rect(character.x-19,character.y-42,38,10,4);
        rect(character.x-19,character.y-27,38,10,4);

        //eyes
        fill(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(character.x-4,character.y-37,6,9);
        ellipse(character.x+4,character.y-37,6,9);

        //eyeballs
        fill(139,  69,  19);
        noStroke();
        ellipse(character.x-3,character.y-37,2,4);
        ellipse(character.x+3,character.y-37,2,4);

        //eyebrows
        noFill();
        stroke(0, 0, 0);
        strokeWeight(1);
        beginShape();
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-1, character.y-45);
        curveVertex(character.x-2, character.y-47);
        curveVertex(character.x-3, character.y-47);
        curveVertex(character.x-4, character.y-47);
        curveVertex(character.x-6, character.y-45);
        curveVertex(character.x-6, character.y-45);
        endShape();
        beginShape();
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+1, character.y-45);
        curveVertex(character.x+2, character.y-47);
        curveVertex(character.x+3, character.y-47);
        curveVertex(character.x+4, character.y-47);
        curveVertex(character.x+6, character.y-45);
        curveVertex(character.x+6, character.y-45);
        endShape();

        //mouth
        fill(220,  20,  60);
        beginShape();
        stroke(75, 0, 130);
        curveVertex(character.x-9, character.y-24);
        curveVertex(character.x-9, character.y-24);
        curveVertex(character.x-6, character.y-19);
        curveVertex(character.x+6, character.y-19);
        curveVertex(character.x+9, character.y-24);
        curveVertex(character.x+9, character.y-24);
        endShape();

        //teeth
        fill(256,  256,  256);
        beginShape();
        noStroke();
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-24);
        curveVertex(character.x-6, character.y-22);
        curveVertex(character.x-3, character.y-21);
        curveVertex(character.x-1, character.y-22);
        curveVertex(character.x-1, character.y-24);
        curveVertex(character.x-1, character.y-24);
        endShape();
        beginShape();
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-24);
        curveVertex(character.x+6, character.y-22);
        curveVertex(character.x+3, character.y-21);
        curveVertex(character.x+1, character.y-22);
        curveVertex(character.x+1, character.y-24);
        curveVertex(character.x+1, character.y-24);
        endShape(); 
        stroke(0,0,0);
        strokeWeight(0.5);
        line(character.x+9, character.y-24.5,character.x-9, character.y-24.5);

        //arms
        stroke(75, 0, 130);
        strokeWeight(1);
        fill (238, 130, 238);
        ellipse(character.x-13,character.y-50,5,9);
        ellipse(character.x+13,character.y-50,5,9);
        line(character.x-16,character.y-48,character.x-19,character.y-40);
        line(character.x+16,character.y-48,character.x+19,character.y-40);

    
}
    //Pushing the character position back up to compensate for the first line of code in this function
    character.y -= 28;
}

function directionCheck()
{//Checks to see if there is a wall in front of the character,and stops him from moving in that direction if true
//If not, then lets the character move normally
    
    //Create a variable as a true or false if there is a wall in front of us
    var wall = false;
    
    if(character.isLeft==true)
    {   //Search through all the walls in Maze Array to see if there is a wall in front of the character
        //If there is set: wall = true
        for(i=0;i<mazeArray[gameState.level-1].length;i++)
        {
            if( (((unitSize*mazeArray[gameState.level-1][i][0])-character.x)+(mazeArray[gameState.level-1][i][2]*unitSize) >= -5)&&
                (((unitSize*mazeArray[gameState.level-1][i][0])-character.x)+(mazeArray[gameState.level-1][i][2]*unitSize) <= 5)&&
                ((character.y>=(unitSize*mazeArray[gameState.level-1][i][1]))&&
                (character.y<=((unitSize*mazeArray[gameState.level-1][i][1])+(unitSize*mazeArray[gameState.level-1][i][3])))))
            {
                wall = true; //If was is true the character won't be able to move forward
            }
        }
        if((wall == false)&&(character.isUp == false && character.isUp == false))
        {//Character moves if there isn't a wall
          character.x -= 2.25;  
        }
        else if(wall == false)
        {//Character moves slightly slower in one direction if he is going up or down, so he keeps the same overall speed
          character.x -= 1.59;
        }
        wall = false;    //Reset wall to false  
    }
    if(character.isRight==true)
    {   //check comments for .isLeft as all this logic is the same
        for(i=0;i<mazeArray[gameState.level-1].length;i++)
        {
            if( ((character.x-(unitSize*mazeArray[gameState.level-1][i][0])) >= -5)&&
                ((character.x-(unitSize*mazeArray[gameState.level-1][i][0])) <= 5)&&
                ((character.y>=(unitSize*mazeArray[gameState.level-1][i][1]))&&
                (character.y<=((unitSize*mazeArray[gameState.level-1][i][1])+(unitSize*mazeArray[gameState.level-1][i][3])))))
            {
                wall = true;
            }
        }
        if((wall == false)&&(character.isUp == false && character.isDown == false))
        {
          character.x += 2.25;  
        }
        else if(wall == false)
        {
          character.x += 1.59;
        }
        wall = false;
    }
    if(character.isUp==true)
    {   //check comments for .isLeft as all this logic is the same
        for(i=0;i<mazeArray[gameState.level-1].length;i++)
        {
            if( (((unitSize*mazeArray[gameState.level-1][i][1])-character.y)+unitSize*mazeArray[gameState.level-1][i][3] >= -5)&&
                (((unitSize*mazeArray[gameState.level-1][i][1])-character.y)+unitSize*mazeArray[gameState.level-1][i][3] < 0)&&
                ((character.x>=(unitSize*mazeArray[gameState.level-1][i][0]))&&
                (character.x<=((unitSize*mazeArray[gameState.level-1][i][0])+(unitSize*mazeArray[gameState.level-1][i][2])))))
            {
                wall = true;
            }
        }
        if((wall == false)&&(character.isLeft == false && character.isRight == false))
        {
          character.y -= 2.25;  
        }
        else if(wall == false)
        {
          character.y -= 1.59;   
        }
        wall = false;
    }
    if(character.isDown==true)
    {   //check comments for .isLeft as all this logic is the same
        for(i=0;i<mazeArray[gameState.level-1].length;i++)
        {
            if( ((character.y-(unitSize*mazeArray[gameState.level-1][i][1])) >= -5)&&
                ((character.y-(unitSize*mazeArray[gameState.level-1][i][1])) < 0)&&
                ((character.x>=(unitSize*mazeArray[gameState.level-1][i][0]))&&
                (character.x<=((unitSize*mazeArray[gameState.level-1][i][0])+(unitSize*mazeArray[gameState.level-1][i][2])))))
            {
                wall = true;
            }
        }
        if((wall == false)&&(character.isLeft == false && character.isRight == false))
        {
          character.y += 2.25;  
        }
        else if(wall == false)
        {
          character.y += 1.59;   
        }
        wall = false;
    }
}

function keyPressed()
{   //controls character movement direction values
    //and spacebar to skip message screen depending which gameState you are in
    
    if(keyCode == 65)
    {
        character.isLeft = true;
    }
    if(keyCode == 68)
    {
        character.isRight = true;
    }
    if(keyCode == 87)
    {
        character.isUp = true;
    }
    if(keyCode == 83)
    {
        character.isDown = true;
    }
    if(keyCode == 32 && gameState.permadeath == true)
    {
        gameState.permadeath = false;
        setup();
    }
    else if(keyCode == 32 && gameState.victoryScreen == true)
    {
        gameState.victoryScreen = false;
        setup();
    }
    else if(keyCode == 32 && gameState.levelScreen == true)
    {
        gameState.levelScreen = false;
        startGame();
    }
    else if(keyCode == 32 && gameState.deathScreen == true)
    {
        gameState.deathScreen = false;
        startGame();
    }
    else if(keyCode == 32 && gameState.playerReady == false)
    {
        character.x = 250;
        character.y = 250;
        gameState.playerReady = true;
    }
}

function keyReleased()
{ //controls character movement direction values

    if(keyCode == 65)
    {
        character.isLeft = false;
    }
    if(keyCode == 68)
    {
        character.isRight = false;
    }
    if(keyCode == 87)
    {
        character.isUp = false;
    }
    if(keyCode == 83)
    {
        character.isDown = false;
    }
    
}
