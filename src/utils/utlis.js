export default function refromatDate(date){
    let dateTimeArray = date.split("T");
    let dateArray = dateTimeArray[0].split("-");
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
}