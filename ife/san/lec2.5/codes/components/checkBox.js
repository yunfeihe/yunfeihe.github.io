const san = require("san");

import basicIcon from "../icon/basic.svg";
import checkedIcon from "../icon/checked.svg";
import disabledIcon from "../icon/disabled.svg";
import checkedDisabledIcon from "../icon/checked-disabled.svg";
import indeterminateIcon from "../icon/indeterminate.svg";
import indeterminateDisabledIcon from "../icon/indeterminate-disabled.svg";


const disabledTag = `
<svg id="_san_3039" class="sm-checkbox-icon-uncheck sm-checkbox-svg-icon " viewBox="0 0 24 24">
                        <path id="_san_3041" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                    </svg>
`

export default san.defineComponent({
    template: `
    <label class="checkbox">
        <input type="checkbox" 
            checked = "{= checked =}"              
            on-change = "statusChange"
        >
        <div class="icon">
            <img s-if="indeterminate" src="{{ disabled  ? '${indeterminateDisabledIcon}' : '${indeterminateIcon}'}}">
            <img s-elif="!disabled" src="{{ checkedValues.length === 0 ? '${basicIcon}' : '${checkedIcon}'}}">
            <img s-else src="{{ checkedValues.length === 0 ? '${disabledIcon}' : '${checkedDisabledIcon}'}}">
        </div>
        <div s-if="debug">debug isChecked: {{ isChecked }}  checked: {{ checked }}</div>
    </label>
    `,
    initData: function() {
        return {
            checked: "defalut",
            falseValue: "",
        };
    },
    dataTypes: {
        checkedValues: san.DataTypes.arrayOf(san.DataTypes.string),
        trueValue: san.DataTypes.string,
        falseValue: san.DataTypes.string,
        isChecked: san.DataTypes.bool,
    },
    //event method
    debug(value) {
        if(this.data.get("debug")) {
            let isTrueValueSetted = this.data.get("trueValue");

            console.log("value", value, isTrueValueSetted);
        }
    },
    statusChange(e) {
        console.log("change")
        let isChecked = this.data.get("checked");
        let isTrueValueSetted = this.data.get("trueValue");
        if(isTrueValueSetted) {
            if(false) {
                this.data.set("checked", this.data.get("trueValue"));
            } else {
                this.data.set("checked", this.data.get("falseValue") || "false**");
            }
        } else {
            //do nothing
        }
    },
    filters: {
        realBool(value) {
            console.log("Test");
            let falseValue = this.data.get("falseValue");
            if(value === falseValue) {
                return false;
            } else {
                return true;
            }
        }
    },
    computed: {
        isChecked() {
            let value = this.data.get("checked");
            let falseValue = this.data.get("falseValue"); 
            let isTrueValueSetted = this.data.get("trueValue");
            if(isTrueValueSetted) {
                //value并非纯粹布尔值，已经是用户自定义的
                console.log("value ****", value, typeof value)
                console.log("falseValue ****", falseValue, typeof falseValue)
                if(value === falseValue) {
                    //falseValue可能在js里面属于真值，要显式判断下
                    log("asd");
                    return false;     
                } else {
                    return true;
                }
            } else {
                return value;
            }
        }
    }
}); 