const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';           // 13.333 x 7.5
p.author = 'UPSC CSE Polity';
p.title  = 'Article 12 - Definition of "State"';

// ---------- design system ----------
const C = {
  maroon:'7B1113', maroonDk:'5A0C0E', maroonLt:'A32C2E',
  navy:'1F3A5F', gold:'C9A227',
  ink:'1A1A1A', muted:'6B6B6B', white:'FFFFFF',
  tintM:'F7EFEF', tintN:'EDF1F6', tintG:'FBF5E4',
  green:'1B6B3A', red:'B3261E', line:'DFD9D9'
};
const HEAD='Cambria', BODY='Calibri';
const M=0.62, W=13.333-2*M;         // margin, content width
const sh=()=>({type:'outer',color:'000000',blur:10,offset:2,angle:90,opacity:0.10});

let n=0;
function slide(dark){
  n++;
  const s=p.addSlide();
  s.background={color: dark?C.maroon:C.white};
  if(!dark){
    s.addText(String(n).padStart(2,'0'),{x:12.5,y:6.95,w:0.5,h:0.3,isTextBox:true,
      fontFace:BODY,fontSize:10,color:C.muted,align:'right',margin:0});
  }
  return s;
}
function head(s,eyebrow,title,sub){
  if(eyebrow) s.addText(eyebrow.toUpperCase(),{x:M,y:0.40,w:W,h:0.26,isTextBox:true,
    fontFace:BODY,fontSize:10.5,bold:true,color:C.gold,charSpacing:2,margin:0});
  s.addText(title,{x:M,y:0.66,w:W,h:0.66,isTextBox:true,
    fontFace:HEAD,fontSize:29,bold:true,color:C.maroon,margin:0,valign:'middle'});
  if(sub) s.addText(sub,{x:M,y:1.30,w:W,h:0.32,isTextBox:true,
    fontFace:BODY,fontSize:13,italic:true,color:C.muted,margin:0});
}
function card(s,x,y,w,h,fill){
  s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.08,
    fill:{color:fill||C.tintM},line:{color:C.line,width:0.75},shadow:sh()});
}
function badge(s,x,y,txt,fill,d){
  const dd=d||0.42;
  s.addShape(p.ShapeType.ellipse,{x,y,w:dd,h:dd,fill:{color:fill||C.maroon},line:{color:fill||C.maroon,width:0}});
  s.addText(String(txt),{x,y,w:dd,h:dd,isTextBox:true,fontFace:BODY,fontSize:dd>0.5?16:13,
    bold:true,color:C.white,align:'center',valign:'middle',margin:0});
}
const T=(s,t,o)=>s.addText(t,Object.assign({isTextBox:true,fontFace:BODY,margin:0},o));

/* ============ 1. TITLE ============ */
{
  const s=slide(true);
  s.addShape(p.ShapeType.rect,{x:0,y:0,w:13.333,h:0.09,fill:{color:C.gold},line:{width:0}});
  T(s,'UPSC CIVIL SERVICES EXAMINATION  ·  GS PAPER II  ·  POLITY',
    {x:M,y:1.55,w:W,h:0.3,fontSize:12,bold:true,color:C.gold,charSpacing:2.5});
  T(s,'ARTICLE 12',{x:M,y:2.00,w:W,h:1.25,fontFace:HEAD,fontSize:66,bold:true,color:C.white});
  T(s,'Definition of “State”',{x:M,y:3.20,w:W,h:0.7,fontFace:HEAD,fontSize:32,color:'F0D9DA'});
  s.addShape(p.ShapeType.rect,{x:M,y:4.05,w:2.0,h:0.035,fill:{color:C.gold},line:{width:0}});
  T(s,'Part III — Fundamental Rights  ·  Articles 12–35',
    {x:M,y:4.32,w:W,h:0.34,fontSize:15,color:'E8CFD0'});
  T(s,'The gatekeeper of Fundamental Rights',
    {x:M,y:5.35,w:W,h:0.4,fontSize:17,italic:true,color:C.gold});
  s.addNotes('Open by telling the class: this one article decides WHO you can sue for a fundamental rights violation. Everything in Part III depends on it.');
}

/* ============ 2. WHY IT MATTERS ============ */
{
  const s=slide(); head(s,'Section 1','Why Article 12 Decides Everything');
  const rows=[
    ['Fundamental Rights bind the STATE','Not private individuals — that is the general rule.'],
    ['So Article 12 answers one question','WHOM can you sue for a violation of Fundamental Rights?'],
    ['It fixes the reach of the writs','Article 32 (Supreme Court) and, indirectly, Article 226 (High Court).'],
    ['It also governs the DPSP','Article 36 — “State” in Part IV carries the SAME meaning as Article 12.']
  ];
  let y=1.62;
  rows.forEach((r,i)=>{
    badge(s,M,y+0.04,i+1);
    T(s,r[0],{x:M+0.62,y:y,w:W-0.7,h:0.28,fontSize:15,bold:true,color:C.navy});
    T(s,r[1],{x:M+0.62,y:y+0.28,w:W-0.7,h:0.28,fontSize:13,color:C.ink});
    y+=0.72;
  });
  card(s,M,y+0.10,W,1.32,C.tintN);
  T(s,'THE ESCAPE PROBLEM',{x:M+0.28,y:y+0.26,w:W-0.56,h:0.28,fontSize:12,bold:true,color:C.maroon,charSpacing:1.5});
  T(s,'If only the Union and the States were bound, the government could violate rights through a corporation it owns and then claim immunity. Article 12 exists to shut that door — the State cannot escape Fundamental Rights by changing its clothes.',
    {x:M+0.28,y:y+0.56,w:W-0.56,h:0.72,fontSize:13.5,color:C.ink});
  s.addNotes('Emphasise the escape problem — it is the reason every later case exists.');
}

