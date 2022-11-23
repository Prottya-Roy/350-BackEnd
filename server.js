// import socketAssign from "./api/middlewares/socketAssign";

const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const sequelize = require("./api/database/database");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const judge = require("./judge");

const User = require("./api/models/user");
const Problem = require("./api/models/problem");
const Contest = require("./api/models/contest");
const Submission = require("./api/models/submission");
const SampleTestCase = require("./api/models/sampleTestCase");
const MainTestCase = require("./api/models/mainTestCase");
const Tag = require("./api/models/tag");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const socketAssign = (socket, next) => {
  const { token } = socket.handshake.query;
  socket.data.userID = -1;
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userID = decoded.userID;
    if (!userID) {
      socket.emit("Error", "Not Logged in");
    } else socket.data.userID = userID;
  } catch (error) {
    socket.emit("Error", "Not Logged in (probalby)");
  }
  next();
};

io.use(socketAssign);

io.on("connection", (socket) => {
  console.log(`Connected: `, socket.id);
  if (socket.data.userID == -1) {
    socket.emit("Error", "e1");
  }
  let localBuffer = "";

  socket.on("openProblemFolder", (pid) => {
    try {
      fs.mkdirSync("../350-storage/" + pid, (err) => {
        if (err) {
          console.log(err);
          socket.emit("Error", "e2");
        }
      });
      socket.emit("giveTest", 0);
    } catch (error) {
      console.log(error);
      socket.emit("Error", "e3");
    }
  });

  socket.on("openTestFolder", (pid, testId) => {
    try {
      fs.mkdirSync("../350-storage/" + pid + "/" + testId, (err) => {
        if (err) {
          console.log(err);
          socket.emit("Error", "e4");
        }
      });
      localBuffer = "";
      socket.emit("sendInput", testId, 0);
    } catch (error) {
      console.log(err);
      socket.emit("Error", "e5");
    }
  });

  socket.on("inputChunk", (pid, testId, blockId, islast, buffer) => {
    localBuffer += buffer;
    if (islast) {
      try {
        fs.writeFileSync(
          "../350-storage/" + pid + "/" + testId + "/input.txt",
          localBuffer,
          "base64",
          (err) => {
            if (err) {
              console.log(err);
              socket.emit("Error", "e6");
            }
          }
        );
        localBuffer = "";
        socket.emit("sendOutput", testId, 0);
      } catch (error) {
        socket.emit("Error", "e7");
      }
    } else {
      socket.emit("sendInput", testId, blockId + 1);
    }
  });

  socket.on("outputChunk", (pid, testId, blockId, islast, buffer) => {
    localBuffer += buffer;

    if (islast) {
      try {
        fs.writeFileSync(
          "../350-storage/" + pid + "/" + testId + "/output.txt",
          localBuffer,
          "base64",
          (err) => {
            if (err) {
              console.log(err);
              socket.emit("Error", "e6");
            }
          }
        );
        localBuffer = "";
        socket.emit("giveTest", testId + 1);
      } catch (error) {
        socket.emit("Error", "e7");
      }
    } else {
      socket.emit("sendOutput", testId, blockId + 1);
    }
  });

  socket.on("judge", (pid, source, type) => {
    const enc = type == "text" ? "ascii" : "base64";
    const folderUrl = "../350-submissions/" + pid + "_" + socket.data.userID + "_" + Date.now();
    socket.emit("submission".folderUrl);
    try {
      fs.mkdirSync(folderUrl, (err) => {
        if (err) {
          console.log(err);
          socket.emit("Error", "e8");
        }
      });
      fs.writeFileSync(folderUrl + "/source.cpp", source, enc, (err) => {
        if (err) {
          console.log(err);
          socket.emit("Error", "e9");
        }
      });
      socket.emit("Running", 1);

      const next = (tid, res) => {
        console.log(tid, res);
        if (res == 2) {
          socket.emit("Verdict", 0, 100, folderUrl);
        } else if (res == 0) {
          socket.emit("Running", tid + 2);
          judge.check(pid, tid + 1, folderUrl, 1, next);
        } else {
          socket.emit("Verdict", res, tid + 1, folderUrl);
        }
      };
      judge.check(pid, 0, folderUrl, 1, next);
    } catch (error) {
      console.log(error);
      socket.emit("Error", "e10");
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
    socket.disconnect();
  });
});

const startServer = async (server) => {
  await sequelize.authenticate();
  await sequelize
    .sync({
      // force: true,
    })
    .then((result) => {
      console.log(result);
    });
  server.listen(port, () => {
    console.log("Server Started...");
  });
};

startServer(server);
