# Local Text Anonymizer

Local Text Anonymizer helps you replace sensitive or identifying text with stable, anonymized placeholders — entirely locally in your browser.

If you just want to use the extension, the easiest and recommended way is to install it from the Chrome Web Store. This repository is primarily for development, review, and manual installation.

## Quick install (recommended)

- Open the Chrome Web Store and search for "Local Text Anonymizer" (or visit the developer listing).
- Click "Add to Chrome" and follow the prompts.
- After installation the extension icon appears in the toolbar; click it to open the popup UI.

## Developer / manual install (optional)

If you want to run the extension from source (development mode):

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top-right).
3. Click **Load unpacked** and select this repository folder (the folder containing `manifest.json`).

Note: manual loading is intended for development and testing only.

## Features

- Local-only processing: all pattern matching, anonymization mappings and text processing happen in your browser (no external servers).
- Add custom RegEx patterns in the popup to detect identifiers you want anonymized (default pattern: `PMCID[0-9A-Z]+`).
- Automatic replacement: applies replacements on many pages by injecting a content script — primarily tested with ChatGPT.
- Manual Replacement: a popup field to anonymize text you paste in (recommended for complex web apps or when automatic replacement fails).
- Export / Import mappings (JSON) so you can persist or share anonymization mappings.
- De-anonymize (reverse) using the stored mapping.

## Important notes

- Automatic replacement was primarily tested on ChatGPT. It may not work reliably on all sites (especially complex web apps and rich-text editors). If automatic replacement fails on a page, use the **Manual Replacement** workflow in the popup.
- The extension uses the Clipboard API for manual workflows: your browser may prompt for permission when reading/writing the clipboard.
- Mappings (original → anonymized) are stored locally using `chrome.storage.local` and are not transmitted anywhere.

## Usage

1. Open the popup from the toolbar.
2. Add or edit RegEx patterns in the *Configure Patterns* section.
3. Use **Apply Replacement** to run the automatic replacer on the active page (note the ChatGPT testing caveat above).
4. If the page blocks script injection or the content is in a complex editor, open **Manual Replacement**, paste your text and click *Anonymize*.
5. Use *Export* to save mappings or *Import* to load them back.

## Troubleshooting

- If automatic replacement reports no connection to the page: the page may be a browser/system page (e.g., `chrome://`) or restrict script injection. Use Manual Replacement instead.
- If replacements appear incorrect, verify your RegEx patterns in the popup (you can test them at https://regex101.com).
- If clipboard operations fail, check browser permissions and try the Manual Replacement textarea route instead of clipboard read/write.

## Privacy & Security

- All processing is local. The extension does not send any data to external servers.
- The extension requests only the permissions it needs: `storage`, `activeTab`, and `scripting` (used to inject the replacer script when you trigger it on the active tab).
- See `PRIVACY.md` and `PRIVACY_DE.md` for full details.

## For developers

- `manifest.json` uses Manifest V3.
- `content.js` is the content script that performs replacements. It attempts to handle inputs, textareas, contenteditable regions and some popular rich-text editor selectors.
- To test locally: load unpacked (see Developer / manual install) and open DevTools to inspect console output.

## Packaging & publishing

- Before publishing to the Chrome Web Store: add icons (16, 48, 128 sizes), update `manifest.json` with an explicit `icons` object and bump the `version` field.
- Prepare store assets: screenshots, short/long descriptions, privacy policy URL (see `PRIVACY.md`).

## License & contact

© 2025 F. Oberhammer — see LICENSE (if present) or contact `oberhammer.dev@gmail.com` for questions.

