// ⏰ FECHA
setInterval(()=>{
  let t=document.getElementById("time");
  if(t) t.innerText=new Date().toLocaleString();
},1000);

let currentUser="";

// 👥 USUARIOS COMPLETOS
let users={
dante:{pass:"4821",role:"student"},
nelson:{pass:"1934",role:"student"},
daniela:{pass:"7402",role:"student"},
daniel:{pass:"9183",role:"student"},
alejandro:{pass:"5529",role:"student"},
sara:{pass:"6671",role:"student"},
amaia:{pass:"7740",role:"student"},
anisamara:{pass:"8892",role:"student"},
santiago:{pass:"9901",role:"student"},
estiven:{pass:"1209",role:"student"},
camila:{pass:"3304",role:"student"},
valeri:{pass:"4408",role:"student"},
mariafernanda:{pass:"5512",role:"student"},
antonia:{pass:"6623",role:"student"},
mariana:{pass:"7735",role:"student"},
felipe:{pass:"8846",role:"student"},
mateo:{pass:"9957",role:"student"},
jeray:{pass:"1018",role:"student"},
joel:{pass:"2129",role:"student"},
danna:{pass:"3231",role:"student"},
miguel:{pass:"4342",role:"student"},
sharol:{pass:"5453",role:"student"},
leonel:{pass:"6564",role:"student"},
celeste:{pass:"7675",role:"student"},
james:{pass:"8786",role:"student"},
joshua:{pass:"9897",role:"student"},
mia:{pass:"1357",role:"student"},
julian:{pass:"2468",role:"student"},
laura:{pass:"3579",role:"student"},
franchesco:{pass:"4680",role:"student"},
elian:{pass:"5791",role:"student"},
carlos:{pass:"6802",role:"student"},
andres:{pass:"7913",role:"student"},

representante:{pass:"9999",role:"admin"},
natalia:{pass:"8888",role:"admin"},
napoleon:{pass:"7777",role:"viewer"}
};

// 📊 CARGAR DATOS GUARDADOS
let materias = JSON.parse(localStorage.getItem("materias")) || ["Nota 1","Nota 2"];
let notasData = JSON.parse(localStorage.getItem("notas")) || {};
let obsData = JSON.parse(localStorage.getItem("obs")) || {};
let pubData = JSON.parse(localStorage.getItem("pub")) || [];

// 💾 GUARDAR TODO
function guardarTodo(){
  localStorage.setItem("materias", JSON.stringify(materias));
  localStorage.setItem("notas", JSON.stringify(notasData));
  localStorage.setItem("obs", JSON.stringify(obsData));
  localStorage.setItem("pub", JSON.stringify(pubData));
}

// 🔐 LOGIN
function login(){
let u=document.getElementById("user").value.trim().toLowerCase();
let p=document.getElementById("pass").value.trim();

if(users[u] && users[u].pass===p){
currentUser=u;
panel();
}else{
alert("❌ Error");
}
}

// 🧠 PANEL
function panel(){
document.getElementById("loginBox").style.display="none";

document.getElementById("app").innerHTML=`
<h2>👋 Bienvenido ${currentUser}</h2>

<div class="menu">
<button onclick="verNotas()">📊 Notas</button>
<button onclick="verObs()">📝 Observaciones</button>
<button onclick="verPub()">📢 Publicaciones</button>
<button onclick="juego()">🎮 Juego</button>
<button onclick="logout()">🚪 Salir</button>
</div>

<div id="contenido"></div>
`;
}

// 📊 NOTAS
function verNotas(){

let role=users[currentUser].role;
let html="<h3>Notas</h3>";

if(role==="admin"){
html+=`<input id="newNota"><button onclick="addCol()">➕ Nota</button>`;
}

let listaUsuarios = (role==="viewer"||role==="admin")
? Object.keys(users).filter(u=>users[u].role==="student")
: [currentUser];

listaUsuarios.forEach(u=>{
html+=tabla(u, role==="admin");
});

document.getElementById("contenido").innerHTML=html;
}

// TABLA
function tabla(u,edit){

let datos=notasData[u]||{};
let html=`<div class="card"><b>${u}</b><br>`;

let suma=0, c=0;

materias.forEach((m,i)=>{
let val=datos[i]||"";

html+=`${m}: `;

if(edit){
html+=`<input id="${u}_${i}" value="${val}" style="width:50px">`;
}else{
html+=val||"-";
}

html+="<br>";

if(val){suma+=Number(val);c++;}
});

let prom=c?(suma/c).toFixed(1):0;

let nivel="Sin notas";
if(prom>=10&&prom<=29) nivel="Bajo";
else if(prom<=39) nivel="Básico";
else if(prom<=44) nivel="Alto";
else if(prom<=50) nivel="Superior";

html+=`Prom: ${prom}<br>${nivel}<br>`;

if(edit){
html+=`<button onclick="save('${u}')">💾</button>`;
}

html+="</div>";

return html;
}

// ➕ NUEVA NOTA
function addCol(){
let n=document.getElementById("newNota").value;
if(n){
materias.push(n);
guardarTodo();
verNotas();
}
}

// 💾 GUARDAR NOTAS
function save(u){
if(!notasData[u]) notasData[u]={};

materias.forEach((m,i)=>{
let v=document.getElementById(`${u}_${i}`).value;
if(v) notasData[u][i]=Number(v);
});

guardarTodo();
verNotas();
}

// 📝 OBS
function verObs(){

let role=users[currentUser].role;
let html="<h3>Observaciones</h3>";

if(role==="admin"||role==="viewer"){
for(let u in users){
if(users[u].role==="student"){

let lista=obsData[u]||[];

html+=`<div class="card"><b>${u}</b><br>${lista.join("<br>")||"Sin"}`;

if(role==="admin"){
html+=`<br><input id="o_${u}">
<button onclick="addObs('${u}')">Agregar</button>`;
}

html+="</div>";
}
}
}else{
let lista=obsData[currentUser]||[];
html+=`<div class="card">${lista.join("<br>")||"Sin"}</div>`;
}

document.getElementById("contenido").innerHTML=html;
}

// ➕ OBS
function addObs(u){
let v=document.getElementById("o_"+u).value;
if(!obsData[u]) obsData[u]=[];
obsData[u].push(v);
guardarTodo();
verObs();
}

// 📢 PUBLICACIONES
function verPub(){
let role=users[currentUser].role;

let html="<h3>Publicaciones</h3>";
html+=pubData.join("<br>")||"Sin publicaciones";

if(role==="admin"){
html+=`<br><input id="pub">
<button onclick="addPub()">Publicar</button>`;
}

document.getElementById("contenido").innerHTML=html;
}

function addPub(){
let v=document.getElementById("pub").value;
pubData.push(v);
guardarTodo();
verPub();
}

// 🎮 PACMAN
function juego(){
document.getElementById("contenido").innerHTML=`
<iframe src="https://funhtml5games.com?embed=pacman"
width="100%" height="400"></iframe>`;
}

// 🚪 SALIR
function logout(){
location.reload();
}
