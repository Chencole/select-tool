// component public variable
let verification = Math.random()
// main function
function selectToolInit(config) {
    let pconfig = config
    let dragMotive = false
    let isDraw
    let startPointX
    let startPointY
    let elemArr = document.querySelectorAll(pconfig.selectElement)
    let initTarget = document.querySelector(pconfig.initTarget)
    let canvas=document.querySelector(pconfig.canvas)
    let batch = false
    if(pconfig.batchStatus)pconfig.batchStatus(false)
    let dragShadowBox
    let mouseActivePointX
    let mouseActivePointY
    let bodyElem = document.querySelector('body')
    let contentmenuSingle
    let contentmenuMultiple
    let singleSelectActiveData
    let selectedArr = []
    let ctrl = false
    let selectedNodeSingle
    if(pconfig.onloadBanRightClickTarget){
        document.querySelector(pconfig.onloadBanRightClickTarget).oncontextmenu = function () { return false; }
    }else {
        canvas.oncontextmenu = function () { return false; }
    }
    canvas.verificationRoot = verification
    canvas.setAttribute('style','width:100%;height:100%;position:relative;')
    initTarget.setAttribute('style', 'display:flex;width:100%;height:auto;flex-wrap:wrap;align-content:flex-start;user-select:none;position:relative;overflow-y:auto;pointer-events:none;')
    function selectToolSktechFc() {
        dragShadowBox = document.createElement('div')
        dragShadowBox.setAttribute('style', `display:flex;background:#d7e2f0;border:1px dashed #62befb;user-select:none;pointer-events:none;top:-1000px;position:absolute;
    z-index:2007;opacity:0.4;`)
        canvas.appendChild(dragShadowBox)
        canvas.addEventListener('mousedown', (e) => {
            if (e.button == 0) {
                if (e.target.handleSingleButton == verification + 'handleSingleButton') {

                } else if (e.target.handleMutipleButton == verification + 'handleMutipleButton') {

                } else {
                    contentmenuSingle.style.top = '-1000px'
                    contentmenuSingle.style.left = '0px'
                    contentmenuMultiple.style.top = '-1000px'
                    contentmenuMultiple.style.left = '0px'
                    isDraw = setTimeout(() => {
                        for (let i = 0; i < elemArr.length; i++) {
                            elemArr[i].style.pointerEvents = 'none'
                        }
                        dragMotive = true
                        for (let i = 0; i < elemArr.length; i++) {
                            let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                            rightNode.style.display = 'block'
                        }
                        if (e.target['verificationRoot']) {
                            dragShadowBox.style.left = e.layerX + 'px'
                            dragShadowBox.style.top = e.layerY + 'px'
                            startPointX = e.layerX
                            startPointY = e.layerY
                        } else {
                            foofoundRightParentNode('verification', e.target, verification)
                            function foofoundRightParentNode(foundType, targetNode, verification) {
                                if (targetNode.parentNode[foundType] == verification) {
                                    dragShadowBox.style.left = targetNode.parentNode.offsetLeft + e.layerX + 'px'
                                    dragShadowBox.style.top = targetNode.parentNode.offsetTop + e.layerY + 'px'
                                    startPointX = targetNode.parentNode.offsetLeft + e.layerX
                                    startPointY = targetNode.parentNode.offsetTop + e.layerY
                                    return
                                } else if (targetNode[foundType] == verification) {
                                    dragShadowBox.style.left = targetNode.offsetLeft + e.layerX + 'px'
                                    dragShadowBox.style.top = targetNode.offsetTop + e.layerY + 'px'
                                    startPointX = targetNode.offsetLeft + e.layerX
                                    startPointY = targetNode.offsetTop + e.layerY
                                    return
                                } else {
                                    foofoundRightParentNode(foundType, targetNode.parentNode, verification)
                                }
                            }
                        }
                        batch = true
                        if(pconfig.batchStatus)pconfig.batchStatus(true)
                    }, 150)
                }
            } else if (e.button == 2 && batch == true) {
                if (e.target['verificationRoot']) {
                    contentmenuMultiple.style.left = e.layerX + 'px'
                    contentmenuMultiple.style.top = e.layerY + 'px'
                } else {
                    foofoundRightParentNode('verification', e.target, verification)
                    function foofoundRightParentNode(foundType, targetNode, verification) {
                        if (targetNode.parentNode[foundType] == verification) {
                            contentmenuMultiple.style.left = targetNode.parentNode.offsetLeft + e.layerX + 'px'
                            contentmenuMultiple.style.top = targetNode.parentNode.offsetTop + e.layerY + 'px'
                            return
                        } else if (targetNode[foundType]) {
                            contentmenuMultiple.style.left = targetNode.offsetLeft + e.layerX + 'px'
                            contentmenuMultiple.style.top = targetNode.offsetTop + e.layerY + 'px'
                            return
                        } else {
                            foofoundRightParentNode(foundType, targetNode.parentNode, verification)
                        }
                    }
                }
            } else if (e.button == 2 && batch == false) {
                if (e.target['verificationRoot']) {
                    // contentmenuSingle.style.left=e.layerX+'px'
                    // contentmenuSingle.style.top=e.layerY+'px'
                } else {
                    foofoundRightParentNode('verification', e.target, verification)
                    function foofoundRightParentNode(foundType, targetNode, verification) {
                        if (targetNode.parentNode[foundType] == verification) {
                            contentmenuSingle.style.left = targetNode.parentNode.offsetLeft + e.layerX + 'px'
                            contentmenuSingle.style.top = targetNode.parentNode.offsetTop + e.layerY + 'px'
                            let getObj = getCustomData(targetNode.parentNode)
                            singleSelectActiveData = { ids: targetNode.parentNode.getAttribute('ids'),data:getObj }
                            selectedNodeSingle=targetNode.parentNode
                            return
                        } else if (targetNode[foundType]) {
                            contentmenuSingle.style.left = targetNode.offsetLeft + e.layerX + 'px'
                            contentmenuSingle.style.top = targetNode.offsetTop + e.layerY + 'px'
                            let getObj = getCustomData(targetNode)
                            singleSelectActiveData = { ids: targetNode.getAttribute('ids'),data:getObj }
                            selectedNodeSingle=targetNode
                            return
                        } else {
                            foofoundRightParentNode(foundType, targetNode.parentNode, verification)
                        }
                    }
                }
            }
        })
        canvas.addEventListener('mouseup', (e) => {
            let selectedNode=[]
            if (e.button == 2) {

            }
            for (let i = 0; i < elemArr.length; i++) {
                let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                if(rightNode.checked==true){
                    let getObj = getCustomData(elemArr[i])
                    let obj = { ids: elemArr[i].getAttribute('ids'),data:getObj,node:elemArr[i]}
                    selectedNode.push(obj)
                }
                elemArr[i].style.pointerEvents = 'auto'
            }
            pconfig.selectedEventListener(selectedArr,selectedNode)
            clearTimeout(isDraw)
            dragMotive = false
            dragShadowBox.style.top = '-1000px'
            dragShadowBox.style.width = '0px'
            dragShadowBox.style.height = '0px'
            if(selectedArr.length==0){
                batch=false
                if(pconfig.batchStatus)pconfig.batchStatus(false)
                for (let i = 0; i < elemArr.length; i++) {
                    let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                    rightNode.style.display = 'none'
                    rightNode.checked = false
                }
            }
        })
        canvas.addEventListener('mouseleave', (e) => {
            dragMotive = false
            clearTimeout(isDraw)
            dragShadowBox.style.top = '-1000px'
            dragShadowBox.style.width = '0px'
            dragShadowBox.style.height = '0px'
        })
        canvas.addEventListener('mousemove', (e) => {
            mouseActivePointX = e.layerX
            mouseActivePointY = e.layerY
            if (dragMotive) {
                if (startPointX < e.layerX && startPointY < e.layerY) {
                    dragShadowBox.style.width = e.layerX - startPointX + 'px'
                    dragShadowBox.style.height = e.layerY - startPointY + 'px'
                }
                if (startPointX > e.layerX && startPointY < e.layerY) {
                    dragShadowBox.style.width = startPointX - e.layerX + 'px'
                    dragShadowBox.style.height = e.layerY - startPointY + 'px'
                    dragShadowBox.style.left = e.layerX + 'px'
                }
                if (startPointY > e.layerY && startPointX < e.layerX) {
                    dragShadowBox.style.width = e.layerX - startPointX + 'px'
                    dragShadowBox.style.height = startPointY - e.layerY + 'px'
                    dragShadowBox.style.top = e.layerY + 'px'
                }
                if (startPointY > e.layerY && startPointX > e.layerX) {
                    dragShadowBox.style.width = startPointX - e.layerX + 'px'
                    dragShadowBox.style.height = startPointY - e.layerY + 'px'
                    dragShadowBox.style.left = e.layerX + 'px'
                    dragShadowBox.style.top = e.layerY + 'px'
                }
                //计算selectBox与dragShadowBox,x、y轴是否相交,如果相交必包含
                for (let i = 0; i < elemArr.length; i++) {
                    let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                    // if(rightNode.checked==true) return
                    let maxX = 0
                    let maxY = 0
                    let minX = 0
                    let minY = 0
                    maxX = Math.max(elemArr[i].offsetLeft + elemArr[i].offsetWidth, dragShadowBox.offsetLeft + dragShadowBox.offsetWidth)
                    maxY = Math.max(elemArr[i].offsetTop + elemArr[i].offsetHeight, dragShadowBox.offsetTop + dragShadowBox.offsetHeight)
                    minX = Math.min(elemArr[i].offsetLeft, dragShadowBox.offsetLeft)
                    minY = Math.min(elemArr[i].offsetTop, dragShadowBox.offsetTop)
                    if (maxX - minX <= elemArr[i].offsetWidth + dragShadowBox.offsetWidth && maxY - minY <= elemArr[i].offsetHeight + dragShadowBox.offsetHeight) {
                        rightNode.checked = true
                        selectedArr.push(elemArr[i].getAttribute('ids'))
                        selectedArr = [...new Set(selectedArr)]
                    } else {
                        if (ctrl == false) rightNode.checked = false
                        for (let is = 0; is < selectedArr.length; is++) {
                            if (elemArr[i].getAttribute('ids') == selectedArr[is]) {
                                selectedArr.splice(is, 1)
                            }
                        }
                    }
                }
            }
        }, true)
    }
    function optionalContentmenuInitFc(single, multiple, callbackSingle,callbackMultiple) {
        contentmenuSingle = document.createElement('div')
        contentmenuSingle.single = verification + 'single'
        let span = document.createElement('span')
        contentmenuSingle.style = 'display:flex;min-width:90px;user-select:none;max-width:190px;flex-wrap:wrap;position:absolute;top:-10000%;left:0;background:#eee;z-index:20001;box-shadow: 2px 1px 3px 0px #a8a8a8;'
        span.style = 'width:100%;color:#000;padding:5px 10px;cursor:pointer;user-select:none;'
        span.classList.add('HoverStyles')
        let setSpanHoverStyle = document.createElement('style')
        setSpanHoverStyle.innerHTML = `.HoverStyles:hover{background:#fff;}`
        document.head.appendChild(setSpanHoverStyle)
        for (let i = 0; i < single.length; i++) {
            let cspan = span.cloneNode(true)
            cspan.innerHTML = single[i]
            cspan.handleSingleButton = verification + 'handleSingleButton'
            cspan.addEventListener('click', function (e) {
                singleSelectActiveData.node=selectedNodeSingle
                callbackSingle(e.target.childNodes[0].data, e, singleSelectActiveData)
                contentmenuSingle.style.top = '-1000px'
                contentmenuSingle.style.left = '0px'
            })
            contentmenuSingle.appendChild(cspan)
        }
        canvas.appendChild(contentmenuSingle)
        contentmenuMultiple = document.createElement('div')
        contentmenuMultiple.multiple = verification + 'multiple'
        let spans = document.createElement('span')
        contentmenuMultiple.style = 'display:flex;min-width:90px;user-select:none;max-width:190px;flex-wrap:wrap;position:absolute;top:-10000%;left:0;background:#eee;z-index:20001;box-shadow: 2px 1px 3px 0px #a8a8a8;'
        spans.style = 'width:100%;color:#000;padding:5px 10px;cursor:pointer;user-select:none;'
        spans.classList.add('HoverStyles')
        for (let i = 0; i < multiple.length; i++) {
            let cspans = spans.cloneNode(true)
            cspans.innerHTML = multiple[i]
            cspans.handleMutipleButton = verification + 'handleMutipleButton'
            cspans.addEventListener('click', function (e) {
                let selectedNode=[]
                for(let i=0;i<elemArr.length;i++){
                    let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                    if(rightNode.checked==true){
                        let getObj = getCustomData(elemArr[i])
                        let obj = { ids: elemArr[i].getAttribute('ids'),data:getObj,node:elemArr[i]}
                        selectedNode.push(obj)
                    }
                }
                if (e.target.childNodes[0].closeButton == true) {
                    batch = false
                    if(pconfig.batchStatus)pconfig.batchStatus(false)
                    for (let i = 0; i < elemArr.length; i++) {
                        let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                        rightNode.style.display = 'none'
                        rightNode.checked = false
                    }
                    contentmenuMultiple.style.top = '-1000px'
                    contentmenuMultiple.style.left = '0px'
                } else {
                    callbackMultiple(e.target.childNodes[0].data, e,selectedNode)
                    batch = false
                    if(pconfig.batchStatus)pconfig.batchStatus(false)
                    for (let i = 0; i < elemArr.length; i++) {
                        let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                        rightNode.style.display = 'none'
                        rightNode.checked = false
                    }
                    contentmenuMultiple.style.top = '-1000px'
                    contentmenuMultiple.style.left = '0px'
                }
            })
            contentmenuMultiple.appendChild(cspans)
        }
        let closeButton = spans.cloneNode(true)
        closeButton.innerHTML = '取消多选'
        closeButton.handleMutipleButton = verification + 'handleMutipleButton'
        closeButton.closeButton = true
        closeButton.addEventListener('click', function (e) {
            batch = false
            if(pconfig.batchStatus)pconfig.batchStatus(false)
            for (let i = 0; i < elemArr.length; i++) {
                let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                rightNode.style.display = 'none'
                rightNode.checked = false
            }
            selectedArr = []
            contentmenuMultiple.style.top = '-1000px'
            contentmenuMultiple.style.left = '0px'
        })
        contentmenuMultiple.appendChild(closeButton)
        canvas.appendChild(contentmenuMultiple)
    }
    function optionalElemInitFc() {
        for (let i = 0; i < elemArr.length; i++) {
            elemArr[i].style.position = 'relative'
            elemArr[i].style.userSelect= 'none'
            elemArr[i].style.pointerEvents= 'auto'
            elemArr[i].style.cursor= 'pointer'
            let radiusElem = document.createElement('input')
            radiusElem.setAttribute('type', 'checkbox')
            radiusElem.setAttribute('style', 'display:none;position:absolute;top:2px;right:2px;z-index:1;pointer-events:none;')
            elemArr[i].appendChild(radiusElem)
            elemArr[i].verification = verification
            elemArr[i].addEventListener('click', (e) => {
                if (batch) {
                    let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                    if (rightNode.checked == true) {
                        rightNode.checked = false
                        for (let is = 0; is < selectedArr.length; is++) {
                            if (elemArr[i].getAttribute('ids') == selectedArr[is]) {
                                selectedArr.splice(is, 1)
                            }
                        }
                    } else {
                        rightNode.checked = true
                        selectedArr.push(elemArr[i].getAttribute('ids'))
                        selectedArr = [...new Set(selectedArr)]
                    }
                    pconfig.selectedEventListener(selectedArr)
                } else {
                    let getObj = getCustomData(elemArr[i])
                    pconfig.itemClick({ ids: elemArr[i].getAttribute('ids'),data:getObj }, e)
                }
            })
        }
    }
    function getCustomData(node){
        let obj={}
        for(let i=0;i<pconfig.customAttribute.length;i++){
            obj[pconfig.customAttribute[i]]=node.getAttribute(pconfig.customAttribute[i])
        }
        return obj
    }
    function foundRightNode(foundType, nodeList, targetName) {
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i][foundType] == targetName) {
                return nodeList[i]
            }
        }
    }
    selectToolSktechFc()
    optionalElemInitFc()
    optionalContentmenuInitFc(pconfig.optionalContentmenu.single, pconfig.optionalContentmenu.multiple, pconfig.crudEventCallbackSingle,pconfig.crudEventCallbackMultiple)
    bodyElem.addEventListener('keydown', (e) => {
        if (e.keyCode == 17) ctrl = true
    })
    bodyElem.addEventListener('keyup', (e) => {
        if (e.keyCode == 17) ctrl = false
    })
    window.addEventListener('mousewheel', function (event) {
        if (event.ctrlKey === true || event.metaKey) {
            event.preventDefault();
        }
    }, { passive: false });
    //firefox
    window.addEventListener('DOMMouseScroll', function (event) {
        if (event.ctrlKey === true || event.metaKey) {
            event.preventDefault();
        }
    }, { passive: false });
    function autoAdjustHeight (){
        if(initTarget.offsetHeight>canvas.offsetHeight){
            canvas.style.height=initTarget.offsetHeight+'px'
        }else if(initTarget.offsetHeight<canvas.offsetHeight){
            canvas.style.height='100%'
        }
    }
    autoAdjustHeight()
    window.onresize=()=>{
        autoAdjustHeight()
    }
}