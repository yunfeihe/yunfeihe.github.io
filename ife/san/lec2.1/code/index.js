const san = require("san");

let App = san.defineComponent({
    template: `
    <div id="app">
        <input type="text" placeholder="name : string" value="{= name =}">
        <input type="text" placeholder="age : number" value="{= ageStr =}">
        <input type="text" placeholder="description : string" value="{= desc =}" >
        <hr>
        <div class="wrap">
        <span>info</span>
        <button on-click="clearAll">Clear</button>    
        </div>
        <div class="wrap">
            <ul>
                <li>name: <span class="value">{{ name }}</span></li>
                <li>age :<span class="value">{{ age }}</span></li>
                <li>description: <span class="value">{{ desc }}</span></li>
            </ul>
        </div>
    </div>
    `,
    initData: function(){
        return {
            name: "yunfeihe",
            ageStr: "20",
            desc: "funny",
        };
    },
    dataTypes: {
        name:san.DataTypes.string,
        ageStr: san.DataTypes.string,
        desc: san.DataTypes.string,
    },
    clearAll: function() {
        this.data.set("name", "");
        this.data.set("ageStr", "");
        this.data.set("desc", "");
    },
    computed: {
        age(){
            let age = this.data.get("ageStr");      //得到用户输入的string类型的age
            let number = parseInt(age, 10);         //转换为10进制整数
            
            return isNaN(number) ? "" : number;
        },
    }
});

window.app = new App();

app.attach(document.body);