(this.webpackJsonppicstagram=this.webpackJsonppicstagram||[]).push([[0],{113:function(e,t,n){},115:function(e,t,n){},121:function(e,t,n){},125:function(e,t,n){},158:function(e,t,n){},159:function(e,t,n){},160:function(e,t,n){"use strict";n.r(t);var s=n(2),c=n.n(s),i=n(23),a=n.n(i),o=(n(113),n(114),n(9)),r=(n(115),n(51)),l=n(52),d=n(56),u=n(55),j=n(164),b=n(165),O=n(54),f=O.a.initializeApp({apiKey:"AIzaSyDKdvu28azwbAsLMav9ySnP_mCsw7yJvms",authDomain:"picstagram-6b5e3.firebaseapp.com",projectId:"picstagram-6b5e3",storageBucket:"picstagram-6b5e3.appspot.com",messagingSenderId:"306936331992",appId:"1:306936331992:web:39a94489939f4af2b261ad"}),m=f.firestore(),p=f.auth(),h=f.storage(),g=(n(121),n(24)),x=n(3),v=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(r.a)(this,n);for(var s=arguments.length,c=new Array(s),i=0;i<s;i++)c[i]=arguments[i];return(e=t.call.apply(t,[this].concat(c))).state={image:null,caption:"",openUpload:!1},e.setCaption=function(t){e.setState({caption:t.target.value})},e.showUpload=function(){e.setState({openUpload:!e.state.openUpload})},e.handleChange=function(t){var n=t.target.files[0];e.setState({image:n})},e.handleUpload=function(t){t.preventDefault();var n=e.state.image,s=e.state.caption,c=e.props.username,i=e.props.user;n&&s&&c?h.ref("images/".concat(n.name)).put(n).on("state_changed",(function(e){console.log(e)}),(function(e){alert("error"),console.log(e)}),(function(){h.ref("images").child(n.name).getDownloadURL().then((function(e){m.collection("images").add({caption:s,imageUrl:e,username:c,imagename:n.name,timestamp:Date().toLocaleString(),uid:i.uid})})),e.setState({image:null,caption:"",openUpload:!1})})):alert("Complete form")},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)(j.a,{show:this.state.openUpload,onHide:this.showUpload,centered:!0,children:Object(x.jsx)("div",{className:"uploadModal",children:Object(x.jsxs)("form",{children:[Object(x.jsx)("input",{type:"file",onChange:this.handleChange}),Object(x.jsx)("input",{type:"text",placeholder:"caption",value:this.state.caption,onChange:this.setCaption,maxlength:"50",required:!0}),Object(x.jsx)(b.a,{onClick:this.handleUpload,children:"Submit"})]})})}),Object(x.jsx)("div",{className:"userContainer",children:this.props.user?Object(x.jsx)("div",{children:Object(x.jsx)("span",{className:this.props.guest?"guest":"upload",children:Object(x.jsx)(g.f,{style:{fontSize:"30px"},onClick:this.showUpload})})}):Object(x.jsx)("p",{children:"Please Sign In"})})]})}}]),n}(s.Component),S=(n(125),n(37)),y=n(19);var N=function(e){var t=e.id,n=e.username,c=e.user,i=e.imageUrl,a=e.caption,r=(e.count,e.timestamp,e.uid),l=e.guest,d=Object(s.useState)([]),u=Object(o.a)(d,2),b=u[0],f=u[1],p=Object(s.useState)(""),h=Object(o.a)(p,2),v=h[0],N=h[1],w=Object(s.useState)({}),C=Object(o.a)(w,2),U=C[0],k=C[1],D=Object(s.useState)(!1),I=Object(o.a)(D,2),J=I[0],z=I[1],E=Object(s.useState)(""),P=Object(o.a)(E,2),A=P[0],L=P[1];return Object(s.useEffect)((function(){t&&m.collection("images").doc(t).collection("comments").onSnapshot((function(e){f(e.docs.map((function(e){return e.data()})))}))}),[t]),Object(s.useEffect)((function(){t&&m.collection("images").doc(t).collection("likes").onSnapshot((function(e){k(e.docs.map((function(e){return{likeID:e.id,likeUsers:e.data()}})))}))}),[t]),Object(x.jsxs)("div",{className:"image",children:[Object(x.jsx)(j.a,{className:"modal",show:J,onHide:function(){return z(!1)},"aria-labelledby":"contained-modal-title-vcenter",centered:!0,size:"lg",children:Object(x.jsxs)("div",{className:"lightbox",children:[Object(x.jsx)("div",{className:"lightboxImage",children:Object(x.jsx)("img",{src:A})}),Object(x.jsxs)("div",{className:"lightboxComments",children:[Object(x.jsx)("div",{style:{overflow:"scroll",padding:"5px"},children:b.map((function(e){return Object(x.jsxs)("p",{children:[Object(x.jsx)(y.b,{to:"/".concat(e.username,"/").concat(e.uid),children:Object(x.jsxs)("strong",{children:[e.username,": "]})}),e.text," ",Object(x.jsxs)("span",{style:{float:"right",fontSize:"12px",color:"grey"},children:["posted ",e.time]})]})}))}),Object(x.jsx)("div",{style:{marginTop:"auto",background:"whitesmoke"},children:Object(x.jsxs)("form",{style:{padding:"5px"},children:[Object(x.jsx)("input",{type:"text",name:"",placeholder:"Reply...",value:v,disabled:l,onChange:function(e){return N(e.target.value)}}),Object(x.jsx)("button",{disabled:l,type:"submit",onClick:function(e){e.preventDefault(),m.collection("images").doc(t).collection("comments").add({text:v,username:c.displayName,time:new Date(1e3*O.a.firestore.Timestamp.now().seconds).toLocaleDateString(),uid:c.uid}),N("")},children:"Post"})]})})]})]})}),Object(x.jsx)("div",{className:"imageHeader",children:Object(x.jsx)(y.b,{to:"/".concat(n,"/").concat(r),style:{color:"#000"},children:Object(x.jsxs)("div",{children:[Object(x.jsx)(S.a,{name:n,size:"35",round:!0})," ",n]})})}),Object(x.jsx)("div",{className:"imageBody",onClick:z,children:Object(x.jsx)("img",{onClick:function(e){return L(e.target.src)},alt:"",src:i})}),Object(x.jsxs)("div",{className:"imageFooter",children:[Object(x.jsx)(y.b,{to:"/".concat(n,"/").concat(r),children:Object(x.jsxs)("strong",{children:[n,":"]})})," ",a,Object(x.jsxs)("div",{children:[Object(x.jsxs)("span",{style:{color:"grey"},children:[Object(x.jsx)(g.b,{className:"count",onClick:function(){if(!l){for(var e=0;e<U.length;e++)if(U[e].likeUsers.username.includes(c.displayName))return void m.collection("images").doc(t).collection("likes").doc(U[e].likeID).delete();m.collection("images").doc(t).collection("likes").add({username:c.displayName})}}})," ",U.length," likes"]}),Object(x.jsxs)("span",{style:{float:"right",color:"grey",paddingRight:"5px"},children:[Object(x.jsx)(g.a,{style:{color:"green"}})," ",b.length," comments"]})]})]})]})},w=n(107);var C=function(e){var t=e.user,n=e.posts,s=e.guestSignIn,c=e.guest;return Object(x.jsxs)("div",{className:"container",children:[t?Object(x.jsx)(v,{guest:c,user:t,username:t.displayName}):Object(x.jsxs)("div",{className:"noUser",children:[Object(x.jsx)("p",{children:"Please Sign In"}),Object(x.jsx)("p",{children:"or"}),Object(x.jsx)("p",{className:"guestSignIn",onClick:function(){return s(!0)},"data-tip":"Guests dont have access to following features:Likes, Comments, Follow, Image Uploads","data-for":"toolTip1","data-place":"bottom",children:"Guest Sign In"}),Object(x.jsx)(w.a,{id:"toolTip1"})]}),Object(x.jsx)("div",{className:"imageContainer",children:n.map((function(e){var n=e.post,s=e.id;return t?Object(x.jsx)(N,{id:s,guest:c,user:t,username:n.username,imageUrl:n.imageUrl,caption:n.caption,uid:n.uid},s):Object(x.jsx)("div",{})}))})]})},U=(n(158),n(8));var k=function(e){var t=e.currentUser,n=e.guest,c=e.posts,i=e.users,a=Object(U.g)().user,r=Object(s.useState)([]),l=Object(o.a)(r,2),d=l[0],u=l[1],j=Object(s.useState)([]),b=Object(o.a)(j,2),O=b[0],f=b[1],p=Object(s.useState)(0),h=Object(o.a)(p,2),g=h[0],y=h[1],w=Object(s.useState)(""),C=Object(o.a)(w,2),k=C[0],D=C[1],I=Object(s.useState)(""),J=Object(o.a)(I,2),z=J[0],E=J[1];return Object(s.useEffect)((function(){if(a)for(var e=0;e<i.length;e++)JSON.stringify(i[e].userData.username)==JSON.stringify(a)&&(D(i[e].id),m.collection("users").doc(i[e].id).collection("following").onSnapshot((function(e){y(e.size)})))}),[a]),Object(s.useEffect)((function(){if(t)for(var e=0;e<i.length;e++)JSON.stringify(i[e].userData.username)==JSON.stringify(t.displayName)&&E(i[e].id)}),[t]),Object(s.useEffect)((function(){if(t)for(var e=0;e<i.length;e++)JSON.stringify(t.displayName)==JSON.stringify(i[e].userData.username)&&m.collection("users").doc(i[e].id).collection("following").onSnapshot((function(e){f(e.docs.map((function(e){return{followingID:e.id,data:e.data()}})))}))}),[t]),Object(s.useEffect)((function(){if(a)for(var e=0;e<i.length;e++)JSON.stringify(i[e].userData.username)==JSON.stringify(a)&&m.collection("users").doc(i[e].id).collection("followers").onSnapshot((function(e){u(e.docs.map((function(e){return{followID:e.id,data:e.data()}})))}))}),[a]),Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"profileContainer",children:[Object(x.jsxs)("div",{className:"profileHeader",children:[Object(x.jsx)(S.a,{name:a,size:"130",round:!0}),Object(x.jsxs)("div",{className:"summary",children:[Object(x.jsxs)("div",{className:"userProfile",children:[Object(x.jsxs)("strong",{style:{fontSize:"20px",alignSelf:"center"},children:[a," "]}),JSON.stringify(a)===JSON.stringify(t.displayName)?Object(x.jsx)("div",{className:"profileButton",children:Object(x.jsx)(v,{user:t.displayName,username:t.displayName})}):d.findIndex((function(e){return JSON.stringify(e.data.followUser)==JSON.stringify(t.uid)}))>-1?Object(x.jsx)("button",{className:"follow",disabled:n,onClick:function(){console.log(O);for(var e=0;e<d.length;e++)JSON.stringify(d[e].data.followUser)==JSON.stringify(t.uid)&&m.collection("users").doc(k).collection("followers").doc(d[e].followID).delete();for(var n=0;n<O.length;n++)if(JSON.stringify(O[n].data.followingUser)==JSON.stringify(k))return void m.collection("users").doc(z).collection("following").doc(O[n].followingID).delete()},children:"Unfollow"}):Object(x.jsx)("button",{className:"follow",disabled:n,onClick:function(){console.log(O),m.collection("users").doc(k).collection("followers").add({followUser:t.uid}),m.collection("users").doc(z).collection("following").add({followingUser:k})},children:"Follow"})]}),Object(x.jsxs)("div",{className:"info",children:[Object(x.jsxs)("div",{children:[" ",c.filter((function(e){return e.post.username===a})).length," Posts"]}),Object(x.jsxs)("div",{children:[d.length," Followers"]}),Object(x.jsxs)("div",{children:[g," Following"]})]}),Object(x.jsx)("div",{style:{color:"grey"},children:"Career"}),Object(x.jsx)("div",{children:"Signature"})]})]}),Object(x.jsxs)("div",{className:"panel",children:[Object(x.jsx)("div",{className:"panel1 active",children:"Posts"}),Object(x.jsx)("div",{className:"panel2",children:"Saved"}),Object(x.jsx)("div",{className:"panel3",children:"Tagged"})]}),Object(x.jsx)("div",{className:"profileBody",children:c.map((function(e){var s=e.post,c=e.id;return s.username===a?Object(x.jsx)(N,{id:c,user:t,username:s.username,imageUrl:s.imageUrl,caption:s.caption,guest:n}):""}))})]})})};n(159);function D(e){var t=e.user,n=e.guest,c=Object(s.useState)(!1),i=Object(o.a)(c,2),a=i[0],r=i[1],l=Object(s.useState)(!1),d=Object(o.a)(l,2),u=d[0],O=d[1],f=Object(s.useState)(""),h=Object(o.a)(f,2),v=h[0],N=h[1],w=Object(s.useState)(""),C=Object(o.a)(w,2),U=C[0],k=C[1],D=Object(s.useState)(""),I=Object(o.a)(D,2),J=I[0],z=I[1];return Object(x.jsxs)("div",{children:[Object(x.jsx)(j.a,{show:u,onHide:function(){return O(!1)},centered:!0,size:"sm",children:Object(x.jsx)("div",{className:"form",children:Object(x.jsxs)("form",{children:[Object(x.jsx)("div",{className:"icon",children:Object(x.jsx)(g.d,{})}),Object(x.jsx)("input",{type:"text",placeholder:"email address",value:v,onChange:function(e){return N(e.target.value)},required:!0}),Object(x.jsx)("input",{type:"text",placeholder:"username",value:J,onChange:function(e){return z(e.target.value)},required:!0}),Object(x.jsx)("input",{type:"text",placeholder:"password",value:U,onChange:function(e){return k(e.target.value)},required:!0}),Object(x.jsx)(b.a,{type:"submit",onClick:function(e){e.preventDefault(),p.createUserWithEmailAndPassword(v,U).then((function(e){e.user.updateProfile({displayName:J}),m.collection("users").add({username:J,uid:e.user.uid})})).catch((function(e){return alert(e.message)})),O(!1)},children:"Sign Up"})]})})}),Object(x.jsx)(j.a,{show:a,onHide:function(){return r(!1)},size:"sm",centered:!0,children:Object(x.jsx)("div",{className:"form",children:Object(x.jsxs)("form",{children:[Object(x.jsx)("div",{className:"icon",children:Object(x.jsx)(g.c,{})}),Object(x.jsx)("div",{children:Object(x.jsx)("input",{type:"text",placeholder:"email address",value:v,onChange:function(e){return N(e.target.value)}})}),Object(x.jsx)("div",{children:Object(x.jsx)("input",{type:"text",placeholder:"password",value:U,onChange:function(e){return k(e.target.value)}})}),Object(x.jsx)(b.a,{onClick:function(e){e.preventDefault(),p.signInWithEmailAndPassword(v,U).catch((function(e){return alert(e.message)})),r(!1)},children:"Log In"})]})})}),Object(x.jsxs)("div",{className:"nav",children:[Object(x.jsx)("div",{className:"title",children:Object(x.jsx)(y.b,{to:"/",children:"Picstagram"})}),Object(x.jsx)("div",{children:Object(x.jsx)("input",{type:"search",placeholder:"Search...",disabled:!0,style:{borderRadius:"20px",padding:"8px",width:"310px",border:"none"}})}),Object(x.jsx)("div",{className:"buttonContainer",children:t?Object(x.jsxs)("div",{children:[Object(x.jsx)(y.b,{to:"/",children:Object(x.jsx)(g.e,{size:"35"})})," ",Object(x.jsx)(y.b,{to:"/".concat(n?t.username:t.displayName,"/").concat(t.uid),style:{color:"#000"},children:Object(x.jsx)(S.a,{name:n?t.username:t.displayName,size:"35",round:!0})}),Object(x.jsx)(b.a,{variant:"outline-dark",className:"signOut",onClick:function(){p.signOut(),window.location.reload(!0)},children:"Sign Out"})]}):Object(x.jsxs)("div",{children:[Object(x.jsx)(b.a,{variant:"dark",className:"signUp",onClick:function(){return O(!0)},children:"Sign Up"}),Object(x.jsx)(b.a,{variant:"outline-dark",className:"login",onClick:function(){return r(!0)},children:"Log In"})]})})]})]})}var I=function(){var e=Object(s.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],i=Object(s.useState)([]),a=Object(o.a)(i,2),r=a[0],l=a[1],d=Object(s.useState)([]),u=Object(o.a)(d,2),j=u[0],b=u[1],O=Object(s.useState)(!0),f=Object(o.a)(O,2),h=f[0],g=f[1];return Object(s.useEffect)((function(){var e=p.onAuthStateChanged((function(e){e?(c(e),g(!1)):c(h?j[2].userData:null)}));return function(){e()}}),[n]),Object(s.useEffect)((function(){m.collection("images").onSnapshot((function(e){l(e.docs.map((function(e){return{id:e.id,post:e.data()}})))}))}),[]),Object(s.useEffect)((function(){m.collection("users").onSnapshot((function(e){b(e.docs.map((function(e){return{id:e.id,userData:e.data()}})))}))}),[n]),Object(x.jsx)("div",{children:Object(x.jsxs)(y.a,{children:[Object(x.jsx)(D,{user:n,guest:h}),Object(x.jsxs)(U.c,{children:[Object(x.jsx)(U.a,{path:"/",element:Object(x.jsx)(C,{guest:h,user:n,posts:r,guestSignIn:function(e){if(e)for(var t=0;t<j.length;t++)JSON.stringify(j[t].userData.username)==JSON.stringify("Guest")&&c(j[2])}})}),Object(x.jsx)(U.a,{path:"/:user/:id",element:Object(x.jsx)(k,{guest:h,currentUser:n,posts:r,users:j})})]})]})})};a.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(I,{})}),document.getElementById("root"))}},[[160,1,2]]]);
//# sourceMappingURL=main.399dd642.chunk.js.map