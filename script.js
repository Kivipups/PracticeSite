/* eslint-disable no-console */
// =====================================================
//  Full rewrite with requested changes:
//  - Global font: Press Start 2P (CSS)
//  - VN speech font: Kivvi -> Comic Sans, Pestolett -> script (CSS classes)
//  - Speech audio while characters are talking
//  - Hover/click button SFX (random on hover, select on click)
//  - Character select sprites swap on hover (kivvi_choice / pest_choice)
// =====================================================

// ---------- Assets / data ----------
const ASSETS = {
  sprites: {
    kivvi: "assets/sprites/kivvi.png",
    pestolett: "assets/sprites/pestolett.png",
    pay: "assets/sprites/pay.png",
    PayKivvi: "assets/sprites/PayKivvi.png",
    invent: "assets/sprites/invent.png",

    kivvi_choice: "assets/sprites/kivvi_choice.png",
    pest_choice: "assets/sprites/pest_choice.png",
  },
  backgrounds: {
    menu: "assets/backgrounds/menu.jpg",
    edu: {
      normal: "assets/backgrounds/menu.jpg",
      office2gis: "assets/backgrounds/2gis.jpg",
      merch: "assets/backgrounds/merch.jpg",
    },
    certs: {
      kivvi: "assets/backgrounds/back_kivi.jpg",
      pestolett: "assets/backgrounds/back_pest.jpg",
    },
    prod: {
      pest: "assets/backgrounds/back_pest.jpg",
      kivvi: "assets/backgrounds/back_kivi.jpg",
      vsrato: "assets/backgrounds/vsrato.jpg",
      pims: "assets/backgrounds/pims.jpg",
    },
  },
};

const CERTS_DATA = {
  kivvi: [
    { title: "Сертификат по Генеративному искусству от Сбербанка", src: "assets/certificates/kivvi/gen_art_kivvi.png" },
    { title: "Сертификат по Контейнеризации с Docker От Yandex", src: "assets/certificates/kivvi/docker_kivvi.jpg" },
    { title: "Сертификат по Работе с LLM GigaChat от Сбербанка", src: "assets/certificates/kivvi/giga_llm_kivvi.png" },
    { title: "Сертификат Stepik по курсу по Git", src: "assets/certificates/kivvi/stepik_git_kivvi.jpg" },
  ],
  pestolett: [
    { title: "Сертификат по Работе с LLM GigaChat от Сбербанка", src: "assets/certificates/pestolett/giga_pest.png" },
    { title: "Сертификат по Генеративному искусству от Сбербанка", src: "assets/certificates/pestolett/gen_art_pest.png" },
    { title: "Сертификат по Контейнеризации с Docker От Yandex", src: "assets/certificates/pestolett/docker_pest.jpg" },
    { title: "Сертификат по Cloud Computing От Yandex", src: "assets/certificates/pestolett/cloud_pest.jpg" },
    { title: "Сертификат Stepik по курсу по Python", src: "assets/certificates/pestolett/python_pest.jpg" },
    { title: "Сертификат Stepik по курсу по Git", src: "assets/certificates/pestolett/git_pest.jpg" },
  ],
};

const INFO_LINKS = {
  kivvi: {
    drive: "https://drive.google.com/drive/u/1/folders/1m42DsBRZL_APspDhyM_x3sjcUN4hMtWe",
    github: "https://github.com/Kivipups",
  },
  pestolett: {
    drive: "https://drive.google.com/drive/folders/1nITHWp53Fu3koJzYFWvjVHfJsKqK1sIU?usp=drive_link",
    github: "https://github.com/Meminttaa/PPnUP",
  },
};

const EDU_SLIDES = [
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, text: "Итак! Наша учебная практика была очень похожей, поэтому..." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.normal, text: "Поэтому мы решили рассказать о ней вместе." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, text: "Верно. На учебной практике мы в основном проходили курсы." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.normal, text: "Например, курсы на Stepik и в Yandex Cloud." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, text: "Ещё было несколько курсов от Сбера! Все сертификаты, которые мы получили, можно найти в отдельной вкладке главного меню." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.office2gis, text: "А ещё был день, когда мы со своей группой посетили офис 2ГИС!" },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.office2gis, text: "О да, там было очень красиво и интересно." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.office2gis, text: "Настолько, что кроме этой фотографии больше ничего нет?" },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.office2gis, text: "..." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.merch, text: "Зато мне дали мерч." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.normal, text: "В любом случае, мы ещё занимались лабораторными по базам данных в PostgreSQL!" },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, text: "А ещё под конец учебной практики нам повезло делать программу для заполнения шаблонов документов." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.normal, text: "Вышла довольно удобная штука. Кажется." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, text: "...Надеюсь." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, text: "Стоит ещё упомянуть про нашу работу в группе!" },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.normal, text: "Помимо всего, мы разрабатывали приложение для производства." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, text: "На мою несчастную печальную долю выпало сделать Colab-таблицу, где будет видно, какой инструмент пропал на видео." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.normal, text: "А в мои обязанности входило добавить код и видео в мобильное приложение." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, text: "Итак... на этом пока всё!" },
  { speaker: "kivvi", bg: ASSETS.backgrounds.edu.normal, text: "Спасибо за внимание! И не забудьте посмотреть наши сертификаты." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.edu.normal, italic: true, text: "О да, наши очень крутые супер-ультра-мега сертификаты." },
];

const PROD_PEST_SLIDES = [
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: 'Моя производственная практика прошла в ООО «Велес».' },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Часто мне поручали распечатывать документы, а иногда — отправлять их на нужные адреса компаний." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Ещё я занимался документацией: составлял договоры, проверял заявки на перевозки, вовремя их сканировал и отправлял на утверждение." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Такую работу мне выдавали несколько раз за две недели — сразу по мере поступления." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "При этом мне приходилось пользоваться новыми для меня сервисами, приложениями и сайтами — и это было достаточно здорово." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, overlayShow: ASSETS.sprites.pay, text: "За такой труд мне даже заплатили целую тысячу. Круто же, да?" },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, overlayHide: true, text: "В свободное время, когда работы не находилось, я проходил курсы на Stepik по Python или изучал материалы по программированию, которые интересовали лично меня." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Ох, и да: тут не будет ни одной фотографии с моей практики на производстве. Потому что у меня нет ни одной нормальной фотографии с производства." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.vsrato, text: "..." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.vsrato, text: "Они правда очень... странные..." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Ну вот и всё!" },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Теперь можно вернуться в главное меню и посмотреть, как обстоят дела у Kivvi. Ну или заглянуть в сертификаты — там тоже интересно." },
];

