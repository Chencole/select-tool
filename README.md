demo preview  
===
![](https://github.com/Chencole/select-tool/blob/master/images/preview.gif)  
  
  
  
使用方法  
===
  
  
step1: 引入脚本  
```javascript
<script src="./js/selectTool.js"></script>
```
step2：创建被初始化的html元素包含可被选中的div或任意元素标签（.selectDashboard），和可被选中的任意html标签(.selectItem)  
![](https://github.com/Chencole/select-tool/blob/master/images/bind.png)  
  
step3：调用函数传入初始化参数  
```javascript
selectToolInit({
        canvas:'.selectDashboard',
        initTarget:'.selet_tool_canvas',
        selectElement:'.selectItem',
        // onloadBanRightClickTarget:'.resultContent',  ban browser contentmenu if mutiple select-tool methods in page
        optionalContentmenu:{single:['修改','删除','下发课程','上架','下架'],multiple:['批量删除','批量下发课程','批量上架','批量下架']},
        customAttribute:['customAttribute'],
        crudEventCallback(handleTitle,event,selectNode){
            console.log('click select tool contentmenu==================>',handleTitle,event,selectNode)
        },
        itemClick(basedata,event){
            console.log('click item==================>',basedata)
        },
        selectedEventListener(arr){
            console.log('selected==================>',arr)
        }
    })
```
canvas  
![](https://github.com/Chencole/select-tool/blob/master/images/select_tool_canvs.png)  
initTarget  
![](https://github.com/Chencole/select-tool/blob/master/images/initSelectBox.png)  
selectElement  
![](https://github.com/Chencole/select-tool/blob/master/images/selectItemAndIds.png)  
