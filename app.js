const {useState,useEffect,useMemo,useRef} = React;

const CSI_LOGO = "csi-logo.jpg";

const ICONS = {
  dashboard:"\u25A6", events:"\uD83D\uDCC5", registrations:"\uD83D\uDCCB", calendar:"\uD83D\uDDD3",
  analytics:"\uD83D\uDCCA", settings:"\u2699", profile:"\uD83D\uDC64", menu:"\u2630", close:"\u2715",
  plus:"+", search:"\uD83D\uDD0D", edit:"\u270E", trash:"\uD83D\uDDD1", eye:"\uD83D\uDC41",
  clock:"\uD83D\uDD52", pin:"\uD83D\uDCCD", users:"\uD83D\uDC65", mic:"\uD83C\uDFA4", left:"\u2039", right:"\u203A"
};

const AITR_LOGO = "aitr-logo.png";

function BrandBadge({className=""}){
  return <div className={"brand-badge "+className}>
    <img className="brand-badge__logo" src={CSI_LOGO} alt="Computer Society of India logo"/>
    <div className="brand-badge__copy"><b>CSI AITR</b><span>STUDENT CHAPTER</span></div>
  </div>;
}

const MEMBERS=[
  ["Manan Atal","Software Developer","[Placeholder: Add Manan's quote here.]"],
  ["Nishchal Vyas","Software Developer Lead","[Placeholder: Add Nishchal's quote here.]"],
  ["Kritika Rathore","Event Manager","[Placeholder: Add Kritika's quote here.]"],
  ["Kanishka Kanungo","Chairperson","[Placeholder: Add Kanishka's quote here.]"],
  ["Nidhish Sharma","Vice Chairperson","[Placeholder: Add Nidhish's quote here.]"],
  ["Somesh Shukla","Engagement Head","[Placeholder: Add Somesh's quote here.]"]
];

function Testimonials(){
  return <section style={{marginTop:34}}>
    <div className="section-label">The people behind the momentum</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"end",gap:12,margin:"6px 0 16px"}}>
      <div><h2 className="font-heading" style={{fontSize:21,margin:"0 0 3px"}}>Words from Our Members</h2><p style={{color:"var(--muted)",fontSize:13,margin:0}}>Built by curious minds, powered by community.</p></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
      {MEMBERS.map(([name,role,quote])=><article className="card testimonial-card hoverlift" key={name}>
        <div style={{display:"flex",alignItems:"center",gap:11}}><div className="avatar">{name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div><b style={{fontSize:14}}>{name}</b><div style={{fontSize:11.5,color:"var(--teal)",marginTop:2}}>{role}</div></div></div>
        <p className="quote">“{quote}”</p>
      </article>)}
    </div>
  </section>;
}

function Footer(){
  return <footer className="site-footer"><div className="footer-grid">
    <div className="footer-brand">
      <div className="footer-lockup"><img src={CSI_LOGO} alt="Computer Society of India logo"/><div><b>CSI AITR</b><span>Student Chapter</span></div></div>
      <img className="footer-institute-logo" src={AITR_LOGO} alt="Acropolis Institute of Technology and Research — Enlightening Wisdom"/>
      <div className="footer-tagline">Code. Script. Innovate.</div>
    </div>
    <div><div className="footer-title">Quick Links</div>{["Home","About Us","Events","Team","Contact Us"].map(x=><div key={x} style={{marginBottom:9,fontSize:13}}><a href="#" onClick={e=>e.preventDefault()}>{x}</a></div>)}</div>
    <div><div className="footer-title">Connect With Us</div><div style={{display:"flex",gap:10}}><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn btn-ghost">in</a><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="btn btn-ghost">◎</a></div></div>
    <div><div className="footer-title">Contact Us</div><div style={{fontSize:12.5,lineHeight:1.7,color:"#a9c2ca"}}>Acropolis Institute of Technology and Research<br/>Indore, Madhya Pradesh<br/><a href="mailto:csiaitr@acropolis.in">csiaitr@acropolis.in</a><br/>+91 00000 00000</div></div>
  </div><div style={{maxWidth:1200,margin:"30px auto 0",paddingTop:16,borderTop:"1px solid rgba(255,255,255,.12)",fontSize:11.5,color:"#8ea7af"}}>© 2026 CSI AITR. All rights reserved.</div></footer>;
}

const STORAGE_KEY = "csiaitr_events_v1";
const REG_KEY = "csiaitr_regs_v1";