/* ============ 3. THE PROVISION ============ */
{
  const s=slide(); head(s,'Section 2','The Provision — Bare Text');
  s.addShape(p.ShapeType.roundRect,{x:M,y:1.58,w:W,h:1.62,rectRadius:0.08,
    fill:{color:C.maroonDk},line:{width:0},shadow:sh()});
  T(s,'“In this Part, unless the context otherwise requires, “the State” includes the Government and Parliament of India, the Government and the Legislature of each of the States, and all local or other authorities within the territory of India or under the control of the Government of India.”',
    {x:M+0.34,y:1.76,w:W-0.68,h:1.26,fontFace:HEAD,fontSize:15,color:C.white,valign:'middle',lineSpacing:24});
  T(s,'FOUR LIMBS',{x:M,y:3.42,w:W,h:0.28,fontSize:11.5,bold:true,color:C.gold,charSpacing:2});
  const limbs=[['Government & Parliament\nof India','Union executive + legislature'],
               ['Government & Legislature\nof each State','State executive + legislature'],
               ['All LOCAL\nauthorities','Test → R.C. Jain (1981)'],
               ['OTHER\nauthorities','Test → the 4-phase evolution']];
  const cw=(W-3*0.28)/4;
  limbs.forEach((l,i)=>{
    const x=M+i*(cw+0.28);
    card(s,x,3.76,cw,2.05, i>1?C.tintM:C.tintN);
    badge(s,x+0.24,3.99,i+1,i>1?C.maroon:C.navy,0.38);
    T(s,l[0],{x:x+0.24,y:4.50,w:cw-0.48,h:0.8,fontSize:14,bold:true,color:C.ink});
    T(s,l[1],{x:x+0.24,y:5.30,w:cw-0.48,h:0.42,fontSize:11.5,italic:true,color:C.muted});
  });
  s.addNotes('Read the bare text aloud once. Limbs 3 and 4 are where all the case law sits.');
}

/* ============ 4. THREE WORDS ============ */
{
  const s=slide(); head(s,'High-yield','Three Words That Carry Marks','Each one is a standard Prelims trap.');
  const items=[
    ['“includes”','The definition is INCLUSIVE, not exhaustive.','Courts can and do add to it.','✗ “Article 12 exhaustively defines the State.”'],
    ['“unless the context\notherwise requires”','Built-in flexibility.','The same body may be “State” for one purpose and not another.','Explains why answers are fact-specific.'],
    ['“…under the control of\nthe Government of India”','The “OR” is DISJUNCTIVE.','A body OUTSIDE India’s territory but under GoI control is STILL “State”.','✗ “It must be within Indian territory.”']
  ];
  const cw=(W-2*0.32)/3;
  items.forEach((it,i)=>{
    const x=M+i*(cw+0.32);
    card(s,x,1.86,cw,4.34,C.tintM);
    T(s,it[0],{x:x+0.26,y:2.06,w:cw-0.52,h:0.86,fontFace:HEAD,fontSize:15.5,bold:true,color:C.maroon});
    T(s,it[1],{x:x+0.26,y:3.00,w:cw-0.52,h:0.6,fontSize:14,bold:true,color:C.navy});
    T(s,it[2],{x:x+0.26,y:3.55,w:cw-0.52,h:1.0,fontSize:12.5,color:C.ink});
    s.addShape(p.ShapeType.rect,{x:x+0.26,y:4.72,w:cw-0.52,h:0.02,fill:{color:C.line},line:{width:0}});
    T(s,it[3],{x:x+0.26,y:4.88,w:cw-0.52,h:1.1,fontSize:12,italic:true,color:C.red});
  });
  s.addNotes('Ask the class which of the three they think is most often tested — it is the disjunctive OR.');
}

/* ============ 5. AMBEDKAR ============ */
{
  const s=slide(true);
  T(s,'FRAMERS’ INTENT  ·  CONSTITUENT ASSEMBLY, 25 NOVEMBER 1948',
    {x:M,y:0.95,w:W,h:0.3,fontSize:11.5,bold:true,color:C.gold,charSpacing:2});
  T(s,'“',{x:M-0.12,y:1.18,w:1.5,h:1.9,fontFace:HEAD,fontSize:96,color:C.maroonLt});
  T(s,'…every authority which has got either the power to make laws or the power to have discretion vested in it.',
    {x:M+0.7,y:1.72,w:W-1.4,h:1.9,fontFace:HEAD,fontSize:27,color:C.white,lineSpacing:40});
  T(s,'— Dr. B. R. Ambedkar, on Draft Article 7',
    {x:M+0.7,y:3.72,w:W-1.4,h:0.34,fontSize:14,italic:true,color:'E8CFD0'});
  card(s,M,4.55,W,1.62,C.maroonDk);
  T(s,'WHY THIS MATTERS FOR THE EXAM',{x:M+0.32,y:4.76,w:W-0.64,h:0.28,fontSize:11.5,bold:true,color:C.gold,charSpacing:1.5});
  T(s,'The State acts through boards, corporations and licensing authorities. Ambedkar’s line is the intellectual seed of the “instrumentality / agency” doctrine — use it to open a Mains answer.',
    {x:M+0.32,y:5.08,w:W-0.64,h:0.92,fontSize:14,color:C.white});
  s.addNotes('This quote is the single best Mains opener on this topic.');
}

