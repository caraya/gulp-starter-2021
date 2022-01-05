That is not quite accurate, Gabriel.

Even latin alphabet based characters use more than the basic latin alphabet as outlined in the C0 block of the Unicode Basic Multilingual plane. It also requires some (or all) of the characters in the following blocks:

C0 Controls and Basic Latin (Basic Latin) (0000–007F)
C1 Controls and Latin-1 Supplement
Latin Extended-A
Latin Extended-B
Latin Extended Additional

Symbols are rarer than additional latin characters but they may also be needed. The blocks containing symbols are below:

Combining Diacritical Marks (0300–036F)
General Punctuation (2000–206F)
Superscripts and Subscripts (2070–209F)
Currency Symbols (20A0–20CF)
Combining Diacritical Marks for Symbols (20D0–20FF)
Letterlike Symbols (2100–214F)
Number Forms (2150–218F)
Arrows (2190–21FF)
Mathematical Operators (2200–22FF)
Miscellaneous Technical (2300–23FF)
Control Pictures (2400–243F)
Optical Character Recognition (2440–245F)
Enclosed Alphanumerics (2460–24FF)
Box Drawing (2500–257F)
Block Elements (2580–259F)
Geometric Shapes (25A0–25FF)
Miscellaneous Symbols (2600–26FF)

Arabic is a Unicode block, containing the standard letters and the most common diacritics of the Arabic script, and the Arabic-Indic digits.[3]

Arabic (0600–06FF)
Arabic Supplement (0750–077F)
Arabic Extended-A (08A0–08FF)


with variations for regional languages and dialects like the ones below:

Syriac (0700–074F)
Thaana (0780–07BF)
N'Ko (07C0–07FF)
Samaritan (0800–083F)
Mandaic (0840–085F)


Greek

The default monotonic Greek block in BMP:

Greek and Coptic (0370–03FF)

If you're writing polytonic Greek

Greek Extended

Cyryllic

For the most basic Cyrillc languages

Cyrillic (0400–04FF)

For the languages that fall outside the basic block above

Cyrillic Supplement (0500–052F)

Kanji and other CJK character sets

Which character block do we use to encode Kanji? Do we use CJK Symbols and Punctuation? Do we use CJK Unified Ideograph?

One of the things we need to remember is that Kanji is built from strokes, even when typing it into a computer. So what set of strokes do we use? even though they are representing the same characters they are not necessarily the same unicode characters. For CKJ ideographs you have the following blocks representing most of the same characters... if you pick wrong the users will not see your content.


CJK Radicals Supplement (2E80–2EFF)
Kangxi Radicals (2F00–2FDF)
Ideographic Description Characters (2FF0–2FFF)
CJK Symbols and Punctuation (3000–303F)
Hiragana (3040–309F)
Katakana (30A0–30FF)
CJK Strokes (31C0–31EF)
Katakana Phonetic Extensions (31F0–31FF)
Enclosed CJK Letters and Months (3200–32FF)
CJK Compatibility (3300–33FF)
CJK Unified Ideographs Extension A (3400–4DBF)
CJK Unified Ideographs (4E00–9FFF)

There is also a separate plane (the Suplementary Ideographic Plane) that add even more ideographs to the mix. While the ideographs in this plane are seldom used you still have to account for them.

