const san = require("san");

import inputBox from "./components/inputBox";

// import test from "./icon/basic.svg";
// console.log("test", test, typeof test);

let App = san.defineComponent({
    template: `

    <div id="app">
         <el-input 
            placeholder="normal" 
        >
        </el-input>
        <br>
        <el-input 
            placeholder="请输入文字" 
            on-input="showEvent" 
            on-focus="showEvent" 
            on-blur="showEvent" 
            value="事件测试"
        >
        </el-input>
        <br>
        <el-input 
            placeholder="禁用" 
            disabled
        >
        </el-input>
        <br>
        <el-input 
            placeholder="只读" 
            readOnly
        >
        </el-input>
        <br>
        <el-input 
            placeholder="警告 版本1" 
            warned
            warningType = "{{1}}";
            warningText = "警告 版本1"
        >
        </el-input>
        <br>
        <el-input 
            placeholder="警告 版本2" 
            warned
            warningType = "{{2}}";
            warningText = "警告 版本2"
        >
        </el-input>
        <br>
        <el-input 
            placeholder="警告 版本3" 
            warned
            warningType = "{{3}}";
            warningText = "警告 版本3"
        >
        </el-input>
    </div>
    `,
    components: {
        "el-input": inputBox,
    },
    initData: function() {
        return {
            checked: true,
        };
    },
    //event method
    showEvent(e) {
        console.log("event: ", e);
    }
});

window.app = new App();

app.attach(document.body);

