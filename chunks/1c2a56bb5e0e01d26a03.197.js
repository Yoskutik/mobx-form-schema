"use strict";(self.webpackChunk_yoskutik_mobx_form_schema_docs=self.webpackChunk_yoskutik_mobx_form_schema_docs||[]).push([[197],{4105:function(e,t,a){a.d(t,{C1:function(){return r},Do:function(){return n},Ei:function(){return o},b6:function(){return i}});let r=()=>e=>(null==e||!e.trim())&&"This field is required.",n=()=>e=>!/\S+@\S+\.\S+/.test(e)&&"Invalid email format.",i=()=>e=>!/^[a-zA-Z0-9_]+$/.test(e)&&"You can use only latin letters, digits and underscore sign.",o=e=>t=>t.length<e&&`Should be at least ${e} characters.`},4922:function(e,t,a){let r,n,i,o,s,l;a.d(t,{l:function(){return p}});var d,c=a(8520),h=a(4105),m=function(e,t,a,r,n,i){function o(e){if(void 0!==e&&"function"!=typeof e)throw TypeError("Function expected");return e}for(var s,l=r.kind,d="getter"===l?"get":"setter"===l?"set":"value",c=!t&&e?r.static?e:e.prototype:null,h=t||(c?Object.getOwnPropertyDescriptor(c,r.name):{}),m=!1,u=a.length-1;u>=0;u--){var f={};for(var p in r)f[p]="access"===p?{}:r[p];for(var p in r.access)f.access[p]=r.access[p];f.addInitializer=function(e){if(m)throw TypeError("Cannot add initializers after decoration has completed");i.push(o(e||null))};var v=(0,a[u])("accessor"===l?{get:h.get,set:h.set}:h[d],f);if("accessor"===l){if(void 0===v)continue;if(null===v||"object"!=typeof v)throw TypeError("Object expected");(s=o(v.get))&&(h.get=s),(s=o(v.set))&&(h.set=s),(s=o(v.init))&&n.unshift(s)}else(s=o(v))&&("field"===l?n.unshift(s):h[d]=s)}c&&Object.defineProperty(c,r.name,h),m=!0},u=function(e,t,a){for(var r=arguments.length>2,n=0;n<t.length;n++)a=r?t[n].call(e,a):t[n].call(e);return r?a:void 0};let f=()=>(e,t)=>e!==t.password&&"Passwords mismatched",p=(i=c.FormSchema,o=[],s=[],l=[],d=class extends i{constructor(){super(...arguments),this.password=(u(this,o),u(this,s,"")),this.confirmPassword=u(this,l,"")}},(()=>{var e;let t="function"==typeof Symbol&&Symbol.metadata?Object.create(null!==(e=i[Symbol.metadata])&&void 0!==e?e:null):void 0;r=[(0,c.validate)((0,h.C1)(),(0,h.Ei)(8)),c.watch],n=[(0,c.validate)((0,h.C1)(),f()),c.watch],m(null,null,r,{kind:"field",name:"password",static:!1,private:!1,access:{has:e=>"password"in e,get:e=>e.password,set:(e,t)=>{e.password=t}},metadata:t},s,o),m(null,null,n,{kind:"field",name:"confirmPassword",static:!1,private:!1,access:{has:e=>"confirmPassword"in e,get:e=>e.confirmPassword,set:(e,t)=>{e.confirmPassword=t}},metadata:t},l,o),t&&Object.defineProperty(d,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:t})})(),d)},3197:function(e,t,a){let r,n,i,o,s,l,d,c;a.r(t),a.d(t,{default:function(){return V}});var h,m=a(8993),u=a(1568),f={filename:"ComplexExample.tsx",code:'import { observer } from \'mobx-react\';\r\nimport { useMemo } from \'react\';\r\nimport { TextField } from \'@components\';\r\nimport { ComplexSchema } from \'./ComplexSchema\';\r\n\r\nexport const ComplexExample = observer(() => {\r\n  const schema = useMemo(() => ComplexSchema.create(), []);\r\n\r\n  return (\r\n    <div>\r\n      <TextField schema={schema} field="password" type="password" required label="Password" />\r\n      <TextField\r\n        label="Confirm your password"\r\n        field="confirmPassword"\r\n        schema={schema}\r\n        type="password"\r\n        required\r\n      />\r\n      <span>Is form valid: {schema.isValid.toString()}</span>\r\n      <pre style={{ whiteSpace: \'pre-wrap\' }}>\r\n        Form errors: {JSON.stringify(schema.errors, undefined, 2)}\r\n      </pre>\r\n    </div>\r\n  );\r\n});\r\n'},p={filename:"ComplexSchema.ts",code:"import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';\r\nimport { minLength, required } from '../../LearnStartPage/validators';\r\n\r\nconst confirmPassword = () => (\r\n  (confirmPasswordValue: string, schema: ComplexSchema): boolean | string => {\r\n    if (confirmPasswordValue === schema.password) return false;\r\n    return 'Passwords mismatched';\r\n  }\r\n);\r\n\r\nexport class ComplexSchema extends FormSchema {\r\n  @validate(required(), minLength(8))\r\n  @watch password = '';\r\n\r\n  @validate(required(), confirmPassword())\r\n  @watch confirmPassword = '';\r\n}\r\n"},v={filename:"ConditionalSchema.ts",code:"import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';\r\nimport { email, required } from '../../LearnStartPage/validators';\r\n\r\nconst shouldValidateEmail = (emailValue: string) => !!emailValue;\r\n\r\nconst shouldValidatePetName = (name: string, schema: ConditionalSchema) => schema.doesHavePet;\r\n\r\nexport class ConditionalSchema extends FormSchema {\r\n  // or it can be @validate.if(Boolean, [email()])\r\n  @validate.if(shouldValidateEmail, [email()])\r\n  @watch email = '';\r\n\r\n  @watch doesHavePet = false;\r\n\r\n  @validate.if(shouldValidatePetName, [required()])\r\n  @watch petName = '';\r\n}\r\n"},y={filename:"ConditionalExample.tsx",code:'import { observer } from \'mobx-react\';\r\nimport { useMemo } from \'react\';\r\nimport { CheckboxField, TextField } from \'@components\';\r\nimport { ConditionalSchema } from \'./ConditionalSchema\';\r\n\r\nexport const ConditionalExample = observer(() => {\r\n  const schema = useMemo(() => ConditionalSchema.create(), []);\r\n\r\n  return (\r\n    <div>\r\n      <TextField schema={schema} field="email" type="email" label="E-mail" />\r\n      <CheckboxField schema={schema} field="doesHavePet" label="I have a pet" />\r\n      {schema.doesHavePet && (\r\n        <TextField schema={schema} label="Pet\'s name" field="petName" required />\r\n      )}\r\n      <span>Is form valid: {schema.isValid.toString()}</span>\r\n      <pre style={{ whiteSpace: \'pre-wrap\' }}>\r\n        Form errors: {JSON.stringify(schema.errors, undefined, 2)}\r\n      </pre>\r\n    </div>\r\n  );\r\n});\r\n'},w=a(4309),g=a(8379),b=a(4922);let x=(0,w.Pi)(()=>{let e=(0,g.useMemo)(()=>b.l.create(),[]);return(0,m.BX)("div",{children:[(0,m.tZ)(u.nv,{schema:e,field:"password",type:"password",required:!0,label:"Password"}),(0,m.tZ)(u.nv,{label:"Confirm your password",field:"confirmPassword",schema:e,type:"password",required:!0}),(0,m.BX)("span",{children:["Is form valid: ",e.isValid.toString()]}),(0,m.BX)("pre",{style:{whiteSpace:"pre-wrap"},children:["Form errors: ",JSON.stringify(e.errors,void 0,2)]})]})});var S=a(8520),P=a(4105),C=function(e,t,a,r,n,i){function o(e){if(void 0!==e&&"function"!=typeof e)throw TypeError("Function expected");return e}for(var s,l=r.kind,d="getter"===l?"get":"setter"===l?"set":"value",c=!t&&e?r.static?e:e.prototype:null,h=t||(c?Object.getOwnPropertyDescriptor(c,r.name):{}),m=!1,u=a.length-1;u>=0;u--){var f={};for(var p in r)f[p]="access"===p?{}:r[p];for(var p in r.access)f.access[p]=r.access[p];f.addInitializer=function(e){if(m)throw TypeError("Cannot add initializers after decoration has completed");i.push(o(e||null))};var v=(0,a[u])("accessor"===l?{get:h.get,set:h.set}:h[d],f);if("accessor"===l){if(void 0===v)continue;if(null===v||"object"!=typeof v)throw TypeError("Object expected");(s=o(v.get))&&(h.get=s),(s=o(v.set))&&(h.set=s),(s=o(v.init))&&n.unshift(s)}else(s=o(v))&&("field"===l?n.unshift(s):h[d]=s)}c&&Object.defineProperty(c,r.name,h),m=!0},F=function(e,t,a){for(var r=arguments.length>2,n=0;n<t.length;n++)a=r?t[n].call(e,a):t[n].call(e);return r?a:void 0};let E=e=>!!e,k=(e,t)=>t.doesHavePet,I=(o=S.FormSchema,s=[],l=[],d=[],c=[],h=class extends o{constructor(){super(...arguments),this.email=(F(this,s),F(this,l,"")),this.doesHavePet=F(this,d,!1),this.petName=F(this,c,"")}},(()=>{var e;let t="function"==typeof Symbol&&Symbol.metadata?Object.create(null!==(e=o[Symbol.metadata])&&void 0!==e?e:null):void 0;r=[S.validate.if(E,[(0,P.Do)()]),S.watch],n=[S.watch],i=[S.validate.if(k,[(0,P.C1)()]),S.watch],C(null,null,r,{kind:"field",name:"email",static:!1,private:!1,access:{has:e=>"email"in e,get:e=>e.email,set:(e,t)=>{e.email=t}},metadata:t},l,s),C(null,null,n,{kind:"field",name:"doesHavePet",static:!1,private:!1,access:{has:e=>"doesHavePet"in e,get:e=>e.doesHavePet,set:(e,t)=>{e.doesHavePet=t}},metadata:t},d,s),C(null,null,i,{kind:"field",name:"petName",static:!1,private:!1,access:{has:e=>"petName"in e,get:e=>e.petName,set:(e,t)=>{e.petName=t}},metadata:t},c,s),t&&Object.defineProperty(h,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:t})})(),h),Z=(0,w.Pi)(()=>{let e=(0,g.useMemo)(()=>I.create(),[]);return(0,m.BX)("div",{children:[(0,m.tZ)(u.nv,{schema:e,field:"email",type:"email",label:"E-mail"}),(0,m.tZ)(u.ji,{schema:e,field:"doesHavePet",label:"I have a pet"}),e.doesHavePet&&(0,m.tZ)(u.nv,{schema:e,label:"Pet's name",field:"petName",required:!0}),(0,m.BX)("span",{children:["Is form valid: ",e.isValid.toString()]}),(0,m.BX)("pre",{style:{whiteSpace:"pre-wrap"},children:["Form errors: ",JSON.stringify(e.errors,void 0,2)]})]})}),O=()=>(0,m.BX)(m.HY,{children:[(0,m.BX)(u.$0,{title:"Complex validation",children:[(0,m.BX)(u.xv,{children:["Sometimes the validity of a certain field depends not only on the value of this field, but also on a value of some other field. For example, a value of ",(0,m.tZ)("i",{children:'"Confirm password"'})," field must be the same as a value of ",(0,m.tZ)("i",{children:'"Password"'})," field. Or if a form has separate fields for specifying a month and a year, you'll have  to take both values into account to understand is it happening before or after the desired date."]}),(0,m.tZ)(u.xv,{children:"Also, the validation may be conditional. For example, a form can contain an optional field for an email, and email validity must be checked only if the value is not empty. In addition, the condition can depend on other fields' values."}),(0,m.BX)(u.$0,{title:"Validation dependent on entire schema",children:[(0,m.tZ)(u.xv,{children:"Each validation rule takes 2 arguments."}),(0,m.BX)(u.aV,{variant:"ol",children:[(0,m.BX)("li",{children:["The 1",(0,m.tZ)("sup",{children:"st"})," one is a value of a field the rule was applied on."]}),(0,m.BX)("li",{children:["The 2",(0,m.tZ)("sup",{children:"nd"})," one is an entire schema."]})]}),(0,m.tZ)(u.xv,{children:"So, if you want to create a validation rule, that should use a another value from a schema, you must simply use the second argument."}),(0,m.tZ)(u.KE,{items:[p,f,u.yH,u.Pe],children:(0,m.tZ)(x,{})})]}),(0,m.BX)(u.$0,{title:"Conditional validation",children:[(0,m.tZ)(u.xv,{children:"You can write not only validation rules, but also validation conditions. The validation condition must be a function, that receives 2 parameters — the current value of the field and the entire schema — and returns a boolean that tells whether the validation must be applied or not."}),(0,m.BX)(u.xv,{children:["If a condition returns ",(0,m.tZ)(u.EK,{children:"false"}),", the property will be validated. If not, the validation is skipped, and the property is considered to be valid."]}),(0,m.BX)(u.aV,{variant:"ol",children:[(0,m.BX)("li",{children:["The 1",(0,m.tZ)("sup",{children:"st"})," one is a value of a field the rule was applied on."]}),(0,m.BX)("li",{children:["The 2",(0,m.tZ)("sup",{children:"nd"})," one is an entire schema."]})]}),(0,m.tZ)(u.xv,{children:"So, if you want to create a validation rule, that should use an another value from a schema, you must simply use the second argument."}),(0,m.BX)(u.xv,{children:["To start applying conditional validation, you have to use ",(0,m.tZ)(u.EK,{children:"@validate.if"})," decorator."]}),(0,m.tZ)(u.KE,{items:[v,y,u.yH,u.NH,u.Pe],children:(0,m.tZ)(Z,{})})]}),(0,m.tZ)(u.$0,{title:"How does it update?",children:(0,m.BX)(u.xv,{children:["From the previous article, you knew that the validation in MobX Form Schema is applied using ",(0,m.tZ)(u.EK,{children:"autorun"})," function from MobX. Basically, it means that if the validation depends on some properties from the schema or if the validation condition depends on some properties from the schema, the validation will be recalculated each time any of those properties are changed. And you don't have to do it manually."]})})]}),(0,m.tZ)(u.$0,{title:"Next",forcedLevel:3,children:(0,m.tZ)(u.xv,{children:"But you may wonder, is there a way to disable such behavior of recalculating the validation each time and validate the form manually? There is one, and you can read about it in the next article."})})]});var V=O},4593:function(e,t,a){a.d(t,{FormSchema:function(){return q},factory:function(){return R},nestedSchema:function(){return eo},nestedSchemasArray:function(){return es},presentation:function(){return ea},validate:function(){return Z},watch:function(){return Q}});var r,n,i,o=a(75);let s=e=>Symbol(e),l=s(),d=s(),c=s("InitialValues"),h=s("Errors"),m=s("ChangedKeys"),u=s(),f=s(),p=s(),v=s(),y=Object,w="comparator",g="presentation",b="schema",x="schemasArray",S=y.keys,P=new WeakMap,C=(e,t="string")=>typeof e===t,F=e=>P.get(e),E=(e,t,a)=>(a=(a=F(t))&&a[e])?a:(a=C(a=y.getPrototypeOf(t),"object")?a:null)?E(e,a):void 0,k=(e,t)=>E(e,t)||{},I=(e,t,a,r,n,i)=>{t&&(C(a)||C(a,"symbol"))?((n=k(e,t))[p]!==t&&(n=y.assign({},n)),n[a]=r,n[p]=t,(F(t)||P.set(t,{})&&F(t))[e]=n):a.addInitializer(function(){I(e,this,a.name,r)})},Z=(...e)=>(t,a)=>I(d,t,a,{validators:e});Z.if=(e,t)=>(a,r)=>I(d,a,r,{validators:t,condition:e});let O=(e,t,a)=>W(S(e).concat(S(t))).forEach(e=>a(e)),V=(e,t,a)=>!!(t[a]&&(!t[a].condition||t[a].condition(e[a],e))),B=(e,t,a,r=V(e,t,a),n)=>!!t[a]&&(r&&t[a].validators.find(t=>n=t(e[a],e)),(0,o.z)(()=>C(n)||!0===n?e[h][a]=n:delete e[h][a]),n),X=(e,t,a,r)=>(r=!t[a]||t[a][w](e[a],e[c][a],e,a),(0,o.z)(()=>e[m][r?"delete":"add"](a)),!r),H=(e,t,a,r)=>S(r=k(t,e)).reduce((t,n)=>!!a(e,r,n)||t,!1),T=(e,t,a,r)=>S(r=k(l,e)).forEach(n=>a(e,n,r[n][t])),N=e=>{e[v]&&(e.updateIsValidAll(),e.updateIsChangedAny())},j=(e,t)=>S(e).forEach(e=>t(e));class q{static create(e={},t){let a=new this(e),r=k(u,a),n=k(d,a),i=k(l,a),s={[c]:o.LO.ref,[m]:o.LO,[h]:o.LO,[g]:o.Fl,isChanged:o.Fl,isValid:o.Fl,errors:o.Fl,updateIsPropertyChanged:o.aD,updateIsPropertyValid:o.aD,updateIsChangedAny:o.aD,updateIsValidAll:o.aD,reset:o.aD,sync:o.aD};O(r,e,t=>{r[t]?a[t]=r[t](e[t],e,a,a[t]):t in e&&(a[t]=e[t])}),j(i,(e,t,r)=>{(0,o.wn)(a,e)||(t=o.LO,(r=i[e][w])===L||r===D?t=o.LO.ref:(r===J||r===K||r===$)&&(t=o.LO.shallow),s[e]=t)});try{(0,o.rC)(a,s)}catch(e){j(s,e=>!(0,o.wn)(a,e)&&s[e](a,e)),(0,o.rC)(a)}return a.sync(),a[v]=t,t||(j(i,(e,t)=>(0,o.N7)(a,e,()=>(t&&t(),t=(0,o.EH)(()=>X(a,i,e))),!0)),j(n,(e,t)=>{t=o.LO.box(!1),(0,o.EH)(()=>t.set(V(a,n,e))),(0,o.EH)(()=>B(a,n,e,t.get()))})),a.onInit&&a.onInit(),a}get presentation(){let e={},t=this,a=k(f,t);return O(a,t,(r,n)=>{(n=a[r])&&n.hidden||(e[r]=n&&n[g]?n[g](t[r],t):t[r])}),e}get isChanged(){return this[m].size>0}get isValid(){return y.values(this[h]).every(e=>!e)}get errors(){return this[h]}get changedProperties(){return this[m]}getInitial(e){return this[c][e]}sync(){let e={};T(this,"saveFn",(t,a,r)=>e[a]=r(t[a],t)),this[c]=e,N(this)}reset(){T(this,"restoreFn",(e,t,a)=>e[t]=a(e[c][t],e)),N(this)}updateIsPropertyValid(e){return B(this,k(d,this),e)}updateIsValidAll(){return H(this,d,B)}updateIsPropertyChanged(e){return X(this,k(l,this),e)}updateIsChangedAny(){return H(this,l,X)}constructor(){this[r]={},this[n]=W(),this[i]={}}}r=h,n=m,i=c;let z=e=>(e&&e.sync(),e),A=e=>(e&&e.reset(),e),L=(e,t,a,r,n,i)=>(!e||!e.isChanged)&&(e===t||!!e&&!!t&&e.constructor===t.constructor&&((i=S(n=k(l,e)).find(a=>!n[a][w](e[a],t[a],e)))&&(0,o.z)(()=>e[c]=t[c]),!i)),_=e=>(t,a,r,n)=>!!(a&&t?a.length===t.length&&t.every((t,i)=>e(t,a[i],r,n)):a===t),D=(e,t)=>e===t,M=e=>e,$=_(L),K=(e,t,a,r)=>!!(e&&t&&e.size===t.size&&Array.from(e).every(e=>t.has(e))),J=_(D),Y=e=>e.slice(),W=e=>new Set(e),G=(e,t,a)=>{let r=(r,n)=>I(l,r,n,{[w]:e,saveFn:t,restoreFn:a});return r[w]=e,r},Q=G(D,M,M);Q.create=G,Q[b]=G(L,z,A),Q[x]=G($,e=>e?e.map(z):e,e=>e?e.map(A):e),Q.array=G(J,Y,Y),Q.set=G(K,W,W);let R=e=>(t,a)=>I(u,t,a,e),U=(e,t)=>t?e.create(t):t,ee=e=>(t,a)=>R((r,n,i,o)=>(t&&C(a)?a:a.name)in n?e(r,n,i,o):o)(t,a);R[b]=e=>ee(t=>U(e,t)),R[x]=e=>ee(t=>t?t.map(t=>U(e,t)):t),R.set=ee(W);let et=e=>(t,a)=>I(f,t,a,e),ea=e=>et({[g]:e});ea.hidden=et({hidden:!0});let er=(e,t,a,r,n,i)=>(Z(a)(e,t),r(e,t),n(e,t),ea(i)(e,t)),en=e=>!e.isValid,ei=e=>e[g],eo=e=>(t,a)=>er(t,a,en,Q[b],R[b](e),ei),es=e=>(t,a)=>er(t,a,e=>e.some(en),Q[x],R[x](e),e=>e.map(ei))},8520:function(e,t,a){e.exports=a(4593)}}]);