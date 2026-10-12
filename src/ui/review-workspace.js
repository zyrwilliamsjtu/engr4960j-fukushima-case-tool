/* Guided human review. Reuses review.status/note; no generated analysis or new state fields. */
(function(){
  'use strict';
  function create(ctx){
    var selected=null, filter='pending', angle=0, drafts={}, caseId=null, part=null, phase='read';
    function bi(zh,en){return ctx.locale()==='en'?en:zh;}
    function e(value){return ctx.escape(value);}
    function records(){return Object.values(ctx.state().items).filter(function(it){return it.step<7;});}
    function kind(it){var r=it.review||{};return r.status==='checked'&&!it.needsReview?'kept':r.status==='revise'?'revise':r.status==='unseen'&&r.note?'discussion':'pending';}
    function label(status){return {pending:bi('待复核','To review'),kept:bi('保留','Keep'),revise:bi('需要修改','Revise'),discussion:bi('待讨论','Discuss')}[status];}
    function type(it){return {Q:bi('伦理问题','Ethical question'),M:bi('信息缺口','Information gap'),A:bi('合理假设','Assumption'),C:bi('概念定义','Definition'),PA:bi('伦理原则','Ethical principle')}[it.type]||bi('分析记录','Analysis record');}
    function queue(){return records().filter(function(it){return it.type===part&&(filter==='all'||kind(it)===filter);});}
    function btn(text,action,attrs,cls){return '<button type="button" class="button '+(cls||'quiet small')+'" data-review-action="'+action+'" '+(attrs||'')+'>'+e(text)+'</button>';}
    function sync(){var id=ctx.data().meta.id;if(caseId!==id){caseId=id;selected=null;filter='pending';drafts={};angle=0;part=null;phase='read';}var list=queue();if(!list.some(function(it){return it.id===selected;}))selected=list[0]?list[0].id:null;return list;}
    function draft(it){if(!drafts[it.id])drafts[it.id]={choice:kind(it)==='kept'?'checked':kind(it)==='revise'?'revise':kind(it)==='discussion'?'discussion':'',note:it.review&&it.review.note||''};return drafts[it.id];}
    function prompt(it){
      var common=[bi('有没有遗漏受影响的人，或与当前判断相反的证据？','Are any affected people or counter-evidence missing?'),bi('如果这条记录不成立，哪些后续判断需要重新考虑？','If this record is wrong, which later judgments need reconsideration?')];
      var specific={Q:bi('问题是否指向具体行动与受影响的人？有没有把不同问题混在一起？','Does the question identify an action and affected people? Does it combine separate issues?'),M:bi('补上这项信息会改变什么判断？它是否真的还没有可靠依据？','Which judgment would this information change? Is reliable evidence still missing?'),A:bi('这里哪些是已知事实，哪些是推断？依据足以支持这个假设吗？','Which parts are known facts and which are inferred? Does the evidence support the assumption?'),C:bi('他人的理解和本组用法是否区分清楚？含义不同会改变分析吗？','Are others’ interpretations distinct from your usage? Would a different meaning change the analysis?'),PA:bi('原则为什么适用？有没有与它冲突的原则，或被忽略的立场？','Why does this principle apply? Are conflicting principles or perspectives missing?')};
      return [specific[it.type]||common[0]].concat(common)[angle%3];
    }
    function text(it){return it.type==='PA'?ctx.principleName(it.principleId)||it.text:it.word||it.text||it.id;}
    function context(it){
      var html='',fields=it.type==='C'?[[bi('他人的理解','Other interpretations'),it.others||it.othersView],[bi('本组用法','Our usage'),it.mine||it.myUsage]]:it.type==='PA'?[[bi('适用理由','Applicability'),it.text]]:it.type==='Q'?[[bi('聚焦理由','Focus reason'),it.focusReason]]:[];
      fields.forEach(function(pair){if(pair[1])html+='<div class="guided-review-field"><span>'+e(pair[0])+'</span><p>'+e(pair[1])+'</p></div>';});
      var refs=(it.basisRefs||[]).slice();ctx.state().relations.forEach(function(r){if(r.to===it.id&&r.kind==='fact-supports-question'&&!refs.includes(r.from))refs.push(r.from);});
      var sources=refs.map(function(id){return ctx.data().facts.find(function(f){return f.id===id;})||ctx.state().items[id]||ctx.data().sources.find(function(s){return s.id===id;});}).filter(Boolean);
      if(sources.length)html+='<div class="guided-review-evidence"><span>'+e(bi('回看相关依据','Revisit supporting material'))+'</span>'+sources.map(function(row){var isFact=ctx.data().facts.some(function(f){return f.id===row.id;}),word=window.FieldnotesMaterials.text(row,row.text!==undefined?'text':'title',ctx.locale());var link=ctx.state().relations.find(function(r){return r.from===row.id&&r.to===it.id;});return '<div><p>'+e(word||text(row))+'</p>'+(link&&link.why?'<p class="guided-review-link-reason">'+e(bi('关联理由：','Relevance: ')+link.why)+'</p>':'')+(isFact?'<button class="button quiet small" data-action="materials" data-tab="facts" data-id="'+e(row.id)+'">'+e(bi('核对原文与出处','Check source wording'))+'</button>':'')+'</div>';}).join('')+'</div>';
      if(it.type==='A'&&!sources.length)html+='<p class="guided-review-missing">'+e(bi('这条假设还没有选择依据，值得回到第 4 步核对。','This assumption has no selected references. Revisit step 4.'))+'</p>';
      return html;
    }
    function render(){
      var list=sync(),all=records(),counts={pending:0,kept:0,revise:0,discussion:0};all.forEach(function(it){counts[kind(it)]++;});
      var intro='<section class="guided-review-intro"><div><h3>'+e(bi('先选择一个部分','Choose one section'))+'</h3><p>'+e(bi('核对依据，再决定保留、修改或留给小组讨论。','Check its basis, then keep, revise or discuss it.'))+'</p></div><span>'+counts.kept+' / '+all.length+' '+e(bi('已确认保留','confirmed to keep'))+'</span></section>';
      if(!all.length)return intro+'<div class="empty-state"><h3>'+e(bi('先有记录，才能回顾','Write before reviewing'))+'</h3><p>'+e(bi('回到前六步，写下问题和分析后再开始。','Start by writing questions and analysis in the first six steps.'))+'</p><button class="button primary" data-action="navigate" data-step="1">'+e(bi('回到第 1 步','Go to step 1'))+'</button></div>';
      if(!part)return intro+'<div class="review-parts">'+['Q','M','A','C','PA'].map(function(k){var group=all.filter(function(row){return row.type===k;}),pending=group.filter(function(row){return kind(row)==='pending';}).length;return '<button type="button" data-review-action="part" data-part="'+k+'" '+(!group.length?'disabled':'')+'><strong>'+e(type({type:k}))+'</strong><span>'+pending+' '+e(bi('条待复核','to review'))+' / '+group.length+'</span></button>';}).join('')+'</div>';
      var partHeader='<div class="review-part-header">'+btn(bi('返回各部分','Back to sections'),'parts')+'<strong>'+e(type({type:part}))+'</strong><span>'+e(bi('一次处理一条','One record at a time'))+'</span></div>';
      var filters='<div class="guided-review-filters" role="group" aria-label="'+e(bi('筛选复核记录','Filter review records'))+'">'+['pending','revise','discussion','kept','all'].map(function(k){return btn((k==='all'?bi('全部','All'):label(k))+' '+(k==='all'?all.length:counts[k]),'filter','data-filter="'+k+'" aria-pressed="'+(filter===k)+'"',filter===k?'small is-selected':'small quiet');}).join('')+'</div>';
      var side='<nav class="guided-review-queue" aria-label="'+e(bi('待复核记录','Review queue'))+'">'+list.map(function(it){return '<button type="button" data-review-action="select" data-id="'+e(it.id)+'" aria-current="'+(it.id===selected?'true':'false')+'" class="guided-review-row '+(it.id===selected?'selected':'')+'"><span>'+e(type(it))+' · '+String(it.step).padStart(2,'0')+'</span><strong>'+e(text(it))+'</strong><small>'+e(label(kind(it)))+'</small></button>';}).join('')+'</nav>';
      var it=list.find(function(row){return row.id===selected;});
      if(!it)return partHeader+'<div class="guided-review-clear"><h3>'+e(bi('这一组已经看完','Nothing left in this group'))+'</h3><p>'+e(bi('可以查看其他记录，或回到需要修改的步骤。处理完成不代表判断已被验证。','Open another group or revisit a step that needs revision. Reviewing does not validate a judgment.'))+'</p>'+btn(bi('返回部分选择','Back to sections'),'parts','','primary')+btn(bi('查看本部分全部记录','View this section'),'filter','data-filter="all"')+'</div>';
      var d=draft(it),choices=[['checked',bi('保留','Keep')],['revise',bi('需要修改','Revise')],['discussion',bi('待讨论','Discuss')]];
      var contextHtml=context(it);
      var card='<article class="guided-review-card" id="entry-'+e(it.id)+'"><div class="guided-review-card-head"><span>'+e(type(it))+' · '+e(it.id)+'</span><button class="button quiet small" data-action="navigate" data-step="'+it.step+'" data-id="'+e(it.id)+'">'+e(bi('回到原步骤修改','Edit in original step'))+'</button></div><h3>'+e(text(it))+'</h3>';
      card+='<div class="review-stage-track">'+['read','decide','reason'].map(function(stage,i){return '<span class="'+(phase===stage?'active':'')+'">'+(i+1)+' · '+e([bi('回看记录','Read'),bi('选择处理','Decide'),bi('记录原因','Explain')][i])+'</span>';}).join('')+'</div>';
      if(phase==='read')card+=(contextHtml?'<details class="review-context-details"><summary>'+e(bi('展开上下文与依据','Show context & evidence'))+'</summary>'+contextHtml+'</details>':'')+'<div class="guided-review-lens"><p>'+e(prompt(it))+'</p>'+btn(bi('换个检查角度','Another review angle'),'angle')+'</div>'+(!ctx.readonly()?btn(bi('下一步：选择处理方式','Next: decide'),'next','','primary'):'');
      if(ctx.readonly())card+='<div class="guided-review-readonly"><strong>'+e(label(kind(it)))+'</strong><p>'+e(it.review&&it.review.note||bi('还没有复核原因','No review reason recorded.'))+'</p></div>';
      else if(phase==='decide')card+='<fieldset class="guided-review-decisions"><legend>'+e(bi('你打算如何处理？','How will you handle this?'))+'</legend>'+choices.map(function(choice){return btn(choice[1],'choice','data-choice="'+choice[0]+'" aria-pressed="'+(d.choice===choice[0])+'"','review-choice '+(d.choice===choice[0]?'selected':'')+' choice-'+choice[0]);}).join('')+'</fieldset>'+btn(bi('返回查看记录','Back to record'),'back-read');
      else if(phase==='reason')card+='<div class="review-chosen">'+e(label(d.choice==='checked'?'kept':d.choice==='discussion'?'discussion':'revise'))+' '+btn(bi('更换决定','Change decision'),'back-decide')+'</div><label class="field" for="review-reason"><span>'+e(bi('为什么？准备修改或讨论什么？','Why? What should change or be discussed?'))+'</span><textarea id="review-reason" data-review-note="'+e(it.id)+'" rows="2" placeholder="'+e(bi('保留可不填；修改或待讨论时，请留下具体原因。','Optional for Keep; explain what needs revision or discussion.'))+'">'+e(d.note)+'</textarea></label><p id="review-feedback" role="status"></p><div class="guided-review-save">'+btn(bi('保存并看下一条','Save & review next'),'save','data-id="'+e(it.id)+'"','primary')+'<small>'+e(bi('只记录你的决定，不改写原分析。','Records your decision without rewriting the analysis.'))+'</small></div>';
      card+='</article>';
      var carrier=all[0],CT=window.FieldnotesCaseText,checklist='<details id="review-guidance" class="analysis-extra guided-review-checklist"><summary>'+e(bi('小组偏见检查清单','Team bias checklist'))+'</summary><fieldset>'+ctx.data().biasChecks.map(function(check,i){var lab=CT?CT().biasLabel(check,ctx.locale()):(ctx.locale()==='en'?window.FieldnotesI18n.biasLabels[i]:check.label);return '<label class="check"><input type="checkbox" data-checklist="'+e(carrier.id)+'" value="'+e(check.id)+'" '+((carrier.checkedIds||[]).includes(check.id)?'checked':'')+' '+(ctx.readonly()?'disabled':'')+'>'+e(lab)+'</label>';}).join('')+'</fieldset></details>';
      return partHeader+'<div class="review-progressive">'+card+'</div><details id="review-record-picker" class="review-record-picker"><summary>'+e(bi('切换记录或查看已处理记录','Switch record or view processed records'))+'</summary>'+filters+side+'</details>'+checklist;
    }
    function input(event){if(event.target.dataset.reviewNote){var it=ctx.state().items[event.target.dataset.reviewNote];if(it&&!ctx.readonly())draft(it).note=event.target.value;}}
    function focusCurrent(){
      requestAnimationFrame(function(){
        var card=document.querySelector('.guided-review-card,.guided-review-clear,.guided-review-intro');
        if(!card)return;
        var banner=document.querySelector('[data-demo-banner]'),offset=banner?banner.getBoundingClientRect().height:0;
        card.tabIndex=-1;card.focus({preventScroll:true});
        window.scrollTo({top:Math.max(0,window.scrollY+card.getBoundingClientRect().top-offset-16),behavior:'auto'});
      });
    }
    function redraw(){ctx.render();focusCurrent();}
    function click(event){var el=event.target.closest('[data-review-action]');if(!el)return false;event.preventDefault();var action=el.dataset.reviewAction;
      if(action==='parts'){part=null;selected=null;phase='read';redraw();return true;}
      if(action==='part'){part=el.dataset.part;filter='pending';selected=null;phase='read';redraw();return true;}
      if(action==='next'){phase='decide';redraw();return true;}
      if(action==='back-read'){phase='read';redraw();return true;}
      if(action==='back-decide'){phase='decide';redraw();return true;}
      if(action==='filter'){filter=el.dataset.filter;selected=null;phase='read';redraw();}
      if(action==='select'){selected=el.dataset.id;angle=0;phase='read';redraw();}
      if(action==='angle'){angle++;redraw();}
      if(ctx.readonly())return true;
      var it=ctx.state().items[selected];if(!it)return true;var d=draft(it);
      if(action==='choice'){d.choice=el.dataset.choice;phase='reason';redraw();}
      if(action==='save'){
        var error=!d.choice?bi('先选择一种处理方式。','Choose a review decision first.'):d.choice!=='checked'&&!d.note.trim()?bi('请记录需要修改或讨论的具体原因。','Explain what needs revision or discussion.'):'';
        if(error){document.getElementById('review-feedback').textContent=error;if(d.choice)document.getElementById('review-reason').focus();return true;}
        var list=queue(),index=list.findIndex(function(row){return row.id===it.id;});selected=list[index+1]?list[index+1].id:null;
        var fields={review:{status:d.choice==='discussion'?'unseen':d.choice,note:d.note.trim()}};
        if(d.choice==='checked'){fields.needsReview=false;fields.staleReason='';}
        delete drafts[it.id];phase='read';ctx.dispatch('UPDATE_ITEM',{id:it.id,fields:fields});ctx.dispatch('SET_STATUS',{step:7,status:'draft'});
        if(d.choice==='revise')ctx.dispatch('SET_STATUS',{step:it.step,status:'stale'});
        ctx.toast(bi('已保存复核决定','Review decision saved'));focusCurrent();
      }
      return true;
    }
    return {render:render,input:input,click:click};
  }
  window.FieldnotesReview={create:create};
})();
