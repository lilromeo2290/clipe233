// Edit the logo: change "CLIPE233 ENGINEERS" to "CLIPE CONSULT"
// Preserves design style, only changes the brand text.

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const INPUT_PATH = '/home/z/my-project/upload/logo.png';
const OUTPUT_PATH = '/home/z/my-project/download/logo-clipe-consult.png';
const OUTPUT_DIR = path.dirname(OUTPUT_PATH);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function editLogo() {
  console.log('📖 Reading original logo...');
  const imageBuffer = fs.readFileSync(INPUT_PATH);
  console.log(`   Original size: ${imageBuffer.length} bytes`);

  const base64Image = imageBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64Image}`;
  console.log(`   Base64 data URL length: ${dataUrl.length}`);

  console.log('\n🎨 Calling image edit API...');
  const zai = await ZAI.create();

  const editPrompt = [
    'This is a logo image that currently shows the brand name "CLIPE233 ENGINEERS".',
    'Replace ONLY the text "CLIPE233 ENGINEERS" with "CLIPE CONSULT".',
    'Keep the EXACT same design style, font, colors, layout, icon/graphic on the left,',
    'and overall composition. Only the text content should change.',
    'Preserve all visual elements: icon, colors, fonts, spacing, alignment.',
    'The new text should be "CLIPE CONSULT" in the same style as the original.',
    'Maintain the same background (white or transparent).',
    'Professional, clean, high-quality logo output.',
  ].join(' ');

  try {
    const response = await zai.images.generations.edit({
      prompt: editPrompt,
      images: [{ url: dataUrl }],
      size: '1440x720',
    });

    if (!response.data || !response.data[0] || !response.data[0].base64) {
      throw new Error('No image data in response');
    }

    const outputBuffer = Buffer.from(response.data[0].base64, 'base64');
    fs.writeFileSync(OUTPUT_PATH, outputBuffer);

    console.log(`\n✅ Logo edited successfully!`);
    console.log(`   Output: ${OUTPUT_PATH}`);
    console.log(`   Size: ${outputBuffer.length} bytes`);

    // Verify with file command
    const { execSync } = await import('child_process');
    const fileInfo = execSync(`file "${OUTPUT_PATH}"`).toString().trim();
    console.log(`   File info: ${fileInfo}`);
  } catch (error) {
    console.error(`\n❌ Image edit failed: ${error.message}`);
    if (error.response) {
      console.error(`   Response: ${JSON.stringify(error.response).slice(0, 500)}`);
    }
    process.exit(1);
  }
}

editLogo().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
