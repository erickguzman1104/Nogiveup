/* ── NoGiveUp — app.js ── */

// ── DATA ──────────────────────────────────────────────────────────────────
const frases = {
  all: [
    { texto: "El éxito no llega de lo que haces ocasionalmente, sino de lo que haces consistentemente.", autor: "Marie Forleo", cat: "disciplina" },
    { texto: "No esperes el momento perfecto. Toma el momento y hazlo perfecto.", autor: "Zoey Sayward", cat: "accion" },
    { texto: "Tu único límite eres tú mismo.", autor: "Anónimo", cat: "mindset" },
    { texto: "Cada día es una nueva oportunidad para cambiar tu vida.", autor: "Anónimo", cat: "exito" },
    { texto: "La disciplina es el puente entre metas y logros.", autor: "Jim Rohn", cat: "disciplina" },
    { texto: "No te detengas cuando estés cansado. Detente cuando hayas terminado.", autor: "David Goggins", cat: "accion" },
    { texto: "Cree en ti mismo y todo lo demás vendrá solo.", autor: "Anónimo", cat: "mindset" },
    { texto: "El fracaso es solo la oportunidad de comenzar de nuevo, esta vez con más inteligencia.", autor: "Henry Ford", cat: "exito" },
    { texto: "Un pequeño progreso cada día se convierte en grandes resultados.", autor: "Satya Nani", cat: "disciplina" },
    { texto: "Las personas que no arriesgan nada, arriesgan todo.", autor: "Erica Jong", cat: "accion" },
    { texto: "La actitud es una pequeña cosa que hace una gran diferencia.", autor: "Winston Churchill", cat: "mindset" },
    { texto: "No cuentes los días, haz que los días cuenten.", autor: "Muhammad Ali", cat: "exito" },
    { texto: "Lo que sea que la mente del hombre pueda concebir y creer, puede lograrlo.", autor: "Napoleon Hill", cat: "mindset" },
    { texto: "La única forma de hacer un gran trabajo es amar lo que haces.", autor: "Steve Jobs", cat: "exito" },
    { texto: "Si puedes soñarlo, puedes hacerlo.", autor: "Walt Disney", cat: "accion" },
  ],
};

const retos = [
  { emoji: "🧘", titulo: "10 min de meditación", desc: "Cierra los ojos y respira profundo. Empieza con solo 10 minutos.", dificultad: "facil" },
  { emoji: "📚", titulo: "Leer 20 páginas", desc: "Elige un libro que te inspire y lee al menos 20 páginas hoy.", dificultad: "facil" },
  { emoji: "🏃", titulo: "30 min de ejercicio", desc: "Sal a correr, haz HIIT o sigue una rutina en casa.", dificultad: "medio" },
  { emoji: "💧", titulo: "8 vasos de agua", desc: "Hidrátate correctamente durante todo el día. Tu cerebro lo agradecerá.", dificultad: "facil" },
  { emoji: "📵", titulo: "Sin redes sociales 4h", desc: "Desconéctate de las redes y conéctate con tus metas reales.", dificultad: "medio" },
  { emoji: "✍️", titulo: "Escribe tus 3 metas del día", desc: "Cada mañana escribe 3 cosas específicas que quieres lograr.", dificultad: "facil" },
  { emoji: "🥗", titulo: "Comer saludable", desc: "Sin comida chatarra hoy. Frutas, proteínas y vegetales.", dificultad: "medio" },
  { emoji: "🌅", titulo: "Despertar a las 6am", desc: "Gana 2 horas al resto del mundo. Madruga y domina el día.", dificultad: "dificil" },
  { emoji: "🚿", titulo: "Ducha fría por 1 min", desc: "Entrena tu mente con disciplina. 60 segundos de agua fría.", dificultad: "dificil" },
];

const habitos = [
  { texto: "Meditar 10 minutos", emoji: "🧘" },
  { texto: "Leer 20 páginas", emoji: "📖" },
  { texto: "Hacer ejercicio", emoji: "🏋️" },
  { texto: "Sin redes sociales antes del mediodía", emoji: "📵" },
  { texto: "Escribir en mi diario", emoji: "✍️" },
];

