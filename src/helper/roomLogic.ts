export function extractRoomName(roomname:String,name:String):String{
    const namesinroom=roomname.split("_");
    if(namesinroom[0]===name){
        return namesinroom[1];
    }
    return namesinroom[0];
}