/**
 * Replaceable UI preview adapter, not the PI-owned production logic layer.
 * Install window.CASE_RUNTIME before workbench.js to replace this implementation.
 * Persists in a separate key; public state keeps CONTRACT v2 root fields.
 */
(function () {
  'use strict';
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function now() { return new Date().toISOString(); }
  function blank(caseId) {
    var status = {}; for (var i=1;i<=10;i++) status[i]='todo';
    return { stateVersion:'2.0', caseId:caseId || 'fukushima', currentStep:1, startedAt:now(), updatedAt:now(),
      authorship:{notes:[],reservations:[]}, stepStatus:status, items:{}, relations:[], conflicts:[], snapshots:[], hasAcceptedL3:{} };
  }
  function create(data, options) {
    options = options || {};
    var caseId=data.meta.id, key=options.key || 'engr4960j.frontend.preview.v2', state=blank(caseId), listeners=[], saving='saved', timer, lastId=Date.now();
    var recovery=null, persistent=options.persistent!==false;
    var staticIds=new Set([].concat(data.facts,data.sources,data.principles,data.valueWords,data.constraints).map(function(x){return x.id;}));
    function validateProject(input) {
      var errors=[];
      function record(s, nested) {
        if (!s || typeof s!=='object' || Array.isArray(s)) { errors.push('structure'); return; }
        if (!s.items || typeof s.items!=='object' || Array.isArray(s.items) || !Array.isArray(s.relations) || !Array.isArray(s.conflicts)) { errors.push('structure'); return; }
        var ids=new Set(staticIds), collectionIds=new Set(), allowed=['Q','M','A','C','PA','RC','R','AV'];
        Object.keys(s.items).forEach(function(id){
          var it=s.items[id];
          if (!it || it.id!==id || allowed.indexOf(it.type)<0 || !Number.isInteger(it.step) || it.step<1 || it.step>10 || !new RegExp('^'+it.type+'-'+it.step+'-[0-9]+$').test(id) || typeof it.createdAt!=='string') errors.push('item');
          else ids.add(id);
          if(it){
            ['text','word','others','othersView','mine','myUsage','focusReason','reason','alternatives','mitigationJudgment'].forEach(function(k){if(it[k]!==undefined&&typeof it[k]!=='string')errors.push('field');});
            ['actors','checkedIds'].forEach(function(k){if(it[k]!==undefined&&(!Array.isArray(it[k])||it[k].some(function(v){return typeof v!=='string';})))errors.push('field');});
            if(it.isCore!==undefined&&typeof it.isCore!=='boolean')errors.push('field');
            if(it.order!==undefined&&(!Number.isFinite(it.order)||it.order<1))errors.push('field');
            if(it.review&&(!['unseen','checked','revise'].includes(it.review.status)||typeof it.review.note!=='string'))errors.push('field');
          }
        });
        s.relations.forEach(function(r){
          if (!r || typeof r.id!=='string' || collectionIds.has(r.id) || !ids.has(r.from) || !ids.has(r.to) || typeof r.why!=='string' || !['fact-supports-question','assumption-fills-gap','principle-applies-to','resolution-answers-question','review-targets-item'].includes(r.kind)) errors.push('relation');
          else collectionIds.add(r.id);
        });
        Object.values(s.items).forEach(function(it){
          if (!it) return;
          ['basisRefs','appliesTo','selectedIds'].forEach(function(field){
            if (it[field]!==undefined && (!Array.isArray(it[field]) || it[field].some(function(id){return !ids.has(id); }))) errors.push('reference');
          });
          if (it.principleId && !data.principles.some(function(p){return p.id===it.principleId;})) errors.push('principle');
        });
        s.conflicts.forEach(function(c){ if (!c || typeof c.id!=='string' || collectionIds.has(c.id) || !ids.has(c.questionId) || !ids.has(c.principleA) || !ids.has(c.principleB) || c.principleA===c.principleB || !['case','general'].includes(c.scope) || ['supportsA','supportsB','priority','reason'].some(function(k){return typeof c[k]!=='string';})) errors.push('conflict');else collectionIds.add(c.id); });
        if (!nested && Array.isArray(s.snapshots)) {var slots=new Set();s.snapshots.forEach(function(sn){ if (!sn || !sn.payload || !['SN-01','SN-02'].includes(sn.id) || slots.has(sn.id) || typeof sn.createdAt!=='string') errors.push('snapshot'); else {slots.add(sn.id);record(sn.payload,true);} });}
      }
      if (!input || input.caseId!==caseId || input.stateVersion!=='2.0') errors.push('version');
      else {
        if (!Number.isInteger(input.currentStep) || input.currentStep<1 || input.currentStep>10 || !input.authorship || !Array.isArray(input.authorship.notes) || !Array.isArray(input.authorship.reservations) || !input.stepStatus || !Array.isArray(input.snapshots) || input.snapshots.length>2 || !input.hasAcceptedL3 || typeof input.startedAt!=='string' || typeof input.updatedAt!=='string') errors.push('structure');
        for(var step=1;step<=10;step++)if(['todo','draft','discuss','checked','stale'].indexOf((input.stepStatus||{})[step])<0)errors.push('status');
        if(input.authorship&&['notes','reservations'].some(function(k){return !Array.isArray(input.authorship[k])||input.authorship[k].some(function(v){return typeof v!=='string';});}))errors.push('authorship');
        record(input,false);
      }
      return Array.from(new Set(errors));
    }
    if (options.state) state=clone(options.state);
    else if (persistent) {
      try { var raw=localStorage.getItem(key); if(raw){var loaded=JSON.parse(raw);if(validateProject(loaded).length===0) state=loaded;else{recovery=raw;saving='memory';persistent=false;}} }
      catch(e){saving='memory';persistent=false;}
    }
    function notify() { listeners.slice().forEach(function(fn){fn(clone(state));}); }
    function persist() {
      if (!persistent) { saving='memory'; return; }
      try { localStorage.setItem(key,JSON.stringify(state)); saving='saved'; }
      catch(e) { saving='memory'; }
    }
    function change() { state.updatedAt=now(); saving=persistent?'saving':'memory'; clearTimeout(timer); timer=setTimeout(function(){persist();notify();},800); notify(); }
    function newId(type,step) {
      lastId=Math.max(Date.now(),lastId+1);
      // Timestamp-derived monotonically increasing sequence avoids recycling deleted IDs.
      return type==='REL' ? 'REL-'+lastId : type+'-'+step+'-'+lastId;
    }
    function related(id) {
      var result=new Set();
      var visit=function(target){
        state.relations.forEach(function(r){ var dependent=r.kind==='resolution-answers-question'||r.kind==='review-targets-item'?r.to===target?r.from:null:r.from===target?r.to:null;if(dependent&&!result.has(dependent)){result.add(dependent);visit(dependent);} });
        Object.values(state.items).forEach(function(it){ if([].concat(it.basisRefs||[],it.appliesTo||[]).indexOf(target)>=0&&!result.has(it.id)){result.add(it.id);visit(it.id);} });
      }; visit(id); result.delete(id); return Array.from(result);
    }
    function markAffected(id) {
      related(id).forEach(function(ref){ var it=state.items[ref]; if(it) state.stepStatus[it.step]='stale'; });
      state.conflicts.forEach(function(c){if([c.questionId,c.principleA,c.principleB].indexOf(id)>=0)state.stepStatus[6]='stale';});
      var it=state.items[id];
      if(it && it.type==='Q'){ [2,3,4,6,7,8,9,10].forEach(function(step){ if(state.stepStatus[step]!=='todo')state.stepStatus[step]='stale'; }); }
    }
    function addRelation(from,to,kind,why) {
      var r=state.relations.find(function(x){return x.from===from&&x.to===to&&x.kind===kind;});
      if(r)r.why=why;else state.relations.push({id:newId('REL'),kind:kind,from:from,to:to,why:why,createdAt:now()});
    }
    function dispatch(action) {
      var p=action.payload||{}, it, ids;
      switch(action.type) {
        case 'NAVIGATE': state.currentStep=Math.max(1,Math.min(10,Number(p.step))); break;
        case 'ADD_ITEM':
          it=Object.assign({id:newId(p.type,p.step),type:p.type,step:p.step,createdAt:now(),updatedAt:now(),text:''},p.fields||{});
          state.items[it.id]=it; state.stepStatus[p.step]='draft'; break;
        case 'UPDATE_ITEM':
          it=state.items[p.id]; if(!it) return;
          var reviewOnly=Object.keys(p.fields).every(function(k){return k==='review';});
          if(!reviewOnly)markAffected(p.id);
          Object.assign(it,p.fields,{updatedAt:now()});
          if(p.fields.others!==undefined)delete it.othersView;
          if(p.fields.mine!==undefined)delete it.myUsage;
          if(p.fields.appliesTo){state.relations=state.relations.filter(function(r){return !(r.from===p.id&&r.kind==='principle-applies-to');});p.fields.appliesTo.forEach(function(target){addRelation(p.id,target,'principle-applies-to',it.text||'');});}
          if(it.type==='PA'&&p.fields.text!==undefined)state.relations.forEach(function(r){if(r.from===it.id&&r.kind==='principle-applies-to')r.why=it.text;});
          if(!reviewOnly && state.stepStatus[it.step]!=='stale')state.stepStatus[it.step]='draft';
          if(p.reason)state.authorship.notes.push(now()+' · '+p.id+' · '+p.reason);
          break;
        case 'DELETE_ITEM':
          it=state.items[p.id]; if(!it)return; markAffected(p.id);
          state.relations=state.relations.filter(function(r){return r.from!==p.id&&r.to!==p.id;});
          Object.values(state.items).forEach(function(x){ ['basisRefs','appliesTo','selectedIds'].forEach(function(k){if(Array.isArray(x[k]))x[k]=x[k].filter(function(id){return id!==p.id;});}); });
          state.conflicts=state.conflicts.filter(function(c){return [c.questionId,c.principleA,c.principleB].indexOf(p.id)<0;});
          delete state.items[p.id]; state.stepStatus[it.step]='draft'; break;
        case 'SET_STATUS': state.stepStatus[p.step]=p.status; break;
        case 'SET_CHECKLIST': it=state.items[p.id];if(it)it.checkedIds=p.ids;state.stepStatus[7]='draft';break;
        case 'LINK': markAffected(p.from);addRelation(p.from,p.to,p.kind,p.why);markAffected(p.to);break;
        case 'UNLINK': it=state.relations.find(function(r){return r.id===p.id;});if(it){markAffected(it.from);markAffected(it.to);}state.relations=state.relations.filter(function(r){return r.id!==p.id;}); break;
        case 'ADD_CONFLICT': state.conflicts.push(Object.assign({id:newId('CF',6)},p)); state.stepStatus[6]='draft'; break;
        case 'UPDATE_CONFLICT': it=state.conflicts.find(function(c){return c.id===p.id;}); if(it)Object.assign(it,p.fields);state.stepStatus[6]='draft';break;
        case 'DELETE_CONFLICT': state.conflicts=state.conflicts.filter(function(c){return c.id!==p.id;}); break;
        case 'ADD_NOTE': state.authorship[p.kind==='reservation'?'reservations':'notes'].push(p.text); break;
        case 'ACCEPT_L3': state.hasAcceptedL3[p.step]=true; break;
        case 'SET_BASIS':
          it=state.items[p.id]; if(!it)return; markAffected(p.id); it.basisRefs=p.refs;
          state.relations=state.relations.filter(function(r){return !(r.from===p.id&&r.kind==='assumption-fills-gap');});
          if(p.gap)addRelation(p.id,p.gap,'assumption-fills-gap',p.why);
          state.stepStatus[4]='draft'; break;
        case 'ANSWER':
          it=Object.values(state.items).find(function(x){return x.type==='R'&&state.relations.some(function(r){return r.from===x.id&&r.to===p.question;});});
          if(!it){it={id:newId('R',8),type:'R',step:8,text:'',createdAt:now()};state.items[it.id]=it;addRelation(it.id,p.question,'resolution-answers-question','');} break;
        case 'RESET': state=blank(caseId);break;
        default: throw new Error('Unknown UI action: '+action.type);
      }
      change(); return clone(state);
    }
    function validateStep(step) {
      var items=Object.values(state.items), rows=items.filter(function(x){return x.step===step;}), suggestions=[];
      function hint(key,id,source){suggestions.push({key:key,itemId:id||null,step:step,source:source||'team'});}
      if(step===1){if(rows.filter(function(x){return (x.text||'').trim();}).length<5)hint('questionsCount',null,'textbook');rows.forEach(function(x){if(x.text&&!/[?？]|是否|应该|应当|\b(should|ought|must|may)\b/i.test(x.text))hint('questionForm',x.id,'textbook');});}
      if(step===2){var core=items.filter(function(x){return x.type==='Q'&&x.isCore;});if(core.length!==2)hint('coreCount',null,'textbook');core.forEach(function(x){if(!(x.focusReason||'').trim())hint('focusBasis',x.id);});}
      if(step===3){if(rows.filter(function(x){return x.type==='M'&&x.text;}).length<2)hint('gapCount');['material','individual','organization'].forEach(function(cat){var count=state.relations.filter(function(r){var fact=data.facts.find(function(f){return f.id===r.from;});return r.kind==='fact-supports-question'&&fact&&fact.categories.indexOf(cat)>=0;}).length;if(count<2)hint('factCount:'+cat);});}
      if(step===4)rows.forEach(function(x){if(x.type==='A'&&(!(x.basisRefs||[]).length||!state.relations.some(function(r){return r.from===x.id&&r.kind==='assumption-fills-gap'&&r.why.trim();})))hint('assumptionBasis',x.id);});
      if(step===5){if(rows.length<2)hint('conceptCount');rows.forEach(function(x){if(!(x.others||x.othersView)||!(x.mine||x.myUsage))hint('conceptColumns',x.id);});}
      if(step===6){if(rows.filter(function(x){return x.type==='PA';}).length<3)hint('principleCount');state.conflicts.forEach(function(c){if(!c.reason||!c.supportsA||!c.supportsB||!c.priority)hint('conflictFields',c.id);});}
      if(step===7&&items.some(function(x){return x.step<7&&(!x.review||!x.review.status||x.review.status==='unseen');}))hint('reviewNeeded');
      if(step===8)items.filter(function(x){return x.type==='Q'&&x.isCore;}).forEach(function(q){var r=state.relations.find(function(x){return x.kind==='resolution-answers-question'&&x.to===q.id;});var answer=r&&state.items[r.from];if(!answer||!answer.text||!answer.reason)hint('answerNeeded',q.id,'textbook');});
      if(step===9){rows.forEach(function(x){if(!(x.checkedIds||[]).includes('none')&&(!x.text||!x.alternatives||!x.mitigationJudgment))hint('constraintFields',x.id);});if(rows.some(function(x){return(x.checkedIds||[]).includes('none');})&&rows.some(function(x){return!(x.checkedIds||[]).includes('none');}))hint('constraintContradiction');}
      if(step===10&&rows.filter(function(x){return x.text;}).length<3)hint('preventionCount',null,'textbook');
      if(!rows.length && step!==2 && step!==3)hint('emptyStep');
      state.relations.filter(function(r){return !r.why.trim()&&r.kind!=='resolution-answers-question';}).forEach(function(r){if(step===3||step===4)hint('linkWhy',r.id);});
      return {errors:[],suggestions:suggestions,anchors:suggestions.filter(function(x){return x.itemId;}).map(function(x){return {itemIds:[x.itemId]};})};
    }
    var engine={
      getState:function(){return clone(state);}, dispatch:dispatch, validateStep:validateStep,
      subscribe:function(fn){listeners.push(fn);return function(){listeners=listeners.filter(function(x){return x!==fn;});};},
      exportProject:function(){return JSON.stringify(state,null,2);},
      importProject:function(json){var input;try{input=typeof json==='string'?JSON.parse(json):clone(json);}catch(e){return{ok:false,errors:['json']};}var errors=validateProject(input);if(errors.length)return{ok:false,errors:errors};state=clone(input);change();return{ok:true,state:clone(state)};},
      createSnapshot:function(label){var id=label==='initial'?'SN-01':'SN-02',sn={id:id,label:label,createdAt:now(),payload:clone({items:state.items,relations:state.relations,conflicts:state.conflicts})},index=state.snapshots.findIndex(function(x){return x.id===id;});if(index<0)state.snapshots.push(sn);else state.snapshots[index]=sn;state.snapshots.sort(function(a,b){return a.id.localeCompare(b.id);});change();return id;},
      restoreSnapshot:function(id){var sn=state.snapshots.find(function(x){return x.id===id;});if(!sn)return;state.items=clone(sn.payload.items);state.relations=clone(sn.payload.relations);state.conflicts=clone(sn.payload.conflicts);for(var i=1;i<=10;i++)state.stepStatus[i]='stale';change();},
      getSaveStatus:function(){return saving;}, flush:function(){clearTimeout(timer);persist();}, affected:related,
      recoveryData:function(){return recovery;}, isPreview:true
    };
    persist();
    return engine;
  }
  window.FrontendPreviewRuntime={create:create,blank:blank};
})();
