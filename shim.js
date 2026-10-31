<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>TOEIC Arena</title>
<style>
:root{--bg:#f3f1ec;--sf:#fff;--tx:#1c2430;--mu:#5d6675;--bd:#d9d5cb;--ok:#1f8a4c;--ko:#c0262d;
box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#14181f;--sf:#1e2430;--tx:#eef0f4;--mu:#9aa3b2;--bd:#363e4d;--ok:#4cc582;--ko:#ff7078;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#14181f;--sf:#1e2430;--tx:#eef0f4;--mu:#9aa3b2;--bd:#363e4d;--ok:#4cc582;--ko:#ff7078;color-scheme:dark}
*{box-sizing:border-box}html{scroll-padding-top:env(safe-area-inset-top,0px)}
body{margin:0;background:var(--bg);color:var(--tx);font:17px/1.5 Georgia,"Times New Roman",serif;min-height:100vh}
main{max-width:760px;margin:0 auto;padding:16px}
h1{font:800 2.2rem/1.1 "Trebuchet MS",Verdana,sans-serif;margin:.4em 0 .2em}
h2{font:700 1.05rem "Trebuchet MS",Verdana,sans-serif;margin:14px 0 6px}
p.s{color:var(--mu);margin:.2em 0 1em}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:14px;padding:16px;margin:12px 0}
input,select{width:100%;font:inherit;padding:10px 12px;border:2px solid var(--bd);border-radius:10px;background:var(--bg);color:var(--tx);margin:4px 0 12px}
button{font:700 1rem "Trebuchet MS",Verdana,sans-serif;border:0;border-radius:10px;padding:12px 18px;background:var(--tx);color:var(--bg);cursor:pointer;margin:2px 0}
button:disabled{opacity:.6;cursor:default}
button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #4a8bff;outline-offset:2px}
.hud{display:flex;flex-wrap:wrap;gap:8px;font-family:"Trebuchet MS",Verdana,sans-serif}
.pl{flex:1;min-width:110px;padding:8px 10px;border-radius:12px;border:3px solid var(--bd);background:var(--sf);font-size:.9rem}
.pl b{display:block;font-size:1.4rem;line-height:1.1}.pl small{color:var(--mu)}
.bar{height:8px;background:var(--bd);border-radius:5px;overflow:hidden;margin:12px 0}
.bar i{display:block;height:100%;width:100%;background:var(--tx)}
.tag{font:700 .85rem "Trebuchet MS",Verdana,sans-serif;color:var(--mu)}
.pass{white-space:pre-line;border-left:4px solid var(--bd);padding-left:12px;max-height:34vh;overflow:auto;font-size:.95rem}
.bl{background:rgba(120,120,120,.22);border-radius:4px;padding:0 4px;font-family:"Trebuchet MS",Verdana,sans-serif;white-space:nowrap}
.q{font-size:1.1rem;margin:10px 0}
.opt{display:block;width:100%;text-align:left;background:var(--bg);color:var(--tx);border:2px solid var(--bd);margin:8px 0;font-weight:500;font-family:Georgia,serif}
.opt.sel{border-color:var(--tx)}.opt.ok{border-color:var(--ok);background:rgba(31,138,76,.18)}.opt.ko{border-color:var(--ko);background:rgba(192,38,45,.16)}
.ex{margin-top:10px;font-size:.95rem}.ko-t{color:var(--ko)}
.ck{display:inline-flex;align-items:center;gap:6px;margin:4px 14px 4px 0;font-family:"Trebuchet MS",Verdana,sans-serif;font-size:.95rem}
.ck input{width:auto;margin:0}
.code{font:800 2rem "Trebuchet MS",Verdana,sans-serif;letter-spacing:.2em}
.rw{display:flex;justify-content:space-between;padding:6px 0;border-top:1px solid var(--bd);font-family:"Trebuchet MS",Verdana,sans-serif}
.rv{font-size:.92rem;border-top:1px solid var(--bd);padding-top:8px;margin-top:8px}
</style>
</head>
<body>
<main id="app"></main>
<script src="shim.js"></script>
<script src="questions.js"></script>
<script>
const N={pos:"Nature des mots",prep:"Prépositions",conj:"Connecteurs",verb:"Verbes",comp:"Comparatifs",rel:"Pronoms relatifs",insert:"Phrase à insérer",gist:"Idée générale",detail:"Détails",infer:"Inférence"};
const M={duel:{nm:"Duel 1v1",cap:2,t:{5:20,6:30,7:45},d:"2 joueurs, même question en même temps. 10 points par bonne réponse, plus jusqu’à 5 points de bonus selon la vitesse."},
speed:{nm:"Course de vitesse",cap:8,t:{5:10,6:18,7:28},d:"2 à 8 joueurs, chrono court. Les premiers à répondre juste gagnent 10, 7, 5 puis 3 points. Une erreur coûte 3 points."}};
const ALL=[];
P5.forEach((x,k)=>ALL.push({p:5,n:n5[k],u:"5."+k,...x}));
[[6,P6],[7,P7]].forEach(([p,A])=>A.forEach((s,k)=>s.qs.forEach((x,j)=>ALL.push({p,n:s.n[j],u:p+"."+k,t:s.t,...x}))));

