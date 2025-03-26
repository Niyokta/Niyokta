function checkUsernameValidity(username:string):boolean{
    if(username.length < 8) return false;
    return true;
}

function checkPasswordValidity(password:string):boolean{
    if(password.length==0) return false;
    return true;
}

function checkPasswordConfirmation(password:string,confirmpassword:string){
    if(password!=confirmpassword) return false;
    return true;
}

function checkDOB(DOB:string):boolean{
    if(DOB.length != 10) return false;
    const format="DD-MM-YYYY";
    let index=0;
    while(index < 10){
        if(format.charAt(index)=="-"){
            if(DOB.charAt(index)!="-") return false; 
        }
        else{
            const charcode=DOB.charCodeAt(index);
            if(charcode < 48 || charcode > 57) return false;
        }
        index++;
    }
    return true;
}

function checkCountryValidity(country:string):boolean{
    if(country.length==0) return false;
    return true;
}

function checkEmailValidity(email:string):boolean{
    if(email.length < 2 || email.charAt(0)=="@") return false;
    const ToInclude=["@",".com"];
    const NotToInclude=["@."];
    for(const c of ToInclude){
        if(!email.includes(c)){
            console.log(c," is not there");
            return false;
        }
    }
    for(const c of NotToInclude){
        if(email.includes(c)){
            console.log(c," is there");
            return false;
        }
    }
    return true;
}
function checkPhoneNumber(phoneNumber:string){
    const temp="0123456789";
    if(phoneNumber.length!=10) return false;

    for(const char of phoneNumber){
        if(!temp.includes(char)){
            return false;
        }
    }
    return true;
}
export {checkCountryValidity,checkDOB,checkEmailValidity,checkPasswordConfirmation,checkPasswordValidity,checkUsernameValidity,checkPhoneNumber}