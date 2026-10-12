/* Display translation and guided-review regression with fictional authored records. */
const {chromium}=require(process.env.FIELDNOTES_PLAYWRIGHT||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FIELDNOTES_BROWSER});
 try{
  const root=path.resolve(__dirname,'../../..'),page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.join(root,process.env.FIELDNOTES_HTML||'dist/index.html')).href+'#workbench');
  await page.locator('[data-lang="en"]').first().click();
  const get=()=>page.evaluate(()=>FIELDNOTES.getEngine().getState());
  const sourceBefore=await page.evaluate(()=>JSON.stringify(CASE_DATA));
  await page.locator('.top-actions [data-action="materials"]').click();
  for(const tab of ['facts','principles','timeline','sources','glossary']){
   await page.locator('[data-lib="tab"][data-tab="'+tab+'"]').click();
   let again=true;
   while(again){
    const ids=await page.locator('.library-row').evaluateAll(els=>els.map(e=>e.dataset.id));
    for(const id of ids){await page.locator('.library-row[data-id="'+id+'"]').click();
     const copy=await page.locator('.library-shell').innerText();assert.ok(!/[\p{Script=Han}]/u.test(copy),tab+' '+id+': '+copy);
    }
    again=!(await page.locator('#library-page-next').isDisabled());if(again)await page.locator('#library-page-next').click();
   }
  }
  await page.locator('[data-lib="tab"][data-tab="facts"]').click();
  await page.locator('#library-search').fill('transmission');assert.ok(await page.locator('.library-row').count()>0,'Search matches translated text.');
  await page.locator('[data-lib="original"]').click();assert.ok(/[\p{Script=Han}]/u.test(await page.locator('.library-reading').innerText()));
  await page.locator('[data-lib="original"]').click();assert.ok(!/[\p{Script=Han}]/u.test(await page.locator('.library-reading').innerText()));
  await page.locator('#library-search').fill('输电');assert.ok(await page.locator('.library-row').count()>0,'Search also matches original Chinese.');
  await page.locator('[data-lib="close"]').click();
  assert.equal(await page.evaluate(()=>JSON.stringify(CASE_DATA)),sourceBefore,'Display translation never mutates CASE_DATA.');
  const ids=await page.evaluate(()=>{const e=FIELDNOTES.getEngine();const add=(type,step,fields)=>{e.dispatch({type:'ADD_ITEM',payload:{type,step,fields}});return Object.values(e.getState().items).filter(i=>i.type===type).at(-1).id;};
   const q=add('Q',1,{text:'Fictional QA: should a team disclose uncertainty?',isCore:true});
   const m=add('M',3,{text:'Fictional QA: a missing test record.'});
   const a=add('A',4,{text:'Fictional QA: a provisional assumption.',basisRefs:['f-mat-001']});
   const c=add('C',5,{word:'QA responsibility',others:'Fictional legal meaning.',mine:'Fictional team meaning.'});
   const p=add('PA',6,{principleId:'p-basic-1',text:'Fictional applicability reason.',appliesTo:[q],order:1});
   e.dispatch({type:'LINK',payload:{from:'f-mat-001',to:q,kind:'fact-supports-question',why:'Fictional QA relevance.'}});
   e.createSnapshot('Initial QA');return {q,m,a,c,p};});
  await page.locator('#nav-step-7').click();
  assert.equal(await page.locator('.review-parts>button').count(),5);assert.equal(await page.locator('.guided-review-card').count(),0);
  await page.locator('[data-review-action="part"][data-part="Q"]').click();
  assert.equal(await page.locator('#review-reason').count(),0);assert.equal(await page.locator('[data-review-action="choice"]').count(),0);
  const before=await get(),snap=JSON.stringify(before.snapshots),texts=Object.fromEntries(Object.entries(before.items).map(([id,it])=>[id,it.text||it.word]));
  const choose=async x=>{if(!await page.locator('[data-review-action="choice"]').count())await page.locator('[data-review-action="next"]').click();await page.locator('[data-review-action="choice"][data-choice="'+x+'"]').click();};
  const select=async id=>{const kind=(await get()).items[id].type;await page.locator('[data-review-action="parts"]').first().click();await page.locator('[data-review-action="part"][data-part="'+kind+'"]').click();if(await page.locator('.guided-review-clear').count())await page.locator('[data-review-action="filter"][data-filter="all"]').click();};
  const save=()=>page.locator('[data-review-action="save"]').click();
  const out=process.env.FIELDNOTES_QA_DIR&&path.join(root,'docs/ai-logs',process.env.FIELDNOTES_QA_DIR);if(out){fs.mkdirSync(out,{recursive:true});await page.locator('.review-progressive').screenshot({path:path.join(out,'review-en.png')});}
  await page.locator('[data-review-action="angle"]').click();assert.equal(JSON.stringify(await get()),JSON.stringify(before),'Changing angle does not save analysis.');
  await page.locator('[data-review-action="next"]').click();assert.equal(await page.locator('#review-reason').count(),0);assert.equal(await page.locator('.guided-review-lens').count(),0);
  await choose('revise');await save();assert.ok((await page.locator('#review-feedback').innerText()).includes('Explain'));
  await page.locator('#review-reason').fill('Fictional QA: separate two actions.');await select(ids.a);await select(ids.q);await choose('revise');assert.equal(await page.locator('#review-reason').inputValue(),'Fictional QA: separate two actions.','Draft reason survives record selection.');
  await save();assert.equal((await get()).items[ids.q].review.status,'revise');assert.equal((await get()).stepStatus[1],'stale');
  assert.ok(await page.locator('.guided-review-clear').count(),'Completed section does not dump the next section.');await select(ids.m);
  await choose('discussion');await page.locator('#review-reason').fill('Fictional QA: ask a teammate about this gap.');await save();
  assert.equal((await get()).items[ids.m].review.status,'unseen');assert.ok((await get()).items[ids.m].review.note.includes('teammate'));
  await select(ids.a);await choose('checked');await save();assert.equal((await get()).items[ids.a].review.status,'checked');
  await select(ids.m);await page.locator('#review-record-picker > summary').click();await page.locator('[data-review-action="filter"][data-filter="discussion"]').click();assert.equal(await page.locator('.guided-review-row').count(),1);await choose('discussion');
  await page.locator('[data-lang="zh"]').first().click();assert.ok((await page.locator('.review-chosen').innerText()).includes('待讨论'));
  await page.locator('[data-lang="en"]').first().click();assert.ok(!/[\p{Script=Han}]/u.test(await page.locator('.review-progressive').innerText()));
  const after=await get();assert.equal(JSON.stringify(after.snapshots),snap);assert.deepEqual(Object.fromEntries(Object.entries(after.items).map(([id,it])=>[id,it.text||it.word])),texts,'Review never rewrites original analysis.');
  await page.evaluate(()=>FIELDNOTES.getEngine().flush());await page.reload();await page.locator('#nav-step-7').click();assert.equal((await get()).items[ids.q].review.status,'revise');assert.equal((await get()).items[ids.m].review.note,after.items[ids.m].review.note);await page.locator('[data-review-action="part"][data-part="C"]').click();
  for(const width of [1440,816,390,320]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Review fits '+width);}
  if(out)await page.locator('.review-progressive').screenshot({path:path.join(out,'review-mobile.png')});
  const readonlyBefore=JSON.stringify(await get());await page.locator('[data-action="present"]').click();assert.equal(await page.locator('[data-review-action="save"]').count(),0);assert.equal(await page.locator('[data-action="review-step"]').count(),0);assert.equal(JSON.stringify(await get()),readonlyBefore,'Presentation mode cannot save review status.');
  assert.deepEqual(errors,[]);
  console.log('PASS: all library records English, bilingual search, original toggle, immutable materials; guided Keep/Revise/Discuss, required reasons, draft preservation, next record, filters, stale marker, reload, snapshots, original text, four widths and read-only presentation.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
