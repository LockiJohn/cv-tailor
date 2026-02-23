
import PizZip from "pizzip";
import fs from "fs";
import path from "path";

/**
 * Proof of Concept: DOCX "Near-Original" Patcher
 * This script demonstrates how to open a DOCX, find the document.xml,
 * and replace text nodes without losing the outer <w:rPr> (style) tags.
 */

const patchDocx = (inputPath: string, outputPath: string, replacements: Record<string, string>) => {
    const content = fs.readFileSync(inputPath);
    const zip = new PizZip(content);

    // DOCX main content is usually in word/document.xml
    let xmlContent = zip.file("word/document.xml")?.asText();

    if (!xmlContent) {
        console.error("Could not find word/document.xml");
        return;
    }

    // Basic regex-based replacement for POC. 
    // In production, we'd use an XML parser (like fast-xml-parser or xmldom)
    // to ensure we only replace text inside <w:t> tags.
    for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(key, "g");
        xmlContent = xmlContent.replace(regex, value);
    }

    zip.file("word/document.xml", xmlContent);

    const buffer = zip.generate({ type: "nodebuffer" });
    fs.writeFileSync(outputPath, buffer);
    console.log(`Pitched DOCX saved to: ${outputPath}`);
};

// Mock Usage
// patchDocx("original.docx", "tailored.docx", { "Old Summary": "New tailored summary for BA roles..." });
