import PizZip from 'pizzip';
import fs from 'fs';
import path from 'path';

const zip = new PizZip();

// Minimal document.xml with placeholders
const xmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>Curriculum Vitae: [NAME]</w:t></w:r></w:p>
    <w:p><w:r><w:t>[SUMMARY]</w:t></w:r></w:p>
    <w:p><w:r><w:t>Work Highlights:</w:t></w:r></w:p>
    <w:p><w:r><w:t>[WORK_0_BULLET_0]</w:t></w:r></w:p>
    <w:p><w:r><w:t>[WORK_0_BULLET_1]</w:t></w:r></w:p>
    <w:p><w:r><w:t>[WORK_0_BULLET_2]</w:t></w:r></w:p>
  </w:body>
</w:document>`;

zip.file("word/document.xml", xmlContent);
const buffer = zip.generate({ type: "nodebuffer" });

const outDir = path.join(__dirname, '..', 'src', 'templates');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'default.docx'), buffer);
console.log("Template default.docx created successfully in", outDir);
