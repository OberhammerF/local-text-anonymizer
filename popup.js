const patternInput = document.getElementById("patternInput");
const addPatternBtn = document.getElementById("addPattern");
const clearPatternsBtn = document.getElementById("clearPatterns");
const patternList = document.getElementById("patternList");
const mappingDisplay = document.getElementById("mapping");
const exportMappingBtn = document.getElementById("exportMapping");
const clearMappingBtn = document.getElementById("clearMapping");
const deanonInput = document.getElementById("deanonInput");
const deanonBtn = document.getElementById("deanonBtn");
const deanonOutput = document.getElementById("deanonOutput");
const applyReplacementBtn = document.getElementById("applyReplacement");
const languageToggle = document.getElementById("languageToggle");
const importMappingBtn = document.getElementById("importMapping");
const importFile = document.getElementById("importFile");
const helpToggle = document.getElementById("helpToggle");
const helpModal = document.getElementById("helpModal");
const helpClose = document.getElementById("helpClose");
const helpText = document.getElementById("helpText");
const manualToggle = document.getElementById("manualToggle");
const manualContent = document.getElementById("manualContent");
const manualInput = document.getElementById("manualInput");
const manualBtn = document.getElementById("manualBtn");
const manualOutput = document.getElementById("manualOutput");

function renderPatterns(patternsArray) {
    patternList.innerHTML = "";
    if (patternsArray.length === 0) {
        // Empty state is handled by CSS :empty pseudo-class
        return;
    }

    patternsArray.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p;
        patternList.appendChild(li);
    });
}

function renderMapping(mapObj) {
    if (Object.keys(mapObj).length === 0) {
        mappingDisplay.textContent = currentLanguage === 'de' ?
            "Noch keine Ersetzungen vorgenommen" :
            "No replacements made yet";
        mappingDisplay.style.color = "#999";
        mappingDisplay.style.fontStyle = "italic";
    } else {
        mappingDisplay.textContent = JSON.stringify(mapObj, null, 2);
        mappingDisplay.style.color = "";
        mappingDisplay.style.fontStyle = "";
    }
}

let currentLanguage = 'de'; // default German

