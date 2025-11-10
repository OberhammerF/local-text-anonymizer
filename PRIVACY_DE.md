# Datenschutzerklärung für Local Text Anonymizer

**Gültig ab:** 10. November 2025  
**Zuletzt aktualisiert:** 10. November 2025

## Übersicht

Local Text Anonymizer („die Erweiterung") ist dem Schutz Ihrer Privatsphäre verpflichtet. Diese Datenschutzerklärung erklärt, welche Daten erfasst werden, wie sie verwendet und wie sie gespeichert werden.

**Hinweis zur Funktionalität:** Die automatische Funktion "🔄 Textersetzung anwenden" (Skriptinjektion) wurde hauptsächlich mit ChatGPT getestet. Die automatische Ersetzung funktioniert unter Umständen nicht zuverlässig auf allen Websites (insbesondere komplexe Web-Apps oder Rich-Text-Editoren). In solchen Fällen verwenden Sie bitte das Feld für die "Manuelle Ersetzung" im Popup, um Text zu anonymisieren.

## Datenerfassung und Speicherung

Die Erweiterung erfasst und speichert die folgenden Daten **ausschließlich lokal auf Ihrem Gerät**:

### 1. Benutzerkonfigurierte RegEx-Muster
- **Was:** Von Ihnen erstellte reguläre Ausdrücke zur Identifizierung von Text für die Anonymisierung (z. B. `PMCID[0-9A-Z]+`)
- **Zweck:** Um Textersetzungen basierend auf Ihren angegebenen Mustern durchzuführen
- **Speicherung:** Lokal in Ihrem Browser über `chrome.storage.local` gespeichert
- **Aufbewahrung:** Gespeichert, bis Sie Muster manuell löschen oder die Erweiterungsdaten löschen

### 2. Anonymisierungszuordnungen
- **Was:** Paare aus Originaltext und deren anonymisierten Ersetzungen (z. B. `{"PMCID123": "ID5A7B9C"}`)
- **Zweck:** Um konsistente Anonymisierung und De-Anonymisierung von Text zu ermöglichen
- **Speicherung:** Lokal in Ihrem Browser über `chrome.storage.local` gespeichert
- **Aufbewahrung:** Gespeichert, bis Sie die Zuordnung manuell löschen oder exportieren/löschen

### 3. Sprachpräferenz
- **Was:** Ihre gewählte Oberflächensprache (Deutsch oder Englisch)
- **Zweck:** Um die Erweiterungsoberfläche in Ihrer bevorzugten Sprache anzuzeigen
- **Speicherung:** Lokal in Ihrem Browser über `chrome.storage.local` gespeichert
- **Aufbewahrung:** Gespeichert, bis Sie die Präferenz ändern oder Erweiterungsdaten löschen

### 4. Textinhalte (temporäre Verarbeitung)
- **Was:** Text, den Sie in das manuelle Anonymisierungsfeld eingeben, oder Text auf Webseiten, auf denen Sie die Anonymisierung anwenden
- **Zweck:** Um Musterabgleich und Textersetzung durchzuführen
- **Speicherung:** Nur im Arbeitsspeicher verarbeitet; nicht dauerhaft gespeichert
- **Aufbewahrung:** Sofort nach der Verarbeitung verworfen

## Datenweitergabe und -übertragung

**Die Erweiterung:**
- Sendet KEINE Daten an externe Server
- Überträgt KEINE Daten über das Netzwerk
- Teilt KEINE Daten mit Dritten
- Verwendet KEINE Tracking-, Analyse- oder Telemetriedienste
- Greift NICHT auf Daten von Seiten zu, die Sie nicht explizit anonymisieren
- Speichert KEINE Daten außerhalb Ihres lokalen Browsers

**Alle Verarbeitung erfolgt lokal auf Ihrem Gerät.** Die Erweiterung funktioniert nach der Installation vollständig offline.

## Dienste von Drittanbietern

Die Erweiterung integriert keine Dienste von Drittanbietern und sendet keine Daten an diese. Die einzige externe Referenz ist ein Link zu `https://regex101.com` in der Hilfedokumentation, der eine vom Benutzer initiierte Navigation zum Lernen über reguläre Ausdrücke darstellt (es werden keine Daten automatisch gesendet).

## Verwendete Berechtigungen

Die Erweiterung fordert folgende Berechtigungen an:

- **`storage`:** Um Ihre Muster, Zuordnungen und Präferenzen lokal in Ihrem Browser zu speichern
- **`activeTab`:** Um auf die Seite zuzugreifen, die Sie gerade ansehen, wenn Sie explizit auf Anonymisierung klicken
- **`scripting`:** Um das Anonymisierungsskript in den aktiven Tab zu injizieren, nachdem Sie die Aktion auslösen

Diese Berechtigungen werden ausschließlich für die Kernfunktionalität der Erweiterung verwendet und ermöglichen kein Hintergrund-Tracking oder Datenerfassung.

## Benutzerrechte und Kontrolle

Sie haben volle Kontrolle über Ihre Daten:

- **Daten einsehen:** Alle Zuordnungen sind im Erweiterungs-Popup unter „Zuordnung/Mapping" sichtbar
- **Daten exportieren:** Verwenden Sie die Schaltfläche „📤 Export", um Ihre Zuordnungen als JSON-Datei herunterzuladen
- **Daten importieren:** Verwenden Sie die Schaltfläche „📥 Import", um zuvor exportierte Zuordnungen wiederherzustellen
- **Daten löschen:** Verwenden Sie die Schaltflächen „🗑️ Löschen/Clear", um Muster oder Zuordnungen jederzeit zu löschen
- **Vollständige Entfernung:** Die Deinstallation der Erweiterung entfernt alle gespeicherten Daten aus Ihrem Browser

## Datensicherheit

Alle Daten werden über die sichere lokale Speicher-API von Chrome (`chrome.storage.local`) gespeichert, die pro Erweiterung isoliert und durch das Sicherheitsmodell des Browsers geschützt ist. Da keine Daten über Netzwerke übertragen werden, wird das Risiko von Abfangen oder unbefugtem Zugriff reduziert.

## Änderungen dieser Datenschutzerklärung

Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Änderungen werden im Datum „Zuletzt aktualisiert" am Anfang dieses Dokuments widergespiegelt. Die fortgesetzte Nutzung der Erweiterung nach Änderungen stellt die Akzeptanz der aktualisierten Richtlinie dar.

## Kontaktinformationen

Wenn Sie Fragen zu dieser Datenschutzerklärung oder den Datenpraktiken der Erweiterung haben, wenden Sie sich bitte an:

**Entwickler:** F. Oberhammer  
**Repository:** [https://github.com/OberhammerF/local-text-anonymizer](https://github.com/OberhammerF/local-text-anonymizer)  
**E-Mail:** [oberhammer.dev@gmail.com]

## Compliance

Diese Erweiterung entspricht:
- Chrome Web Store Developer Program Policies
- DSGVO-Prinzipien der Datenminimierung und lokalen Verarbeitung
- Best Practices für Datenschutz bei Browser-Erweiterungen

---

**Zusammenfassung:** Local Text Anonymizer speichert Benutzerkonfigurationsdaten lokal in Ihrem Browser und überträgt keine Daten an externe Server. Alle Verarbeitung erfolgt lokal auf Ihrem Gerät.

© 2025 F. Oberhammer
