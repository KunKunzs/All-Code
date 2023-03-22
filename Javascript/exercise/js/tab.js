let that
class Tab {
    constructor(id) {
        that = this
        // 获取元素
        this.main = document.querySelector(id)
        this.ul = this.main.querySelector('.firstnav ul:first-child')
        this.fsection = this.main.querySelector('.tabscon')
        this.add = this.main.querySelector('.tabadd')

        this.init()
    }

    // 初始化
    init() {
        this.updateNode()
        // 让相关的元素绑定事件
        this.add.onclick = this.addTab
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
            this.remove[i].onclick = this.removeTab
            this.spans[i].ondblclick = this.editTab
            this.sections[i].ondblclick = this.editTab
        }
    }

    // 获取所有的li，section和叉号
    updateNode() {
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.remove = this.main.querySelectorAll('.icon-guanbi')
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child')
    }

    // 1.切换功能
    toggleTab() {
        that.clearClass()
        this.className = "liactive"
        that.sections[this.index].className = "conactive"
    }
    // 清除样式
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.sections[i].className = " "
            this.lis[i].className = " "
        }
    }
    // 2.添加功能
    addTab() {
        // 清除其它选项卡的样式
        that.clearClass()
        // 添加li和section
        let li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
        let section = '<section class="conactive">新内容</section>'
        // 将li和section追加到父元素中
        that.ul.insertAdjacentHTML('beforeend', li)
        that.fsection.insertAdjacentHTML('beforeend', section)
        that.init()
    }
    // 3.删除功能
    removeTab(e) {
        // 阻止冒泡
        e.stopPropagation()
        let index = this.parentNode.index
        // 删除选项卡
        that.lis[index].remove()
        that.sections[index].remove()
        // 更新选项卡
        that.init()
        // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
        if (document.querySelector('.liactive')) return;
        // 当我们删除了选中状态的这个li 的时候，让它的前一个li处于选定状态
        index--
        // 手动调用点击事件，不需要鼠标触发
        that.lis[index] && that.lis[index].click()

    }
    // 4.修改功能
    editTab() {
        // 获取原来选项卡的内容
        let str = this.innerHTML
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        // 双击生成文本框
        this.innerHTML = '<input type = "text" />'
        // 获取文本框
        let input = this.children[0]
        // 将选项卡的内容添加到文本框
        input.value = str
        // 让文本框中的内容处于选中状态
        input.select()
        // 当离开文本框时，将文本框中的值给选项卡
        input.onblur = function(){
            this.parentNode.innerHTML = this.value
        }
        input.onkeyup = function(e){
            if(e.key === 'Enter'){
                this.blur()
            }
        }
    }
}
new Tab('#tab')