const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copybtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const inputSlider=document.querySelector("[data-lengthSlider]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symble='!@#$%^&*()_+}{|":?><\';/.,~`'


let password="";
let passwordLength=15;
let checkCount=1;
handleSlider();

//  set password length
// function handleSlider(){
//     inputSlider.value=passwordLength;
//     lengthDisplay.innerText=inputSlider.value;

// }
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText =passwordLength;
}

function setIndicator(color){
    indicator.style.background=color;
    indicator.style.boxShadow = ` 2px 4px 6px ${color}`;
}

function getRanInteger(min,max){
    return Math.floor( Math.random()*(max-min))+min;
}

function getRendomNumber(){
    return getRanInteger(0,9);

}

function getUppercase(){
    return String.fromCharCode(getRanInteger(65,91));
}

function getLowercase(){
    return String.fromCharCode(getRanInteger(97,123));
}

function getSymbols(){
    let a = getRanInteger(0,symble.length);
    return symble.charAt(a);

}

function calcStrength(){
    let hasupper=false;
    let haslower=false;
    let hasnumbe=false;
    let hassymbol=false;
    if(uppercaseCheck.checked)hasupper=true;
    if(lowercaseCheck.checked)haslower=true;
    if(symbolCheck.checked)hassymbol=true;
    if(numbersCheck.checked)hasnumbe=true;
    if(hasupper && haslower && (hasnumbe||hassymbol) && passwordLength >=8 ){
        setIndicator("#006400");
    }
    else if((hasnumbe||hassymbol) && (hasupper || haslower) && passwordLength >=6){
        setIndicator("#FFFF00");
    }
    else{
        setIndicator("#FF0000");
    }

}



inputSlider.addEventListener('input',function(e){
    passwordLength=e.target.value;
    handleSlider();
    
})

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText='copied';
    }
    catch(e){
        copyMsg.innerText='failed';
    }

    copyMsg.classList.add("Active");

    setTimeout(function () {
        copyMsg.classList.remove("Active")
    },2000);
}

function handlecheckboxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;

    });


    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleSlider();

    }  


}

allCheckBox.forEach(function(checkbox){
    checkbox.addEventListener('change',handlecheckboxChange)

})


copybtn.addEventListener('click', () =>{
    if(passwordDisplay.value)
        copyContent();
})


// generateBtn.addEventListener('click',() => {
//     if(checkCount <=0) return;

//     if(passwordLength < checkCount){
//         passwordLength=checkCount;
//         handleSlider();
//     }

//     password="";

//     if(uppercaseCheck.checked){
//         password +=getUppercase();
//     }

//     if(lowercaseCheck.checked){
//         password +=getLowercase();
//     }
//     if(numbersCheck.checked){
//         password +=getRendomNumber();
//     }
//     if(symbolCheck.checked){
//         password +=getSymbols();
//     }

//     passwordDisplay.value=password;

// })

function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random() * (i+1))
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((element) => (str+=element));
    return str;

}


generateBtn.addEventListener('click', () => {
    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
password="";

let funcarr=[];

if(uppercaseCheck.checked)
    funcarr.push(getUppercase);
if(lowercaseCheck.checked)
    funcarr.push(getLowercase);

if(numbersCheck.checked)
    funcarr.push(getRendomNumber);

if(symbolCheck.checked)
    funcarr.push(getSymbols);



// conpulsory addition
for(let i=0;i<funcarr.length;i++){
    password+=funcarr[i]();

}

// remaining addition
for(let i=0;i<passwordLength-funcarr.length;i++){
    let randInteger=getRanInteger(0,funcarr.length);
    password+=funcarr[randInteger]();

}

// sufful password
password=shufflePassword(Array.from(password));


// password=shufflePassword(password);
passwordDisplay.value=password;
calcStrength();

});

