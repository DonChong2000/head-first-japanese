// 深入淺出日語: shared page behaviour. No dependencies.
// [file, 中文 title, part, ready]. Part 0 = front matter, parts 1–5 = N5 → N1. Only ready chapters get links.
const CHAPTERS = [
  ['00-intro', '本書使用說明', 0, 1],
  ['01-hiragana', '平假名：日語的五十音', 1, 1],
  ['02-katakana', '片假名與外來語', 1, 0],
  ['03-desu', '「A は B です」：第一句日語', 1, 0],
  ['04-kanji', '漢字：中文母語者的主場與陷阱', 1, 0],
  ['05-particles', '助詞 を、に、で、へ、と', 1, 0],
  ['06-masu', '動詞ます形：現在、過去、否定', 1, 0],
  ['07-adjectives', 'い形容詞與な形容詞', 1, 0],
  ['08-numbers', '數字、助數詞、時間與價錢', 1, 0],
  ['09-te-form', 'て形：請求、進行與連接', 1, 0],
  ['10-aru-iru', 'あります、います與位置', 1, 0],
  ['p1-check', '第一部分 N5 自測', 1, 0],
  ['11-plain-form', '普通形與日常口語', 2, 0],
  ['12-potential', '可能形：會做、能做', 2, 0],
  ['13-giving', '授受動詞 あげる、くれる、もらう', 2, 0],
  ['14-conditionals', '條件句 と、ば、たら、なら', 2, 0],
  ['15-volitional', '意向形、打算與建議', 2, 0],
  ['16-helpers', '動詞小幫手：てみる、ておく、てしまう、ながら', 2, 0],
  ['17-passive-causative', '被動與使役', 2, 0],
  ['18-keigo-basics', '敬語入門', 2, 0],
  ['p2-check', '第二部分 N4 自測', 2, 0],
  ['19-noun-modifiers', '名詞修飾：日語的「的」字句', 3, 0],
  ['20-seems', '推測：ようだ、そうだ、らしい、みたい', 3, 0],
  ['21-hazu-wake-beki', 'はず、わけ、べき', 3, 0],
  ['22-keigo', '尊敬語與謙讓語', 3, 0],
  ['23-reading-n3', 'N3 閱讀：短文與告示', 3, 0],
  ['24-listening-n3', 'N3 聽解：日常會話', 3, 0],
  ['p3-check', '第三部分 N3 自測', 3, 0],
  ['25-n2-grammar', 'N2 文法：書面句型', 4, 0],
  ['26-written-style', 'である體與新聞日語', 4, 0],
  ['27-onomatopoeia', '擬聲語與擬態語', 4, 0],
  ['28-business', '職場日語：電郵、會議、電話', 4, 0],
  ['29-long-reading', '長文閱讀與速讀', 4, 0],
  ['p4-check', '第四部分 N2 自測', 4, 0],
  ['30-n1-grammar', 'N1 文法：文言殘留句型', 5, 0],
  ['31-n1-vocab', 'N1 詞彙：四字熟語與難讀漢字', 5, 0],
  ['32-editorials', '讀懂社論與評論', 5, 0],
  ['33-listening-speed', '聽懂正常語速', 5, 0],
  ['34-mock-exam', 'N1 完整模擬考試', 5, 0],
];
const T = {
  parts: ['前言', '第一部分 · N5', '第二部分 · N4', '第三部分 · N3', '第四部分 · N2', '第五部分 · N1'],
  book: '深入淺出日語', soon: '（即將推出）', more: '更多章節即將推出', done: '完成本章', undo: '✓ 已完成（按此取消）',
  noVoice: '找不到日語語音。Windows：設定 > 時間與語言 > 語音 > 新增語音 > 日本語。Mac：系統設定 > 輔助使用 > 朗讀內容 > 系統聲音 > 管理聲音。手機：在文字轉語音設定中下載日語語音。Edge 的語音最自然。',
  slip: n => `（另有 ${n} 個讀音對了，但平假名、片假名用錯）`,
  well: '  よくできました！',
  furi: ['ふりがな 開', 'ふりがな 關'],
  rec: ['● 錄音', '■ 停止', '▶ 我的錄音'], noMic: '用不到麥克風。請在瀏覽器設定中允許這個網站使用麥克風。',
  foot: '非官方戲仿作品，僅供個人學習。免費、非商業用途，與 O\'Reilly Media 及「深入淺出」系列無關。',
};

const root = new URL('.', document.currentScript.src);   // site root, where book.js lives
const href = f => new URL('ch/' + f + '.html', root).href;
const here = location.pathname.split('/').pop().replace('.html', '');
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch {} },
};

