import { checkCountryValidity, checkDOB, checkEmailValidity, checkPasswordConfirmation, checkPasswordValidity, checkUsernameValidity } from "./fieldValidations";

type ValidatorReturnType={
    status:number,
    message:string
}

export default function validateCredentials(username:string,password:string,confirmpassword:string,DOB:string,email:string,country:string):ValidatorReturnType{
    let status=200;
    let message="All good to go";
    if(checkUsernameValidity(username)==false){
        status=400;
        message="Username must of atleast of 8 characters";
    }
    else if(checkPasswordValidity(password)==false){
        status=400;
        message="Password must not be empty";
    }
    else if(checkPasswordConfirmation(password,confirmpassword)==false){
        status=400;
        message="Password and Confirma Password not matching!";
    }
    else if(checkCountryValidity(country)==false){
        status=400;
        message="Country Name must not be empty!";
    }
    else if(checkEmailValidity(email)==false){
        status=400;
        message="Email must be valid";
    }
    else if(checkDOB(DOB)==false){
        status=400;
        message="Incorrect format for DOB";
    }

    return {
        status:status,
        message:message
    }
}