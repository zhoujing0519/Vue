import originJSONP from 'jsonp'
export default function jsonp(url, data, option){
    // 如果url没有问号，给第一个字符添加问号
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        });
    });
}

function param(data){
    let url = '';
    for(var k in data){
        let value = data[k] !== undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`;
    }

    return url ? url.substring(1) : '';
}