/* ============ 6. TWO BRANCHES ============ */
{
  const s=slide(); head(s,'Roadmap','Two Branches — Two Different Tests',
    'Merging them is the most common mistake in coaching material.');
  const cw=(W-0.4)/2;
  // left
  card(s,M,1.92,cw,4.3,C.tintN);
  T(s,'BRANCH 1',{x:M+0.3,y:2.14,w:cw-0.6,h:0.28,fontSize:11.5,bold:true,color:C.navy,charSpacing:2});
  T(s,'“LOCAL AUTHORITIES”',{x:M+0.3,y:2.44,w:cw-0.6,h:0.42,fontFace:HEAD,fontSize:21,bold:true,color:C.navy});
  T(s,'Municipalities · Panchayats · District Boards · Improvement Trusts · Port Commissioners · Development Authorities',
    {x:M+0.3,y:2.94,w:cw-0.6,h:0.86,fontSize:12.5,color:C.ink});
  T(s,'THE TEST',{x:M+0.3,y:3.92,w:cw-0.6,h:0.26,fontSize:10.5,bold:true,color:C.muted,charSpacing:1.5});
  T(s,'Union of India v. R.C. Jain (1981)',{x:M+0.3,y:4.20,w:cw-0.6,h:0.34,fontSize:15,bold:true,color:C.ink});
  T(s,'→  L A A F S  —  five attributes',{x:M+0.3,y:4.58,w:cw-0.6,h:0.34,fontSize:14,bold:true,color:C.navy});
  T(s,'Anchored in S. 3(31), General Clauses Act 1897, imported by Article 367(1).',
    {x:M+0.3,y:5.02,w:cw-0.6,h:0.8,fontSize:12,italic:true,color:C.muted});
  // right
  card(s,M+cw+0.4,1.92,cw,4.3,C.tintM);
  const rx=M+cw+0.4;
  T(s,'BRANCH 2',{x:rx+0.3,y:2.14,w:cw-0.6,h:0.28,fontSize:11.5,bold:true,color:C.maroon,charSpacing:2});
  T(s,'“OTHER AUTHORITIES”',{x:rx+0.3,y:2.44,w:cw-0.6,h:0.42,fontFace:HEAD,fontSize:21,bold:true,color:C.maroon});
  T(s,'Statutory corporations · PSUs · government companies · societies · even private bodies acting as a front for the State',
    {x:rx+0.3,y:2.94,w:cw-0.6,h:0.86,fontSize:12.5,color:C.ink});
  T(s,'THE TESTS — FOUR PHASES',{x:rx+0.3,y:3.92,w:cw-0.6,h:0.26,fontSize:10.5,bold:true,color:C.muted,charSpacing:1.5});
  T(s,'Rajasthan SEB (1967)  →  Ajay Hasia (1981)  →  Pradeep Kumar Biswas (2002)',
    {x:rx+0.3,y:4.20,w:cw-0.6,h:0.7,fontSize:14,bold:true,color:C.ink});
  T(s,'Open-ended and judicially evolved — this is where the exam questions come from.',
    {x:rx+0.3,y:5.02,w:cw-0.6,h:0.8,fontSize:12,italic:true,color:C.muted});
  s.addNotes('Stress: the local-authority test and the other-authority tests are NOT interchangeable.');
}

/* ============ 7. LAAFS ============ */
{
  const s=slide(); head(s,'Branch 1','Local Authorities — the R.C. Jain Test',
    'Union of India v. R.C. Jain (1981), the DDA case — five attributes, mnemonic L A A F S.');
  const rows=[
    ['L','Separate LEGAL existence','A body corporate — not a mere government agency or department.'],
    ['A','Functions in a defined AREA','“…and ordinarily, wholly or partly, directly or indirectly, elected by the inhabitants.”'],
    ['A','Degree of AUTONOMY','An “appreciable measure” — freedom to decide policy. Need not be complete.'],
    ['F','Power to raise FUNDS','Taxes, rates, charges, fees. Control of the fund must vest in the authority itself.'],
    ['S','Entrusted by STATUTE with municipal functions','Health, education, water, sewerage, town planning, roads, markets, transport, welfare.']
  ];
  let y=1.90;
  rows.forEach(r=>{
    s.addShape(p.ShapeType.roundRect,{x:M,y:y,w:W,h:0.80,rectRadius:0.06,
      fill:{color:C.tintN},line:{color:C.line,width:0.75}});
    s.addShape(p.ShapeType.roundRect,{x:M+0.16,y:y+0.16,w:0.48,h:0.48,rectRadius:0.06,
      fill:{color:C.navy},line:{width:0}});
    T(s,r[0],{x:M+0.16,y:y+0.16,w:0.48,h:0.48,fontFace:HEAD,fontSize:20,bold:true,color:C.white,align:'center',valign:'middle'});
    T(s,r[1],{x:M+0.82,y:y+0.10,w:5.9,h:0.32,fontSize:14,bold:true,color:C.navy});
    T(s,r[2],{x:M+0.82,y:y+0.40,w:W-1.0,h:0.34,fontSize:12.5,color:C.ink});
    y+=0.90;
  });
  s.addNotes('Write LAAFS on the board vertically and fill it in as you speak.');
}

/* ============ 8. LAAFS NUANCE ============ */
{
  const s=slide(); head(s,'Branch 1 — the nuance','The Word Examiners Build Questions On');
  card(s,M,1.80,W,1.72,C.tintG);
  badge(s,M+0.32,2.06,'!',C.gold,0.5);
  T(s,'“ORDINARILY elected by the inhabitants”',
    {x:M+1.0,y:2.02,w:W-1.3,h:0.4,fontFace:HEAD,fontSize:20,bold:true,color:C.maroon});
  T(s,'Election is a STRONG INDICATOR — not a mandatory condition. That is exactly why the DDA, which is not elected at all, was still held to be a local authority.',
    {x:M+1.0,y:2.48,w:W-1.3,h:0.86,fontSize:14,color:C.ink});
  T(s,'PRELIMS TRAP',{x:M,y:3.74,w:W,h:0.28,fontSize:11,bold:true,color:C.red,charSpacing:1.5});
  T(s,'✗   “An elected body is essential for local-authority status.”   →   FALSE',
    {x:M,y:4.02,w:W,h:0.36,fontSize:15,bold:true,color:C.red});
  T(s,'EXAMPLES OF LOCAL AUTHORITIES',{x:M,y:4.66,w:W,h:0.28,fontSize:11,bold:true,color:C.muted,charSpacing:1.5});
  const eg=['Municipalities','Panchayats','District Boards','Improvement Trusts','Port Commissioners','Town / Notified Area Committees','Development Authorities (DDA)','Mining Boards'];
  const ew=(W-3*0.22)/4;
  eg.forEach((e,i)=>{
    const x=M+(i%4)*(ew+0.22), yy=4.98+Math.floor(i/4)*0.62;
    s.addShape(p.ShapeType.roundRect,{x,y:yy,w:ew,h:0.5,rectRadius:0.08,
      fill:{color:C.tintN},line:{color:C.line,width:0.75}});
    T(s,e,{x:x+0.1,y:yy,w:ew-0.2,h:0.5,fontSize:12,bold:true,color:C.navy,align:'center',valign:'middle'});
  });
  s.addNotes('The DDA point is the clincher — a non-elected body that still qualified.');
}

