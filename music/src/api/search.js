import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

// 获取热门关键字
export function getHotKey(){
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
    const data = Object.assign({}, commonParams, {
        g_tk: 1928093487,
        platform: 'h5',
        needNewCode: 1,
    })
    return jsonp(url, data, options)
}

// 获取检索列表数据
export function search(query, page, zhida, perpage = 20){
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    const data = Object.assign({}, commonParams, {
        w: query,
        p: page,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage,
        n: perpage,
        remoteplace: 'txt.mqq.all',
        uid: 0,
        needNewCode: 1,
        platform: 'h5',
        g_tk: 1928093487,
    })
    return jsonp(url, data, options)
}
