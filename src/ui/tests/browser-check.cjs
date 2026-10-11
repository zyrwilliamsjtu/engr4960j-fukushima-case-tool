/* Browser QA only: app has no dependencies. Point FIELDNOTES_PLAYWRIGHT to an
 * existing Playwright installation and FIELDNOTES_BROWSER to Chrome/Edge. */
const { chromium } = require(process.env.FIELDNOTES_PLAYWRIGHT || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root=path.resolve(__dirname,'../../..'), screenshots=path.join(root,'docs/ai-logs/frontend-qa-v3');
fs.mkdirSync(screenshots,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FIELDNOTES_BROWSER});
 const context=await browser.newContext({viewport:{width:1440,height:1080},offline:true});
 const page=await context.newPage(), errors=[], external=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
 await page.goto(pathToFileURL(path.join(root,'preview.html')).href);
 await page.waitForSelector('.step-hero');
 const click=action=>page.locator('[data-action="'+action+'"]').first().click();
 const step=n=>page.locator('.sidebar .step-nav[data-step="'+n+'"]').click();
 const get=()=>page.evaluate(()=>window.FIELDNOTES.getEngine().getState());
 await page.evaluate(()=>window.FIELDNOTES.getEngine().dispatch({type:'RESET'}));
 await page.waitForTimeout(900);await page.screenshot({path:path.join(screenshots,'01-workbook-zh.png'),fullPage:true});
 assert.ok(!(await page.locator('#app').innerText()).includes('福岛'),'Generic workspace shell.');
 assert.ok(await page.locator('.step-name').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=15),'Readable desktop navigation.');
 await click('add');
 await page.locator('textarea[data-field="text"]').fill('Should our test team disclose uncertainty?');
 await page.locator('.entry-details > summary').click();
 await page.locator('input[data-field="actors"]').fill('Test engineer, Test organization');
 assert.equal(await page.locator('.context-rail,.view-tabs,.savebar').count(),0,'Simplified writing canvas.');
 await page.waitForTimeout(900);assert.equal(await page.locator('.entry-details').getAttribute('open'),'','Disclosure stays open through autosave.');
 const q=Object.values((await get()).items)[0].id;
 // A UI language switch never translates user writing.
 await page.locator('[data-lang="en"]').click();
 assert.equal(await page.locator('textarea[data-field="text"]').inputValue(),'Should our test team disclose uncertainty?');
 await page.screenshot({path:path.join(screenshots,'02-workbook-en.png'),fullPage:true});
 await step(2);await page.locator('[data-field="isCore"]').check();
 await page.locator('[data-field="focusReason"]').fill('A test focus reason, not Fukushima analysis.');
 await step(3);await click('add');await page.locator('textarea[data-field="text"]').fill('What did the test actors know?');
 await click('link');await page.locator('#link-form select').selectOption(q);
 await page.locator('#link-form textarea').fill('This test gap may affect the judgment.');
 await page.locator('#link-form button[type="submit"]').click();
 await step(4);await click('add');await page.locator('textarea[data-field="text"]').fill('Our tentative test assumption.');
 await click('basis');await page.locator('#basis-form select').selectOption(Object.values((await get()).items).find(x=>x.type==='M').id);
 await page.locator('#basis-form textarea').fill('A provisional inference for testing.');
 await page.locator('#basis-form button[type="submit"]').click();
 await step(5);await click('concept');await page.locator('[data-field="others"]').fill('Another possible meaning.');await page.locator('[data-field="mine"]').fill('Our precise meaning here.');await page.screenshot({path:path.join(screenshots,'03-concepts.png'),fullPage:true});
 await step(6);await page.locator('.workspace-heading [data-action="materials"]').click();await click('custom-principle');
 assert.equal(await page.locator('textarea[data-field="text"]').count(),1,'Custom principle has a single editing field.');
 await page.locator('textarea[data-field="text"]').fill('Our test principle and its basis.');
 await page.locator('[id^="principle-meta-"] > summary').first().click();await page.locator('[data-applies]').check();
 await page.locator('.workspace-heading [data-action="materials"]').click();await page.locator('[data-action="principle"]').first().click();
 await page.locator('[data-action="rank"][data-direction="-1"]').last().click();
 await page.locator('#principle-conflicts > summary').click();await click('conflict');await page.locator('#conflict-form [name="question"]').selectOption(q);
 const options=await page.locator('#conflict-form [name="a"] option').evaluateAll(elements=>elements.map(x=>x.value).filter(Boolean));
 await page.locator('#conflict-form [name="a"]').selectOption(options[0]);await page.locator('#conflict-form [name="b"]').selectOption(options[1]);
 await page.locator('#conflict-form button[type="submit"]').click();
 assert.equal((await get()).conflicts.length,1);
 await step(7);await page.locator('#review-guidance > summary').click();await page.locator('[data-checklist]').first().check();await page.locator('[data-review]').first().selectOption('checked');
 await step(8);await click('tools');await click('method');assert.equal(await page.locator('[data-action="reference"]').isDisabled(),true);
 await click('close');await click('answer');assert.equal(await page.locator('[data-field="text"]').inputValue(),'');
 await page.locator('[data-field="text"]').fill('Our written test judgment.');await page.locator('[data-field="reason"]').fill('Our written test justification.');
 await step(9);await click('constraint');await page.locator('[data-field="alternatives"]').fill('A test alternative.');await page.locator('[data-field="mitigationJudgment"]').fill('Our test responsibility reasoning.');
 await step(10);await click('add');await page.locator('textarea[data-field="text"]').fill('A test preventive action.');
 await click('review-step');assert.equal((await get()).stepStatus[10],'checked');
 await step(1);await page.locator('textarea[data-field="text"]').fill('Our revised test question?');
 await click('tools');
 const downloadEvent=page.waitForEvent('download');await click('download-json');const download=await downloadEvent;
 assert.equal(download.suggestedFilename(),'fukushima-project.json');
 await page.evaluate(()=>window.FIELDNOTES.getEngine().flush());await page.reload();
 assert.ok(Object.values((await get()).items).some(x=>x.text==='Our revised test question?'),'Reload restores the draft.');
 // New cases keep their materials and drafts apart from the built-in case.
 await click('cases');await page.locator('#case-form [name="title"]').fill('QA · Bridge design');await page.locator('#case-form button[type="submit"]').click();
 const customId=(await get()).caseId;assert.notEqual(customId,'fukushima');assert.equal(Object.keys((await get()).items).length,0);
 await click('add');await page.locator('textarea[data-field="text"]').fill('Should the bridge design team disclose a test limitation?');
 const customQuestion=Object.values((await get()).items)[0].id;
 await step(3);await click('add-fact');await page.locator('#fact-form [name="text"]').fill('Fictional QA material: the test report was circulated on Monday.');
 await page.locator('#fact-form [value="material"]').check();await page.locator('#fact-form [value="organization"]').check();await page.locator('#fact-form [name="source"]').fill('Fictional QA test report, section 2');await page.locator('#fact-form button[type="submit"]').click();
 assert.equal(await page.locator('.fact-card').count(),2,'Multi-category fact appears in both buckets.');
 await page.locator('.fact-card [data-action="link"]').first().click();await page.locator('#link-form select').selectOption(customQuestion);await page.locator('#link-form textarea').fill('Our independently written relevance reason.');await page.locator('#link-form button[type="submit"]').click();
 const bundle=await page.evaluate(()=>window.FIELDNOTES.getCases().exportProject());assert.equal(JSON.parse(bundle).caseData.facts.length,1);
 await page.locator('#toast.visible').waitFor({state:'hidden'});await page.screenshot({path:path.join(screenshots,'04-custom-case.png'),fullPage:true});
 await page.evaluate(()=>window.FIELDNOTES.getEngine().flush());await page.reload();assert.equal((await get()).caseId,customId);assert.equal(await page.locator('.fact-card').count(),2);
 await click('cases');await page.locator('[data-action="select-case"][data-id="fukushima"]').click();assert.equal((await get()).items[q].text,'Our revised test question?');
 await click('tools');await click('import');await page.locator('#project-file').setInputFiles({name:'bridge.json',mimeType:'application/json',buffer:Buffer.from(bundle)});await click('confirm');assert.equal((await get()).caseId,customId);assert.equal((await get()).relations.length,1);
 await click('cases');await page.locator('[data-action="select-case"][data-id="fukushima"]').click();
 // Invalid import leaves the current working record intact.
 const before=JSON.stringify(await get());await click('tools');await click('import');
 await page.locator('#project-file').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"stateVersion":"old"}')});
 await click('confirm');assert.equal(JSON.stringify(await get()),before);
 // IME composition remains attached until compositionend.
 await page.locator('textarea[data-field="text"]').evaluate(el=>{
   el.dispatchEvent(new CompositionEvent('compositionstart',{bubbles:true}));
   el.value='Our revised test question? 中文测试';
   el.dispatchEvent(new InputEvent('input',{bubbles:true,isComposing:true}));
   if(!el.isConnected)throw new Error('IME textarea was removed');
   el.dispatchEvent(new CompositionEvent('compositionend',{bubbles:true}));
 });
 assert.ok((await get()).items[q].text.endsWith('中文测试'));
 for(const language of ['zh','en']){
  await page.locator('[data-lang="'+language+'"]').click();
  for(let n=1;n<=10;n++){await step(n);assert.equal(await page.locator('.sidebar .active').getAttribute('data-step'),String(n));}
 }
 await step(1);await page.setViewportSize({width:390,height:844});await page.locator('#toast.visible').waitFor({state:'hidden'});
 await page.screenshot({path:path.join(screenshots,'05-mobile.png'),fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Mobile has no horizontal page overflow.');
 await page.locator('.sidebar .step-nav[data-step="5"]').click();
 for(const width of [1440,1024,768,390]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No overflow at '+width);}
 await page.setViewportSize({width:1440,height:1080});await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.waitForSelector('.step-hero');
 assert.equal(errors.length,0,'Browser errors: '+errors.join(', '));assert.equal(external.length,0,'Standalone preview makes no network requests.');
 await browser.close();console.log('PASS: offline HTML, both languages × 10 steps, full authoring path, JSON export, autosave/reload, simple navigation, IME, preserved disclosures, invalid import protection, responsive layout.');
})().catch(error=>{console.error(error);process.exit(1);});
