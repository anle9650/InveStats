(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shares-input-modal"],{bdc9:function(e,t,a){"use strict";a.r(t);var s=a("7a23"),l={class:"modal-dialog modal-dialog-centered"},n={class:"modal-content"},i={class:"modal-header"},o={class:"modal-title"},d=Object(s["createVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),r={class:"modal-body"},c={class:"form-floating"},u={class:"invalid-feedback"},b={class:"modal-footer"},h=Object(s["createVNode"])("i",{class:"bi bi-check2"},null,-1),p=Object(s["createTextVNode"])(" Confirm "),m=Object(s["createVNode"])("i",{class:"bi bi-x"},null,-1),v=Object(s["createTextVNode"])(" Cancel ");function O(e,t,a,O,j,f){return Object(s["openBlock"])(),Object(s["createBlock"])("div",{class:"modal fade",id:a.id,tabindex:"-1"},[Object(s["createVNode"])("div",l,[Object(s["createVNode"])("div",n,[Object(s["createVNode"])("div",i,[Object(s["createVNode"])("h5",o,Object(s["toDisplayString"])("buy"==a.type?"Buy":"Sell")+" how many shares? ",1),d]),Object(s["createVNode"])("div",r,[Object(s["createVNode"])("form",c,[Object(s["withDirectives"])(Object(s["createVNode"])("input",{type:"number",class:["form-control",j.validationClass],"onUpdate:modelValue":t[1]||(t[1]=function(e){return j.sharesInput=e})},null,2),[[s["vModelText"],j.sharesInput]]),Object(s["createVNode"])("div",u," Please provide a number greater than 0"+Object(s["toDisplayString"])("sell"==a.type?" and less than or equal to "+a.sharesOwned:"")+". ",1),Object(s["createVNode"])("label",null,"Shares of "+Object(s["toDisplayString"])(a.symbol),1)])]),Object(s["createVNode"])("div",b,[Object(s["createVNode"])("button",{class:"btn btn-outline-success","data-bs-dismiss":"modal",disabled:!f.validSharesInput,onClick:t[2]||(t[2]=function(t){e.$emit("confirmShares",j.sharesInput),j.sharesInput=null})},[h,p],8,["disabled"]),Object(s["createVNode"])("button",{class:"btn btn-outline-danger","data-bs-target":a.previousModal,"data-bs-toggle":[a.previousModal?"modal":null],"data-bs-dismiss":"modal",onClick:t[3]||(t[3]=function(e){return j.sharesInput=null})},[m,v],8,["data-bs-target","data-bs-toggle"])])])])],8,["id"])}a("caad"),a("a9e3");var j={name:"shares-input-modal",props:{id:String,type:{type:String,default:"buy",validator:function(e){return["buy","sell"].includes(e)}},symbol:String,sharesOwned:Number,previousModal:String},emits:["confirmShares"],data:function(){return{sharesInput:null,validationClass:null}},watch:{sharesInput:function(){this.validSharesInput?this.validationClass="is-valid":void 0===this.validSharesInput?this.validationClass=null:this.validationClass="is-invalid"}},computed:{validSharesInput:function(){return!("sell"===this.type&&this.sharesInput>this.sharesOwned)&&(this.sharesInput>0||null==this.sharesInput&&void 0)}}};j.render=O;t["default"]=j}}]);
//# sourceMappingURL=shares-input-modal.e6c3f5d8.js.map