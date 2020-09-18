const prompt = require("./routers/prompt");
const router = require("./routers");

const questions = [prompt];

module.exports = { questions: questions, packages: router };
