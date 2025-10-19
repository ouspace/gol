/* eslint-env node */
/* cspell:ignore Playwright */

import filesystem from "node:fs";
import pathModule from "node:path";

// ---------- Configuration ----------
const reportsRootDirectory = pathModule.join(__dirname, "..", "__tests__", "reports");
const jsonReportPreferredPath = pathModule.join(reportsRootDirectory, "playwright-report.json");
const htmlReportDirectory = pathModule.join(reportsRootDirectory, "html");
const markdownOutputPath = pathModule.join(reportsRootDirectory, "summary.md");
const htmlOutputPath = pathModule.join(reportsRootDirectory, "summary.html");

// Fallback search locations if the JSON report wasn't written where we expect
const jsonSearchCandidates = [
	jsonReportPreferredPath,
	pathModule.join(__dirname, "..", "playwright-report.json"),
	pathModule.join(__dirname, "..", "playwright-report", "report.json"),
	pathModule.join(__dirname, "..", "__tests__", "playwright-report.json"),
	pathModule.join(__dirname, "..", "test-results.json"),
];

// ---------- Utilities ----------
function ensureDirectory(directoryPath) {
	if (!filesystem.existsSync(directoryPath)) {
		filesystem.mkdirSync(directoryPath, { recursive: true });
	}
}

function locateJsonReport() {
	for (const candidate of jsonSearchCandidates) {
		if (filesystem.existsSync(candidate)) return candidate;
	}
	return null;
}

function readJsonFile(filePath) {
	const content = filesystem.readFileSync(filePath, "utf8");
	return JSON.parse(content);
}

function writeTextFile(filePath, content) {
	ensureDirectory(pathModule.dirname(filePath));
	filesystem.writeFileSync(filePath, content, "utf8");
}

function formatDateTime(dateObject = new Date()) {
	const iso = dateObject.toISOString();
	return {
		iso,
		human: `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`
	};
}

function toMilliseconds(value) {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	return 0;
}

// Recursively flatten suites/specs/tests from Playwright JSON reporter
function collectTestsFromSuite(suite, accumulator) {
	if (!suite) return;
	if (Array.isArray(suite.suites)) {
		for (const child of suite.suites) collectTestsFromSuite(child, accumulator);
	}
	if (Array.isArray(suite.specs)) {
		for (const spec of suite.specs) {
			if (!Array.isArray(spec.tests)) continue;
			for (const test of spec.tests) {
				const results = Array.isArray(test.results) ? test.results : [];
				// Combine duration & attachments from all results
				const durationMs = results.reduce((sum, r) => sum + toMilliseconds(r.duration), 0);
				const attachments = results.flatMap(r => Array.isArray(r.attachments) ? r.attachments : []);
				// Derive a status (prefer last result status if present)
				const last = results.at(-1);
				const status = (last && last.status) || test.outcome || "unknown";

				accumulator.push({
					title: test.title || spec.title || suite.title || "Untitled test",
					file: spec.file || test.location?.file || "unknown",
					projectName: test.projectName || last?.workerInfo?.project?.name || "default",
					status,
					durationMs,
					attachments
				});
			}
		}
	}
}

function computeSummary(tests) {
	const summary = {
		total: tests.length,
		passed: 0,
		failed: 0,
		skipped: 0,
		flaky: 0,
		unknown: 0,
		durationMs: tests.reduce((s, t) => s + toMilliseconds(t.durationMs), 0)
	};
	for (const t of tests) {
		switch (t.status) {
			case "passed":
			case "expected": {
				summary.passed += 1;
				break;
			}
			case "failed":
			case "unexpected":
			case "timedOut": {
				summary.failed += 1;
				break;
			}
			case "skipped": {
				summary.skipped += 1;
				break;
			}
			case "flaky": {
				summary.flaky += 1;
				break;
			}
			default: {
				summary.unknown += 1;
			}
		}
	}
	return summary;
}

function statusEmoji(status) {
	switch (status) {
		case "passed":
		case "expected": {
			return "✅";
		}
		case "failed":
		case "unexpected":
		case "timedOut": {
			return "❌";
		}
		case "skipped": {
			return "⏭️";
		}
		case "flaky": {
			return "🌦️";
		}
		default: {
			return "❓";
		}
	}
}

function escapePipes(text) {
	return String(text).replaceAll("|", String.raw`\|`);
}

function shortPath(p) {
	if (!p) return "unknown";
	return pathModule.relative(pathModule.join(__dirname, ".."), p);
}

// HTML escape utility
const escapeHtml = (s) =>
	s.replaceAll("&", "&amp;").replaceAll("<", "<").replaceAll(">", ">");

// ---------- Markdown ----------
function generateMarkdown(reportJsonPath, tests, summary) {
	const { iso, human } = formatDateTime();
	const lines = [
		`# TextField – Playwright Test Report`,
		"",
		`- Generated: **${human}** (${iso})`,
		`- JSON source: \`${pathModule.relative(__dirname, reportJsonPath)}\``,
		`- HTML report: \`${pathModule.relative(__dirname, htmlReportDirectory)}\``,
		"",
		`## Summary`,
		"",
		`- Total: **${summary.total}**`,
		`- Passed: **${summary.passed}**`,
		`- Failed: **${summary.failed}**`,
		`- Skipped: **${summary.skipped}**`,
		`- Flaky: **${summary.flaky}**`,
		`- Unknown: **${summary.unknown}**`,
		`- Duration: **${summary.durationMs} ms**`,
		"",
		`## Environment`,
		"",
		`- Node: **${process.version}**`,
		`- Platform: **${process.platform} ${process.arch}**`,
		`- CWD: \`${process.cwd()}\``,
		"",
		`## Tests`,
		"",
		`| Status | Title | File | Project | Duration (ms) | Attachments |`,
		`|:------:|-------|------|:-------:|:-------------:|------------:|`
	];

	for (const t of tests) {
		const attachmentCount = Array.isArray(t.attachments) ? t.attachments.length : 0;
		const row = `| ${statusEmoji(t.status)} | ${escapePipes(t.title)} | \`${shortPath(t.file)}\` | ${escapePipes(t.projectName)} | ${t.durationMs} | ${attachmentCount} |`;
		lines.push(row);
	}

	lines.push("", `> Tip: open the HTML report for screenshots, traces and step details.`);
	return lines.join("\n");
}