function updateLanguage(lang) {
    const translations = {
        'de': {
            title: '🔒 Text Anonymizer',
            subtitle: 'Lokale Textersetzung mit Rückübersetzung',
            addPattern: '+',
            patternPlaceholder: 'RegEx Muster eingeben (z.B. PMCID[0-9A-Z]+)',
            clearPatterns: 'Löschen',
            applyReplacement: '🔄 Textersetzung anwenden',
            manualToggle: '📝 Manuelle Ersetzung',
            exportMapping: '📤 Export',
            importMapping: '📥 Import',
            clearMapping: 'Löschen',
            deanonymize: 'Entschlüsseln',
            deanonPlaceholder: 'Anonymisierten Text hier einfügen...',
            manualPlaceholder: 'Text hier eingeben oder einfügen...',
            manualBtn: 'Anonymisieren',
            sectionPatterns: 'Muster konfigurieren',
            sectionMapping: 'Zuordnung',
            sectionDeanon: 'Text entschlüsseln',
            sectionManual: 'Manuelle Textersetzung',
            regexHelp: 'Regex Hilfe & Tester',
            noPatterns: 'Keine Muster definiert',
            noMappings: 'Noch keine Ersetzungen vorgenommen'
        },
        'en': {
            title: '🔒 Text Anonymizer',
            subtitle: 'Local Text Replacement with Back-translation',
            addPattern: '+',
            patternPlaceholder: 'Enter RegEx pattern (e.g. PMCID[0-9A-Z]+)',
            clearPatterns: 'Clear',
            applyReplacement: '🔄 Apply Replacement',
            manualToggle: '📝 Manual Replacement',
            exportMapping: '📤 Export',
            importMapping: '📥 Import',
            clearMapping: '🗑️ Clear',
            deanonymize: 'Decrypt',
            deanonPlaceholder: 'Paste anonymized text here...',
            manualPlaceholder: 'Enter or paste text here...',
            manualBtn: 'Anonymize',
            sectionPatterns: 'Configure Patterns',
            sectionMapping: 'Mapping',
            sectionDeanon: 'Decrypt Text',
            sectionManual: 'Manual Text Replacement',
            regexHelp: 'Regex Help & Tester',
            noPatterns: 'No patterns defined',
            noMappings: 'No replacements made yet'
        }
    };

    // Update text elements based on language
    const t = translations[lang];
    document.querySelector('.header h1').textContent = t.title;
    document.querySelector('.header p').textContent = t.subtitle;
    document.getElementById('addPattern').textContent = t.addPattern;
    document.getElementById('patternInput').placeholder = t.patternPlaceholder;
    document.getElementById('clearPatterns').textContent = t.clearPatterns;
    document.getElementById('applyReplacement').textContent = t.applyReplacement;
    document.getElementById('manualToggle').textContent = t.manualToggle;
    document.getElementById('exportMapping').textContent = t.exportMapping;
    document.getElementById('importMapping').textContent = t.importMapping;
    document.getElementById('clearMapping').textContent = t.clearMapping;
    document.getElementById('deanonBtn').textContent = t.deanonymize;
    document.getElementById('deanonInput').placeholder = t.deanonPlaceholder;
    document.getElementById('manualInput').placeholder = t.manualPlaceholder;
    document.getElementById('manualBtn').textContent = t.manualBtn;

    // Update section headers
    document.getElementById('sectionPatterns').innerHTML = `<span class="icon">🎯</span>${t.sectionPatterns}`;
    document.getElementById('sectionMapping').innerHTML = `<span class="icon">🗂️</span>${t.sectionMapping}`;
    document.getElementById('sectionDeanon').innerHTML = `<span class="icon">🔓</span>${t.sectionDeanon}`;
    document.getElementById('sectionManual').innerHTML = `<span class="icon">📝</span>${t.sectionManual}`;
    document.getElementById('regexHelpLink').textContent = t.regexHelp;

    // Update CSS content for empty pattern list
    const style = document.querySelector('style');
    const cssText = style.textContent;
    const newCssText = cssText.replace(
        /content: ".*";/,
        `content: "${t.noPatterns}";`
    );
    style.textContent = newCssText;

    // Update help content
    updateHelpContent(lang);

    chrome.storage.local.set({ language: lang });
    currentLanguage = lang;
}

