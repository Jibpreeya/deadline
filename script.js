// ควบคุมการเข้าถึงผ่านตัวแปรต่างใน element ด้วยการสร้างตัวแปรขึ้น
const countDownForm=document.getElementById('countDownForm');
const inputContainer=document.getElementById('input-container');
const dateEl=document.getElementById('date-picker');
const countDownEl=document.getElementById('countdown');

const countdownTitleEl=document.getElementById('countdown-title');
const countdownButtonEl=document.getElementById('countdown-button');
const timeEl=document.querySelectorAll('span');

const completeEl=document.getElementById('complete');
const completeInfoEl=document.getElementById('complete-info');
const completeButtonEl=document.getElementById('complete-button');



//ตัวแปรควบคุมการทำงาน
let countDownTitle='';
let countDownDate='';

let countDownValue=Date; //เก็บวันที่เลือกจากform
let countDownActive; // ตัวนับเวลา
let saveCountDown; //เก็บข้อมูลหัวข้อและวันแจ้งเตือน(obj)

//ตัวแปรแปลงหน่วยเวลา
const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;

countDownForm.addEventListener('submit', updateCountDown);

function updateCountDown(e){
    e.preventDefault();
    console.log(e.srcElement[0].value);
    countDownTitle=e.srcElement[0].value;
    countDownDate=e.srcElement[1].value;

    if(countDownTitle === ''){
        alert("incomplete!!!")
    }else{
        saveCountDown={title:countDownTitle,date:countDownDate};
        localStorage.setItem('countDown',JSON.stringify(saveCountDown));
        countDownValue=new Date(countDownDate).getTime();
        setUpTime();
    }
}

function setUpTime(){
    countDownActive=setInterval(()=>{
        //เวลาตั้ง-ปัจจุบัน
        const now = new Date().getTime();
        const distance = countDownValue - now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance%day)/hour);
        const minutes = Math.floor((distance%hour)/minute);
        const seconds = Math.floor((distance%minute)/second);
        inputContainer.hidden=true;
        

        if(distance<0){
            //หมดเวลา
            countDownEl.hidden=true;
            completeEl.hidden=false;
            completeInfoEl.textContent= `${countDownTitle} Date: ${countDownDate}`;
            clearInterval(countDownActive);
        }else{
            countdownTitleEl.textContent= `${countDownTitle}`
            //นับถอยหลัง
            timeEl[0].textContent=`${days}`;
            timeEl[1].textContent=`${hours}`;
            timeEl[2].textContent=`${minutes}`;
            timeEl[3].textContent=`${seconds}`;
            countDownEl.hidden=false;
            completeEl.hidden=true;
        }
    },second);
}

function callDataInStore(){
    if(localStorage.getItem('countDown')){
        inputContainer.hidden=true;
        saveCountDown=JSON.parse(localStorage.getItem("countDown"));
        countDownTitle=saveCountDown.title;
        countDownDate=saveCountDown.date;
        countDownValue=new Date(countDownDate).getTime();
        setUpTime();
    }

}
function reset(){
    localStorage.removeItem("countDown");
    countDownEl.hidden=true;
    completeEl.hidden=true;
    inputContainer.hidden=false;
    clearInterval(countDownActive);
    countDownTitle='';
    countDownDate='';
}
callDataInStore();

countdownButtonEl.addEventListener('click', reset);
completeButtonEl.addEventListener('click', reset);