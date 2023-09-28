"use strict";(self.webpackChunk_yoskutik_mobx_form_schema_docs=self.webpackChunk_yoskutik_mobx_form_schema_docs||[]).push([[502],{6656:function(e,t,r){r.d(t,{H:function(){return a}});var n=r(8993);let a=()=>(0,n.tZ)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:(0,n.tZ)("path",{d:"M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8M9 5c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9V5Z",strokeLinecap:"round",stroke:"currentColor",strokeWidth:"2"})})},8502:function(e,t,r){let n,a,i,s,o,c,l,m,h,d,p,f,u,v,y,b,x,S,g,w,k,C,B,E,Z,O,T,j;r.r(t),r.d(t,{default:function(){return eu}});var F,I,N,A,X,P,D=r(8993),z=r(1568),M={filename:"ArrayExample.tsx",code:"import { observer } from 'mobx-react';\r\nimport { useMemo } from 'react';\r\nimport { ChoiceField } from '@components';\r\nimport { SchemaObservationInfo } from '../SchemaObservationInfo';\r\nimport { ObservationButtons } from '../ObservationButtons';\r\nimport { ArraySchema } from './ArraySchema';\r\n\r\nexport const ArrayExample = observer(() => {\r\n  const schema = useMemo(() => ArraySchema.create(), []);\r\n\r\n  const handleSaveClick = () => {\r\n    schema.sync();\r\n  };\r\n\r\n  const handleRestoreClick = () => {\r\n    schema.reset();\r\n  };\r\n\r\n  return (\r\n    <div>\r\n      <ChoiceField schema={schema} field=\"skillsArray\" label=\"Skills as array\" />\r\n      <ChoiceField schema={schema} field=\"skillsSet\" label=\"Skills as set\" />\r\n\r\n      <ObservationButtons\r\n        onRestore={handleRestoreClick}\r\n        onSave={handleSaveClick}\r\n        schema={schema}\r\n      />\r\n\r\n      <SchemaObservationInfo schema={schema} />\r\n    </div>\r\n  );\r\n});\r\n"},K={filename:"ArraySchema.ts",code:"import { FormSchema, watch } from '@yoskutik/mobx-form-schema';\r\n\r\nexport class ArraySchema extends FormSchema {\r\n  @watch.array skillsArray = ['HTML', 'CSS', 'JavaScript'];\r\n\r\n  @watch.set skillsSet = new Set(['HTML', 'CSS', 'JavaScript']);\r\n}\r\n"},R={filename:"CVSchema.ts",code:"import { FormSchema, watch } from '@yoskutik/mobx-form-schema';\r\nimport { ContactsSchema } from './ContactsSchema';\r\nimport { ExperienceSchema } from './ExperienceSchema';\r\n\r\nexport class CVSchema extends FormSchema {\r\n  @watch name = 'Joe';\r\n\r\n  @watch surname = 'Dough';\r\n\r\n  @watch.schema contacts = ContactsSchema.create();\r\n\r\n  @watch.schemasArray experience = [\r\n    ExperienceSchema.create({\r\n      position: 'Frontend Developer',\r\n      company: 'Big Company',\r\n    }),\r\n  ];\r\n}\r\n"},J={filename:"ContactsSchema.ts",code:"import { FormSchema, watch } from '@yoskutik/mobx-form-schema';\r\n\r\nexport class ContactsSchema extends FormSchema {\r\n  @watch email = 'joe.dough@any.com';\r\n\r\n  @watch tel = '';\r\n}\r\n"},_={filename:"ExperienceSchema.ts",code:"import { FormSchema, watch } from '@yoskutik/mobx-form-schema';\r\n\r\nexport class ExperienceSchema extends FormSchema {\r\n  id = Math.random();\r\n\r\n  @watch position = '';\r\n\r\n  @watch company = '';\r\n}\r\n"},H={filename:"NestedExample.tsx",code:'import { observer } from \'mobx-react\';\r\nimport { useMemo } from \'react\';\r\nimport { action } from \'mobx\';\r\nimport { Button, TextField } from \'@components\';\r\nimport { SchemaObservationInfo } from \'../SchemaObservationInfo\';\r\nimport { ObservationButtons } from \'../ObservationButtons\';\r\nimport { Delete } from \'../../Delete\';\r\nimport { ExperienceSchema } from \'./ExperienceSchema\';\r\nimport { CVSchema } from \'./CVSchema\';\r\nimport styles from \'./NestedExample.module.scss\';\r\n\r\nexport const NestedExample = observer(() => {\r\n  const schema = useMemo(() => CVSchema.create(), []);\r\n\r\n  const handleSaveClick = () => {\r\n    schema.sync();\r\n  };\r\n\r\n  const handleRestoreClick = () => {\r\n    schema.reset();\r\n  };\r\n\r\n  const handleAddItemClick = action(() => {\r\n    schema.experience.push(ExperienceSchema.create());\r\n  });\r\n\r\n  const handleDeleteItemClick = action((i: number) => {\r\n    schema.experience.splice(i, 1);\r\n  });\r\n\r\n  return (\r\n    <div className={styles.root}>\r\n      <form className={styles.form}>\r\n        <b className={styles.experienceTitle}>Resume:</b>\r\n        <TextField schema={schema} field="name" label="Name" />\r\n        <TextField schema={schema} field="surname" label="Surname" />\r\n\r\n        <div className={styles.contacts}>\r\n          <b>Contacts:</b>\r\n          <TextField schema={schema.contacts} field="email" type="email" label="E-mail" />\r\n          <TextField schema={schema.contacts} field="tel" type="tel" label="Phone number" />\r\n        </div>\r\n\r\n        <div className={styles.experience}>\r\n          <b>Experience:</b>\r\n          {schema.experience.map((item, i) => (\r\n            <div key={item.id} className={styles.experienceItem}>\r\n              <Button variant="secondary" onClick={() => handleDeleteItemClick(i)} size="s">\r\n                <Delete />\r\n              </Button>\r\n              <div className={styles.experienceItemBody}>\r\n                <b className={styles.experienceTitle}>\r\n                  {i + 1}. {item.company && `At ${item.company}`}\r\n                </b>\r\n                <TextField schema={item} field="position" label="Position" />\r\n                <TextField schema={item} field="company" label="Company" />\r\n              </div>\r\n            </div>\r\n          ))}\r\n          <Button variant="secondary" size="s" onClick={handleAddItemClick} className={styles.addBtn}>\r\n            Add experience block\r\n          </Button>\r\n        </div>\r\n\r\n        <ObservationButtons\r\n          onRestore={handleRestoreClick}\r\n          onSave={handleSaveClick}\r\n          schema={schema}\r\n        />\r\n      </form>\r\n\r\n      <SchemaObservationInfo schema={schema} />\r\n    </div>\r\n  );\r\n});\r\n'},V=r(7974),L=r(4309),W=r(8379),$=r(75),Y=r(4133),G=r(858),Q=r(6656),q=r(8816),U=function(e,t,r){for(var n=arguments.length>2,a=0;a<t.length;a++)r=n?t[a].call(e,r):t[a].call(e);return n?r:void 0},ee=function(e,t,r,n,a,i){function s(e){if(void 0!==e&&"function"!=typeof e)throw TypeError("Function expected");return e}for(var o,c=n.kind,l="getter"===c?"get":"setter"===c?"set":"value",m=!t&&e?n.static?e:e.prototype:null,h=t||(m?Object.getOwnPropertyDescriptor(m,n.name):{}),d=!1,p=r.length-1;p>=0;p--){var f={};for(var u in n)f[u]="access"===u?{}:n[u];for(var u in n.access)f.access[u]=n.access[u];f.addInitializer=function(e){if(d)throw TypeError("Cannot add initializers after decoration has completed");i.push(s(e||null))};var v=(0,r[p])("accessor"===c?{get:h.get,set:h.set}:h[l],f);if("accessor"===c){if(void 0===v)continue;if(null===v||"object"!=typeof v)throw TypeError("Object expected");(o=s(v.get))&&(h.get=o),(o=s(v.set))&&(h.set=o),(o=s(v.init))&&a.unshift(o)}else(o=s(v))&&("field"===c?a.unshift(o):h[l]=o)}m&&Object.defineProperty(m,n.name,h),d=!0};let et=(i=q.FormSchema,s=[],o=[],c=[],F=class extends i{constructor(){super(...arguments),this.id=(U(this,s),Math.random()),this.position=U(this,o,""),this.company=U(this,c,"")}},(()=>{var e;let t="function"==typeof Symbol&&Symbol.metadata?Object.create(null!==(e=i[Symbol.metadata])&&void 0!==e?e:null):void 0;n=[q.watch],a=[q.watch],ee(null,null,n,{kind:"field",name:"position",static:!1,private:!1,access:{has:e=>"position"in e,get:e=>e.position,set:(e,t)=>{e.position=t}},metadata:t},o,s),ee(null,null,a,{kind:"field",name:"company",static:!1,private:!1,access:{has:e=>"company"in e,get:e=>e.company,set:(e,t)=>{e.company=t}},metadata:t},c,s),t&&Object.defineProperty(F,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:t})})(),F);var er=function(e,t,r,n,a,i){function s(e){if(void 0!==e&&"function"!=typeof e)throw TypeError("Function expected");return e}for(var o,c=n.kind,l="getter"===c?"get":"setter"===c?"set":"value",m=!t&&e?n.static?e:e.prototype:null,h=t||(m?Object.getOwnPropertyDescriptor(m,n.name):{}),d=!1,p=r.length-1;p>=0;p--){var f={};for(var u in n)f[u]="access"===u?{}:n[u];for(var u in n.access)f.access[u]=n.access[u];f.addInitializer=function(e){if(d)throw TypeError("Cannot add initializers after decoration has completed");i.push(s(e||null))};var v=(0,r[p])("accessor"===c?{get:h.get,set:h.set}:h[l],f);if("accessor"===c){if(void 0===v)continue;if(null===v||"object"!=typeof v)throw TypeError("Object expected");(o=s(v.get))&&(h.get=o),(o=s(v.set))&&(h.set=o),(o=s(v.init))&&a.unshift(o)}else(o=s(v))&&("field"===c?a.unshift(o):h[l]=o)}m&&Object.defineProperty(m,n.name,h),d=!0},en=function(e,t,r){for(var n=arguments.length>2,a=0;a<t.length;a++)r=n?t[a].call(e,r):t[a].call(e);return n?r:void 0};let ea=(h=q.FormSchema,d=[],p=[],f=[],I=class extends h{constructor(){super(...arguments),this.email=(en(this,d),en(this,p,"joe.dough@any.com")),this.tel=en(this,f,"")}},(()=>{var e;let t="function"==typeof Symbol&&Symbol.metadata?Object.create(null!==(e=h[Symbol.metadata])&&void 0!==e?e:null):void 0;l=[q.watch],m=[q.watch],er(null,null,l,{kind:"field",name:"email",static:!1,private:!1,access:{has:e=>"email"in e,get:e=>e.email,set:(e,t)=>{e.email=t}},metadata:t},p,d),er(null,null,m,{kind:"field",name:"tel",static:!1,private:!1,access:{has:e=>"tel"in e,get:e=>e.tel,set:(e,t)=>{e.tel=t}},metadata:t},f,d),t&&Object.defineProperty(I,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:t})})(),I);var ei=function(e,t,r,n,a,i){function s(e){if(void 0!==e&&"function"!=typeof e)throw TypeError("Function expected");return e}for(var o,c=n.kind,l="getter"===c?"get":"setter"===c?"set":"value",m=!t&&e?n.static?e:e.prototype:null,h=t||(m?Object.getOwnPropertyDescriptor(m,n.name):{}),d=!1,p=r.length-1;p>=0;p--){var f={};for(var u in n)f[u]="access"===u?{}:n[u];for(var u in n.access)f.access[u]=n.access[u];f.addInitializer=function(e){if(d)throw TypeError("Cannot add initializers after decoration has completed");i.push(s(e||null))};var v=(0,r[p])("accessor"===c?{get:h.get,set:h.set}:h[l],f);if("accessor"===c){if(void 0===v)continue;if(null===v||"object"!=typeof v)throw TypeError("Object expected");(o=s(v.get))&&(h.get=o),(o=s(v.set))&&(h.set=o),(o=s(v.init))&&a.unshift(o)}else(o=s(v))&&("field"===c?a.unshift(o):h[l]=o)}m&&Object.defineProperty(m,n.name,h),d=!0},es=function(e,t,r){for(var n=arguments.length>2,a=0;a<t.length;a++)r=n?t[a].call(e,r):t[a].call(e);return n?r:void 0};let eo=(x=q.FormSchema,S=[],g=[],w=[],k=[],C=[],N=class extends x{constructor(){super(...arguments),this.name=(es(this,S),es(this,g,"Joe")),this.surname=es(this,w,"Dough"),this.contacts=es(this,k,ea.create()),this.experience=es(this,C,[et.create({position:"Frontend Developer",company:"Big Company"})])}},(()=>{var e;let t="function"==typeof Symbol&&Symbol.metadata?Object.create(null!==(e=x[Symbol.metadata])&&void 0!==e?e:null):void 0;u=[q.watch],v=[q.watch],y=[(e=q.watch).schema.bind(e)],b=[(A=q.watch).schemasArray.bind(A)],ei(null,null,u,{kind:"field",name:"name",static:!1,private:!1,access:{has:e=>"name"in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:t},g,S),ei(null,null,v,{kind:"field",name:"surname",static:!1,private:!1,access:{has:e=>"surname"in e,get:e=>e.surname,set:(e,t)=>{e.surname=t}},metadata:t},w,S),ei(null,null,y,{kind:"field",name:"contacts",static:!1,private:!1,access:{has:e=>"contacts"in e,get:e=>e.contacts,set:(e,t)=>{e.contacts=t}},metadata:t},k,S),ei(null,null,b,{kind:"field",name:"experience",static:!1,private:!1,access:{has:e=>"experience"in e,get:e=>e.experience,set:(e,t)=>{e.experience=t}},metadata:t},C,S),t&&Object.defineProperty(N,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:t})})(),N);var ec={root:"m0EF",form:"D77W",contacts:"gYtW",experience:"llvj",experienceItem:"Q_2y",experienceItemBody:"BKyj",experienceTitle:"gV6n",addBtn:"Hj8m"};let el=(0,L.Pi)(()=>{let e=(0,W.useMemo)(()=>eo.create(),[]),t=()=>{e.sync()},r=()=>{e.reset()},n=(0,$.aD)(()=>{e.experience.push(et.create())}),a=(0,$.aD)(t=>{e.experience.splice(t,1)});return(0,D.BX)("div",{className:ec.root,children:[(0,D.BX)("form",{className:ec.form,children:[(0,D.tZ)("b",{className:ec.experienceTitle,children:"Resume:"}),(0,D.tZ)(z.nv,{schema:e,field:"name",label:"Name"}),(0,D.tZ)(z.nv,{schema:e,field:"surname",label:"Surname"}),(0,D.BX)("div",{className:ec.contacts,children:[(0,D.tZ)("b",{children:"Contacts:"}),(0,D.tZ)(z.nv,{schema:e.contacts,field:"email",type:"email",label:"E-mail"}),(0,D.tZ)(z.nv,{schema:e.contacts,field:"tel",type:"tel",label:"Phone number"})]}),(0,D.BX)("div",{className:ec.experience,children:[(0,D.tZ)("b",{children:"Experience:"}),e.experience.map((e,t)=>(0,D.BX)("div",{className:ec.experienceItem,children:[(0,D.tZ)(z.zx,{variant:"secondary",onClick:()=>a(t),size:"s",children:(0,D.tZ)(Q.H,{})}),(0,D.BX)("div",{className:ec.experienceItemBody,children:[(0,D.BX)("b",{className:ec.experienceTitle,children:[t+1,". ",e.company&&`At ${e.company}`]}),(0,D.tZ)(z.nv,{schema:e,field:"position",label:"Position"}),(0,D.tZ)(z.nv,{schema:e,field:"company",label:"Company"})]})]},e.id)),(0,D.tZ)(z.zx,{variant:"secondary",size:"s",onClick:n,className:ec.addBtn,children:"Add experience block"})]}),(0,D.tZ)(G.A,{onRestore:r,onSave:t,schema:e})]}),(0,D.tZ)(Y.E,{schema:e})]})});var em=function(e,t,r,n,a,i){function s(e){if(void 0!==e&&"function"!=typeof e)throw TypeError("Function expected");return e}for(var o,c=n.kind,l="getter"===c?"get":"setter"===c?"set":"value",m=!t&&e?n.static?e:e.prototype:null,h=t||(m?Object.getOwnPropertyDescriptor(m,n.name):{}),d=!1,p=r.length-1;p>=0;p--){var f={};for(var u in n)f[u]="access"===u?{}:n[u];for(var u in n.access)f.access[u]=n.access[u];f.addInitializer=function(e){if(d)throw TypeError("Cannot add initializers after decoration has completed");i.push(s(e||null))};var v=(0,r[p])("accessor"===c?{get:h.get,set:h.set}:h[l],f);if("accessor"===c){if(void 0===v)continue;if(null===v||"object"!=typeof v)throw TypeError("Object expected");(o=s(v.get))&&(h.get=o),(o=s(v.set))&&(h.set=o),(o=s(v.init))&&a.unshift(o)}else(o=s(v))&&("field"===c?a.unshift(o):h[l]=o)}m&&Object.defineProperty(m,n.name,h),d=!0},eh=function(e,t,r){for(var n=arguments.length>2,a=0;a<t.length;a++)r=n?t[a].call(e,r):t[a].call(e);return n?r:void 0};let ed=(Z=q.FormSchema,O=[],T=[],j=[],X=class extends Z{constructor(){super(...arguments),this.skillsArray=(eh(this,O),eh(this,T,["HTML","CSS","JavaScript"])),this.skillsSet=eh(this,j,new Set(["HTML","CSS","JavaScript"]))}},(()=>{var e;let t="function"==typeof Symbol&&Symbol.metadata?Object.create(null!==(e=Z[Symbol.metadata])&&void 0!==e?e:null):void 0;B=[(e=q.watch).array.bind(e)],E=[(P=q.watch).set.bind(P)],em(null,null,B,{kind:"field",name:"skillsArray",static:!1,private:!1,access:{has:e=>"skillsArray"in e,get:e=>e.skillsArray,set:(e,t)=>{e.skillsArray=t}},metadata:t},T,O),em(null,null,E,{kind:"field",name:"skillsSet",static:!1,private:!1,access:{has:e=>"skillsSet"in e,get:e=>e.skillsSet,set:(e,t)=>{e.skillsSet=t}},metadata:t},j,O),t&&Object.defineProperty(X,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:t})})(),X),ep=(0,L.Pi)(()=>{let e=(0,W.useMemo)(()=>ed.create(),[]),t=()=>{e.sync()},r=()=>{e.reset()};return(0,D.BX)("div",{children:[(0,D.tZ)(z.IG,{schema:e,field:"skillsArray",label:"Skills as array"}),(0,D.tZ)(z.IG,{schema:e,field:"skillsSet",label:"Skills as set"}),(0,D.tZ)(G.A,{onRestore:r,onSave:t,schema:e}),(0,D.tZ)(Y.E,{schema:e})]})}),ef=()=>(0,D.BX)(D.HY,{children:[(0,D.BX)(z.$0,{title:"Form observation with non-primitive values",children:[(0,D.tZ)(z.xv,{children:"Sometimes using primitive values like boolean values, strings or numbers may be not enough for project' needs. For example, there can be a multi-select field and the best way to store data for such field is an array or a set."}),(0,D.BX)(z.xv,{children:["Although, as it was said in the previous article plain ",(0,D.tZ)(z.EK,{children:"@watch"})," decorator works well only with primitive values, there is a solution for such need. You can use ",(0,D.tZ)(z.EK,{children:"@watch"})," decorators modifiers."]}),(0,D.BX)(z.xv,{children:["These are ",(0,D.tZ)(z.EK,{children:"@watch"})," decorators modifiers:"]}),(0,D.BX)(z.aV,{children:[(0,D.BX)("li",{children:["With ",(0,D.tZ)(z.EK,{children:"@watch.array"})," you can observe arrays of primitive values;"]}),(0,D.BX)("li",{children:["With ",(0,D.tZ)(z.EK,{children:"@watch.set"})," you can observe sets of primitive values;"]}),(0,D.BX)("li",{children:["With ",(0,D.tZ)(z.EK,{children:"@watch.schema"})," you can observe nested form schemas;"]}),(0,D.BX)("li",{children:["With ",(0,D.tZ)(z.EK,{children:"@watch.schemasArray"})," you can observe arrays of nested form schemas."]})]}),(0,D.BX)(z.$0,{title:"Observing sets and and arrays",children:[(0,D.BX)(z.xv,{children:["If you apply ",(0,D.tZ)(z.EK,{children:"@watch.array"})," or ",(0,D.tZ)(z.EK,{children:"@watch.set"})," decorators to a property, it will automatically decorate the property with ",(0,D.tZ)(z.EK,{children:"observable.shallow"}),". Although, you can freely reassign it to any other observation from MobX."]}),(0,D.BX)(z.xv,{children:["Look at the example below. The ",(0,D.tZ)("i",{children:'"Skills as array"'})," field will be considered unchanged only if it contains the exact same values in the exact same order as they were in the initial state. While for ",(0,D.tZ)("i",{children:'"Skills as set"'})," field, it is enough to have the same values with no dependency on their positioning."]}),(0,D.tZ)(z.KE,{items:[K,M,V.Z],children:(0,D.tZ)(ep,{})})]}),(0,D.BX)(z.$0,{title:"Observing nested form schemas",children:[(0,D.tZ)(z.xv,{children:"Each field in a form must be a separate property in a schema. Therefore, if you have a few dozen or even hundreds of fields, the size of a form schema can grow dramatically. But you can logically combine some of the fields into groups, and such groups can be separated form schemas. For example, in a CV form contacts block can be a separate form schema."}),(0,D.tZ)(z.xv,{children:"And if you need to understand whether an entire form is changed, but some fields in this form are contained in separate schemas, all you have to do is make such schemas nested."}),(0,D.BX)(z.xv,{children:["In the example below, you can see several nested schemas. And even though this form is quite large, you can always understand whether it has been changed or not. Even if you change data in the ",(0,D.tZ)("i",{children:'"Contacts"'})," section. Even if you delete an experience item, create a new one and fill it in with the same data. And of course, you can restore and save the form schema entirely. And all this functionality is achieved with only a few decorators."]}),(0,D.tZ)(z.KE,{items:[R,J,_,H,V.Z],height:450}),(0,D.tZ)(el,{})]})]}),(0,D.tZ)(z.$0,{title:"Next",forcedLevel:3,children:(0,D.BX)(z.xv,{children:["The described modifiers of ",(0,D.tZ)(z.EK,{children:"@watch"})," decorator can cover most of your needs. But if you have an unusual task, you can create your own decorator and tell the schema how the current state of a property should be compared with the initial one. Read about it next."]})})]});var eu=ef},858:function(e,t,r){r.d(t,{A:function(){return s}});var n=r(8993),a=r(4309),i=r(1568);let s=(0,a.Pi)(({schema:e,onRestore:t,onSave:r})=>(0,n.BX)("div",{style:{marginTop:12},children:[(0,n.tZ)(i.zx,{variant:"primary",onClick:r,disabled:!e.isChanged,children:"Save"}),(0,n.tZ)(i.zx,{onClick:t,disabled:!e.isChanged,style:{marginLeft:12},variant:"primary",children:"Restore"})]}))},4133:function(e,t,r){r.d(t,{E:function(){return o}});var n=r(8993),a=r(4309),i=r(75),s={root:"HQPJ",pre:"gwvf",preItem:"FVu9"};let o=(0,a.Pi)(({schema:e})=>{let t=e=>{let t=(0,i.ZN)(e);return JSON.stringify(t instanceof Set?[...t]:t,void 0,2)};return(0,n.BX)("div",{className:s.root,children:[(0,n.BX)("span",{children:["Is form changed: ",e.isChanged.toString()]}),(0,n.BX)("div",{className:s.pre,children:["Changed properties: ",t(e.changedProperties)]}),(0,n.BX)("div",{className:s.pre,children:["Initial properties properties:",Object.keys(e).map(r=>(0,n.BX)("div",{className:s.preItem,children:[r,": ",t(e.getInitial(r))]},r))]})]})})},7974:function(e,t){t.Z={filename:"SchemaObservationInfo.tsx",code:"import { FormSchema } from '@yoskutik/mobx-form-schema';\r\nimport { observer } from 'mobx-react';\r\nimport { toJS } from 'mobx';\r\nimport styles from './SchemaObservationInfo.module.scss';\r\n\r\ntype Props<T extends FormSchema> = {\r\n  schema: T;\r\n};\r\n\r\nexport const SchemaObservationInfo = observer(<T extends FormSchema>({ schema }: Props<T>) => {\r\n  const stringify = (data: unknown) => {\r\n    const jsData = toJS(data);\r\n    return JSON.stringify(jsData instanceof Set ? [...jsData] : jsData, undefined, 2);\r\n  };\r\n\r\n  return (\r\n    <div className={styles.root}>\r\n      <span>Is form changed: {schema.isChanged.toString()}</span>\r\n\r\n      <div className={styles.pre}>\r\n        Changed properties: {stringify(schema.changedProperties)}\r\n      </div>\r\n\r\n      <div className={styles.pre}>\r\n        Initial properties properties:\r\n        {Object.keys(schema).map(property => (\r\n          <div className={styles.preItem} key={property}>\r\n            {property}: {stringify(schema.getInitial(property as any))}\r\n          </div>\r\n        ))}\r\n      </div>\r\n    </div>\r\n  );\r\n});\r\n"}}}]);