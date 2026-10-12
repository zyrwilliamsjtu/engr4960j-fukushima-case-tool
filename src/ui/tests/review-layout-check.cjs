/* Visual geometry checks for progressive review and toolbar contrast. */
const {chromium}=require(process.env.FIELDNOTES_PLAYWRIGHT||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.FIELDNOTES_BROWSER});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(pathToFileURL(path.resolve(__dirname,'../../../dist/index.demo.html')).href);
  await page.addScriptTag({path:path.resolve(__dirname,'../../../tools/e2e/enter-workbench.js')});await page.evaluate(()=>FieldnotesTestEntry.enterWorkbench());
  if(await page.locator('[data-action="exit-present"]').count())await page.locator('[data-action="exit-present"]').click();
  await page.evaluate(()=>{window.__fieldnotesEnableDevToolbar&&window.__fieldnotesEnableDevToolbar(true);});
  const out=process.env.FIELDNOTES_QA_DIR&&path.resolve(__dirname,'../../../docs/ai-logs',process.env.FIELDNOTES_QA_DIR);
  if(out)fs.mkdirSync(out,{recursive:true});
  async function layout(stage,width){
   await page.waitForTimeout(50);
   const geometry=await page.evaluate(()=>{
    const card=document.querySelector('.guided-review-card'),box=card.getBoundingClientRect(),banner=document.querySelector('[data-demo-banner]'),limit=banner?banner.getBoundingClientRect().bottom:0;
    const controls=[...card.querySelectorAll('textarea,[data-review-action="choice"],[data-review-action="save"]')].map(el=>({r:el.getBoundingClientRect(),scroll:el.scrollWidth,client:el.clientWidth}));
    const overlap=controls.some((a,i)=>controls.slice(i+1).some(b=>a.r.left<b.r.right&&a.r.right>b.r.left&&a.r.top<b.r.bottom&&a.r.bottom>b.r.top));
    const stage=document.querySelector('.review-stage-track').getBoundingClientRect(),heading=card.querySelector('h3').getBoundingClientRect();
    return {overlap,fits:controls.every(c=>c.r.left>=box.left&&c.r.right<=box.right&&c.scroll<=c.client),top:box.top,limit,width:box.width,available:document.querySelector('.entries').getBoundingClientRect().width,headingClear:heading.bottom<=stage.top,overflow:document.documentElement.scrollWidth>innerWidth};
   });
   assert.ok(!geometry.overlap,stage+' controls overlap at '+width);
   assert.ok(geometry.fits&&geometry.headingClear&&!geometry.overflow,stage+' fields fit at '+width);
   assert.ok(geometry.top>=geometry.limit+10,stage+' card stays below the demo banner');
   assert.ok(geometry.width/geometry.available>.95,'Review uses available width.');
   if(out&&width===1440)await page.locator('.entries').screenshot({path:path.join(out,stage+'.png')});
  }
  for(const lang of ['zh','en']){
   await page.locator('[data-lang="'+lang+'"]').first().click();
   for(let n=1;n<=10;n++){
    await page.locator('#nav-step-'+n).click();await page.mouse.move(0,0);
    const contrast=await page.locator('[data-action="revision-compare-open"]').evaluate(el=>{
     const s=getComputedStyle(el),rgb=t=>t.match(/[\d.]+/g).slice(0,3).map(Number),lum=c=>c.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0),a=lum(rgb(s.color)),b=lum(rgb(s.backgroundColor));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    });assert.ok(contrast>=4.5,'Visible revision button at '+lang+'/'+n+': '+contrast);
   }
   await page.locator('#nav-step-7').click();
   for(const width of [1440,1024,390,320]){
    await page.setViewportSize({width,height:900});
    if(await page.locator('[data-review-action="parts"]').count())await page.locator('[data-review-action="parts"]').first().click();
    await page.locator('[data-review-action="part"][data-part="Q"]').click();await layout('read',width);
    await page.locator('[data-review-action="next"]').click();await layout('decide',width);
    await page.locator('[data-review-action="choice"][data-choice="revise"]').click();await layout('reason',width);
   }
  }
  if(out)await page.locator('.entries').screenshot({path:path.join(out,'mobile-reason.png')});
  console.log('PASS: both languages × four widths × three review phases: no control/heading overlap, no overflow, full-width card, stage visible below banner; revision button contrast >=4.5 on all ten steps without hover.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
