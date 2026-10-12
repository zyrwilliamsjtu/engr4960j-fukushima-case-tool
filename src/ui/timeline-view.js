/* Order source dates without inventing missing timestamps or changing the material pack. */
(function(){
  'use strict';
  function describe(row){
    var raw=String(row.date||''),match=raw.match(/(\d{4})-(\d{2})(?:-(\d{2}))?(?:[T ](\d{2}):(\d{2}))?/);
    var ongoing=/及之后|afterwards|onwards|and after/i.test(raw),range=/~|～|至/.test(raw);
    if(!match)return {section:2,key:Infinity,group:'undated',date:raw,precision:'unknown'};
    var day=match[3]||'01',hasTime=match[4]!==undefined;
    var key=Number(match[1]+match[2]+day)*1441+(hasTime?Number(match[4])*60+Number(match[5]):1440);
    var date=match[1]+'-'+match[2]+(match[3]?'-'+match[3]:'');
    return {section:ongoing?1:0,key:key,date:date,group:ongoing?'ongoing':range?'range:'+raw:date+(hasTime?'':':untimed'),precision:ongoing?'ongoing':range?'range':hasTime?'time':'day',time:hasTime?match[4]+':'+match[5]+(/JST/.test(raw)?' JST':''):''};
  }
  function sort(rows){return rows.map(function(row,index){return {row:row,index:index,info:describe(row)};}).sort(function(a,b){return a.info.section-b.info.section||a.info.key-b.info.key||a.index-b.index;}).map(function(entry){return entry.row;});}
  window.FieldnotesTimeline={describe:describe,sort:sort};
})();
