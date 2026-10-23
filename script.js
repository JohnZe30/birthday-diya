"use strict";

/* =====================================================================
   CONFIGURATION: change everything about the site here.
   Images: put files in an "images" folder and use paths like
   "images/photo1.jpg". Leave a path empty ("") to show a placeholder.
   ===================================================================== */
const siteData = {
  girlfriendName: "Diya",
  introMessage: "For the love of my life, To the girl I love the most int this whole world, To the girl that makes my day brighter everyday just by being you, Diya",
  fromName: "Your Lover, Your Boyfriend Sofi",
  floaters: ["💗", "💖", "💕", "🌸", "✨", "🩷"], // emojis that drift up the page ([] turns it off)

  story: [
    { title: "First meeting",          text: "Through someone you know who😊",  photo: "" },
    { title: "First memorable moment", text: "The time we spent on 'HOSANA' KidaneMiheret Church🩷",  photo: "" },
    { title: "Special date",           text: "That was my special date I keep thinking about",    photo: "" }
  ],

  photos: [
    { src: "images/photo1.jpg", caption: "You are cute and beautiful since you're a baby💕" }, { src: "images/photo2.jpg", caption: "not just cute HOT TOO😭💖" }, { src: "images/photo3.jpg", caption: "iconic since birth😘" },
    { src: "images/photo4.jpg", caption: "fashionista too😍" }, { src: "images/photo5.jpg", caption: "our favorite photo" }, { src: "images/photo6.jpg", caption: "You got my heart like this😫" }
  ],

  reasons: [
    { title: "Your Laugh", detail: "It's my favorite sound. I'll say almost anything just to her it again." },
    { title: "I can just be myself", detail: "I don't have to perform or try hard. I'm me, and you like that." },
    { title: "The way you believe in me.", detail: "On the days I doubt myself, you don't. That carries me further than you know." },
    { title: "How strong you are", detail: "You get through hard things quietly, and I'm proud of you every time." },
    { title: "Just you", detail: "NOthing about you needs fixing. I'd choose you again in any ordinary day." }
  ],

  memories: [
    { text: "[MEMORY 1]", image: "images/memory1.jpg" },
    { text: "[MEMORY 2]", image: "images/photo5.jpg" },
    { text: "[MEMORY 3]", image: "images/photo6.jpg" },
    { text: "[MEMORY 4]", image: "images/memory4.jpg" },
    { text: "[MEMORY 5]", image: "images/memory5.jpg" }
  ],

  // Separate paragraphs with a blank line (\n\n)
  openWhen: [
    { label: "Open when you're sad 🥺",
      message: "Hey. I'm sorry today is heavy. You don't have to explain it or fix it right now.\n\nSit for a minute. Drink some water, put on a song you like, and let yourself be sad for a bit. Feelings like this pass, even when they're loud.\n\nWhen you're ready, text me. I'll listen, or I'll just send you dumb stuff until you laugh. Either way, I'm on your side." },
    { label: "Open when you miss me 💭",
      message: "I miss you too. Probably right now, actually.\n\nThink of the last time we laughed so hard we couldn't breathe. Hold onto that one. It's still ours.\n\nI'm only a message away, and we've got the next plan to look forward to. Go ahead and text me. I'll answer." },
    { label: "Open when you're bored 🎈",
      message: "Okay, boredom emergency. Pick one.\n\nSend me a photo of the weirdest thing near you right now. Or find a song that reminds you of us and tell me why. Or text me the first thing you'd do with a free day tomorrow, and we'll plan it for real.\n\nIf none of that works, call me. I'm always up for wasting time with you." },
    { label: "Open when you need motivation 💪",
      message: "You've got this. I mean it.\n\nYou've gotten through harder days than this one, and I've watched you do it. Take the next small step, just one. Not the whole mountain.\n\nBe proud of how far you've come, even on the days it doesn't feel like much. I'm cheering for you, loudly." },
    { label: "Open when you need a smile 😊",
      message: "Smile check: you're doing it right now, aren't you?\n\nHere's your reminder that you make my days better just by being you, and I'm lucky I get to be on the receiving end of your laugh.\n\nNow go do one small thing that makes today better. Then tell me about it." }
  ],

  playlist: [ // audio paths are relative to index.html
    { audio: "music/song.mp3" },
   
  ],

  bucketList: [
    "Visit a new place 🗺️", "Take a trip together ✈️", "Try a new restaurant 🍝",
    "Take more photos 📷", "Watch a movie together 🎬", "Create another memory 💫"
  ],

  // Type the keyword anywhere on the page, or find the pressed flower in "Open when..."
  secret: { keyword: "remember", message: "[SECRET MESSAGE]" },

  finalLetter: "Diya, making this little corner of the internet for you was my way of gathering up some of the love I feel and putting it somewhere you can visit whenever you need a reminder. I hope it makes you smile and helps you feel just how special you are to me.\n\nThank you for being yourself and for letting me share so many little moments with you. I’m grateful for the laughter, the conversations, and all the ordinary days that feel brighter because you’re in them. I’m always cheering for you, and I hope you know how loved you are.\n\nThere are still so many memories ahead of us, and I’m excited for every one. Whatever comes next, I’ll be happy to keep choosing you, one day at a time. I love you. — Sofi"
};