// ---------- HTML ----------
function generateHtml(markdownContent) {
	return `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>TextField – Playwright Test Report</title>
	<style>
		body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"; margin: 24px; line-height: 1.5; }
		code, pre { font-family: ui-monospace, SFMono-Regular, "Menlo", Monaco, "Consolas", "Liberation Mono", "Courier New", monospace; }
		table { border-collapse: collapse; width: 100%; }
		th, td { border: 1px solid #e5e7eb; padding: 8px 10px; }
		th { background: #f9fafb; text-align: left; }
		hr { border: 0; height: 1px; background: #e5e7eb; margin: 24px 0; }
		.container { max-width: 1100px; margin: 0 auto; }
		.meta { color: #6b7280; font-size: 0.9rem; }
	</style>
</head>
<body>
	<div class="container">
		<h1>TextField – Playwright Test Report</h1>
		<div class="meta">Generated ${new Date().toLocaleString()}</div>
		<hr />
		<div id="md">
${markdownToBasicHtml(markdownContent)}
		</div>
	</div>
</body>
</html>`;
}

// very small Markdown → HTML (headings, lists, code, table)
function markdownToBasicHtml(md) {
	const lines = md.split("\n");
	const out = [];
	let inList = false;
	let inTable = false;

	for (const rawLine of lines) {
		const line = rawLine.trimEnd();

		if (line.startsWith("|") && line.endsWith("|")) {
			if (!inTable) {
				out.push("<table>");
				inTable = true;
			}
			if (line.startsWith("|:")) {
				// alignment row -> skip
				continue;
			}
			const cells = line.slice(1, -1).split("|").map((c) => `<td>${escapeHtml(c.trim())}</td>`).join("");
			out.push(`<tr>${cells}</tr>`);
			continue;
		}
		if (inTable) {
			out.push("</table>");
			inTable = false;
		}

		if (line.startsWith("# ")) out.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
		else if (line.startsWith("## ")) out.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
		else if (line.startsWith("### ")) out.push(`<h3>${escapeHtml(line.slice(4))}</h3>`);
		else if (line.startsWith("- ")) {
			if (!inList) {
				out.push("<ul>");
				inList = true;
			}
			out.push(`<li>${escapeHtml(line.slice(2))}</li>`);
		} else {
			if (inList) {
				out.push("</ul>");
				inList = false;
			}
			if (line.startsWith("> ")) out.push(`<blockquote>${escapeHtml(line.slice(2))}</blockquote>`);
			else if (line === "") out.push("<br/>");
			else out.push(`<p>${escapeHtml(line)}</p>`);
		}
	}
	if (inList) out.push("</ul>");
	if (inTable) out.push("</table>");
	return out.join("\n");
}

// ---------- Main ----------
(function main() {
	try {
		ensureDirectory(reportsRootDirectory);
		ensureDirectory(htmlReportDirectory);

		const reportJsonPath = locateJsonReport();
		if (!reportJsonPath) {
			const hint = [
				"JSON report not found.",
				"Run Playwright with a JSON reporter, for example:",
				"",
				"  npx playwright test --config=src/components/textfield/playwright.config.ts",
				""
			].join("\n");
			writeTextFile(markdownOutputPath, `# TextField – Playwright Test Report\n\n${hint}\n`);
			writeTextFile(htmlOutputPath, generateHtml(`# TextField – Playwright Test Report\n\n${hint}\n`));
			console.error(hint);
			throw new Error("JSON report not found");
		}

		// Copy to preferred location
		if (pathModule.resolve(reportJsonPath) !== pathModule.resolve(jsonReportPreferredPath)) {
			ensureDirectory(pathModule.dirname(jsonReportPreferredPath));
			filesystem.copyFileSync(reportJsonPath, jsonReportPreferredPath);
		}

		const json = readJsonFile(reportJsonPath);
		const tests = [];
		if (Array.isArray(json.suites)) {
			for (const suite of json.suites) collectTestsFromSuite(suite, tests);
		} else if (json.suite) {
			collectTestsFromSuite(json.suite, tests);
		}

		const summary = computeSummary(tests);
		const md = generateMarkdown(reportJsonPath, tests, summary);
		writeTextFile(markdownOutputPath, md);
		writeTextFile(htmlOutputPath, generateHtml(md));

		console.log("✔ Documentation generated");
		console.log(`  - Markdown: ${markdownOutputPath}`);
		console.log(`  - HTML:     ${htmlOutputPath}`);
		console.log(`  - JSON:     ${jsonReportPreferredPath}`);
		console.log(`  - HTML dir: ${htmlReportDirectory}`);
	} catch (error) {
		console.error("✖ Failed to generate documentation:", error);
		throw error;
	}
})();