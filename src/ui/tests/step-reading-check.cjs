/* Readability checks for both deliverables, with fictional authoring data in the blank build. */
const {chromium}=require(process.env.FIELDNOTES_PLAYWRIGHT||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{const b=await chromium.launch({headless:true,executablePath:process.env.FIELDNOTES_BROWSER});try{
 const root=path.resolve(__dirname,'../../..'),out=path.join(root,'docs/ai-logs',process.env.FIELDNOTES_QA_DIR||'frontend-qa-step-reading-v1');fs.mkdirSync(out,{recursive:true});
 for(const build of ['index.html','index.demo.html']){
  const p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(pathToFileURL(path.join(root,'dist',build)).href);
  await p.addScriptTag({path:path.join(root,'tools/e2e/enter-workbench.js')});await p.evaluate(()=>FieldnotesTestEntry.enterWorkbench());
  if(build==='index.html'){
   await p.evaluate(()=>{const e=FIELDNOTES.getEngine(),add=(type,step,fields)=>{e.dispatch({type:'ADD_ITEM',payload:{type,step,fields}});return Object.values(e.getState().items).filter(x=>x.type===type).at(-1).id;};for(let i=0;i<2;i++){const q=add('Q',1,{text:'Fictional QA '+(i+1)+': should the team disclose unresolved risk?',isCore:true,focusReason:'Fictional QA focus: the risk affects the public.'});e.dispatch({type:'LINK',payload:{from:CASE_DATA.facts[i].id,to:q,kind:'fact-supports-question',why:'Fictional QA: a relevant technical detail.'}});add('M',3,{text:'Fictional QA: who received the test report?'});add('A',4,{text:'Fictional QA: the testing schedule may have been incomplete.',basisRefs:[CASE_DATA.facts[i].id]});add('C',5,{word:'QA safety',others:'Fictional external interpretation.',mine:'Fictional group definition.'});add('PA',6,{principleId:CASE_DATA.principles[i].id,text:'Fictional QA: why this principle applies.',appliesTo:[q],order:i+1});e.dispatch({type:'ANSWER',payload:{question:q}});const r=Object.values(e.getState().items).filter(x=>x.type==='R').at(-1);e.dispatch({type:'UPDATE_ITEM',payload:{id:r.id,fields:{text:'Fictional QA: publish the limitation and seek a test.',reason:'Fictional QA: keep the judgment provisional.'}}});add('RC',9,{text:'Fictional QA: a tight schedule.',alternatives:'Fictional QA: delay testing.',mitigationJudgment:'Fictional QA: notify the responsible team.'});add('AV',10,{text:'Fictional QA: introduce an independent review.'});}});
   await p.locator('[data-action=present]').click();
  }
  await p.waitForSelector('.is-presenting');const stateBefore=await p.evaluate(()=>JSON.stringify(FIELDNOTES.getEngine().getState()));
  for(const lang of ['zh','en']){await p.locator('[data-lang='+lang+']').first().click();for(const width of [1440,816,390,320]){await p.setViewportSize({width,height:1000});for(let step=1;step<=10;step++){
   await p.locator('#nav-step-'+step).click();await p.waitForTimeout(25);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),build+' '+lang+' '+step+' '+width);
   const geometry=await p.locator('#workspace').evaluate(el=>{const headings=[...el.querySelectorAll('.entry-card h3,.read-field p,.record-preview')].filter(e=>e.getClientRects().length);return headings.every(e=>e.scrollWidth<=e.clientWidth+1);});assert.ok(geometry,'Readable text fits its container.');
   if(step!==7){assert.ok(await p.locator('[data-step-record]').count()>0);assert.ok(await p.locator('[data-step-record][open]').count()<=1);if(await p.locator('[data-step-record]').count()>1){await p.locator('[data-step-record]>summary').nth(1).press('Enter');await p.waitForTimeout(25);assert.equal(await p.locator('[data-step-record][open]').count(),1);assert.equal(await p.locator('[data-step-record]').nth(1).getAttribute('open'),'');await p.locator('[data-step-record]>summary').first().click();await p.waitForTimeout(25);}}
   assert.equal(await p.locator('.workspace-heading [data-action=add],[data-action=snapshot-initial],#review-step').count(),0,'Presentation does not show editing controls.');
   if(lang==='en'&&width===1440&&build==='index.demo.html')await p.screenshot({path:path.join(out,'demo-step-'+String(step).padStart(2,'0')+'.png')});
   if(lang==='zh'&&width===390&&[3,5,9].includes(step)&&build==='index.html')await p.screenshot({path:path.join(out,'formal-mobile-'+step+'.png')});
  }}}
  assert.equal(await p.evaluate(()=>JSON.stringify(FIELDNOTES.getEngine().getState())),stateBefore,'Reading/disclosure/language never writes analysis.');assert.deepEqual(errors,[]);
  await p.setViewportSize({width:1440,height:1000});await p.locator('[data-action=exit-present]').click();await p.locator('#nav-step-2').click();assert.equal(await p.locator('textarea[data-field=text]:visible').count(),0,'Refining a focused question is optional, not duplicated by default.');await p.locator('[id^=focus-edit-]>summary').first().click();assert.equal(await p.locator('textarea[data-field=text]:visible').count(),1);
  await p.locator('#nav-step-4').click();assert.ok(await p.locator('.basis-reading').count()>0);assert.equal(await p.locator('.basis-reading[open]').count(),0);await p.locator('.basis-reading>summary').first().click();assert.ok(await p.locator('.basis-reading li').first().isVisible());
  await p.locator('#nav-step-9').click();assert.ok(await p.locator('.constraint-columns').count()>0);
  await p.close();
 }
 console.log('PASS: both HTML builds × both languages × ten steps × four widths; text fits, keyboard single-record disclosure, read-only state intact, no browser errors; optional question editing, references on demand, paired constraint fields.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1;});
