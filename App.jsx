import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────
const TIRES = [
  { id:1, brand:"Michelin", model:"Defender2", type:"All-Season", price:159, rating:4.9, mileage:"80,000", badge:"Best Overall", badgeColor:"#C9A84C", emoji:"🛞", climates:["mild","hot","wet"], budgets:["mid","premium"], styles:["commuter","family"], terrains:["highway","city"], scores:{treadLife:10,rideComfort:8,roadNoise:8,tractionBraking:9,handling:8}, pros:["Industry-leading tread life","Exceptionally quiet on highways","Excellent wet-road grip"], affiliatePct:8 },
  { id:2, brand:"Bridgestone", model:"Blizzak WS90", type:"Winter", price:189, rating:4.8, mileage:"40,000", badge:"Top Winter", badgeColor:"#5B9BD5", emoji:"❄️", climates:["cold","snowy"], budgets:["mid","premium"], styles:["commuter","family"], terrains:["city","highway"], scores:{treadLife:6,rideComfort:7,roadNoise:7,tractionBraking:10,handling:8}, pros:["#1-rated snow & ice tire","Confident stopping on ice","Cold-weather compound stays flexible"], affiliatePct:9 },
  { id:3, brand:"Goodyear", model:"Assurance WeatherReady", type:"All-Weather", price:145, rating:4.7, mileage:"60,000", badge:"Best Value", badgeColor:"#4CAF7D", emoji:"🌧️", climates:["wet","mild","cold"], budgets:["value","mid"], styles:["commuter","family"], terrains:["highway","city"], scores:{treadLife:8,rideComfort:8,roadNoise:7,tractionBraking:8,handling:7}, pros:["Three-peak mountain snowflake rated","True year-round versatility","Confident in heavy rain"], affiliatePct:7 },
  { id:4, brand:"Continental", model:"TerrainContact A/T", type:"All-Terrain", price:215, rating:4.6, mileage:"60,000", badge:"Best Adventure", badgeColor:"#E07B39", emoji:"🏔️", climates:["mild","wet","hot"], budgets:["mid","premium"], styles:["adventure","offroad"], terrains:["offroad","mixed"], scores:{treadLife:8,rideComfort:6,roadNoise:6,tractionBraking:8,handling:7}, pros:["Light off-road capable","Reinforced sidewalls","Surprisingly low road noise for AT"], affiliatePct:8 },
  { id:5, brand:"Pirelli", model:"P Zero", type:"Performance", price:249, rating:4.8, mileage:"30,000", badge:"Best Performance", badgeColor:"#D94F4F", emoji:"🏎️", climates:["mild","hot","dry"], budgets:["premium"], styles:["sport","performance"], terrains:["highway","city"], scores:{treadLife:5,rideComfort:7,roadNoise:6,tractionBraking:9,handling:10}, pros:["Razor-sharp steering response","Rock-solid at high speed","Factory fitment on supercars"], affiliatePct:10 },
  { id:6, brand:"Kumho", model:"Solus TA31", type:"All-Season", price:89, rating:4.4, mileage:"50,000", badge:"Best Budget", badgeColor:"#8B5CF6", emoji:"💰", climates:["mild","hot","wet"], budgets:["value"], styles:["commuter","family"], terrains:["city","highway"], scores:{treadLife:7,rideComfort:7,roadNoise:7,tractionBraking:7,handling:6}, pros:["Outstanding price-to-quality ratio","Dependable everyday driver","Fuel-efficient low rolling resistance"], affiliatePct:6 },
];

const SHOPS = [
  { id:1, img:"DT", name:"Discount Tire", address:"1420 Washtenaw Ave", distance:0.8, rating:4.8, reviews:1240, wait:"~45 min", openNow:true, hours:"8am–6pm", price:"$25–$35/tire", badge:"TireRx Partner", badgeColor:"#C9A84C", certified:true, x:62, y:38, services:["Mount & Balance","TPMS Reset","Rotation","Alignment"], brands:["Michelin","Goodyear","Bridgestone"] },
  { id:2, img:"PB", name:"Pep Boys Auto", address:"3975 Packard St", distance:2.1, rating:4.3, reviews:567, wait:"~30 min", openNow:true, hours:"7am–7pm", price:"$20–$30/tire", badge:"Trusted Partner", badgeColor:"#4CAF7D", certified:false, x:28, y:55, services:["Mount & Balance","TPMS Reset","Oil Change"], brands:["Goodyear","Pirelli","Kumho"] },
  { id:3, img:"BT", name:"Belle Tire", address:"2300 S State St", distance:2.7, rating:4.6, reviews:892, wait:"~60 min", openNow:true, hours:"8am–8pm", price:"$22–$32/tire", badge:"TireRx Partner", badgeColor:"#C9A84C", certified:true, x:50, y:72, services:["Mount & Balance","Alignment","TPMS"], brands:["Michelin","BFGoodrich","General"] },
  { id:4, img:"MV", name:"Mavis Discount Tire", address:"500 Eisenhower Pkwy", distance:3.4, rating:4.2, reviews:318, wait:"~90 min", openNow:false, hours:"8am–6pm", price:"$18–$28/tire", badge:"Verified Shop", badgeColor:"#5B9BD5", certified:false, x:72, y:65, services:["Mount & Balance","TPMS Reset"], brands:["Hankook","Toyo","Nexen"] },
  { id:5, img:"TC", name:"Town & Country Tire", address:"710 Airport Blvd", distance:4.2, rating:4.9, reviews:203, wait:"~20 min", openNow:true, hours:"8am–5pm", price:"$30–$45/tire", badge:"Top Rated Local", badgeColor:"#E07B39", certified:true, x:20, y:80, services:["Mount & Balance","Alignment","Custom Wheels"], brands:["Michelin","Pirelli","Nitto"] },
  { id:6, img:"CO", name:"Costco Auto Center", address:"4100 Baldwin Rd", distance:5.1, rating:4.7, reviews:1560, wait:"Same-day appt", openNow:true, hours:"9am–8pm", price:"$21/tire + lifetime rotation", badge:"TireRx Partner", badgeColor:"#C9A84C", certified:true, x:80, y:25, services:["Mount & Balance","Nitrogen Fill","TPMS","Rotation"], brands:["Michelin","Bridgestone","Goodyear"] },
];

const PRIORITIES = [
  { key:"treadLife",       label:"Tread Life",       icon:"⏱", desc:"How long the tire lasts before replacement" },
  { key:"rideComfort",     label:"Ride Comfort",      icon:"🛋", desc:"Smooth, cushioned feel on the road" },
  { key:"roadNoise",       label:"Road Noise",        icon:"🔇", desc:"How quiet the cabin stays at highway speed" },
  { key:"tractionBraking", label:"Safety & Traction", icon:"🛡", desc:"Grip, braking distance, wet-weather safety" },
  { key:"handling",        label:"Handling",          icon:"🎯", desc:"Steering precision and cornering confidence" },
];

// ── Theme ─────────────────────────────────────────────────────
const G = "#C9A84C";   // gold
const GL = "#E8C97A";  // gold light
const T1 = "#FFFFFF";  // primary text
const T2 = "#C8C8D0";  // secondary text
const T3 = "#8A8A96";  // tertiary text
const BG = "#0C0C14";  // background
const CARD = "rgba(255,255,255,0.05)";
const BORDER = "rgba(255,255,255,0.11)";