/* =====================================================================
   HELPERS
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Tiny element builder: h("p", {class: "x", onclick: fn}, "text", childNode)
function h(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  e.append(...kids.filter(Boolean));
  return e;
}
function shuffle(a) {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// An <img>, or a labelled placeholder if the path is empty or broken
function photo(src, label) {
  const ph = () => h("span", { class: "ph" }, label);
  if (!src) return ph();
  const img = h("img", { src, alt: label, loading: "lazy" });
  img.onerror = () => img.replaceWith(ph());
  return img;
}

/* =====================================================================
   MODULES
   ===================================================================== */

/* One <dialog> shared by lightbox, letters and the secret */
const Modal = {
  dlg: $("#dlg"),
  open(node, cls = "") {
    $("#dlg-body").replaceChildren(node);
    this.dlg.className = cls;
    this.dlg.onkeydown = null;
    document.body.classList.add("modal");
    this.dlg.showModal();
  },
  init() {
    this.dlg.addEventListener("click", e => { if (e.target === this.dlg) this.dlg.close(); });
    this.dlg.addEventListener("close", () => {
      document.body.classList.remove("modal");
      if (this.onclose) { this.onclose(); this.onclose = null; }
    });
  }
};

/* Hearts and emojis that drift slowly up the page (skipped if reduced motion is on) */
const Floaters = {
  init() {
    if (reduceMotion || !siteData.floaters.length) return;
    const layer = h("div", { class: "floaters", "aria-hidden": "true" });
    document.body.append(layer);
    const rand = (a, b) => a + Math.random() * (b - a);
    const spawn = () => {
      if (document.hidden || layer.children.length >= 14) return;
      const f = h("span", { class: "floater" }, siteData.floaters[Math.floor(Math.random() * siteData.floaters.length)]);
      f.style.cssText = `--x:${rand(2, 96)}%;--s:${rand(18, 34)}px;--d:${rand(10, 18)}s;--dx:${rand(-60, 60)}px;--rot:${rand(-40, 40)}deg`;
      f.addEventListener("animationend", () => f.remove());
      layer.append(f);
    };
    spawn();
    setInterval(spawn, 1100);
  }
};

/* Opening screen: letters rise, then the curtain carries her into the site */
const Intro = {
  init() {
    const name = siteData.girlfriendName, el = $(".name");
    document.title = "For " + name;
    el.setAttribute("aria-label", name);
    el.append(...[...name].map((c, i) => h("span", { "aria-hidden": "true" }, h("i", { style: `--i:${i}` }, c))));
    $("[data-intro]").textContent = siteData.introMessage;
    $("#enter").addEventListener("click", () => this.enter());
  },
  async enter() {
    Playlist.play();
    const c = $("#curtain"), t = reduceMotion ? 1 : 650, ease = "cubic-bezier(.7,0,.3,1)";
    await c.animate([{ transform: "translateY(100%)" }, { transform: "none" }], { duration: t, easing: ease, fill: "forwards" }).finished;
    $("#intro").hidden = true;
    $("#site").hidden = false;
    document.body.classList.remove("locked");
    scrollTo({ top: 0, behavior: "instant" });
    await c.animate([{ transform: "none" }, { transform: "translateY(-100%)" }], { duration: t, delay: 150, easing: ease, fill: "forwards" }).finished;
    c.getAnimations().forEach(a => a.cancel());
  }
};

