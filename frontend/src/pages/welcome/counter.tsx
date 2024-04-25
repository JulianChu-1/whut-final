import {useEffect, useRef, useState} from 'react';
 
const Counter = ({counts, time = 500}) => {  //counts：传入的数字，time: 默认500毫秒之内整个动画完成
    const [count, setCount] = useState(0);
    useEffect(() => {
        let startTime = Date.now();
        let duration = 2000;
        const timer = setInterval(() => {
            setCount(() => {
                //数字增长逻辑：.定时操作
                let after = Math.ceil((Date.now()-startTime)/duration*counts*100)/100;
                if(after > counts) {
                    clearInterval(timer);
                    after = counts;
                }
                return after;
            });
        }, 16);
        return () => clearInterval(timer);
    }, [counts]);
    return count;
 
}
export default Counter;