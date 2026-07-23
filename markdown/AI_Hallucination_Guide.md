d.avebrown instagram.com/d.avebrown

# Your AI Is Lying to You

13 techniques to make it stop.

by d.avebrown

These models are word predictors — fancy ones, but at their core, they're guessing the next token based on patterns in their training data. And they've been trained to be helpful at all costs. To agree. To sound confident.

Which is great until they don't know the answer. Then they make one up. Smoothly. Convincingly. Completely wrong.

Here are 13 field-tested techniques to catch it, prevent it, and get dramatically better outputs from any AI model.

From the Video

The three fundamentals

### 01 — Tell It Not to Lie

Sounds almost too simple. But these models are trained to follow instructions — and most people never think to give this one. A single line in your prompt changes the entire dynamic. Think of it like telling a contractor to double-check their measurements: they were always capable of it, you just had to ask. Because these models are optimized to please, they default to confident answers even when they shouldn't. Giving an explicit constraint flips that default — and it works every time.

Try this

"Only give me answers you can back up with real sources. If you're not sure, say so."

### 02 — Tell It to Search, Not Guess

If your question involves niche topics or anything that happened recently, the model probably doesn't know. Don't let it wing it. Force it to look things up instead of generating from memory. Drug interactions updated this year, local regulations, current stock prices, recent court rulings — all of this sits past the model's training cutoff. Even tools with built-in web access will default to memory unless you explicitly tell them not to. The instruction is the unlock.

Try this

"Search for the latest information on \[topic\]. Do not answer from memory."

### 03 — Break the Echo Chamber

Long chat sessions make your AI dumber. The deeper you go in one conversation, the more it agrees with itself — and with you. The mechanism: the model anchors to its own prior outputs and your earlier messages, drifting toward confirmation with every exchange. A fresh context window has none of that history — no prior commitments, no accumulated bias. Copy your best output, open a new chat, and direct it to tear the work apart. This works for plans, emails, business proposals — anything that benefits from a fresh set of eyes.

Try this

"A junior engineer wrote this. Tear it apart."

Bonus Techniques

Ten more ways to keep your AI honest

### 04 — Tell It the Stakes

Models calibrate caution based on context. Higher stakes = more hedging, more "verify this" flags, fewer confident guesses. Without any stakes framing, the model defaults to confident and fast. Tell it the output matters and it shifts into careful mode. Try: "This will be published under my name," or "A lawyer will review this for accuracy," or "Patients will follow this advice." You're not tricking it — you're surfacing care it was always capable of delivering.

Try this

"This information will be used to make a real business decision." or "A doctor will act on this."

### 05 — Run the Confidence Check

Ask it to rate its own certainty on each claim. Watch how fast it starts hedging. The claims it's least confident about are exactly the ones you need to verify independently. Sometimes just asking for a confidence rating causes the model to catch and correct its own errors in real time — before you even see them. Treat anything below 7/10 as a mandatory manual check. You can also follow up with: "Explain why you're less confident on those items" — that reasoning often points you directly to what's shaky.

Try this

"On a scale of 1–10, how confident are you in each of these claims?"

### 06 — Give It Permission to Say "I Don't Know"

Models hallucinate partly because they think silence equals failure. They'd rather be confidently wrong than admit uncertainty. This is a training artifact — during development, responses that produced "something helpful" were rewarded over non-answers. The model learned to always generate output, even when it shouldn't. Your prompt overrides that default. Once you explicitly give it permission to say "I don't know," the output quality jumps. Bonus technique: add "List everything you're uncertain about in this response" to surface hidden guesses you'd otherwise miss.

Try this

"If you don't know, just say 'I don't know' — that's the correct answer here."

### 07 — Separate Tasks from Questions

Don't combine research and writing in one prompt. "Write a bio and include her career history" asks the model to fact-find and generate simultaneously. Hallucinations love hiding inside creation tasks — the writing fluency masks the factual slippage. The two-step workflow: Step 1, ask for facts only ("List the key career milestones for \[person\] — nothing else"). Step 2, review and verify those facts yourself. Step 3, paste them back and say "Using only what I've given you, write the bio." This applies to case studies, grant proposals, technical summaries — any writing that requires the facts to be right.

### 08 — Interrogate the Output

Instead of fact-checking every line yourself, make the model do it. Ask it to poke holes in its own reasoning. It's surprisingly good at this — you just have to trigger it. Models in generation mode produce content; in critic mode they catch errors. Those are genuinely different postures, and the switch happens from a single prompt. Other versions: "List the three most likely errors in what you just told me," or "What assumptions did you make that I should double-check?" Especially powerful for technical content, legal analysis, or anything involving statistics or numbers.

Try this

"What would have to be true for this to be wrong?"

### 09 — Use Two Models, Not One

Run the same question through Claude and ChatGPT. Where they agree, you're probably fine. Where they disagree is your uncertainty zone — don't trust either answer there without checking a primary source. Perplexity is also worth adding to the mix: it cites sources by default, so you can follow the links and verify claims yourself. Another variation: run the same prompt twice in the same model with slightly different phrasing. If the answers conflict with each other, you've found an unstable claim neither version can actually back up. Disagreement is your signal to dig — not your final answer.

### 10 — Anchor It to Primary Sources

Paste in the actual document, data, or article. This turns the model from a guesser into a reader — and readers don't hallucinate. The more real context you feed it, the less it needs to invent. Works for: financial reports, research papers, contracts, product specs, meeting transcripts, legal filings. Modern models can handle 100,000 words or more of pasted content. You can even paste multiple conflicting sources and ask the model to identify where they disagree — letting it do the synthesis work without making up any of the facts.

Try this

"Answer only from what I've given you. Do not bring in outside information."

### 11 — Name the Expert

"Answer as an expert" activates broad, generic knowledge. A specific role activates careful, precise reasoning. The more detailed the persona you assign, the less room there is for slop. A specific persona implies specific standards, methodologies, and thresholds for uncertainty. "As a patent attorney specializing in biotech IP" is a behavioral specification — not just a title. Real experts say "I'd need to review the original study first" rather than winging it. The right persona gets you that same discipline. Try: "As an ICU nurse reviewing discharge instructions," or "As a CPA preparing this for an IRS audit."

Try this

"Answer as a forensic accountant who's testified in federal court."

### 12 — Break the Sycophancy Loop

Without an explicit trigger to push back, the model will validate whatever framing you brought in. It's designed to agree with you. You have to deliberately force it to argue the other side. Sycophancy gets worse the more emotionally invested you seem — the model reads those cues and softens its criticism accordingly. Counter it by presenting ideas neutrally, or explicitly say: "I have no attachment to this — tell me what's actually wrong with it." Other versions that work: "What would a smart, well-informed skeptic say?" or "Give me the steelman case against my position."

Try this

"Assume I'm wrong about my core assumption. What's the argument against it?"

### 13 — Version Your Prompts

If you're running the same type of query regularly, write your anti-hallucination instructions once and reuse them every time. Don't rely on the model being in a good mood. Build a prompt template with your safeguards baked in. Consistency beats hope. A basic research template: "Search for current information only. Rate your confidence 1–10 on each claim. Say 'I don't know' where uncertain. Do not bring in anything from memory — only from sources." Store it in your notes app, as a saved ChatGPT prompt, or as a system prompt via the API. One hour of setup eliminates the same mistake every single time.

Want more AI tips that actually work?

Follow me on Instagram for weekly breakdowns.

[@d.avebrown](https://www.instagram.com/d.avebrown)
