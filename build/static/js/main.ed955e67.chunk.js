(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t(2),r=t(15),a=t.n(r),i=t(3),u=t(5),s=t(4),l=t.n(s),d="/api/persons",f={getAll:function(){return l.a.get(d)},del:function(e,n){return l.a.delete("".concat(d,"/").concat(e),n)},create:function(e){return l.a.post(d,e)},update:function(e,n){return l.a.put("".concat(d,"/").concat(e),n)}},m=function(e){var n=e.setNewName,t=e.newName,o=e.setPersons,r=e.setNumber,a=e.newNumber,i=e.persons,s=e.setNotification;return Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c=t.toLowerCase(),l=i.find((function(e){return e.name.toLowerCase()===c})),d=i.find((function(e){return e.phoneNumber===a}));l?window.confirm("".concat(t," is already added to phonebook. Do you want to replace old number with new one?"))&&function(e){var n=Object(u.a)(Object(u.a)({},e),{},{phoneNumber:a});f.update(e.id,n).then((function(t){o((function(t){return t.map((function(t){return e.id===t.id?n:t}))})),s("Number changed successfully to ".concat(a)),setTimeout((function(){s(null)}),5e3)})).catch((function(n){s("Information of ".concat(e.name," has already been removed from server")),setTimeout((function(){s(null)}),5e3)}))}(l):d?window.confirm("PhoneNumber is already added to phonebook. Do you want to replace contact name with ".concat(t,"?"))&&(!function(e){var n=Object(u.a)(Object(u.a)({},e),{},{name:t});f.update(e.id,n).then((function(c){o((function(t){return t.map((function(t){return e.id===t.id?n:t}))})),s("Name changed successfully to ".concat(t)),setTimeout((function(){s(null)}),5e3)})).catch((function(n){s("Information of ".concat(e.name," has already been removed from server")),setTimeout((function(){s(null)}),5e3)}))}(d),n(" "),r(" ")):function(){var e={name:t,id:i.length+1,number:"".concat(a)};f.create(e).then((function(e){n(""),r(""),s("Contact added successfully"),setTimeout((function(){s(null)}),5e3)})),f.getAll().then((function(e){o(e.data)}))}()},children:[Object(c.jsxs)("div",{style:{margin:"1rem 0"},children:["name: ",Object(c.jsx)("input",{value:t,onChange:function(e){n(e.target.value)},required:!0})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:a,onChange:function(e){r(e.target.value)},required:!0})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Add"})})]})},b=function(e){return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("p",{children:[e.person," ",Object(c.jsx)("br",{}),e.phoneNumber," ",Object(c.jsx)("button",{onClick:e.handledelete,style:{margin:"0 1rem"},children:"Delete"})]})})},j=function(e){var n=e.nameFilter,t=e.persons,o=e.setPersons,r=e.setNotification,a=n.trim()?t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})):t;return Object(c.jsx)(c.Fragment,{children:a.map((function(e){return Object(c.jsx)(b,{person:e.name,phoneNumber:e.number,handledelete:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&f.del(e,n).then((function(n){o(t.filter((function(n){return n.id!==e})))})).catch((function(e){r("Information of ".concat(n.name," has already been removed from server")),setTimeout((function(){r(null)}),5e3)}))}(e.id)}},e.id)}))})},h=function(e){var n=e.nameFilter,t=e.setNameFilter;e.persons;return Object(c.jsxs)("form",{children:[Object(c.jsx)("h2",{children:"Search Contact"}),Object(c.jsx)("input",{type:"search",placeholder:"Type to search",value:n,onChange:function(e){t(e.target.value)}})]})},p=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"notification",children:n})};t(39);var O=function(){var e=Object(o.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],a=Object(o.useState)(""),u=Object(i.a)(a,2),s=u[0],l=u[1],d=Object(o.useState)(""),b=Object(i.a)(d,2),O=b[0],v=b[1],x=Object(o.useState)(""),N=Object(i.a)(x,2),w=N[0],g=N[1],y=Object(o.useState)(null),C=Object(i.a)(y,2),k=C[0],F=C[1];return Object(o.useEffect)((function(){f.getAll().then((function(e){r(e.data)}))}),[]),Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Phonebook"}),Object(c.jsx)(p,{message:k}),Object(c.jsx)(h,{nameFilter:w,setNameFilter:g,persons:t}),Object(c.jsx)("h2",{children:"Add New Contact"}),Object(c.jsx)(m,{setNewName:l,newName:s,setPersons:r,setNumber:v,newNumber:O,persons:t,setNotification:F}),Object(c.jsx)("h2",{children:"Contact List"}),Object(c.jsx)(j,{nameFilter:w,persons:t,setPersons:r,setNotification:F})]})};a.a.render(Object(c.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.ed955e67.chunk.js.map