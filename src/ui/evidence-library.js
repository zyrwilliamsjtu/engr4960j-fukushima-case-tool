/* An offline reading workspace. Selection and draft reasons are UI-only;
 * only a deliberate save writes a relation to the analysis runtime. */
(function () {
  'use strict';
  function create(ctx) {
    var modal=ctx.modal, host=ctx.host, tab='facts', query='', category='all', source='', linkedOnly=false;
    var selected={}, drafts={}, caseId=null, composing=false, page=0, pageSize=12, mobileReading=false, savedListScroll=0, originalReading=false;
    function bi(zh,en){return ctx.locale()==='zh'?zh:en;}
    function e(v){return ctx.escape(v);}
    function t(k){return ctx.t(k);}
    function mt(row,field){return window.FieldnotesMaterials.text(row,field,ctx.locale());}
    function read(row,field){return window.FieldnotesMaterials.text(row,field,originalReading?'zh':ctx.locale());}
    function data(){return ctx.data();}
    function state(){return ctx.state();}
    function items(type){return Object.values(state().items).filter(function(x){return x.type===type;});}
    function button(label,action,cls,attrs){return '<button type="button" class="button '+(cls||'')+'" data-lib="'+action+'" '+(attrs||'')+'>'+label+'</button>';}
    function sourceOf(x){return data().sources.find(function(s){return s.id===x.sourceId;});}
    function relations(id){return state().relations.filter(function(r){return r.from===id&&r.kind==='fact-supports-question';});}
    function chosen(id){return items('PA').some(function(x){return x.principleId===id;});}
    function records(){
      if(tab==='facts')return ctx.facts();
      if(tab==='principles')return data().principles;
      if(tab==='sources')return data().sources;
      if(tab==='timeline')return data().timeline.filter(function(x){return !/TODO|占位|待补/.test(x.event);}).slice().sort(function(a,b){return String(a.date).localeCompare(String(b.date));});
      return data().valueWords;
    }
    function name(x){
      var loc=ctx.locale();
      if(tab==='principles')return ctx.principleName(x.id);
      if(tab==='sources')return mt(x,'title');
      if(tab==='timeline')return mt(x,'event');
      if(tab==='glossary'){var i=data().valueWords.indexOf(x);return ctx.locale()==='zh'?x.word:(ctx.words[i]||[x.word])[0];}
      return mt(x,'text');
    }
    function searchable(x){var s=sourceOf(x);return [name(x),x.text,x.name,x.nameEn,x.desc,x.event,x.date,x.quote,x.locator,x.note,x.id,x.publisher,x.year,mt(x,'note'),mt(x,'locator'),mt(x,'quote'),mt(x,'desc'),s&&mt(s,'title'),s&&mt(s,'publisher'),s&&s.title,s&&s.publisher].join(' ').toLocaleLowerCase();}
    function filtered(){var terms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);return records().filter(function(x){
      return terms.every(function(term){return searchable(x).includes(term);})&&
        (tab!=='facts'||((category==='all'||x.categories.includes(category))&&(!source||x.sourceId===source)&&(!linkedOnly||relations(x.id).length)))&&
        (tab!=='principles'||category==='all'||x.group===category);
    });}
    function metadata(x){
      if(tab==='facts')return x.categories.map(function(c){return t(c);}).join(' · ');
      if(tab==='principles')return t(x.group);
      if(tab==='sources')return [mt(x,'publisher'),x.year].filter(Boolean).join(' · ');
      if(tab==='timeline')return mt(x,'date');
      return t('team');
    }
    function filters(){
      var html='';
      if(tab==='facts'||tab==='principles'){
        var cats=tab==='facts'?['all','material','individual','organization']:['all','basic','organization','employee','involvement','rights'];
        html='<div class="library-filter-chips" role="group" aria-label="'+e(t('filterFacts'))+'">'+cats.map(function(c){return '<button type="button" id="library-category-'+c+'" data-lib="category" data-category="'+c+'" aria-pressed="'+(category===c)+'" class="'+(category===c?'selected':'')+'">'+e(c==='all'?bi('全部','All'):t(c))+'</button>';}).join('')+'</div>';
      }
      if(tab==='facts')html+='<div class="library-filter-row"><label class="sr-only" for="library-source">'+e(t('source'))+'</label><select id="library-source" data-lib-field="source"><option value="">'+e(bi('所有来源','All sources'))+'</option>'+data().sources.filter(function(s){return ctx.facts().some(function(f){return f.sourceId===s.id;});}).map(function(s){return '<option value="'+e(s.id)+'" '+(source===s.id?'selected':'')+'>'+e(mt(s,'publisher')||mt(s,'title'))+'</option>';}).join('')+'</select><label class="library-linked-filter"><input type="checkbox" data-lib-field="linked" '+(linkedOnly?'checked':'')+'>'+e(bi('已引用','Linked'))+'</label></div>';
      return html;
    }
    function badge(x){
      var warning=tab==='facts'&&/未做|待核|待复核|⚠/.test(x.note||'')?'<span class="library-review-badge" title="'+e(mt(x,'note'))+'">'+e(bi('需复核','Review'))+'</span>':'';
      var count=tab==='facts'?relations(x.id).length:tab==='principles'&&chosen(x.id)?1:0;
      return warning+(count?'<span class="library-use-badge">'+ctx.icon('check')+e(tab==='facts'?bi('已引用','Linked'):t('selected'))+'</span>':'');
    }
    function list(list){return list.length?list.map(function(x,i){var s=sourceOf(x);return '<button type="button" class="library-row '+(tab==='facts'?'library-fact ':'')+(selected[tab]===x.id?'active':'')+'" id="library-record-'+e(x.id)+'" data-lib="select" data-id="'+e(x.id)+'" aria-pressed="'+(selected[tab]===x.id)+'"><span class="library-row-top"><span class="library-row-kind">'+e(metadata(x))+'</span>'+badge(x)+'</span><span class="library-row-title">'+e(name(x).replace(/\*\*/g,''))+'</span><span class="library-row-bottom"><span>'+e(s?mt(s,'publisher')||mt(s,'title'):tab==='sources'?x.id:tab==='timeline'?mt(x,'date'):bi('阅读与比较','Read & compare'))+'</span><span aria-hidden="true">↗</span></span></button>';}).join(''):
      '<div class="library-no-results">'+ctx.icon('book')+'<h3>'+e(bi('没有找到匹配资料','No matching materials'))+'</h3><p>'+e(bi('试试更短的词，或清除筛选。','Try fewer words or clear the filters.'))+'</p>'+button(e(bi('清除筛选','Clear filters')),'clear','small')+'</div>';}
    function urlLink(s){return s&&/^https?:\/\//i.test(s.url||'')?'<a class="library-source-link" href="'+e(s.url)+'" target="_blank" rel="noopener noreferrer">'+e(t('readSource'))+' ↗</a>':'';}
    function sourceContent(x){
      var s=sourceOf(x), pending=/未做|待核|待复核|⚠/.test(x.note||''), note=read(x,'note');
      return '<section class="library-provenance"><div class="library-section-title">'+ctx.icon('book')+'<h3>'+e(bi('回到出处','Trace the source'))+'</h3></div><p class="library-source-title">'+e(s?read(s,'title'):bi('尚未记录来源','No source recorded'))+'</p>'+
        (x.locator?'<div class="library-locator"><span>'+e(t('sourceLocation'))+'</span><strong>'+e(read(x,'locator'))+'</strong></div>':'')+
        (x.quote?'<blockquote class="library-original"><span>'+e(t('sourceOriginal'))+'</span><p>'+ctx.materialText(read(x,'quote'))+'</p></blockquote>':'')+
        (x.confidence?'<span class="library-confidence">'+e(t('confidence'))+' · '+e(t('confidence'+x.confidence[0].toUpperCase()+x.confidence.slice(1)))+'</span>':'')+
        (note?'<p class="source-review '+(pending?'pending':'')+'">'+ctx.materialText(note)+'</p>':'')+
        (s&&s.note?'<p class="source-note">'+e(read(s,'note'))+'</p>':'')+urlLink(s)+'</section>';
    }
    function draft(x){
      if(!drafts[x.id]){var qs=items('Q'), existing=relations(x.id)[0];drafts[x.id]={target:existing?existing.to:qs.length===1?qs[0].id:'',why:existing?existing.why:'',dirty:false,reasons:{}};}
      var d=drafts[x.id];if(d.target&&!items('Q').some(function(q){return q.id===d.target;})){d.target='';d.why='';d.dirty=false;}return d;
    }
    function linkForm(x){
      if(ctx.readonly())return '';
      var qs=items('Q'), d=draft(x), existing=relations(x.id).find(function(r){return r.to===d.target;});
      return '<section class="library-relevance"><div class="library-section-title">'+ctx.icon('link')+'<h3>'+e(bi('它如何帮助你的分析？','How does it inform your analysis?'))+'</h3></div>'+
        (qs.length?'<form id="library-link-form" data-id="'+e(x.id)+'"><label class="field"><span>'+e(t('questionTarget'))+'</span><select id="library-target" name="target" required><option value="">'+e(t('choose'))+'</option>'+qs.map(function(q){return '<option value="'+e(q.id)+'" '+(d.target===q.id?'selected':'')+'>'+e(q.text||q.id)+'</option>';}).join('')+'</select></label><label class="field"><span>'+e(t('whyRelated'))+'</span><textarea id="library-why" name="why" rows="3" required placeholder="'+e(t('whyHint'))+'">'+e(d.why)+'</textarea></label><div class="library-save-row"><small id="library-draft-status" role="status">'+e(d.dirty?bi('未保存的引用理由','Unsaved reason'):existing?bi('已保存，可以修改理由','Saved. You can edit the reason.'):bi('由你决定是否引用','You decide whether to use it.'))+'</small><button type="submit" class="button primary small">'+ctx.icon(existing?'check':'plus')+e(existing?bi('更新引用','Update link'):bi('保存引用','Save link'))+'</button></div></form>':
          '<p>'+e(bi('先写下一个伦理问题，再说明这条资料与它的关系。','Write an ethical question first, then explain how this material relates to it.'))+'</p>'+button(e(bi('去写一个问题','Write a question')),'navigate','primary small','data-step="1"'))+
        '<div class="library-relations">'+relations(x.id).map(function(r){var q=state().items[r.to];return '<article><div><strong>'+e(q?q.text||q.id:r.to)+'</strong><p>'+e(r.why)+'</p></div>'+button(ctx.icon('close'),'unlink','icon-button quiet','data-id="'+e(r.id)+'" aria-label="'+e(t('remove'))+'"')+'</article>';}).join('')+'</div></section>';
    }
    function detail(x){
      if(!x)return '<div class="library-welcome">'+ctx.icon('book')+'<h3>'+e(bi('从一条资料开始','Start with one material'))+'</h3><p>'+e(bi('选择左侧资料，查看原文与出处，再判断它是否有助于你的问题。','Select a material, check its source, and decide whether it informs your question.'))+'</p></div>';
      var html=(ctx.locale()==='en'?'<div class="material-language-tools">'+button(e(originalReading?'Show English':'Show original wording'),'original','quiet small','aria-pressed="'+originalReading+'"')+'</div>':'')+'<div class="library-detail-heading"><span class="library-detail-kicker">'+e(metadata(x))+'</span><span class="record-id">'+e(x.id)+'</span></div>';
      if(tab==='facts')html+='<h3 class="library-reading-text">'+ctx.materialText(read(x,'text'))+'</h3><p class="library-reading-note">'+e(bi('资料摘要 · 可核对原文',originalReading?'Original wording':'English translation · check the source'))+'</p>'+(!ctx.readonly()?button(ctx.icon('link')+e(bi('说明与问题的关系','Explain relevance')),'cite','quiet small'):'')+sourceContent(x)+linkForm(x);
      if(tab==='principles')html+='<h3 class="library-reading-title">'+e(originalReading?(tab==='glossary'?x.word:tab==='principles'?x.name:name(x)):name(x))+'</h3><p class="library-principle-desc">'+e(read(x,'desc'))+'</p><blockquote class="library-original"><span>'+e(t('sourceOriginal'))+'</span><p>'+e(x.nameEn)+'</p></blockquote><p class="library-reading-note">'+e(t('sourceTranslation'))+'</p>'+sourceContent(x)+(!ctx.readonly()?'<div class="library-principle-action">'+button(ctx.icon(chosen(x.id)?'check':'plus')+e(chosen(x.id)?t('selected'):bi('加入原则比较','Add to comparison')),'principle',chosen(x.id)?'quiet':'primary','data-id="'+e(x.id)+'" '+(chosen(x.id)?'disabled':''))+'<p>'+e(bi('加入后，在第六步写下适用理由与取舍。','Then explain relevance and priorities in step 6.'))+'</p></div>':'');
      if(tab==='timeline')html+='<time class="library-event-date">'+e(read(x,'date'))+'</time><h3 class="library-reading-text">'+ctx.materialText(read(x,'event'))+'</h3>'+sourceContent(x);
      if(tab==='sources'){var count=ctx.facts().filter(function(f){return f.sourceId===x.id;}).length;html+='<h3 class="library-reading-title">'+e(read(x,'title'))+'</h3><p class="library-publisher">'+e([mt(x,'publisher'),x.year].filter(Boolean).join(' · '))+'</p>'+(x.note?'<p class="library-source-caution">'+e(read(x,'note'))+'</p>':'')+urlLink(x)+'<div class="library-source-usage"><strong>'+count+'</strong><div><h3>'+e(bi('条资料引用此来源','materials cite this source'))+'</h3><p>'+e(bi('查看摘要、定位和原文，再决定如何使用。','Check summaries, locators and quotations before using them.'))+'</p></div></div>'+(count?button(e(bi('查看相关资料','Browse these materials'))+ctx.icon('arrow'),'source-facts','primary','data-id="'+e(x.id)+'"'):'');}
      if(tab==='glossary'){var idx=data().valueWords.indexOf(x);html+='<h3 class="library-reading-title">'+e(originalReading?(tab==='glossary'?x.word:tab==='principles'?x.name:name(x)):name(x))+'</h3><p class="library-principle-desc">'+e(read(x,'whyVague'))+'</p><div class="library-word-preview"><span>'+e(t('others'))+'</span><span>'+e(t('mine'))+'</span></div><p class="library-reading-note">'+e(bi('这是小组的思考提示，具体定义由你们填写。','This is a team prompt. Write your own definitions.'))+'</p>'+(!ctx.readonly()?button(ctx.icon('plus')+e(bi('去澄清这个词','Clarify this term')),'concept','primary','data-word="'+e(originalReading?(tab==='glossary'?x.word:tab==='principles'?x.name:name(x)):name(x))+'"'):'');}
      return '<div class="library-detail-inner">'+html+'</div>';
    }
    function refresh(focus) {
      var active=document.activeElement, id=active&&active.id, caret=active&&typeof active.selectionStart==='number'?[active.selectionStart,active.selectionEnd]:null;
      var listEl=host.querySelector('.library-results'), oldList=listEl&&listEl.clientHeight?listEl.scrollTop:savedListScroll, reading=host.querySelector('.library-reading'), oldRead=reading?reading.scrollTop:0;
      var allData=filtered(), total=allData.length, pages=Math.max(1,Math.ceil(total/pageSize));page=Math.max(0,Math.min(page,pages-1));var listData=allData.slice(page*pageSize,(page+1)*pageSize);if(!listData.some(function(x){return x.id===selected[tab];}))selected[tab]=listData.length?listData[0].id:null;
      var x=listData.find(function(x){return x.id===selected[tab];}), tabs=['facts','principles','timeline','sources','glossary'];
      host.innerHTML='<div class="library-shell '+(mobileReading?'is-reading':'')+'"><header class="library-header"><div class="library-brand">'+ctx.icon('book')+'<div><h2 id="modal-title">'+e(t('materials'))+'</h2><p>'+e(bi('先查依据，再形成自己的判断。','Check the evidence. Make your own judgment.'))+'</p></div></div><div class="library-header-actions"><div class="language-switch" role="group" aria-label="'+e(t('language'))+'"><button data-lib="language" data-lang="zh" aria-pressed="'+(ctx.locale()==='zh')+'" class="'+(ctx.locale()==='zh'?'selected':'')+'">'+e(t('langZh'))+'</button><button data-lib="language" data-lang="en" aria-pressed="'+(ctx.locale()==='en')+'" class="'+(ctx.locale()==='en'?'selected':'')+'">'+e(t('langEn'))+'</button></div>'+button(ctx.icon('close'),'close','icon-button quiet','aria-label="'+e(t('close'))+'"')+'</div></header><nav class="library-tabs" aria-label="'+e(t('materials'))+'">'+tabs.map(function(k){var count=k==='facts'?ctx.facts().length:k==='principles'?data().principles.length:k==='timeline'?data().timeline.length:k==='sources'?data().sources.length:data().valueWords.length;return '<button type="button" id="library-tab-'+k+'" data-lib="tab" data-tab="'+k+'" class="'+(tab===k?'selected':'')+'" aria-pressed="'+(tab===k)+'">'+e(t(k))+'<span>'+count+'</span></button>';}).join('')+'</nav><div class="library-mobile-bar">'+button(ctx.icon('back')+e(bi('返回资料列表','Back to list')),'back-list','quiet small')+'</div><div class="library-body"><aside class="library-browser"><div class="library-controls"><label class="library-search" for="library-search">'+ctx.icon('search')+'<input id="library-search" type="search" aria-label="'+e(bi('搜索资料内容、原文与出处','Search material, quotes and sources'))+'" value="'+e(query)+'" placeholder="'+e(bi('搜索内容、原文、出处…','Search text, quotes, sources…'))+'" autocomplete="off"></label>'+filters()+'<div class="library-result-summary"><span role="status">'+total+' '+e(bi('条资料','results'))+'</span>'+(query||category!=='all'||source||linkedOnly?button(e(bi('清除','Clear')),'clear','library-text-button'):'')+(tab==='facts'&&ctx.custom()?button(ctx.icon('plus')+e(t('addFact')),'add-fact','library-text-button'):'')+'</div></div><div class="library-results">'+list(listData)+'</div><div class="library-pagination">'+button(ctx.icon('back'),'page-prev','icon-button quiet','id="library-page-prev" aria-label="'+e(bi('上一页资料','Previous page'))+'" '+(page===0?'disabled':''))+'<span role="status">'+(total?page*pageSize+1:0)+'–'+Math.min((page+1)*pageSize,total)+' / '+total+'</span>'+button(ctx.icon('arrow'),'page-next','icon-button quiet','id="library-page-next" aria-label="'+e(bi('下一页资料','Next page'))+'" '+(page===pages-1?'disabled':''))+'</div>'+(tab==='principles'&&!ctx.readonly()?'<div class="library-browser-bottom">'+button(ctx.icon('plus')+e(t('addCustom')),'custom-principle','quiet small')+'</div>':'')+'</aside><section class="library-reading" aria-label="'+e(bi('资料阅读与引用','Read and link material'))+'">'+detail(x)+'</section></div><footer class="library-footer"><p>'+ctx.icon('link')+e(tab==='principles'?items('PA').length+' '+bi('项原则已选，适用理由由你填写','principles selected; explain relevance yourself'):state().relations.filter(function(r){return r.kind==='fact-supports-question'&&ctx.facts().some(function(f){return f.id===r.from;});}).length+' '+bi('处资料引用，理由由你填写','material links, with your own reasons'))+'</p>'+button(e(bi(tab==='principles'?'回到原则分析':'回到分析',tab==='principles'?'Return to principles':'Return to analysis'))+ctx.icon('arrow'),'return','primary small')+'</footer></div>';
      var newList=host.querySelector('.library-results'), newRead=host.querySelector('.library-reading');savedListScroll=focus==='select'?0:oldList;newList.scrollTop=savedListScroll;newRead.scrollTop=focus==='select'||focus==='read'?0:oldRead;
      var target=document.getElementById(id);if(target&&modal.open){target.focus({preventScroll:true});if(caret&&target.setSelectionRange)try{target.setSelectionRange(caret[0],caret[1]);}catch(err){}}
    }
    function open(nextTab,id){originalReading=false;
      if(caseId!==data().meta.id){selected={};drafts={};caseId=data().meta.id;query='';category='all';source='';linkedOnly=false;page=0;mobileReading=false;}
      if(nextTab&&nextTab!==tab){tab=nextTab;query='';category='all';source='';linkedOnly=false;page=0;mobileReading=false;}
      if(id){selected[tab]=id;query='';category='all';source='';linkedOnly=false;page=Math.max(0,Math.floor(filtered().findIndex(function(x){return x.id===id;})/pageSize));mobileReading=true;}
      if(modal.open)modal.close();modal.className='library-dialog';refresh();modal.showModal();host.querySelector('#library-search').focus({preventScroll:true});
    }
    host.addEventListener('click',function(event){var el=event.target.closest('[data-lib]');if(!el||el.disabled)return;event.preventDefault();var a=el.dataset.lib;
      if(a==='close'){modal.close();return;}
      if(a==='return'||a==='navigate'){modal.close();if(a==='navigate'||tab==='principles')ctx.navigate(a==='navigate'?Number(el.dataset.step):6);return;}
      if(a==='cite'){var form=host.querySelector('.library-relevance');form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});var input=form.querySelector('textarea,button');if(input)input.focus({preventScroll:true});return;}
      if(a==='language'){originalReading=false;ctx.language(el.dataset.lang);refresh();return;}
      if(a==='original'){originalReading=!originalReading;refresh('read');return;}
      if(a==='tab'){originalReading=false;tab=el.dataset.tab;query='';category='all';source='';linkedOnly=false;page=0;mobileReading=false;refresh('select');return;}
      if(a==='select'){originalReading=false;selected[tab]=el.dataset.id;mobileReading=true;refresh('read');return;}
      if(a==='back-list'){mobileReading=false;refresh();return;}
      if(a==='page-prev'||a==='page-next'){originalReading=false;page+=a==='page-next'?1:-1;refresh('select');return;}
      if(a==='category'){originalReading=false;category=el.dataset.category;page=0;mobileReading=false;refresh('select');return;}
      if(a==='clear'){originalReading=false;query='';category='all';source='';linkedOnly=false;page=0;mobileReading=false;refresh('select');return;}
      if(a==='source-facts'){originalReading=false;tab='facts';query='';category='all';source=el.dataset.id;linkedOnly=false;page=0;mobileReading=false;refresh('select');return;}
      if(ctx.readonly())return;
      if(a==='unlink'){ctx.dispatch('UNLINK',{id:el.dataset.id});var d=drafts[selected.facts];if(d&&!d.dirty){d.why='';}refresh();return;}
      if(a==='principle'&&!chosen(el.dataset.id)){ctx.dispatch('ADD_ITEM',{type:'PA',step:6,fields:{principleId:el.dataset.id,appliesTo:[],order:items('PA').length+1}});refresh();ctx.toast(bi('已加入比较，在第六步解释适用理由。','Added. Explain its relevance in step 6.'));return;}
      if(a==='custom-principle'){modal.close();ctx.dispatch('ADD_ITEM',{type:'PA',step:6,fields:{order:items('PA').length+1}});ctx.navigate(6);return;}
      if(a==='concept'){modal.close();ctx.dispatch('ADD_ITEM',{type:'C',step:5,fields:{word:el.dataset.word,others:'',mine:''}});ctx.navigate(5);return;}
      if(a==='add-fact'){ctx.addFact();}
    });
    function searchInput(){originalReading=false;query=host.querySelector('#library-search').value;page=0;mobileReading=false;refresh('select');}
    host.addEventListener('compositionstart',function(event){if(event.target.id==='library-search')composing=true;});
    host.addEventListener('compositionend',function(event){if(event.target.id==='library-search'){composing=false;searchInput();}});
    host.addEventListener('input',function(event){
      if(event.target.id==='library-search'&&!composing&&!event.isComposing)searchInput();
      if(event.target.id==='library-why'){event.target.setCustomValidity('');var d=drafts[selected.facts];d.why=event.target.value;d.dirty=true;d.reasons[d.target]={why:d.why,dirty:true};host.querySelector('#library-draft-status').textContent=bi('未保存的引用理由','Unsaved reason');}
    });
    host.addEventListener('change',function(event){
      if(event.target.dataset.libField==='source'){source=event.target.value;page=0;mobileReading=false;refresh('select');}
      if(event.target.dataset.libField==='linked'){linkedOnly=event.target.checked;page=0;mobileReading=false;refresh('select');}
      if(event.target.id==='library-target'){var d=drafts[selected.facts], rel=relations(selected.facts).find(function(r){return r.to===event.target.value;});var unassigned=!d.target&&d.dirty?d.why:'';d.reasons[d.target]={why:d.why,dirty:d.dirty};d.target=event.target.value;var prior=d.reasons[d.target];d.why=prior?prior.why:rel?rel.why:unassigned;d.dirty=prior?prior.dirty:!!unassigned;refresh();}
    });
    host.addEventListener('submit',function(event){var form=event.target;if(form.id!=='library-link-form')return;event.preventDefault();event.stopPropagation();if(ctx.readonly())return;
      var fd=new FormData(form), target=String(fd.get('target')||''), why=String(fd.get('why')||'').trim();if(!why){var input=form.querySelector('textarea');input.setCustomValidity(bi('请写下你认为相关的理由。','Explain why you consider it relevant.'));input.reportValidity();return;}if(!items('Q').some(function(q){return q.id===target;}))return;
      ctx.dispatch('LINK',{from:form.dataset.id,to:target,kind:'fact-supports-question',why:why});var d=drafts[form.dataset.id];d.target=target;d.why=why;d.dirty=false;d.reasons[target]={why:why,dirty:false};refresh();ctx.toast(bi('引用已保存，可以继续浏览。','Link saved. Keep browsing.'));
    });
    modal.addEventListener('close',function(){if(!modal.open&&modal.classList.contains('library-dialog')&&document.activeElement===document.body){var workspace=document.getElementById('workspace');if(workspace)workspace.focus({preventScroll:true});}});
    return {open:open,isOpen:function(){return modal.open&&modal.classList.contains('library-dialog');}};
  }
  window.FieldnotesLibrary={create:create};
})();