const DEMO_EVENTS = [
  {id:"e1", name:"Prompt 2 Product", description:"Learn how to transform your ideas into working products using AI and prompt engineering. Turn your prompt into a real product, build, experiment and showcase your work.", date:"2026-10-08", startTime:"10:00", endTime:"16:00", venue:"AITR, Indore", speaker:"CSI AITR x MLH", speakerOrg:"Major League Hacking", capacity:100, fee:"₹100/team", category:"Hackathon", status:"Upcoming", poster:"", registered:72},
  {id:"e2", name:"CSI Web Development Workshop", description:"A hands-on workshop covering modern web development fundamentals, from HTML/CSS to deploying a live project.", date:"2026-10-15", startTime:"11:00", endTime:"14:00", venue:"Seminar Hall, AITR", speaker:"Industry Expert", speakerOrg:"Tech Partner Co.", capacity:80, fee:"Free", category:"Workshop", status:"Upcoming", poster:"", registered:51},
  {id:"e3", name:"CSI Ideathon 2026", description:"Pitch your boldest tech ideas and compete for recognition and prizes in this fast-paced ideation challenge.", date:"2026-11-02", startTime:"09:30", endTime:"17:00", venue:"AITR Auditorium", speaker:"Panel of Judges", speakerOrg:"CSI AITR", capacity:120, fee:"₹150/team", category:"Competition", status:"Upcoming", poster:"", registered:34},
  {id:"e4", name:"Cloud & DevOps Seminar", description:"An introductory seminar on cloud computing and DevOps practices used in the industry today.", date:"2026-10-25", startTime:"15:00", endTime:"17:00", venue:"Lab 5, AITR", speaker:"Alumni Speaker", speakerOrg:"CSI AITR Alumni", capacity:60, fee:"Free", category:"Seminar", status:"Upcoming", poster:"", registered:12},
  {id:"e5", name:"Git & GitHub Bootcamp", description:"A beginner friendly bootcamp on version control, Git commands and collaborating using GitHub.", date:"2026-09-22", startTime:"10:00", endTime:"13:00", venue:"Lab 3, AITR", speaker:"CSI Core Team", speakerOrg:"CSI AITR", capacity:70, fee:"Free", category:"Technical Session", status:"Completed", poster:"", registered:68},
  {id:"e6", name:"AI Innovation Session", description:"An exploratory session on the latest innovations in Artificial Intelligence and their real-world applications.", date:"2026-09-05", startTime:"11:00", endTime:"13:00", venue:"AITR Auditorium", speaker:"Dr. R. Mehta", speakerOrg:"AITR Faculty", capacity:150, fee:"Free", category:"Webinar", status:"Completed", poster:"", registered:141},
  {id:"e7", name:"Competitive Coding Championship", description:"Test your DSA and problem-solving skills against the best coders on campus.", date:"2026-09-12", startTime:"14:00", endTime:"18:00", venue:"Lab 1 & 2, AITR", speaker:"CSI Core Team", speakerOrg:"CSI AITR", capacity:90, fee:"₹50/head", category:"Competition", status:"Completed", poster:"", registered:83},
];

const NAMES = ["Aarav Sharma","Riya Verma","Kabir Mehta","Ishita Jain","Aditya Rao","Sanya Gupta","Vivaan Patel","Myra Singh","Reyansh Kulkarni","Ananya Iyer","Dev Malhotra","Kiara Bhatt"];
const BRANCHES = ["CSE","IT","CSE-AI","ECE","IT","CSE","CSE-DS","IT","ECE","CSE","CSE-AI","IT"];
function genRegs(eventId,count,baseDate){
  const arr=[];
  for(let i=0;i<count;i++){
    const n=NAMES[i%NAMES.length];
    const email=n.toLowerCase().replace(/ /g,".")+"@example.com";
    arr.push({id:eventId+"-p"+i, name:n, email, phone:"98765"+String(43210+i).slice(-5), branch:BRANCHES[i%BRANCHES.length], date:baseDate, status: i%9===0?"Pending":"Confirmed"});
  }
  return arr;
}
function buildDemoRegs(events){
  const map={};
  events.forEach(ev=>{ map[ev.id]=genRegs(ev.id, Math.min(ev.registered,12), ev.date); });
  return map;
}

function loadEvents(){
  try{ const raw=localStorage.getItem(STORAGE_KEY); if(raw) return JSON.parse(raw); }catch(e){}
  return DEMO_EVENTS;
}
function loadRegs(events){
  try{ const raw=localStorage.getItem(REG_KEY); if(raw) return JSON.parse(raw); }catch(e){}
  return buildDemoRegs(events);
}
function saveEvents(ev){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(ev)); }catch(e){} }
function saveRegs(r){ try{ localStorage.setItem(REG_KEY, JSON.stringify(r)); }catch(e){} }

function fmtDate(d){
  try{ const dt=new Date(d+"T00:00:00"); return dt.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}); }catch(e){ return d; }
}
function StatusBadge({status}){
  const map={Upcoming:{bg:"#E7ECFF",fg:"#1E3A8A"}, Ongoing:{bg:"#FFF3D6",fg:"#8A5A00"}, Completed:{bg:"#E4F7EC",fg:"#146C3B"}};
  const s=map[status]||map.Upcoming;
  return <span className="badge" style={{background:s.bg,color:s.fg}}>{status}</span>;
}
function Toast({toasts}){
  return <div style={{position:"fixed",bottom:20,right:20,zIndex:200,display:"flex",flexDirection:"column",gap:8}}>
    {toasts.map(t=> <div key={t.id} className="toast card" style={{padding:"12px 18px",boxShadow:"0 8px 24px rgba(0,0,0,.12)",fontSize:14,fontWeight:500,borderLeft:"4px solid "+(t.type==="error"?"#DC2626":"var(--teal)")}}>{t.msg}</div>)}
  </div>;
}
function Modal({onClose,children,width=520}){
  return <div className="modalbg" onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(15,17,26,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:150,padding:16}}>
    <div onClick={e=>e.stopPropagation()} className="card" style={{width:"100%",maxWidth:width,maxHeight:"88vh",overflowY:"auto",padding:24}}>
      {children}
    </div>
  </div>;
}

