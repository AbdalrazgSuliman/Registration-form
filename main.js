//var for froms
let form = document.getElementsByClassName("form-style")
//var for get email text field
let email = document.getElementsByClassName("email")[0]
//var for phone number
let number  = document.getElementsByClassName("phone")[0]
//var for  qr img
let qrimg = document.getElementsByClassName("qr")[0]






// when submitting registeration form
form[0].onsubmit = function(e){
    generateId();
    returnId();


e.preventDefault()
}; 

form[1].onsubmit = function(e){
    sendVerfication();
    e.preventDefault()
}


//messages for users

let message1 = `An email has been sent to ${form[0][0].value} to attend the Made In Sudan event` //form[0][0] == name
let message2 = `Welcome ${form[0][0].value} in our event`


//genrate the qr code id from phone and email
function generateId(){
    let l4 = (number.value.slice(-4) * 7800).toString();
    let last4digitsliced = l4.slice(0,4)
    let first_email_char = email.value.slice(0,1)
    let third_email_char = email.value.slice(2,3)
    let ID =  `${first_email_char}${last4digitsliced}${third_email_char}`
    let qrgen = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ID}`
    qrimg.src = qrgen;
    return ID;
}


//return the id into id and email to qr field
function returnId(){
    form[1][0].value = generateId();  //form[1][0] id field input in the second form
    form[1][1].value = email.value;  // form[1][1] email input field in the second from
}



function sendVerfication(){
    form[1][2].value = message1;
}