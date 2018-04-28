const san = require("san");

let Child = san.defineComponent({
  template: `
    <div class="child">
        <label for="">子组件
            <input type="text" value="{= inputValue =}">
        </label>
        <button on-click="tellFather(inputValue)">通知父组件</button>
    </div>
    `,
    inited() {
        this.data.set("inputValue", null);
    },
    //event method
    tellFather(msg) {
        this.dispatch("MsgComing", msg);
    },
});

let Father = san.defineComponent({
    template: `
    <div class="father">
        <san-child inputValue="{{ childInput }}"></san-child>
        <label for="">我是父组件
        <input type="text" value="{= childInput =}" on-change="change()" 
        style="{{isChanged ? 'color: green;': ''}}"
        >

        </label>
    </div>
    `,
    initData: function() {
        return {
            childInput: "静候用户输入",
            isChanged: false,
        };
    },
    messages: {
        MsgComing(arg) {
            this.data.set("childInput", arg.value);
            this.data.set("isChanged", true);
            this.dispatch("MsgComing", arg.value);
        }
    },
    components: {
        "san-child": Child,
    },
    //event method 
    change(){
        console.log("asd");
    },
});

let GrandFather = san.defineComponent({
    template: `
    <div class="grandfather">
        <san-father></san-father>
        <div class="content">
            <span>我是超级父组件: </span><span style="{{isChanged ? 'color: red;': ''}}">{{ fatherValue }}</span>
        </div>
    </div>
    `,
    initData: function() {
        return {
            fatherValue: "我也静候用户输入",
            isChanged: false,
        };
    },
    messages: {
        MsgComing(arg) {
            this.data.set("fatherValue", arg.value);
            this.data.set("isChanged", true);
        },
    },
    components: {
        "san-father": Father,
    },
});


let app = new GrandFather();
app.attach(document.body);