$(function () {
    // 定义时间补零函数
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        }
        else {
            return n
        }
    }

    // 定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        // 定义年月日
        let dt = new Date(dtStr)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth())
        let d = padZero(dt.getDate())

        // 定义时分秒
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义获取新闻列表的函数
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function (res) {
            // 判断是否获取成功
            if (res.status !== 200) {
                return alert('获取新闻列表失败！')
            }
            // 将字符串转化为字符串数组
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].tags = res.data[i].tags.split(',')
            }

            let htmlStr = template('tpl-news', res)
            $('#news-list').html(htmlStr)
        })
    }
    getNewsList()
})