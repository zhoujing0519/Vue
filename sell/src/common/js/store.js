export function saveToLocal(id, key, val){
    let seller = window.localStorage.__seller__;
    if(!seller){ // 如果一个商家都没有存储，创建一个空对象
        seller = {};
        seller[id] = {};
    }else{
        seller = JSON.parse(seller); // 将字符串解析成json对象
        if(!seller[id]){ // 如果该商家尚未在localStorage.__seller__中注册，创建一个空对象
            seller[id] = {};
        }
    }
    seller[id][key] = val; // 将值赋值到商家对象中

    window.localStorage.__seller__ = JSON.stringify(seller); // 将对象转成字符串至localStorage.__seller__中
};

export function loadFromLocal(id, key, def){
    let seller = window.localStorage.__seller__;
    if(!seller) return def;
    seller = JSON.parse(seller);
    if(!seller[id]) return def;
    let ret = seller[id][key];
    return ret || def;
};
