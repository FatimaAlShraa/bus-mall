'use strict';


let firstImageElement= document.getElementById('first-image');
let secondImageElement= document.getElementById('second-image');
let thirdImageElement= document.getElementById('third-image');

let maxTries=25;
let userCount=0;

let firstImageIndex;
let secondImageIndex;
let thirdImageIndex;

let namesArr=[];
let votesArr=[];
let shownArr=[];
let repeat=[];
function Bus(nameBus,source){
    this.nameBus=nameBus;
    this.source=source;
    this.vote=0;
    this.shownTime=0;

    Bus.allBuses.push(this);
    namesArr.push(this.nameBus);
}

Bus.allBuses=[];

new Bus('bag' ,'img/bag.jpg');
new Bus('banana','img/banana.jpg');
new Bus('bathroom','img/bathroom.jpg');
new Bus('boots','img/boots.jpg');
new Bus('breakfast','img/breakfast.jpg');
new Bus('bubblegum','img/bubblegum.jpg');
new Bus('chair','img/chair.jpg');
new Bus('cthulhu','img/cthulhu.jpg');
new Bus('dog-duck','img/dog-duck.jpg');
new Bus('dragon','img/dragon.jpg');
new Bus('pen','img/pen.jpg');
new Bus('pet-sweep','img/pet-sweep.jpg');
new Bus('scissors','img/scissors.jpg');
new Bus('shark','img/shark.jpg');
new Bus('sweep','img/sweep.png');
new Bus('tauntaun','img/tauntaun.jpg');
new Bus('unicorn','img/unicorn.jpg');
new Bus('usb','img/usb.gif');
new Bus('water-can','img/water-can.jpg');
new Bus('wine-glass','img/wine-glass.jpg');

console.log(Bus.allBuses);

function randomIndex(){
    return Math.floor(Math.random() * Bus.allBuses.length);
}
//console.log(randomIndex());

function renderImage(){
    firstImageIndex=randomIndex();
    secondImageIndex=randomIndex();
    thirdImageIndex=randomIndex();
    Bus.allBuses[firstImageIndex].shownTime++;
    Bus.allBuses[secondImageIndex].shownTime++;
    Bus.allBuses[thirdImageIndex].shownTime++;

    

    while(repeat.includes(firstImageIndex)||firstImageIndex===secondImageIndex||repeat.includes(secondImageIndex)||firstImageIndex===thirdImageIndex||repeat.includes(thirdImageIndex)||secondImageIndex===thirdImageIndex){
       
     firstImageIndex=randomIndex();
        secondImageIndex=randomIndex();
        thirdImageIndex=randomIndex();

    }
    //console.log(Bus.allBuses[firstImageIndex]);


firstImageElement.src=Bus.allBuses[firstImageIndex].source;
secondImageElement.src=Bus.allBuses[secondImageIndex].source;
thirdImageElement.src=Bus.allBuses[thirdImageIndex].source;

 repeat=[];
repeat.push(firstImageIndex);
repeat.push(secondImageIndex);
repeat.push(thirdImageIndex);
console.log(repeat);
}
renderImage();


let allImageElement=document.getElementById('images');
allImageElement.addEventListener('click',handClick);

function handClick(event){
    console.log(event.target.id);
    userCount++;
    


    if (userCount<=maxTries){
        if (event.target.id==='first-image'){
        Bus.allBuses[firstImageIndex].vote++;
    }else if(event.target.id==='second-image'){
        Bus.allBuses[secondImageIndex].vote++;
    }else if(event.target.id==='second-image') {
        Bus.allBuses[thirdImageIndex].vote++;
    }
    else{
        alert('please click on the images');
        userCount--; 
      }
  
    renderImage();
    }
    else{
        let button=document.getElementById('result');
        button.addEventListener('click',makeList);
        button.hidden=false;

        for (let i = 0; i < Bus.allBuses.length; i++) {
            votesArr.push(Bus.allBuses[i].vote);
            shownArr.push(Bus.allBuses[i].shownTime);
            
          }
          chart();

        function makeList(event){
            console.log(event);
            let parent=document.getElementById('cont')
            let list=document.createElement('ul')
            parent.appendChild(list)
            let result;
            for (let i = 0; i <Bus.allBuses.length; i++) {
               result=document.createElement('li');
                list.appendChild(result);
                result.textContent=`${Bus.allBuses[i].nameBus} had ${Bus.allBuses[i].vote} votes , and was seen ${Bus.allBuses[i].shownTime}times`

            
        }
       button.removeEventListener('click',makeList)

    }
    allImageElement.removeEventListener('click',handClick);
   
}
}


function chart() {
    let bar = document.getElementById('myChart').getContext('2d');

    let chart= new Chart(bar,{
        // what type is the chart
       type: 'bar',
    
      //  the data for showing
       data:{
        //  for the names
          labels: namesArr,
          
          datasets: [
            {
            label: 'BusMall votes',
            data: votesArr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                 'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 205, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
               'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
      
            borderWidth: 1
          },
    
          {
            label: 'BusMall shown',
            data: shownArr,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'            ],
      
            borderWidth: 1
          }
          
        ]
        },
        options: {}
      });
      


}


