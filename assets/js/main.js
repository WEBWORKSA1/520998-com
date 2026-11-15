/* 520998.com — Love Codes & Lucky Numbers | site script (no dependencies) */
(function(){
  'use strict';
  var BASE=document.documentElement.getAttribute('data-base')||'';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function toast(t){var el=$('#toast');if(!el){el=document.createElement('div');el.id='toast';el.className='toast';document.body.appendChild(el)}el.textContent=t;el.classList.add('show');setTimeout(function(){el.classList.remove('show')},1800)}
  function copy(t){if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){toast('Copied')})}else{var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Copied')}catch(e){}a.remove()}}
  window.__copy=copy;

  /* ---------- Private inbox routing (address is never written in the page) ---------- */
  var _k=[106,104,100,41,107,110,102,106,96,71,54,102,116,108,117,104,112,101,98,112];
  function inbox(){return String.fromCharCode.apply(null,_k.map(function(c){return c^7})).split('').reverse().join('')}
  function endpoint(){return 'https://formsubmit.co/ajax/'+inbox()}
  $$('[data-mail]').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      window.location.href='mailto:'+inbox()+'?subject='+encodeURIComponent(a.getAttribute('data-mail')||'Inquiry from 520998.com');
    });
  });

  /* ---------- Theme, menu, year ---------- */
  var root=document.documentElement,saved=store('n520-theme');
  if(saved)root.setAttribute('data-theme',saved);
  var tb=$('#themeBtn');if(tb)tb.addEventListener('click',function(){var c=root.getAttribute('data-theme')==='light'?'dark':'light';root.setAttribute('data-theme',c);store('n520-theme',c)});
  var bg=$('#burger'),mn=$('#menu');if(bg&&mn)bg.addEventListener('click',function(){var o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
  $$('.year').forEach(function(y){y.textContent=new Date().getFullYear()});
  var here=location.href.split(/[?#]/)[0].replace(/\/$/,'/index.html');
  $$('.menu a').forEach(function(a){if(a.href===here)a.setAttribute('aria-current','page')});

  /* ---------- Cookie notice ---------- */
  var ck=$('#cookie');
  if(ck&&!store('n520-consent')){ck.classList.add('show')}
  $$('[data-cookie]').forEach(function(b){b.addEventListener('click',function(){store('n520-consent',b.getAttribute('data-cookie'));ck.classList.remove('show')})});

  /* ---------- Reveal on scroll ---------- */
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});$$('.reveal').forEach(function(el){io.observe(el)})}else{$$('.reveal').forEach(function(el){el.classList.add('in')})}

  /* ---------- Forms (AJAX to private inbox) ---------- */
  $$('form.js-form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=$('.form-msg',f),btn=$('button[type=submit]',f);
      if(f.querySelector('[name=_honey]')&&f.querySelector('[name=_honey]').value){return}
      var data={};
      new FormData(f).forEach(function(v,k){if(k==='_honey')return;data[k]=data[k]?data[k]+', '+v:v});
      data._subject=(f.getAttribute('data-subject')||'520998.com form')+' — '+(data.name||data.email||'');
      data._template='table';data._captcha='false';data.page=location.href;
      if(btn){btn.disabled=true;btn.dataset.t=btn.textContent;btn.textContent='Sending…'}
      fetch(endpoint(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json()})
        .then(function(){if(msg){msg.className='form-msg ok';msg.textContent=f.getAttribute('data-ok')||'Thank you — we received it and will reply soon.'}f.reset();var st=f.querySelector('.step');if(st){goStep(f,0)}})
        .catch(function(){if(msg){msg.className='form-msg err';msg.innerHTML='Network issue. Please try again, or use the contact link in the footer.'}})
        .finally(function(){if(btn){btn.disabled=false;btn.textContent=btn.dataset.t}});
    });
  });

  /* ---------- Multi-step forms ---------- */
  function goStep(f,i){var s=$$('.step',f);s.forEach(function(x,j){x.classList.toggle('on',j===i)});$$('.steps-bar span',f).forEach(function(b,j){b.classList.toggle('on',j<=i)});f.dataset.step=i}
  $$('form.multi').forEach(function(f){
    goStep(f,0);
    $$('[data-next]',f).forEach(function(b){b.addEventListener('click',function(){
      var i=+f.dataset.step,cur=$$('.step',f)[i],ok=true;
      $$('input,select,textarea',cur).forEach(function(el){if(!el.checkValidity()){ok=false;el.reportValidity&&el.reportValidity()}});
      var need=cur.getAttribute('data-need');if(need&&!cur.querySelector('input[name="'+need+'"]:checked')){ok=false;toast('Please pick an option')}
      if(ok)goStep(f,i+1)})});
    $$('[data-prev]',f).forEach(function(b){b.addEventListener('click',function(){goStep(f,Math.max(0,+f.dataset.step-1))})});
  });

  /* ---------- Countdowns ---------- */
  function nextDate(md){var n=new Date(),y=n.getFullYear(),p=md.split('-'),d=new Date(y,+p[0]-1,+p[1]);if(d<n&&!(d.toDateString()===n.toDateString()))d=new Date(y+1,+p[0]-1,+p[1]);return d}
  window.__nextDate=nextDate;
  function tick(){
    $$('[data-countdown]').forEach(function(el){
      var v=el.getAttribute('data-countdown'),t;
      if(v==='month-end'){var n=new Date();t=new Date(n.getFullYear(),n.getMonth()+1,1)}else if(/^\d{4}-/.test(v)){t=new Date(v+'T00:00:00')}else{t=nextDate(v)}
      var ms=t-new Date();if(ms<0)ms=0;
      var d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60,s=Math.floor(ms/1e3)%60;
      if(ms===0&&v.length<=5){el.innerHTML='<div><b>Today</b><span>it’s the day</span></div>';return}
      el.innerHTML='<div><b>'+d+'</b><span>days</span></div><div><b>'+h+'</b><span>hrs</span></div><div><b>'+m+'</b><span>min</span></div><div><b>'+s+'</b><span>sec</span></div>';
    });
  }
  if($('[data-countdown]')){tick();setInterval(tick,1000)}

  /* ---------- YouTube facades ---------- */
  $$('.vid').forEach(function(v){
    v.addEventListener('click',function(){
      var id=v.getAttribute('data-yt'),q=v.getAttribute('data-q');
      if(id){v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0" title="'+esc(v.getAttribute('data-title')||'Video')+'" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>'}
      else if(q){window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(q),'_blank','noopener')}
    });
    v.addEventListener('keydown',function(e){if(e.key==='Enter')v.click()});
  });

  /* ---------- Share buttons ---------- */
  $$('[data-share]').forEach(function(b){b.addEventListener('click',function(){
    var u=b.getAttribute('data-url')||location.href,t=b.getAttribute('data-text')||document.title;
    if(navigator.share){navigator.share({title:t,text:t,url:u}).catch(function(){})}else{copy(t+' '+u)}
  })});
  $$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var s=$(b.getAttribute('data-copy'));copy(s?s.innerText:b.getAttribute('data-copy'))})});

  /* =====================================================================
     NUMBER ENGINE
     ===================================================================== */
  var DIG=window.N520_DIGITS||{},CODES=window.N520_CODES||[];
  function codeMap(){var m={};CODES.forEach(function(c){m[c.n]=c});return m}
  function matchCodes(s){
    var keys=CODES.map(function(c){return c.n}).filter(function(k){return k.length>=2}).sort(function(a,b){return b.length-a.length});
    var out=[],i=0;
    while(i<s.length){var hit=null;for(var k=0;k<keys.length;k++){if(s.substr(i,keys[k].length)===keys[k]){hit=keys[k];break}}
      if(hit){out.push({t:'code',v:hit});i+=hit.length}else{out.push({t:'digit',v:s[i]});i++}}
    return out;
  }
  function numRoot(s){var n=s.split('').reduce(function(a,b){return a+(+b)},0),first=n;while(n>9&&n!==11&&n!==22&&n!==33){n=String(n).split('').reduce(function(a,b){return a+(+b)},0)}return {sum:first,root:n}}
  function patterns(s){
    var p=[];
    if(/^(\d)\1+$/.test(s))p.push('Repeating digit — amplifies the meaning of '+s[0]+' (“'+(DIG[s[0]]||{}).w+'”).');
    if(s.length>=4&&/^(\d\d)\1+$/.test(s))p.push('Repeating pair — a rhythmic, emphatic code.');
    if(s.length>=3&&s===s.split('').reverse().join(''))p.push('Mirror (palindrome) — reads the same both ways; a symbol of balance.');
    var asc=true,desc=true;for(var i=1;i<s.length;i++){if(+s[i]!==+s[i-1]+1)asc=false;if(+s[i]!==+s[i-1]-1)desc=false}
    if(s.length>=3&&asc)p.push('Ascending sequence — read as growth and step-by-step progress.');
    if(s.length>=3&&desc)p.push('Descending sequence — read as release and simplification.');
    if(s.indexOf('4')>-1)p.push('Contains 4 — many Chinese speakers avoid 4 (sounds like 死, “death”) for gifts, prices and plates.');
    if(/[89]$/.test(s))p.push('Ends on '+s.slice(-1)+' — a classic “lucky ending” used in prices and gift amounts.');
    if(s.indexOf('520')>-1||s.indexOf('521')>-1)p.push('Carries the love code 520/521 (“I love you”).');
    if(s.indexOf('1314')>-1)p.push('Carries 1314 (“for a lifetime”).');
    return p;
  }
  function score(s){var sc=0,mx=0;s.split('').forEach(function(d){var v=(DIG[d]||{}).v||0;sc+=v;mx+=3});var pct=Math.round(50+50*(sc/Math.max(mx,1)));return Math.max(1,Math.min(99,pct))}
  window.N520={decode:function(s){
    s=(s||'').replace(/\D/g,'').slice(0,20);if(!s)return null;
    var cm=codeMap(),parts=matchCodes(s),reading=[];
    parts.forEach(function(p){if(p.t==='code')reading.push(cm[p.v].m);else reading.push((DIG[p.v]||{}).w.split(' · ')[0])});
    return {s:s,parts:parts,reading:reading,root:numRoot(s),patterns:patterns(s),score:score(s),exact:cm[s]||null,cm:cm};
  }};

  function renderDecode(box,s){
    var r=N520.decode(s);if(!r){box.innerHTML='<p class="muted">Type a number to decode it.</p>';return}
    var h='<div class="sec-head" style="margin-bottom:14px"><div><div class="tag">Decoded</div><div class="bignum" style="margin-top:8px">'+esc(r.s)+'</div></div>';
    if(r.exact&&r.exact.slug)h+='<a class="btn btn-ghost btn-sm" href="'+BASE+'numbers/'+r.exact.slug+'.html">Full meaning of '+esc(r.s)+' →</a>';
    h+='</div><div class="digits">';
    r.s.split('').forEach(function(d){var g=DIG[d]||{};h+='<div class="digit '+(g.v>1?'good':g.v<0?'bad':'')+'"><span class="d">'+d+'</span><span class="z">'+esc(g.zh||'')+'</span><span class="w">'+esc(g.py||'')+'</span><span class="w">'+esc(g.w||'')+'</span></div>'});
    h+='</div><div class="result" style="margin-top:16px">';
    h+='<div class="kv"><span>Chinese-slang reading</span><b>'+esc(r.reading.join(' + '))+'</b></div>';
    r.parts.filter(function(p){return p.t==='code'}).forEach(function(p){var c=r.cm[p.v];h+='<div class="kv"><span>Code <span class="mono">'+p.v+'</span> '+esc(c.zh)+'</span><b>'+esc(c.m)+'</b></div>'});
    h+='<div class="kv"><span>Digit sum → root number</span><b>'+r.root.sum+' → '+r.root.root+'</b></div>';
    h+='<div class="kv"><span>Auspiciousness score</span><b>'+r.score+'/100</b></div><div class="meter" style="margin:6px 0 4px"><i style="width:'+r.score+'%"></i></div>';
    h+='</div>';
    if(r.patterns.length){h+='<h3 style="margin-top:18px">Patterns spotted</h3><ul class="list-check">'+r.patterns.map(function(p){return '<li>'+esc(p)+'</li>'}).join('')+'</ul>'}
    h+='<div class="cta-row"><button class="btn btn-ghost btn-sm" id="cpRes">Copy reading</button><button class="btn btn-ghost btn-sm" id="shRes">Share link</button><a class="btn btn-primary btn-sm" href="#report">Get my free love-number report</a></div>';
    h+='<p class="small muted">Readings combine documented Chinese internet slang with traditional homophone symbolism. They are for culture, fun and inspiration — not predictions.</p>';
    box.innerHTML=h;
    var link=new URL(BASE+'decoder.html?n='+r.s,location.href).href;
    $('#cpRes').onclick=function(){copy(r.s+' = '+r.reading.join(' + ')+' — decoded at '+link)};
    $('#shRes').onclick=function(){if(navigator.share)navigator.share({title:r.s+' meaning',url:link}).catch(function(){});else copy(link)};
    var rf=$('#reportNum');if(rf)rf.value=r.s;
  }
  var dForm=$('#decoderForm');
  if(dForm){
    var dIn=$('#decoderInput'),dBox=$('#decoderOut');
    dForm.addEventListener('submit',function(e){e.preventDefault();renderDecode(dBox,dIn.value);if(history.replaceState)history.replaceState(null,'','?n='+dIn.value.replace(/\D/g,''))});
    dIn.addEventListener('input',function(){if(dIn.value.replace(/\D/g,'').length>=2)renderDecode(dBox,dIn.value)});
    $$('[data-try]').forEach(function(c){c.addEventListener('click',function(){dIn.value=c.getAttribute('data-try');renderDecode(dBox,dIn.value);dBox.scrollIntoView({behavior:'smooth',block:'nearest'})})});
    var q=new URLSearchParams(location.search).get('n');dIn.value=q||dIn.getAttribute('data-default')||'520998';renderDecode(dBox,dIn.value);
  }
  /* mini decoder on home */
  var mini=$('#miniDecode');
  if(mini){var mi=$('input',mini),mo=$('#miniOut');function mr(){var r=N520.decode(mi.value);mo.innerHTML=r?'<div class="kv"><span>Reading</span><b>'+esc(r.reading.join(' + '))+'</b></div><div class="kv"><span>Luck score</span><b>'+r.score+'/100</b></div><div class="meter"><i style="width:'+r.score+'%"></i></div>':''}
    mi.addEventListener('input',mr);mr();mini.addEventListener('submit',function(e){e.preventDefault();location.href=BASE+'decoder.html?n='+mi.value.replace(/\D/g,'')})}

  /* ---------- Lucky amount calculator ---------- */
  var LUCKY=[6,8,9,16,18,28,38,52,66,68,88,99,128,131,138,166,168,188,198,199,200,218,228,238,268,288,298,299,328,338,366,368,388,398,399,500,520,521,566,588,598,666,668,688,698,777,799,800,818,828,838,868,888,899,988,999,1000,1088,1111,1188,1288,1314,1388,1588,1666,1688,1888,1999,2000,2088,2288,2588,2666,2888,3088,3388,3666,3888,5200,5201,5888,6666,6888,8888,9999,10000,13140,52013,99999];
  var LOVE={52:'5-2 “I love” (half of 520)',99:'“forever and ever”',131:'131 “one life” (short 1314)',520:'“I love you”',521:'“I’m willing / I love you”',1314:'“for a lifetime”',5200:'520 ×10 “I love you” (bigger)',5201:'“I love you, only you”',13140:'1314 ×10 “for a lifetime”',52013:'“I love you for life”',999:'“eternal” / forever',666:'“smooth, everything goes well”',888:'“triple prosperity”',168:'“prosper all the way”',188:'“prosper and prosper”',8888:'“endless prosperity”',9999:'“forever and always”'};
  var aForm=$('#amountForm');
  if(aForm){aForm.addEventListener('submit',function(e){e.preventDefault();
    var b=parseFloat($('#amtBudget').value)||0,occ=$('#amtOcc').value,cur=$('#amtCur').value,out=$('#amtOut');
    if(b<=0){out.innerHTML='<p>Enter a budget above zero.</p>';return}
    var pool=LUCKY.filter(function(n){return String(n).indexOf('4')<0});
    if(occ==='funeral'){out.innerHTML='<p><b>Etiquette note:</b> condolence money traditionally uses odd amounts (e.g. 101, 201, 501) and avoids festive “lucky” numbers. Choose a modest odd amount close to '+cur+b+'.</p>';return}
    var below=pool.filter(function(n){return n<=b}).slice(-3).reverse(),above=pool.filter(function(n){return n>b}).slice(0,2);
    var love=(occ==='love'||occ==='wedding')?pool.filter(function(n){return LOVE[n]&&/love|life|forever|eternal|willing/.test(LOVE[n])}):[];
    var nearLove=love.sort(function(x,y){return Math.abs(x-b)-Math.abs(y-b)}).slice(0,2);
    function row(n,lab){return '<div class="kv"><span>'+lab+(LOVE[n]?' · <span class="muted">'+LOVE[n]+'</span>':'')+'</span><b>'+cur+n.toLocaleString()+'</b></div>'}
    var h='';below.forEach(function(n,i){h+=row(n,i===0?'Best fit within budget':'Also within budget')});above.forEach(function(n){h+=row(n,'Stretch option')});nearLove.forEach(function(n){h+=row(n,'Love-code amount')});
    if(occ==='wedding')h+='<p class="small" style="margin-top:10px">Wedding gifts favour even amounts; pairs symbolise couples. Avoid any amount containing 4.</p>';
    if(occ==='newyear')h+='<p class="small" style="margin-top:10px">Lunar New Year red envelopes: crisp new notes, even amounts, nothing with a 4.</p>';
    if(occ==='business')h+='<p class="small" style="margin-top:10px">Business gifts: 8-ending amounts read as “prosperity” — 168, 188, 888 are classics.</p>';
    out.innerHTML=h;});aForm.dispatchEvent(new Event('submit',{cancelable:true}))}

  /* ---------- Lucky price calculator ---------- */
  var pForm=$('#priceForm');
  if(pForm){pForm.addEventListener('submit',function(e){e.preventDefault();
    var p=parseFloat($('#prBase').value)||0,cost=parseFloat($('#prCost').value)||0,cur=$('#prCur').value,out=$('#prOut');
    if(p<=0){out.innerHTML='<p>Enter a base price.</p>';return}
    function f(x){return cur+x.toFixed(2)}
    var whole=Math.floor(p),opts=[];
    opts.push(['Charm price (.99)','Left-digit effect; most-taught tactic in Western retail',whole-0.01+(p-whole>0.5?1:0)]);
    opts.push(['Lucky-8 ending (.88)','Common in Chinese & many Asian markets (8 ≈ prosperity)',Math.max(0.88,(p-whole>0.5?whole:whole-1)+0.88)]);
    var e8=Math.round(p/10)*10-2;if(e8<p*0.9)e8+=10;opts.push(['Whole-number 8 ending','Clean “…8” price, e.g. 68, 98, 168',Math.max(8,e8)]);
    opts.push(['Prestige round','Round numbers signal premium quality',Math.round(p/5)*5||5]);
    if(p>4&&p<30)opts.push(['Love-code price','Seasonal 520 / Valentine promo (5.20 · 13.14 · 20.52)',[5.2,13.14,20.52].sort(function(a,b){return Math.abs(a-p)-Math.abs(b-p)})[0]]);
    if(p>=30&&p<1500)opts.push(['Love-code price','Seasonal 520 promo (52 · 131.4 · 520 · 1314)',[52,131.4,520,1314].sort(function(a,b){return Math.abs(a-p)-Math.abs(b-p)})[0]]);
    var h='<div class="table-wrap"><table><thead><tr><th>Strategy</th><th>Price</th>'+(cost?'<th>Margin</th>':'')+'</tr></thead><tbody>';
    opts.forEach(function(o){var v=+o[2].toFixed(2),mg=cost?((v-cost)/v*100).toFixed(1)+'%':'';h+='<tr><td><b>'+o[0]+'</b><br><span class="small muted">'+o[1]+'</span></td><td class="mono">'+f(v)+'</td>'+(cost?'<td class="mono">'+mg+'</td>':'')+'</tr>'});
    h+='</tbody></table></div><p class="small muted" style="margin-top:10px">Avoid prices containing 4 when selling to Chinese-speaking shoppers. Always A/B test — the right ending depends on your audience.</p>';
    out.innerHTML=h;});pForm.dispatchEvent(new Event('submit',{cancelable:true}))}

  /* ---------- Love code builder ---------- */
  var bForm=$('#builderForm');
  if(bForm){function build(){var picks=$$('input[name=phrase]:checked',bForm).map(function(i){return i.value});var c=picks.join('');var cm=codeMap(),mean=picks.map(function(p){return (cm[p]||{}).m}).join(' + ');
      $('#builderOut').innerHTML=picks.length?'<div class="bignum grad-text" id="bcode">'+c+'</div><p style="margin-top:8px">'+esc(mean)+'</p><div class="cta-row"><button type="button" class="btn btn-primary btn-sm" onclick="__copy(\''+c+'\')">Copy code</button><a class="btn btn-ghost btn-sm" href="'+BASE+'decoder.html?n='+c+'">Decode it</a></div>':'<p class="muted">Tick phrases to build your secret number message.</p>'}
    bForm.addEventListener('change',build);build()}

  /* ---------- Name-number love match (entertainment) ---------- */
  var mForm=$('#matchForm');
  if(mForm){var PY={a:1,j:1,s:1,b:2,k:2,t:2,c:3,l:3,u:3,d:4,m:4,v:4,e:5,n:5,w:5,f:6,o:6,x:6,g:7,p:7,y:7,h:8,q:8,z:8,i:9,r:9};
    function nn(s){var n=s.toLowerCase().replace(/[^a-z]/g,'').split('').reduce(function(a,c){return a+(PY[c]||0)},0);while(n>9)n=String(n).split('').reduce(function(a,b){return a+(+b)},0);return n||0}
    var DESC={1:'the initiator',2:'the harmoniser',3:'the communicator',4:'the builder',5:'the adventurer',6:'the nurturer',7:'the seeker',8:'the achiever',9:'the romantic idealist'};
    mForm.addEventListener('submit',function(e){e.preventDefault();var a=$('#mA').value,b=$('#mB').value;if(!a.trim()||!b.trim())return;var x=nn(a),y=nn(b);
      var base=100-Math.abs(x-y)*7;if((x+y)%2===0)base+=4;if(x===y)base=88;var code=String(x)+String(y);var pct=Math.max(52,Math.min(99,base));
      $('#matchOut').innerHTML='<div class="kv"><span>'+esc(a)+'</span><b>'+x+' · '+DESC[x]+'</b></div><div class="kv"><span>'+esc(b)+'</span><b>'+y+' · '+DESC[y]+'</b></div><div class="kv"><span>Harmony score</span><b>'+pct+'%</b></div><div class="meter"><i style="width:'+pct+'%"></i></div><p style="margin-top:12px">Your pair code is <b class="mono">'+code+'</b>. Add it to 520 for a personal love code: <b class="mono">520'+code+'</b>.</p><p class="small muted">Pythagorean name numerology, for fun only.</p>'})}

  /* ---------- Love-days calendar ---------- */
  var cal=$('#loveCal');
  if(cal){var Q={2026:'08-19',2027:'08-08',2028:'08-26',2029:'08-16',2030:'08-05'};
    var DAYS=[['02-14','Valentine’s Day','Global day of love — the biggest flower & chocolate day.'],['03-14','White Day','Return-gift day popular in Japan, Korea, Taiwan and parts of China.'],['05-20','520 Day','“I love you” day — the internet-born love festival.'],['05-21','521 Day','“I’m willing” — popular for proposals and marriage registrations.'],['09-09','Double Nine (久久)','9 sounds like “long-lasting”; a favourite date for weddings.'],['11-11','Singles’ Day','The world’s largest shopping festival; self-love & deals.'],['12-24','Christmas Eve','Gift-giving and date night in many Asian cities.']];
    var now=new Date(),y=now.getFullYear();var qd=Q[y]&&new Date(y+'-'+Q[y]+'T00:00:00')>=new Date(now.toDateString())?y+'-'+Q[y]:(Q[y+1]?(y+1)+'-'+Q[y+1]:null);
    if(qd)DAYS.push([qd,'Qixi Festival (七夕)','Traditional Chinese Valentine’s Day — 7th day of the 7th lunar month.']);
    var rows=DAYS.map(function(d){var t=d[0].length>5?new Date(d[0]+'T00:00:00'):nextDate(d[0]);return {t:t,d:d}}).sort(function(a,b){return a.t-b.t});
    cal.innerHTML=rows.map(function(r){var days=Math.ceil((r.t-new Date(new Date().toDateString()))/864e5);return '<div class="card"><div class="tag'+(days<45?' red':'')+'">'+(days===0?'Today':'in '+days+' days')+'</div><h3 style="margin-top:10px">'+r.d[1]+'</h3><p class="mono muted small">'+r.t.toDateString()+'</p><p>'+r.d[2]+'</p></div>'}).join('')}

  /* ---------- Gift finder ---------- */
  var gForm=$('#giftForm');
  if(gForm&&window.N520_GIFTS){function gf(){var who=$('#gWho').value,bud=+$('#gBud').value,vibe=$('#gVibe').value;
      var list=N520_GIFTS.filter(function(g){return (who==='any'||g.who.indexOf(who)>-1)&&g.p<=bud&&(vibe==='any'||g.vibe===vibe)});
      $('#giftOut').innerHTML=list.length?list.map(function(g){return '<div class="card"><div class="tag">'+g.vibe+'</div><h3 style="margin-top:10px">'+esc(g.t)+'</h3><p>'+esc(g.d)+'</p><p class="small muted">Typical spend: about '+g.p+' · Lucky-number touch: '+esc(g.n)+'</p></div>'}).join(''):'<p class="muted">No exact match — raise the budget or choose “any”.</p>'}
    gForm.addEventListener('change',gf);gForm.addEventListener('submit',function(e){e.preventDefault();gf()});gf()}

  /* ---------- Number library filter ---------- */
  var lf=$('#libFilter');
  if(lf){lf.addEventListener('input',function(){var q=lf.value.toLowerCase();$$('.num-card').forEach(function(c){c.style.display=c.textContent.toLowerCase().indexOf(q)>-1?'':'none'})})}
})();