/* Contents menu + scroll progress line */
const Nav = {
  init() {
    $$("[data-name]").forEach(e => (e.textContent = siteData.girlfriendName));
    const btn = $(".bar__btn"), toc = $("#toc");
    const set = open => { toc.classList.toggle("open", open); btn.setAttribute("aria-expanded", open); };
    btn.addEventListener("click", () => set(!toc.classList.contains("open")));
    toc.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
    addEventListener("keydown", e => { if (e.key === "Escape") set(false); });
    const bar = $(".progress");
    addEventListener("scroll", () => {
      bar.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100 + "%";
    }, { passive: true });
  }
};

/* Fades headings, timeline entries and polaroids in once, as they arrive */
const Reveal = {
  init() {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    $$(".reveal").forEach(e => io.observe(e));
  }
};

/* Photo viewer: arrows, keyboard and swipe-free buttons */
const Lightbox = {
  show(items, i) {
    this.items = items; this.i = i;
    this.box = h("div", { class: "lbox" });
    this.draw();
    Modal.open(this.box, "lb");
    Modal.dlg.onkeydown = e => {
      if (e.key === "ArrowRight") this.go(1);
      if (e.key === "ArrowLeft") this.go(-1);
    };
  },
  go(d) { this.i = (this.i + d + this.items.length) % this.items.length; this.draw(); },
  draw() {
    const it = this.items[this.i], many = this.items.length > 1;
    this.box.replaceChildren(...[
      photo(it.src, it.caption),
      h("p", { class: "cap" }, it.caption),
      many && h("div", { class: "lbnav" },
        h("button", { class: "btn", "aria-label": "Previous photo", onclick: () => this.go(-1) }, "\u2039"),
        h("span", {}, `${this.i + 1} of ${this.items.length}`),
        h("button", { class: "btn", "aria-label": "Next photo", onclick: () => this.go(1) }, "\u203A"))
    ].filter(Boolean));
  }
};

/* Our story: vertical timeline, optional photos open in the lightbox */
const Story = {
  init() {
    $("#timeline").append(...siteData.story.map(s => h("li", { class: "tl reveal" },
      h("div", {},
        h("h3", {}, s.title),
        h("p", {}, s.text),
        s.photo && h("button", { class: "tlfig", "aria-label": "Open photo: " + s.title,
          onclick: () => Lightbox.show([{ src: s.photo, caption: s.title }], 0) }, photo(s.photo, "[PHOTO]"))))));
  }
};

/* Photo memories: scattered polaroids (rotation/size are set in CSS by position) */
const Gallery = {
  init() {
    const items = siteData.photos;
    $("#gallery").append(...items.map((p, i) => h("button", {
      class: "pol reveal", "aria-label": "Open photo: " + p.caption, onclick: () => Lightbox.show(items, i)
    }, photo(p.src, `[PHOTO ${i + 1}]`), h("span", { class: "cap" }, p.caption))));
  }
};

/* Things I love about you: tap a card to highlight it and read the rest */
const Reasons = {
  init() {
    $("#reasons-list").append(...siteData.reasons.map(r => {
      const card = h("article", { class: "reason" });
      const btn = h("button", { "aria-expanded": "false" }, h("span", {}, r.title));
      btn.onclick = () => btn.setAttribute("aria-expanded", card.classList.toggle("open"));
      card.append(btn, h("p", {}, r.detail));
      return card;
    }));
  }
};

/* Memory jar: shuffled deck so memories don't repeat until all have been drawn */
const Jar = {
  deck: [], last: null,
  init() {
    const btn = $("#jar-btn"), slip = $("#slip");
    btn.onclick = () => {
      if (!this.deck.length) {
        this.deck = shuffle(siteData.memories);
        if (this.deck.length > 1 && this.deck.at(-1) === this.last) this.deck.unshift(this.deck.pop());
      }
      btn.classList.remove("shake"); slip.classList.remove("show");
      void btn.offsetWidth; // restart the animation
      btn.classList.add("shake");
      setTimeout(() => {
        this.last = this.deck.pop();
        const memory = typeof this.last === "string" ? { text: this.last, image: "" } : this.last;
        slip.replaceChildren(
          memory.image && photo(memory.image, memory.text),
          h("p", {}, memory.text)
        );
        slip.classList.add("show");
      }, reduceMotion ? 0 : 450);
    };
  }
};

