// Quickly analyze both the original and edited logos using VLM
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyzeImage(imagePath, label) {
  console.log(`\n=== Analyzing ${label} ===`);
  console.log(`   Path: ${imagePath}`);

  const buffer = fs.readFileSync(imagePath);
  const base64 = buffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64}`;

  const zai = await ZAI.create();

  try {
    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Briefly describe this logo. What text is shown? What is the main color scheme? What icon or graphic is on the left? Keep response under 100 words.',
            },
            {
              type: 'image_url',
              image_url: { url: dataUrl },
            },
          ],
        },
      ],
      thinking: { type: 'disabled' },
    });

    console.log(`   Analysis: ${response.choices[0]?.message?.content}`);
  } catch (err) {
    console.error(`   ❌ VLM failed: ${err.message}`);
  }
}

await analyzeImage('/home/z/my-project/upload/logo.png', 'ORIGINAL (uploaded by user)');
await analyzeImage('/home/z/my-project/download/logo-clipe-consult.png', 'EDITED (after AI text replacement)');
