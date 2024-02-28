"use strict";(self.webpackChunkqmint_store_frontend=self.webpackChunkqmint_store_frontend||[]).push([[168],{1876:function(e,n,a){a.d(n,{A:function(){return v}});var t=a(6540),l=a(1641),r=a(9067),c=a(6942),m=a.n(c),o=a(9500),i=a(2186),s=a(5304);const u=[{text:"My Vault",href:"#",icon:t.createElement(i.Es,null),key:"enablemyvault"},{text:"Sell to Us",icon:t.createElement(i.nj,null),href:"#",key:"enableselltous"},{text:"Calculators",icon:t.createElement(i.o3,null),href:"#",key:"enablecalculators"},{text:"Loans",icon:t.createElement(i.aL,null),href:"#",key:"enableloans"},{text:"Wishlist",icon:t.createElement(i.T,null),href:"#",key:"enablewishlist"},{text:"Recent",icon:t.createElement(i.RP,null),href:"#",key:"enablerecent"},{text:"Compare",icon:t.createElement(i.HD,null),href:"#",key:"enablecompare"}];var g=a(9881);function E(){const{configDetails:e}=(0,g.G)((e=>e.homePage)),{0:n,1:a}=(0,t.useState)(!1),c=(0,t.useRef)(null);return t.createElement(o.C,{open:n,id:"ActionMenu",className:"TooltipOfferTag",placement:"bottom-end",onClose:e=>{a(!1)},onClickAway:e=>{c.current&&a(!1)},renderComponent:t.createElement(l.A,{ref:c,className:m()("MenuButton",{Active:n}),onClick:()=>{a(!n)}},t.createElement(i.ZB,null)),arrow:!0},t.createElement(r.A,{className:"Wrapper",key:"Wrapper"},u.filter((n=>{var a;return!(null==e||null===(a=e[n.key])||void 0===a||!a.value)})).map(((e,n)=>t.createElement(t.Fragment,{key:e.key},t.createElement(s.Ko,{key:e.key+n+"box",href:e.href,icon:e.icon,text:e.text}),3===n&&t.createElement(r.A,{key:"DummyBox",className:"DummyBox"}))))))}var v=t.memo(E)},5168:function(e,n,a){a.r(n),a.d(n,{default:function(){return M}});var t=a(6540),l=a(9067),r=a(7834),c=a(995),m=a(356),o=a(6990),i=a(6942),s=a.n(i),u=a(9500),g=a(3104),E=a(1876),v=a(5001),y=a(4073),d=a(9799),p=a(7211),f=a(4545);var h=function e(n){const{name:a,subcategories:r,singleMenu:c}=n;return t.createElement(l.A,{className:s()("SubMenu",{singleMenu:c})},t.createElement(d.A,{component:"nav"},t.createElement(p.A,{key:"main",href:"#"},t.createElement(f.A,{primary:a,primaryTypographyProps:{variant:"overline"}})),r.map((n=>{var a;return(null==n||null===(a=n.subCategories)||void 0===a?void 0:a.length)>0?t.createElement(e,{name:n.name,subcategories:n.subCategories,key:n.categoryId}):t.createElement(p.A,{key:n.name,href:"#"},t.createElement(f.A,{primary:n.name,primaryTypographyProps:{variant:"caption"}}))}))))};var b=function(e){var n,a;let{subCategorys:m,category:o}=e;return t.createElement(r.A,{className:"MegaMenu"},t.createElement(c.A,{className:"MegaMenu__Wrapper"},t.createElement(c.A,{className:"Left"},m.map((e=>t.createElement(h,{name:e.name,subcategories:e.subCategories,key:e.categoryId})))),t.createElement(c.A,{className:"Right"},t.createElement(l.A,{className:"DestinationMenu"},(null==o||null===(n=o.categoryImages)||void 0===n?void 0:n.length)>0?null==o||null===(a=o.categoryImages)||void 0===a?void 0:a.map((e=>t.createElement(v.A,{href:e.redirectUrl,className:"DestinationLink",key:e.categoryId},t.createElement("img",{src:e.imageUrl}),t.createElement(y.A,{variant:"overline",component:"span"})))):null))))},k=a(9881);const A=(0,t.lazy)((()=>a.e(806).then(a.bind(a,5806)))),N=(0,t.lazy)((()=>a.e(604).then(a.bind(a,2604))));function C(){var e,n,a,i;const{configDetails:v,categoriesList:y}=(0,k.G)((e=>e.homePage));return t.createElement(l.A,{className:"NavigationHeader"},t.createElement(r.A,null,t.createElement(c.A,{className:"NavigationHeader__Wrapper"},t.createElement(c.A,{className:"LeftPart",divider:t.createElement(m.A,{orientation:"vertical",flexItem:!0})},(null==y||null===(e=y.items)||void 0===e?void 0:e.length)>0?null==y||null===(n=y.items)||void 0===n?void 0:n.map((e=>{var n,a,l,r,c;return(null==e||null===(n=e.subCategories)||void 0===n?void 0:n.length)>0?t.createElement(t.Fragment,{key:e.name},t.createElement(u.s,{className:"PopoverMegaMenu",placement:"bottom-start",renderComponent:t.createElement(o.A,{"aria-label":null!==(a=null==e?void 0:e.searchEngineFriendlyPageName)&&void 0!==a?a:e.name,color:"secondary",className:s()("MenuLink"),disableRipple:!0,name:null!==(l=null==e?void 0:e.searchEngineFriendlyPageName)&&void 0!==l?l:e.name},e.name)},t.createElement(b,{subCategorys:e.subCategories,category:e}))):t.createElement(t.Fragment,{key:e.name},t.createElement(o.A,{href:"#",color:"secondary","aria-label":null!==(r=null==e?void 0:e.searchEngineFriendlyPageName)&&void 0!==r?r:e.name,name:null!==(c=null==e?void 0:e.searchEngineFriendlyPageName)&&void 0!==c?c:e.name,className:s()("MenuLink",{Active:!1}),disableRipple:!0},e.name))})):null),t.createElement(c.A,{className:"RightPart"},null!=v&&null!==(a=v.enablechart)&&void 0!==a&&a.value?t.createElement(t.Suspense,{fallback:t.createElement(t.Fragment,null)}," ",t.createElement(A,null)):null,null!=v&&null!==(i=v.enablecart)&&void 0!==i&&i.value?t.createElement(t.Suspense,{fallback:t.createElement(t.Fragment,null)},t.createElement(N,null)):null,t.createElement(E.A,null)))),t.createElement(g.y,null))}var M=t.memo(C)}}]);
//# sourceMappingURL=168-1f801e66b9c45269935a.js.map