const testimonios = [
  { nombre: "Rodrigo M.", edad: "19 años · México", avatar: "🦁", quote: "Tenía 17 años cuando encontré NoGiveUp. Estaba a punto de dejar la escuela. Hoy terminé mi primer semestre universitario con honores.", tag: "#NoMásExcusas", estrellas: 5 },
  { nombre: "Valeria S.", edad: "22 años · Colombia", avatar: "🔥", quote: "Las frases diarias se convirtieron en mi ritual mañanero. Me cambió la perspectiva completamente. Ya no espero motivación, creo disciplina.", tag: "#DisciplinaGana", estrellas: 5 },
  { nombre: "Carlos R.", edad: "20 años · Argentina", avatar: "💪", quote: "Los retos semanales me empujaron a salir de mi zona de confort. En 3 meses perdí 10kg y empecé mi propio negocio.", tag: "#MiMejorVersion", estrellas: 5 },
  { nombre: "Sofía L.", edad: "21 años · Chile", avatar: "⚡", quote: "El tracker de hábitos es lo que más me ayuda. Ver la barra llenarse cada día me da una satisfacción increíble.", tag: "#HabitosCambian", estrellas: 5 },
  { nombre: "Diego T.", edad: "18 años · Perú", avatar: "🚀", quote: "Pensé que la motivación era algo que tenías o no tenías. NoGiveUp me enseñó que es un músculo que entrenas cada día.", tag: "#SinRendirse", estrellas: 5 },
  { nombre: "Mariana F.", edad: "23 años · España", avatar: "🌟", quote: "La comunidad me hizo entender que no estoy solo en mis luchas. Todos pasamos por lo mismo. La clave es no parar.", tag: "#ComunidadFuerte", estrellas: 5 },
];

// ── STATE ──────────────────────────────────────────────────────────────────
let currentCat = "all";
let currentFraseIndex = 0;
let likes = {};
let completedRetos = new Set(JSON.parse(localStorage.getItem("completedRetos") || "[]"));
let doneHabits = new Set(JSON.parse(localStorage.getItem("doneHabits") || "[]"));
let likeData = JSON.parse(localStorage.getItem("likeData") || "{}");

// ── UTILS ──────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

function animateCount(el, target) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString("es-MX");
    if (current >= target) clearInterval(timer);
  }, 25);
}

// ── FRASES ──────────────────────────────────────────────────────────────────
function getFrasesForCat() {
  if (currentCat === "all") return frases.all;
  return frases.all.filter(f => f.cat === currentCat);
}

function renderFrase() {
  const pool = getFrasesForCat();
  if (!pool.length) return;
  const f = pool[currentFraseIndex % pool.length];
  const key = f.texto.slice(0, 20);
  document.getElementById("fraseText").textContent = f.texto;
  document.getElementById("fraseAuthor").textContent = "— " + f.autor;
  document.getElementById("likeCount").textContent = likeData[key] || 0;
  document.getElementById("fraseCard").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("fraseCard").style.opacity = "1";
    document.getElementById("fraseCard").style.transition = "opacity 0.4s ease";
  }, 50);
}

function nextFrase() {
  const pool = getFrasesForCat();
  currentFraseIndex = (currentFraseIndex + 1) % pool.length;
  renderFrase();
}

document.getElementById("btnNew").addEventListener("click", nextFrase);

document.getElementById("btnLike").addEventListener("click", () => {
  const pool = getFrasesForCat();
  const f = pool[currentFraseIndex % pool.length];
  const key = f.texto.slice(0, 20);
  likeData[key] = (likeData[key] || 0) + 1;
  localStorage.setItem("likeData", JSON.stringify(likeData));
  document.getElementById("likeCount").textContent = likeData[key];
  showToast("❤️ ¡Frase guardada como favorita!");
});

document.getElementById("btnShare").addEventListener("click", () => {
  const pool = getFrasesForCat();
  const f = pool[currentFraseIndex % pool.length];
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`"${f.texto}" — ${f.autor} | NoGiveUp 🔥`);
    showToast("🔗 ¡Frase copiada al portapapeles!");
  }
});

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    currentFraseIndex = 0;
    renderFrase();
  });
});

// ── PHONE MOCKUP ──────────────────────────────────────────────────────────
document.getElementById("phoneBtn").addEventListener("click", () => {
  const pool = frases.all;
  const f = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById("phoneQuote").textContent = `"${f.texto}"`;
  document.getElementById("phoneAuthor").textContent = `— ${f.autor}`;
});

