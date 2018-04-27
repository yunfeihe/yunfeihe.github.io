const san = require("san");

let App = san.defineComponent({
    template: `
    <div class="wrap">
        <button id="add" on-click="addItem">添加</button>
        
        <table border="1px">
            <tr>
                <th>姓名</th>
                <th>审核状态</th>
                <th>操作</th>
            </tr>
            
            <tr s-for="item, index in items">
                <td>{{ item.name }}</td>
                <td s-if="!item.isChecked">待审核</td>
                <td s-elif="item.score >= 5">合格</td>
                <td s-else>不合格</td>
                <td>
                    <button s-if="item.isChecked" on-click="removeItem(index)">删除</button>
                    <button s-else on-click="checkItem(item, index)">审核</button>
                </td>
            </tr>
        </table>
    </div>
    `,
    initData: function() {
        return {
            items: [
                {
                    name: "Jack Li",
                    score: 2,
                    isChecked: false,
                },
                {
                    name: "John",
                    score: 6,
                    isChecked: false,
                },
                {
                    name: "JoJo",
                    score: 3,
                    isChecked: false,
                },
                {
                    name: "Harison",
                    score: 9,
                    isChecked: false,
                },
            ],
        };
    },
    //event method
    checkItem(item, index) {
        this.data.set(`items[${index}].isChecked`, true);
    },
    removeItem(index) {
        this.data.removeAt("items", index);
    },
    addItem() {
        let item = {
            name: "New Person",
            score: Math.round(10 * Math.random()),
            isChecked: false,
        }
        this.data.push("items", item);
    },

});

window.app = new App();     //for debug

app.attach(document.body);
