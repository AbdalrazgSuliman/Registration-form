//var for from
let form =document.getElementsByClassName("form-style")[0]

//var for get email text field
let email = document.getElementsByClassName("email")[0]


//var for  qr img
let qrimg = document.getElementsByClassName("qr")[0]

//var for qr generation
let qrgen = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${email.value}`


// when submitting registeration form
form.onsubmit = function(e){

 qrimg.src = qrgen;
e.preventDefault()
}; 
