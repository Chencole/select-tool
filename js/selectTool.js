// component public variable
let pconfig
let verification
let dragMotive = false
let isDraw
let startPointX
let startPointY
let elemArr
let initTarget
let batch = false
let transparentBox
let dragShadowBox
let mouseActivePointX
let mouseActivePointY
let bodyElem
let contentmenuSingle
let contentmenuMultiple
let singleSelectActiveData
let selectedArr = []
let ctrl = false
// main function
function selectToolInit(config) {
    pconfig = config
    verification = Math.random()
    bodyElem = document.querySelector('body')
    elemArr = document.querySelectorAll(pconfig.selectElement)
    initTarget = document.querySelector(pconfig.initTarget)
    window.onload = function () {
        initTarget.oncontextmenu = function () { return false; }
    }
    initTarget['verificationRoot'] = verification
    initTarget.setAttribute('style', 'display:flex;width:100%;height:auto;flex-wrap:wrap;align-content:flex-start;user-select:none;position:relative;')
    selectToolSktechFc()
    optionalElemInitFc()
    optionalContentmenuInitFc(pconfig.optionalContentmenu.single, pconfig.optionalContentmenu.multiple, pconfig.crudEventCallback)
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
}
function selectToolSktechFc() {
    dragShadowBox = document.createElement('div')
    dragShadowBox.setAttribute('style', `display:flex;background:#d7e2f0;border:1px dashed #62befb;user-select:none;pointer-events:none;top:-1000px;position:absolute;
    z-index:2007;opacity:0.4;`)
    initTarget.appendChild(dragShadowBox)
    initTarget.addEventListener('mousedown', (e) => {
        if (e.button == 0) {
            if (e.target.handleSingleButton == verification + 'handleSingleButton') {

            } else if (e.target.handleMutipleButton == verification + 'handleMutipleButton') {

            } else {
                contentmenuSingle.style.top = '-1000px'
                contentmenuMultiple.style.top = '-1000px'
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
                        singleSelectActiveData = { id: targetNode.parentNode.getAttribute('ids') }
                        return
                    } else if (targetNode[foundType]) {
                        contentmenuSingle.style.left = targetNode.offsetLeft + e.layerX + 'px'
                        contentmenuSingle.style.top = targetNode.offsetTop + e.layerY + 'px'
                        singleSelectActiveData = { id: targetNode.getAttribute('ids') }
                        return
                    } else {
                        foofoundRightParentNode(foundType, targetNode.parentNode, verification)
                    }
                }
            }
        }
    })
    initTarget.addEventListener('mouseup', (e) => {
        if (e.button == 2) {

        }
        for (let i = 0; i < elemArr.length; i++) {
            elemArr[i].style.pointerEvents = 'auto'
        }
        pconfig.selectedEventListener(selectedArr)
        clearTimeout(isDraw)
        dragMotive = false
        dragShadowBox.style.top = '-1000px'
        dragShadowBox.style.width = '0px'
        dragShadowBox.style.height = '0px'
    })
    initTarget.addEventListener('mouseleave', (e) => {
        dragMotive = false
        clearTimeout(isDraw)
        dragShadowBox.style.top = '-1000px'
        dragShadowBox.style.width = '0px'
        dragShadowBox.style.height = '0px'
    })
    initTarget.addEventListener('mousemove', (e) => {
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
function optionalContentmenuInitFc(single, multiple, callback) {
    contentmenuSingle = document.createElement('div')
    contentmenuSingle.single = verification + 'single'
    let span = document.createElement('span')
    contentmenuSingle.style = 'display:flex;min-width:90px;max-width:190px;flex-wrap:wrap;position:absolute;top:-10000%;left:0;background:#eee;z-index:20001;box-shadow: 2px 1px 3px 0px #a8a8a8;'
    span.style = 'width:100%;color:#000;padding:5px 10px'
    span.classList.add('HoverStyles')
    let setSpanHoverStyle = document.createElement('style')
    setSpanHoverStyle.innerHTML = `.HoverStyles:hover{background:#fff;}`
    document.head.appendChild(setSpanHoverStyle)
    for (let i = 0; i < single.length; i++) {
        let cspan = span.cloneNode(true)
        cspan.innerHTML = single[i]
        cspan.handleSingleButton = verification + 'handleSingleButton'
        cspan.addEventListener('click', function (e) {
            callback(e.target.childNodes[0].data, e, singleSelectActiveData)
            contentmenuSingle.style.top = '-1000px'
        })
        contentmenuSingle.appendChild(cspan)
    }
    initTarget.appendChild(contentmenuSingle)
    contentmenuMultiple = document.createElement('div')
    contentmenuMultiple.multiple = verification + 'multiple'
    let spans = document.createElement('span')
    contentmenuMultiple.style = 'display:flex;min-width:90px;max-width:190px;flex-wrap:wrap;position:absolute;top:-10000%;left:0;background:#eee;z-index:20001;box-shadow: 2px 1px 3px 0px #a8a8a8;'
    spans.style = 'width:100%;color:#000;padding:5px 10px'
    spans.classList.add('HoverStyles')
    for (let i = 0; i < multiple.length; i++) {
        let cspans = spans.cloneNode(true)
        cspans.innerHTML = multiple[i]
        cspans.handleMutipleButton = verification + 'handleMutipleButton'
        cspans.addEventListener('click', function (e) {
            if (e.target.childNodes[0].closeButton == true) {
                batch = false
                for (let i = 0; i < elemArr.length; i++) {
                    let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                    rightNode.style.display = 'none'
                    rightNode.checked = false
                }
                contentmenuMultiple.style.top = '-1000px'
            } else {
                callback(e.target.childNodes[0].data, e)
                batch = false
                for (let i = 0; i < elemArr.length; i++) {
                    let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
                    rightNode.style.display = 'none'
                    rightNode.checked = false
                }
                contentmenuMultiple.style.top = '-1000px'
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
        for (let i = 0; i < elemArr.length; i++) {
            let rightNode = foundRightNode('tagName', elemArr[i].children, 'INPUT')
            rightNode.style.display = 'none'
            rightNode.checked = false
        }
        selectedArr = []
        contentmenuMultiple.style.top = '-1000px'
    })
    contentmenuMultiple.appendChild(closeButton)
    initTarget.appendChild(contentmenuMultiple)
}
function optionalElemInitFc() {
    for (let i = 0; i < elemArr.length; i++) {
        elemArr[i].style.position = 'relative'
        let radiusElem = document.createElement('input')
        radiusElem.setAttribute('type', 'checkbox')
        radiusElem.setAttribute('style', 'display:none;position:absolute;top:2px;right:2px;z-index:2005;pointer-events:none;')
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
            } else {
                pconfig.itemClick({ id: elemArr[i].getAttribute('ids') }, e)
            }
        })
    }
}
function foundRightNode(foundType, nodeList, targetName) {
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i][foundType] == targetName) {
            return nodeList[i]
        }
    }
}