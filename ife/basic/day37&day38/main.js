import graph from "./Graphes";
import { isNumberOfString } from "./utils/tool";

function dataOfSource() {

    let initSourceData = [{
        product: "手机",
        region: "华东",
        sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
    }, {
        product: "手机",
        region: "华北",
        sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
    }, {
        product: "手机",
        region: "华南",
        sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    }, {
        product: "笔记本",
        region: "华东",
        sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
    }, {
        product: "笔记本",
        region: "华北",
        sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
    }, {
        product: "笔记本",
        region: "华南",
        sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
    }, {
        product: "智能音箱",
        region: "华东",
        sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
    }, {
        product: "智能音箱",
        region: "华北",
        sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
    }, {
        product: "智能音箱",
        region: "华南",
        sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
    }]

    let data = JSON.parse(localStorage.getItem('__data')) || initSourceData;

    return data;
}

function count(arr, value, key) {
    let num = 0;
    for (let item of arr) {
        if (key !== undefined) {
            item[key] === value ? num++ : '';
        } else {
            item === value ? num++ : '';
        }
    }
    return num;
}

function selectedOptionFrom(selectEl) {
    for (let op of selectEl.querySelectorAll("option")) {
        if (op.selected) {
            return op;
        }
    }
}

function numOfcheckedOf(checkboxWrapEl) {
    let num = 0;
    for (let cb of checkboxWrapEl.querySelectorAll(".item")) {
        cb.checked ? num++ : '';
    }
    return num;
}

function saveData() {
    let data = [];
            let lastRegion = null;
            let lastProduct = null;
            for (let tr of document.querySelectorAll("tr")) {
                let hasRegion = false;
                let hasProduct = false;
                let item = {};
                let month = [];
                let tdes = tr.querySelectorAll('td');
                if (!tr.classList.contains('title')) {
                    for (let td of tdes) {
                        if (td.classList.contains('region')) {
                            hasRegion = true;
                            lastRegion = td.textContent;
                            item.region = lastRegion;
                        } else if (td.classList.contains('product')) {
                            hasProduct = false;
                            lastProduct = td.textContent;
                            item.product = lastProduct;
                        } else if (td.classList.contains('month')) {
                            month.push(td.textContent);
                        }
                    }!hasProduct ? item.product = lastProduct : '';
                    !hasRegion ? item.region = lastRegion : '';
                    item.sale = month;
                    data.push(item);

                }
            }
            localStorage.setItem('__data', JSON.stringify(data));
}



