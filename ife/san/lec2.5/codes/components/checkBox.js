const san = require("san");

import basicIcon from "../icon/basic.svg";
import checkedIcon from "../icon/checked.svg";
import disabledIcon from "../icon/disabled.svg";
import checkedDisabledIcon from "../icon/checked-disabled.svg";
import indeterminateIcon from "../icon/indeterminate.svg";
import indeterminateDisabledIcon from "../icon/indeterminate-disabled.svg";


// template: `
//     <label class="checkbox">
//         <input type="checkbox" 
//             checked = "{= checked =}"              
//             on-change = "statusChange"
//         >
//         <div class="icon">
//             <img s-if="indeterminate" src="{{ disabled  ? '${indeterminateDisabledIcon}' : '${indeterminateIcon}'}}">
//             <img s-elif="!disabled" src="{{ checkedValues.length === 0 ? '${basicIcon}' : '${checkedIcon}'}}">
//             <img s-else src="{{ checkedValues.length === 0 ? '${disabledIcon}' : '${checkedDisabledIcon}'}}">
//         </div>
//         <div s-if="debug">debug isChecked: {{ isChecked }}  checked: {{ checked }}</div>
//     </label>
//     `,

{/* <img s-if="indeterminate" src="{{ disabled  ? '${indeterminateDisabledIcon}' : '${indeterminateIcon}'}}">
            <img s-elif="!disabled" src="{{ checkedValues.length === 0 ? '${basicIcon}' : '${checkedIcon}'}}">
            <img s-else src="{{ checkedValues.length === 0 ? '${disabledIcon}' : '${checkedDisabledIcon}'}}"> */}

export default san.defineComponent({
    template: 
`
    <label class="checkbox">
        <input type="checkbox" 
            checked = "{{ wrapChecked }}"              
            on-change = "statusChange"
            disabled = "{{ disabled }}"
            style="{{ debug ? '' : 'display:none;' }}"
        />
        <div class="icon">
        <img s-if="indeterminate" src="{{ disabled  ? '${indeterminateDisabledIcon}' : '${indeterminateIcon}'}}">
        <img s-elif="checked" src="{{ disabled  ? '${checkedDisabledIcon}' :  '${checkedIcon}' }}">
        <img s-else src="{{ disabled  ? '${disabledIcon}' :  '${basicIcon}' }}">


        </div>
        <div s-if="debug">debug true false value: {{ trueValue }} {{ falseValue }} checked: {{ checked }}</div>
    </label>
`,
    initData() {
        return {
            checked: false,
            disabled: false,
            trueValue: '__trueValue',
            falseValue: '__falseValue',
            indeterminate: false,
            debug: false,
        }
    },
    //event func
    statusChange(e) {
        let indeterminate = this.data.get('indeterminate');

        const defaultTrueValue = '__trueValue';
        let trueValue = this.data.get("trueValue");
        let checkedValue = this.data.get("checked");
        if(trueValue === defaultTrueValue) {
            this.data.set("checked", !indeterminate && !checkedValue);
        } else {
            let falseValue = this.data.get("falseValue");
            if(checkedValue === false) { //第一次初始化
                checkedValue = falseValue;
            }

            if(indeterminate || checkedValue === trueValue) {
                this.data.set("checked", falseValue);
            } else if (!indeterminate && checkedValue === falseValue) {
                this.data.set("checked", trueValue);
            } else {
               throw new Error("您已经设置的属性trueValue的值，属性checked的值必须在trueValue和falseValue之间,现在", this.data.get("checked"));
            }
        }
        this.fire('change', e);
        return e;
    },
    computed: {
        wrapChecked() {
            let indeterminate = this.data.get('indeterminate');

        
            const defaultTrueValue = '__trueValue';
            let trueValue = this.data.get("trueValue");
            let checkedValue = this.data.get("checked");
            if(trueValue === defaultTrueValue) {
                return !indeterminate && checkedValue;
            } else {
                let falseValue = this.data.get("falseValue");
                if(checkedValue === false) { //第一次初始化
                    checkedValue = falseValue;
                } 
                if(!indeterminate && checkedValue === trueValue) {
                    return true;
                } else if (indeterminate || checkedValue === falseValue) {
                    return false;
                } else {
                    console.log("*", checkedValue.length, trueValue, falseValue.length);
                    throw new Error("您已经设置的属性trueValue的值，属性checked的值必须在trueValue和falseValue之间,现在" + this.data.get("checked"));
                }
            }
        },
    }
});