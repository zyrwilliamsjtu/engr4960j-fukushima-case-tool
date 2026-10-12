/* Case preparation holds files as sources, never as automatically accepted facts. */
(function(){'use strict';
 function create(ctx){
  var mode=null,title='',brief='',files=[],busy=false,error='';
  function bi(a,b){return ctx.locale()==='en'?b:a;}function e(x){return ctx.escape(x);}
  function render(existing){if(mode===null||(window.__FN_DEMO_PACK&&existing))mode=existing?'existing':'new';
   return '<section class="intake-board"><div class="intake-tabs"><button type="button" data-intake="new" aria-pressed="'+(mode==='new')+'">'+e(bi('准备新案例','New case'))+'</button><button type="button" data-intake="existing" aria-pressed="'+(mode==='existing')+'">'+e(bi('已有案例','Existing cases'))+'</button></div>'+(mode==='existing'?ctx.existing():
    '<form id="intake-form"><div class="intake-heading"><span class="intake-step">01</span><div><h2>'+e(bi('先把案例放到桌面上','Bring your case to the table'))+'</h2><p>'+e(bi('写下背景，或带上你的小组材料。','Add context or bring your group’s source files.'))+'</p></div></div><label class="field"><span>'+e(bi('案例名称','Case name'))+'</span><input id="intake-title" data-intake-field="title" maxlength="180" value="'+e(title)+'" placeholder="'+e(bi('例如：自动驾驶事故中的责任分配','e.g. Responsibility in an autonomous driving accident'))+'"></label><label class="field"><span>'+e(bi('背景与讨论范围','Context & scope'))+' <small>'+e(bi('可选','Optional'))+'</small></span><textarea id="intake-brief" data-intake-field="brief" rows="3" maxlength="30000" placeholder="'+e(bi('发生了什么？涉及哪些人？你想讨论什么？','What happened? Who is affected? What do you want to explore?'))+'">'+e(brief)+'</textarea></label><label class="intake-drop" data-intake-drop><input id="intake-files" type="file" multiple accept=".txt,.md,.csv,.json,.pdf,.png,.jpg,.jpeg,.webp"><span class="intake-upload-icon">↥</span><strong>'+e(bi('拖入材料，或点击选择','Drop files here, or browse'))+'</strong><span>PDF · TXT · MD · CSV · JSON · PNG · JPG · WEBP</span><small>'+e(bi('本地保存 · 合计最多 2 MB','Saved locally · Up to 2 MB in total'))+'</small></label><div class="intake-files">'+files.map(function(f){return '<div><span class="intake-file-type">'+e(f.kind.toUpperCase())+'</span><span>'+e(f.name)+'<small>'+Math.ceil(f.size/1024)+' KB</small></span><button type="button" data-intake="remove" data-id="'+e(f.id)+'" aria-label="'+e(bi('移除 ','Remove ')+f.name)+'">×</button></div>';}).join('')+'</div><p id="intake-feedback" role="status">'+e(error||(busy?bi('正在读取材料…','Reading files…'):''))+'</p><div class="intake-bottom"><p>'+e(bi('材料会跟随十步分析，判断由你来写。','Your materials follow all ten steps. The judgment is yours.'))+'</p><button type="submit" class="button primary home-primary" '+(busy?'disabled':'')+'>'+e(bi('开始分析','Start analysis'))+' →</button></div></form>')+'</section>';
  }
  async function load(input){if(busy)return;error='';var incoming=Array.from(input);if(!incoming.length)return;var total=files.reduce(function(n,f){return n+f.size;},0)+incoming.reduce(function(n,f){return n+f.size;},0);
   if(total>2*1024*1024||files.length+incoming.length>20){error=bi('最多 20 个文件，合计不超过 2 MB。请选择较小的文件或粘贴相关片段。','Choose up to 20 files, totaling 2 MB. Use smaller files or paste relevant excerpts.');ctx.render();return;}
   busy=true;ctx.render();var added=[];
   try{for(var file of incoming){var ext=file.name.split('.').pop().toLowerCase(),kind=/^(txt|md|csv|json)$/.test(ext)?'text':ext==='pdf'?'pdf':/^(png|jpg|jpeg|webp)$/.test(ext)?'image':'';if(!kind)throw new Error(bi('不支持此文件格式：','Unsupported file: ')+file.name);
    var doc={id:'material-'+Date.now().toString(36)+'-'+added.length,name:file.name,size:file.size,kind:kind};
    if(kind==='text')doc.text=await file.text();else doc.dataUrl=await new Promise(function(resolve,reject){var reader=new FileReader();reader.onload=function(){resolve(reader.result);};reader.onerror=function(){reject(new Error(bi('文件读取失败','File could not be read')));};reader.readAsDataURL(file);});
    if(doc.dataUrl&&!/^data:(application\/pdf|image\/(png|jpeg|webp));base64,/.test(doc.dataUrl))throw new Error(bi('文件类型不匹配：','File type does not match: ')+file.name);added.push(doc);}
    files=files.concat(added);
   }catch(err){error=err.message;}finally{busy=false;ctx.render();}
  }
  function click(event){if(event.target.closest('[data-lang]'))error='';var el=event.target.closest('[data-intake]');if(!el)return false;event.preventDefault();if(el.dataset.intake==='remove')files=files.filter(function(f){return f.id!==el.dataset.id;});else mode=el.dataset.intake;error='';ctx.render();return true;}
  function input(event){var k=event.target.dataset.intakeField;if(k==='title')title=event.target.value;if(k==='brief')brief=event.target.value;}
  function submit(event){if(event.target.id!=='intake-form')return false;event.preventDefault();if(busy)return true;var name=title.trim()||(files[0]&&files[0].name.replace(/\.[^.]+$/,''));if(!name){error=bi('请输入案例名称，或先添加材料文件。','Enter a case name or add a source file first.');ctx.render();document.getElementById('intake-title').focus();return true;}ctx.start(name,{brief:brief,files:files});title='';brief='';files=[];mode='existing';return true;}
  document.addEventListener('change',function(ev){if(ev.target.id==='intake-files')load(ev.target.files);});
  document.addEventListener('dragover',function(ev){var zone=ev.target.closest('[data-intake-drop]');if(zone){ev.preventDefault();zone.classList.add('dragging');}});
  document.addEventListener('dragleave',function(ev){var zone=ev.target.closest('[data-intake-drop]');if(zone&&!zone.contains(ev.relatedTarget))zone.classList.remove('dragging');});
  document.addEventListener('drop',function(ev){var zone=ev.target.closest('[data-intake-drop]');if(zone){ev.preventDefault();load(ev.dataTransfer.files);}});
  return {render:render,click:click,input:input,submit:submit};
 }
 window.FieldnotesIntake={create:create};
})();
