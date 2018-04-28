const san = require("san");

let AppVersionOne = san.defineComponent({
    template: `
    <div id="block" class="{{ isChanged ? 'changed' : 'normal' }}" on-click="change"></div>
    `,
    initData: function() {
        return {
            isChanged: false,
        };
    },
    //event method
    change() {
        this.data.set("isChanged", true);
    },
});


let AppVersionTwo = san.defineComponent({
    template: `
    <div id="block" style="width:100px;height:100px; {{ isChanged ? 'background-color: blue;' : 'background-color: red' }} " on-click="change"></div>
    `,
    initData: function() {
        return {
            isChanged: false,
        };
    },
    //event method
    change() {
        this.data.set("isChanged", true);
    }

});

let versionOne = new AppVersionOne();
let versionTwo = new AppVersionTwo();

versionOne.attach(document.querySelector("#app1"));
versionTwo.attach(document.querySelector("#app2"));
