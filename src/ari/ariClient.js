const ari = require("ari-client");
const { Call } = require("../db/models");

function connectARI() {
  ari.connect(
    "http://127.0.0.1:8088",
    "ariuser",
    "aripassword",
    (err, client) => {
      if (err) {
        console.error("ARI connection failed", err);
        setTimeout(connectARI, 3000);
        return;
      }

      console.log("✅ Connected to ARI");

      client.on("StasisStart", async (event, channel) => {
        try {
          await channel.answer();

          await channel.play({
            media: "sound:demo-congrats",
          });

          const recordingName = `rec-${Date.now()}`;

          await channel.record({
            name: recordingName,
            format: "wav",
            maxDurationSeconds: 10,
          });

          // Mock AI processing (async, non-blocking)
          setTimeout(async () => {
            const call = await Call.findOne({
              order: [["createdAt", "DESC"]],
            });

            if (call) {
              call.transcription = "Mock AI transcription result";
              call.status = "ARCHIVED";
              await call.save();
            }
          }, 3000);

        } catch (e) {
          console.error("ARI handling error:", e.message);
        }
      });

      client.start("ai-bridge");
    }
  );
}

module.exports = connectARI;
