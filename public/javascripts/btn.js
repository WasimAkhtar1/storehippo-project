var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  let  btn=document.getElementById("btn")
  let  span=document.getElementById("span")
  let  span1=document.getElementById("span1")
   let flag=0

  btn.addEventListener("click",function(){
    if(flag==0){
     span.style.display="none";
     flag=1
    }else{
     span.style.display="block"
     

     flag=0
    }
    
  })