function Sidebar({view,setView,open,setOpen}){
  const items=[["dashboard","Dashboard"],["events","Events"],["registrations","Registrations"],["calendar","Calendar"],["analytics","Analytics"]];
  const bottom=[["settings","Settings"]];
  const Nav=({id,label})=>(
    <div className={"navitem "+(view===id?"active":"")} onClick={()=>{setView(id); setOpen(false);}}>
      <span style={{width:20,textAlign:"center"}}>{ICONS[id]}</span><span>{label}</span>
    </div>);
  return <>
  {open && <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",zIndex:99}} className="md:hidden"/>}
  <div className="card" style={{position:"fixed",top:0,left:0,bottom:0,width:236,zIndex:100,borderRadius:0,borderRight:"1px solid var(--border)",display:"flex",flexDirection:"column",padding:"18px 12px",transform: open?"translateX(0)":"translateX(-100%)",transition:"transform .2s"}} id="sidebar">
    <div className="sidebar-brand-row">
      <BrandBadge/>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:2,flex:1}}>{items.map(([id,l])=><Nav key={id} id={id} label={l}/>)}</div>
    <div style={{display:"flex",flexDirection:"column",gap:2,borderTop:"1px solid var(--border)",paddingTop:10}}>
      {bottom.map(([id,l])=><Nav key={id} id={id} label={l}/>)}
      <div className="navitem"><span style={{width:20,textAlign:"center"}}>{ICONS.profile}</span><span>CSI AITR Admin</span></div>
    </div>
  </div>
  </>;
}

function StatCard({label,value,icon,tint}){
  const [shown,setShown]=useState(0);
  const numeric=typeof value==="number";
  useEffect(()=>{
    if(!numeric){setShown(value);return;}
    let frame; const start=performance.now(); const duration=650;
    const tick=now=>{const progress=Math.min((now-start)/duration,1);setShown(Math.round(value*progress));if(progress<1) frame=requestAnimationFrame(tick);};
    frame=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(frame);
  },[value,numeric]);
  return <div className="card hoverlift" style={{padding:18}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{fontSize:26,fontWeight:800,fontFamily:"Poppins"}}>{numeric?shown:value}</div>
        <div style={{fontSize:13,color:"var(--muted)",marginTop:2}}>{label}</div>
      </div>
      <div style={{width:40,height:40,borderRadius:10,background:tint,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{icon}</div>
    </div>
  </div>;
}

function ProgressBar({pct}){
  return <div style={{height:7,background:"var(--bg)",borderRadius:99,overflow:"hidden",border:"1px solid var(--border)"}}>
    <div style={{width:Math.min(pct,100)+"%",height:"100%",background:"linear-gradient(90deg,var(--blue),var(--teal))",borderRadius:99}}/>
  </div>;
}

function EventCard({ev,onClick}){
  const pct=Math.round((ev.registered/ev.capacity)*100);
  return <div className="card hoverlift" style={{padding:16,cursor:"pointer"}} onClick={onClick}>
    <div className="event-visual" style={{height:110,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontFamily:"Poppins",fontSize:15,textAlign:"center",padding:10}}>{ev.name}</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginTop:12}}>
      <div className="font-heading" style={{fontWeight:700,fontSize:15}}>{ev.name}</div>
      <StatusBadge status={ev.status}/>
    </div>
    <div style={{fontSize:12.5,color:"var(--muted)",marginTop:6,display:"flex",flexDirection:"column",gap:3}}>
      <span>{ICONS.calendar} {fmtDate(ev.date)} &nbsp; {ICONS.clock} {ev.startTime}</span>
      <span>{ICONS.pin} {ev.venue}</span>
      {ev.speaker && <span>{ICONS.mic} {ev.speaker}</span>}
    </div>
    <div style={{marginTop:10}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11.5,color:"var(--muted)",marginBottom:4}}><span>{ev.registered}/{ev.capacity} registered</span><span>{pct}%</span></div>
      <ProgressBar pct={pct}/>
    </div>
  </div>;
}

function Header({title,subtitle,children}){
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:20}}>
    <div><h1 className="font-heading" style={{fontSize:24,fontWeight:700,margin:0}}>{title}</h1>{subtitle && <p style={{color:"var(--muted)",fontSize:13.5,margin:"4px 0 0"}}>{subtitle}</p>}</div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{children}</div>
  </div>;
}

function EmptyState({title,sub}){
  return <div className="card" style={{padding:"48px 20px",textAlign:"center",color:"var(--muted)"}}>
    <div style={{fontSize:32,marginBottom:8}}>🔍</div>
    <div style={{fontWeight:700,color:"var(--text)"}}>{title}</div>
    <div style={{fontSize:13,marginTop:4}}>{sub}</div>
  </div>;
}

