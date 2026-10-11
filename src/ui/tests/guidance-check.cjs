const {chromium}=require(process.env.FIELDNOTES_PLAYWRIGHT||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FIELDNOTES_BROWSER});
 try{
  const root=path.resolve(__dirname,'../../..'),context=await browser.newContext({offline:true,viewport:{width:1440,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.join(root,process.env.FIELDNOTES_HTML||'preview.html')).href);
  const state=()=>page.evaluate(()=>window.FIELDNOTES.getEngine().getState());
  for(const lang of ['zh','en']){
   await page.locator('[data-lang="'+lang+'"]').first().click();
   for(let step=1;step<=10;step++){
    await page.locator('#nav-step-'+step).click();
    const before=JSON.stringify(await state());
    if(await page.locator('#step-hint-panel').isVisible())await page.locator('[data-action="hide-hint"]').click();
    await page.locator('#step-hint-toggle').click();
    const first=await page.locator('#step-hint-panel h3').innerText(),count=await page.evaluate(n=>window.FieldnotesGuidance[n-1].length,step),seen=new Set([first]);
    for(let i=1;i<count;i++){await page.locator('#step-hint-toggle').click();seen.add(await page.locator('#step-hint-panel h3').innerText());}
    assert.equal(seen.size,count,'Different angles for step '+step);
    await page.locator('#step-hint-toggle').click();assert.equal(await page.locator('#step-hint-panel h3').innerText(),first,'Hints wrap around.');
    assert.equal(JSON.stringify(await state()),before,'Reading hints never writes analysis.');
    await page.locator('[data-action="hide-hint"]').click();assert.ok(await page.locator('#step-hint-toggle').evaluate(el=>document.activeElement===el));
   }
  }
  await page.locator('[data-lang="zh"]').first().click();await page.locator('#nav-step-1').click();await page.locator('#step-hint-toggle').click();
  const out=process.env.FIELDNOTES_QA_DIR&&path.join(root,'docs/ai-logs',process.env.FIELDNOTES_QA_DIR);if(out){fs.mkdirSync(out,{recursive:true});await page.screenshot({path:path.join(out,'guided-step-01.jpg'),type:'jpeg',quality:85});}
  await page.locator('.top-actions [data-action="materials"]').click();
  assert.equal(await page.locator('.library-fact').count(),12);
  const initial=await page.locator('.library-fact').first().getAttribute('data-id');
  await page.locator('[data-lib="page-next"]').click();assert.notEqual(await page.locator('.library-fact').first().getAttribute('data-id'),initial);
  await page.locator('#library-search').fill('f-mat-020');assert.equal(await page.locator('.library-fact').count(),1,'Search includes records outside the current page.');
  await page.locator('[data-lib="clear"]').click();
  assert.equal(await page.locator('.library-fact').first().getAttribute('data-id'),initial);
  for(const width of [1440,816,390]){
   await page.setViewportSize({width,height:900});
   if(width===390&&await page.locator('.library-mobile-bar').isVisible())await page.locator('[data-lib="back-list"]').click();
   const visible=await page.locator('.library-results').evaluate(el=>{const area=el.getBoundingClientRect();return [...el.querySelectorAll('.library-row')].filter(row=>{const r=row.getBoundingClientRect();return r.top>=area.top&&r.bottom<=area.bottom;}).length;});
   assert.ok(visible>=4,'At least four complete records visible at '+width+', got '+visible);
   assert.ok(await page.locator('#modal-content').evaluate(el=>el.scrollWidth<=el.clientWidth));
   if(width===390){if(out)await page.screenshot({path:path.join(out,'mobile-material-list.jpg'),type:'jpeg',quality:85});await page.locator('.library-row').first().click();assert.ok(await page.locator('.library-mobile-bar').isVisible());assert.ok(await page.locator('.library-reading').evaluate(el=>el.clientHeight>400));await page.locator('[data-lib="back-list"]').click();assert.ok(await page.locator('.library-browser').isVisible());}
   if(width===1440&&out)await page.screenshot({path:path.join(out,'desktop-material-list.jpg'),type:'jpeg',quality:85});
  }
  await page.locator('[data-lib="close"]').click();
  for(const lang of ['zh','en']){await page.locator('[data-lang="'+lang+'"]').first().click();for(let step=1;step<=10;step++){await page.locator('#nav-step-'+step).click();await page.locator('#step-hint-toggle').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Hint fits '+lang+' step '+step);}}
  assert.deepEqual(errors,[]);console.log('PASS: bilingual rotating hints for all 10 steps, no analysis writes, pagination, global search, >=4 full visible records at 3 widths, full-height mobile list/detail, no overflow.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
