const body = document.querySelector('body');

body.addEventListener('click',(e)=>{
    console.log(e.clientX, e.clientY);

   const circleElement =document.createElement('div');
   circleElement.classList.add('circle');
   circleElement.textContent = "HI";

   const color =['red','blue','orange','green','yellow','pink','purple'];
   circleElement.style.backgroundColor = color[Math.floor(Math.random()*7)];
    

   circleElement.style.top = `${e.clientY-25}px`;// ye kr k hme uski exact location pta chl jaegi jha se start kna hai
   circleElement.style.left = `${e.clientX-25}px`;//""

   body.append(circleElement);
   console.log(body);

   setTimeout(()=>{
    circleElement.remove();
   },5000);
})