console.log("[anonymizer] content script loaded on:", window.location.href);

// Enhanced selectors for modern web applications
const ENHANCED_SELECTORS = {
    inputs: [
        'textarea',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="search"]',
        '[contenteditable="true"]',
        '[role="textbox"]',
        '.ProseMirror', // Common rich text editor
        '[data-testid*="input"]', // React testing selectors
        '[aria-label*="input"]',
        '[aria-label*="search"]',
        '[aria-label*="text"]',
        // Perplexity specific selectors
        'textarea[placeholder*="Ask"]',
        'textarea[class*="search"]',
        'div[role="textbox"]',
        '[data-testid="search-input"]',
        '.search-input'
    ],
    contentEditable: [
        '[contenteditable="true"]',
        '[contenteditable=""]',
        '.ProseMirror',
        '.ql-editor', // Quill editor
        '.fr-element', // FroalaEditor
        '.note-editable', // Summernote
        '[role="textbox"]',
        '.monaco-editor .view-line', // Monaco editor
        // Perplexity and modern app selectors
        'div[data-slate-editor="true"]',
        '.slate-editor',
        '[data-lexical-editor="true"]'
    ],
    textElements: [
        'p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'td', 'th', 'li', 'blockquote', 'article', 'section',
        '.message', '.content', '.text', '.description',
        // Modern app text containers
        '[class*="text"]', '[class*="content"]', '[class*="message"]'
    ]
};

// Function to wait for elements to load
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            resolve(null);
        }, timeout);
    });
}

// Function to handle Shadow DOM elements
function processShadowDOM(root = document, patterns, replacements, anonymizeText) {
    const elements = root.querySelectorAll('*');
    elements.forEach(element => {
        if (element.shadowRoot) {
            // Process shadow DOM content
            processElementsInContainer(element.shadowRoot, patterns, replacements, anonymizeText);
            // Recursively process nested shadow DOMs
            processShadowDOM(element.shadowRoot, patterns, replacements, anonymizeText);
        }
    });
}

// FIXED: Function to process text nodes while preserving structure
function processTextNodes(element, anonymizeText) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let textNode;
    let replacements = 0;

    // FIXED: Proper while loop condition
    while ((textNode = walker.nextNode()) !== null) {
        if (textNode.nodeValue && textNode.nodeValue.trim()) {
            const originalText = textNode.nodeValue;
            const anonymizedText = anonymizeText(originalText);
            if (originalText !== anonymizedText) {
                textNode.nodeValue = anonymizedText;
                replacements++;
            }
        }
    }

    return replacements;
}

// Function to process elements within a container
function processElementsInContainer(container, patterns, replacements, anonymizeText) {
    let totalReplacements = 0;

    // Process input fields - FIXED: Handle textareas properly
    ENHANCED_SELECTORS.inputs.forEach(selector => {
        try {
            container.querySelectorAll(selector).forEach(el => {
                // FIXED: Handle different element types properly
                let originalValue = '';
                let isInputElement = false;

                if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                    originalValue = el.value;
                    isInputElement = true;
                } else if (el.isContentEditable || el.hasAttribute('contenteditable')) {
                    // For contenteditable, preserve line breaks by using innerHTML
                    originalValue = el.innerHTML;
                } else {
                    originalValue = el.textContent || el.innerText;
                }

                if (originalValue) {
                    const anonymized = anonymizeText(originalValue);
                    if (originalValue !== anonymized) {
                        if (isInputElement) {
                            el.value = anonymized;
                        } else if (el.isContentEditable || el.hasAttribute('contenteditable')) {
                            el.innerHTML = anonymized;
                        } else {
                            el.textContent = anonymized;
                        }

                        totalReplacements++;
                        // Trigger input events for React/Vue components
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            });
        } catch (e) {
            console.log(`[anonymizer] Selector ${selector} failed:`, e.message);
        }
    });

    // Process contenteditable elements - FIXED VERSION
    ENHANCED_SELECTORS.contentEditable.forEach(selector => {
        try {
            container.querySelectorAll(selector).forEach(el => {
                // Skip if already processed in inputs section
                if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                    return;
                }

                // For contenteditable elements, use processTextNodes to preserve formatting
                const nodeReplacements = processTextNodes(el, anonymizeText);
                if (nodeReplacements > 0) {
                    totalReplacements += nodeReplacements;
                    // Trigger events for modern editors
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('blur', { bubbles: true }));
                }
            });
        } catch (e) {
            console.log(`[anonymizer] Selector ${selector} failed:`, e.message);
        }
    });

    return totalReplacements;
}

