const express = require("express");
const gTTS = require("google-tts-api");
const path = require("path");
const { Readable } = require("stream");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Split text into ~200 char chunks
function splitText(text, maxLength = 200) {
  const chunks = [];
  let current = "";

  for (const word of text.split(" ")) {
    if ((current + word).length > maxLength) {
      chunks.push(current);
      current = word;
    } else {
      current += (current ? " " : "") + word;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

app.get("/tts-stream", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.status(400).send("Missing text");

  res.set({
    "Content-Type": "audio/mpeg",
    "Transfer-Encoding": "chunked", //chunked = not know final length, data is chunks
  });

  const chunks = splitText(text);
  console.log(`TTS streaming started. Total chunks: ${chunks.length}`);

  try {
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      console.log(
        `➡️  Streaming chunk ${i + 1}/${chunks.length} (${chunk.length} chars)`
      );

      const url = gTTS.getAudioUrl(chunk, {
        lang: "en",
        slow: false,
      });
      
      //Google return ReadableStream/Response object
      const audioRes = await fetch(url);
      const nodeStream = Readable.fromWeb(audioRes.body);

      await new Promise((resolve) => {
        //For each chunk, connect it to response object of this api
        nodeStream.pipe(res, { end: false });
        nodeStream.on("end", () => {
          console.log(`✅ Finished chunk ${i + 1}/${chunks.length}`);
          resolve();
        });
      });
    }

    console.log("🎉 TTS streaming completed");
    res.end();
  } catch (err) {
    console.error("❌ TTS streaming error:", err);
    res.end();
  }
});

app.listen(PORT, () =>
  console.log(`Streaming TTS on http://localhost:${PORT}`)
);
