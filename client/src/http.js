import Axios from 'axios';
import { Loading } from 'element-ui';

let loading;
function startLoading(){
    loading = Loading.service({
        lock: true,
        text:"加载中",
        background: 'rgba(0,0,0,0.5)'
    });
}

function endLoading(){
    Loading.close();
}
// 请求拦截



// 相应拦截



export default Axios;