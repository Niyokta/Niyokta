export function convertRatingToStar(rating:String):String{
    const numRating=Number(rating)
    const whiteStar="\u2606";
    const yellowStar="\u2B50"
    const maxRating=5;
    if(numRating===0) return whiteStar.repeat(5);
    if(numRating===maxRating) return yellowStar.repeat(5);
    const floorRating=Math.round(numRating)
    let answer="";
    for(let i=0;i<floorRating;i++) answer=answer+yellowStar;
    const remaining=maxRating-floorRating;
    for(let i=0;i<remaining;i++) answer=answer+whiteStar;
    return answer;
}