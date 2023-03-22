$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 为发送按钮绑定点击事件
    $('#btnSend').on('click',function(){
        let text = $('#ipt').val().trim()
        // 判断输入框是否为空
        if(text.length<=0){
            // 清除输入框中的内容
            return $('#ipt').val('')
        }
        // 将用户输入的内容追加到页面中
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+text+'</span></li>')
        $('#ipt').val('')
        // 重置滚动条的位置
        resetui()
        // 发起请求，获取聊天内容
        getMsg(text)
    })

    // 定义一个函数获取机器人的消息
    function getMsg(text){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{
                spoken:text
            },
            // 接收聊天的消息
            success:function(res){
                console.log(res);
                if(res.message=='success'){
                    let msg = res.data.info.text
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+msg+'</span></li>')
                    // 重置滚动条
                    resetui()
                    getVoice(msg)
                }
            }
        })
    }

    // 将机器人的消息转化为语音进行播放
    function getVoice(text){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function(res){
                // console.log(res);
                if(res.status === 200){
                    $('#voice').attr('src',res.voiceUrl)
                }
            }
        })
    }

    // 按回车键发送
    $('#ipt').on('keydown',function(e){
        if(e.key == 'Enter'){
            $('#btnSend').click()
        }
    })
  })