/* ============ 9. OTHER AUTHORITIES — THE QUESTION ============ */
{
  const s=slide(true);
  T(s,'BRANCH 2',{x:M,y:0.85,w:W,h:0.3,fontSize:11.5,bold:true,color:C.gold,charSpacing:2.5});
  T(s,'“Other Authorities”',{x:M,y:1.18,w:W,h:0.8,fontFace:HEAD,fontSize:40,bold:true,color:C.white});
  T(s,'Article 12 never defines the phrase. Every case since 1954 answers one question:',
    {x:M,y:2.06,w:W,h:0.4,fontSize:15,color:'E8CFD0'});
  card(s,M,2.62,W,1.05,C.maroonDk);
  T(s,'Who ELSE counts as the State?',
    {x:M,y:2.62,w:W,h:1.05,fontFace:HEAD,fontSize:30,bold:true,color:C.gold,align:'center',valign:'middle'});
  T(s,'THE SHIFT TO UNDERSTAND',{x:M,y:3.94,w:W,h:0.28,fontSize:11,bold:true,color:C.gold,charSpacing:1.5});
  T(s,'The courts moved from asking  “HOW was this body born?”   →   to asking  “WHO really controls it?”',
    {x:M,y:4.22,w:W,h:0.74,fontSize:17,bold:true,color:C.white});
  const ph=[['PHASE 1','1954','Narrow view'],['PHASE 2','1962–67','Rejected'],['PHASE 3','1975–81','Instrumentality'],['PHASE 4','2002','The final word']];
  const pw=(W-3*0.28)/4;
  ph.forEach((q,i)=>{
    const x=M+i*(pw+0.28);
    s.addShape(p.ShapeType.roundRect,{x,y:5.10,w:pw,h:1.12,rectRadius:0.08,
      fill:{color:i===3?C.gold:C.maroonDk},line:{color:i===3?C.gold:C.maroonLt,width:1}});
    T(s,q[0],{x:x+0.12,y:5.24,w:pw-0.24,h:0.26,fontSize:11,bold:true,color:i===3?C.maroonDk:C.gold,align:'center',charSpacing:1});
    T(s,q[1],{x:x+0.12,y:5.50,w:pw-0.24,h:0.34,fontFace:HEAD,fontSize:19,bold:true,color:i===3?C.maroonDk:C.white,align:'center'});
    T(s,q[2],{x:x+0.12,y:5.86,w:pw-0.24,h:0.26,fontSize:11.5,color:i===3?C.maroonDk:'E8CFD0',align:'center'});
  });
  s.addNotes('Pause here. This slide is the spine of the whole topic.');
}

/* ============ 10. PHASE 1 & 2 ============ */
{
  const s=slide(); head(s,'Phases 1 & 2','From a Narrow Reading to a Wide One');
  const cw=(W-0.4)/2;
  // Phase 1
  card(s,M,1.80,cw,4.42,C.tintM);
  T(s,'PHASE 1  ·  1954  ·  REJECTED',{x:M+0.3,y:2.00,w:cw-0.6,h:0.28,fontSize:11,bold:true,color:C.red,charSpacing:1.5});
  T(s,'Univ. of Madras v. Santa Bai',{x:M+0.3,y:2.28,w:cw-0.6,h:0.38,fontFace:HEAD,fontSize:19,bold:true,color:C.maroon});
  T(s,'Madras HIGH COURT — not the Supreme Court',{x:M+0.3,y:2.66,w:cw-0.6,h:0.3,fontSize:12,italic:true,color:C.muted});
  T(s,'Applied EJUSDEM GENERIS — “of the same kind”.',{x:M+0.3,y:3.02,w:cw-0.6,h:0.32,fontSize:13.5,bold:true,color:C.navy});
  s.addShape(p.ShapeType.roundRect,{x:M+0.3,y:3.38,w:cw-0.6,h:0.86,rectRadius:0.06,fill:{color:'FFFFFF'},line:{color:C.line,width:0.75}});
  T(s,'In plain words:  “dogs, cats and other animals” means PETS — not lions. The general words take colour from the list before them.',
    {x:M+0.44,y:3.44,w:cw-0.88,h:0.76,fontSize:12,italic:true,color:C.ink});
  T(s,'So: only bodies doing governmental / sovereign functions could be “State”. A university merely teaches → NOT State.',
    {x:M+0.3,y:4.36,w:cw-0.6,h:0.8,fontSize:13,color:C.ink});
  T(s,'✗   NO LONGER GOOD LAW',{x:M+0.3,y:5.60,w:cw-0.6,h:0.4,fontSize:15,bold:true,color:C.red});
  // Phase 2
  const rx=M+cw+0.4;
  card(s,rx,1.80,cw,4.42,C.tintN);
  T(s,'PHASE 2  ·  1962 & 1967  ·  SETTLED',{x:rx+0.3,y:2.00,w:cw-0.6,h:0.28,fontSize:11,bold:true,color:C.green,charSpacing:1.5});
  T(s,'Ujjam Bai (1962)',{x:rx+0.3,y:2.28,w:cw-0.6,h:0.32,fontFace:HEAD,fontSize:17,bold:true,color:C.navy});
  T(s,'Rajasthan SEB v. Mohan Lal (1967)',{x:rx+0.3,y:2.58,w:cw-0.6,h:0.34,fontFace:HEAD,fontSize:19,bold:true,color:C.navy});
  T(s,'Ejusdem generis CANNOT apply here.',{x:rx+0.3,y:3.02,w:cw-0.6,h:0.32,fontSize:13.5,bold:true,color:C.maroon});
  s.addShape(p.ShapeType.roundRect,{x:rx+0.3,y:3.38,w:cw-0.6,h:0.86,rectRadius:0.06,fill:{color:'FFFFFF'},line:{color:C.line,width:0.75}});
  T(s,'Why? Parliament, Government and a Municipality share NO common kind. No common genus → the rule collapses.',
    {x:rx+0.44,y:3.44,w:cw-0.88,h:0.76,fontSize:12,italic:true,color:C.ink});
  T(s,'NEW RULE:  every authority created by the Constitution or by a statute, on whom powers are conferred by law, is “State”.',
    {x:rx+0.3,y:4.36,w:cw-0.6,h:0.86,fontSize:13,color:C.ink});
  T(s,'✓   It NEED NOT perform sovereign functions —\n     it may even be purely COMMERCIAL.',
    {x:rx+0.3,y:5.42,w:cw-0.6,h:0.62,fontSize:13,bold:true,color:C.green});
  s.addNotes('The dogs-cats-lions example makes ejusdem generis click instantly. Use it.');
}