function updateHelpContent(lang) {
    const helpContent = {
        'de': `
            <h2>🔒 Text Anonymizer - Hilfe</h2>
            
            <p><strong>Diese Erweiterung ersetzt sensible Daten durch anonyme Platzhalter.</strong> Alle Daten bleiben lokal in Ihrem Browser.</p>
            
            <h3>Schnellstart</h3>
            <p>1. Muster hinzufügen (z.B. <code>PMCID[0-9A-Z]+</code>)<br>
            2. "🔄 Textersetzung anwenden" für Webseiten<br>
            3. "📝 Manuelle Ersetzung" für schwierige Seiten</p>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🎯 Muster konfigurieren</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>Beliebte RegEx-Muster:</strong></p>
                    <ul>
                        <li><code>PMCID[0-9A-Z]+</code> - PMC-IDs</li>
                        <li><code>DOI:[0-9.]+/[^\\s]+</code> - DOI-Kennungen</li>
                        <li><code>\\b[A-Z]{2}[0-9]{6}\\b</code> - Codes wie AB123456</li>
                        <li><code>ORCID:[0-9X-]+</code> - ORCID-IDs</li>
                    </ul>
                    <p>Testen Sie Muster auf <a href="https://regex101.com" target="_blank">regex101.com</a></p>
                </div>
            </div>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🔄 Automatische vs 📝 Manuelle Ersetzung</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>Automatisch:</strong> Funktioniert auf den meisten Websites</p>
                    <p><strong>Manuell:</strong> Perfekt für moderne Apps wie Perplexity, ChatGPT, Google Docs</p>
                    <ul>
                        <li>Text in das Feld eingeben/einfügen</li>
                        <li>"Anonymisieren" klicken</li>
                        <li>Ergebnis kopieren und verwenden</li>
                    </ul>
                </div>
            </div>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🗂️ Zuordnung verwalten</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>📤 Export:</strong> Speichert als JSON-Datei</p>
                    <p><strong>📥 Import:</strong> Lädt frühere Zuordnungen</p>
                    <p><strong>🗑️ Löschen:</strong> Entfernt alle Zuordnungen</p>
                </div>
            </div>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🔧 Fehlerbehebung</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>Automatische Ersetzung funktioniert nicht?</strong></p>
                    <ul>
                        <li>Verwenden Sie die manuelle Ersetzung</li>
                        <li>Überprüfen Sie Ihre RegEx-Muster</li>
                        <li>Laden Sie die Seite neu</li>
                    </ul>
                </div>
            </div>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🛡️ Datenschutz</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>100% lokal:</strong> Alle Daten bleiben in Ihrem Browser</p>
                    <ul>
                        <li>Keine Datenübertragung an externe Server</li>
                        <li>Funktioniert vollständig offline</li>
                        <li>Kein Tracking oder Analytics</li>
                    </ul>
                </div>
            </div>
        `,
        'en': `
            <h2>🔒 Text Anonymizer - Help</h2>
            
            <p><strong>This extension replaces sensitive data with anonymous placeholders.</strong> All data stays local in your browser.</p>
            
            <h3>Quick Start</h3>
            <p>1. Add patterns (e.g. <code>PMCID[0-9A-Z]+</code>)<br>
            2. "🔄 Apply Replacement" for websites<br>
            3. "📝 Manual Replacement" for difficult sites</p>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🎯 Configure Patterns</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>Popular RegEx patterns:</strong></p>
                    <ul>
                        <li><code>PMCID[0-9A-Z]+</code> - PMC IDs</li>
                        <li><code>DOI:[0-9.]+/[^\\s]+</code> - DOI identifiers</li>
                        <li><code>\\b[A-Z]{2}[0-9]{6}\\b</code> - Codes like AB123456</li>
                        <li><code>ORCID:[0-9X-]+</code> - ORCID IDs</li>
                    </ul>
                    <p>Test patterns at <a href="https://regex101.com" target="_blank">regex101.com</a></p>
                </div>
            </div>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🔄 Automatic vs 📝 Manual Replacement</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>Automatic:</strong> Works on most websites</p>
                    <p><strong>Manual:</strong> Perfect for modern apps like Perplexity, ChatGPT, Google Docs</p>
                    <ul>
                        <li>Enter/paste text into the field</li>
                        <li>Click "Anonymize"</li>
                        <li>Copy result and use</li>
                    </ul>
                </div>
            </div>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🗂️ Manage Mapping</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>📤 Export:</strong> Saves as JSON file</p>
                    <p><strong>📥 Import:</strong> Loads previous mappings</p>
                    <p><strong>🗑️ Clear:</strong> Removes all mappings</p>
                </div>
            </div>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🔧 Troubleshooting</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>Automatic replacement not working?</strong></p>
                    <ul>
                        <li>Use manual replacement</li>
                        <li>Check your RegEx patterns</li>
                        <li>Refresh the page</li>
                    </ul>
                </div>
            </div>
            
            <div class="help-section">
                <div class="help-section-header">
                    <span>🛡️ Privacy</span>
                    <span class="help-toggle-icon">▶</span>
                </div>
                <div class="help-section-content">
                    <p><strong>100% local:</strong> All data stays in your browser</p>
                    <ul>
                        <li>No data transmission to external servers</li>
                        <li>Works completely offline</li>
                        <li>No tracking or analytics</li>
                    </ul>
                </div>
            </div>
        `
    };

    helpText.innerHTML = helpContent[lang];

    // Add event listeners to help section headers after content is loaded
    setTimeout(() => {
        attachHelpEventListeners();
    }, 100);
}

function attachHelpEventListeners() {
    const helpHeaders = document.querySelectorAll('.help-section-header');
    helpHeaders.forEach(header => {
        header.addEventListener('click', () => {
            toggleHelpSection(header);
        });
    });
}

function toggleHelpSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.help-toggle-icon');

    content.classList.toggle('expanded');
    icon.classList.toggle('expanded');
}