const PROD_KIVVI_SLIDES = [
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: "Добрый день, я Kivvi, и сейчас я расскажу о том, как проходила моя производственная практика." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: "Проходил я её на предприятии: 1-й Покровский пр., д. 5, Котельники (ИП Иванушкин Константин Михайлович)." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.pims, text: "На самом производстве я помогал с настройкой различного оборудования и подключением периферии." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: "За всё время работы на производстве мне также заплатили чуть больше 11 тысяч." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, overlayShow: ASSETS.sprites.PayKivvi, text: "Думаю, на киндер кантри хватит." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, overlayShow: ASSETS.sprites.invent, overlayBig: true, text: "На производстве помимо настройки оборудования я также заполнял документацию на поставку продукции и таблицы по инвентаризации имеющегося оборудования." },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, overlayHide: true, text: "На этом всё интересное касательно моей практики на производстве заканчивается." },
];

// ---------- "Производство" (Dinker) scenarios ----------
const FACTORY_KIVVI_SLIDES = [
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: 'Наше совместное с командой "PDF-файлы" производство является шоколадная фабрика "Dinker".', media: [{ type: "image", src: "assets/sprites/DinkerLogo.png", mode: "single" }] },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: 'Моей задачей в командной работе являлось создать для фабрики красивое и удобное мобильное приложение, в котором будет соответствующая информация по предприятию.' },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: 'Разрабатывал мобильное приложение я на сервисе "Glide". Вот так выглядит главное меню.', media: [
      { type: "image", src: "assets/sprites/Glide.png", mode: "two-up" },
      { type: "image", src: "assets/sprites/MainMenuDinker.png", mode: "two-up" },
    ] },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: "В нашем мобильном приложении также можно посмотреть на разные вкладки, внутри которых находится соответствующая информация по производству.", media: [
      { type: "image", src: "assets/sprites/Onanas.png", mode: "two-up" },
      { type: "image", src: "assets/sprites/OpZone.png", mode: "two-up" },
      { type: "image", src: "assets/sprites/Siz.png", mode: "two-up" },
      { type: "image", src: "assets/sprites/SortProduct.png", mode: "two-up" },
    ] },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: "Ознакомиться с приложением можно по верхней кнопке, а посмотреть видео-обзор мобильного приложения по нижней.", media: [
      { type: "action", label: "Открыть приложение", href: "https://dinker-factory.glide.page/" },
      { type: "action", label: "Видео-обзор", href: "https://drive.google.com/file/d/1T8ul0B3fR4Nsjzlbcb1-WTeCNKllSX3F/view?usp=sharing" },
    ] },
  { speaker: "kivvi", bg: ASSETS.backgrounds.prod.kivvi, text: 'На этом моя задача по работе в команде и с мобильным приложением шоколадной фабрики "Dinker" заканчивается. Обязательно просмотрите также работу Pestolette, там много интересного...' },
];

const FACTORY_PEST_SLIDES = [
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: 'Моим производством была шоколадная фабрика "Dinker", которая разрабатывалась вместе с командой PDF-файлов.', media: [{ type: "image", src: "assets/sprites/DinkerLogo.png", mode: "single" }] },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Первоначально моей задачей в команде был выбор и добавление цветов в настольную программу.", media: [{ type: "image", src: "assets/sprites/colours.png", mode: "single" }] },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Затем мне нужно было написать код, который будет отслеживать по видео пропажу инструментов и заносить эти данные в гугл таблицу.", media: [{ type: "image", src: "assets/sprites/table.png", mode: "single" }] },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Сам код был написан в Google Colab и работает благодаря подключению к Roboflow.", media: [
      { type: "image", src: "assets/sprites/code.png", mode: "two-up" },
      { type: "image", src: "assets/sprites/roboflow.png", mode: "two-up" },
    ] },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "Просмотреть код и заполненную таблицу можно по этой кнопке.", media: [
      { type: "action", label: "Код и таблица", href: "https://drive.google.com/drive/folders/14xLorwL8AI9qEvPBg5PmrVoVVacOmPle?usp=drive_link" },
    ] },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "На этом мои задачи для Dinker'а заканчиваются." },
  { speaker: "pestolett", bg: ASSETS.backgrounds.prod.pest, text: "И обязательно посмотрите на работу Kivvi, там много интересного и проделан такой невероятный труд.." },
];


// ---------- Music ----------
const MUSIC_PLAYLIST = [
  { title: "Shop", src: "assets/audio/Shop.mp3" },
  { title: "Snowy", src: "assets/audio/Snowy.mp3" },
  { title: "Dating", src: "assets/audio/Dating.mp3" },
  { title: "HisTheme", src: "assets/audio/HisTheme.mp3" },
  { title: "home", src: "assets/audio/home.mp3" },
  { title: "home2", src: "assets/audio/home2.mp3" },
  { title: "MEGALOVANIA", src: "assets/audio/MEGALOVANIA.mp3" },
  { title: "Menu", src: "assets/audio/Menu.mp3" },
  { title: "Reunited", src: "assets/audio/Reunited.mp3" },
];
let musicIndex = Math.floor(Math.random() * MUSIC_PLAYLIST.length);

// Undertale soul colors for the volume slider theme (7 souls)
const SOUL_COLORS = [
  { name: "determination", color: "#ff2d2d" }, // red
  { name: "bravery",       color: "#ff8c1a" }, // orange
  { name: "justice",       color: "#ffd400" }, // yellow
  { name: "kindness",      color: "#00ff66" }, // green
  { name: "patience",      color: "#39c7ff" }, // light blue / cyan
  { name: "integrity",     color: "#2b6bff" }, // blue
  { name: "perseverance",  color: "#b84cff" }, // purple
];

