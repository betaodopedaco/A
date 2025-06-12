// Mapeia inicializadores
const inits = {
  section1: initSection1,
  section2: initSection2,
  section3: initSection3,
  section4: initSection4,
  section5: initSection5
};

// Intersection Observer genérico
const obs = new IntersectionObserver((entries, o) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('section-visible');
      inits[e.target.id]?.();
      o.unobserve(e.target);
    }
  });
}, { threshold: .4 });

document.querySelectorAll('.full-height-section').forEach(s => obs.observe(s));

// — Seção 1: vídeo + texto —
function initSection1(){
  const vid = document.getElementById('video1');
  const txts = [...document.querySelectorAll('.slogan-main, .slogan-sub, .btn')];
  if (vid.dataset.init) return;
  vid.dataset.init = true;
  vid.addEventListener('loadeddata', ()=> {
    vid.play().catch(()=>{/* fallback se bloqueado */});
    txts.forEach((el,i)=> setTimeout(()=> el.classList.add('visible'), i*700));
    vid.style.opacity = 1;
  });
  vid.load();
}

// — Seção 2: texto + globo 3D —
function initSection2(){
  const txt = document.getElementById('neoTexto');
  const container = document.getElementById('scene-container-2');
  if (container.dataset.init) return;
  container.dataset.init = true;
  txt.classList.add('revealed');
  // Three.js: globo
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, .1, 1000);
  const rnd = new THREE.WebGLRenderer({alpha:true, antialias:true});
  rnd.setSize(container.clientWidth,container.clientHeight);
  container.appendChild(rnd.domElement);
  cam.position.z = 4;
  const globe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2,2),
    new THREE.MeshPhongMaterial({color:0xffffff, wireframe:true})
  );
  scene.add(globe);
  scene.add(new THREE.AmbientLight(0x888888, .6));
  scene.add(Object.assign(new THREE.PointLight(0xffffff,1), { position:{x:5,y:5,z:5} }));
  (function anim(){
    globe.rotation.y += .002;
    rnd.render(scene, cam);
    requestAnimationFrame(anim);
  })();
}

// — Seção 3, 4 e 5: lógica similar —
function initSection3(){ /* vídeo + troca de slogans */ }
function initSection4(){ /* octahedrons 3D */ }
function initSection5(){ /* vídeos/takes e overlay */ }
