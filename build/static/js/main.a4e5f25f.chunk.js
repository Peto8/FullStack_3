(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),l=t.n(o),u=t(2),c=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"Filter with name: ",r.a.createElement("input",{value:e.filter,onChange:e.handleFilter})))},i=t(3),m=t.n(i),s="/api/persons",d=function(){return m.a.get(s)},f=function(e){return m.a.post(s,e)},b=function(e){return m.a.delete("".concat(s,"/").concat(e))},h=function(e,n){return m.a.put("".concat(s,"/").concat(e),n)},p=function(e){return r.a.createElement("form",{onSubmit:function(n){n.preventDefault();var t,a=!1,r=e.persons.map((function(n){return n.name===e.name?(a=!0,(t=Object.assign({},n)).number=e.number,t):n}));if(a)return window.confirm("".concat(e.name," is alredy added to phonebook,\n            replace the old number with a new one?"))?void h(t.id,t).then(e.setPersons(r),e.setNewName(""),e.setNewNumber(""),e.showNote("".concat(e.name," number changed to ").concat(t.number),!1)).catch((function(n){e.showNote("Person ".concat(e.name," has alredy been removed from the server"),!0),e.setPersons(r.filter((function(e){return e.id!==t.id})))})):void 0;if(""!==e.name&&""!==e.number){var o={name:e.name,number:e.number};f(o).then((function(n){return e.setPersons(e.persons.concat(n.data))}),e.setNewName(""),e.setNewNumber(""),e.showNote("Added ".concat(e.name),!1))}else e.showNote("Please enter name AND number",!0)}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.name,onChange:e.handleName})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.number,onChange:e.handleNumber})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},E=function(e,n,t,a){var r=[];window.confirm("Delete ".concat(e.name,"?"))&&(r=n.filter((function(n){return n.id!==e.id})),b(e.id).then(t(r),a("Deleted ".concat(e.name),!1)))},v=function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e.person.name),r.a.createElement("td",null,e.person.number),r.a.createElement("td",null,r.a.createElement("button",{type:"button",onClick:function(){return e.deleting(e.person)}},"delete")))},g=function(e){var n=e.persons;return""!==e.filter&&(n=e.persons.filter((function(n){return n.name.toLocaleLowerCase().includes(e.filter.toLocaleLowerCase())}))),r.a.createElement("table",null,r.a.createElement("tbody",null,n.map((function(n){return r.a.createElement(v,{key:n.name,person:n,deleting:e.deleting})}))))},w=function(e){var n=e.message,t={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:"10",marginBottom:"10"};return null===n?null:(t.color=n[1]?"red":"green",r.a.createElement("div",{style:t},n))},N=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],l=Object(a.useState)(""),i=Object(u.a)(l,2),m=i[0],s=i[1],f=Object(a.useState)(""),b=Object(u.a)(f,2),h=b[0],v=b[1],N=Object(a.useState)(""),j=Object(u.a)(N,2),O=j[0],y=j[1],S=Object(a.useState)(null),k=Object(u.a)(S,2),P=k[0],C=k[1];Object(a.useEffect)((function(){d().then((function(e){o(e.data.persons)}))}),[]);var D=function(e,n){C(["".concat(e),n]),setTimeout((function(){C(null)}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:P}),r.a.createElement(c,{value:O,handleFilter:function(e){y(e.target.value)}}),r.a.createElement("h3",null,"Add new"),r.a.createElement(p,{name:m,setNewName:s,number:h,setNewNumber:v,persons:t,setPersons:o,handleName:function(e){s(e.target.value)},handleNumber:function(e){v(e.target.value)},showNote:D}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(g,{filter:O,persons:t,deleting:function(e){E(e,t,o,D)}}))};l.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a4e5f25f.chunk.js.map