function loadAll() {
    chrome.storage.local.get(["patterns", "replacements", "language"], (data) => {
        const patterns = data.patterns || ["PMCID[0-9A-Z]+"];
        const replacements = data.replacements || {};
        currentLanguage = data.language || 'de';
        renderPatterns(patterns);
        renderMapping(replacements);
        updateLanguage(currentLanguage);
    });
}

function showMessage(message, isError = false) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 8px 12px;
        border-radius: 4px;
        color: white;
        font-size: 11px;
        font-weight: 500;
        z-index: 1000;
        max-width: 200px;
        word-wrap: break-word;
        background: ${isError ? '#f56565' : '#48bb78'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 2500);
}

// Manual toggle functionality
manualToggle.addEventListener('click', () => {
    manualContent.classList.toggle('expanded');
});

// Manual replacement functionality  
manualBtn.addEventListener('click', () => {
    const inputText = manualInput.value.trim();
    if (!inputText) {
        showMessage(currentLanguage === 'de' ? 'Bitte Text eingeben' : 'Please enter text', true);
        return;
    }

    chrome.storage.local.get(["patterns", "replacements"], (data) => {
        const patterns = (data.patterns || ["PMCID[0-9A-Z]+"]).map(s => new RegExp(s, "g"));
        let replacements = data.replacements || {};
        let outputText = inputText;
        let totalReplacements = 0;

        function generateFakeId() {
            return "ID" + Math.random().toString(36).substring(2, 8).toUpperCase();
        }

        patterns.forEach((regex) => {
            outputText = outputText.replace(regex, (match) => {
                if (!replacements[match]) {
                    const fakeId = generateFakeId();
                    replacements[match] = fakeId;
                    chrome.storage.local.set({ replacements });
                }
                totalReplacements++;
                return replacements[match];
            });
        });

        manualOutput.textContent = outputText;
        showMessage(currentLanguage === 'de' ?
            `${totalReplacements} Ersetzungen` :
            `${totalReplacements} replacements`);

        // Refresh mapping display
        loadAll();
    });
});

// Help modal functionality
helpToggle.addEventListener('click', () => {
    helpModal.style.display = 'flex';
});

helpClose.addEventListener('click', () => {
    helpModal.style.display = 'none';
});

helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        helpModal.style.display = 'none';
    }
});

// Add pattern
addPatternBtn.addEventListener('click', () => {
    const pattern = patternInput.value.trim();
    if (!pattern) {
        showMessage(currentLanguage === 'de' ? 'Bitte Muster eingeben' : 'Please enter pattern', true);
        return;
    }

    try {
        new RegExp(pattern);
    } catch (e) {
        showMessage(currentLanguage === 'de' ? 'Ungültiges RegEx' : 'Invalid RegEx', true);
        return;
    }

    chrome.storage.local.get(["patterns"], (data) => {
        const patterns = data.patterns || [];
        if (patterns.includes(pattern)) {
            showMessage(currentLanguage === 'de' ? 'Muster bereits vorhanden' : 'Pattern exists', true);
            return;
        }
        patterns.push(pattern);
        chrome.storage.local.set({ patterns }, () => {
            renderPatterns(patterns);
            patternInput.value = "";
            showMessage(currentLanguage === 'de' ? 'Muster hinzugefügt' : 'Pattern added');
        });
    });
});

// Clear all patterns
clearPatternsBtn.addEventListener('click', () => {
    chrome.storage.local.set({ patterns: [] }, () => {
        renderPatterns([]);
        showMessage(currentLanguage === 'de' ? 'Muster gelöscht' : 'Patterns cleared');
    });
});

