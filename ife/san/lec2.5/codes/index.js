const san = require("san");

import inputBox from "./components/inputBox";
import checkBox from "./components/checkBox";
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
        

    
    <div class="checkbox-wrap">
        <ul>
            <li><el-checkbox checked="{{ true }}"></el-checkbox></li>
            <li><el-checkbox checked="{{ true }}" disabled="{{ true }}"></el-checkbox></li>
            <li><el-checkbox indeterminate="{{ true }}" disabled="{{ true }}"></el-checkbox></li>
            <li>
                <el-checkbox checked = "{= checked =}" indeterminate = "{{ indeterminate }}"></el-checkbox>
                <ul>
                    <li><el-checkbox on-change="foo(0, $event)"></el-checkbox></li>
                    <li><el-checkbox on-change="foo(1, $event)"></el-checkbox></li>
                    <li><el-checkbox on-change="foo(2, $event)"></el-checkbox></li>
                </ul>
            </li>
        </ul>
    </div>

    </div>
    `,
    components: {
        "el-input": inputBox,
        'el-checkbox': checkBox,
    },
    initData: function() {
        return {
            checked: false,
            indeterminate: false,
        };
    },
    //event method
    log(e) {
        console.log("event: father", e);
        console.log("ee");
    },
    foo: (function() {
        let storage = new Array(3).fill(false);

        return function(index, e) {
            storage[index] = e.target.checked;
            let trueCount = 0;
            let falseCount = 0;
            for(let b of storage) {
                if(b === false) {
                    falseCount++;
                } else {
                    trueCount++;
                }
            }

            if(trueCount === 3) {
                this.data.set("indeterminate", false);
                this.data.set("checked", true);
            } else if (falseCount === 3) {
                this.data.set("indeterminate", false);
                this.data.set("checked", false);
            } else {
                this.data.set("indeterminate", true);
            }
              
        }
    })(),

});

window.app = new App();

app.attach(document.body);