/* ============ 11. PHASE 3 — AJAY HASIA ============ */
{
  const s=slide(); head(s,'Phase 3  ·  1975–1981','Ajay Hasia — Six Tests, Six Plain Questions',
    'The government also acts through societies and companies. So: who is really in charge?');
  const items=[
    ['Who OWNS it?','Share capital held by the Government'],
    ['Who PAYS its bills?','State assistance meets almost the ENTIRE expenditure'],
    ['Who PROTECTS it?','State-conferred or State-protected MONOPOLY status'],
    ['Who RUNS it daily?','DEEP AND PERVASIVE State control'],
    ['What does it DO?','Functions of public importance, closely related to government functions'],
    ['Where did it COME FROM?','A department of Government was transferred to it']
  ];
  const cw=(W-2*0.28)/3, ch=1.72;
  items.forEach((it,i)=>{
    const x=M+(i%3)*(cw+0.28), y=1.98+Math.floor(i/3)*(ch+0.26);
    card(s,x,y,cw,ch,C.tintM);
    badge(s,x+0.22,y+0.20,i+1,C.maroon,0.40);
    T(s,it[0],{x:x+0.72,y:y+0.22,w:cw-0.94,h:0.36,fontSize:15,bold:true,color:C.maroon,valign:'middle'});
    T(s,it[1],{x:x+0.22,y:y+0.72,w:cw-0.44,h:0.86,fontSize:12,color:C.ink});
  });
  card(s,M,5.94,W,0.9,C.tintG);
  T(s,'Not a checklist to tick — the tests are weighed together.     FORM is irrelevant; the SUBSTANCE of control decides. A society, a company, even a private body can be “State”.',
    {x:M+0.28,y:5.94,w:W-0.56,h:0.9,fontSize:13.5,bold:true,color:C.ink,valign:'middle'});
  s.addNotes('Teach the plain questions first, then show the legal wording underneath. Mnemonic: OWNS - PAYS - PROTECTS - RUNS - DOES - CAME FROM.');
}

/* ============ 12. PHASE 4 ============ */
{
  const s=slide(); head(s,'Phase 4  ·  2002','Pradeep Kumar Biswas v. IICB — The Final Word');
  const facts=[['7','JUDGE BENCH'],['5:2','MAJORITY'],['CSIR','HELD TO BE “STATE”'],['1975','SABHAJIT TEWARY OVERRULED']];
  const fw=(W-3*0.26)/4;
  facts.forEach((f,i)=>{
    const x=M+i*(fw+0.26);
    card(s,x,1.72,fw,1.16,C.tintN);
    T(s,f[0],{x:x+0.1,y:1.84,w:fw-0.2,h:0.52,fontFace:HEAD,fontSize:27,bold:true,color:C.navy,align:'center'});
    T(s,f[1],{x:x+0.1,y:2.38,w:fw-0.2,h:0.4,fontSize:10,bold:true,color:C.muted,align:'center',charSpacing:0.8});
  });
  const cw=(W-0.4)/2;
  card(s,M,3.08,cw,2.06,C.tintM);
  T(s,'THE TEST',{x:M+0.28,y:3.26,w:cw-0.56,h:0.28,fontSize:11,bold:true,color:C.maroon,charSpacing:1.5});
  T(s,'The body must be FINANCIALLY, FUNCTIONALLY and ADMINISTRATIVELY dominated by the Government — and that control must be:',
    {x:M+0.28,y:3.56,w:cw-0.56,h:0.72,fontSize:13,color:C.ink});
  T(s,'(a)  “deep and pervasive”\n(b)  particular to that body',
    {x:M+0.28,y:4.32,w:cw-0.56,h:0.68,fontSize:14,bold:true,color:C.navy});
  const rx=M+cw+0.4;
  card(s,rx,3.08,cw,2.06,C.tintG);
  T(s,'THE LINE THAT DECIDES MOST QUESTIONS',{x:rx+0.28,y:3.26,w:cw-0.56,h:0.28,fontSize:11,bold:true,color:C.maroon,charSpacing:1.5});
  T(s,'Mere government funding, patronage or regulation is NOT enough.',
    {x:rx+0.28,y:3.58,w:cw-0.56,h:0.62,fontFace:HEAD,fontSize:18,bold:true,color:C.maroon});
  T(s,'Ask simply: is the government the real BOSS of this body — or only a donor and a regulator?',
    {x:rx+0.28,y:4.30,w:cw-0.56,h:0.72,fontSize:13,italic:true,color:C.ink});
  card(s,M,5.34,W,1.14,C.tintN);
  T(s,'WHY CSIR “FLIPPED”',{x:M+0.28,y:5.48,w:3.2,h:0.28,fontSize:11,bold:true,color:C.navy,charSpacing:1.5});
  T(s,'1975 → NOT State  ·  2002 → State.   CSIR did not change — the TEST changed. Only a larger (7-judge) bench could overrule the earlier 5-judge decision.',
    {x:M+0.28,y:5.76,w:W-0.56,h:0.56,fontSize:13.5,color:C.ink});
  s.addNotes('The CSIR flip confuses students every year. Say it plainly: same body, different test.');
}

