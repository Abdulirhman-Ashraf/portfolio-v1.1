let card = document.querySelectorAll("#collection a");
let btn = document.querySelector("#show");
// PWA Button

let installBtn = document.getElementById("install");
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  // stop there browser
  e.preventDefault();
  // plz wait here and dont worry
  deferredPrompt = e;
  installBtn.style.display = "block";
});
// button click function

if(installBtn){

  installBtn.addEventListener("click", async (e) => {
    // 1-is hijack success? yes
    if (deferredPrompt) {
      // 2-show installation options
      
      deferredPrompt.prompt();
      // 3-store user choice in outcome
      const { outcome } = await deferredPrompt.userChoice;
      // 4-if user accepted display none to button
      
      if (outcome === "accepted") {
        installBtn.style.display = "none";
      } else {
      console.log("user dismissed");
    }
    deferredPrompt = null;
  }
});
}
// navbar for mobile
let btnMenu = document.querySelector(".menu");

let uls = document.querySelector(".ulMenu");

btnMenu.addEventListener("click", function () {
  uls.classList.toggle("toggleMenu");
});
// textArea Limit Character
let max = document.querySelector(".max");
let textarea = document.querySelector("textarea");
function textLimit() {
  max.innerHTML = `Remaining Character : ${250 - textarea.value.length}`;
}

// show more function
btn.addEventListener("click", function show() {
  if (btn.innerHTML == "Show more") {
    btn.innerHTML = "Hide";
  } else if (btn.innerHTML == "Hide") {
    btn.innerHTML = "Show more";
  }

  for (let i = 3; i < card.length; i++) {
    card[i].classList.toggle("showMore");
    card[i].classList.toggle("hidden");
  }
});

if(navigator.serviceWorker){
  navigator.serviceWorker.register("../sw.js")
  .then((reg)=>{
console.log("file is register" ,reg)
  }).catch((err)=>console.log("Error",err))
}