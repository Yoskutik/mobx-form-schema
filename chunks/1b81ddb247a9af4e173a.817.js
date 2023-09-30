"use strict";(self.webpackChunk_yoskutik_mobx_form_schema_docs=self.webpackChunk_yoskutik_mobx_form_schema_docs||[]).push([[817],{2817:function(e,r,s){s.r(r),s.d(r,{default:function(){return m}});var a=s(8993),t=s(1568),c={filename:"NestedSchemaSchema.ts",code:"import { FormSchema, nestedSchemasArray } from '@yoskutik/mobx-form-schema';\r\n\r\nclass NestedSchema extends FormSchema {\r\n  prop1 = 1;\r\n}\r\n\r\nexport class NestedSchemaSchema extends FormSchema {\r\n  // Just an alias for this:\r\n  //  @validate(schemas => schemas.some(schema => !schema.isValid))\r\n  //  @watch.schemasArray\r\n  //  @factory.schemasArray(NestedSchema)\r\n  //  @present(schemas => schemas.map(schema => schema.presentation))\r\n  @nestedSchemasArray(NestedSchema)\r\n  prop1 = [NestedSchema.create()];\r\n}\r\n"};let h=()=>(0,a.BX)(t.$0,{title:(0,a.BX)(a.HY,{children:["The ",(0,a.tZ)(t.EK,{children:"@nestedSchemasArray"})," decorator"]}),children:[(0,a.BX)(t.xv,{children:["The ",(0,a.tZ)(t.EK,{children:"@nestedSchemasArray"})," decorator is just a sugar to improve your developer experience. It works the same as the ",(0,a.tZ)(t.EK,{children:"@nestedSchema"})," decorator, but for an array of nested schemas."]}),(0,a.BX)(t.xv,{children:["The ",(0,a.tZ)(t.EK,{children:"@nestedSchemasArray"})," receives a class of the nested form schema for the desired property."]}),(0,a.tZ)(t.$0,{title:"Example of usage",children:(0,a.tZ)(t.KE,{items:[c]})})]});var m=h}}]);