// ── RETOS ────────────────────────────────────────────────────────────────
function renderRetos() {
  const grid = document.getElementById("retosGrid");
  grid.innerHTML = retos.map((r, i) => `
    <div class="reto-card ${completedRetos.has(i) ? "completed" : ""}" data-i="${i}">
      <div class="reto-emoji">${r.emoji}</div>
      <div class="reto-title">${r.titulo}</div>
      <div class="reto-desc">${r.desc}</div>
      <div class="reto-meta">
        <span class="reto-diff ${r.dificultad}">${r.dificultad.charAt(0).toUpperCase() + r.dificultad.slice(1)}</span>
        <span class="reto-check"></span>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".reto-card").forEach(card => {
    card.addEventListener("click", () => {
      const i = parseInt(card.dataset.i);
      if (completedRetos.has(i)) {
        completedRetos.delete(i);
        showToast("↩️ Reto desmarcado");
      } else {
        completedRetos.add(i);
        showToast("🏆 ¡Reto completado! ¡Sigue así!");
      }
      localStorage.setItem("completedRetos", JSON.stringify([...completedRetos]));
      renderRetos();
    });
  });
}

// ── HÁBITOS TRACKER ───────────────────────────────────────────────────────
function updateTracker() {
  const done = doneHabits.size;
  const total = habitos.length;
  const pct = Math.round((done / total) * 100);
  document.getElementById("trackerFill").style.width = pct + "%";
  document.getElementById("trackerProgress").textContent = `${done} / ${total} completados`;
  const msgs = [
    "¡Empieza tu día con energía! 💥",
    "¡Buen comienzo! Sigue adelante 💪",
    "¡Ya vas por la mitad! No pares 🔥",
    "¡Casi lo logras! Un esfuerzo más ⚡",
    "¡TODOS COMPLETADOS! Eres imparable 🏆",
  ];
  const idx = done === 0 ? 0 : done === total ? 4 : Math.min(Math.floor((done / total) * 4), 3);
  document.getElementById("trackerMsg").textContent = msgs[idx];
}

function renderHabitos() {
  const list = document.getElementById("habitosList");
  list.innerHTML = habitos.map((h, i) => `
    <div class="habito-item ${doneHabits.has(i) ? "done" : ""}" data-i="${i}">
      <div class="habito-check">${doneHabits.has(i) ? "✓" : ""}</div>
      <div class="habito-text">${h.texto}</div>
      <div class="habito-emoji">${h.emoji}</div>
    </div>
  `).join("");

  document.querySelectorAll(".habito-item").forEach(item => {
    item.addEventListener("click", () => {
      const i = parseInt(item.dataset.i);
      if (doneHabits.has(i)) { doneHabits.delete(i); } else {
        doneHabits.add(i);
        showToast("✅ ¡Hábito completado! La constancia es poder.");
      }
      localStorage.setItem("doneHabits", JSON.stringify([...doneHabits]));
      renderHabitos();
      updateTracker();
    });
  });
  updateTracker();
}

function setTrackerDate() {
  const d = new Date();
  const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  document.getElementById("trackerDate").textContent = d.toLocaleDateString("es-MX", opts);
}

// ── TESTIMONIOS ───────────────────────────────────────────────────────────
function renderTestimonios() {
  const grid = document.getElementById("testimoniosGrid");
  grid.innerHTML = testimonios.map(t => `
    <div class="testimonio-card">
      <div class="test-header">
        <div class="test-avatar">${t.avatar}</div>
        <div>
          <div class="test-name">${t.nombre}</div>
          <div class="test-meta">${t.edad}</div>
          <div class="test-stars">${"★".repeat(t.estrellas)}</div>
        </div>
      </div>
      <p class="test-quote">"${t.quote}"</p>
      <span class="test-tag">${t.tag}</span>
    </div>
  `).join("");
}

// ── COUNTER ANIMATION ─────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      animateCount(e.target, target);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-num").forEach(el => observer.observe(el));

// ── MODAL ─────────────────────────────────────────────────────────────────
const overlay = document.getElementById("modalOverlay");
const modalBtn = document.getElementById("modalBtn");
const modalClose = document.getElementById("modalClose");
const modalName = document.getElementById("modalName");
const modalGreet = document.getElementById("modalGreet");

function openModal() { overlay.classList.add("active"); }
function closeModal() { overlay.classList.remove("active"); }

document.getElementById("btnLogin").addEventListener("click", openModal);
document.getElementById("btnStart").addEventListener("click", openModal);
document.getElementById("btnCTA").addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });

modalBtn.addEventListener("click", () => {
  const name = modalName.value.trim();
  if (!name) { modalGreet.textContent = "¡Escribe tu nombre para continuar!"; return; }
  modalGreet.textContent = `¡Bienvenido, ${name}! 🔥 ¡Esto apenas comienza!`;
  setTimeout(closeModal, 1800);
  showToast(`🚀 ¡Bienvenido, ${name}! ¡NoGiveUp!`);
});

// ── FRASE → SECTION SCROLL ────────────────────────────────────────────────
document.getElementById("btnFrase").addEventListener("click", () => {
  document.getElementById("frase").scrollIntoView({ behavior: "smooth" });
});

// ── HAMBURGER ─────────────────────────────────────────────────────────────
document.getElementById("hamburger").addEventListener("click", () => {
  const links = document.querySelector(".nav-links");
  links.style.display = links.style.display === "flex" ? "none" : "flex";
  links.style.flexDirection = "column";
  links.style.position = "absolute";
  links.style.top = "70px";
  links.style.left = "0";
  links.style.right = "0";
  links.style.background = "rgba(13,13,26,0.97)";
  links.style.padding = "1.5rem 2.5rem";
  links.style.gap = "1.2rem";
});

// ── INIT ──────────────────────────────────────────────────────────────────
renderFrase();
renderRetos();
renderHabitos();
renderTestimonios();
setTrackerDate();

// Auto-rotate frase every 8 seconds
setInterval(nextFrase, 8000);
