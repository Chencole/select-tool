demo preview  
===
![](https://github.com/Chencole/select-tool/blob/master/images/preview.gif)使用方法  
  
  
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
        initTarget: '.selectDashboard',
        selectElement: '.selectItem',
        optionalContentmenu: { single: ['修改', '删除', '上架', '下架'], multiple: ['批量删除', '批量上架', '批量下架'] },
        crudEventCallback(handleTitle, event, selectNode) {
            console.log(handleTitle, event, selectNode);
        },
        itemClick(data, event) {
            console.log(data, event);
        },
        selectedEventListener(arr) {
            console.log(arr);
        }
    });
```
initTarget  
![](https://github.com/Chencole/select-tool/blob/master/images/initSelectBox.png)  
selectElement  
![](https://github.com/Chencole/select-tool/blob/master/images/selectItemAndIds.png)  