// ---------- UI helpers ----------
const $ = (id) => document.getElementById(id);
const UI = {
  screenMenu: $("screen-menu"),
  screenSelect: $("screen-select"),
  screenNovel: $("screen-novel"),
  screenCerts: $("screen-certs"),
  screenInfo: $("screen-info"),
  fadeLayer: $("fade-layer"),

  btnEdu: $("btn-edu"),
  btnProd: $("btn-prod"),
  btnFactory: $("btn-factory"),
  btnCerts: $("btn-certs"),
  btnInfo: $("btn-info"),

  selectTitle: $("select-title"),
  btnMenuFromSelect: $("btn-menu-from-select"),

  vnBg: $("vn-bg"),
  vnLeft: $("vn-left"),
  vnRight: $("vn-right"),
  vnName: $("vn-name"),
  vnText: $("vn-text"),
  btnNext: $("btn-next"),
  btnBack: $("btn-back"),
  btnMenuFromNovel: $("btn-menu-from-novel"),
  btnHistory: $("btn-history"),
  btnAuto: $("btn-auto"),
  historyModal: $("history-modal"),
  historyList: $("history-list"),
  historyClose: $("history-close"),
  vnOverlay: $("vn-overlay"),
  vnMedia: $("vn-media"),

  certsTitle: $("certs-title"),
  certsSubtitle: $("certs-subtitle"),
  certsList: $("certs-list"),
  btnMenuFromCerts: $("btn-menu-from-certs"),

  infoSubtitle: $("info-subtitle"),
  infoList: $("info-list"),
  btnMenuFromInfo: $("btn-menu-from-info"),

  imgModal: $("img-modal"),
  imgModalImg: $("img-modal-img"),
  imgModalClose: $("img-modal-close"),
  imgModalCaption: $("img-modal-caption"),

  bgm: $("bgm"),
  musicBtn: $("music-btn"),
  musicPanel: $("music-panel"),
  volumeWrap: $("volume-wrap"),
  volumeRange: $("volume-range"),
  musicToggle: $("music-toggle"),
  musicMute: $("music-mute"),
  trackTitle: $("track-title"),
  musicPrev: $("music-prev"),
  musicNext: $("music-next"),
};

const TRANSITION_MS = 350;

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function setActiveScreenInstant(screenEl) {
  [UI.screenMenu, UI.screenSelect, UI.screenNovel, UI.screenCerts, UI.screenInfo]
    .forEach((s) => s?.classList.remove("active"));
  screenEl?.classList.add("active");
  if (screenEl !== UI.screenNovel) clearMedia();
}

async function goToScreen(screenEl) {
  UI.fadeLayer?.classList.add("on");
  await sleep(TRANSITION_MS);
  setActiveScreenInstant(screenEl);
  await sleep(40);
  UI.fadeLayer?.classList.remove("on");
}

// ---------- Volume slider visuals ----------
function setVolumeRangeVisual() {
  if (!UI?.volumeRange) return;
  const v = Number(UI.volumeRange.value);
  const pct = Math.max(0, Math.min(100, Math.round(v * 100)));
  UI.volumeRange.style.setProperty("--vol-pct", pct + "%");
}

function applyVolumeSoulTheme(trackTitle, idx) {
  if (!UI?.volumeRange) return;
  const wrap = UI.volumeWrap;
  const title = String(trackTitle || "").toLowerCase();

  UI.volumeRange.classList.remove("rainbow", "mega", "dating", "menu");
  wrap?.classList.remove("rainbow", "mega", "dating", "menu");

  if (title === "histheme") {
    UI.volumeRange.classList.add("rainbow");
    wrap?.classList.add("rainbow");
    UI.volumeRange.style.removeProperty("--slider-color");
    UI.volumeRange.style.removeProperty("--thumb-color");
  } else if (title === "megalovania") {
    UI.volumeRange.classList.add("mega");
    wrap?.classList.add("mega");
    UI.volumeRange.style.setProperty("--slider-color", "#ffffff");
    UI.volumeRange.style.setProperty("--thumb-color", "#39c7ff");
  } else if (title === "dating") {
    UI.volumeRange.classList.add("dating");
    wrap?.classList.add("dating");
    UI.volumeRange.style.setProperty("--slider-color", "#ffd400");
    UI.volumeRange.style.setProperty("--thumb-color", "#ffd400");
  } else if (title === "menu") {
    UI.volumeRange.classList.add("menu");
    wrap?.classList.add("menu");
    UI.volumeRange.style.setProperty("--slider-color", "#ffd400");
    UI.volumeRange.style.removeProperty("--thumb-color");
  } else {
    const soul = SOUL_COLORS[idx % SOUL_COLORS.length];
    UI.volumeRange.style.setProperty("--slider-color", soul.color);
    UI.volumeRange.style.setProperty("--thumb-color", soul.color);
  }

  setVolumeRangeVisual();
}

function ensureVolumeSparkles() {
  if (!UI?.volumeWrap) return;
  if (UI.volumeWrap.querySelector(".sparkle")) return;
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= 10; i++) {
    const s = document.createElement("span");
    s.className = `sparkle s${i}`;
    s.textContent = "✦";
    frag.appendChild(s);
  }
  UI.volumeWrap.appendChild(frag);
}

// ---------- Music ----------
function setTrackTitle() {
  const t = MUSIC_PLAYLIST[musicIndex]?.title || "—";
  if (UI.trackTitle) UI.trackTitle.textContent = t;
  applyVolumeSoulTheme(t, musicIndex);
}

function loadTrack(idx, { autoplay = false } = {}) {
  if (!UI.bgm) return;
  const n = MUSIC_PLAYLIST.length;
  musicIndex = ((idx % n) + n) % n;
  const track = MUSIC_PLAYLIST[musicIndex];
  UI.bgm.src = track.src;
  setTrackTitle();
  UI.bgm.load();
  if (autoplay) UI.bgm.play().catch(() => {});
}

function nextTrack({ autoplay = true } = {}) { loadTrack(musicIndex + 1, { autoplay }); }
function prevTrack({ autoplay = true } = {}) { loadTrack(musicIndex - 1, { autoplay }); }

