type userCreds={
    username:string,
    email:string,
    password:string,
    cnfpassword:string,
    country:string,
    working_hour:string,
    birth_date:string
}
type Socials={
    linkedin:string,
    github:string,
    x:string
}
export default function validate(usercreds:userCreds,socials:Socials){
    const email=usercreds.email;
    const username=usercreds.username;
    const password=usercreds.password;
    const confirmpassword=usercreds.cnfpassword
    const dob=usercreds.birth_date
    const linkedin=socials.linkedin;
    const github=socials.github;
    const x=socials.x;
    
    if(username.length < 8) return "Username should be of atleast 8 characters";
    if(!email.includes("@") || !email.includes(".com")) return "Invalid Email ID";
    const checkpassword=checkPassword(password);
    if(checkpassword!="Ok") return checkpassword;
    if(password != confirmpassword) return "Password does not match";
    const checkdob=checkDOB(dob);
    if(checkdob!="Ok") return checkdob
    const checksocials=checkSocials(linkedin,github,x);
    if(checksocials!="Ok") return checksocials
    return "Ok";
}

function checkSocials(linkedin:string,github:string,x:string){
    if(!linkedin.includes(".com") || !github.includes(".com") || !x.includes(".com")) return "Invalid social link";
    return "Ok"
}
function checkDOB(DOB:string){
    const uset=new Set(["0","1","2","3","4","5","6","7","8","9","-"]);
    for(const char of DOB){
        if(!uset.has(char)) return "Invalid format for D.O.B";
    }
    if(DOB.charAt(2)!="-" || DOB.charAt(5)!="-" || DOB.length!=10) return "Invalid format for D.O.B . Use 01 instead of simply 1";
    return "Ok";
}

function checkPassword(password:string){
    if(password.length < 8) return "Password should be of atleast 8 characters";
    const nums=["1","2","3","4","5","6","7","8","9","0"];
    const special=["!","@","#","$","%","^","&","*","(",")","-","+","_"];
    let containsnums=false;
    let containsspecial=false;
    nums.map((num)=>{
        if(password.includes(num)) containsnums=true;
    })
    special.map((special)=>{
        if(password.includes(special)) containsspecial=true;
    })
    if(!containsnums) return "Password must contain a numeric value";
    if(!containsspecial) return "Password must contain a special character";
    return "Ok";
}