/* ============ 13. JUDICIARY ============ */
{
  const s=slide(); head(s,'Section 3','Is the Judiciary “State”?','The answer is split — and the split is the question.');
  const cw=(W-0.4)/2;
  card(s,M,1.92,cw,3.5,C.tintM);
  T(s,'✗   NOT “STATE”',{x:M+0.3,y:2.12,w:cw-0.6,h:0.42,fontFace:HEAD,fontSize:22,bold:true,color:C.red});
  T(s,'when exercising JUDICIAL functions',{x:M+0.3,y:2.54,w:cw-0.6,h:0.3,fontSize:13.5,bold:true,color:C.ink});
  T(s,'Hearing cases · delivering judgments · judicial orders',{x:M+0.3,y:2.88,w:cw-0.6,h:0.34,fontSize:12,italic:true,color:C.muted});
  T(s,'Rationale:  to protect JUDICIAL INDEPENDENCE — a decision cannot itself be attacked as a rights violation, or litigation would never end.',
    {x:M+0.3,y:3.28,w:cw-0.6,h:0.78,fontSize:12.5,color:C.ink});
  T(s,'•  Naresh Shridhar Mirajkar (1966), 9 judges — a judicial order cannot be challenged under Art. 32; the remedy is APPEAL.\n•  Rupa Ashok Hurra (2002) — reaffirmed. Also the CURATIVE PETITION case.',
    {x:M+0.3,y:4.14,w:cw-0.6,h:1.12,fontSize:12.5,color:C.navy});
  const rx=M+cw+0.4;
  card(s,rx,1.92,cw,3.5,C.tintN);
  T(s,'✓   IS “STATE”',{x:rx+0.3,y:2.12,w:cw-0.6,h:0.42,fontFace:HEAD,fontSize:22,bold:true,color:C.green});
  T(s,'when exercising ADMINISTRATIVE or\nRULE-MAKING functions',{x:rx+0.3,y:2.54,w:cw-0.6,h:0.58,fontSize:13.5,bold:true,color:C.ink});
  T(s,'Appointments · service matters · rules under Arts. 145 & 227',
    {x:rx+0.3,y:3.12,w:cw-0.6,h:0.34,fontSize:12,italic:true,color:C.muted});
  T(s,'Here the court acts like any other authority — and is fully bound by Part III.',
    {x:rx+0.3,y:3.56,w:cw-0.6,h:0.62,fontSize:12.5,color:C.ink});
  s.addShape(p.ShapeType.roundRect,{x:rx+0.3,y:4.30,w:cw-0.6,h:0.86,rectRadius:0.06,fill:{color:'FFFFFF'},line:{color:C.line,width:0.75}});
  T(s,'REMEMBER IT AS:\nJudging → NOT State.    Managing → State.',
    {x:rx+0.44,y:4.38,w:cw-0.88,h:0.72,fontSize:13,bold:true,color:C.navy});
  T(s,'PRELIMS TRAP    ✗  “The judiciary is never ‘State’.”  →  FALSE — it is, in its administrative and rule-making capacity.',
    {x:M,y:5.66,w:W,h:0.42,fontSize:13.5,bold:true,color:C.red});
  s.addNotes('Give one concrete example: a Registrar refusing a job to a candidate on caste grounds is challengeable; a judgment against you is not.');
}

/* ============ 14. SCORECARD ============ */
{
  const s=slide(); head(s,'Rapid revision','The Scorecard','State PSCs ask direct case-name to holding matching.');
  const cw=(W-0.4)/2;
  card(s,M,1.90,cw,4.4,C.tintN);
  T(s,'✓   HELD TO BE “STATE”',{x:M+0.3,y:2.08,w:cw-0.6,h:0.4,fontFace:HEAD,fontSize:20,bold:true,color:C.green});
  const yes=['Rajasthan State Electricity Board  —  1967','ONGC, LIC, IFCI  —  Sukhdev Singh, 1975',
    'International Airport Authority  —  R.D. Shetty, 1979','Society running REC Srinagar  —  Ajay Hasia, 1981',
    'Bharat Petroleum (govt. company)  —  Som Prakash Rekhi, 1981','Delhi Development Authority  —  R.C. Jain, 1981',
    'CSIR  —  Pradeep Kumar Biswas, 2002','Municipalities, Panchayats, District Boards'];
  T(s,yes.map(t=>({text:t,options:{bullet:true,breakLine:true}})),
    {x:M+0.3,y:2.58,w:cw-0.6,h:3.5,fontSize:13,color:C.ink,paraSpaceAfter:8});
  const rx=M+cw+0.4;
  card(s,rx,1.90,cw,4.4,C.tintM);
  T(s,'✗   HELD NOT TO BE “STATE”',{x:rx+0.3,y:2.08,w:cw-0.6,h:0.4,fontFace:HEAD,fontSize:20,bold:true,color:C.red});
  const no=['University of Madras  —  Santa Bai, 1954  (reasoning since rejected)',
    'CSIR  —  Sabhajit Tewary, 1975   ⚠  OVERRULED in 2002',
    'NCERT  —  Chander Mohan Khanna, 1991',
    'BCCI  —  Zee Telefilms, 2005',
    'The Judiciary, in its judicial functions'];
  T(s,no.map(t=>({text:t,options:{bullet:true,breakLine:true}})),
    {x:rx+0.3,y:2.58,w:cw-0.6,h:2.4,fontSize:13,color:C.ink,paraSpaceAfter:10});
  s.addShape(p.ShapeType.roundRect,{x:rx+0.3,y:5.10,w:cw-0.6,h:1.02,rectRadius:0.06,fill:{color:C.tintG},line:{color:C.line,width:0.75}});
  T(s,'FAVOURITE TRAP:  CSIR appears on BOTH lists. The 1975 answer is dead; since 2002 CSIR IS “State”.',
    {x:rx+0.44,y:5.10,w:cw-0.88,h:1.02,fontSize:12.5,bold:true,color:C.maroon,valign:'middle'});
  s.addNotes('Drill this slide. Cover one column and ask the class to recall it.');
}

