# 深入淺出日語 (Head First Japanese): chapter guide

An unofficial parody of O'Reilly's Head First series (深入淺出 is the series' Chinese name). Sister project of Head First French. The joke: programmers learn a new language from Head First, so here's one for Japanese. It takes the reader from zero (JLPT N5) to **N1**, one level per part. Personal study, shared free with friends, non-commercial. Plain static HTML, no build step. Repo DonChong2000/head-first-japanese; once GitHub Pages is turned on for `main`, it will be at https://donchong2000.github.io/head-first-japanese/.

**Reader:** native Cantonese and/or Mandarin speaker who reads Traditional Chinese and has good English, aiming at JLPT N1 for work or study in Japan.

**Language:** the whole book is **Traditional Chinese only** (`<html lang="zh-Hant">`). There is no English edition and no language switch.

## Settled decisions
- Teach **standard (Tokyo) Japanese**. Kansai dialect only goes in `aside.kansai` boxes, as "understand it, don't copy it on the exam".
- Teaching prose is natural Hong Kong 書面語 (see 文風 below). Cantonese and Mandarin comparisons give Jyutping and pinyin: `學 hok6 / xué`. If only one of the two languages has a good match, say which.
- Title is **深入淺出日語** (Head First Japanese), as a parody. The index 「這到底是甚麼？」 box and the footer that book.js adds to every page say it's unofficial, non-commercial, for personal study, and not affiliated with O'Reilly or the 深入淺出 series. Keep both. Never use O'Reilly's logo or real cover art, never copy text from their books, and never sell it. Copy the *format* (box types, tone, exercises), not their sentences.
- A light programming joke now and then fits the premise (particles = named arguments, SOV = reverse Polish notation, verb endings = method chaining, keigo = access levels, kana chart = a 2D array). Use at most one or two per chapter.
- Audio is the browser's Web Speech API (ja-JP). Every Japanese word or sentence the reader should hear goes in `<span class="ja">`. Use `data-say` when the spoken text differs from the shown text. Furigana `<rt>` inside `.ja` is stripped before speaking.
- **Furigana:** write it as `<ruby>漢字<rt>かんじ</rt></ruby>` inside the `.ja` span, one ruby per word or kanji. In Part 1 (N5) every kanji gets furigana. From Part 2 on, kanji at or below the level already taught may go without. The nav ふりがな switch hides all `.ja rt`; notes under `.annot` words are outside `.ja` and stay. Don't nest ruby (check.mjs rejects it).

## Files
- `book.js`: the `CHAPTERS` list (`[file, 中文 title, part, ready]`). Parts: 0 前言, 1 N5, 2 N4, 3 N3, 4 N2, 5 N1. Set `ready` to 1 when a chapter ships. It also handles speech, the answer checker, the furigana switch, nav and done ticks. An empty `<p class="rec"></p>` in a speaking exercise becomes a record button and a play-back button; the recording stays in the tab and is never uploaded.
- `assets/cover.jpg`: Don's Gemini-generated parody cover (深入淺出日語), scaled to 800 × 1071. The full-size original is `cover.jpg` at the root, used by README.md.
- `style.css`: all the box styles. Don't add per-chapter CSS.
- `ch/NN-slug.html`: one chapter per file. Copy the head/foot from `ch/01-hiragana.html`.
- `tools/check.mjs`: must pass. `tools/shot.mjs <outdir> <pages...>` screenshots light/dark × desktop/phone (uses `$CHROME`, else `/opt/pw-browsers/chromium`, else Chrome on Windows).

## Chapter shape (see ch/01-hiragana.html)
1. `p.chapter-no`, `h1`, `p.lede` (one-line hook)
2. A `div.scene` comic dialogue that sets up the problem, set in Japan (Haneda, a konbini, the ward office, an Osaka izakaya, a job interview, a share house)
3. `h2` sections, each teaching ONE rule, using a `p.annot` sentence with `<ruby>word<rt>note</rt></ruby>` labels (the word is a `span.ja` inside the ruby base; keep furigana out of annotated words, or use kana there)
4. 2–4 of the boxes below, spread through the chapter, not piled at the end
5. At least 3 exercises (`aside.sharpen` / `aside.exam`), each with `button.check` and a `details.answer`
6. Alternate chapters get a game, such as 配對遊戲 matching with selects
7. `aside.bullet-points` last
8. Target length: 5,000–8,000 Chinese characters of prose. Each Japanese example ≤ the level taught so far.

## Boxes
| class | title (h4) | use for |
|---|---|---|
| `sharpen` | 削尖你的鉛筆 | fill-in or choose exercises |
| `brain-power` | 動動腦 | a question to think about, no answer |
| `no-dumb` | 沒有蠢問題 | `<dl>` with `dt` = question, `dd` = answer |
| `watch-it` | 小心！ | traps, look-alikes, 漢字 false friends (手紙, 勉強, 大丈夫) |
| `zh-note` | 中文腦：… | a Cantonese/Mandarin bridge (入聲 -p/-t/-k ≈ 促音 っ, 音讀 from 中古漢語, 了 vs た) |
| `en-note` | 英文幫到你 | English loanwords in katakana (コーヒー, パソコン), English grammar parallels |
| `kanji` | 漢字卡：X | `<span class="big" lang="ja">X</span>` + `<dl>` of 音讀 / 訓讀 / 粵 / 普 / examples |
| `kansai` | 關西腔 | Kansai usage. Understand it, don't copy it on the exam |
| `fireside` | 爐邊對談：X vs Y | `<dl>` with `dt` = speaker, `dd` = line |
| `exam` | 考試熱身：… | tasks in JLPT format (問題1 漢字読み, 文法, 読解, 聴解) |
| `bullet-points` | 重點整理 | chapter summary |

## Exercises
- `<input data-answer="し|shi|si">`: `|` separates accepted answers. Matching folds full-width/half-width (NFKC), ignores case, extra spaces and a trailing 。、.!?. A kana answer written in the wrong script (シ for し) is flagged as a slip, not counted as right.
- Romaji answers: list the Hepburn and common Kunrei spellings (`shi|si`, `tsu|tu`, `fu|hu`).
- `<select data-answer="x">`: x must be one of the `<option>`s (check.mjs enforces this). Start with an empty `<option></option>`.
- Every input/select needs an `aria-label` (check.mjs enforces this).
- Kana/kanji typing needs a Japanese IME; ch/00-intro.html explains how to add one. Offer a select instead when typing would be the hard part.

## Voice
- Second person (你), informal, short sentences, a little humour. It should sound like a person, with no AI tells.
- Check facts that can go stale (JLPT sections, times, pass marks, CEFR reference) against jlpt.jp and attribute them.

## 文風
Every page must read as if a Hong Kong teacher wrote it in Chinese.
- **Register:** natural 書面語 for a Hong Kong reader, still easy for Taiwan readers. Light and conversational, Head First style. No Cantonese particles (嘅、咗、唔) outside quoted Cantonese examples.
- **Hong Kong vocabulary:** 甚麼 / 為甚麼 / 哪裏, 巴士, 按 (not 點擊), 生字 or 詞語 (not 單字), 網上, 電郵, 影片, 質素, 程式, 便利店 (konbini), 地鐵 / 電車.
- **Avoid translationese:** 「一個」「一些」 before every noun; repeated 你的、它、他們; 進行、作出、對於……而言、被 passives; long 的-chains; 「當……的時候」 at the start of a sentence.
- **Punctuation:** full-width ，。：；？！「」（）. Put a space between Chinese and Latin text. Japanese inside Chinese prose needs no extra spaces.
- **Glossary** (use these consistently):

  | Concept | 中文 |
  |---|---|
  | hiragana / katakana | 平假名 / 片假名 |
  | kana chart (gojūon) | 五十音 |
  | dakuten / handakuten | 濁音 / 半濁音 |
  | yōon (きゃ) | 拗音 |
  | sokuon (っ) | 促音 |
  | long vowel | 長音 |
  | ん | 撥音 |
  | mora | 拍 |
  | pitch accent | 高低音調 |
  | particle | 助詞 |
  | on'yomi / kun'yomi | 音讀 / 訓讀 |
  | okurigana | 送假名 |
  | furigana | 振假名（ふりがな） |
  | conjugation | 活用 |
  | masu-form / te-form / plain form | ます形 / て形 / 普通形 |
  | i-adjective / na-adjective | い形容詞 / な形容詞 |
  | counter | 助數詞 |
  | keigo | 敬語（尊敬語、謙讓語、丁寧語） |
  | Kansai dialect | 關西腔 |
  | JLPT | 日本語能力試驗（JLPT） |
  | Cantonese entering tone | 入聲 |
  | type / function (programming) | 型別 / 函式 |

  Character forms: 著 (not 着), 裏 (not 裡), 甚麼 (not 什麼). Japanese text keeps Japanese forms (学, 読, 駅) even next to Traditional Chinese (學, 讀, 驛); when comparing, show both.

## Gotchas
- A single huge Write can trip the content filter. Write a chapter in two parts (a `<!-- PART2 -->` marker, then an Edit).
- Don't nest `aside` inside `aside`, because check.mjs pairs them with a non-greedy match.
- `table.wide` inside `.table-wrap` for tables with 4+ columns, so phones scroll them sideways instead of squashing them. `table.kana` is the centred kana chart (big clickable kana + `<small>` romaji).
- Japanese text that isn't clickable still needs `lang="ja"` so kanji get Japanese glyph shapes.

## Cast (keep consistent across chapters)
- **嘉欣**: from Hong Kong, Cantonese speaker, on a working holiday in Tokyo. Works part-time at a café in 下北沢, lives in a share house. Later (Part 3+) job-hunts.
- **子軒**: from Taipei, Mandarin speaker, software engineer just transferred to the Osaka office. Brings in Kansai boxes and programming jokes.
- **田中さん**: 嘉欣's Japanese housemate, university student, patient, speaks casually from Part 2.
- **山本店長**: manager at the café, polite but strict (keigo examples).
- **佐藤さん**: 子軒's team lead in Osaka (Kansai speech, workplace scenes).
- Minor: 店員, 駅員, 区役所の人, 大家さん (landlord), 医者.

## Syllabus: Parts 1–2
Each chapter may only use grammar from itself and earlier chapters. Vocabulary: N5 words in Part 1, N4 words in Part 2 (new words get a gloss). Every kanji in Part 1 has furigana; in Part 2, kanji from the N5 list may drop it.

| file | teaches | must include |
|---|---|---|
| 01-hiragana | kana chart, 濁音, 拗音, 促音, 長音, ん, 拍, a first look at pitch accent | done |
| 02-katakana | katakana chart, ー, extended combos (ティ ファ ウィ ヴ), loanword sound rules (English → katakana: extra vowels, l/r → ラ行, -er → ー), 和製英語 (パソコン, コンセント, マンション) | en-note heavy; look-alikes シ/ツ ソ/ン; game; words only, plus set phrases (ありがとうございます, すみません) as chunks |
| 03-desu | AはBです, じゃありません/ではありません, ですか questions, の (possessive / Noun の Noun), も, これ/それ/あれ/どれ, この/その/あの/どの, self-introduction (はじめまして, ～と申します as a chunk, よろしくお願いします), は read wa | annot sentence; zh-note: は ≈ 「呢個嘅話」/ topic, 的 ≈ の; programming joke: は sets the context/scope |
| 04-kanji | 音讀 vs 訓讀, 送假名, ~80 core N5 kanji (numbers, 日月火水木金土, 人 山 川 上 下 中 大 小 本 学 生 先 年 円 時 分 半 今 何 行 来 食 飲 見 聞 読 書 話 買 休 言 出 入 会 社 電 車 駅 道 前 後 左 右 外 東 西 南 北 名 語 天 気 雨 花 男 女 子 父 母 友 高 安 新 古 長 多 少 白 赤 青), Japanese forms vs Traditional (学/學, 気/氣, 駅/驛, 読/讀), 漢字 false friends, Cantonese ↔ 音讀 correspondences (-k → く/き, -t → つ/ち, -p → う (from ふ), -ng → う/い, -m/-n → ん) | at least two `.kanji` cards; exam warm-up in 漢字読み format; zh-note on 呉音/漢音 briefly (人 にん/じん) |
| 05-particles | を (object), に (time, destination, indirect object), で (place of action, means), へ (direction, read e), と (with, and), から/まで, が (subject, first look), の recap | SOV order; programming joke: particles = named arguments, so word order is flexible; fireside chat: に vs で |
| 06-masu | verb groups (五段 / 一段 / する・来る), ます, ません, ました, ませんでした, ましょう / ませんか (invitations), ～たい (want to), time expressions (毎日, 明日, 昨日) | table of group rules; watch-it: 帰る / 入る / 走る look like 一段 but are 五段; zh-note: no tense in Chinese, 了 ≠ ました exactly |
| 07-adjectives | い-adjectives (高い, 高くない, 高かった, 高くなかった), な-adjectives (静かです, 静かじゃありません, 静かでした), noun modification (高い山, 静かな町), いい → よくない, 好き/嫌い/上手/下手 + が, comparison: AはBより～, ～の中で～がいちばん | game; brain-power on why 好き takes が |
| 08-numbers | 1–10000 (万 vs 千: 一万 not 十千, zh-note: 萬 works like Chinese), readings that shift (三百 さんびゃく, 六百 ろっぴゃく, 八千 はっせん), counters つ/人/本/枚/匹/個/回/歳 with sound changes, time (時, 分 ふん/ぷん, 半, 午前/午後), days of the week, dates (ついたち–とおか, 二十日), months, prices (円, いくらですか) | exam warm-up in listening format (▶ data-say prices/times, choose the answer); table.wide for counters |
| 09-te-form | te-form rules by group (う/つ/る → って, む/ぶ/ぬ → んで, く → いて, ぐ → いで, す → して, 行く → 行って), ～てください, ～ています (ongoing action and resulting state: 結婚しています), ～てもいいですか, ～てはいけません, linking actions (～て、～て), ～てから | the rules as a chant (sing to a tune), game; programming joke: te-form = a pipe operator |
| 10-aru-iru | あります (things) vs います (living things), location words (上 下 中 前 後ろ 隣 近く 間), ここ/そこ/あそこ/どこ, Place に Thing が あります vs Thing は Place に あります, 持っています, events: パーティーがあります | scene at the share house finding things; Kansai box (おる / おります preview, ある/おる in Kansai); exam warm-up |
| p1-check | N5 mock in JLPT format: 文字・語彙 (問題1 漢字読み, 問題2 表記, 問題3 文脈規定, 問題4 言い換え類義), 文法 (問題1 文法形式の判断, 問題2 文の組み立て ★, 問題3 文章の文法), 読解 (問題4 短文, 問題5 中文, 問題6 情報検索), 聴解 (問題1 課題理解, 問題2 ポイント理解, 問題3 発話表現, 問題4 即時応答) with ▶ data-say scripts | all `aside.exam`; a scoring note at the end (aim 80% → move on); every item covers Chapters 1–10 only |
| 11-plain-form | dictionary / ない / た / なかった forms of verbs, adjectives, nouns (だ), casual speech (だ dropped, よ/ね), ～と思います, ～と言いました, ～たことがあります, ～たり～たりします, ～んです (explaining) | fireside chat: です・ます vs plain; scene: 田中さん switches to casual; zh-note on politeness levels in Cantonese vs Japanese |
| 12-potential | potential forms (書ける, 食べられる / ら抜き 食べれる noted as colloquial, できる, 来られる), ～ことができます, が with potentials, 見える/聞こえる vs 見られる/聞ける, ～ようになる | watch-it on ら抜き言葉 in exams |
| 13-giving | あげる / くれる / もらう, direction of giving (in-group/out-group), ～てあげる / ～てくれる / ～てもらう, polite forms (さしあげる, くださる, いただく) as preview | diagram (inline SVG or table) of giving directions; game; zh-note: 「畀」/「給」 covers all three |
| 14-conditionals | と (natural result), ば (general condition, ば-form rules), たら (once/if), なら (if that's the case), ～ても (even if), which to use when | decision table; fireside chat: たら vs ば; programming joke: if / when / on-event |
| 15-volitional | volitional form (行こう, 食べよう, しよう), ～ましょう recap, ～(よ)うと思っています, ～つもりです, ～予定です, ～ことにする / ～ことになる, advice: ～たほうがいい / ～ないほうがいい | scene: New Year plans; exam warm-up |
| 16-helpers | ～てみる, ～ておく, ～てしまう (and ちゃう), ～てある, 自動詞/他動詞 pairs (開く/開ける, 閉まる/閉める, つく/つける, 始まる/始める), ～ながら, ～すぎる, ～やすい / ～にくい | table of transitive pairs; programming joke: てしまう = an irreversible commit; game |
| 17-passive-causative | passive (直接 and 迷惑の受身: 雨に降られた), causative (させる: make/let), causative-passive (させられる / 行かされる) | zh-note: 被 vs 受身 (Japanese passive is often "suffering"), 叫/讓 vs させる |
| 18-keigo-basics | 丁寧語 recap, 尊敬語 (お～になる, special: いらっしゃる, 召し上がる, おっしゃる, ご覧になる, くださる), 謙譲語 (お～する, special: 参る, 申す, いただく, 拝見する, おる), ございます, keigo in shops and on the phone | scene: 山本店長 trains 嘉欣 at the café; programming joke: keigo = access levels (sudo); full 尊敬語/謙譲語 depth is Chapter 22 |
| p2-check | N4 mock in JLPT format (same sections as N5 plus 文字・語彙 問題5 用法) | Chapters 11–18 focus, may reuse Part 1 |