function Dashboard({events,setView,setSelectedId,openAdd}){
  const total=events.length, upcoming=events.filter(e=>e.status==="Upcoming").length;
  const totalReg=events.reduce((s,e)=>s+Number(e.registered||0),0);
  const completed=events.filter(e=>e.status==="Completed").length;
  const upcomingList=events.filter(e=>e.status!=="Completed").slice(0,4);
  return <div>
    <Header title="Good morning, CSI AITR Team 👋" subtitle="Manage your events, registrations and participants in one place.">
      <button className="btn btn-primary" onClick={openAdd}>{ICONS.plus} Create Event</button>
    </Header>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,marginBottom:24}}>
      <StatCard label="Total Events" value={total} icon="🗂" tint="#E7ECFF"/>
      <StatCard label="Upcoming Events" value={upcoming} icon="🚀" tint="#FDF0D8"/>
      <StatCard label="Total Registrations" value={totalReg} icon="👥" tint="#E4F7EC"/>
      <StatCard label="Completed Events" value={completed} icon="✅" tint="#EDE7FF"/>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2 className="font-heading" style={{fontSize:17,fontWeight:700,margin:0}}>Upcoming Events</h2>
      <span onClick={()=>setView("events")} style={{fontSize:13,color:"var(--purple)",cursor:"pointer",fontWeight:600}}>View all →</span>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>
      {upcomingList.map(ev=><EventCard key={ev.id} ev={ev} onClick={()=>{setSelectedId(ev.id); setView("eventDetail");}}/>)}
    </div>
    <Testimonials/>
  </div>;
}

const CATS=["Workshop","Hackathon","Competition","Seminar","Webinar","Technical Session","Other"];
const STATUSES=["Upcoming","Ongoing","Completed"];

function EventForm({initial,onCancel,onSave}){
  const [f,setF]=useState(initial||{name:"",description:"",date:"",startTime:"",endTime:"",venue:"",speaker:"",speakerOrg:"",capacity:"",fee:"",category:CATS[0],status:"Upcoming"});
  const [err,setErr]=useState({});
  const set=(k,v)=>setF({...f,[k]:v});
  const submit=()=>{
    const e={};
    if(!f.name.trim()) e.name="Event name is required";
    if(!f.date) e.date="Date is required";
    if(!f.venue.trim()) e.venue="Venue is required";
    if(!f.capacity || isNaN(f.capacity) || Number(f.capacity)<=0) e.capacity="Enter a valid capacity";
    setErr(e);
    if(Object.keys(e).length===0) onSave(f);
  };
  const field=(label,key,type="text",opts)=>(
    <div style={{marginBottom:12}}>
      <label style={{fontSize:12.5,fontWeight:600,display:"block",marginBottom:5}}>{label}</label>
      {type==="textarea" ? <textarea className="input" rows={3} value={f[key]} onChange={e=>set(key,e.target.value)}/>
      : type==="select" ? <select className="input" value={f[key]} onChange={e=>set(key,e.target.value)}>{opts.map(o=><option key={o}>{o}</option>)}</select>
      : <input className="input" type={type} value={f[key]} onChange={e=>set(key,e.target.value)}/>}
      {err[key] && <div style={{color:"#DC2626",fontSize:11.5,marginTop:3}}>{err[key]}</div>}
    </div>);
  return <div>
    <h2 className="font-heading" style={{fontWeight:700,fontSize:18,marginTop:0}}>{initial? "Edit Event":"Add Event"}</h2>
    {field("Event Name","name")}
    {field("Event Description","description","textarea")}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {field("Event Date","date","date")}
      {field("Venue","venue")}
      {field("Start Time","startTime","time")}
      {field("End Time","endTime","time")}
      {field("Speaker Name","speaker")}
      {field("Speaker Organization","speakerOrg")}
      {field("Capacity","capacity","number")}
      {field("Registration Fee","fee")}
      {field("Category","category","select",CATS)}
      {field("Event Status","status","select",STATUSES)}
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:8}}>
      <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      <button className="btn btn-primary" onClick={submit}>{initial?"Save Changes":"Create Event"}</button>
    </div>
  </div>;
}