function ensureAudioStarted() {
  if (!UI.bgm) return;
  if (UI.bgm.dataset.started === "1") return;
  UI.bgm.play().then(() => {
    UI.bgm.dataset.started = "1";
    if (UI.musicToggle) UI.musicToggle.textContent = "Музыка играет";
  }).catch(() => {});
}

function setMusicOn() {
  ensureAudioStarted();
  if (!UI.bgm) return;
  UI.bgm.muted = false;
  UI.bgm.play().catch(() => {});
  if (UI.musicToggle) UI.musicToggle.textContent = "Музыка играет";
}

function setMusicOff() {
  if (!UI.bgm) return;
  UI.bgm.muted = true;
  if (UI.musicToggle) UI.musicToggle.textContent = "Включить звук";
  stopTalking();
}

function toggleMusicPanel() {
  UI.musicPanel?.classList.toggle("hidden");
}

// ---------- SFX + Speech ----------
const SFX = {
  hover: [
    "assets/audio/buttons/mus_note1.mp3",
    "assets/audio/buttons/mus_note2.mp3",
    "assets/audio/buttons/mus_note3.mp3",
    "assets/audio/buttons/mus_note4.mp3",
  ],
  select: "assets/audio/buttons/select-sound.mp3",
};
const SPEECH = {
  kivvi: "assets/audio/speech/Kivvi_Talking.mp3",
  pestolett: "assets/audio/speech/Pest_Talking.mp3",
};

function clamp01(x) { return Math.max(0, Math.min(1, x)); }
function getSfxVolume() { return clamp01(Number(UI.volumeRange?.value ?? 0.6)); }
function shouldMuteSfx() { return getSfxVolume() <= 0.001 || !!UI.bgm?.muted; }