// Export mapping
exportMappingBtn.addEventListener('click', () => {
    chrome.storage.local.get(["replacements"], (data) => {
        const replacements = data.replacements || {};
        const dataStr = JSON.stringify(replacements, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'anonymizer-mapping.json';
        link.click();
        URL.revokeObjectURL(url);
        showMessage(currentLanguage === 'de' ? 'Exportiert' : 'Exported');
    });
});

// Clear mapping
clearMappingBtn.addEventListener('click', () => {
    chrome.storage.local.set({ replacements: {} }, () => {
        renderMapping({});
        showMessage(currentLanguage === 'de' ? 'Zuordnung gelöscht' : 'Mapping cleared');
    });
});

// Apply replacement on current page
applyReplacementBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || tabs.length === 0) {
            showMessage(currentLanguage === 'de' ?
                'Kein aktiver Tab gefunden' :
                'No active tab found', true);
            return;
        }

        const tab = tabs[0];

        if (tab.url.startsWith('chrome://') ||
            tab.url.startsWith('chrome-extension://') ||
            tab.url.startsWith('edge://') ||
            tab.url.startsWith('about:') ||
            tab.url.startsWith('moz-extension://')) {
            showMessage(currentLanguage === 'de' ?
                'Kann nicht auf dieser Seite arbeiten (Systemseite)' :
                'Cannot work on this page (system page)', true);
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                return "content_script_test";
            }
        }, (results) => {
            if (chrome.runtime.lastError) {
                showMessage(currentLanguage === 'de' ?
                    'Kann Script nicht injizieren: ' + chrome.runtime.lastError.message :
                    'Cannot inject script: ' + chrome.runtime.lastError.message, true);
                return;
            }

            chrome.tabs.sendMessage(tab.id, { action: "applyReplacement" }, (response) => {
                if (chrome.runtime.lastError) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content.js']
                    }, () => {
                        if (chrome.runtime.lastError) {
                            showMessage(currentLanguage === 'de' ?
                                'Kommunikationsfehler: ' + chrome.runtime.lastError.message :
                                'Communication error: ' + chrome.runtime.lastError.message, true);
                            return;
                        }

                        setTimeout(() => {
                            chrome.tabs.sendMessage(tab.id, { action: "applyReplacement" }, (response) => {
                                if (chrome.runtime.lastError || !response) {
                                    showMessage(currentLanguage === 'de' ?
                                        'Immer noch keine Verbindung zur Seite' :
                                        'Still cannot communicate with page', true);
                                    return;
                                }
                                handleResponse(response);
                            });
                        }, 100);
                    });
                    return;
                }

                handleResponse(response);
            });
        });
    });

    function handleResponse(response) {
        if (response && response.success) {
            const message = currentLanguage === 'de' ?
                `${response.replacements} Ersetzungen` :
                `${response.replacements} replacements`;
            showMessage(message);
            loadAll();
        } else {
            showMessage(response ? response.message :
                (currentLanguage === 'de' ? 'Unbekannter Fehler' : 'Unknown error'), true);
        }
    }
});

// Deanonymize text
deanonBtn.addEventListener('click', () => {
    const inputText = deanonInput.value.trim();
    if (!inputText) {
        showMessage(currentLanguage === 'de' ? 'Text eingeben' : 'Enter text', true);
        return;
    }

    chrome.storage.local.get(["replacements"], (data) => {
        const replacements = data.replacements || {};
        let outputText = inputText;

        for (const [original, fake] of Object.entries(replacements)) {
            const regex = new RegExp(fake.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            outputText = outputText.replace(regex, original);
        }

        deanonOutput.textContent = outputText;
        showMessage(currentLanguage === 'de' ? 'Entschlüsselt' : 'Decrypted');
    });
});

// Enter key handlers
patternInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addPatternBtn.click();
    }
});

deanonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        deanonBtn.click();
    }
});

manualInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        manualBtn.click();
    }
});

importMappingBtn.addEventListener('click', () => {
    importFile.click();
});

importFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedMapping = JSON.parse(e.target.result);

                chrome.storage.local.get(['replacements'], (data) => {
                    const existingMapping = data.replacements || {};
                    const mergedMapping = { ...existingMapping, ...importedMapping };

                    chrome.storage.local.set({ replacements: mergedMapping }, () => {
                        renderMapping(mergedMapping);
                        showMessage(currentLanguage === 'de' ? 'Importiert' : 'Imported');
                    });
                });
            } catch (error) {
                showMessage(currentLanguage === 'de' ? 'Ungültige JSON' : 'Invalid JSON', true);
            }
        };
        reader.readAsText(file);
    } else {
        showMessage(currentLanguage === 'de' ? 'JSON-Datei wählen' : 'Select JSON file', true);
    }

    event.target.value = '';
});

languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'de' ? 'en' : 'de';
    updateLanguage(currentLanguage);
});

loadAll();
