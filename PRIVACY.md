# Privacy Policy for Local Text Anonymizer

**Effective Date:** November 10, 2025  
**Last Updated:** November 10, 2025

## Overview

Local Text Anonymizer ("the Extension") is committed to protecting your privacy. This privacy policy explains what data is collected, how it is used, and how it is stored.

**Note on functionality:** The Extension's automatic "Apply Replacement" feature (script injection) was primarily tested on ChatGPT. Automatic replacement may not work reliably on all websites (especially complex web apps or rich-text editors). In such cases, please use the Manual Replacement field in the popup to anonymize text.

## Data Collection and Storage

The Extension collects and stores the following data **locally on your device only**:

### 1. User-Configured Regex Patterns
- **What:** Regular expression patterns you create to identify text for anonymization (e.g., `PMCID[0-9A-Z]+`)
- **Purpose:** To perform text replacement based on your specified patterns
- **Storage:** Stored locally in your browser using `chrome.storage.local`
- **Retention:** Stored until you manually delete patterns or clear the extension data

### 2. Anonymization Mappings
- **What:** Pairs of original text and their anonymized replacements (e.g., `{"PMCID123": "ID5A7B9C"}`)
- **Purpose:** To enable consistent anonymization and de-anonymization of text
- **Storage:** Stored locally in your browser using `chrome.storage.local`
- **Retention:** Stored until you manually clear the mapping or export/delete it

### 3. Language Preference
- **What:** Your selected interface language (German or English)
- **Purpose:** To display the extension interface in your preferred language
- **Storage:** Stored locally in your browser using `chrome.storage.local`
- **Retention:** Stored until you change the preference or clear extension data

### 4. Text Content (Temporary Processing)
- **What:** Text you enter in the manual anonymization field or text on web pages where you apply anonymization
- **Purpose:** To perform pattern matching and text replacement
- **Storage:** Processed in memory only; not permanently stored
- **Retention:** Discarded immediately after processing

## Data Sharing and Transmission

**The Extension does NOT:**
- Send any data to external servers
- Transmit data over the network
- Share data with third parties
- Use tracking, analytics, or telemetry services
- Access data from pages you don't explicitly anonymize
- Store data outside your local browser

**All processing happens locally on your device.** The Extension works completely offline after installation.

## Third-Party Services

The Extension does not integrate with or send data to any third-party services. The only external reference is a link to `https://regex101.com` in the help documentation, which is a user-initiated navigation for learning about regular expressions (no data is sent automatically).

## Permissions Used

The Extension requests the following permissions:

- **`storage`:** To save your patterns, mappings, and preferences locally in your browser
- **`activeTab`:** To access the page you're currently viewing when you explicitly click to anonymize text
- **`scripting`:** To inject the anonymization script into the active tab after you trigger the action

These permissions are used solely for the Extension's core functionality and do not enable background tracking or data collection.

## User Rights and Control

You have full control over your data:

- **View Data:** All mappings are visible in the Extension popup under "Zuordnung/Mapping"
- **Export Data:** Use the "📤 Export" button to download your mappings as a JSON file
- **Import Data:** Use the "📥 Import" button to restore previously exported mappings
- **Delete Data:** Use the "🗑️ Löschen/Clear" buttons to delete patterns or mappings at any time
- **Complete Removal:** Uninstalling the Extension removes all stored data from your browser

## Data Security

All data is stored using Chrome's secure local storage API (`chrome.storage.local`), which is isolated per-extension and protected by the browser's security model. No data is transmitted over networks, reducing exposure to interception or unauthorized access.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last Updated" date at the top of this document. Continued use of the Extension after changes constitutes acceptance of the updated policy.

## Contact Information

If you have questions about this Privacy Policy or the Extension's data practices, please contact:

**Developer:** F. Oberhammer  
**Repository:** [https://github.com/OberhammerF/local-text-anonymizer](https://github.com/OberhammerF/local-text-anonymizer)  
**Email:** [oberhammer.dev@gmail.com]

## Compliance

This Extension complies with:
- Chrome Web Store Developer Program Policies
- General Data Protection Regulation (GDPR) principles of data minimization and local processing
- User privacy best practices for browser extensions

---

**Summary:** Local Text Anonymizer stores user configuration data locally in your browser and does not transmit any data to external servers. All processing is performed locally on your device.

© 2025 F. Oberhammer