function renderTable(data) {
    let html = "";
    let wtf = ["商品", "地区", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let thes = ['<tr class="title">', '</tr>'].join('<th>' + wtf.join("</th><th>") + '</th>');

    let numOfCheckedProduct = numOfcheckedOf(document.querySelector(".product-wrap"));
    let numOfCheckedRegion = numOfcheckedOf(document.querySelector('.region-wrap'));

    let tdes = "";

    let isFirst = true;
    let isTheSame = false;
    let lastItem = null;
    for (let item of data) {
        if (lastItem !== null && item.product === lastItem.product) {
            isTheSame = true;
        }

        if (numOfCheckedProduct === 1) {
            tdes +=
                `
            <tr>
            ${isFirst ? '<td class="product" rowspan=' + count(data, data[0].product, 'product') + ' >' + item.product + '</td>' : ''}
            <td class="region">${item.region}</td>
            ${'<td class="month">' + item.sale.join('</td><td class="month">') + '</td>'}
            </tr>                 
            `;
        } else if (numOfCheckedRegion === 1) {
            tdes +=
                `
            <tr>
            <td class="product" >${item.product}</td>
            ${isFirst ? '<tdclass="region" rowspan=' + count(data, data[0].region, 'region') + ' >' + item.region + '</td>' : ''}
            ${'<td class="month">' + item.sale.join('</td><td class="month">') + '</td>'}
            </tr>                 
            `;
        } else if (numOfCheckedRegion > 1 && numOfCheckedProduct > 1) {
            tdes +=
                `
            <tr>
            ${!isTheSame ? '<td class="product"  rowspan=' + count(data, item.product, 'product') + ' >' + item.product + '</td>' : ''}
            <td class="region">${item.region}</td>
            ${'<td class="month">' + item.sale.join('</td><td class="month">') + '</td>'}
            </tr>                 
            `;
            lastItem = item;
            isTheSame = false;
        }
        isFirst = false;


    }

    html = thes + tdes;
    document.querySelector("#table").innerHTML = html;
    //给每个td增加edit save事件

    let lastTd = null;
    document.querySelectorAll('td').forEach(function (tdEl) {
        tdEl.addEventListener('click', (e) => {
            if(tdEl.querySelector("input") === null) {
                console.log('i. e', tdEl.querySelector("input"))
                if(lastTd !== null && e.target !== lastTd) {
                    let t = lastTd.querySelectorAll('button')[1];
                    t && t.click();
                }
                lastTd = e.target;
                let textContent = e.target.textContent;
                let saveBtn = document.createElement('button');
                let cancelBtn = document.createElement('button');
                let inputBox = document.createElement('input');
                saveBtn.textContent = 'Save';
                
                cancelBtn.textContent = 'Cancel';
                inputBox.type = 'text';
                inputBox.value = tdEl.textContent;
                

                //置空td的内容
                let originalTextContent = tdEl.textContent;
                tdEl.textContent = '';
                [inputBox, saveBtn, cancelBtn].forEach(el => tdEl.appendChild(el));
                
                inputBox.onkeydown = function(e) {
                    let key = e.key.toUpperCase();
                    if(key === 'ENTER') {
                        saveBtn.click();
                    } else if (key === 'ESCAPE') {
                        cancelBtn.click();
                    }
                }

                saveBtn.onclick = function(e) {
                    console.log(tdEl);
                    let temp = document.createElement('div');
                    temp.textContent = tdEl.querySelector('input').value;
                    let editedValue = temp.innerHTML;
                    // if(isNumberOfString(editedValue))
                    tdEl.innerHTML = editedValue;
                    saveData();
                    e.stopPropagation();
                }

                cancelBtn.onclick = function(e) {
                    tdEl.innerHTML = originalTextContent;
                    e.stopPropagation();
                }

                document.body.onclick = function(e) {
                    if([tdEl, inputBox, saveBtn, cancelBtn].indexOf(e.target) === -1) {
                        cancelBtn.click();
                    }
                }
                inputBox.focus();
            }
            
        });
    });



}

let notify = (function () {
    //object is a function with closure
    let storage = {};
    return function (key, value) {
        storage[key] = value;

        let fixedData = dataOfSource();

        for (let k in storage) {
            if (storage.hasOwnProperty(k)) {
                fixedData = fixedData.filter(item => {
                    for (let checkedValue of storage[k]) {
                        if (checkedValue === item[k]) {
                            return true;
                        }
                    }
                    return false;
                });
            }
        }
        renderTable(fixedData);


    }
})();


function logicOfCheckbox(key) {
    return function (e) {
        //e => event
        const checkAll = 'all';
        let targetCheckbox = e.target;
        let checkboxWrapEl = this;
        let AllCheckboxes = checkboxWrapEl.querySelectorAll('.item');
        let checkboxAllEl = checkboxWrapEl.querySelector(".all");
        let checkedValue = [];

        if (targetCheckbox.type === 'checkbox') {
            if (targetCheckbox.dataset.value === checkAll) { //首先判断是否是全选按钮
                for (let cb of AllCheckboxes) {
                    if (targetCheckbox.checked) { //targetCheckbox = 全选checkbox
                        cb.checked = true;
                    } else {
                        cb.checked = false;
                        //至少留一个不为空，这个写法很不好，但是开始没考虑这个需求，现在不想大改代码了;
                        AllCheckboxes[0].checked = true;
                    }
                }
            } else {
                let isAllChecked = true;
                let checkedboxCount = AllCheckboxes.length;
                for (let cb of AllCheckboxes) {
                    if (cb.checked === false) {
                        isAllChecked = false;
                        checkedboxCount--;
                    }
                }
                checkedboxCount === 0 ? AllCheckboxes[0].checked = true : '';
                checkboxAllEl.checked = isAllChecked;
            }
            //获得勾选的数据
            for (let cb of AllCheckboxes) {
                if (cb.checked === true) {
                    checkedValue.push(cb.parentElement.textContent.trim())
                }
            }
            notify(key, checkedValue);
        }


    }
}


function main() {
    // drawBarGraphBySvg(data);
    // drawBarGraphByCanvas(data);
    // graph.drawLineGraphByCanvas(data);
    // graph.drawLineGraphByCanvas(data2);


    document.querySelectorAll('.item, .all').forEach(function(item) {
        item.checked = true;
    });

    renderTable(dataOfSource());

    document.querySelector(".region-wrap").onchange = logicOfCheckbox('region');
    document.querySelector('.product-wrap').onchange = logicOfCheckbox('product');

    let current = [null];
    document.querySelector("#table").onmouseover = function (e) {
        // console.log(e, e.target, e.target.parentElement);
        const NOT_EXIST = -1;
        let targetRow = e.target.parentElement.nodeName === 'TR' ? e.target.parentElement : -1;
        if (!(targetRow === NOT_EXIST) && !targetRow.classList.contains("title")) {
            let tdesNodelist = targetRow.querySelectorAll("td");
            let tdes = new Array(...tdesNodelist).slice(-12);
            let data = [];
            for (let td of tdes) {
                data.push(td.textContent);
            }

            let isTheRowChanged = false;
            for (let i = 0; i < data.length; i++) {
                if (current[i] !== data[i]) { // current第一次为空数组 js数组越界访问不出错 我图一时轻松而已 不要学习
                    isTheRowChanged = true;
                    break;
                }
            }
            current = data;

            if (isTheRowChanged) {
                graph.drawBarGraphBySvg(data, document.querySelector(".left"));
                graph.drawLineGraphByCanvas(data, document.querySelector(".right"));
                graph.drawLineGraphByCanvas(data, document.querySelector(".mul-line-graph"));
                isTheRowChanged = false;
            } else {
                //暂时放在这里处理数据了
                console.log("not change")
            }

        } else {
            //非数据区域
            let datas = [];
            for (let item of dataOfSource()) {
                datas.push(item.sale);
            }
            graph.drawMulLineGraphByCanvas(datas, document.querySelector(".mul-line-graph"));
        }
    }

    document.querySelector("#table").onmouseout = function (e) {
        // console.log(e, e.target, e.target.parentElement);
        const NOT_EXIST = -1;
        let targetRow = e.target.parentElement.nodeName === 'TR' ? e.target.parentElement : -1;
        if (!(targetRow === NOT_EXIST) && !targetRow.classList.contains("title")) {
            //在行中 不操作
        } else {
            //出行了, 暂时把数据放在这里处理了
            let datas = [];
            for (let item of dataOfSource()) {
                datas.push(item.sale);
            }
            graph.drawMulLineGraphByCanvas(datas, document.querySelector(".mul-line-graph"));

        }

    }

    document.querySelector(".btns").onclick = function (e) {
        let type = e.target.id;
        if (type === 'edit') {
            for (let tr of document.querySelectorAll("tr")) {
                if (!tr.classList.contains('title')) {
                    for (let td of tr.querySelectorAll('td')) {
                        let textContent = td.textContent;
                        td.innerHTML = `<input type='text' value='${textContent}'/>`;
                    }
                }
            }
        } else if (type === 'save') {
            let tempEl = document.createElement('div');
            for (let tr of document.querySelectorAll("tr")) {
                if (!tr.classList.contains('title')) {
                    for (let td of tr.querySelectorAll('td')) {
                        let inputEl = td.querySelector('input');
                        if(inputEl !== null) {
                            tempEl.textContent = inputEl.value;
                            let textValue = tempEl.innerHTML;
                            td.innerHTML = textValue;
                        }
                    }
                }
            }

            //变回原样

            saveData();

        } else if (type === 'reset') {
            localStorage.removeItem('__data');
        }
    }


}

main();