/* ============ 15. NCERT, BCCI, 226 vs 32 ============ */
{
  const s=slide(); head(s,'Applying the test','Two “No” Cases — and the Remedy That Survives');
  const cw=(W-0.4)/2;
  card(s,M,1.80,cw,2.34,C.tintM);
  T(s,'NCERT  ✗   Chander Mohan Khanna (1991)',{x:M+0.28,y:1.98,w:cw-0.56,h:0.36,fontFace:HEAD,fontSize:17,bold:true,color:C.maroon});
  T(s,'Gets government grants — but earns its own income, spends on its own objectives, and government control extends only to whether the grant is properly used. A donor checking receipts, not a boss.',
    {x:M+0.28,y:2.38,w:cw-0.56,h:0.92,fontSize:12.5,color:C.ink});
  T(s,'“A wide enlargement of the meaning must be tempered by a WISE LIMITATION.”',
    {x:M+0.28,y:3.34,w:cw-0.56,h:0.62,fontSize:12.5,italic:true,bold:true,color:C.navy});
  const rx=M+cw+0.4;
  card(s,rx,1.80,cw,2.34,C.tintM);
  T(s,'BCCI  ✗   Zee Telefilms (2005)',{x:rx+0.28,y:1.98,w:cw-0.56,h:0.36,fontFace:HEAD,fontSize:17,bold:true,color:C.maroon});
  T(s,'No statute created it · government holds no share capital · no substantial financial assistance · no deep control. Its monopoly over cricket is DE FACTO — the State never conferred or protected it.',
    {x:rx+0.28,y:2.38,w:cw-0.56,h:0.98,fontSize:12.5,color:C.ink});
  T(s,'2015 — BCCI v. Cricket Assn. of Bihar → Justice Lodha Committee.',
    {x:rx+0.28,y:3.42,w:cw-0.56,h:0.5,fontSize:12,italic:true,color:C.muted});
  card(s,M,4.32,W,2.0,C.tintN);
  T(s,'THE HALF THAT COACHING NOTES CUT OFF',{x:M+0.32,y:4.50,w:W-0.64,h:0.3,fontSize:11,bold:true,color:C.maroon,charSpacing:1.5});
  T(s,'BCCI is not “State” — but it performs a PUBLIC FUNCTION (selecting the national team). So a writ still lies against it in the High Court.',
    {x:M+0.32,y:4.82,w:W-0.64,h:0.6,fontSize:13.5,color:C.ink});
  T(s,'ARTICLE 32   →   only against “State”',{x:M+0.32,y:5.46,w:5.6,h:0.34,fontSize:14,bold:true,color:C.red});
  T(s,'ARTICLE 226   →   also against a PRIVATE body performing a PUBLIC DUTY',{x:M+0.32,y:5.80,w:8.6,h:0.34,fontSize:14,bold:true,color:C.green});
  s.addShape(p.ShapeType.roundRect,{x:9.6,y:5.36,w:3.1,h:0.86,rectRadius:0.06,fill:{color:C.maroon},line:{width:0}});
  T(s,'∴  Art. 226 is\nWIDER than Art. 32',{x:9.6,y:5.36,w:3.1,h:0.86,fontSize:13.5,bold:true,color:C.white,align:'center',valign:'middle'});
  s.addNotes('Andi Mukta v. V.R. Rudani (1989) is the authority for the public-duty writ under 226.');
}

/* ============ 16. KAUSHAL KISHOR ============ */
{
  const s=slide(); head(s,'Latest development  ·  2023','Kaushal Kishor — Rights Go Horizontal',
    'Kaushal Kishor v. State of U.P. (2023) — the strongest value-addition on this topic.');
  card(s,M,1.98,W,1.5,C.tintG);
  T(s,'5-judge Constitution Bench  ·  4 : 1  ·  3 January 2023',{x:M+0.32,y:2.16,w:W-0.64,h:0.3,fontSize:12,bold:true,color:C.muted,charSpacing:1});
  T(s,'Fundamental Rights under ARTICLES 19 and 21 can be enforced even against PRIVATE / NON-STATE ACTORS.',
    {x:M+0.32,y:2.48,w:W-0.64,h:0.86,fontFace:HEAD,fontSize:20,bold:true,color:C.maroon});
  const cw=(W-0.4)/2;
  card(s,M,3.66,cw,1.5,C.tintN);
  T(s,'ALSO HELD',{x:M+0.28,y:3.84,w:cw-0.56,h:0.28,fontSize:11,bold:true,color:C.navy,charSpacing:1.5});
  T(s,'The grounds of restriction listed in Article 19(2) are EXHAUSTIVE — no further grounds can be read in.',
    {x:M+0.28,y:4.14,w:cw-0.56,h:0.86,fontSize:13,color:C.ink});
  const rx=M+cw+0.4;
  card(s,rx,3.66,cw,1.5,C.tintM);
  T(s,'WHY IT MATTERS HERE',{x:rx+0.28,y:3.84,w:cw-0.56,h:0.28,fontSize:11,bold:true,color:C.maroon,charSpacing:1.5});
  T(s,'It DILUTES Article 12’s gatekeeping role. The old binary — State means rights apply, private means they do not — is breaking down.',
    {x:rx+0.28,y:4.14,w:cw-0.56,h:0.9,fontSize:13,color:C.ink});
  T(s,'FUNDAMENTAL RIGHTS ALREADY AVAILABLE AGAINST PRIVATE PERSONS',
    {x:M,y:5.36,w:W,h:0.3,fontSize:11,bold:true,color:C.muted,charSpacing:1.5});
  const hz=[['Art. 15(2)','Access to shops, hotels, wells, roads'],['Art. 17','Abolition of untouchability'],
            ['Art. 23','Trafficking, begar, forced labour'],['Art. 24','No child under 14 in hazardous work']];
  const hw=(W-3*0.24)/4;
  hz.forEach((h,i)=>{
    const x=M+i*(hw+0.24);
    s.addShape(p.ShapeType.roundRect,{x,y:5.68,w:hw,h:0.86,rectRadius:0.08,fill:{color:C.tintN},line:{color:C.line,width:0.75}});
    T(s,h[0],{x:x+0.12,y:5.78,w:hw-0.24,h:0.28,fontSize:13.5,bold:true,color:C.navy,align:'center'});
    T(s,h[1],{x:x+0.12,y:6.06,w:hw-0.24,h:0.42,fontSize:10.5,color:C.ink,align:'center'});
  });
  s.addNotes('Very few aspirants link Kaushal Kishor to Article 12. That link is what separates a good Mains answer.');
}

