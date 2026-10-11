/* Browser regression checks for source navigation and deliberate evidence use. */
const {chromium}=require(process.env.FIELDNOTES_PLAYWRIGHT || 'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../../..');
const shots=process.env.FIELDNOTES_QA_DIR&&path.join(root,'docs/ai-logs',process.env.FIELDNOTES_QA_DIR);
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FIELDNOTES_BROWSER});
 try {
  const context=await browser.newContext({offline:true,viewport:{width:1440,height:1000}});
  const page=await context.newPage(), errors=[], requests=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});
  await page.goto(pathToFileURL(path.join(root,process.env.FIELDNOTES_HTML||'preview.html')).href);
  const lib=a=>page.locator('[data-lib="'+a+'"]').first();
  const get=()=>page.evaluate(()=>window.FIELDNOTES.getEngine().getState());
  const open=()=>page.locator('.top-actions [data-action="materials"]').click();
  const tab=k=>page.locator('[data-lib="tab"][data-tab="'+k+'"]').click();
  const row=id=>page.locator('[data-lib="select"][data-id="'+id+'"]');
  await page.evaluate(()=>window.FIELDNOTES.getEngine().dispatch({type:'RESET'}));
  await open();assert.equal(await page.locator('.library-fact').count(),50);
  assert.equal(await page.locator('#library-link-form').count(),0);
  await page.locator('.library-relevance [data-lib="navigate"]').click();
  assert.equal((await get()).currentStep,1,'Empty analysis has a direct route to write a question.');
  await page.locator('[data-action="add"]').first().click();
  await page.locator('textarea[data-field="text"]').fill('工程团队是否应公开尚未确认的安全信息？（界面测试）');
  await page.locator('.workspace-heading [data-action="add"]').click();
  await page.locator('textarea[data-field="text"]').last().fill('哪些组织决策值得进一步调查？（界面测试）');
  const qs=Object.values((await get()).items).filter(x=>x.type==='Q');
  await open();
  const search=page.locator('#library-search');
  // A quotation search remains useful when the summary is in another language.
  await search.fill('Plant status');assert.ok(await page.locator('.library-fact').count()>0);
  assert.ok((await page.locator('.library-provenance').innerText()).includes('Plant status'));
  assert.equal(await search.evaluate(el=>document.activeElement===el),true,'Typing keeps focus.');
  await search.fill('xxxxxxxx-no-record');assert.equal(await page.locator('.library-fact').count(),0);
  assert.ok(await page.locator('.library-no-results').isVisible());await lib('clear').click();
  // Composition must keep the input node attached until committed.
  await search.evaluate(el=>{el.dispatchEvent(new CompositionEvent('compositionstart',{bubbles:true}));el.value='安全';el.dispatchEvent(new InputEvent('input',{bubbles:true,isComposing:true}));if(!el.isConnected)throw new Error('Search IME detached');el.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true}));});
  assert.equal(await search.inputValue(),'安全');assert.ok(await page.locator('.library-fact').count()>0);await lib('clear').click();
  const first=await page.locator('.library-fact').first().getAttribute('data-id');
  await row(first).click();await page.locator('#library-why').fill('先写下理由，再选择问题。');await page.locator('#library-target').selectOption(qs[0].id);
  assert.equal(await page.locator('#library-why').inputValue(),'先写下理由，再选择问题。','An unassigned reason survives choosing its first question.');
  await page.locator('#library-why').fill('这条资料帮助我们界定讨论对象，而非直接给出结论。');
  const second=await page.locator('.library-fact').nth(1).getAttribute('data-id');
  await row(second).click();await row(first).click();
  assert.equal(await page.locator('#library-why').inputValue(),'这条资料帮助我们界定讨论对象，而非直接给出结论。');
  assert.equal((await get()).relations.length,0,'Browsing and drafting do not accept evidence.');
  await page.locator('#library-target').selectOption(qs[1].id);await page.locator('#library-why').fill('第二个问题的独立引用理由。');
  await page.locator('#library-target').selectOption(qs[0].id);
  assert.equal(await page.locator('#library-why').inputValue(),'这条资料帮助我们界定讨论对象，而非直接给出结论。','Reasons are kept separately for each question.');
  await lib('close').click();await open();assert.equal(await page.locator('#library-why').inputValue(),'这条资料帮助我们界定讨论对象，而非直接给出结论。','Reopening preserves this session’s unsaved reason.');
  await page.locator('#library-why').fill('   ');await page.locator('#library-link-form [type="submit"]').click();assert.equal((await get()).relations.length,0);
  await page.locator('#library-why').fill('这条资料帮助我们界定讨论对象，而非直接给出结论。');
  await page.locator('#library-link-form [type="submit"]').click();assert.equal((await get()).relations.length,1);
  assert.ok(await page.locator('.library-dialog').isVisible());
  await page.locator('#library-why').fill('修订理由：它用于界定讨论范围，判断仍需综合其他依据。');
  await page.locator('#library-link-form [type="submit"]').click();assert.equal((await get()).relations.length,1,'Updating a link never duplicates it.');
  assert.ok((await get()).relations[0].why.startsWith('修订理由'));
  await page.locator('#library-target').selectOption(qs[1].id);assert.equal(await page.locator('#library-why').inputValue(),'第二个问题的独立引用理由。');
  await page.locator('#library-link-form [type="submit"]').click();assert.equal((await get()).relations.length,2);
  await page.locator('[data-lib-field="linked"]').check();assert.equal(await page.locator('.library-fact').count(),1);
  await lib('unlink').click();assert.equal((await get()).relations.length,1);await lib('clear').click();
  await page.locator('#library-source').selectOption('src-004');
  const expected=await page.evaluate(()=>window.FieldnotesCases.getData().facts.filter(f=>f.sourceId==='src-004').length);
  assert.equal(await page.locator('.library-fact').count(),expected);
  assert.ok(await page.locator('.source-review.pending').isVisible());
  assert.ok((await page.locator('.library-original').innerText()).length>25,'Unreviewed original is available without inventing verification.');
  if(shots){fs.mkdirSync(shots,{recursive:true});await page.screenshot({path:path.join(shots,'library-zh-source-review.jpg'),type:'jpeg',quality:85});}
  // Switch UI language without altering either the question or the reason.
  await page.locator('.library-header [data-lang="en"]').click();assert.equal((await get()).items[qs[0].id].text,qs[0].text);
  await tab('sources');await row('src-003').click();assert.ok((await page.locator('.library-source-caution').innerText()).includes('不得作为事实依据'));
  await row('src-004').click();await lib('source-facts').click();assert.equal(await page.locator('.library-fact').count(),expected);
  assert.equal(await page.locator('#library-source').inputValue(),'src-004');
  await tab('principles');await lib('principle').click();
  await page.locator('.library-row').nth(1).click();await lib('principle').click();
  assert.equal(Object.values((await get()).items).filter(x=>x.type==='PA').length,2);
  assert.ok(Object.values((await get()).items).filter(x=>x.type==='PA').every(x=>x.text===''),'Principle relevance is never generated.');
  assert.ok(await page.locator('.library-dialog').isVisible(),'Select multiple principles without reopening.');
  if(shots)await page.screenshot({path:path.join(shots,'library-en-principles.jpg'),type:'jpeg',quality:85});
  await lib('return').click();assert.equal((await get()).currentStep,6);
  await open();await tab('timeline');assert.ok((await page.locator('.library-row').first().innerText()).includes('2008'),'Timeline reads chronologically.');
  await tab('glossary');await lib('concept').click();assert.equal((await get()).currentStep,5);
  const concept=Object.values((await get()).items).find(x=>x.type==='C');assert.equal(concept.others,'');assert.equal(concept.mine,'');
  // Searchable assumption references retain checked entries even when filtered out.
  await page.evaluate(()=>{const r=window.FIELDNOTES.getEngine();r.dispatch({type:'ADD_ITEM',payload:{type:'M',step:3,fields:{text:'缺失资料（界面测试）'}}});r.dispatch({type:'ADD_ITEM',payload:{type:'A',step:4,fields:{text:'暂定假设（界面测试）'}}});r.dispatch({type:'NAVIGATE',payload:{step:4}});});
  await page.locator('[data-action="basis"]').click();await page.locator('#basis-form [name="gap"]').selectOption(Object.values((await get()).items).find(x=>x.type==='M').id);
  await page.locator('#basis-form [name="basis"][value="'+first+'"]').check();
  await page.locator('#basis-search').fill('xxxxxxxx');assert.equal(await page.locator('[data-basis-text]:visible').count(),0);
  await page.locator('#basis-form textarea').fill('仅作为暂定推断，后续需要更多资料。');await page.locator('#basis-form [type="submit"]').click();
  assert.ok(Object.values((await get()).items).find(x=>x.type==='A').basisRefs.includes(first));
  await open();await tab('facts');
  for(const language of ['zh','en']){
   await page.locator('.library-header [data-lang="'+language+'"]').click();
   for(const width of [1440,1024,768,390]){
    await page.setViewportSize({width,height:900});
    for(const k of ['facts','principles','timeline','sources','glossary']){
     await tab(k);assert.ok(await page.locator('#modal-content').evaluate(el=>el.scrollWidth<=el.clientWidth),'Fits '+language+' '+k+' at '+width);
     assert.ok(await page.locator('.library-reading').evaluate(el=>el.clientHeight>150),'Reading area is usable at '+width);
     assert.equal(await page.locator('#modal-content [id]').evaluateAll(els=>new Set(els.map(e=>e.id)).size),await page.locator('#modal-content [id]').count());
    }
   }
  }
  await tab('facts');await row('f-mat-001').click();
  if(shots)await page.screenshot({path:path.join(shots,'library-mobile-en.jpg'),type:'jpeg',quality:85});
  await page.setViewportSize({width:1440,height:1000});await page.locator('.library-header [data-lang="zh"]').click();
  await lib('cite').click();assert.equal(await page.locator('#library-why').evaluate(el=>document.activeElement===el),true);
  if(shots)await page.screenshot({path:path.join(shots,'library-zh-link.jpg'),type:'jpeg',quality:85});
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
  console.log('PASS: evidence search, IME, source filters & reverse lookup, explicit links, per-question drafts, update/unlink, batch principles, original-source warnings, blank definitions, basis filtering, both languages × 5 tabs × 4 widths, offline requests/errors.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