const $=s=>document.querySelector(s),app=$("#app");
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const fmt=s=>esc(s).replace(/\[(\d)\]/g,'<span class="bl">($1) ____</span>').replace(/------/g,'<span class="bl">______</span>');
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function ord(seed,id){const r=rng(seed+id*97),a=[0,1,2,3];for(let i=3;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const col=k=>`hsl(${k*47+210} 60% 50%)`;
const nmOf=p=>esc(String(p.presence.nm||"?").slice(0,14));

let R,G,g,code="",me={nm:"",host:false},hist=[],cur={},lastKey="",tm,ht,players=[],allPs=[],isP=false;
const corr=i=>ord(g.seed,g.qs[i]).indexOf(0);
const poolSize=c=>ALL.filter(q=>c.parts.includes(q.p)&&c.nt.includes(q.n)).length;
function buildQs(c){const u={};ALL.forEach((q,i)=>{if(c.parts.includes(q.p)&&c.nt.includes(q.n))(u[q.u]=u[q.u]||[]).push(i)});
 const out=[];for(const x of shuf(Object.values(u))){if(out.length>=c.cnt)break;out.push(...x)}return out.slice(0,c.cnt)}
function setG(o){G=o;R.presence({g:o})}
function show(h){clearInterval(tm);app.innerHTML=h}

function entry(msg){
 show(`<h1>TOEIC Arena</h1><p class="s">Duel ou course de vitesse, jusqu’à 8 joueurs, chacun sur son ordinateur. Parties 5, 6 et 7 du TOEIC écrit.</p>
 <div class="card"><label>Ton pseudo<input id="nm" maxlength="14" value="${esc(me.nm)}"></label>
 <button id="cr">Créer une salle</button>
 <p class="s">ou rejoindre une salle avec son code :</p>
 <input id="cd" maxlength="4" placeholder="Code à 4 lettres" value="${esc((new URLSearchParams(location.search).get("s")||"").slice(0,4))}" style="text-transform:uppercase">
 <button id="jn">Rejoindre</button>${msg?`<p class="ex"><strong class="ko-t">${msg}</strong></p>`:""}</div>`);
 $("#cr").onclick=()=>go("",true);$("#jn").onclick=()=>go($("#cd").value,false);
}
async function go(c,host){
 me.nm=($("#nm").value||"Joueur").trim().slice(0,14);me.host=host;
 c=host?Array.from({length:4},()=>"ABCDEFGHJKMNPQRSTUVWXYZ"[Math.random()*23|0]).join(""):c.trim().toUpperCase();
 if(!/^[A-Z0-9]{4}$/.test(c))return entry("Entre le code à 4 caractères de la salle.");
 try{const room=await window.claude?.use("room");if(!room)throw 0;R=await room.join("toeic-"+c.toLowerCase())}
 catch(e){return entry("Connexion au serveur impossible. Réessaie dans quelques secondes (le serveur gratuit peut mettre une minute à se réveiller).")}
 code=c;lastKey="";hist=[];
 const base={nm:me.nm,r:host?"h":"p",j:host?0:Date.now(),h:[]};
 if(host){G={ph:"lobby",cfg:{mode:"duel",parts:[5,6,7],nt:Object.keys(N),cnt:12}};base.g=G}
 await R.presence(base);R.onPeers(sync);sync();
}
function sync(){
 const ps=[...R.peers()].filter(p=>p.kind==="viewer"&&p.presence.nm).sort((a,b)=>(a.presence.j||0)-(b.presence.j||0));
 const hp=ps.find(p=>p.presence.r==="h"&&p.presence.g);
 if(!hp){show(`<h1>Salle ${code}</h1><p class="s">Recherche de l’hôte… Vérifie le code, ou l’hôte a quitté la partie.</p><button id="bk">Retour</button>`);
  return $("#bk").onclick=()=>{R.leave();entry()}}
 g=hp.presence.g;allPs=ps;players=ps.slice(0,M[g.cfg.mode].cap);isP=players.some(p=>p.isMe);
 const key=g.ph+"|"+g.i+"|"+g.seed;
 if(key!==lastKey){lastKey=key;
  if(g.ph==="q"){cur={t0:Date.now(),done:false};if(g.i===0){hist=[];R.presence({h:[]})}
   if(me.host){clearTimeout(ht);const i=g.i,mx=M[g.cfg.mode].t[ALL[g.qs[i]].p];ht=setTimeout(()=>{if(G.ph==="q"&&G.i===i)setG({...G,ph:"rv"})},(mx+2)*1000)}}
  draw();
 }else if(g.ph==="q"){patchQ()}else draw();
 if(me.host&&g.ph==="q"&&players.every(p=>(p.presence.h||[])[2*g.i]!==undefined))setG({...G,ph:"rv"});
}
function draw(){({lobby:drawLobby,q:()=>drawQ(false),rv:()=>drawQ(true),end:drawEnd})[g.ph]()}

function scores(){
 const n=g.ph==="q"?g.i:g.ph==="rv"?g.i+1:g.qs.length,mode=g.cfg.mode,tot={},round={};
 players.forEach(p=>tot[p.peer]=0);
 for(let i=0;i<n;i++){const q=ALL[g.qs[i]],mx=M[mode].t[q.p],c=corr(i);
  const rows=players.map(p=>{const h=p.presence.h||[];return{p,c:h[2*i],ms:h[2*i+1]||0,ok:h[2*i]===c}});
  if(mode==="duel")rows.forEach(r=>r.pt=r.ok?10+Math.ceil(5*Math.max(0,1-r.ms/1000/mx)):0);
  else{rows.filter(r=>r.ok).sort((a,b)=>a.ms-b.ms).forEach((r,k)=>r.pt=[10,7,5][k]||3);
   rows.forEach(r=>{if(r.pt===undefined)r.pt=r.c>=0?-3:0})}
  rows.forEach(r=>{tot[r.p.peer]+=r.pt;if(i===n-1)round[r.p.peer]=r.pt})}
 return{tot,round};
}
function board(rv){
 const{tot,round}=scores();
 return `<div class="hud">${players.map((p,k)=>`<div class="pl" style="border-color:${col(k)}">${nmOf(p)}${p.isMe?" (toi)":""}<b>${tot[p.peer]}</b>${rv&&round[p.peer]!==undefined?`<small>${round[p.peer]>=0?"+":"−"}${Math.abs(round[p.peer])} à cette question</small>`:""}</div>`).join("")}</div>`;
}
function drawQ(rv){
 const q=ALL[g.qs[g.i]],od=ord(g.seed,g.qs[g.i]),c=od.indexOf(0),mine=hist[2*g.i],mx=M[g.cfg.mode].t[q.p];
 show(`${board(rv)}${rv?"":'<div class="bar"><i id="b"></i></div>'}
 <div class="card"><p class="tag">Question ${g.i+1}/${g.qs.length} · Partie ${q.p} · ${N[q.n]}</p>
 ${q.t?`<div class="pass">${fmt(q.t)}</div>`:""}<p class="q">${fmt(q.q)}</p>
 ${od.map((oi,j)=>`<button class="opt${rv?(j===c?" ok":j===mine?" ko":""):""}" data-j="${j}"${rv?" disabled":""}>${esc(q.o[oi])}</button>`).join("")}
 <p class="tag" id="st"></p>
 ${rv?`<div class="ex">${esc(q.e)}</div>${me.host?`<p><button id="nx">${g.i+1<g.qs.length?"Question suivante":"Voir les résultats"}</button></p>`:'<p class="tag">L’hôte lance la suite.</p>'}`:""}</div>`);
 if(rv){const b=$("#nx");if(b)b.onclick=()=>setG(g.i+1<g.qs.length?{...G,ph:"q",i:g.i+1}:{...G,ph:"end"});return}
 app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>ans(+b.dataset.j,b));
 if(cur.done)lockOpts();
 tm=setInterval(()=>{const l=1-(Date.now()-cur.t0)/1000/mx,b=$("#b");if(b)b.style.width=Math.max(0,l*100)+"%";
  if(l<=0&&!cur.done){cur.done=true;lockOpts();patchQ()}},100);
 patchQ();
}
function lockOpts(){app.querySelectorAll(".opt").forEach(b=>b.disabled=true)}
function patchQ(){
 const st=$("#st");if(!st)return;
 const n=players.filter(p=>(p.presence.h||[])[2*g.i]!==undefined).length;
 st.textContent=(!isP?"Tu regardes la partie. ":cur.done?(hist[2*g.i]===undefined?"Temps écoulé. ":"Réponse envoyée. "):"")+`Réponses : ${n}/${players.length}`;
}
function ans(j,b){
 if(cur.done||!isP)return;cur.done=true;
 const mx=M[g.cfg.mode].t[ALL[g.qs[g.i]].p],ms=Math.min(Date.now()-cur.t0,mx*1000);
 while(hist.length<2*g.i)hist.push(-1,0);
 hist[2*g.i]=j;hist[2*g.i+1]=ms;R.presence({h:[...hist]});
 b.classList.add("sel");lockOpts();patchQ();
}
function drawLobby(){
 const c=g.cfg,H=me.host,d=H?"":" disabled",n=poolSize(c),cap=M[c.mode].cap;
 show(`<h1>Salle <span class="code">${code}</span></h1>
 <p class="s">${H?"Envoie ce lien à tes amis : "+esc(location.origin+"/?s="+code):"En attendant que l’hôte lance la partie."}</p>
 <div class="card"><h2>Joueurs (${allPs.length})</h2>${allPs.map((p,k)=>`<div class="rw"><span>${nmOf(p)}${p.isMe?" (toi)":""}</span><span class="tag">${p.presence.r==="h"?"hôte":k<cap?"joue":"spectateur"}</span></div>`).join("")}</div>
 <div class="card"><h2>Mode</h2>
 ${Object.entries(M).map(([k,m])=>`<label class="ck"><input type="radio" name="mode" value="${k}"${c.mode===k?" checked":""}${d}>${m.nm}</label>`).join("")}
 <p class="s">${M[c.mode].d}</p>
 <h2>Parties</h2>${[5,6,7].map(p=>`<label class="ck"><input type="checkbox" data-part="${p}"${c.parts.includes(p)?" checked":""}${d}>Partie ${p}</label>`).join("")}
 <h2>Notions</h2>${Object.entries(N).map(([k,v])=>`<label class="ck"><input type="checkbox" data-nt="${k}"${c.nt.includes(k)?" checked":""}${d}>${v}</label>`).join("")}
 <h2>Nombre de questions</h2><select id="cnt"${d}>${[6,9,12,15,20].map(x=>`<option${c.cnt===x?" selected":""}>${x}</option>`).join("")}</select>
 <p class="s">${n} questions correspondent à ces filtres${n<c.cnt&&n?`, la partie en aura ${n}`:""}.</p>
 ${H?`<button id="go"${n?"":" disabled"}>Lancer la partie</button>`:""}</div>`);
 if(H&&$("#go"))$("#go").onclick=()=>setG({ph:"q",cfg:G.cfg,qs:buildQs(G.cfg),i:0,seed:Math.random()*1e9|0});
}
app.onchange=e=>{
 if(!me.host||!G||G.ph!=="lobby")return;
 const t=e.target,c=JSON.parse(JSON.stringify(G.cfg)),tg=(a,v,on)=>{const i=a.indexOf(v);if(on&&i<0)a.push(v);if(!on&&i>=0)a.splice(i,1)};
 if(t.name==="mode")c.mode=t.value;
 if(t.dataset.part)tg(c.parts,+t.dataset.part,t.checked);
 if(t.dataset.nt)tg(c.nt,t.dataset.nt,t.checked);
 if(t.id==="cnt")c.cnt=+t.value;
 setG({ph:"lobby",cfg:c});
};
function drawEnd(){
 const{tot}=scores(),rk=players.map(p=>({p,t:tot[p.peer]})).sort((a,b)=>b.t-a.t);
 const top=rk[0],tie=rk.length>1&&rk[1].t===top.t;
 const errs=isP?g.qs.map((id,i)=>[ALL[id],i]).filter(([q,i])=>hist[2*i]!==corr(i)):[];
 show(`<h1>${tie?"Égalité en tête":nmOf(top.p)+" gagne"}</h1>
 <div class="card">${rk.map((r,k)=>`<div class="rw"><span>${k+1}. ${nmOf(r.p)}${r.p.isMe?" (toi)":""}</span><b>${r.t} pts</b></div>`).join("")}</div>
 ${isP?`<div class="card"><h2>À revoir (${errs.length})</h2>${errs.length?errs.map(([q,i])=>`<div class="rv"><b>${fmt(q.q)}</b><br>Réponse : ${esc(q.o[0])}. ${esc(q.e)}</div>`).join(""):'<p class="s">Sans faute !</p>'}</div>`:""}
 ${me.host?'<button id="rp">Retour au salon pour rejouer</button>':'<p class="s">L’hôte peut relancer une partie.</p>'}`);
 if(me.host)$("#rp").onclick=()=>setG({ph:"lobby",cfg:G.cfg});
}
entry();
</script>
</body>
</html>
