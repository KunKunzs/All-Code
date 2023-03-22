function resolveData(data) {
    let arr = []
    // k代表键，data[k]代表值
    for (let k in data) {
        let str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&')
}

// let res = resolveData({ name: 'zs', age: 23 })
// console.log(res);

function ajax(options) {
    let xhr = new XMLHttpRequest()
    // 将外界传进来的参数对象转化为查询字符串
    let qs = resolveData(options.data)

    if (options.method.toUpperCase() == 'GET') {
        // 发起get请求
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()

    } else if (options.method.toUpperCase() == 'POST') {
        // 发起post请求
        xhr.open(options.method,options.url)
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(qs)
    }


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}