// ---- speech: click any .ja to hear it. Furigana (<rt>) is dropped so it isn't read twice.
let voices = [];
const loadVoices = () => { voices = speechSynthesis.getVoices(); };
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.addEventListener('voiceschanged', loadVoices); }
const spoken = el => {
  if (el.dataset.say) return el.dataset.say;
  const c = el.cloneNode(true);
  // a katakana reading (嘉欣 → カーヤン) is how the word is said, so speak it instead of the kanji
  c.querySelectorAll('ruby').forEach(r => { const rt = r.querySelector('rt')?.textContent || ''; if (/^[゠-ヿ]+$/.test(rt)) r.replaceWith(rt); });
  c.querySelectorAll('rt, rp').forEach(r => r.remove());
  return c.textContent;
};
let warned = false;
function say(el) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(spoken(el));
  u.lang = 'ja-JP';
  u.voice = voices.find(v => v.lang.replace('_', '-') === 'ja-JP') || voices.find(v => v.lang.startsWith('ja')) || null;
  if (!u.voice && !warned) { warned = true; alert(T.noVoice); }
  u.rate = +(el.dataset.rate || 0.85);
  u.onend = () => el.classList.remove('speaking');
  document.querySelectorAll('.speaking').forEach(s => s.classList.remove('speaking'));
  el.classList.add('speaking');
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// ---- answer checker: a button.check checks every [data-answer] in its box.
// data-answer="shi|si" accepts alternatives. NFKC folds full-width letters and half-width kana.
// A kana answer written in the wrong script (カ for か) is flagged as a slip, not failed.
const norm = s => s.normalize('NFKC').trim().toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, ' ').replace(/[。、.,!?！？]+$/, '');
const hira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
function check(btn) {
  const box = btn.closest('aside, section, form');
  let right = 0, slip = 0;
  const fields = box.querySelectorAll('[data-answer]');
  for (const f of fields) {
    const ok = f.dataset.answer.split('|').map(norm), v = norm(f.value);
    const r = ok.includes(v), s = !r && !!v && ok.map(hira).includes(hira(v));
    f.classList.remove('right', 'wrong', 'slip');
    f.classList.add(r ? 'right' : s ? 'slip' : 'wrong');
    right += r; slip += s;
  }
  let out = btn.nextElementSibling;
  if (out?.tagName !== 'OUTPUT') { out = document.createElement('output'); out.className = 'hand'; btn.after(out); }
  out.textContent = `  ${right} / ${fields.length}` + (slip ? T.slip(slip) : '') + (right === fields.length ? T.well : '');
}

// ---- recorder: an empty p.rec gets a record button and a play-back button. The audio stays in this tab, nothing is uploaded.
let rec;
async function record(btn) {
  if (rec?.state === 'recording') return rec.stop();
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch { return alert(T.noMic); }
  const chunks = [], r = rec = new MediaRecorder(stream);
  r.ondataavailable = e => chunks.push(e.data);
  r.onstop = () => {
    stream.getTracks().forEach(t => t.stop());
    const play = btn.nextElementSibling;
    if (play.dataset.src) URL.revokeObjectURL(play.dataset.src);
    play.dataset.src = URL.createObjectURL(new Blob(chunks, { type: r.mimeType }));
    play.hidden = false;
    btn.textContent = T.rec[0];
    btn.classList.remove('on');
  };
  r.start();
  btn.textContent = T.rec[1];
  btn.classList.add('on');
}

// ---- furigana switch: hides <rt> inside .ja only, so the handwritten notes under .annot words stay
const furiOff = () => !!store.get('nofuri');
const furiText = () => furiOff() ? T.furi[1] : T.furi[0];
document.body.classList.toggle('no-furi', furiOff());

document.addEventListener('click', e => {
  const ja = e.target.closest('.ja');
  if (ja) return say(ja);
  const mic = e.target.closest('button.rec');
  if (mic) return mic.dataset.src ? new Audio(mic.dataset.src).play() : record(mic);
  const btn = e.target.closest('button.check');
  if (btn) return check(btn);
  const furi = e.target.closest('button.furi');
  if (furi) { store.set('nofuri', furiOff() ? '' : '1'); document.body.classList.toggle('no-furi', furiOff()); furi.textContent = furiText(); return; }
  const done = e.target.closest('button.done');
  if (done) { store.set('done:' + here, store.get('done:' + here) ? '' : '1'); done.textContent = doneText(); }
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('span.ja')) { e.preventDefault(); say(e.target); }
});

const doneText = () => store.get('done:' + here) ? T.undo : T.done;

// ---- page chrome
document.querySelectorAll('span.ja').forEach(s => { s.tabIndex = 0; s.setAttribute('role', 'button'); s.lang = 'ja'; });
if (window.MediaRecorder) document.querySelectorAll('p.rec').forEach(p => { p.innerHTML = `<button class="rec">${T.rec[0]}</button> <button class="rec" hidden>${T.rec[2]}</button>`; });

const i = CHAPTERS.findIndex(c => c[0] === here);
const bar = document.createElement('nav');
bar.className = 'top';
bar.innerHTML = `<a href="${new URL('index.html', root).href}">${T.book}</a>` +
  (i >= 0 ? `<span>${T.parts[CHAPTERS[i][2]]}</span>` : '') +
  `<button class="furi" lang="ja">${furiText()}</button>`;
document.body.prepend(bar);

if (i >= 0) {
  const ready = CHAPTERS.filter(c => c[3]);
  const r = ready.findIndex(c => c[0] === here);
  const pager = document.createElement('nav');
  pager.className = 'pager';
  const prev = ready[r - 1], next = ready[r + 1];
  pager.innerHTML = (prev ? `<a href="${href(prev[0])}">← ${prev[1]}</a>` : '<span></span>') +
    `<button class="done">${doneText()}</button>` +
    (next ? `<a href="${href(next[0])}">${next[1]} →</a>` : `<span>${T.more}</span>`);
  document.querySelector('main').append(pager);
}

const foot = document.createElement('footer');
foot.textContent = T.foot;
document.body.append(foot);

const toc = document.getElementById('toc');
if (toc) {
  let n = 0;
  toc.innerHTML = T.parts.map((p, pi) => `<h3>${p}</h3><ol>` + CHAPTERS.filter(c => c[2] === pi).map(c => {
    const no = c[0].startsWith('p') ? '✔' : String(n++).padStart(2, '0');
    const t = c[3] ? `<a href="${href(c[0])}">${c[1]}</a>` : `<span class="soon">${c[1]}${T.soon}</span>`;
    return `<li><span class="n">${no}</span>${t}${store.get('done:' + c[0]) ? ' <span class="tick">✓</span>' : ''}</li>`;
  }).join('') + '</ol>').join('');
}