function pickRandom(arr) {
  if (!arr?.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function playOneShot(src) {
  if (!src) return;
  const a = new Audio(src);
  a.preload = "auto";
  a.volume = getSfxVolume();
  a.muted = shouldMuteSfx();
  a.currentTime = 0;
  a.play().catch(() => {});
}

function playHoverSfx() {
  // если реально есть только mus_note1.mp3 — ничего страшного: массив можно оставить,
  // браузер просто не найдёт остальные файлы и они не заиграют.
  // Чтобы гарантировать звук — всегда добавляем note1 как fallback.
  const src = pickRandom(SFX.hover) || "assets/audio/buttons/mus_note1.mp3";
  playOneShot(src);
}
function playSelectSfx() { playOneShot(SFX.select); }

const speechAudio = {
  kivvi: new Audio(SPEECH.kivvi),
  pestolett: new Audio(SPEECH.pestolett),
};
speechAudio.kivvi.loop = true;
speechAudio.pestolett.loop = true;

let currentTalking = null;

function stopTalking() {
  if (!currentTalking) return;
  const a = speechAudio[currentTalking];
  if (a) {
    a.pause();
    a.currentTime = 0;
  }
  currentTalking = null;
}

function startTalking(speaker) {
  if (!speaker || !speechAudio[speaker]) return;

  if (currentTalking && currentTalking !== speaker) stopTalking();
  currentTalking = speaker;

  const a = speechAudio[speaker];
  a.volume = getSfxVolume();
  a.muted = shouldMuteSfx();
  a.currentTime = 0;
  a.play().catch(() => {});
}

function syncVolumes() {
  const v = getSfxVolume();
  if (UI.bgm) UI.bgm.volume = v;

  speechAudio.kivvi.volume = v;
  speechAudio.pestolett.volume = v;
  speechAudio.kivvi.muted = shouldMuteSfx();
  speechAudio.pestolett.muted = shouldMuteSfx();

  // hover speech for menu sprites
  if (typeof hoverSpeech !== "undefined") {
    hoverSpeech.kivvi.volume = v;
    hoverSpeech.pestolett.volume = v;
    hoverSpeech.kivvi.muted = shouldMuteSfx();
    hoverSpeech.pestolett.muted = shouldMuteSfx();
  }
}

// Button SFX: hover + click
function isInteractive(el) {
  if (!el) return false;
  if (el.matches("button:disabled,[aria-disabled='true']")) return false;
  if (el.classList.contains("disabled")) return false;
  return el.matches("button,a,[role='button']");
}

function wireGlobalButtonSfx() {
  document.addEventListener("pointerenter", (e) => {
    const el = e.target?.closest("button,a,[role='button']");
    if (!isInteractive(el)) return;
    playHoverSfx();
  }, true);

  document.addEventListener("focusin", (e) => {
    const el = e.target?.closest("button,a,[role='button']");
    if (!isInteractive(el)) return;
    playHoverSfx();
  });

  document.addEventListener("click", (e) => {
    const el = e.target?.closest("button,a,[role='button']");
    if (!isInteractive(el)) return;
    playSelectSfx();
  }, true);
}


// ---------- Welcome modal + Menu sprites hover ----------
function wireWelcomeModal(){
  const modal = document.getElementById("welcome-modal");
  const ok = document.getElementById("welcome-ok");
  if (!modal || !ok) return;

  const key = "welcome_dismissed_v1";
  const already = localStorage.getItem(key) === "1";
  if (already) {
    modal.classList.add("hidden");
    return;
  }

  const close = () => {
    modal.classList.add("hidden");
    localStorage.setItem(key, "1");
    // первый клик пользователя — хороший момент попытаться запустить звук (если он не выключен)
    ensureAudioStarted();
  };

  ok.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
}

const hoverSpeech = {
  kivvi: new Audio(SPEECH.kivvi),
  pestolett: new Audio(SPEECH.pestolett),
};
hoverSpeech.kivvi.loop = true;
hoverSpeech.pestolett.loop = true;

function stopHoverSpeech(who){
  const a = hoverSpeech[who];
  if (!a) return;
  a.pause();
  a.currentTime = 0;
}

function startHoverSpeech(who){
  const a = hoverSpeech[who];
  if (!a) return;
  a.volume = getSfxVolume();
  a.muted = shouldMuteSfx();
  a.currentTime = 0;
  a.play().catch(() => {});
}

function wireMenuSpriteHover(){
  const kivviSprite = document.querySelector(".menu-sprite.menu-kivvi");
  const pestSprite = document.querySelector(".menu-sprite.menu-pestolett");
  if (kivviSprite){
    kivviSprite.addEventListener("mouseenter", () => startHoverSpeech("kivvi"));
    kivviSprite.addEventListener("mouseleave", () => stopHoverSpeech("kivvi"));
    kivviSprite.addEventListener("focusin", () => startHoverSpeech("kivvi"));
    kivviSprite.addEventListener("focusout", () => stopHoverSpeech("kivvi"));
  }
  if (pestSprite){
    pestSprite.addEventListener("mouseenter", () => startHoverSpeech("pestolett"));
    pestSprite.addEventListener("mouseleave", () => stopHoverSpeech("pestolett"));
    pestSprite.addEventListener("focusin", () => startHoverSpeech("pestolett"));
    pestSprite.addEventListener("focusout", () => stopHoverSpeech("pestolett"));
  }
}

// ---------- VN engine ----------
let selectContext = null; // "prod" | "certs" | "info"
let storyKey = "edu"; // "edu" | "prod_kivvi" | "prod_pest"
let storyIndex = 0;
let storyHistory = [];
let autoTimer = null;

let typingTimer = null;
let isTyping = false;
let typingFullText = "";
let typingItalic = false;

function speakerLabel(speaker) {
  return speaker === "kivvi" ? "Kivvi" : "Pestolett";
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getSlides() {
  if (storyKey === "edu") return EDU_SLIDES;
  if (storyKey === "prod_pest") return PROD_PEST_SLIDES;
  if (storyKey === "prod_kivvi") return PROD_KIVVI_SLIDES;
  if (storyKey === "factory_kivvi") return FACTORY_KIVVI_SLIDES;
  if (storyKey === "factory_pest") return FACTORY_PEST_SLIDES;
  return EDU_SLIDES;
}

// VN sprites focus logic (as in original)
function setSpriteVisibility(leftVisible, rightVisible) {
  if (UI.vnLeft) UI.vnLeft.style.opacity = leftVisible ? "1" : "0";
  if (UI.vnRight) UI.vnRight.style.opacity = rightVisible ? "1" : "0";
}

function applyFocus(activeSpeaker, mode) {
  const slides = getSlides();
  const slide = slides[storyIndex];
  const speaker = slide?.speaker ?? activeSpeaker;

  if (mode === "none") {
    setSpriteVisibility(false, false);
    UI.vnLeft?.classList.remove("active", "inactive");
    UI.vnRight?.classList.remove("active", "inactive");
    return;
  }
  if (mode === "single-right") {
    setSpriteVisibility(false, true);
    UI.vnRight?.classList.add("active");
    UI.vnRight?.classList.remove("inactive");
    UI.vnLeft?.classList.remove("active", "inactive");
    return;
  }
  if (mode === "single-left") {
    setSpriteVisibility(true, false);
    UI.vnLeft?.classList.add("active");
    UI.vnLeft?.classList.remove("inactive");
    UI.vnRight?.classList.remove("active", "inactive");
    return;
  }

  // dual
  setSpriteVisibility(true, true);
  const leftActive = speaker === "kivvi";
  const rightActive = speaker === "pestolett";
  UI.vnLeft?.classList.toggle("active", leftActive);
  UI.vnLeft?.classList.toggle("inactive", !leftActive);
  UI.vnRight?.classList.toggle("active", rightActive);
  UI.vnRight?.classList.toggle("inactive", !rightActive);
}

// Overlay (image in VN)
function overlayShow(src, { big = false } = {}) {
  if (!UI.vnOverlay) return;
  UI.vnOverlay.classList.remove("hidden");
  UI.vnOverlay.classList.remove("slide-out-down");
  UI.vnOverlay.classList.toggle("big", !!big);
  UI.vnOverlay.src = src;
}

async function overlayHideWithSlideDown() {
  if (!UI.vnOverlay || UI.vnOverlay.classList.contains("hidden")) return;
  UI.vnOverlay.classList.remove("slide-out-down");
  void UI.vnOverlay.offsetWidth;
  UI.vnOverlay.classList.add("slide-out-down");
  await sleep(470);
  UI.vnOverlay.classList.add("hidden");
  UI.vnOverlay.classList.remove("slide-out-down");
  UI.vnOverlay.src = "";
}

function overlayInstantHide() {
  if (!UI.vnOverlay) return;
  UI.vnOverlay.classList.add("hidden");
  UI.vnOverlay.classList.remove("slide-out-down");
  UI.vnOverlay.src = "";
}

// ---------- VN media (images / link-buttons above text) ----------
let mediaFadeTimer = null;

function clearMedia() {
  if (!UI.vnMedia) return;
  UI.vnMedia.innerHTML = "";
  UI.vnMedia.classList.remove("show");
}

function setMedia(items = []) {
  if (!UI.vnMedia) return;

  UI.vnMedia.classList.remove("show");
  if (mediaFadeTimer) clearTimeout(mediaFadeTimer);

  mediaFadeTimer = setTimeout(() => {
    UI.vnMedia.innerHTML = "";

    const normalized = Array.isArray(items) ? items : [];
    if (!normalized.length) return;

    normalized.forEach((it) => {
      if (!it) return;

      if (it.type === "image") {
        const img = document.createElement("img");
        img.className = "media-img" + (it.mode === "two-up" ? " two-up" : "");
        img.src = it.src;
        img.alt = it.alt || "";
        img.loading = "eager";
        img.decoding = "async";
        UI.vnMedia.appendChild(img);
      } else if (it.type === "action") {
        const a = document.createElement("a");
        a.className = "action-link";
        a.href = it.href;
        a.target = "_blank";
        a.rel = "noopener";

        const img = document.createElement("img");
        img.src = "assets/easter/act.png";
        img.alt = it.label || "Открыть";
        img.dataset.normal = "assets/easter/act.png";
        img.dataset.hover = "assets/easter/act_active.png";

        a.addEventListener("mouseenter", () => { img.src = img.dataset.hover; });
        a.addEventListener("mouseleave", () => { img.src = img.dataset.normal; });

        a.appendChild(img);
        UI.vnMedia.appendChild(a);
      }
    });

    requestAnimationFrame(() => UI.vnMedia.classList.add("show"));
  }, 180);
}


// Fonts for VN speech (CSS classes)
function setSpeechFontBySpeaker(speaker) {
  if (!UI.vnText) return;
  UI.vnText.classList.remove("speaker-kivvi", "speaker-pestolett");
  if (speaker === "kivvi") UI.vnText.classList.add("speaker-kivvi");
  if (speaker === "pestolett") UI.vnText.classList.add("speaker-pestolett");
}

// Typing
function stopTyping() {
  if (typingTimer) clearInterval(typingTimer);
  typingTimer = null;
  isTyping = false;
  typingFullText = "";
  typingItalic = false;
  if (UI.btnNext) UI.btnNext.disabled = false;
  stopTalking();
}

function finishTypingNow() {
  if (!isTyping) return;
  if (typingItalic) UI.vnText.innerHTML = `<em class="fast-italic">${escapeHtml(typingFullText)}</em>`;
  else UI.vnText.textContent = typingFullText;
  stopTyping();
}

function startTyping(text, { italic = false, speed = 20, speaker = null } = {}) {
  stopTyping();
  isTyping = true;
  typingFullText = text;
  typingItalic = italic;

  if (UI.btnNext) UI.btnNext.disabled = true;

  setSpeechFontBySpeaker(speaker);
  startTalking(speaker);

  let i = 0;
  if (italic) UI.vnText.innerHTML = `<em class="fast-italic"></em>`;
  else UI.vnText.textContent = "";

  const target = italic ? UI.vnText.querySelector("em") : UI.vnText;

  typingTimer = setInterval(() => {
    i += 1;
    target.textContent = text.slice(0, i);
    if (i >= text.length) stopTyping();
  }, speed);
}

async function renderSlide() {
  if (UI.btnNext) UI.btnNext.classList.remove("hidden");

  const slides = getSlides();
  const slide = slides[storyIndex];
  if (!slide) return;

  if (UI.vnBg) UI.vnBg.style.backgroundImage = `url("${slide.bg}")`;

  if (storyKey === "edu") {
    if (UI.vnLeft) UI.vnLeft.src = ASSETS.sprites.kivvi;
    if (UI.vnRight) UI.vnRight.src = ASSETS.sprites.pestolett;
    applyFocus(slide.speaker, "dual");
  } else if (storyKey === "prod_pest" || storyKey === "factory_pest") {
    if (UI.vnRight) UI.vnRight.src = ASSETS.sprites.pestolett;
    applyFocus("pestolett", "single-right");
  } else if (storyKey === "prod_kivvi" || storyKey === "factory_kivvi") {
    if (UI.vnLeft) UI.vnLeft.src = ASSETS.sprites.kivvi;
    applyFocus("kivvi", "single-left");
  }

  if (UI.vnName) UI.vnName.textContent = speakerLabel(slide.speaker);

  if (slide.overlayShow) overlayShow(slide.overlayShow, { big: !!slide.overlayBig });
  if (slide.overlayHide) await overlayHideWithSlideDown();

  setMedia(slide.media || []);

  startTyping(slide.text, {
    italic: !!slide.italic,
    speed: slide.italic ? 12 : 20,
    speaker: slide.speaker,
  });
}

function storyDoneText() {
  if (storyKey === "edu") return "А другие разделы все еще очень ждут в главном меню.";
  if (storyKey === "prod_pest") return "У меня очень крутые сертификаты...";
  if (storyKey === "prod_kivvi") return "Спасибо за внимание. Можно вернуться в меню.";
  if (storyKey === "factory_kivvi") return "Можно вернуться в меню или посмотреть работу Pestolette.";
  if (storyKey === "factory_pest") return "Можно вернуться в меню или посмотреть работу Kivvi.";
  return "Конец.";
}

function showStoryEnd() {
  stopAuto();
  stopTyping();
  overlayInstantHide();

  UI.btnNext?.classList.add("hidden");
  const slides = getSlides();
  const last = slides[slides.length - 1];
  const lastSpeaker = last?.speaker || (storyKey === "prod_pest" ? "pestolett" : "kivvi");

  if (UI.vnName) UI.vnName.textContent = speakerLabel(lastSpeaker);
  setSpeechFontBySpeaker(lastSpeaker);
  if (UI.vnText) UI.vnText.textContent = storyDoneText();

  if (storyKey === "prod_pest") applyFocus("pestolett", "single-right");
  if (storyKey === "prod_kivvi") applyFocus("kivvi", "single-left");
}

function nextSlide() {
  if (isTyping) { finishTypingNow(); return; }

  const slides = getSlides();
  if (storyIndex >= slides.length) return;

  const current = slides[storyIndex];
  if (current) storyHistory.push({ who: speakerLabel(current.speaker), text: current.text, italic: !!current.italic });

  storyIndex += 1;
  if (storyIndex >= slides.length) { showStoryEnd(); return; }
  renderSlide();
}

function prevSlide() {
  stopAuto();
  UI.btnNext?.classList.remove("hidden");
  if (isTyping) { finishTypingNow(); return; }
  if (storyIndex <= 0) return;

  storyIndex -= 1;
  storyHistory = storyHistory.slice(0, Math.max(0, storyIndex));

  const slides = getSlides();
  const cur = slides[storyIndex];
  if (!cur?.overlayShow) overlayInstantHide();
  renderSlide();
}

// History modal
function openHistory() {
  if (!UI.historyList) return;
  UI.historyList.innerHTML = "";

  const slides = getSlides();
  const items = storyHistory.slice();
  if (slides[storyIndex]) {
    items.push({
      who: speakerLabel(slides[storyIndex].speaker),
      text: slides[storyIndex].text,
      italic: !!slides[storyIndex].italic,
      isCurrent: true,
    });
  }

  items.forEach((h) => {
    const div = document.createElement("div");
    div.className = "history-item";

    const who = document.createElement("div");
    who.className = "who";
    who.textContent = h.who + (h.isCurrent ? " (сейчас)" : "");

    const txt = document.createElement("div");
    txt.className = "txt";
    if (h.italic) txt.innerHTML = `<em>${escapeHtml(h.text)}</em>`;
    else txt.textContent = h.text;

    div.appendChild(who);
    div.appendChild(txt);
    UI.historyList.appendChild(div);
  });

  UI.historyModal?.classList.remove("hidden");
  UI.historyList.scrollTop = UI.historyList.scrollHeight;
}

function closeHistory() { UI.historyModal?.classList.add("hidden"); }

// Auto mode
function startAuto() {
  if (autoTimer) return;
  UI.btnAuto?.classList.remove("ghost");
  UI.btnAuto?.setAttribute("aria-pressed", "true");

  autoTimer = setInterval(() => {
    if (isTyping) { finishTypingNow(); return; }
    nextSlide();
  }, 2200);
}
function stopAuto() {
  if (!autoTimer) return;
  clearInterval(autoTimer);
  autoTimer = null;
  UI.btnAuto?.classList.add("ghost");
  UI.btnAuto?.setAttribute("aria-pressed", "false");
}
function toggleAuto() { autoTimer ? stopAuto() : startAuto(); }

// Image modal
function openImageModal(src, caption = "") {
  if (!UI.imgModal || !UI.imgModalImg) return;
  UI.imgModalImg.src = src;
  if (UI.imgModalCaption) UI.imgModalCaption.textContent = caption || "";
  UI.imgModal.classList.remove("hidden");
}
function closeImageModal() {
  UI.imgModal?.classList.add("hidden");
  if (UI.imgModalImg) UI.imgModalImg.src = "";
  if (UI.imgModalCaption) UI.imgModalCaption.textContent = "";
}

// Certs / info
async function openCertificates(character) {
  await goToScreen(UI.screenCerts);

  UI.screenCerts?.classList.toggle("theme-kivvi", character === "kivvi");
  UI.screenCerts?.classList.toggle("theme-pestolett", character === "pestolett");

  if (UI.certsSubtitle) {
    UI.certsSubtitle.textContent = character === "kivvi"
      ? "Сейчас вы просматриваете сертификаты Kivvi."
      : "Сейчас вы просматриваете сертификаты Pestolett.";
  }

  if (!UI.certsList) return;
  UI.certsList.innerHTML = "";

  (CERTS_DATA[character] || []).forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "certs-item";

    const title = document.createElement("div");
    title.className = "cert-title";
    title.textContent = item.title;

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = `certificate_${character}_${idx + 1}`;
    img.loading = "lazy";
    img.addEventListener("click", () => openImageModal(item.src, item.title));

    row.appendChild(title);
    row.appendChild(img);
    UI.certsList.appendChild(row);
  });
}

async function openInfo(character) {
  await goToScreen(UI.screenInfo);

  UI.screenInfo?.classList.toggle("theme-kivvi", character === "kivvi");
  UI.screenInfo?.classList.toggle("theme-pestolett", character === "pestolett");

  if (UI.infoSubtitle) UI.infoSubtitle.textContent = character === "kivvi" ? "Студент: Kivvi" : "Студент: Pestolett";

  const links = INFO_LINKS[character] || {};
  if (!UI.infoList) return;
  UI.infoList.innerHTML = "";

  const items = [
    { name: "Google Drive", desc: "Папка с материалами", url: links.drive },
    { name: "GitHub", desc: "Профиль / проекты", url: links.github },
  ];

  items.forEach((it) => {
    const row = document.createElement("div");
    row.className = "info-item";

    const left = document.createElement("div");
    left.className = "left";

    const n = document.createElement("div");
    n.className = "name";
    n.textContent = it.name;

    const d = document.createElement("div");
    d.className = "desc";
    d.textContent = it.desc;

    left.appendChild(n);
    left.appendChild(d);

    const a = document.createElement("a");
    a.className = "btn";
    a.href = it.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Открыть";

    row.appendChild(left);
    row.appendChild(a);
    UI.infoList.appendChild(row);
  });
}

// ---------- Select screen ----------
function setSelectContext(ctx) {
  selectContext = ctx;

  if (UI.selectTitle) {
    if (ctx === "prod" || ctx === "factory") UI.selectTitle.textContent = "Выбор бедного студента";
    else if (ctx === "certs") UI.selectTitle.textContent = "Выбор сертификатов";
    else if (ctx === "info") UI.selectTitle.textContent = "Выбор студента";
    else UI.selectTitle.textContent = "Выбор персонажа";
  }

  const row = UI.screenSelect?.querySelector(".select-row");
  row?.classList.remove("has-choice");

  UI.screenSelect?.querySelectorAll(".select-card").forEach((btn) => {
    btn.classList.remove("chosen", "not-chosen");
    btn.style.pointerEvents = "";
  });

  // reset sprites to normal
  UI.screenSelect?.querySelectorAll(".select-card").forEach((card) => {
    const pick = card.getAttribute("data-pick");
    const img = card.querySelector("img.select-sprite");
    if (!img) return;
    img.src = pick === "kivvi" ? ASSETS.sprites.kivvi : ASSETS.sprites.pestolett;
  });
}

async function openSelect(ctx) {
  setSelectContext(ctx);
  await goToScreen(UI.screenSelect);
}

async function openEduStory() {
  stopAuto(); stopTyping(); overlayInstantHide();
  storyKey = "edu";
  storyIndex = 0;
  storyHistory = [];
  await goToScreen(UI.screenNovel);
  renderSlide();
}

async function openProdStory(character) {
  stopAuto(); stopTyping(); overlayInstantHide();
  storyKey = character === "pestolett" ? "prod_pest" : "prod_kivvi";
  storyIndex = 0;
  storyHistory = [];
  await goToScreen(UI.screenNovel);
  renderSlide();
}

async function openFactoryStory(character) {
  stopAuto(); stopTyping(); overlayInstantHide();
  storyKey = character === "pestolett" ? "factory_pest" : "factory_kivvi";
  storyIndex = 0;
  storyHistory = [];
  await goToScreen(UI.screenNovel);
  renderSlide();
}


async function handlePick(character) {
  const row = UI.screenSelect?.querySelector(".select-row");
  row?.classList.add("has-choice");

  UI.screenSelect?.querySelectorAll(".select-card").forEach((btn) => {
    const pick = btn.getAttribute("data-pick");
    btn.classList.toggle("chosen", pick === character);
    btn.classList.toggle("not-chosen", pick !== character);
  });

  if (selectContext === "certs") await openCertificates(character);
  else if (selectContext === "prod") await openProdStory(character);
  else if (selectContext === "factory") await openFactoryStory(character);
  else if (selectContext === "info") await openInfo(character);
  else await goToScreen(UI.screenMenu);
}

function wireSelectHoverSprites() {
  const cards = UI.screenSelect?.querySelectorAll(".select-card") || [];
  cards.forEach((card) => {
    const pick = card.getAttribute("data-pick");
    const img = card.querySelector("img.select-sprite");
    if (!img) return;

    const baseSrc = pick === "kivvi" ? ASSETS.sprites.kivvi : ASSETS.sprites.pestolett;
    const hoverSrc = pick === "kivvi" ? ASSETS.sprites.kivvi_choice : ASSETS.sprites.pest_choice;

    card.addEventListener("mouseenter", () => {
      if (UI.screenSelect?.querySelector(".select-row")?.classList.contains("has-choice")) return;
      img.src = hoverSrc;
    });
    card.addEventListener("mouseleave", () => {
      if (UI.screenSelect?.querySelector(".select-row")?.classList.contains("has-choice")) return;
      img.src = baseSrc;
    });
  });
}

// ---------- Init ----------
(function init() {
  ensureVolumeSparkles();
  setTrackTitle();
  setVolumeRangeVisual();

  if (UI.bgm) {
    UI.bgm.volume = getSfxVolume();
    UI.bgm.muted = true; // как и раньше: включаем по кнопке
    UI.bgm.addEventListener("ended", () => nextTrack({ autoplay: true }));
  }

  // Audio policy: start after 1st user gesture
  document.addEventListener("click", ensureAudioStarted, { once: true });

  UI.musicBtn?.addEventListener("click", (e) => { e.stopPropagation(); toggleMusicPanel(); });
  document.addEventListener("click", () => {
    if (!UI.musicPanel) return;
    if (!UI.musicPanel.classList.contains("hidden")) UI.musicPanel.classList.add("hidden");
  });
  UI.musicPanel?.addEventListener("click", (e) => e.stopPropagation());

  UI.volumeRange?.addEventListener("input", () => {
    syncVolumes();
    setVolumeRangeVisual();
  });

  UI.musicToggle?.addEventListener("click", (e) => { e.stopPropagation(); setMusicOn(); });
  UI.musicMute?.addEventListener("click", (e) => { e.stopPropagation(); setMusicOff(); });
  UI.musicPrev?.addEventListener("click", (e) => { e.stopPropagation(); ensureAudioStarted(); prevTrack({ autoplay: true }); });
  UI.musicNext?.addEventListener("click", (e) => { e.stopPropagation(); ensureAudioStarted(); nextTrack({ autoplay: true }); });

  // menu
  UI.btnEdu?.addEventListener("click", openEduStory);
  UI.btnProd?.addEventListener("click", () => openSelect("prod"));
  UI.btnFactory?.addEventListener("click", () => openSelect("factory"));
  UI.btnCerts?.addEventListener("click", () => openSelect("certs"));

  // menu sprites: click jumps to selection and immediately chooses a character
  const menuKivvi = document.querySelector(".menu-sprite.menu-kivvi");
  const menuPest = document.querySelector(".menu-sprite.menu-pestolett");
  menuKivvi?.addEventListener("click", () => { openSelect("prod"); setTimeout(() => handlePick("kivvi"), 50); });
  menuPest?.addEventListener("click", () => { openSelect("prod"); setTimeout(() => handlePick("pestolett"), 50); });


  // keep original password gate
  UI.btnInfo?.addEventListener("click", () => {
    const pass = prompt("Введите пароль для доступа:");
    if (pass === "Student123") {
      openSelect("info");
    } else if (pass !== null) {
      openImageModal("assets/easter/PishPish.png", "Неверный пароль.");
    }
  });

  UI.btnMenuFromSelect?.addEventListener("click", async () => {
    stopAuto(); stopTyping(); overlayInstantHide();
    await goToScreen(UI.screenMenu);
  });

  // select cards
  document.querySelectorAll("[data-pick]").forEach((btn) => {
    btn.addEventListener("click", () => handlePick(btn.dataset.pick));
  });
  wireSelectHoverSprites();

  // vn controls
  UI.btnNext?.addEventListener("click", nextSlide);
  UI.vnText?.addEventListener("click", nextSlide);
  UI.btnBack?.addEventListener("click", prevSlide);
  UI.btnAuto?.addEventListener("click", toggleAuto);
  UI.btnHistory?.addEventListener("click", openHistory);
  UI.historyClose?.addEventListener("click", closeHistory);
  UI.historyModal?.addEventListener("click", (e) => { if (e.target === UI.historyModal) closeHistory(); });

  UI.btnMenuFromNovel?.addEventListener("click", async () => {
    stopAuto(); stopTyping(); overlayInstantHide();
    await goToScreen(UI.screenMenu);
  });

  UI.btnMenuFromCerts?.addEventListener("click", async () => { await goToScreen(UI.screenMenu); });
  UI.btnMenuFromInfo?.addEventListener("click", async () => { await goToScreen(UI.screenMenu); });

  UI.vnOverlay?.addEventListener("click", () => {
    if (!UI.vnOverlay.classList.contains("hidden") && UI.vnOverlay.src) openImageModal(UI.vnOverlay.src);
  });

  UI.imgModalClose?.addEventListener("click", closeImageModal);
  UI.imgModal?.addEventListener("click", (e) => { if (e.target === UI.imgModal) closeImageModal(); });

  // global button SFX
  wireGlobalButtonSfx();
  wireWelcomeModal();
  wireMenuSpriteHover();

  // Keep easter egg button
  window.addEventListener("DOMContentLoaded", () => {
    const easterBtn = document.getElementById("easter-btn");
    if (!easterBtn) return;
    easterBtn.addEventListener("click", () => {
      openImageModal("assets/easter/PishPish.png", "куда ручки тянем");
    });
  });

  syncVolumes();
})();