function EventsView({events,setEvents,setView,setSelectedId,toast,addOpen,setAddOpen}){
  const [search,setSearch]=useState(""); const [filter,setFilter]=useState("All");
  const [editing,setEditing]=useState(null); const [del,setDel]=useState(null);
  const filtered=events.filter(e=>{
    const q=search.toLowerCase();
    const matchQ=!q || e.name.toLowerCase().includes(q)||e.speaker.toLowerCase().includes(q)||e.venue.toLowerCase().includes(q);
    const matchF=filter==="All"||e.status===filter;
    return matchQ&&matchF;
  });
  const genId=()=>"e"+Date.now();
  const save=(f)=>{
    if(editing){
      setEvents(events.map(e=>e.id===editing.id?{...e,...f,capacity:Number(f.capacity),registered:e.registered}:e));
      toast("Event updated successfully.");
    } else {
      const ne={...f,id:genId(),capacity:Number(f.capacity),registered:0};
      setEvents([ne,...events]);
      toast("Event created successfully.");
    }
    setEditing(null); setAddOpen(false);
  };
  const confirmDelete=()=>{ setEvents(events.filter(e=>e.id!==del.id)); toast("Event deleted successfully."); setDel(null); };
  return <div>
    <Header title="Events" subtitle="Create and manage all CSI AITR events.">
      <button className="btn btn-primary" onClick={()=>setAddOpen(true)}>{ICONS.plus} Add Event</button>
    </Header>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <input className="input" placeholder={ICONS.search+" Search events, speaker, venue"} style={{maxWidth:280}} value={search} onChange={e=>setSearch(e.target.value)}/>
      {["All",...STATUSES].map(s=> <span key={s} onClick={()=>setFilter(s)} className="btn" style={{padding:"8px 14px",background:filter===s?"var(--blue)":"var(--bg)",color:filter===s?"#fff":"var(--text)",border:"1px solid var(--border)",fontSize:13}}>{s}</span>)}
    </div>
    {filtered.length===0 ? <EmptyState title="No events found" sub="Try changing your search or filters."/> :
    <>
    <div className="scrollx hidden md:block card" style={{padding:0}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13.5,minWidth:820}}>
        <thead><tr style={{textAlign:"left",color:"var(--muted)",borderBottom:"1px solid var(--border)"}}>
          {["Event","Date","Venue","Speaker","Registrations","Capacity","Status","Actions"].map(h=><th key={h} style={{padding:"12px 14px",fontWeight:600}}>{h}</th>)}
        </tr></thead>
        <tbody>
        {filtered.map(e=><tr key={e.id} style={{borderBottom:"1px solid var(--border)"}}>
          <td style={{padding:"12px 14px",fontWeight:600}}>{e.name}</td>
          <td style={{padding:"12px 14px"}}>{fmtDate(e.date)}</td>
          <td style={{padding:"12px 14px"}}>{e.venue}</td>
          <td style={{padding:"12px 14px"}}>{e.speaker||"—"}</td>
          <td style={{padding:"12px 14px"}}>{e.registered}</td>
          <td style={{padding:"12px 14px"}}>{e.capacity}</td>
          <td style={{padding:"12px 14px"}}><StatusBadge status={e.status}/></td>
          <td style={{padding:"12px 14px",whiteSpace:"nowrap"}}>
            <span title="View" style={{cursor:"pointer",marginRight:10}} onClick={()=>{setSelectedId(e.id);setView("eventDetail");}}>{ICONS.eye}</span>
            <span title="Edit" style={{cursor:"pointer",marginRight:10}} onClick={()=>setEditing(e)}>{ICONS.edit}</span>
            <span title="Delete" style={{cursor:"pointer"}} onClick={()=>setDel(e)}>{ICONS.trash}</span>
          </td>
        </tr>)}
        </tbody>
      </table>
    </div>
    <div className="md:hidden" style={{display:"grid",gap:12}}>
      {filtered.map(e=><div key={e.id} className="card" style={{padding:14}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><b>{e.name}</b><StatusBadge status={e.status}/></div>
        <div style={{fontSize:12.5,color:"var(--muted)",marginTop:6}}>{fmtDate(e.date)} • {e.venue}</div>
        <div style={{fontSize:12.5,color:"var(--muted)"}}>{e.registered}/{e.capacity} registered</div>
        <div style={{display:"flex",gap:14,marginTop:10,fontSize:13}}>
          <span onClick={()=>{setSelectedId(e.id);setView("eventDetail");}}>{ICONS.eye} View</span>
          <span onClick={()=>setEditing(e)}>{ICONS.edit} Edit</span>
          <span onClick={()=>setDel(e)}>{ICONS.trash} Delete</span>
        </div>
      </div>)}
    </div>
    </>}
    {(addOpen||editing) && <Modal onClose={()=>{setAddOpen(false);setEditing(null);}}><EventForm initial={editing} onCancel={()=>{setAddOpen(false);setEditing(null);}} onSave={save}/></Modal>}
    {del && <Modal onClose={()=>setDel(null)} width={380}>
      <h3 className="font-heading" style={{marginTop:0}}>Delete this event?</h3>
      <p style={{color:"var(--muted)",fontSize:13.5}}>This action cannot be undone.</p>
      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:16}}>
        <button className="btn btn-ghost" onClick={()=>setDel(null)}>Cancel</button>
        <button className="btn" style={{background:"#DC2626",color:"#fff"}} onClick={confirmDelete}>Delete Event</button>
      </div>
    </Modal>}
  </div>;
}

