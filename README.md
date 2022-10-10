demo preview  
===
![](https://github.com/Chencole/select-tool/blob/master/images/preview.gif)  
  
  
  
使用方法  
===
  
  
step1: 引入脚本  
```javascript
<script src="./js/selectTool.js"></script>
```
step2：创建被初始化的html元素（.selectDashboard），包含可选的容器同时又是可以框选的范围（.selet_tool_canvas），和可被选中的容器(.selectItem)  
```javascript
<div class="selectDashboard">
        <div class="selet_tool_canvas">
            <div class="selectItem" customAttribute='this custom attribute' ids="1"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="2"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="3"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="4"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="5"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="6"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="7"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="8"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="9"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="10"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="11"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="12"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="13"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="14"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="15"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="16"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="17"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="18"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="19"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="20"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="21"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="22"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="23"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="24"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="25"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="26"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="27"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="28"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="29"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="30"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="31"></div>
            <div class="selectItem" customAttribute='this custom attribute' ids="32"></div>
        </div>
    </div>
```  
  
step3：调用函数传入初始化参数  
```javascript
selectToolInit({
        canvas:'.selectDashboard',
        initTarget:'.selet_tool_canvas',
        selectElement:'.selectItem',
        // onloadBanRightClickTarget:'.resultContent',  ban browser contentmenu if mutiple select-tool methods in page
        optionalContentmenu:{single:['修改','删除','下发课程','上架','下架'],multiple:['批量删除','批量下发课程','批量上架','批量下架']},
        customAttribute:['customAttribute'],
        crudEventCallbackSingle(handleTitle,event,selectNode){
            console.log('click select tool contentmenu==================>',handleTitle,event,selectNode)
        },
        crudEventCallbackMultiple(handleTitle,event,selectNode){
            console.log('click select tool contentmenu==================>',handleTitle,event,selectNode)
        },
        itemClick(basedata,event){
            console.log('click item==================>',basedata)
        },
        selectedEventListener(arr,selectedNode){
            console.log('selected==================>',arr,selectedNode)
        },
        batchStatus(status) {
            console.log(status)
        }
    })
```
canvas  
![](https://github.com/Chencole/select-tool/blob/master/images/initSelectBox.png)  
initTarget  
![](https://github.com/Chencole/select-tool/blob/master/images/select_tool_canvs.png)  
selectElement  
![](https://github.com/Chencole/select-tool/blob/master/images/selectItemAndIds.png)  
useed select-tool in your vue project
``` javascript
npm install -D select-tool
```
