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
