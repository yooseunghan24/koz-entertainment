const main = document.querySelector("main");
const slideWrap = document.querySelector(".slide_wrap");
const slideWrapImg = document.querySelectorAll(".content_img img");
const prevBtn = document.querySelector(".prev_btn");
const nextBtn = document.querySelector(".next_btn");
const slideContent = document.querySelectorAll(".slide_content");
let slideIndex = 0;
function slideShow() {
  slideIndex >= 1
    ? (prevBtn.style.display = "block")
    : (prevBtn.style.display = "none");
  switch (slideIndex) {
    case 0:
      slideWrap.style.transform = "translateX(15vw)";
      toNum = 15;
      break;
    case 1:
      slideWrap.style.transform = "translateX(-50vw)";
      toNum = 50;
      break;
    case 2:
      slideWrap.style.transform = "translateX(-110vw)";
      toNum = 110;
      break;
    case 3:
      slideWrap.style.transform = "translateX(-175vw)";
      toNum = 175;
      break;
  }
  for (let i of slideContent) {
    i.classList.remove("active");
  }
  slideContent[slideIndex].classList.add("active");
  //console.log(slideContent[slideIndex].getBoundingClientRect().width);
}
prevBtn.addEventListener("click", function () {
  slideIndex === 0 ? (slideIndex = 0) : (slideIndex -= 1);
  slideShow();
});
nextBtn.addEventListener("click", function () {
  slideIndex === 3 ? (slideIndex = 3) : (slideIndex += 1);
  slideShow();
});
/* 슬라이드 드래그 */
let isClicked = false;
let start = 0;
let move = 0;
let distance = 0;
let total = 0;
let toNum = 0;
// 이미지, a태그 복사 막아서 isClicked가 false가 안되는 현상 방지
for (let i = 0; i < slideWrapImg.length; i++) {
  slideWrapImg[i].setAttribute("draggable", false);
  slideContent[i].setAttribute("draggable", false);
}
main.addEventListener("mousedown", function (e) {
  if (!e.target === e.currentTarget) return;
  isClicked = true;
  start = e.clientX;
});
main.addEventListener("mousemove", function (e) {
  if (!isClicked) return;
  move = e.clientX;
  distance = start - move;
  toNum = Math.floor((total + distance) / 10);
  slideWrap.style.transform =
    toNum <= 15 ? `translateX(${toNum}vw)` : `translateX(-${toNum}vw)`;
  console.log(toNum);
});
main.addEventListener("mouseup", function () {
  isClicked = false;
  total += distance;
  console.log("뗐을때", toNum);
  if (toNum < 32.5) {
    slideIndex = 0;
    slideShow();
  } else if (toNum < 80) {
    slideIndex = 1;
    slideShow();
  } else if (toNum < 142.5) {
    slideIndex = 2;
    slideShow();
  } else {
    slideIndex = 3;
    slideShow();
  }
  console.log(slideIndex, "슬인덱스");
});
main.addEventListener("mouseleave", function () {
  isClicked = false;
});