/* Open when...: the flap opens, then the letter appears in the dialog */
const OpenWhen = {
  init() {
    $("#envelopes").append(...siteData.openWhen.map(o => {
      const env = h("button", { class: "env" }, h("span", {}, o.label));
      env.onclick = () => {
        env.classList.add("open");
        setTimeout(() => {
          Modal.open(h("div", { class: "paper" }, h("h3", {}, o.label), ...o.message.split("\n\n").map(t => h("p", {}, t))));
          Modal.onclose = () => env.classList.replace("open", "done");
        }, reduceMotion ? 0 : 550);
      };
      return env;
    }));
  }
};

/* Song player */
const Playlist = {
  play() {
    const audio = $("#tracks audio");
    if (!audio) return;
    const error = audio.nextElementSibling;
    audio.play().catch(playError => {
      if (playError.name === "NotAllowedError") {
        error.textContent = "Your browser blocked automatic playback. Press Play on the song player.";
      } else if (audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        error.textContent = "Couldn't load the song. Serve this page over HTTP (not file://) and check that the MP3 exists.";
      } else {
        error.textContent = "Couldn't play the song. Check that the MP3 exists and try pressing Play on the song player.";
      }
      error.hidden = false;
    });
  },
  init() {
    const list = $("#tracks");
    siteData.playlist.forEach(s => {
      if (!s.audio) return;
      const source = h("source", { src: s.audio, type: "audio/mpeg" });
      const audio = h("audio", { class: "song-audio", controls: true, preload: "metadata" },
        source);
      const error = h("p", { class: "song-error", role: "status", hidden: true },
        `Couldn't load the song. Serve this page over HTTP (not file://) and check that "${s.audio}" exists and is a playable MP3.`);
      const showError = () => { error.hidden = false; };
      audio.addEventListener("error", showError);
      source.addEventListener("error", showError);
      list.append(h("li", { class: "track" }, audio, error));
      audio.load();
    });
  }
};

/* Things we still have to do: checkboxes remembered in localStorage */
const Future = {
  key: "future-list-v1",
  init() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(this.key)) || {}; } catch (e) {}
    const list = $("#bucket"), count = $("#count");
    const update = () => {
      const boxes = $$("input", list), done = boxes.filter(b => b.checked).length;
      count.textContent = done === boxes.length ? "All done. Time to write a new list." : `${done} of ${boxes.length} done`;
      try { localStorage.setItem(this.key, JSON.stringify(Object.fromEntries(boxes.map(b => [b.dataset.k, b.checked])))); } catch (e) {}
    };
    siteData.bucketList.forEach(text => {
      const box = h("input", { type: "checkbox", "data-k": text });
      box.checked = !!saved[text];
      box.onchange = update;
      list.append(h("li", {}, h("label", {}, box, h("span", {}, text))));
    });
    update();
  }
};

/* Easter egg: type the keyword anywhere, or find the pressed flower */
const Secret = {
  init() {
    const word = siteData.secret.keyword.toLowerCase();
    let typed = "";
    addEventListener("keydown", e => {
      if (e.key.length > 1 || e.ctrlKey || e.metaKey || e.target.closest("input,textarea")) return;
      typed = (typed + e.key.toLowerCase()).slice(-word.length);
      if (typed === word) this.show();
    });
    $("#flower").onclick = () => this.show();
  },
  show() {
    Modal.open(h("div", { class: "paper" }, h("h3", {}, "You found it. 🌸"), h("p", {}, siteData.secret.message)));
  }
};

/* Final surprise: the letter arrives one paragraph at a time */
const Final = {
  init() {
    const btn = $("#last"), letter = $("#letter");
    btn.onclick = () => {
      btn.hidden = true;
      letter.hidden = false;
      letter.replaceChildren(
        ...siteData.finalLetter.split("\n\n").map(t => h("p", {}, t)),
        h("p", { class: "sign" }, siteData.fromName));
      letter.scrollIntoView({ behavior: "smooth", block: "center" });
      $$("p", letter).forEach((p, i) => setTimeout(() => p.classList.add("in"), (reduceMotion ? 0 : 600) + i * (reduceMotion ? 0 : 1100)));
    };
  }
};

/* =====================================================================
   START
   ===================================================================== */
[Modal, Floaters, Intro, Nav, Story, Gallery, Reasons, Jar, OpenWhen, Playlist, Future, Secret, Final].forEach(m => m.init());
Reveal.init();
