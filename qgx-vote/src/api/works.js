import axios from 'axios'
import {ERR_OK} from 'common/js/config'

export function getWorks(){
    const url = '/api/works'

    axios.get(url).then((res) => {
        if(res.data.errno === ERR_OK) return res.data.data
    }).catch(err => {
        alert('网络错误，无法获取数据！');
    })
}
