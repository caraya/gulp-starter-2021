# Regular Expressions and String Manipulation Playground

Sooner or later every programmer will use [Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression) in their code. To me they are hard to understand and reason... this post will try to clear up some of my confusion and provide examples of what these regular expressions look like.

## Writing regular expressions

The first step is writing regular expressions. We have two ways of doing it: literals and constructors.

### Regular expression literals

The simplest way to write regular expressions is to use them as a literal value in a constant or variable, the pattern is enclosed in slashes (`/`).

```js
const myRE = /a+bc/;
```

Literal regular expressions are evaluated when the script is loaded. Use RegExp literals when you know what the regular expression will be.

### Regular expression constructors

We can also build regular expressions using the `RegExp` constructor where we put the regular expression that we want to test in parenthesis.

```js
const myRE = new RegExp('a+bc');
```

The constructors are evaluated when the script runs. Use constructors when you're not certain what the expression will be or when you're working with user input.

## Modifying the regular expression: special characters and creating patterns

There are times when patterns like those we discussed are enough for our needs but there are times when we need to build more complicated expressions. We may want to match portions of a URL or make sure that the protocol used for the URL is `https://`.

There are special characters that we can use to enhace the expressions to perform specific tasks.

The table below, taken from MDN's [Writing a regular expression pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Writing_a_regular_expression_pattern) shows the characters you can use in regular expressions and what they do.