function EventDetail({ev,setView,regs,setSelectedRegEvent}){
  if(!ev) return <EmptyState title="Event not found" sub="Go back to Events."/>;
  const pct=Math.round((ev.registered/ev.capacity)*100);
  return <div>
    <span onClick={()=>setView("events")} style={{fontSize:13,color:"var(--purple)",cursor:"pointer",fontWeight:600}}>← Back to Events</span>
    <div className="card" style={{marginTop:14,overflow:"hidden"}}>
      <div className="event-visual" style={{height:160,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:20,color:"#fff"}}>
        <StatusBadge status={ev.status}/>
        <h2 className="font-heading" style={{margin:"8px 0 4px",fontSize:22}}>{ev.name}</h2>
        <div style={{fontSize:13,opacity:.9}}>{fmtDate(ev.date)} • {ev.venue} {ev.speaker && "• "+ev.speaker}</div>
      </div>
      <div style={{padding:20}}>
        <h3 className="font-heading" style={{fontSize:15}}>About Event</h3>
        <p style={{color:"var(--muted)",fontSize:13.5,lineHeight:1.6}}>{ev.description||"No description provided."}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,margin:"16px 0"}}>
          {[["Category",ev.category],["Speaker",ev.speaker+(ev.speakerOrg?" · "+ev.speakerOrg:"")],["Time",(ev.startTime||"—")+" – "+(ev.endTime||"—")],["Fee",ev.fee||"Free"]].map(([l,v])=>
          <div key={l} className="card" style={{padding:12,background:"var(--bg)"}}><div style={{fontSize:11,color:"var(--muted)"}}>{l}</div><div style={{fontWeight:600,fontSize:13.5,marginTop:2}}>{v}</div></div>)}
        </div>
        <h3 className="font-heading" style={{fontSize:15}}>Registration Overview</h3>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}><span>Registered: {ev.registered}</span><span>Capacity: {ev.capacity}</span></div>
        <ProgressBar pct={pct}/>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--muted)",marginTop:6}}><span>{pct}% filled</span><span>Available seats: {Math.max(ev.capacity-ev.registered,0)}</span></div>
        <div style={{display:"flex",gap:10,marginTop:20}}>
          <button className="btn btn-primary" onClick={()=>{setSelectedRegEvent(ev.id); setView("registrations");}}>View Registrations</button>
        </div>
      </div>
    </div>
  </div>;
}

function RegistrationsView({events,regs,selectedRegEvent,setSelectedRegEvent,toast}){
  const [search,setSearch]=useState(""); const [statusF,setStatusF]=useState("All");
  const ev=events.find(e=>e.id===selectedRegEvent);
  if(!ev) return <div>
    <Header title="Registrations" subtitle="Select an event to view its participants."/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
      {events.map(e=><div key={e.id} className="card hoverlift" style={{padding:14,cursor:"pointer"}} onClick={()=>setSelectedRegEvent(e.id)}>
        <b style={{fontSize:14}}>{e.name}</b>
        <div style={{fontSize:12.5,color:"var(--muted)",marginTop:6}}>{e.registered}/{e.capacity} registered</div>
        <div style={{marginTop:8}}><ProgressBar pct={Math.round((e.registered/e.capacity)*100)}/></div>
      </div>)}
    </div>
  </div>;
  const list=regs[ev.id]||[];
  const filtered=list.filter(p=>{
    const q=search.toLowerCase();
    const mq=!q||p.name.toLowerCase().includes(q)||p.email.toLowerCase().includes(q);
    const ms=statusF==="All"||p.status===statusF;
    return mq&&ms;
  });
  const exportCsv=async()=>{
    const rows=[["#","Name","Email","Phone","Branch","Registration Date","Status"], ...filtered.map((p,i)=>[i+1,p.name,p.email,p.phone,p.branch,p.date,p.status])];
    const csv=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(",")).join("\n");
    try{
      const dl=await claude.use("downloads");
      if(dl){ await dl.save({filename:ev.name.replace(/[^a-z0-9]/gi,"_")+"_registrations.csv", data:csv}); toast("CSV export started."); }
      else toast("Downloads aren't available in this view.","error");
    }catch(e){ toast("Couldn't export CSV.","error"); }
  };
  const pct=Math.round((ev.registered/ev.capacity)*100);
  return <div>
    <span onClick={()=>setSelectedRegEvent(null)} style={{fontSize:13,color:"var(--purple)",cursor:"pointer",fontWeight:600}}>← All Events</span>
    <Header title="Registrations" subtitle={ev.name+" • "+fmtDate(ev.date)}>
      <button className="btn btn-ghost" onClick={exportCsv}>⬇ Export CSV</button>
    </Header>
    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:16,fontSize:13,color:"var(--muted)"}}>
      <span>Total registrations: <b style={{color:"var(--text)"}}>{ev.registered}</b></span>
      <span>Capacity: <b style={{color:"var(--text)"}}>{ev.capacity}</b></span>
      <span>Filled: <b style={{color:"var(--text)"}}>{pct}%</b></span>
    </div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <input className="input" placeholder="Search participant" style={{maxWidth:260}} value={search} onChange={e=>setSearch(e.target.value)}/>
      {["All","Confirmed","Pending"].map(s=><span key={s} onClick={()=>setStatusF(s)} className="btn" style={{padding:"8px 14px",background:statusF===s?"var(--blue)":"var(--bg)",color:statusF===s?"#fff":"var(--text)",border:"1px solid var(--border)",fontSize:13}}>{s}</span>)}
    </div>
    {filtered.length===0 ? <EmptyState title="No participants found" sub="Try changing your search or filters."/> :
    <div className="scrollx card" style={{padding:0}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13.5,minWidth:680}}>
        <thead><tr style={{textAlign:"left",color:"var(--muted)",borderBottom:"1px solid var(--border)"}}>
          {["#","Name","Email","Phone","Branch","Reg. Date","Status"].map(h=><th key={h} style={{padding:"12px 14px",fontWeight:600}}>{h}</th>)}
        </tr></thead>
        <tbody>{filtered.map((p,i)=><tr key={p.id} style={{borderBottom:"1px solid var(--border)"}}>
          <td style={{padding:"12px 14px"}}>{i+1}</td><td style={{padding:"12px 14px",fontWeight:600}}>{p.name}</td>
          <td style={{padding:"12px 14px"}}>{p.email}</td><td style={{padding:"12px 14px"}}>{p.phone}</td>
          <td style={{padding:"12px 14px"}}>{p.branch}</td><td style={{padding:"12px 14px"}}>{fmtDate(p.date)}</td>
          <td style={{padding:"12px 14px"}}><span className="badge" style={{background:p.status==="Confirmed"?"#E4F7EC":"#FDF0D8",color:p.status==="Confirmed"?"#146C3B":"#8A5A00"}}>{p.status}</span></td>
        </tr>)}</tbody>
      </table>
    </div>}
  </div>;
}

