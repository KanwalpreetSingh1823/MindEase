document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector(".loading");
    const mainData = document.querySelector(".main-content");
    
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.transition = 'opacity 0.5s ease';
            loadingScreen.style.opacity = 0;

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainData.style.display = "block";
            }, 1000);  // Wait for the transition to finish before hiding
        }, 4000);
    }
});

// document.addEventListener("DOMContentLoaded",()=>{
//     let head = document.querySelector("#main-head");
//     let text = head.textContent;
//     head.innerHTML = "";

//     let i = 0;
//     function autoType(){
//         if(i<text.length){
//             head.innerHTML += text.charAt(i);
//             i++;
//         }
//         if(i<text.length){
//             setTimeout(autoType,100);
//         }
//     }
//    autoType();
// })