// ── Helpers ───────────────────────────────────────────────────
function matchTires(p) {
  const top3 = Object.entries(p.priorities).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>k);
  return TIRES.map(t => {
    let s = 0;
    if (p.climate && t.climates.includes(p.climate)) s+=4;
    if (p.budget  && t.budgets.includes(p.budget))   s+=3;
    if (p.style   && t.styles.includes(p.style))     s+=2;
    if (p.terrain && t.terrains.includes(p.terrain)) s+=2;
    top3.forEach(k => s += (t.scores[k]||0)*1.2);
    return {...t, matchScore:Math.round(s)};
  }).sort((a,b)=>b.matchScore-a.matchScore).slice(0,3);
}

function climateFrom(st) {
  if (["AK","VT","NH","ME","NY","MI","MN","WI"].includes(st)) return "snowy";
  if (["ND","SD","MT","WY","CO","ID","PA","OH","IN","IL","IA","MO","NE","KS"].includes(st)) return "cold";
  if (["WA","OR","FL","LA","AL","MS","GA","SC"].includes(st)) return "wet";
  if (["AZ","TX","NM","NV","CA","HI","OK"].includes(st)) return "hot";
  return "mild";
}

const CX = {hot:"☀️",wet:"🌧️",cold:"❄️",snowy:"🌨️",mild:"🌤️"};

// ── Small components ──────────────────────────────────────────
function Stars({r}) {
  return <span style={{display:"inline-flex",alignItems:"center",gap:1}}>
    {[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.round(r)?G:"#333",fontSize:12}}>★</span>)}
    <span style={{fontSize:11,color:GL,marginLeft:4,fontWeight:600}}>{r}</span>
  </span>;
}

function Logo({size=30}) {
  return <div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(135deg,${G},${GL})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.46,flexShrink:0,boxShadow:`0 0 ${size}px rgba(201,168,76,0.3)`}}>🛞</div>;
}

function PBtn({children,onClick,disabled}) {
  return <button onClick={onClick} disabled={disabled} style={{width:"100%",padding:"15px",background:disabled?"rgba(255,255,255,0.07)":`linear-gradient(135deg,${G},${GL})`,border:"none",borderRadius:13,fontSize:15,fontWeight:700,color:disabled?T3:"#0a0a10",cursor:disabled?"not-allowed":"pointer",marginTop:10,letterSpacing:"-0.2px",transition:"opacity 0.18s"}}>{children}</button>;
}

function GBtn({children,onClick}) {
  return <button onClick={onClick} style={{width:"100%",padding:"13px",background:"transparent",border:`1px solid ${BORDER}`,borderRadius:13,fontSize:14,fontWeight:600,color:T3,cursor:"pointer",marginTop:8}}>{children}</button>;
}

function Tag({children,color}) {
  return <span style={{fontSize:11,padding:"4px 10px",borderRadius:99,background:color?"rgba(201,168,76,0.12)":CARD,color:color||T3,border:`1px solid ${color?"rgba(201,168,76,0.25)":BORDER}`,display:"inline-flex",alignItems:"center",gap:4}}>{children}</span>;
}

function FieldLabel({children}) {
  return <div style={{fontSize:12,color:T3,fontWeight:600,marginBottom:6,letterSpacing:"0.3px"}}>{children}</div>;
}

function Input({value,onChange,placeholder,maxLength,inputMode,type}) {
  return <input value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} inputMode={inputMode} type={type}
    style={{width:"100%",padding:"13px 14px",background:"rgba(255,255,255,0.06)",border:`1.5px solid ${BORDER}`,borderRadius:11,color:T1,fontSize:15,outline:"none",marginBottom:2}} />;
}

