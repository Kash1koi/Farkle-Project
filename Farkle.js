//variables & lists
//all Icons came from the code.org applab
/*This code was a colaberation between 3 students, we all worked on it together coding and creating diffrent parts*/
var rolled = [], banked = [], scores = [], players = [], bankScore = 0,wins = [];
var melds = ["Ones","Fives","Triple One", "Triple Two","Triple Three","Triple Four","Triple Five","Triple Six","Four of a Kind","Five of a Kind","Six of a Kind","Three Pairs","Full Run"];
var meldValues = [100,50,1000,200,300,400,500,600,1000,2000,3000,1500,2500];
var diceIcon = ["download-(1).png", "download-(2).png", "download-(3).png", "download-(4).png", "download-(5).png", "download-(6).png"]; //image link
var rollDice = ["i1","i2","i3","i4","i5","i6"];
var bankDice = ["b1","b2","b3","b4","b5","b6"];
var lockBank = [false,false,false,false,false,false];
var current_turn = -1;
var roll1 = true;
//event callers
onEvent("To_Melds_Help","click",function(){
  setScreen("Melds_Help");
});
onEvent("Back_To_Farkle_Game","click",function(){
  setScreen("Farkle_Game");
});
onEvent("newroll", "click", function() {
  //clear error box
  setText("error","");
  
  //check that bank is valid
  if(badDieDetector(sortMelds(sortNumbers(banked)),sortNumbers(banked)).length==0){
    //check for hot dice:
  for(var r = 0; r < 6; r++){  
    if(getProperty(rollDice[r],"hidden")==false){
    roll1=false;
    break;
    } else{
    roll1=true;
    }
  }
  
  //set first dice to top
  if(roll1==true){
  for(var k = 0; k < 6; k++){
    showElement(rollDice[k]);
    setImageURL(rollDice[k],diceIcon[k]);
    hideElement(bankDice[k]);
    }
  }
  roll1=false;
  
  //random roll and set dice
  rolled = [];
  var b = -1;
  for(var j = 0; j < 6; j++){
    if(getProperty(rollDice[j],"hidden")==false){
      b++;
      appendItem(rolled,randomNumber(1,6));
      setImageURL(rollDice[j],diceIcon[rolled[b]-1]);
    }
  }
  rolled = sortNumbers(rolled);
  
  //get score of bank
  banked = sortNumbers(banked);
  if(sortMelds(banked)!=undefined||onesNfives(banked)!=0){
    bankScore = bankScore+score(sortMelds(banked),banked);
    setText("playerScore",bankScore);
  } 
  
  //lock dice after scored
  for(var i = 0; i < 6; i++){
    if(getProperty(bankDice[i],"hidden")==false){
      lockBank[i]=true;
    }
  }

  //Check Farkle
  if(sortMelds(rolled)==undefined&&onesNfives(rolled)==0&&rolled.length>0){
    setText("error","farkle");
    updatePlayer(0);
  } else{
    hideElement("newroll");
  }
  banked = [];
  //If invalid bank
  }else if(roll1==false){
    setText("error",badDieDetector(sortMelds(sortNumbers(banked)),sortNumbers(banked))+" is not part of a meld");
  }
});
onEvent("bankPlayerScore", "click", function( ) {
  banked=sortNumbers(banked);
  //console.log(banked);
  if(banked.length>0&&badDieDetector(sortMelds(banked),banked).length==0){
  updatePlayer(bankScore+score(sortMelds(banked),banked));
  for(var i = 0; i < players.length; i++){
    if(scores[i]>=10000){
      setScreen("winScreen");
      setText("winner",players[i]+" wins!");
      wins[i]++;
      var output = [];
      for(var j = 0; j < players.length; j++){
        appendItem(output,players[j]+": \n"+wins[j]+" wins");
      }
      setText("winCount",output.join("\n"));
    }
  }
  } else if(roll1==false){
    if(banked.length==0){
      setText("error","Add a meld to the bank to continue");
    } else{
      setText("error",badDieDetector(sortMelds(banked),banked)+" is not part of a meld");
    }
  }
});
onEvent("home","click",function(){
    rolled = [], banked = [], scores = [], players = [], bankScore = 0, lockBank = [false,false,false,false,false,false],wins=[],roll1=true;
    setScreen("Home_Screen");
    setText("player_1_name_input","");
    setText("player_2_name_input","");
    setText("player_3_name_input","");
    setText("player_4_name_input","");
    hideElement("player_3_id");
    hideElement("player3");
    hideElement("player_3_name_input");
    hideElement("player_4_id");
    hideElement("player4");
    hideElement("player_4_name_input");
});
onEvent("again","click",function(){
  setScreen("Farkle_Game");
  rolled = [], banked = [],bankScore = 0, scores=[], lockBank = [false,false,false,false,false,false],roll1=true;
  for(var i = 0; i < players.length;i++){
    appendItem(scores,0);
  }
  var output = [];
  for(var j = 0; j < players.length;j++){
    appendItem(output,players[j]+":\n"+scores[j]);
  }
  setText("score_keeper",output.join("\n\n"));
});
console.log(score(sortMelds([2,2,2,2,2]),[2,2,2,2,2]));
//rolled dice buttons
onEvent("i1","click",function(){
  addToBanked("i1",rolled);
});
onEvent("i2","click",function(){
  addToBanked("i2",rolled);
});
onEvent("i3","click",function(){
  addToBanked("i3",rolled);
});
onEvent("i4","click",function(){
  addToBanked("i4",rolled);
});
onEvent("i5","click",function(){
  addToBanked("i5",rolled);
});
onEvent("i6","click",function(){
  addToBanked("i6",rolled);
});
//held dice buttons
onEvent("b1","click",function(){
  addToBanked("b1",rolled);
});
onEvent("b2","click",function(){
  addToBanked("b2",rolled);
});
onEvent("b3","click",function(){
  addToBanked("b3",rolled);
});
onEvent("b4","click",function(){
  addToBanked("b4",rolled);
});
onEvent("b5","click",function(){
  addToBanked("b5",rolled);
});
onEvent("b6","click",function(){
  addToBanked("b6",rolled);
});
//player selection
onEvent("start_button", "click", function( ) {
  current_turn = -1;
  for(var i = 1; i < 5; i++){
    var temp = getText("player_"+i+"_name_input");
    if(temp!=""){
    appendItem(players,temp);
    appendItem(scores,0);
    appendItem(wins,0);
    }
  }
  setScreen("Farkle_Game");
  updatePlayer(0);
  for(var j = 0; j < 6; j++){
  setImageURL(bankDice[j],diceIcon[j]);
  }
});
onEvent("button2", "click", function( ) {
  setScreen("Home_Screen");
  setText("player_1_name_input","");
  setText("player_2_name_input","");
  setText("player_3_name_input","");
  setText("player_4_name_input","");
  hideElement("player_3_id");
  hideElement("player3");
  hideElement("player_3_name_input");
  hideElement("player_4_id");
  hideElement("player4");
  hideElement("player_4_name_input");
});
onEvent("player_choice_2", "click", function( ) {
  setScreen("Game_Customization_Screen");
});
onEvent("player_choice_3", "click", function( ) {
  setScreen("Game_Customization_Screen");
  showElement("player_3_id");
  showElement("player3");
  showElement("player_3_name_input");
});
onEvent("player_choice_4", "click", function( ) {
  setScreen("Game_Customization_Screen");
  showElement("player_3_id");
  showElement("player3");
  showElement("player_3_name_input");
  showElement("player_4_id");
  showElement("player4");
  showElement("player_4_name_input");
});
//function
function addToBanked(die){
  if(roll1==false){
  var ind = (die.substring(1,2)-1);
  if(die.substring(0,1)=="b"){//when removing from bank
  if(lockBank[ind]==false){
  showElement(("i"+die.substring(1,2)));
  hideElement(die);
  for(var i = 0; i < banked.length; i++){
    if(banked[i]==getImageURL(die).substring(10,11)){
      removeItem(banked,i);
    }
  }
  }
  } else {//when adding to bank
  appendItem(banked,parseInt(getImageURL(die).substring(10,11)));
    hideElement(die);
    showElement(("b"+die.substring(1,2)));
    setImageURL(("b"+die.substring(1,2)),getImageURL(die));
  }
  }
  if(banked.length>0||rolled.length==0){
    showElement("newroll");
  } else{
    hideElement("newroll");
  }
}
function updatePlayer(score){
  //reset dice and score
  lockBank = [false,false,false,false,false,false];
  for(var i = 0; i < 6; i++){
    showElement(bankDice[i]);
    setImageURL(bankDice[i],getImageURL(rollDice[i]));
    hideElement(rollDice[i]);
  }
  bankScore = 0;
  setText("playerScore","0");
  roll1=true;
  
  //calculate score and set menu
  scores[current_turn] = scores[current_turn]+score;
  var output = [];
  for(var j = 0; j < players.length;j++){
    appendItem(output,players[j]+":\n"+scores[j]);
  }
  setText("score_keeper",output.join("\n\n"));
  
  //switch to next player
  if(players.length-1==current_turn){
    current_turn=0;
  } else {
    current_turn++;
  }
  setText("turn_keeper",players[current_turn]+"'s turn.");
  banked = [];
}
function sortNumbers(roll){
var swapped = true;
while(swapped){
  swapped = false;
    for (var i = 0; i < roll.length - 1; i++) {
      if (roll[i] > roll[i + 1]) {
        var temp = roll[i];
        roll[i] = roll[i + 1];
        roll[i + 1] = temp;
        swapped = true;
      }
    }
}
return roll;
}
function findPairs(roll){
var pairFlag = 11;
if(roll.length==6){
  for(var i = 0; i < 6; i=i+2){
    if(roll[i]!=roll[i+1]||roll[i]==roll[i-1]){
      pairFlag = undefined;
    }
  }
  return pairFlag;
}
return undefined;
}
function onesNfives(roll){
  var one = 0;
  var five = 0;
  for(var i = 0; i < roll.length; i++){
    if(roll[i]==1){
      one++;
    }
    if(roll[i]==5){
      five++;
    }
  }
  return one*100+five*50;
}
function checkFullRun(roll) {
  if(roll.length!=6){
    return undefined;
  }
  var fullrun = [1, 2, 3, 4, 5, 6];
  for (var i = 0; i < roll.length; i++) {
    if (roll[i] == fullrun[i]) {
      
    } else if ((roll[i] != fullrun[i])) {
      return undefined;
    }
  }
  //scores = 1500+scores;
  return 12;
}
function OfAKindChecker(roll) {
  var checkNum = 0;
  var temp = 0;
  var tempList = [];
  var ThreeOfAKind = [];
  for(var j = 0;j<=6;j++) {
    checkNum++;
  for(var i = 0;i<roll.length;i++) {
    if(roll[i] == checkNum){
      temp++;
      appendItem(tempList, checkNum);
    }
  }if (temp == 6) {
    /*the value that should be returned should be that of the six of a kind on your meld and values for the meld lists.*/
    return 10;
  }
  else if(temp > 3){
    //j = roll.length; //this made an infinite loop
    break;
  }else if(temp > 2){
    appendItem(ThreeOfAKind,tempList[1]);
    tempList = [];
    temp = 0;
  }else {
    tempList = [];
    temp = 0;
  }
  }
  if(ThreeOfAKind.length == 1) {
    for(var k = 1; k < 7; k++) {
      if(ThreeOfAKind[0] == k) {
        return 1+k;
      }
    }
  }else if(ThreeOfAKind.length == 2) {
    for(var p = 0; p<2;p++){
    for(var o = 1; o < 7; o++) {
      if(ThreeOfAKind[0] == o) {
        appendItem(tempList, 1+o);
        removeItem(ThreeOfAKind,0);
        o = 7;
      }
    }
    }
    return tempList;
  }
  else if(temp == 4){
    temp = tempList[0];
    tempList = [8,temp];
    return tempList;
  }else if(temp == 5){
    temp = tempList[0];
    tempList = [9,temp];
    return tempList;
  }else{
  return undefined;
    
  }
}
function remover(item,list) {
  var tempList = [];
  for(var i = 0; i<list.length;i++){
    if(list[i] != item) {
      appendItem(tempList,list[i]);
    }
  }
  return(tempList);
}
function sortMelds(list) {
  var tempList = [];
  appendItem(tempList,findPairs(list));
  appendItem(tempList,checkFullRun(list));
  appendItem(tempList,OfAKindChecker(list));
  tempList = tempList.filter(function( element ) {
   return element !== undefined;
  });
  tempList = tempList[0];
  if(tempList == undefined) {
    return undefined;
  }
  else if(tempList.length > 1 && tempList[1] === undefined) {
    tempList = tempList.filter(function( element ) {
   return element !== undefined;
  });
  }
  return(tempList);
}
function score(list,bank) {
  var tempScore = 0;
  if(list == undefined) {
    tempScore = tempScore + onesNfives(bank);
    return(tempScore);
  }
  if(list.length > 1) {
    for(var i = 0; i < 2;i++){
    if(list[i] == 3 || list[i] == 4 || list[i] == 5 || list[i] == 7) {
      tempScore = tempScore + meldValues[list[i]];
    }else if(list[i] == 2 || list[i] == 6){
      tempScore = tempScore + meldValues[list[i]];
      bank = remover(list[i]-1,bank);
    }else if(list[i] == 8){
      tempScore = tempScore + meldValues[list[i]];
      bank = remover(list[1],bank);
      i=2;
    }
    else if(list[i] == 9){
      tempScore = tempScore + meldValues[list[i]];
      bank = remover(list[1],bank);
      i=2;
    }
    }
  }
  else{
    if(list == 8||list == 9) {
      tempScore = tempScore + meldValues[list];
    }else if(list == 3 || list == 4 || list == 5 || list == 7){
      tempScore = tempScore + meldValues[list];
    }
    else if(list == 2 || list == 6){
      tempScore = tempScore + meldValues[list];
      bank = remover(list-1,bank);
    }
    else if(list == 10||list == 11||list == 12) {
      tempScore = tempScore + meldValues[list];
      return(tempScore);
    }
  }
  tempScore = tempScore + onesNfives(bank);
  return(tempScore);
}
function badDieDetector(list,bank) {
  //console.log(list);
  //console.log(bank);
  if(list == undefined) {
  bank = remover(1,bank);
  bank = remover(5,bank);
  return(bank);
  }
  else if(list.length > 1) {
    for(var i = 0; i < 2;i++){
    if(list[i] == 3 || list[i] == 4 || list[i] == 5 || list[i] == 7) {
      bank = remover(list[i]-1,bank);
    }else if(list[i] == 2 || list[i] == 6){
      bank = remover(list[i]-1,bank);
    }else if(list[i] == 8){
      i=2;
      bank = remover(list[1],bank);
    }
    else if(list[i] == 9){
      i=2;
      bank = remover(list[1],bank);
    }
    }
  }
  else{
    if(list == 3 || list == 4 || list == 5 || list == 7 || list == 2 || list == 6){
      bank = remover(list-1,bank);
    }
    else if(list == 10||list == 11||list == 12) {
      return([]);
    }
  }
  bank = remover(1,bank);
  bank = remover(5,bank);
  //console.log(bank);
  return(bank);
}


