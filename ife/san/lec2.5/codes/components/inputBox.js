const san = require("san");

export default san.defineComponent({
  template: `
    <div class="input-box {{ warned ? 'warn' : '' }}">

      <div class="{{ warningTypeMap[warningType] }}" s-if="warningType === 3 && warned">{{ warningText }}</div>
      <br s-if="warningType === 3 && warned">

      <input type="text" class="inputBox" 
      value = "{= value =}"
      value = "{{ value || isOnInputing ? value : placeholder }}"
      disabled = "{{ disabled || readOnly }}"
      on-input = "onInput"
      on-focus = "onFocus"
      on-blur = "onBlur"
      style = "{{(isOnInputing || value) && !disabled ? 'color: #333333' : 'color: #999999; '}}"
      >
      
      <div class="{{ warningTypeMap[warningType] }}" s-if="warningType >= 1 && warningType <= 2 && warned">{{ warningText }}</div>
    
      </div>
    `,
  initData: function() {
    return {
      value: "",
      placeholder: "",
      disabled: false,
      readOnly: false,
      isOnInputing: false,
      warningText: "这是一段警告文本",
      warningType: 3,
      warningTypeMap: {
        1: "warn-type-1",
        2: "warn-type-2",
        3: "warn-type-3"
      },
      warned: false,
    };
  },
  dataTypes: {
    value: san.DataTypes.string,
    placeholder: san.DataTypes.string,
    disabled: san.DataTypes.bool,
    readOnly: san.DataTypes.bool,
    warningText: san.DataTypes.string,
    warningType: san.DataTypes.number
  },
  //event method
  onInput(e) {
    this.fire("input", e);
  },
  onFocus(e) {
    this.data.set("isOnInputing", true);
    this.fire("focus", e);
  },
  onBlur(e) {
    this.data.set("isOnInputing", false);
    this.fire("blur", e);
  }
});
