document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector("#loading-screen");
    const loadHeading = document.querySelector('.load');
    setTimeout(()=>{
        loadingScreen.style.display = "none";
        loadHeading.style.display = 'none';
    },1000);
});