/* ============ 17. TIMELINE ============ */
{
  const s=slide(); head(s,'Revision','The Chronology at a Glance');
  const evs=[['1954','Santa Bai (HC) — ejusdem generis',0],['1962','Ujjam Bai — rule rejected',0],
    ['1966','Mirajkar (9-J) — judicial orders',0],['1967','Rajasthan SEB — “no common genus”',1],
    ['1975','Sukhdev Singh ✓ | Sabhajit Tewary ✗',0],['1979','R.D. Shetty — five tests',0],
    ['1981','Ajay Hasia (6 tests) · R.C. Jain (LAAFS)',1],['1991','NCERT — not “State”',0],
    ['2002','Pradeep Kumar Biswas (7-J) · Rupa Ashok Hurra',1],['2005','Zee Telefilms — BCCI not “State”',0],
    ['2023','Kaushal Kishor — horizontality',1]];
  const cw=(W-0.4)/2;
  evs.forEach((e,i)=>{
    const col=i<6?0:1, row=i<6?i:i-6;
    const x=M+col*(cw+0.4), y=1.86+row*0.78;
    s.addShape(p.ShapeType.roundRect,{x,y,w:cw,h:0.66,rectRadius:0.06,
      fill:{color:e[2]?C.tintG:C.tintN},line:{color:e[2]?C.gold:C.line,width:e[2]?1.25:0.75}});
    T(s,e[0],{x:x+0.16,y:y,w:1.0,h:0.66,fontFace:HEAD,fontSize:19,bold:true,color:e[2]?C.maroon:C.navy,valign:'middle'});
    T(s,e[1],{x:x+1.22,y:y,w:cw-1.4,h:0.66,fontSize:12.5,color:C.ink,valign:'middle'});
  });
  T(s,'Highlighted years are the four you cannot afford to confuse.',
    {x:M+cw+0.4,y:5.78,w:cw,h:0.4,fontSize:12,italic:true,color:C.muted});
  s.addNotes('Ask the class to recall what happened in 1967, 1981, 2002 and 2023 — the four load-bearing years.');
}

/* ============ 18. TRAPS ============ */
{
  const s=slide(); head(s,'Prelims','Statement-Based Traps');
  const cw=(W-0.4)/2;
  card(s,M,1.88,cw,4.4,C.tintM);
  T(s,'✗   FALSE STATEMENTS',{x:M+0.3,y:2.06,w:cw-0.6,h:0.4,fontFace:HEAD,fontSize:20,bold:true,color:C.red});
  const f=['“Other authorities” is read ejusdem generis','Article 12 defines “State” exhaustively',
    'All PSUs and government companies are automatically “State”','The judiciary is never “State”',
    'BCCI is “State” under Article 12','NCERT is “State” under Article 12',
    'An elected body is essential for local-authority status','Mere government financial aid makes a body “State”'];
  T(s,f.map(t=>({text:t,options:{bullet:true,breakLine:true}})),
    {x:M+0.3,y:2.54,w:cw-0.6,h:3.5,fontSize:13,color:C.ink,paraSpaceAfter:9});
  const rx=M+cw+0.4;
  card(s,rx,1.88,cw,4.4,C.tintN);
  T(s,'✓   TRUE STATEMENTS',{x:rx+0.3,y:2.06,w:cw-0.6,h:0.4,fontFace:HEAD,fontSize:20,bold:true,color:C.green});
  const t2=['The definition is inclusive, not exhaustive','Article 12 governs Part III AND Part IV (via Art. 36)',
    'A body outside India but under GoI control is “State”','A body need not perform sovereign functions — it may be commercial',
    'CSIR is “State” (2002, 7-judge bench)','Article 226 is wider than Article 32',
    'Articles 19 and 21 are now partly horizontal (2023)'];
  T(s,t2.map(t=>({text:t,options:{bullet:true,breakLine:true}})),
    {x:rx+0.3,y:2.54,w:cw-0.6,h:3.5,fontSize:13,color:C.ink,paraSpaceAfter:9});
  s.addNotes('Read each statement aloud and take a show of hands before revealing the column heading.');
}

/* ============ 19. MAINS / CLOSING ============ */
{
  const s=slide(true);
  T(s,'MAINS  ·  GS PAPER II',{x:M,y:0.80,w:W,h:0.3,fontSize:11.5,bold:true,color:C.gold,charSpacing:2.5});
  T(s,'The Argument to Carry Into the Answer Sheet',{x:M,y:1.12,w:W,h:0.66,fontFace:HEAD,fontSize:32,bold:true,color:C.white});
  card(s,M,1.94,W,1.16,C.maroonDk);
  T(s,'The trend is from an INSTITUTIONAL test to a FUNCTIONAL one — what is being done, not who is doing it.',
    {x:M,y:1.94,w:W,h:1.16,fontFace:HEAD,fontSize:21,bold:true,color:C.gold,align:'center',valign:'middle'});
  const cw=(W-0.4)/2;
  card(s,M,3.28,cw,3.0,C.maroonDk);
  T(s,'LIKELY QUESTION FRAMINGS',{x:M+0.3,y:3.48,w:cw-0.6,h:0.3,fontSize:11,bold:true,color:C.gold,charSpacing:1.5});
  T(s,[{text:'“Other authorities” has been judicially expanded far beyond the framers’ contemplation. Examine.',options:{bullet:true,breakLine:true}},
       {text:'Article 12 is the gatekeeper of Part III. In an era of privatisation and PPP, is that gate too narrow?',options:{bullet:true,breakLine:true}},
       {text:'Should the judiciary be brought within the definition of “State”? Discuss.',options:{bullet:true}}],
    {x:M+0.3,y:3.84,w:cw-0.6,h:2.2,fontSize:13,color:C.white,paraSpaceAfter:11});
  const rx=M+cw+0.4;
  card(s,rx,3.28,cw,3.0,C.maroonDk);
  T(s,'VALUE ADDITIONS',{x:rx+0.3,y:3.48,w:cw-0.6,h:0.3,fontSize:11,bold:true,color:C.gold,charSpacing:1.5});
  T(s,[{text:'Ambedkar, Constituent Assembly, 25 Nov 1948',options:{bullet:true,breakLine:true}},
       {text:'NCERT — “tempered by a wise limitation”',options:{bullet:true,breakLine:true}},
       {text:'Pradeep Kumar Biswas — financially, functionally, administratively dominated',options:{bullet:true,breakLine:true}},
       {text:'Kaushal Kishor (2023) — horizontality',options:{bullet:true,breakLine:true}},
       {text:'Comparative: US “state action” doctrine; South Africa binds private persons expressly',options:{bullet:true}}],
    {x:rx+0.3,y:3.82,w:cw-0.6,h:2.42,fontSize:12,color:C.white,paraSpaceAfter:7});
  T(s,'Next: Article 13 — severability, eclipse, waiver.',{x:M,y:6.60,w:W,h:0.34,fontSize:13,italic:true,color:'E8CFD0'});
  s.addNotes('Close on the functional-test line — it is the thesis sentence of any Mains answer here.');
}

const out='/home/user/Claude-upsc-cse/notes/polity/Article-12-Definition-of-State-UPSC.pptx';
p.writeFile({fileName:out}).then(()=>console.log('WROTE',out,'slides:',n));
