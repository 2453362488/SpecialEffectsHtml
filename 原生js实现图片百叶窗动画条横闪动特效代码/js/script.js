let coef = 1/30;
let lineAmount = 50;
let lines = [];
let bigCont = document.getElementById('bigCont');
let cont = document.getElementById('cont');
let imgLink = cont.getAttribute('image-link');
let  img = new Image();
img.src = imgLink;
let imgW;
let imgH;
img.onload = function() {
  imgW = img.width;
  imgH = img.height;
  nextStep();
}
function nextStep(){
  console.log(imgH, imgW, imgLink);
  for (let i = 0; i < lineAmount; i++){
    let line = createLine(i);
    cont.appendChild(line);
  }
  console.log(lines);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createLine(i){
  let elem = document.createElement('div');
  elem.style.backgroundImage = 'url(' + imgLink + ')';
  elem.style.width = imgW + 'px';
  elem.style.height = (imgH / lineAmount) + 'px';
  elem.style.backgroundPosition = '0px  -' + i*imgH/lineAmount + 'px';
  lines.push(elem);
  return elem;
}
function movePhoto(){
  let rect = bigCont.getBoundingClientRect();
  // var x = event.clientX - rect.left; //x position within the element.
  // var y = event.clientY - rect.top;  //y position within the element.
  
  var x = getRandomInt(1, 1000); //x position within the element.
  var y = getRandomInt(1, 600);  //y position within the element.
  
  let distToCent = Math.sqrt(Math.pow(bigCont.offsetWidth/2 - x, 2) + Math.pow(bigCont.offsetHeight/2 - y, 2));
  let distMax = Math.sqrt(Math.pow(bigCont.offsetWidth/2, 2) + Math.pow(bigCont.offsetHeight/2,2));
  let distDifferent = Math.abs(distMax - distToCent);
  for (let i = 0; i < lines.length; i++){
    if(distToCent <= 300){
      let r = getRandomInt(1,2);
    if (r==1){
      lines[i].style.transform = 'translateX(' + (distDifferent-300+getRandomInt(1,100))*coef + 'px)';
    } else {
      lines[i].style.transform = 'translateX(-' + (distDifferent-300+getRandomInt(1,100))*coef + 'px)';
    }
  }
    lines[i].style.filter = 'hue-rotate(' +getRandomInt(-25,50) + 'deg)';
    lines[i].style.filter += ' invert(' +getRandomInt(1,10) + '%)';
    lines[i].style.filter += ' grayscale('+ getRandomInt(1,10) +'%)';
    lines[i].style.transform += ' skew('+getRandomInt(-5,5)+'deg)';
    if (getRandomInt(1,100) < 3){
      lines[i].style.transform += ' scaleX('+ getRandomInt(8,12)*0.1 +')';
    }
    
  }
};
// bigCont.addEventListener('mousemove', movePhoto);
window.setInterval(movePhoto,50);