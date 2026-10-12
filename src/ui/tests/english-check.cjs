/* Interface localization regression; test records are fictional, not case analysis. */
const {chromium}=require(process.env.FIELDNOTES_PLAYWRIGHT||'playwright');
const assert=require('node:assert/strict'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FIELDNOTES_BROWSER});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(__dirname,'../../..',process.env.FIELDNOTES_HTML||'dist/index.html')).href+'#workbench');
  await page.locator('[data-lang="en"]').first().click();
  const english=async(selector)=>{
   const texts=await page.locator(selector).evaluateAll(els=>els.filter(e=>e.getClientRects().length).flatMap(e=>[e.innerText,...[e,...e.querySelectorAll('*')].flatMap(n=>['title','aria-label','placeholder'].map(k=>n.getAttribute(k)||''))]));
   assert.ok(!/[\p{Script=Han}]/u.test(texts.join('\n')),texts.filter(t=>/[\p{Script=Han}]/u.test(t)).join('\n'));
  };
  const step=n=>page.locator('#nav-step-'+n).click();
  const open=async action=>page.locator('#app [data-action="'+action+'"]').first().click();
  const close=async()=>page.locator('#modal').evaluate(e=>e.close());
  for(let n=1;n<=10;n++){await step(n);await page.locator('#step-hint-toggle').click();await english('#app');}
  await step(1);await open('add');await page.locator('textarea[data-field="text"]').fill('Should the fictional QA team disclose uncertainty?');
  await page.evaluate(()=>{const e=FIELDNOTES.getEngine(),q=Object.values(e.getState().items)[0];e.dispatch({type:'UPDATE_ITEM',payload:{id:q.id,fields:{isCore:true,focusReason:'Fictional QA focus reason.'}}});e.createSnapshot('初步');e.dispatch({type:'UPDATE_ITEM',payload:{id:q.id,fields:{text:'Should the fictional QA team publish the limitation?'}}});e.createSnapshot('复核后');});
  await page.evaluate(()=>{window.__fieldnotesEnableDevToolbar&&window.__fieldnotesEnableDevToolbar(true);});
  for(const action of ['revision-compare-open','reasoning-overview-open','method','cases','tools']){
   await open(action);await english('#modal');
   if(action==='reasoning-overview-open'){await page.locator('[data-overview-scope]').last().click();await english('#modal');}
   await close();
  }
  await open('archive-menu');await english('#archive-menu-panel');
  await page.locator('[data-action="archive-menu"]').click();
  await page.evaluate(()=>{window.__fieldnotesEnableDevToolbar&&window.__fieldnotesEnableDevToolbar(false);});
  await page.locator('#nav-summary').click();await english('#app');await step(1);
  await open('present');await english('#app');await open('exit-present');
  for(const sample of [JSON.stringify({stateVersion:'old'}),JSON.stringify({...await page.evaluate(()=>FIELDNOTES.getEngine().getState()),caseId:'wrong'}),'not JSON']){
   await page.locator('#project-file').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from(sample)});
   await page.locator('#modal[open]').waitFor();await english('#modal');await close();
  }
  const output=await page.evaluate(()=>({notes:FIELDNOTES.exportMarkdown(),report:TemplateExport.exportReport(FIELDNOTES.getEngine().getState(),FIELDNOTES.getCases().getData(),'en')}));
  assert.ok(!/[\p{Script=Han}]/u.test(output.notes));assert.ok(!/[\p{Script=Han}]/u.test(output.report));
  const preserved=await page.evaluate(()=>{const s=FIELDNOTES.getEngine().getState(),q=Object.values(s.items)[0];q.text='用户原文不可改写';return TemplateExport.exportReport(s,FIELDNOTES.getCases().getData(),'en');});
  assert.ok(preserved.includes('用户原文不可改写'),'Original user text remains unchanged.');
  await page.locator('.top-actions [data-action="materials"]').click();
  // Material summaries/quotes/notes retain their original language; verify generated controls.
  await english('.library-header,.library-tabs,.library-footer,.library-filter-chips,.library-pagination');
  for(const tab of ['principles','glossary']){await page.locator('[data-lib="tab"][data-tab="'+tab+'"]').click();await english('.library-row-title,.library-reading-title,.library-principle-action,.library-word-preview');}
  await page.locator('[data-lib="close"]').click();
  await step(1);await page.setViewportSize({width:390,height:900});await english('#app');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'English mobile has no overflow.');
  assert.equal(await page.locator('.workbench-toolbar').count(), 0, 'dev toolbar hidden for users');
  const demo=await browser.newPage();
  await demo.goto(pathToFileURL(path.resolve(__dirname,'../../../dist/index.demo.html')).href+'#workbench');
  assert.equal(await demo.locator('[data-demo-banner]').count(), 0);
  await demo.close();
  assert.deepEqual(errors,[]);
  console.log('PASS: English ten steps, hints, snapshots, summary/report, presentation, overview/help/case/archive dialogs, import failures, both Markdown exports, library controls, mobile, demo build without top banner, and Chinese round-trip; original user text preserved.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
