Local Text Anonymizer - Prototype

Instructions:
1) Download the zip and unzip it.
2) In Chrome go to chrome://extensions
3) Enable "Developer mode" (Schalter oben rechts)
4) Click "Load unpacked" and select the folder where you unzipped the extension (the folder containing manifest.json)
5) The extension popup is available from the toolbar.

Notes:
- This prototype runs completely locally in your browser; nothing is sent to any server.
- Default pattern is PMCID[0-9A-Z]+. You can add more regex patterns in the popup.
- The extension replaces matches in text inputs and textareas as you type or paste.
- Mapping (original -> fake) is stored in chrome.storage.local. Use the popup to export or deanonymize text.
- This is a minimal prototype intended for development and testing only.