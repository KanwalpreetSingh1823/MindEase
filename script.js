document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector(".spinner");
    const mainData = document.querySelector(".main-content");
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = 0;

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainData.style.display = "block";
            }, 1000);  // Wait for the transition to finish before hiding
        }, 2500);
    }
});

document.addEventListener('scroll', ()=>{
    const allLeftServices = document.querySelectorAll('.left');
    const allRightServices = document.querySelectorAll('.right');
    const allCenterServices = document.querySelectorAll('.center');
    const screenPosition = window.innerHeight;
    allLeftServices.forEach((val)=>{
        const divPos = val.getBoundingClientRect().top;
        if(divPos < screenPosition){
            val.classList.add('scrolled');
        }
    })
    allRightServices.forEach((val)=>{
        const divPos = val.getBoundingClientRect().top;
        if(divPos < screenPosition){
            val.classList.add('scrolled');
        }
    })
    allCenterServices.forEach((val)=>{
        const divPos = val.getBoundingClientRect().top;
        if(divPos < screenPosition){
            val.classList.add('scrolled');
        }
    })
})