// ── Shell ─────────────────────────────────────────────────────
function Shell({children,step,total,label,onBack}) {
  return (
    <div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 0%,#1a1a2e 0%,${BG} 60%)`,color:T1,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 20px 70px"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:${BG}}
        input,select,button{font-family:inherit}
        input::placeholder{color:${T3}}
        select option{background:#1a1a2a;color:${T1}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.35);border-radius:3px}
        @keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .su{animation:slideUp 0.32s ease forwards}
        button:active{opacity:0.8}
      `}</style>
      <div className="su" style={{width:"100%",maxWidth:460,paddingTop:24,fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:total?14:22}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Logo/>
            <div>
              <div style={{fontSize:17,fontWeight:800,color:T1,letterSpacing:"-0.5px"}}>TireRx</div>
              {label && <div style={{fontSize:10,color:G,letterSpacing:"0.8px",textTransform:"uppercase",marginTop:1}}>{label}</div>}
            </div>
          </div>
          {onBack && <button onClick={onBack} style={{background:"none",border:"none",color:T3,fontSize:13,cursor:"pointer",padding:"6px 10px"}}>← Back</button>}
        </div>
        {/* Progress */}
        {total && (
          <div style={{marginBottom:22}}>
            <div style={{display:"flex",gap:5,marginBottom:6}}>
              {Array.from({length:total}).map((_,i)=>(
                <div key={i} style={{flex:1,height:3,borderRadius:99,background:i<step?`linear-gradient(90deg,${G},${GL})`:"rgba(255,255,255,0.1)",transition:"background 0.4s"}}/>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:11,color:T3}}>Step {step} of {total}</span>
              <span style={{fontSize:11,color:G,fontWeight:600}}>{Math.round((step/total)*100)}% complete</span>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ── Option Button ─────────────────────────────────────────────
function Opt({icon,label,sub,onClick}) {
  return (
    <button onClick={onClick} style={{background:CARD,border:`1.5px solid ${BORDER}`,borderRadius:14,padding:"15px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,width:"100%",color:T1,marginBottom:10,textAlign:"left",transition:"all 0.18s"}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(201,168,76,0.5)";e.currentTarget.style.background="rgba(201,168,76,0.08)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=BORDER;e.currentTarget.style.background=CARD;}}>
      <span style={{fontSize:26,flexShrink:0}}>{icon}</span>
      <div style={{flex:1}}>
        <div style={{fontWeight:700,fontSize:15,color:T1}}>{label}</div>
        {sub && <div style={{fontSize:12,color:T2,marginTop:3}}>{sub}</div>}
      </div>
      <span style={{color:T3,fontSize:20}}>›</span>
    </button>
  );
}

// ── Map ───────────────────────────────────────────────────────
function MapView({shops,sel,onSel}) {
  return (
    <div style={{width:"100%",height:"100%",background:"#0a0a18",borderRadius:14,overflow:"hidden",position:"relative"}}>
      <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
        {[20,40,60,80].map(n=><g key={n}><line x1={n} y1={0} x2={n} y2={100} stroke="rgba(255,255,255,0.04)" strokeWidth="0.3"/><line x1={0} y1={n} x2={100} y2={n} stroke="rgba(255,255,255,0.04)" strokeWidth="0.3"/></g>)}
        <path d="M5,40 Q35,38 55,37 Q75,36 95,35" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5,62 Q40,60 70,59 Q82,59 95,58" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M48,5 Q49,30 50,55 Q51,75 52,95" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M25,5 Q26,35 27,65 Q28,80 29,95" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.9"/>
        <path d="M72,5 Q73,35 74,65 Q74,80 75,95" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.9"/>
        <rect x="33" y="14" width="10" height="7" fill="rgba(76,175,77,0.1)" rx="1"/>
        <rect x="60" y="68" width="8" height="7" fill="rgba(76,175,77,0.07)" rx="1"/>
        <circle cx="50" cy="50" r="10" fill="rgba(74,168,255,0.08)"/>
        <circle cx="50" cy="50" r="5" fill="rgba(74,168,255,0.2)"/>
        <circle cx="50" cy="50" r="2.5" fill="#4AA8FF"/>
        {shops.map(s=>{
          const on=s.id===sel, pt=s.badge==="TireRx Partner";
          return <g key={s.id} onClick={()=>onSel(s.id)} style={{cursor:"pointer"}}>
            {on && <circle cx={s.x} cy={s.y} r={10} fill="rgba(201,168,76,0.18)"/>}
            <circle cx={s.x} cy={s.y} r={on?6:4} fill={on?G:pt?G:"rgba(255,255,255,0.7)"} stroke={on?GL:"none"} strokeWidth={on?1.5:0}/>
            {on && <text x={s.x} y={s.y-9} textAnchor="middle" fontSize="3.5" fill={GL} fontWeight="bold">{s.name}</text>}
          </g>;
        })}
      </svg>
      <div style={{position:"absolute",bottom:10,left:10,display:"flex",gap:12}}>
        {[["#4AA8FF","You"],[G,"TireRx Partner"],["rgba(255,255,255,0.65)","Shop"]].map(([c,l])=>(
          <div key={l} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:7,height:7,borderRadius:"50%",background:c}}/><span style={{fontSize:9,color:T3}}>{l}</span></div>
        ))}
      </div>
      <div style={{position:"absolute",top:10,right:10,fontSize:10,color:"rgba(255,255,255,0.15)"}}>N ↑</div>
    </div>
  );
}

// ── Booking Modal ─────────────────────────────────────────────
function BookModal({shop,tire,onClose}) {
  const [step,setStep]=useState(1);
  const [date,setDate]=useState(null);
  const [time,setTime]=useState(null);
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const D=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const today=new Date();
  const dates=Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(today.getDate()+i+1);return d;});
  const times=["8:00 AM","9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM","4:00 PM"];
  const busy=["10:00 AM","2:00 PM"];
  const dl=date!==null?`${D[dates[date].getDay()]}, ${M[dates[date].getMonth()]} ${dates[date].getDate()}`:"";

  return (
    <div style={{position:"fixed",inset:0,zIndex:999,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(6px)"}} onClick={onClose}>
      <div style={{width:"100%",maxWidth:460,background:"linear-gradient(180deg,#16162a,#0e0e1c)",border:`1px solid rgba(201,168,76,0.3)`,borderRadius:"22px 22px 0 0",padding:"22px 22px 48px",maxHeight:"92vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{width:40,height:4,background:"rgba(255,255,255,0.15)",borderRadius:99,margin:"0 auto 20px"}}/>

        {step===1 && <>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{width:44,height:44,borderRadius:11,background:"rgba(201,168,76,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:G}}>{shop.img}</div>
            <div><div style={{fontWeight:700,fontSize:16,color:T1}}>{shop.name}</div><div style={{fontSize:12,color:T2,marginTop:2}}>{shop.address}</div></div>
          </div>
          {tire && <div style={{background:"rgba(201,168,76,0.1)",border:`1px solid rgba(201,168,76,0.25)`,borderRadius:11,padding:"11px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:11,color:T3}}>Installing</div><div style={{fontSize:14,fontWeight:700,color:T1,marginTop:2}}>{tire.brand} {tire.model}</div></div>
            <div style={{fontSize:20,fontWeight:800,color:G}}>${tire.price}<span style={{fontSize:11,color:T3}}>/ea</span></div>
          </div>}
          <div style={{fontSize:13,color:T2,fontWeight:600,marginBottom:10}}>Select a date</div>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:18}}>
            {dates.map((d,i)=>(
              <button key={i} onClick={()=>setDate(i)} style={{flexShrink:0,width:54,padding:"10px 0",background:date===i?"rgba(201,168,76,0.18)":CARD,border:`1.5px solid ${date===i?"rgba(201,168,76,0.6)":BORDER}`,borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <span style={{fontSize:10,color:date===i?G:T3,fontWeight:600}}>{D[d.getDay()]}</span>
                <span style={{fontSize:17,fontWeight:700,color:date===i?GL:T1}}>{d.getDate()}</span>
                <span style={{fontSize:9,color:T3}}>{M[d.getMonth()]}</span>
              </button>
            ))}
          </div>
          <div style={{fontSize:13,color:T2,fontWeight:600,marginBottom:10}}>Select a time</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:22}}>
            {times.map(t=>{const b=busy.includes(t);return(
              <button key={t} disabled={b} onClick={()=>!b&&setTime(t)} style={{padding:"10px 4px",background:time===t?"rgba(201,168,76,0.18)":b?"rgba(255,255,255,0.02)":CARD,border:`1px solid ${time===t?"rgba(201,168,76,0.6)":BORDER}`,borderRadius:9,fontSize:12,fontWeight:600,color:b?T3:time===t?GL:T2,cursor:b?"not-allowed":"pointer",textDecoration:b?"line-through":"none"}}>
                {t}
              </button>
            );})}
          </div>
          <PBtn onClick={()=>setStep(2)} disabled={date===null||!time}>Continue →</PBtn>
        </>}

        {step===2 && <>
          <h3 style={{fontWeight:800,fontSize:20,color:T1,marginBottom:4}}>Confirm Your Booking</h3>
          <p style={{fontSize:13,color:T2,marginBottom:16}}>We'll send a text reminder before your appointment.</p>
          <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:16,marginBottom:16}}>
            {[["🏪 Shop",shop.name],["📅 Date",dl],["🕐 Time",time],["💰 Install",shop.price]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{fontSize:13,color:T3}}>{l}</span>
                <span style={{fontSize:13,color:T1,fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
          <FieldLabel>Your Name</FieldLabel>
          <div style={{marginBottom:12}}><Input value={name} onChange={e=>setName(e.target.value)} placeholder="Alex Johnson"/></div>
          <FieldLabel>Phone Number</FieldLabel>
          <div style={{marginBottom:6}}><Input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(734) 555-0100" inputMode="tel"/></div>
          <PBtn onClick={()=>setStep(3)} disabled={!name||!phone}>Confirm Appointment →</PBtn>
          <GBtn onClick={()=>setStep(1)}>← Change Date & Time</GBtn>
        </>}

        {step===3 && (
          <div style={{textAlign:"center",paddingTop:12}}>
            <div style={{fontSize:56,marginBottom:16}}>✅</div>
            <h3 style={{fontWeight:800,fontSize:22,color:GL,marginBottom:8}}>You're All Set!</h3>
            <p style={{fontSize:14,color:T2,lineHeight:1.7,marginBottom:20}}>Your appointment at <strong style={{color:T1}}>{shop.name}</strong> is confirmed. We'll text you a reminder before your visit.</p>
            <div style={{background:"rgba(201,168,76,0.1)",border:`1px solid rgba(201,168,76,0.25)`,borderRadius:14,padding:16,marginBottom:22,textAlign:"left"}}>
              {[["Shop",shop.name],["Date",dl],["Time",time],["Address",shop.address]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:12,color:T3}}>{l}</span>
                  <span style={{fontSize:12,color:T1,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
            <PBtn onClick={onClose}>Done ✓</PBtn>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function TireRx() {
  const [sc,setSc]=useState("welcome");
  const [p,setP]=useState({zip:"",city:"",state:"",climate:"",delivery:"",year:"",make:"",model:"",trimSize:"",vehicle:"",style:"",terrain:"",budget:"mid",priorities:{treadLife:3,rideComfort:3,roadNoise:3,tractionBraking:3,handling:3}});
  const [results,setResults]=useState([]);
  const [tire,setTire]=useState(null);
  const [exp,setExp]=useState(null);
  const [selShop,setSelShop]=useState(null);
  const [booking,setBooking]=useState(null);
  const [shopFilter,setShopFilter]=useState("All");
  const [shopView,setShopView]=useState("list");
  const [shipDone,setShipDone]=useState(false);

  const up=(k,v)=>setP(x=>({...x,[k]:v}));
  const upPri=(k,v)=>setP(x=>({...x,priorities:{...x.priorities,[k]:v}}));
  const go=s=>{setSc(s);setExp(null);window.scrollTo(0,0);};

  const compute=()=>{setResults(matchTires(p));go("results");};

  const restart=()=>{
    setSc("welcome");setTire(null);setResults([]);setExp(null);setSelShop(null);setBooking(null);setShipDone(false);
    setP({zip:"",city:"",state:"",climate:"",delivery:"",year:"",make:"",model:"",trimSize:"",vehicle:"",style:"",terrain:"",budget:"mid",priorities:{treadLife:3,rideComfort:3,roadNoise:3,tractionBraking:3,handling:3}});
  };

  const filteredShops=SHOPS.filter(s=>{
    if(shopFilter==="TireRx Partners") return s.badge==="TireRx Partner";
    if(shopFilter==="Open Now") return s.openNow;
    if(shopFilter==="Top Rated") return s.rating>=4.6;
    return true;
  });

  // ── WELCOME ──────────────────────────────────────────────────
  if(sc==="welcome") return (
    <Shell>
      <div style={{textAlign:"center",paddingTop:20}}>
        <div style={{fontSize:64,marginBottom:18,lineHeight:1}}>🛞</div>
        <h1 style={{fontSize:40,fontWeight:800,letterSpacing:"-1.5px",background:`linear-gradient(135deg,${GL} 0%,${G} 50%,#B8923C 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:12}}>TireRx</h1>
        <p style={{color:T2,fontSize:16,lineHeight:1.7,marginBottom:24}}>The concierge tire service.<br/>We diagnose. We match. We deliver.</p>
        <div style={{display:"flex",justifyContent:"center",gap:24,marginBottom:28}}>
          {[["🩺","Intake Exam"],["🎯","Exact Match"],["📍","Shop or Ship"]].map(([ic,l])=>(
            <div key={l} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <span style={{fontSize:24}}>{ic}</span>
              <span style={{fontSize:12,color:T2,fontWeight:500}}>{l}</span>
            </div>
          ))}
        </div>
        {/* Membership card */}
        <div style={{background:"rgba(201,168,76,0.07)",border:`1px solid rgba(201,168,76,0.25)`,borderRadius:16,padding:20,marginBottom:24,textAlign:"left",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${G},${GL})`}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div>
              <div style={{fontWeight:800,fontSize:18,color:T1}}>TireRx Member</div>
              <div style={{fontSize:12,color:T2,marginTop:3}}>Full concierge access</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:28,fontWeight:800,color:G}}>$0.99</div>
              <div style={{fontSize:11,color:T3}}>/month</div>
            </div>
          </div>
          {["Personalized tire diagnosis & match","Local shop finder + ship to home","Best price across all retailers","Seasonal reminders & safety alerts"].map(f=>(
            <div key={f} style={{display:"flex",gap:10,marginBottom:9}}>
              <span style={{color:G,fontSize:13,marginTop:1}}>✦</span>
              <span style={{fontSize:14,color:T2}}>{f}</span>
            </div>
          ))}
        </div>
        <PBtn onClick={()=>go("location")}>Start My Free Consultation →</PBtn>
        <p style={{fontSize:12,color:T3,marginTop:10}}>No credit card required to start</p>
      </div>
    </Shell>
  );

  // ── LOCATION ─────────────────────────────────────────────────
  if(sc==="location") return (
    <Shell step={1} total={5} label="Your Location" onBack={()=>go("welcome")}>
      <h2 style={{fontWeight:800,fontSize:24,color:T1,marginBottom:6}}>Where are you located?</h2>
      <p style={{fontSize:14,color:T2,lineHeight:1.6,marginBottom:20}}>We detect your climate zone and find installers near you.</p>

      <div style={{display:"flex",gap:10,marginBottom:14}}>
        <div style={{flex:1}}>
          <FieldLabel>ZIP Code</FieldLabel>
          <Input value={p.zip} onChange={e=>up("zip",e.target.value)} placeholder="48104" maxLength={5} inputMode="numeric"/>
        </div>
        <div style={{width:90}}>
          <FieldLabel>State</FieldLabel>
          <select value={p.state} onChange={e=>{up("state",e.target.value);up("climate",climateFrom(e.target.value));}} style={{width:"100%",padding:"13px 8px",background:"rgba(255,255,255,0.06)",border:`1.5px solid ${BORDER}`,borderRadius:11,color:T1,fontSize:14,outline:"none"}}>
            <option value="">--</option>
            {["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div style={{marginBottom:16}}>
        <FieldLabel>City</FieldLabel>
        <Input value={p.city} onChange={e=>up("city",e.target.value)} placeholder="Ann Arbor"/>
      </div>

      {p.climate && (
        <div style={{background:"rgba(201,168,76,0.1)",border:`1px solid rgba(201,168,76,0.3)`,borderRadius:11,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24}}>{CX[p.climate]}</span>
          <div>
            <div style={{fontSize:13,color:T3}}>Climate zone detected</div>
            <div style={{fontSize:15,fontWeight:700,color:GL,textTransform:"capitalize",marginTop:1}}>{p.climate} climate</div>
          </div>
        </div>
      )}

      <FieldLabel>How would you like your tires delivered?</FieldLabel>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:6}}>
        {[{val:"shop",icon:"🏪",label:"Install at a local shop",sub:"We find certified installers near you"},{val:"ship",icon:"📦",label:"Ship directly to my home",sub:"Order online, delivered to your door"},{val:"both",icon:"✦",label:"Show me both options",sub:"I'll decide after seeing my matches"}].map(opt=>(
          <button key={opt.val} onClick={()=>up("delivery",opt.val)} style={{background:p.delivery===opt.val?"rgba(201,168,76,0.1)":CARD,border:`1.5px solid ${p.delivery===opt.val?"rgba(201,168,76,0.5)":BORDER}`,borderRadius:13,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",transition:"all 0.18s"}}>
            <span style={{fontSize:24}}>{opt.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,color:p.delivery===opt.val?GL:T1}}>{opt.label}</div>
              <div style={{fontSize:12,color:T2,marginTop:3}}>{opt.sub}</div>
            </div>
            {p.delivery===opt.val ? <span style={{color:G,fontSize:18}}>✓</span> : <span style={{color:T3,fontSize:18}}>›</span>}
          </button>
        ))}
      </div>
      <PBtn onClick={()=>go("vehicle")} disabled={!p.zip||!p.state||!p.delivery}>Continue →</PBtn>
    </Shell>
  );

  // ── VEHICLE ───────────────────────────────────────────────────
  if(sc==="vehicle") return (
    <Shell step={2} total={5} label="Your Vehicle" onBack={()=>go("location")}>
      <h2 style={{fontWeight:800,fontSize:24,color:T1,marginBottom:6}}>Tell us about your vehicle</h2>
      <p style={{fontSize:14,color:T2,marginBottom:20}}>Tire size is matched to your exact vehicle.</p>

      <div style={{display:"flex",gap:10,marginBottom:14}}>
        <div style={{width:95}}>
          <FieldLabel>Year</FieldLabel>
          <Input value={p.year} onChange={e=>up("year",e.target.value)} placeholder="2021" maxLength={4} inputMode="numeric"/>
        </div>
        <div style={{flex:1}}>
          <FieldLabel>Make</FieldLabel>
          <Input value={p.make} onChange={e=>up("make",e.target.value)} placeholder="Toyota"/>
        </div>
      </div>

      <div style={{marginBottom:14}}>
        <FieldLabel>Model</FieldLabel>
        <Input value={p.model} onChange={e=>up("model",e.target.value)} placeholder="RAV4"/>
      </div>

      <div style={{marginBottom:20}}>
        <FieldLabel>Tire Size <span style={{color:T3,fontWeight:400}}>(optional — found on door jamb sticker)</span></FieldLabel>
        <Input value={p.trimSize} onChange={e=>up("trimSize",e.target.value)} placeholder="e.g. 225/65R17"/>
      </div>

      <FieldLabel>Vehicle Type</FieldLabel>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:6}}>
        {[["sedan","🚗","Sedan / Coupe"],["suv","🚙","SUV / Crossover"],["truck","🛻","Truck / Van"],["sport","🏎️","Sports Car"]].map(([val,ic,l])=>(
          <button key={val} onClick={()=>up("vehicle",val)} style={{padding:"16px 8px",background:p.vehicle===val?"rgba(201,168,76,0.1)":CARD,border:`1.5px solid ${p.vehicle===val?"rgba(201,168,76,0.55)":BORDER}`,borderRadius:13,color:p.vehicle===val?GL:T2,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,fontSize:13,fontWeight:600,transition:"all 0.18s"}}>
            <span style={{fontSize:28}}>{ic}</span>{l}
          </button>
        ))}
      </div>
      <PBtn onClick={()=>go("style")} disabled={!p.make||!p.model||!p.vehicle}>Continue →</PBtn>
    </Shell>
  );

  // ── DRIVING STYLE ─────────────────────────────────────────────
  if(sc==="style") return (
    <Shell step={3} total={5} label="Driving Style" onBack={()=>go("vehicle")}>
      <h2 style={{fontWeight:800,fontSize:24,color:T1,marginBottom:6}}>How do you drive?</h2>
      <p style={{fontSize:14,color:T2,marginBottom:20}}>Your driving style shapes the tire recommendation.</p>
      <Opt icon="🏙️" label="City Commuter" sub="Stop-and-go traffic, short daily trips" onClick={()=>{up("style","commuter");go("terrain");}}/>
      <Opt icon="🛣️" label="Highway Cruiser" sub="Long distances, interstate driving" onClick={()=>{up("style","family");go("terrain");}}/>
      <Opt icon="🏕️" label="Weekend Adventurer" sub="Trails, gravel roads, outdoors" onClick={()=>{up("style","adventure");go("terrain");}}/>
      <Opt icon="⚡" label="Spirited Driver" sub="Loves corners, performance, speed" onClick={()=>{up("style","sport");go("terrain");}}/>
    </Shell>
  );

  // ── TERRAIN ───────────────────────────────────────────────────
  if(sc==="terrain") return (
    <Shell step={4} total={5} label="Road Type" onBack={()=>go("style")}>
      <h2 style={{fontWeight:800,fontSize:24,color:T1,marginBottom:6}}>Where do you mostly drive?</h2>
      <p style={{fontSize:14,color:T2,marginBottom:20}}>Road surface determines the tread pattern we recommend.</p>
      <Opt icon="🏘️" label="City & Suburbs" sub="Paved roads and parking lots" onClick={()=>{up("terrain","city");go("priorities");}}/>
      <Opt icon="🛣️" label="Mostly Highways" sub="Interstate and smooth pavement" onClick={()=>{up("terrain","highway");go("priorities");}}/>
      <Opt icon="🌲" label="Mix of Roads" sub="Highways plus some gravel or dirt" onClick={()=>{up("terrain","mixed");go("priorities");}}/>
      <Opt icon="⛰️" label="Off-Road & Rough Terrain" sub="Mud, rocks, and unpaved roads" onClick={()=>{up("terrain","offroad");go("priorities");}}/>
    </Shell>
  );

  // ── PRIORITIES ────────────────────────────────────────────────
  if(sc==="priorities") return (
    <Shell step={5} total={5} label="Your Priorities" onBack={()=>go("terrain")}>
      <h2 style={{fontWeight:800,fontSize:24,color:T1,marginBottom:6}}>What matters most to you?</h2>
      <p style={{fontSize:14,color:T2,marginBottom:20}}>Rate each from 1 to 5 — this builds your personal tire profile.</p>

      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:22}}>
        {PRIORITIES.map(pr=>(
          <div key={pr.key} style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:13,padding:"15px 16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <span style={{fontSize:20}}>{pr.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:T1}}>{pr.label}</div>
                <div style={{fontSize:12,color:T2,marginTop:2}}>{pr.desc}</div>
              </div>
              <div style={{fontSize:22,fontWeight:800,color:G,minWidth:20,textAlign:"right"}}>{p.priorities[pr.key]}</div>
            </div>
            <div style={{display:"flex",gap:7}}>
              {[1,2,3,4,5].map(n=>(
                <button key={n} onClick={()=>upPri(pr.key,n)} style={{flex:1,height:8,borderRadius:99,border:"none",cursor:"pointer",background:n<=p.priorities[pr.key]?`linear-gradient(90deg,${G},${GL})`:"rgba(255,255,255,0.1)",transition:"all 0.15s"}}/>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
              <span style={{fontSize:10,color:T3}}>Not important</span>
              <span style={{fontSize:10,color:T3}}>Critical</span>
            </div>
          </div>
        ))}
      </div>

      <FieldLabel>Budget Per Tire</FieldLabel>
      <div style={{display:"flex",gap:10,marginBottom:6}}>
        {[["value","Value","Under $100"],["mid","Mid-Range","$100–$175"],["premium","Premium","$175+"]].map(([val,l,s])=>(
          <button key={val} onClick={()=>up("budget",val)} style={{flex:1,padding:"13px 6px",background:p.budget===val?"rgba(201,168,76,0.12)":CARD,border:`1.5px solid ${p.budget===val?"rgba(201,168,76,0.55)":BORDER}`,borderRadius:11,color:p.budget===val?GL:T2,cursor:"pointer",textAlign:"center",transition:"all 0.18s"}}>
            <div style={{fontWeight:700,fontSize:14}}>{l}</div>
            <div style={{fontSize:11,color:p.budget===val?G:T3,marginTop:3}}>{s}</div>
          </button>
        ))}
      </div>
      <PBtn onClick={compute}>Get My Recommendation →</PBtn>
    </Shell>
  );

  // ── RESULTS ───────────────────────────────────────────────────
  if(sc==="results") return (
    <Shell onBack={()=>go("priorities")}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:"#4CAF7D"}}/>
        <span style={{fontSize:12,color:"#4CAF7D",fontWeight:700,letterSpacing:"0.5px"}}>DIAGNOSIS COMPLETE</span>
      </div>
      <h2 style={{fontWeight:800,fontSize:24,color:T1,marginBottom:16}}>Your Prescription</h2>

      {/* Profile summary */}
      <div style={{background:"rgba(201,168,76,0.08)",border:`1px solid rgba(201,168,76,0.22)`,borderRadius:14,padding:16,marginBottom:20}}>
        <div style={{fontSize:15,fontWeight:700,color:T1,marginBottom:10}}>{p.year} {p.make} {p.model}{p.trimSize?` · ${p.trimSize}`:""}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
          {[p.city&&`📍 ${p.city}, ${p.state}`,p.climate&&`${CX[p.climate]} ${p.climate} climate`,`💰 ${p.budget} budget`,p.delivery&&`${p.delivery==="shop"?"🏪":p.delivery==="ship"?"📦":"✦"} ${p.delivery==="shop"?"local install":p.delivery==="ship"?"ship home":"shop or ship"}`].filter(Boolean).map(t=><Tag key={t}>{t}</Tag>)}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {Object.entries(p.priorities).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>{
            const pr=PRIORITIES.find(x=>x.key===k);
            return <Tag key={k} color={G}>{pr.icon} {pr.label}</Tag>;
          })}
        </div>
      </div>

      <p style={{fontSize:13,color:T2,marginBottom:16}}>Tap a tire to see full details, then choose how to get it.</p>

      {results.map((t,idx)=>(
        <div key={t.id} onClick={()=>setExp(exp===t.id?null:t.id)} style={{background:exp===t.id?"rgba(201,168,76,0.08)":idx===0?"rgba(201,168,76,0.05)":CARD,border:`1.5px solid ${exp===t.id?"rgba(201,168,76,0.5)":idx===0?"rgba(201,168,76,0.22)":BORDER}`,borderRadius:16,padding:16,marginBottom:12,cursor:"pointer",position:"relative",overflow:"hidden",transition:"all 0.2s"}}>
          {idx===0&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${G},${GL})`}}/>}
          <div style={{display:"flex",gap:13,alignItems:"flex-start"}}>
            <div style={{width:48,height:48,borderRadius:12,flexShrink:0,background:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{t.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <span style={{fontWeight:800,fontSize:16,color:T1}}>{t.brand}</span>
                    <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:99,background:t.badgeColor+"22",color:t.badgeColor,border:`1px solid ${t.badgeColor}44`}}>{t.badge}</span>
                  </div>
                  <div style={{fontSize:13,color:T2,marginTop:3}}>{t.model} · {t.type}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:22,fontWeight:800,color:G}}>${t.price}</div>
                  <div style={{fontSize:11,color:T3}}>per tire</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8,flexWrap:"wrap"}}>
                <Stars r={t.rating}/>
                <Tag>⏱ {t.mileage} mi</Tag>
              </div>
              {/* Score bars */}
              <div style={{display:"flex",gap:4,marginTop:10}}>
                {PRIORITIES.map(pr=>(
                  <div key={pr.key} title={`${pr.label}: ${t.scores[pr.key]}/10`} style={{flex:1}}>
                    <div style={{height:4,borderRadius:99,background:"rgba(255,255,255,0.08)",overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${t.scores[pr.key]*10}%`,background:p.priorities[pr.key]>=4?`linear-gradient(90deg,${G},${GL})`:"rgba(255,255,255,0.28)",borderRadius:99}}/>
                    </div>
                    <div style={{fontSize:9,color:T3,textAlign:"center",marginTop:3}}>{pr.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {exp===t.id && (
            <div style={{marginTop:16,paddingTop:14,borderTop:`1px solid ${BORDER}`}}>
              {t.pros.map((pro,i)=>(
                <div key={i} style={{display:"flex",gap:10,marginBottom:9}}>
                  <span style={{color:"#4CAF7D",fontSize:14,flexShrink:0}}>✓</span>
                  <span style={{fontSize:14,color:T2,lineHeight:1.4}}>{pro}</span>
                </div>
              ))}
              <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:10}}>
                {(p.delivery==="shop"||p.delivery==="both") && (
                  <button onClick={e=>{e.stopPropagation();setTire(t);go("shopfinder");}} style={{width:"100%",padding:"14px",background:`linear-gradient(135deg,${G},${GL})`,border:"none",borderRadius:12,fontSize:15,fontWeight:700,color:"#0a0a10",cursor:"pointer"}}>
                    🏪 Find a Shop & Book Install
                  </button>
                )}
                {(p.delivery==="ship"||p.delivery==="both") && (
                  <button onClick={e=>{e.stopPropagation();setTire(t);go("ship");}} style={{width:"100%",padding:"14px",background:"rgba(255,255,255,0.07)",border:`1px solid ${BORDER}`,borderRadius:12,fontSize:15,fontWeight:700,color:T1,cursor:"pointer"}}>
                    📦 Ship to My Home
                  </button>
                )}
              </div>
              <p style={{fontSize:11,color:T3,textAlign:"center",marginTop:10}}>TireRx earns {t.affiliatePct}% affiliate commission · Your price is the same</p>
            </div>
          )}
          {exp!==t.id && <div style={{marginTop:10,fontSize:12,color:T3,textAlign:"center"}}>Tap to see full details</div>}
        </div>
      ))}
      <GBtn onClick={restart}>↺ Start New Consultation</GBtn>
    </Shell>
  );

  // ── SHIP TO HOME ──────────────────────────────────────────────
  if(sc==="ship"&&tire) {
    if(shipDone) return (
      <Shell>
        <div style={{textAlign:"center",paddingTop:20}}>
          <div style={{fontSize:58,marginBottom:16}}>📦</div>
          <h2 style={{fontWeight:800,fontSize:24,color:GL,marginBottom:10}}>Order Placed!</h2>
          <p style={{fontSize:15,color:T2,lineHeight:1.7,marginBottom:22}}>Your <strong style={{color:T1}}>{tire.brand} {tire.model}</strong> tires are on their way. Expect delivery in 2–4 business days.</p>
          <div style={{background:"rgba(201,168,76,0.09)",border:`1px solid rgba(201,168,76,0.25)`,borderRadius:14,padding:18,marginBottom:24,textAlign:"left"}}>
            {[["Tire",`${tire.brand} ${tire.model}`],["Quantity","4 tires"],["Ship to",`${p.city||"Your city"}, ${p.state} ${p.zip}`],["Total",`$${tire.price*4}`],["Est. Delivery","2–4 business days"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{fontSize:13,color:T3}}>{l}</span>
                <span style={{fontSize:13,color:T1,fontWeight:600,maxWidth:"60%",textAlign:"right"}}>{v}</span>
              </div>
            ))}
          </div>
          <PBtn onClick={restart}>Start a New Consultation</PBtn>
        </div>
      </Shell>
    );
    return (
      <Shell label="Ship to Home" onBack={()=>go("results")}>
        <h2 style={{fontWeight:800,fontSize:24,color:T1,marginBottom:6}}>Confirm Your Order</h2>
        <p style={{fontSize:14,color:T2,marginBottom:18}}>Tires shipped directly to your door — free.</p>
        <div style={{background:"rgba(201,168,76,0.08)",border:`1px solid rgba(201,168,76,0.25)`,borderRadius:15,padding:18,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:16}}>
            <div style={{fontSize:32}}>{tire.emoji}</div>
            <div><div style={{fontWeight:700,fontSize:16,color:T1}}>{tire.brand} {tire.model}</div><div style={{fontSize:13,color:T2,marginTop:2}}>{tire.type} · {tire.mileage} mi warranty</div></div>
            <div style={{marginLeft:"auto",textAlign:"right"}}><div style={{fontSize:22,fontWeight:800,color:G}}>${tire.price}</div><div style={{fontSize:11,color:T3}}>per tire</div></div>
          </div>
          {[["Quantity","4 tires"],["Subtotal",`$${tire.price*4}`],["Shipping","Free"],["Retailer","Tire Rack (affiliate partner)"]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:9}}>
              <span style={{fontSize:13,color:T3}}>{l}</span>
              <span style={{fontSize:13,color:T2,fontWeight:600}}>{v}</span>
            </div>
          ))}
          <div style={{borderTop:`1px solid ${BORDER}`,paddingTop:11,marginTop:6,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:15,fontWeight:700,color:T1}}>Total (tires only)</span>
            <span style={{fontSize:15,fontWeight:800,color:G}}>${tire.price*4}</span>
          </div>
        </div>
        <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{fontSize:12,color:T3,marginBottom:6}}>📍 Shipping to</div>
          <div style={{fontSize:14,fontWeight:600,color:T1}}>{p.city||"Your city"}, {p.state} {p.zip}</div>
          <div style={{fontSize:12,color:T2,marginTop:4}}>Free shipping · 2–4 business days</div>
        </div>
        <div style={{background:"rgba(201,168,76,0.08)",border:`1px solid rgba(201,168,76,0.2)`,borderRadius:11,padding:13,marginBottom:16,display:"flex",gap:12,alignItems:"flex-start"}}>
          <span style={{fontSize:18}}>🤝</span>
          <p style={{fontSize:12,color:T2,margin:0,lineHeight:1.6}}>TireRx earns a <strong style={{color:T1}}>{tire.affiliatePct}% commission</strong> from Tire Rack on this purchase — at no extra cost to you. This is how we keep your membership at just $0.99/mo.</p>
        </div>
        <PBtn onClick={()=>setShipDone(true)}>Place Order via Tire Rack →</PBtn>
        <GBtn onClick={()=>go("results")}>← Back to Options</GBtn>
      </Shell>
    );
  }

  // ── SHOP FINDER ───────────────────────────────────────────────
  if(sc==="shopfinder"&&tire) return (
    <div style={{minHeight:"100vh",background:`radial-gradient(ellipse at 50% 0%,#1a1a2e,${BG})`,color:T1,display:"flex",flexDirection:"column",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <style>{`*{box-sizing:border-box}button,input{font-family:inherit}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.35);border-radius:3px}@keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fu{animation:fu 0.28s ease forwards}`}</style>

      {/* Sticky header */}
      <div style={{background:"rgba(12,12,20,0.97)",borderBottom:`1px solid ${BORDER}`,padding:"14px 18px",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(14px)"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Logo size={28}/>
              <div><div style={{fontSize:15,fontWeight:800,color:T1}}>TireRx</div><div style={{fontSize:9,color:G,letterSpacing:"0.8px"}}>SHOP FINDER</div></div>
            </div>
            <div style={{background:"rgba(201,168,76,0.12)",border:`1px solid rgba(201,168,76,0.3)`,borderRadius:99,padding:"6px 13px",display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:15}}>{tire.emoji}</span>
              <span style={{fontSize:13,fontWeight:700,color:GL}}>{tire.brand} {tire.model}</span>
              <span style={{fontSize:12,color:G,fontWeight:600}}>${tire.price}</span>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2}}>
              {["All","TireRx Partners","Open Now","Top Rated"].map(f=>(
                <button key={f} onClick={()=>setShopFilter(f)} style={{flexShrink:0,padding:"6px 13px",borderRadius:99,border:`1px solid ${shopFilter===f?"rgba(201,168,76,0.55)":BORDER}`,background:shopFilter===f?"rgba(201,168,76,0.14)":"rgba(255,255,255,0.04)",color:shopFilter===f?GL:T3,fontSize:12,fontWeight:shopFilter===f?700:500,cursor:"pointer",transition:"all 0.18s"}}>
                  {f}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:5,flexShrink:0,marginLeft:10}}>
              {[["list","☰"],["map","◉"],["split","⊞"]].map(([m,ic])=>(
                <button key={m} onClick={()=>setShopView(m)} style={{width:28,height:28,borderRadius:7,background:shopView===m?"rgba(201,168,76,0.18)":"rgba(255,255,255,0.05)",border:`1px solid ${shopView===m?"rgba(201,168,76,0.45)":BORDER}`,color:shopView===m?G:T3,cursor:"pointer",fontSize:13}}>
                  {ic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{flex:1,maxWidth:900,margin:"0 auto",width:"100%",padding:"16px 18px 50px"}}>
        {/* Location bar */}
        <div style={{background:"rgba(201,168,76,0.07)",border:`1px solid rgba(201,168,76,0.2)`,borderRadius:12,padding:"11px 15px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:16}}>📍</span>
          <span style={{fontSize:14,color:T1,fontWeight:600}}>{p.city||"Ann Arbor"}, {p.state||"MI"}</span>
          <span style={{fontSize:12,color:T2,marginLeft:4}}>{filteredShops.length} shops nearby</span>
          <button onClick={()=>go("results")} style={{marginLeft:"auto",background:"none",border:"none",color:T3,fontSize:12,cursor:"pointer"}}>← Results</button>
        </div>

        {/* Stats */}
        <div style={{display:"flex",gap:20,marginBottom:16,flexWrap:"wrap"}}>
          {[[filteredShops.length,"shops"],[filteredShops.filter(s=>s.openNow).length,"open now"],[filteredShops.filter(s=>s.badge==="TireRx Partner").length,"TireRx partners"]].map(([v,l])=>(
            <div key={l} style={{display:"flex",alignItems:"baseline",gap:5}}>
              <span style={{fontSize:18,fontWeight:800,color:G}}>{v}</span>
              <span style={{fontSize:12,color:T2}}>{l}</span>
            </div>
          ))}
        </div>

        {/* LIST */}
        {shopView==="list" && filteredShops.map(s=>(
          <div key={s.id} className="fu" onClick={()=>setSelShop(selShop===s.id?null:s.id)} style={{background:selShop===s.id?"rgba(201,168,76,0.08)":CARD,border:`1.5px solid ${selShop===s.id?"rgba(201,168,76,0.5)":BORDER}`,borderRadius:16,padding:16,marginBottom:11,cursor:"pointer",position:"relative",overflow:"hidden",transition:"all 0.2s"}}>
            {selShop===s.id&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${G},${GL})`}}/>}
            <div style={{display:"flex",gap:13}}>
              <div style={{width:44,height:44,borderRadius:10,flexShrink:0,background:selShop===s.id?"rgba(201,168,76,0.18)":"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:selShop===s.id?G:T3}}>{s.img}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:700,fontSize:15,color:T1}}>{s.name}</span>{s.certified&&<span style={{fontSize:10,color:G}}>✦</span>}</div>
                    <div style={{fontSize:12,color:T2,marginTop:2}}>{s.address}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:14,fontWeight:700,color:G}}>{s.distance} mi</div>
                    <div style={{fontSize:11,color:s.openNow?"#4CAF7D":T3,fontWeight:600,marginTop:2}}>{s.openNow?"● Open":"○ Closed"}</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8,flexWrap:"wrap"}}>
                  <Stars r={s.rating}/>
                  <span style={{fontSize:11,color:T3}}>({s.reviews.toLocaleString()})</span>
                  <span style={{fontSize:11,padding:"2px 8px",borderRadius:99,background:s.badgeColor+"18",color:s.badgeColor,border:`1px solid ${s.badgeColor}33`,fontWeight:600}}>{s.badge}</span>
                </div>
                <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                  {[s.wait,s.hours,s.price].map(t=><Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </div>
            {selShop===s.id && (
              <div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${BORDER}`}}>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:12,color:T3,fontWeight:600,marginBottom:6}}>SERVICES</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{s.services.map(sv=><span key={sv} style={{fontSize:12,padding:"4px 10px",borderRadius:99,background:"rgba(255,255,255,0.06)",color:T2,border:`1px solid rgba(201,168,76,0.18)`}}>{sv}</span>)}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                  {[["📞","Call"],["🗺️","Directions"]].map(([ic,l])=>(
                    <button key={l} onClick={e=>e.stopPropagation()} style={{padding:"11px 6px",background:"rgba(255,255,255,0.05)",border:`1px solid ${BORDER}`,borderRadius:11,color:T2,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontSize:12,fontWeight:600}}>
                      <span style={{fontSize:18}}>{ic}</span>{l}
                    </button>
                  ))}
                  <button onClick={e=>{e.stopPropagation();setBooking(s);}} style={{padding:"11px 6px",background:"rgba(201,168,76,0.16)",border:`1px solid rgba(201,168,76,0.45)`,borderRadius:11,color:GL,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontSize:12,fontWeight:700}}>
                    <span style={{fontSize:18}}>📅</span>Book
                  </button>
                </div>
              </div>
            )}
            {selShop!==s.id && <div style={{marginTop:10,fontSize:12,color:T3,textAlign:"center"}}>Tap to see details & book</div>}
          </div>
        ))}

        {/* MAP */}
        {shopView==="map" && (
          <div style={{height:"calc(100vh - 230px)",position:"relative",borderRadius:14,overflow:"hidden"}}>
            <MapView shops={filteredShops} sel={selShop} onSel={id=>setSelShop(id===selShop?null:id)}/>
            {selShop&&(()=>{const s=SHOPS.find(x=>x.id===selShop);return s?(
              <div style={{position:"absolute",bottom:12,left:12,right:12,background:"rgba(12,12,20,0.97)",border:`1px solid rgba(201,168,76,0.35)`,borderRadius:13,padding:"13px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",backdropFilter:"blur(12px)"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:T1}}>{s.name}</div>
                  <div style={{fontSize:12,color:T2,marginTop:2}}>{s.distance} mi · {s.wait} · {s.openNow?"Open":"Closed"}</div>
                </div>
                <button onClick={()=>setBooking(s)} style={{padding:"10px 18px",background:`linear-gradient(135deg,${G},${GL})`,border:"none",borderRadius:10,fontSize:13,fontWeight:700,color:"#0a0a10",cursor:"pointer"}}>Book →</button>
              </div>
            ):null;})()}
          </div>
        )}

        {/* SPLIT */}
        {shopView==="split" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{overflowY:"auto",maxHeight:"calc(100vh - 230px)"}}>
              {filteredShops.map(s=>(
                <div key={s.id} className="fu" onClick={()=>setSelShop(selShop===s.id?null:s.id)} style={{background:selShop===s.id?"rgba(201,168,76,0.08)":CARD,border:`1.5px solid ${selShop===s.id?"rgba(201,168,76,0.45)":BORDER}`,borderRadius:13,padding:13,marginBottom:10,cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:38,height:38,borderRadius:9,background:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:T3,flexShrink:0}}>{s.img}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:14,color:T1}}>{s.name}</div>
                      <div style={{fontSize:11,color:T2,marginTop:2}}>{s.distance} mi · <span style={{color:s.openNow?"#4CAF7D":T3}}>{s.openNow?"Open":"Closed"}</span></div>
                    </div>
                    {selShop===s.id&&<button onClick={e=>{e.stopPropagation();setBooking(s);}} style={{padding:"7px 14px",background:`linear-gradient(135deg,${G},${GL})`,border:"none",borderRadius:8,fontSize:12,fontWeight:700,color:"#0a0a10",cursor:"pointer",flexShrink:0}}>Book</button>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{height:"calc(100vh - 230px)",borderRadius:14,overflow:"hidden",position:"relative"}}>
              <MapView shops={filteredShops} sel={selShop} onSel={id=>setSelShop(id===selShop?null:id)}/>
              {selShop&&(()=>{const s=SHOPS.find(x=>x.id===selShop);return s?(
                <div style={{position:"absolute",bottom:10,left:10,right:10,background:"rgba(12,12,20,0.96)",border:`1px solid rgba(201,168,76,0.3)`,borderRadius:10,padding:"10px 13px",display:"flex",justifyContent:"space-between",alignItems:"center",backdropFilter:"blur(10px)"}}>
                  <div><div style={{fontWeight:700,fontSize:13,color:T1}}>{s.name}</div><div style={{fontSize:11,color:T2,marginTop:1}}>{s.distance} mi</div></div>
                  <button onClick={()=>setBooking(s)} style={{padding:"7px 14px",background:`linear-gradient(135deg,${G},${GL})`,border:"none",borderRadius:8,fontSize:12,fontWeight:700,color:"#0a0a10",cursor:"pointer"}}>Book →</button>
                </div>
              ):null;})()}
            </div>
          </div>
        )}

        <div style={{marginTop:16}}>
          <GBtn onClick={restart}>↺ Start New Consultation</GBtn>
        </div>
      </div>

      {booking && <BookModal shop={booking} tire={tire} onClose={()=>setBooking(null)}/>}
    </div>
  );

  return null;
}