<table>
	<caption>Special characters in regular expressions.</caption>
	<thead>
		<tr>
			<th scope="col">Character</th>
			<th scope="col">Meaning</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`\`</td>
			<td>
			<p>Matches according to the following rules:</p>
      <ul>
        <li>A backslash that precedes a non-special character indicates that the next character is special and is not to be interpreted literally. For example, a '<code>b</code>' without a preceding '\' generally matches lowercase 'b's wherever they occur. But a '<code>\b</code>' by itself doesn't match any character; it denotes a word boundary.</li>
			<li>A backslash that precedes a special character indicates that the next character is not special and should be interpreted literally. For example, the pattern <code>/a*/</code> relies on the special character '<code>*</code>' to match 0 or more a's. By contrast, the pattern <code>/a\*/</code> denotes&nbsp;the '<code>*</code>'&nbsp; as not special, enabling&nbsp;matches with strings like 'a*'.</li>
			</ul>
			<p>Do not forget to escape \ itself while using the RegExp("pattern") notation because \ is also an escape character in strings.</p>
			</td>
		</tr>
		<tr>
			<td><code>^</code></td>
			<td>Matches beginning of input. If the multiline flag is set to true, also matches immediately after a line break character.<br>
			<br>
			For example, <code>/^A/</code> does not match the 'A' in "an A", but does match the 'A' in "An E".<br>
			<br>
			The '<code>^</code>' has a different meaning when it appears as the first character in a character set pattern.</td>
		</tr>
		<tr>
			<td><code>$</code></td>
			<td>
			<p>Matches end of input. If the multiline flag is set to true, also matches immediately before a line break character.</p>
			<p>For example, <code>/t$/</code> does not match the 't' in "eater", but does match it in "eat".</p>
			</td>
		</tr>
		<tr>
			<td><code>*</code></td>
			<td>
			<p>Matches the preceding expression 0 or more times. Equivalent to {0,}.</p>
			<p>For example, <code>/bo*/</code> matches 'boooo' in "A ghost booooed" and 'b' in&nbsp;"A bird warbled" but nothing in&nbsp;"A goat grunted".</p>
			</td>
		</tr>
		<tr>
			<td><code>+</code></td>
			<td>
			<p>Matches the preceding expression 1 or more times. Equivalent to <code>{1,}</code>.</p>
			<p>For example, <code>/a+/</code> matches the 'a' in "candy" and all the a's in "caaaaaaandy", but nothing in "cndy".</p>
			</td>
		</tr>
		<tr>
			<td><code>?</code></td>
			<td>Matches the preceding expression 0 or 1 time. Equivalent to <code>{0,1}</code>.</p>
      <p>For example, <code>/e?le?/</code> matches the 'el' in "angel" and the 'le' in "angle" and also the 'l' in "oslo".</p>
      <p>If used immediately after any of the quantifiers *, +, ?, or {}, makes the quantifier non-greedy (matching the fewest possible characters), as opposed to the default, which is greedy (matching as many characters as possible). For example, applying <code>/\d+/</code> to "123abc" matches "123". But applying <code>/\d+?/</code> to that same string matches only the "1".</p>
			<p>Also used in lookahead assertions, as described in the <code>x(?=y)</code> and <code>x(?!y)</code> entries of this table.</p></td>
		</tr>
		<tr>
			<td><code>.</code></td>
			<td>
			<p>(The decimal point) matches any single character except the newline character, by default.</p>
			<p>For example, <code>/.n/</code> matches 'an' and 'on' in "nay, an apple is on the tree", but not 'nay'.</p>
			<p>If the <code>s</code> ("dotAll") flag is set to true, it also matches newline characters.</p>
			</td>
		</tr>
		<tr>
			<td><code>(x)</code></td>
			<td>
			<p>Matches 'x' and remembers the match, as the following example shows. The parentheses are called <em>capturing parentheses</em>.</p>
      <p>The '<code>(foo)</code>' and '<code>(bar)</code>' in the pattern <code>/(foo) (bar) \1 \2/</code> match and remember the first two words in the string "foo bar foo bar". The <code>\1</code> and <code>\2</code>&nbsp; denote the first and second parenthesized substring matches -&nbsp;<code>foo</code>&nbsp;and <code>bar</code>, matching the string's last two words. Note that <code>\1</code>, <code>\2</code>, ...,&nbsp;<code>\n</code> are used in the matching part of the regex. In the replacement part of a regex the syntax <code>$1</code>, <code>$2</code>, ...,&nbsp;<code>$n</code> must be used, e.g.: <code>'bar foo'.replace(/(...) (...)/, '$2 $1')</code>. &nbsp;<code>$&amp;</code> means the whole matched string.</p>
			</td>
		</tr>
		<tr>
			<td><code>(?:x)</code></td>
			<td><p>Matches 'x' but does not remember the match. The parentheses are called <em>non-capturing parentheses</em>, and let you define subexpressions for regular expression operators to work with. Consider the sample expression <code>/(?:foo){1,2}/</code>. If the expression was <code>/foo{1,2}/</code>, the <code>{1,2}</code> characters would apply only to the last 'o' in 'foo'. With the non-capturing parentheses, the <code>{1,2}</code> applies to the entire word 'foo'.</p>
		</tr>
		<tr>
			<td><code>x(?=y)</code></td>
			<td>
			<p>Matches 'x' only if 'x' is followed by 'y'. This is called a lookahead.</p>
			<p>For example, <code>/Jack(?=Sprat)/</code> matches 'Jack' only if it is followed by 'Sprat'. <code>/Jack(?=Sprat|Frost)/</code> matches 'Jack' only if it is followed by 'Sprat' or 'Frost'. However, neither 'Sprat' nor 'Frost' is part of the match results.</p>
			</td>
		</tr>
		<tr>
			<td><code>x(?!y)</code></td>
			<td>
			<p>Matches 'x' only if 'x' is not followed by 'y'. This is called a negated lookahead.</p>
			<p>For example, <code>/\d+(?!\.)/</code> matches a number only if it is not followed by a decimal point. The regular expression <code>/\d+(?!\.)/.exec("3.141")</code> matches '141' but not '3.141'.</p>
			</td>
		</tr>
		<tr>
			<td><code>(?&lt;=<em>y</em>)<em>x</em></code></td>
			<td>
			<p>Matches <code><em>x</em></code> only if <code><em>x</em></code> is preceded&nbsp;by <code><em>y</em></code>.This is called a lookbehind.</p>
			<p>For example, /<code>(?&lt;=Jack)Sprat/</code> matches "Sprat" only if it is preceded by "Jack".<br>
			<code>/(?&lt;=Jack|Tom)Sprat/</code> matches "Sprat" only if it is preceded by "Jack" or "Tom".<br>
			However, neither "Jack" nor "Tom" is part of the match results.</p>
			</td>
		</tr>
		<tr>
			<td><code>(?&lt;!<em>y</em>)<em>x</em></code></td>
			<td>
			<p>Matches <code><em>x</em></code> only if <code><em>x</em></code> is not preceded&nbsp;by <code><em>y</em></code>.This is called a negated lookbehind.</p>
			<p>For example, <code>/(?&lt;!-)\d+/</code> matches a number only if it is not preceded by a minus sign.<br>
			<code>/(?&lt;!-)\d+/.exec('3')</code> matches "3".<br>
			&nbsp;<code>/(?&lt;!-)\d+/.exec('-3')</code> &nbsp;match is not found because the&nbsp;number is preceded by the minus sign.</p>
			</td>
		</tr>
		<tr>
			<td><code>x|y</code></td>
			<td>
			<p>Matches 'x', or 'y' (if there is no match for 'x').</p>
			<p>For example, <code>/green|red/</code> matches 'green' in "green apple" and 'red' in "red apple." The order of 'x' and 'y' matters. For example <code>a*|b</code>&nbsp;matches the empty string in "b", but <code>b|a*</code> matches "b" in the same string.</p>
			</td>
		</tr>
		<tr>
			<td><code>{n}</code></td>
			<td><p>Matches exactly n occurrences of the preceding expression. N must be a positive integer.</p>
			<p>For example, <code>/a{2}/</code> doesn't match the 'a' in "candy," but it does match all of the a's in "caandy," and the first two a's in "caaandy."</td>
		</tr>
		<tr>
			<td><code>{n,}</code></td>
			<td>
			<p>Matches at least n occurrences of the preceding expression. N must be a positive integer.</p>
			<p>For example, /a{2,}/ will match "aa", "aaaa" and "aaaaa" but not "a"</p>
			</td>
		</tr>
		<tr>
			<td><code>{n,m}</code></td>
			<td>
			<p>Where <code>n</code> and <code>m</code> are positive integers and <code>n &lt;= m</code>. Matches at least <code>n</code> and at most <code>m</code> occurrences of the preceding expression. When <code>m</code> is omitted, it's treated as ∞.</p>
			<p>For example, <code>/a{1,3}/</code> matches nothing in "cndy", the 'a' in "candy," the first two a's in "caandy," and the first three a's in "caaaaaaandy". Notice that when matching "caaaaaaandy", the match is "aaa", even though the original string had more a's in it.</p>
			</td>
		</tr>
		<tr>
			<td><code>[xyz]</code></td>
			<td><p>Character set. This pattern type matches any one of the characters in the brackets, including escape sequences. Special characters like the dot(<code>.</code>) and asterisk (<code>*</code>) are not special inside a character set, so they don't need to be escaped. You can specify a range of characters by using a hyphen, as the following examples illustrate.</p>
			<p>The pattern<code> [a-d]</code>, which performs the same match as <code>[abcd]</code>, matches the 'b' in "brisket" and the 'c' in "city". The patterns <code>/[a-z.]+/ </code>and <code>/[\w.]+/</code> match the entire string "test.i.ng".<p></td>
		</tr>
		<tr>
			<td><code>[^xyz]</code></td>
			<td>
			<p>A negated or complemented character set. That is, it matches anything that is not enclosed in the brackets. You can specify a range of characters by using a hyphen. Everything that works in the normal character set also works here.</p>
			<p>For example, <code>[^abc]</code> is the same as <code>[^a-c]</code>. They initially match 'r' in "brisket" and 'h'&nbsp;in "chop."</p>
			</td>
		</tr>
		<tr>
			<td><code>[\b]</code></td>
			<td><p>Matches a backspace (U+0008). You need to use square brackets if you want to match a literal backspace character. (Not to be confused with <code>\b</code>.)</p></td>
		</tr>
		<tr>
			<td><code>\b</code></td>
			<td>
			<p>Matches a <em>word boundary</em>. A word boundary matches the position between a word character followed by a non-word character, or between a non-word character followed by a word character, or the beginning of the string, or the end of the string. A word boundary is not a "character" to be matched; like an anchor, a word boundary is not included in the match. In other words, the length of a matched word boundary is zero. (Not to be confused with <code>[\b]</code>.)</p>
			<p>Examples using the input string "moon":<br>
			<code>/\bm/</code> matches, because the `\b` is at the beginning of the string;<p>
			<p>the&nbsp;'\b' in&nbsp;<code>/oo\b/</code> does not match, because the '\b' is both preceded and followed by word characters;</p>
			<p>the '\b' in&nbsp;<code>/oon\b/</code> matches, because it appears at the end of the string;</p>
			<p>the '\b\ in&nbsp;<code>/\w\b\w/</code> will never match anything, because it is both preceded and followed by a word character..</p>
			<p><strong>Note:</strong>&nbsp;JavaScript's regular expression engine defines a <a rel="noopener" href="http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6">specific set of characters</a> to be "word" characters. Any character not in that set is considered a non-word character. This set of characters is fairly limited: it consists solely of the&nbsp;Roman alphabet in both upper- and lower-case, decimal digits, and the underscore character. Accented characters, such as "é" or "ü" are, unfortunately, treated as non-word characters for the purposes of&nbsp;word boundaries, as are ideographic characters in general.</p>
			</div>
			</td>
		</tr>
		<tr>
			<td><code>\B</code></a></td>
			<td>
			<p>Matches a non-<em>word boundary</em>. This matches&nbsp;the following cases:</p>
			<ul>
				<li>Before the first character of the string.</li>
				<li>After the last character of the string,.</li>
				<li>Between two word characters</li>
				<li>Between two non-word characters</li>
				<li>The empty string</li>
			</ul>
			<p>For example, <code>/\B../</code> matches 'oo' in "noonday", and <code>/y\B./</code> matches 'ye' in "possibly yesterday."</p>
			</td>
		</tr>
		<tr>
			<td><code>\c<em>X</em></code></td>
			<td>
			<p>Where <em>X</em> is a character ranging from A to Z. Matches a control character in a string.</p>
			<p>For example, <code>/\cM/</code> matches control-M (U+000D) in a string.</p>
			</td>
		</tr>
		<tr>
			<td><code>\d</code></a></td>
			<td>
			<p>Matches a&nbsp;digit character. Equivalent to <code>[0-9]</code>.</p>
			<p>For example, <code>/\d/</code> or <code>/[0-9]/</code> matches '2' in "B2 is the suite number."</p>
			</td>
		</tr>
		<tr>
			<td><code>\D</code></td>
			<td>
			<p>Matches a&nbsp;non-digit character. Equivalent to <code>[^0-9]</code>.</p>
			<p>For example, <code>/\D/</code> or <code>/[^0-9]/</code> matches 'B' in "B2 is the suite number."</p>
			</td>
		</tr>
		<tr>
			<td><code>\f</code></td>
			<td>Matches a form feed (U+000C).</td>
		</tr>
		<tr>
			<td><code>\n</code></td>
			<td>Matches a line feed (U+000A).</td>
		</tr>
		<tr>
			<td><code>\r</code></td>
			<td>Matches a carriage return (U+000D).</td>
		</tr>
		<tr>
			<td><code>\s</code></td>
			<td>
			<p>Matches a white space character, including space, tab, form feed, line feed. Equivalent to <code>[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]</code>.</p>
			<p>For example, <code>/\s\w*/</code> matches ' bar' in "foo bar."</p>
			</td>
		</tr>
		<tr>
			<td><code>\S</code></td>
			<td>
			<p>Matches a character other than white space. Equivalent to <code>[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]</code>.</p>
			<p>For example, <code>/\S*/</code> matches 'foo' in "foo bar."</p>
			</td>
		</tr>
		<tr>
			<td><code>\t</code></td>
			<td>Matches a tab (U+0009).</td>
		</tr>
		<tr>
			<td><code>\v</code></td>
			<td>Matches a vertical tab (U+000B).</td>
		</tr>
		<tr>
			<td><code>\w</code></td>
			<td>
			<p>Matches any alphanumeric character including the underscore. Equivalent to <code>[A-Za-z0-9_]</code>.</p>
			<p>For example, <code>/\w/</code> matches 'a' in "apple," '5' in "$5.28," and '3' in "3D."</p>
			</td>
		</tr>
		<tr>
			<td><code>\W</code></td>
			<td>
			<p>Matches any non-word character. Equivalent to <code>[^A-Za-z0-9_]</code>.</p>
			<p>For example, <code>/\W/</code> or <code>/[^A-Za-z0-9_]/</code> matches '%' in "50%."</p>
			</td>
		</tr>
		<tr>
			<td><code>\<em>n</em></code></td>
			<td>
			<p>Where <em>n</em> is a positive integer, a back reference to the last substring matching the <em>n</em> parenthetical in the regular expression (counting left parentheses).</p>
			<p>For example, <code>/apple(,)\sorange\1/</code> matches 'apple, orange,' in "apple, orange, cherry, peach."</p>
			</td>
		</tr>
		<tr>
			<td><code>\0</code></td>
			<td>Matches a NULL (U+0000) character. Do not follow this with another digit, because <code>\0&lt;digits&gt;</code> is an octal (base 8) sequence. Instead use <code>\x00</code>.</td>
		</tr>
		<tr>
			<td><code>\xhh</code></td>
			<td>Matches the character with the code hh (two hexadecimal digits)</td>
		</tr>
	</tbody>
</table>

Goingh back to finding a regular expression that tests if our URL is to a secure site we can do the following:

```js
const secureURL = /https:\/\//;
```

We'll use the regular expression when we look at how to test using regular expressions in the next section.

## Additional flags for regular expressions

One last set of flags to worry about. These are additional parameters for the expression that will allow additional flexibility beyond what special characters allow.

The table below show what these additional flags are and what they do.

<table>
	<caption>Regular expression flags</caption>
	<thead>
		<tr>
			<th scope="col">Flag</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>g</code></td>
			<td>Global search.</td>
		</tr>
		<tr>
			<td><code>i</code></td>
			<td>Case-insensitive search.</td>
		</tr>
		<tr>
			<td><code>m</code></td>
			<td>Multi-line search.</td>
		</tr>
		<tr>
			<td><code>s</code></td>
			<td>Allows <code>.</code> to match newline characters.</td>
		</tr>
		<tr>
			<td><code>u</code></td>
			<td>"Treat a pattern as a sequence of unicode code points</td>
		</tr>
		<tr>
			<td><code>y</code></td>
			<td>Perform a "sticky" search that matches starting at the current position in the target string.</td>
		</tr>
	</tbody>
</table>

The flags are appended to the end of the regular expression and are a part of it (no adding or removing flags after the regular expression) and they will change the way we build the regular expressions we want to use.

The literal expression now looks like this:

```js
const re = /pattern/flags;
```

And the constructor changes to the one below

```js
const re = new RegExp('pattern', 'flags');
```

## Matching text against regular expressions

We have multiple ways to test strings against our regular expressions. Which one to use depends on what results you want to accomplish and how much information about the matches and the results you want to keep and use.

The methods are listed below:

<table>
	<caption>Methods that use regular expressions</caption>
	<thead>
		<tr>
			<th scope="col">Method</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>exec</code></td>
			<td>A <code>RegExp</code> method that executes a search for a match in a string. It returns an array of information or null on a mismatch.</td>
		</tr>
		<tr>
			<td><code>test</code></td>
			<td>A <code>RegExp</code> method that tests for a match in a string. It returns true or false.</td>
		</tr>
		<tr>
			<td><code>match</code></td>
			<td>A <code>String</code> method that executes a search for a match in a string. It returns an array of information or null on a mismatch.</td>
		</tr>
		<tr>
			<td><code>matchAll</code></td>
			<td>A <code>String</code> method that returns an iterator containing all of the matches, including capturing groups.</td>
		</tr>
		<tr>
			<td><code>search</code></td>
			<td>A <code>String</code> method that tests for a match in a string. It returns the index of the match, or -1 if the search fails.</td>
		</tr>
		<tr>
			<td><code>replace</code></td>
			<td>A <code>String</code> method that executes a search for a match in a string, and replaces the matched substring with a replacement substring.</td>
		</tr>
		<tr>
			<td><code>split</code></td>
			<td>A <code>String</code> method that uses a regular expression or a fixed string to break a string into an array of substrings.</td>
		</tr>
	</tbody>
</table>

### What happens when the string has Unicode Characters?

<table>
	<caption>Unicode special characters for regular expressions.</caption>
	<thead>
		<tr>
			<th scope="col">Character</th>
			<th scope="col">Meaning</th>
		</tr>
	</thead>
<tbody>
		<tr>
			<td><code>\uhhhh</code></td>
			<td>Matches the character with the code hhhh (four hexadecimal digits).</td>
		</tr>
		<tr>
			<td><code>\u{hhhh}</code></td>
			<td>(only when u flag is set) Matches the character with the Unicode value hhhh (hexadecimal digits).</td>
		</tr>
</tbody>
</table>


### Making life easier: groups

## Matching multiple items in the string


[String.prototype.matchAll](https://v8.dev/blog/v8-release-73#string.prototype.matchall)

A common use case of global (g) or sticky (y) regular expressions is applying it to a string and iterating through all of the matches. The new String.prototype.matchAll API makes this easier than ever before, especially for regular expressions with capture groups:

```js
const string = 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev';
const regex = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9\.]+)\b/g;

for (const match of string.matchAll(regex)) {
  console.log(`${match[0]} at ${match.index} with '${match.input}'`);
  console.log(`→ owner: ${match.groups.owner}`);
  console.log(`→ repo: ${match.groups.repo}`);
}

// Output:
//
// tc39/ecma262 at 23 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'
// → owner: tc39
// → repo: ecma262
// v8/v8.dev at 36 with 'Favorite GitHub repos: tc39/ecma262 v8/v8.dev'
// → owner: v8
// → repo: v8.dev
```

## Links, resources and Ideas for further experimentation

* https://alligator.io/js/regular-expressions-for-regular-people/
* https://www.smashingmagazine.com/2019/02/regexp-features-regular-expressions/
