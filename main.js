//var for froms
let form = document.getElementsByClassName("form-style")
//var for full name text field
let fullName = document.getElementsByClassName("name")[0]
//var for get email text field
let email = document.getElementsByClassName("email")[0]
//var for phone number
let number  = document.getElementsByClassName("phone")[0]
//var for male and female radio buttons and their box
let male = document.getElementById("m")
let female = document.getElementById("f")
let genderBox = document.getElementsByClassName("btn-box")[0]
//var for  qr img
let qrimg = document.getElementsByClassName("qr")[0]

//vars for red error messages under the fields
let nameError = document.getElementsByClassName("name-error")[0]
let emailError = document.getElementsByClassName("email-error")[0]
let phoneError = document.getElementsByClassName("phone-error")[0]
let genderError = document.getElementsByClassName("gender-error")[0]
let qrError = document.getElementsByClassName("qr-error")[0]
let sendError = document.getElementsByClassName("send-error")[0]



//send status for registration form
let send_staus = false;



// when submitting registeration form
form[0].onsubmit = function(e){
    e.preventDefault()

    //clean the phone before checking it (spaces, 0 at start)
    cleanPhone();

    //run every check so all wrong fields turn red together
    let nameOk = validateName();
    let emailOk = validateEmail();
    let phoneOk = validatePhone();
    let genderOk = validateGender();

    if(!(nameOk && emailOk && phoneOk && genderOk)){
        //take the user to the first wrong field
        let firstWrong = form[0].getElementsByClassName("invalid")[0]
        firstWrong.scrollIntoView({block: "center"})
        if(firstWrong.tagName === "INPUT"){
            firstWrong.focus()
        }
        return;
    }

    generateId();
    returnId();
    send_staus = true;
    clearError(null, sendError);
};
//submenting second form
form[1].onsubmit = function(e){
    e.preventDefault();
    if(send_staus === true ){
     sendVerfication();
     clearError(null, sendError);
    }else {
        showError(null, sendError, "Please fill the registration form and press Generate ID first");
    }
}



//check the fields again while the user fixes them
fullName.onblur = validateName;
email.onblur = validateEmail;
number.onblur = function(){
    cleanPhone();
    validatePhone();
}
male.onchange = validateGender;
female.onchange = validateGender;

//once a field is red, re check it on every key so the red goes away when it is fixed
fullName.oninput = function(){ if(fullName.classList.contains("invalid")) validateName() }
email.oninput = function(){ if(email.classList.contains("invalid")) validateEmail() }
number.oninput = function(){ if(number.classList.contains("invalid")) validatePhone() }



//show red message under the field, returns false so checks can return it
function showError(field, errorBox, message){
    if(field){
        field.classList.add("invalid")
    }
    errorBox.textContent = message;
    return false;
}

//remove the red message, returns true so checks can return it
function clearError(field, errorBox){
    if(field){
        field.classList.remove("invalid")
    }
    errorBox.textContent = "";
    return true;
}



//full name: letters only (arabic or english), at least first and last name
function validateName(){
    let value = fullName.value.trim();
    if(value === ""){
        return showError(fullName, nameError, "Please enter your full name");
    }
    if(!/^[A-Za-z؀-ۿ\s'-]+$/.test(value)){
        return showError(fullName, nameError, "Name can only contain letters");
    }
    if(value.split(/\s+/).length < 2){
        return showError(fullName, nameError, "Please enter at least your first and last name");
    }
    return clearError(fullName, nameError);
}

//email: something@something.something
function validateEmail(){
    let value = email.value.trim();
    if(value === ""){
        return showError(email, emailError, "Please enter your email");
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)){
        return showError(email, emailError, "Please enter a valid email, example: name@mail.com");
    }
    return clearError(email, emailError);
}

//phone: sudanese number +249 then 9 digits starting with 1 or 9
function validatePhone(){
    let value = number.value;
    if(value === ""){
        return showError(number, phoneError, "Please enter your phone number");
    }
    if(!/^\+249[19]\d{8}$/.test(value)){
        return showError(number, phoneError, "Please enter a valid Sudanese number, example: +249912345678");
    }
    return clearError(number, phoneError);
}

//remove spaces and dashes, and turn 0912345678 into +249912345678
function cleanPhone(){
    let value = number.value.replace(/[\s-]/g, "");
    if(/^0[19]\d{8}$/.test(value)){
        value = "+249" + value.slice(1);
    }
    number.value = value;
}

//gender: male or female must be chosen
function validateGender(){
    if(!male.checked && !female.checked){
        return showError(genderBox, genderError, "Please choose male or female");
    }
    return clearError(genderBox, genderError);
}



//when the qr image can not load (no internet or qr site down)
qrimg.onerror = function(){
    //only for the generated qr, not the local placeholder image
    if(qrimg.src.indexOf("qrserver") !== -1){
        showError(null, qrError, "Could not load the QR code. Check your internet and press Generate ID again");
    }
}
qrimg.onload = function(){
    clearError(null, qrError);
}



//genrate the qr code id from phone and email
function generateId(){
    let l4 = (number.value.slice(-4) * 7800).toString();
    let last4digitsliced = l4.slice(0,4)
    let first_email_char = email.value.trim().slice(0,1)
    let third_email_char = email.value.trim().slice(2,3)
    let ID =  `${first_email_char}${last4digitsliced}${third_email_char}`
    //encode so characters like + or & in the email do not break the link
    let qrgen = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ID)}`
    qrimg.src = qrgen;
    return ID;
}


//return the id into id and email to qr field
function returnId(){
    form[1][0].value = generateId();  //form[1][0] id field input in the second form
    form[1][1].value = email.value.trim();  // form[1][1] email input field in the second from
}



function sendVerfication(){
    //messages for users, made here so they have the name the user typed
    let message1 = `An email has been sent to ${fullName.value.trim()} to attend the Made In Sudan event`
    let message2 = `Welcome ${fullName.value.trim()} in our event`
    form[1][2].value = message1;
}