// Enhanced replacement function
async function performReplacement(patterns, replacements, generateFakeId, sendResponse) {
    let totalReplacements = 0;

    function anonymizeText(text) {
        if (!text || typeof text !== 'string') return text;

        patterns.forEach((regex) => {
            text = text.replace(regex, (match) => {
                if (!replacements[match]) {
                    const fakeId = generateFakeId();
                    replacements[match] = fakeId;
                    chrome.storage.local.set({ replacements });
                }
                totalReplacements++;
                return replacements[match];
            });
        });

        return text;
    }

    // Process main document
    totalReplacements += processElementsInContainer(document, patterns, replacements, anonymizeText);

    // Process Shadow DOM elements
    processShadowDOM(document, patterns, replacements, anonymizeText);

    // Wait for dynamic content and try again
    setTimeout(() => {
        // Second pass for dynamically loaded content
        totalReplacements += processElementsInContainer(document, patterns, replacements, anonymizeText);
        processShadowDOM(document, patterns, replacements, anonymizeText);

        console.log("[anonymizer] completed with", totalReplacements, "replacements");

        sendResponse({
            success: true,
            message: `Ersetzung abgeschlossen! ${totalReplacements} Ersetzungen vorgenommen.`,
            replacements: totalReplacements
        });
    }, 1000);
}

// Manual replacement function for clipboard content
function manualReplacement(patterns, replacements, generateFakeId, sendResponse) {
    function anonymizeText(text) {
        if (!text || typeof text !== 'string') return text;

        let localReplacements = 0;

        patterns.forEach((regex) => {
            text = text.replace(regex, (match) => {
                if (!replacements[match]) {
                    const fakeId = generateFakeId();
                    replacements[match] = fakeId;
                    chrome.storage.local.set({ replacements });
                }
                localReplacements++;
                return replacements[match];
            });
        });

        return { text, count: localReplacements };
    }

    // Try to read from clipboard
    navigator.clipboard.readText().then(clipboardText => {
        if (!clipboardText) {
            sendResponse({
                success: false,
                message: "Zwischenablage ist leer"
            });
            return;
        }

        const result = anonymizeText(clipboardText);

        // Write back to clipboard
        navigator.clipboard.writeText(result.text).then(() => {
            sendResponse({
                success: true,
                message: `Manuelle Ersetzung: ${result.count} Ersetzungen in Zwischenablage`,
                replacements: result.count,
                processedText: result.text
            });
        }).catch(() => {
            sendResponse({
                success: true,
                message: `Manuelle Ersetzung: ${result.count} Ersetzungen`,
                replacements: result.count,
                processedText: result.text
            });
        });
    }).catch(() => {
        sendResponse({
            success: false,
            message: "Kann nicht auf Zwischenablage zugreifen"
        });
    });
}

// Message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("[anonymizer] received message:", request);

    if (request.action === "applyReplacement" || request.action === "manualReplacement") {
        chrome.storage.local.get(["patterns", "replacements"], (data) => {
            try {
                const patterns = (data.patterns || ["PMCID[0-9A-Z]+"]).map(s => new RegExp(s, "g"));
                let replacements = data.replacements || {};

                function generateFakeId() {
                    return "ID" + Math.random().toString(36).substring(2, 8).toUpperCase();
                }

                if (request.action === "manualReplacement") {
                    manualReplacement(patterns, replacements, generateFakeId, sendResponse);
                } else {
                    performReplacement(patterns, replacements, generateFakeId, sendResponse);
                }
            } catch (error) {
                console.error("[anonymizer] Error:", error);
                sendResponse({
                    success: false,
                    message: "Fehler bei der Textersetzung: " + error.message
                });
            }
        });

        return true; // Keep the message channel open for async response
    }

    sendResponse({ success: false, message: "Unknown action" });
});

// Send a ping message to confirm content script is loaded
chrome.runtime.sendMessage({ action: "contentScriptLoaded", url: window.location.href }, (response) => {
    // This will fail silently if popup is not open, which is fine
});
