const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {pathToFileURL}=require('node:url'),{chromium}=require(process.env.FIELDNOTES_PLAYWRIGHT||'playwright');
const root=path.resolve(__dirname,'../../..'),sandbox={window:{}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root,'src/ui/timeline-view.js'),'utf8'),sandbox);
const fixture=[{id:'later',date:'2011-03-12 15:36'},{id:'ongoing',date:'2011-03-11 及之后'},{id:'day',date:'2011-03-11'},{id:'pm',date:'2011-03-11 21:23'},{id:'am',date:'2011-03-11 14:46 JST'},{id:'period',date:'2008-10 ~ 2008-12'},{id:'unknown',date:'Unknown'}];
assert.deepEqual(Array.from(sandbox.window.FieldnotesTimeline.sort(fixture),x=>x.id),['period','am','pm','day','later','ongoing','unknown']);
assert.equal(sandbox.window.FieldnotesTimeline.describe(fixture[2]).time,'','A date-only record gains no time.');
assert.equal(sandbox.window.FieldnotesTimeline.describe(fixture[5]).precision,'range');
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.FIELDNOTES_BROWSER});
 try{
  const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(pathToFileURL(path.join(root,process.env.FIELDNOTES_HTML||'dist/index.html')).href+'#workbench');
  const before=await p.evaluate(()=>({data:JSON.stringify(CASE_DATA),state:JSON.stringify(FIELDNOTES.getEngine().getState())}));
  await p.locator('.top-actions [data-action="materials"]').click();
  assert.equal(await p.locator('.library-review-badge,.source-review.pending').count(),0);
  await p.locator('#library-search').fill('f-mat-016');await p.locator('.library-row').first().click();
  assert.ok(await p.locator('.library-material-notes').count()>0);await p.locator('.library-material-notes>summary').click();assert.ok((await p.locator('.library-material-notes').innerText()).includes('未做'),'Original review notes remain accessible.');
  for(const lang of ['zh','en']){
   await p.locator('.library-header [data-lang="'+lang+'"]').click();
   await p.locator('[data-lib="tab"][data-tab="timeline"]').click();
   const ids=await p.locator('.timeline-row').evaluateAll(es=>es.map(e=>e.dataset.id));
   assert.deepEqual(ids.slice(0,8),['tl-019','tl-018','tl-003','tl-016','tl-020','tl-001','tl-002','tl-017']);
   assert.equal(ids.length,15,'Timeline stays continuous instead of splitting a date group across pages.');
   assert.ok(await p.locator('.library-pagination').isHidden());
   assert.ok((await p.locator('.timeline-date-group').allTextContents()).some(t=>t.includes(lang==='zh'?'持续':'Ongoing')));
   const out=process.env.FIELDNOTES_QA_DIR&&path.join(root,'docs/ai-logs',process.env.FIELDNOTES_QA_DIR);if(out){fs.mkdirSync(out,{recursive:true});await p.screenshot({path:path.join(out,'timeline-'+lang+'.png')});}
   await p.locator('[data-lib="tab"][data-tab="facts"]').click();
   assert.equal(await p.locator('.library-fact').count(),12);assert.equal(await p.locator('.library-row-title').first().evaluate(e=>getComputedStyle(e).fontSize),'14px');
   if(out)await p.screenshot({path:path.join(out,'library-'+lang+'.png')});
   for(const width of [1440,816,390,320]){
    await p.setViewportSize({width,height:900});
    assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(await p.locator('.library-row').first().isHidden())await p.locator('[data-lib="back-list"]').click();
    await p.locator('.library-row').first().click();
    const fits=await p.locator('.library-reading').evaluate(e=>e.scrollWidth<=e.clientWidth+1);assert.ok(fits,'Reading has no horizontal clipping at '+width);
    if(width<=620)await p.locator('[data-lib="back-list"]').click();
   }
   await p.setViewportSize({width:1440,height:1000});
  }
  const after=await p.evaluate(()=>({data:JSON.stringify(CASE_DATA),state:JSON.stringify(FIELDNOTES.getEngine().getState())}));assert.deepEqual(after,before,'UI sorting and marker removal do not rewrite materials or analysis.');
  assert.deepEqual(errors,[]);
  console.log('PASS: precision-aware chronology, date ranges and ongoing events separate, no invented timestamps, continuous 15-event timeline, no review badges, notes preserved, larger type, both languages/four widths, no state/data mutations.');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
