const routerPrompt = require("./routers/prompt");
const formPrompt = require("./forms/prompt");
const router = require("./routers");
const forms = require("./forms");

const questions = [routerPrompt, formPrompt];
const packages = [router, forms];

module.exports = { questions: questions, packages: packages };
