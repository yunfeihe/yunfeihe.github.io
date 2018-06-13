
function sleep(time: number) {
    if (time > 0) {
        let timeA = new Date().getTime();
        while(true) {
            let timeB = new Date().getTime();
            if((timeB - timeA) >= time) {
                break;
            }
        }
        console.log('已经过去' + time + 'ms');
    }
}





export default {
    sleep,
    randomBetween(a, b):number {
        let [max, min] = [Math.max(a, b), Math.min(a, b)];
        let result = min + ((max - min) * Math.random());
        return Math.round(result);
    }
}