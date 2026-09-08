"use strict";

(() => {
  const { projects, repositories, username } = window.PORTFOLIO;
  const root = document.documentElement;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let savedMotion = null;
  try { savedMotion = localStorage.getItem("portfolio-motion"); } catch { /* Storage is optional. */ }
  let motionEnabled = !motionQuery.matches && savedMotion !== "off";
  let sculpture = null;
  const motionButton = document.getElementById("motion-toggle");

  function updateMotion() {
    root.dataset.motion = motionEnabled ? "on" : "off";
    motionButton.setAttribute("aria-pressed", String(motionEnabled));
    document.getElementById("motion-label").textContent = motionEnabled ? "Motion on" : "Motion off";
    if (!motionEnabled) document.querySelectorAll(".is-pending").forEach(node => node.classList.replace("is-pending", "is-visible"));
    sculpture?.update();
  }
  motionButton.addEventListener("click", () => {
    if (motionQuery.matches) return;
    motionEnabled = !motionEnabled;
    savedMotion = motionEnabled ? "on" : "off";
    try { localStorage.setItem("portfolio-motion", savedMotion); } catch { /* Storage is optional. */ }
    updateMotion();
  });
  function syncMotionPreference() {
    motionButton.disabled = motionQuery.matches;
    motionButton.title = motionQuery.matches ? "Reduced motion is enabled in your device settings" : "Pause or resume decorative animations";
    motionEnabled = !motionQuery.matches && savedMotion !== "off";
    updateMotion();
  }
  motionQuery.addEventListener("change", syncMotionPreference);
  syncMotionPreference();

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const externalLink = (label, href, className = "text-link") => {
    const link = el("a", className, label);
    link.href = href;
    if (href.startsWith("https://")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    return link;
  };
  const repositoryURL = name => `https://github.com/${username}/${encodeURIComponent(name)}`;

  // Art uses fixed templates and numeric coordinates, never remote content.
  function artwork(kind) {
    const open = '<svg viewBox="0 0 600 280" fill="none" aria-hidden="true" focusable="false">';
    let paths = "";
    if (kind === "frontier") {
      for (let i = 0; i < 15; i++) paths += `<ellipse cx="300" cy="140" rx="${55+i*8}" ry="${21+i*5}" transform="rotate(${i*7} 300 140)" stroke="currentColor" stroke-width=".8" opacity="${.25+i*.037}"/>`;
      paths += '<circle cx="300" cy="140" r="103" stroke="currentColor" stroke-dasharray="2 8" opacity=".5"/><path d="M95 140H505" stroke="currentColor" opacity=".15"/>';
    } else if (kind === "signal") {
      for (let i=0;i<15;i++) {
        let d="";
        for (let x=20;x<=580;x+=5) d += `${x===20?"M":"L"}${x} ${(140+Math.sin(x*.017+i*.17)*Math.sin(x*.005)*38+(i-7)*7).toFixed(2)} `;
        paths += `<path d="${d}" stroke="currentColor" opacity="${.18+(i%5)*.12}" stroke-width="1"/>`;
      }
      paths += '<circle cx="390" cy="130" r="39" stroke="currentColor" opacity=".4"/><circle cx="390" cy="130" r="5" fill="currentColor"/>';
    } else if (kind === "pipeline") {
      for(let i=0;i<5;i++) paths += `<rect x="${92+i*89}" y="${78+(i%2)*12}" width="65" height="${124-(i%2)*24}" rx="32" stroke="currentColor" stroke-width="1" opacity="${.3+i*.12}"/><circle cx="${124+i*89}" cy="140" r="${7+i*3}" fill="currentColor" opacity=".22"/>`;
      paths += '<path class="flow-line" d="M45 140H555" stroke="currentColor"/>';
    } else if (kind === "fusion") {
      paths += '<g class="orbit-path">';
      for(let i=0;i<3;i++) paths += `<ellipse cx="300" cy="140" rx="155" ry="48" transform="rotate(${i*60} 300 140)" stroke="currentColor" stroke-width="1.1" opacity=".65"/>`;
      paths += '</g><circle cx="300" cy="140" r="13" fill="currentColor" opacity=".5"/><circle cx="300" cy="140" r="29" stroke="currentColor" opacity=".3"/>';
    } else if (kind === "network" || kind === "routing") {
      const points = [[95,98],[145,193],[215,65],[250,207],[300,140],[375,67],[401,209],[475,100],[517,190]];
      points.forEach(([x,y],i)=> {
        paths += `<path d="M${x} ${y}L300 140" stroke="currentColor" opacity=".28" ${kind==="routing"?'class="flow-line"':""}/>`;
        paths += `<circle cx="${x}" cy="${y}" r="${i===4?22:8}" stroke="currentColor" fill="currentColor" fill-opacity=".12"/>`;
        if(i%3===0) paths += `<circle class="network-pulse" cx="${x}" cy="${y}" r="18" stroke="currentColor" opacity=".2" style="animation-delay:${i*.3}s"/>`;
      });
      paths += '<path d="M95 98L215 65L375 67L475 100L517 190L401 209L250 207L145 193Z" stroke="currentColor" opacity=".15"/>';
    } else if (kind === "privacy") {
      for(let i=0;i<12;i++) paths+=`<rect x="${185+i*7}" y="${37+i*7}" width="${230-i*14}" height="${206-i*14}" rx="${80-i*5}" stroke="currentColor" opacity="${.13+i*.055}"/>`;
      paths += '<path d="M80 140H520" stroke="currentColor" stroke-dasharray="2 7" opacity=".4"/>';
    } else {
      for(let i=0;i<9;i++) paths+=`<path d="M${100+i*48} 70V210" stroke="currentColor" opacity=".15"/>`;
      paths += '<path d="M85 186L137 159L178 174L225 113L269 139L315 97L365 125L407 87L455 108L508 70" stroke="currentColor" stroke-width="1.4"/><path class="flow-line" d="M85 211L137 195L178 198L225 153L269 167L315 138L365 160L407 121L455 136L508 105" stroke="currentColor" opacity=".45"/><rect x="335" y="57" width="125" height="171" rx="60" stroke="currentColor" opacity=".3"/>';
    }
    return open + paths + "</svg>";
  }

  const grid = document.getElementById("project-grid");
  projects.forEach((project, index) => {
    const card = el("article", "project-card reveal");
    card.dataset.category = project.category;
    card.style.setProperty("--reveal-delay", `${(index%2)*80}ms`);
    const projectURL = `./projects/${project.id}/`;
    const artButton = el("a", "project-art-button");
    artButton.href = projectURL;
    artButton.setAttribute("aria-label", `Explore ${project.title}`);
    const art = el("div", "project-art");
    art.setAttribute("aria-hidden", "true");
    art.style.setProperty("--art-bg", project.colors[0]);
    art.style.setProperty("--art-ink", project.colors[1]);
    art.innerHTML = artwork(project.art);
    const top = el("div", "art-topline mono");
    top.append(el("span", "", project.label),el("span", "", String(index+1).padStart(2,"0")));
    art.append(top,el("div", "art-bottomline mono", project.artLabel));
    artButton.append(art,el("span", "art-open", "↗"));
    const meta = el("div", "project-meta mono");
    meta.append(el("span", "", project.type),el("span", "", `PROJECT ${String(index+1).padStart(2,"0")}`));
    const title = el("div", "project-title-row");
    const heading = el("h3");
    const headingButton = el("a", "", project.title);
    headingButton.href = projectURL;
    heading.append(headingButton);
    title.append(heading);
    if(project.repo) {
      const link = externalLink("↗", repositoryURL(project.repo), "project-repo-link");
      link.setAttribute("aria-label", `${project.title} source on GitHub`);
      title.append(link);
    }
    const tags = el("div", "project-tags");
    project.tags.forEach(tag=>tags.append(el("span", "", tag)));
    const detail = el("a", "text-link project-detail-link", "Read the full project story ↗");
    detail.href = projectURL;
    detail.setAttribute("aria-label", `Read about ${project.title}`);
    card.append(artButton,meta,title,el("p", "project-description", project.summary),tags,detail);
    grid.append(card);
  });

  document.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=> {
    document.querySelectorAll("[data-filter]").forEach(item=> {
      const active = item===button;
      item.classList.toggle("is-active",active);
      item.setAttribute("aria-pressed",String(active));
    });
    let count = 0;
    grid.querySelectorAll(".project-card").forEach(card=> {
      const visible = button.dataset.filter==="all" || button.dataset.filter===card.dataset.category;
      card.hidden = !visible;
      if(visible) { count++; card.classList.remove("is-pending");card.classList.add("is-visible"); }
    });
    document.getElementById("project-count").textContent = `${String(count).padStart(2,"0")} PROJECT${count===1?"":"S"}`;
  }));

  function renderRepositories(items) {
    const list = document.getElementById("repository-list");
    list.replaceChildren();
    items.forEach(repo=> {
      const link = externalLink("",repositoryURL(repo.name),"repo-row");
      const title = el("span", "repo-name");
      title.append(el("span", "", repo.name),el("span", "", "↗"));
      link.append(title,el("p", "repo-description", repo.description || "Explore the source and project history on GitHub."),el("span", "repo-language mono", repo.language || "Repository"));
      list.append(link);
    });
  }
  renderRepositories(repositories);
  let repositoriesRequested = false;
  document.getElementById("repository-index").addEventListener("toggle",async event=> {
    if(!event.target.open || repositoriesRequested) return;
    repositoriesRequested = true;
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(),8000);
    const status = document.getElementById("repository-status");
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,{signal:controller.signal,headers:{Accept:"application/vnd.github+json"}});
      if(!response.ok) throw new Error("Repository list unavailable");
      const data = await response.json();
      if(!Array.isArray(data)) throw new Error("Unexpected repository response");
      const valid = data.filter(repo=> !repo.private && typeof repo.name==="string" && /^[A-Za-z0-9_.-]+$/.test(repo.name));
      const curated = new Map(repositories.map(repo=>[repo.name,repo]));
      if(valid.length) renderRepositories(valid.map(repo=>({...repo,description:curated.get(repo.name)?.description || repo.description,language:repo.language || curated.get(repo.name)?.language})));
      status.textContent = `${valid.length} public repositories · Updated from GitHub`;
    } catch {
      status.textContent = "Here are the projects I’ve collected. You can find the latest on GitHub.";
      repositoriesRequested = false;
    } finally { clearTimeout(timeout); }
  });

  if("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=> {
      if(entry.isIntersecting) { entry.target.classList.remove("is-pending");entry.target.classList.add("is-visible");observer.unobserve(entry.target); }
    }),{threshold:.08});
    document.querySelectorAll(".reveal").forEach(node=> {
      if(motionEnabled) node.classList.add("is-pending");
      observer.observe(node);
    });
    const navObserver = new IntersectionObserver(entries=>entries.forEach(entry=> {
      if(!entry.isIntersecting) return;
      document.querySelectorAll(".primary-nav a").forEach(link=> {
        if(link.hash===`#${entry.target.id}`) link.setAttribute("aria-current","location"); else link.removeAttribute("aria-current");
      });
    }),{rootMargin:"-15% 0px -60% 0px"});
    ["work","papers","vision"].forEach(id=>navObserver.observe(document.getElementById(id)));
  }
  let scrollQueued = false;
  const progress = document.querySelector(".page-progress");
  const updateProgress = () => {
    const distance = document.documentElement.scrollHeight-window.innerHeight;
    progress.style.transform = `scaleX(${distance>0?Math.min(1,Math.max(0,window.scrollY/distance)):0})`;
    scrollQueued = false;
  };
  window.addEventListener("scroll",()=> { if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress);} },{passive:true});
  window.addEventListener("resize",updateProgress);
  updateProgress();
  document.getElementById("year").textContent = new Date().getFullYear();

  function createSculpture() {
    const canvas = document.getElementById("particle-canvas");
    const context = canvas.getContext("2d");
    if(!context) return null;
    const stage = document.getElementById("particle-stage");
    let width=0,height=0,frame=0,lastFrame=0,phase=.6,visible=true,mode="orbit";
    let pointerX=0,pointerY=0,rotationX=.2,rotationY=.25;
    const total = 850;
    const golden = Math.PI*(3-Math.sqrt(5));
    const points = Array.from({length:total},(_,i)=>({i,x:0,y:0,z:0}));
    function position(i) {
      const y = 1-(i/(total-1))*2;
      const radius = Math.sqrt(1-y*y);
      const angle = golden*i;
      if(mode==="wave") {
        const col=i%34,row=Math.floor(i/34);
        const x=(col/33-0.5)*2.4,z=(row/24-0.5)*1.8;
        return [x,Math.sin(x*2.6+z*2+phase)*.3+Math.cos(z*3-phase*.6)*.12,z];
      }
      if(mode==="flow") {
        const t=i/(total-1)*Math.PI*7;
        const r=.46+.12*Math.sin(t*1.7+phase);
        return [Math.cos(t+phase*.16)*r,y*1.15,Math.sin(t+phase*.16)*r];
      }
      const ripple=1+.075*Math.sin(angle*3+y*4+phase);
      const x = Math.cos(angle)*radius*ripple;
      return [x + Math.sign(x)*.1,y*ripple,Math.sin(angle)*radius*ripple];
    }
    function draw() {
      context.clearRect(0,0,width,height);
      rotationX+=(.2+pointerY*.35-rotationX)*.05;
      rotationY+=(phase*.11+pointerX*.45-rotationY)*.05;
      const cx=Math.cos(rotationX),sx=Math.sin(rotationX),cy=Math.cos(rotationY),sy=Math.sin(rotationY);
      const scale=Math.min(width,height)*.34;
      const projected=points.map(point=> {
        const target=position(point.i);
        const blend=motionEnabled ? .065 : 1;
        point.x+=(target[0]-point.x)*blend;point.y+=(target[1]-point.y)*blend;point.z+=(target[2]-point.z)*blend;
        const x=point.x*cy+point.z*sy,z1=-point.x*sy+point.z*cy;
        const y=point.y*cx-z1*sx,z=point.y*sx+z1*cx;
        const perspective=3.8/(3.8-z);
        return {x:width/2+x*scale*perspective,y:height*.49+y*scale*perspective,z,size:(.8+(z+1.3)*.34)*perspective,index:point.i,tone:point.x < 0 ? "blue" : "red"};
      }).sort((a,b)=>a.z-b.z);
      projected.forEach(point=> {
        const alpha=Math.min(.96,Math.max(.18,(point.z+1.5)/2.6));
        context.fillStyle=point.tone === "blue" ? `rgba(35,80,216,${alpha})` : `rgba(217,45,67,${alpha})`;
        context.beginPath();context.arc(point.x,point.y,Math.max(.6,point.size),0,Math.PI*2);context.fill();
      });
    }
    function animate(time) {
      frame=0;
      if(!motionEnabled || !visible || document.hidden) return;
      if(time-lastFrame>30) {phase+=Math.min(time-lastFrame,60)*.00027;lastFrame=time;draw();}
      frame=requestAnimationFrame(animate);
    }
    function update() {
      if(frame) cancelAnimationFrame(frame);
      frame=0;draw();
      if(motionEnabled && visible && !document.hidden) {lastFrame=performance.now();frame=requestAnimationFrame(animate);}
    }
    function resize() {
      const rect=canvas.getBoundingClientRect();
      width=rect.width;height=rect.height;
      const dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      context.setTransform(dpr,0,0,dpr,0,0);
      update();
    }
    points.forEach(point=>{[point.x,point.y,point.z]=position(point.i);});
    canvas.addEventListener("pointermove",event=> {
      if(!motionEnabled || event.pointerType==="touch") return;
      const rect=canvas.getBoundingClientRect();
      pointerX=(event.clientX-rect.left)/rect.width-.5;pointerY=(event.clientY-rect.top)/rect.height-.5;
    });
    canvas.addEventListener("pointerleave",()=>{pointerX=0;pointerY=0;});
    document.querySelectorAll("[data-shape]").forEach(button=>button.addEventListener("click",()=> {
      mode=button.dataset.shape;
      document.querySelectorAll("[data-shape]").forEach(item=> {
        item.classList.toggle("is-active",item===button);item.setAttribute("aria-pressed",String(item===button));
      });
      update();
    }));
    if("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas); else window.addEventListener("resize",resize);
    if("IntersectionObserver" in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:0}).observe(stage);
    document.addEventListener("visibilitychange",update);
    resize();
    return {update};
  }
  sculpture = createSculpture();
})();