function CalendarView({events,setView,setSelectedId}){
  const [cur,setCur]=useState(()=>{ const d=new Date(); return new Date(d.getFullYear(),d.getMonth(),1); });
  const y=cur.getFullYear(), m=cur.getMonth();
  const first=new Date(y,m,1).getDay(); const days=new Date(y,m+1,0).getDate();
  const evByDate={}; events.forEach(e=>{ (evByDate[e.date]=evByDate[e.date]||[]).push(e); });
  const cells=[]; for(let i=0;i<first;i++) cells.push(null); for(let d=1;d<=days;d++) cells.push(d);
  const pad=n=>String(n).padStart(2,"0");
  return <div>
    <Header title="Calendar" subtitle="View events by month.">
      <button className="btn btn-ghost" onClick={()=>{const d=new Date();setCur(new Date(d.getFullYear(),d.getMonth(),1));}}>Today</button>
    </Header>
    <div className="card" style={{padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <span className="btn btn-ghost" onClick={()=>setCur(new Date(y,m-1,1))}>{ICONS.left}</span>
        <b className="font-heading">{cur.toLocaleDateString("en-IN",{month:"long",year:"numeric"})}</b>
        <span className="btn btn-ghost" onClick={()=>setCur(new Date(y,m+1,1))}>{ICONS.right}</span>
      </div>
      <div className="scrollx">
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6,minWidth:560}}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d} style={{fontSize:11.5,color:"var(--muted)",fontWeight:600,textAlign:"center",padding:4}}>{d}</div>)}
        {cells.map((d,i)=>{
          const key=d? y+"-"+pad(m+1)+"-"+pad(d):null;
          const evs=key?(evByDate[key]||[]):[];
          return <div key={i} style={{minHeight:70,border:"1px solid var(--border)",borderRadius:8,padding:5,background:d?"var(--card)":"transparent"}}>
            {d && <div style={{fontSize:11.5,color:"var(--muted)"}}>{d}</div>}
            {evs.slice(0,2).map(e=><div key={e.id} onClick={()=>{setSelectedId(e.id);setView("eventDetail");}} style={{fontSize:10.5,background:"#E7ECFF",color:"var(--blue)",borderRadius:5,padding:"2px 4px",marginTop:3,cursor:"pointer",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.name}</div>)}
          </div>;
        })}
      </div>
      </div>
    </div>
  </div>;
}

function Bar({label,value,max,color}){
  const pct=max? Math.round((value/max)*100):0;
  return <div style={{marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span>{label}</span><span style={{color:"var(--muted)"}}>{value}</span></div>
    <div style={{height:10,background:"var(--bg)",borderRadius:99}}><div style={{width:pct+"%",height:"100%",borderRadius:99,background:color}}/></div>
  </div>;
}

function AnalyticsView({events}){
  const total=events.length; const totalReg=events.reduce((s,e)=>s+Number(e.registered),0);
  const avgRate=Math.round(events.reduce((s,e)=>s+(e.registered/e.capacity)*100,0)/(total||1));
  const completed=events.filter(e=>e.status==="Completed").length;
  const maxReg=Math.max(...events.map(e=>e.registered),1);
  const byStatus=STATUSES.map(s=>({s,c:events.filter(e=>e.status===s).length}));
  const maxStatus=Math.max(...byStatus.map(b=>b.c),1);
  const months={}; events.forEach(e=>{ const mn=new Date(e.date+"T00:00").toLocaleDateString("en-IN",{month:"short"}); months[mn]=(months[mn]||0)+Number(e.registered); });
  const maxMonth=Math.max(...Object.values(months),1);
  const colors=["var(--blue)","var(--purple)","var(--teal)"];
  return <div>
    <Header title="Analytics" subtitle="A quick look at CSI AITR event performance."/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,marginBottom:24}}>
      <StatCard label="Total Events" value={total} icon="🗂" tint="#E7ECFF"/>
      <StatCard label="Total Registrations" value={totalReg} icon="👥" tint="#E4F7EC"/>
      <StatCard label="Avg. Registration Rate" value={avgRate+"%"} icon="📈" tint="#FDF0D8"/>
      <StatCard label="Completed Events" value={completed} icon="✅" tint="#EDE7FF"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
      <div className="card" style={{padding:18}}><h3 className="font-heading" style={{fontSize:14,marginTop:0}}>Registrations per Event</h3>
        {events.slice(0,6).map((e,i)=><Bar key={e.id} label={e.name} value={e.registered} max={maxReg} color={colors[i%3]}/>)}
      </div>
      <div className="card" style={{padding:18}}><h3 className="font-heading" style={{fontSize:14,marginTop:0}}>Events by Status</h3>
        {byStatus.map((b,i)=><Bar key={b.s} label={b.s} value={b.c} max={maxStatus} color={colors[i%3]}/>)}
      </div>
      <div className="card" style={{padding:18}}><h3 className="font-heading" style={{fontSize:14,marginTop:0}}>Monthly Registration Trend</h3>
        {Object.entries(months).map(([mn,v],i)=><Bar key={mn} label={mn} value={v} max={maxMonth} color={colors[i%3]}/>)}
      </div>
    </div>
  </div>;
}

