const AmiClient = require("asterisk-ami-client");
const { Call } = require("../db/models");

const ami = new AmiClient();

async function connectAMI() {
  try {
    await ami.connect("amiuser", "amipassword", {
      host: "127.0.0.1",
      port: 5038,
    });

    console.log("✅ Connected to AMI");

    ami.on("event", async (event) => {
      if (event.Event === "Dial" && event.SubEvent === "Begin") {
        await Call.create({
          callerId: event.CallerIDNum,
          destination: event.DialString,
          startTime: new Date(),
        });
      }

      if (event.Event === "Hangup") {
        const call = await Call.findOne({
          where: { callerId: event.CallerIDNum },
          order: [["createdAt", "DESC"]],
        });

        if (call) {
          call.endTime = new Date();
          call.duration = Math.floor(
            (call.endTime - call.startTime) / 1000
          );
          call.status = "COMPLETED";
          await call.save();
        }
      }
    });

    ami.on("disconnect", () => {
      console.log("⚠️ AMI disconnected. Reconnecting...");
      setTimeout(connectAMI, 3000);
    });

  } catch (err) {
    console.error("❌ AMI connection failed. Retrying...", err.message);
    setTimeout(connectAMI, 3000);
  }
}

module.exports = connectAMI;