function SettingsView({resetDemo,clearData}){
  return <div>
    <Header title="Settings" subtitle="Manage your profile, preferences and data."/>
    <div style={{display:"grid",gap:16,maxWidth:640}}>
      <div className="card" style={{padding:18}}>
        <h3 className="font-heading" style={{fontSize:15,marginTop:0}}>Profile</h3>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:48,height:48,borderRadius:99,background:"linear-gradient(135deg,var(--blue),var(--purple))",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>CA</div>
          <div><b>CSI AITR Admin</b><div style={{fontSize:12.5,color:"var(--muted)"}}>Event Coordinator</div></div>
        </div>
      </div>
      <div className="card" style={{padding:18}}>
        <h3 className="font-heading" style={{fontSize:15,marginTop:0}}>Notification Preferences</h3>
        <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13.5}}><input type="checkbox" defaultChecked/> Email me when a new registration comes in</label>
      </div>
      <div className="card" style={{padding:18}}>
        <h3 className="font-heading" style={{fontSize:15,marginTop:0}}>Data Management</h3>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="btn btn-ghost" onClick={resetDemo}>Reset Demo Data</button>
          <button className="btn" style={{background:"#DC2626",color:"#fff"}} onClick={clearData}>Clear Local Data</button>
        </div>
      </div>
    </div>
  </div>;
}

function App(){
  const [events,setEventsState]=useState(loadEvents);
  const [regs,setRegsState]=useState(()=>loadRegs(events));
  const [view,setView]=useState("dashboard");
  const [selectedId,setSelectedId]=useState(null);
  const [selectedRegEvent,setSelectedRegEvent]=useState(null);
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [addOpen,setAddOpen]=useState(false);
  const [toasts,setToasts]=useState([]);

  const setEvents=(ev)=>{ setEventsState(ev); saveEvents(ev); };
  const setRegs=(r)=>{ setRegsState(r); saveRegs(r); };

  const toast=(msg,type)=>{ const id=Date.now(); setToasts(t=>[...t,{id,msg,type}]); setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2800); };
  const resetDemo=()=>{ setEvents(DEMO_EVENTS); const r=buildDemoRegs(DEMO_EVENTS); setRegs(r); toast("Demo data restored."); };
  const clearData=()=>{ try{localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(REG_KEY);}catch(e){} setEventsState([]); setRegsState({}); toast("Local data cleared."); };

  const selectedEvent=events.find(e=>e.id===selectedId);

  return <div style={{display:"flex"}}>
    <Sidebar view={view} setView={setView} open={sidebarOpen} setOpen={setSidebarOpen}/>
    <div style={{flex:1,minWidth:0}} className="md:ml-[236px]">
      <div className="card md:hidden" style={{borderRadius:0,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:50}}>
        <span onClick={()=>setSidebarOpen(true)} style={{fontSize:20,cursor:"pointer"}}>{ICONS.menu}</span>
        <BrandBadge className="mobile-brand-badge"/>
      </div>
      <div style={{padding:"22px 20px 60px",maxWidth:1200,margin:"0 auto"}}>
        {view==="dashboard" && <Dashboard events={events} setView={setView} setSelectedId={setSelectedId} openAdd={()=>{setView("events");setAddOpen(true);}}/>}
        {view==="events" && <EventsView events={events} setEvents={setEvents} setView={setView} setSelectedId={setSelectedId} toast={toast} addOpen={addOpen} setAddOpen={setAddOpen}/>}
        {view==="eventDetail" && <EventDetail ev={selectedEvent} setView={setView} regs={regs} setSelectedRegEvent={setSelectedRegEvent}/>}
        {view==="registrations" && <RegistrationsView events={events} regs={regs} selectedRegEvent={selectedRegEvent} setSelectedRegEvent={setSelectedRegEvent} toast={toast}/>}
        {view==="calendar" && <CalendarView events={events} setView={setView} setSelectedId={setSelectedId}/>}
        {view==="analytics" && <AnalyticsView events={events}/>}
        {view==="settings" && <SettingsView resetDemo={resetDemo} clearData={clearData}/>}
        <Footer/>
      </div>
    </div>
    <Toast toasts={toasts}/>
  </div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
