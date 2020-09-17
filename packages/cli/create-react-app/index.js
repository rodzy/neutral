require("colors");
const sh = require("shelljs");
const inquirer = require("inquirer");
// const fse = require("fs-extra");
// const set = require("lodash.set");
const ora = require("ora");
const settings = require("./settings");

sh.config.silent = true;

const mainQuestions = async () => {
    const selectedConfigList = [];

    const questions = settings.map((config) => ({
        type: "confirm",
        name: config.name,
        message: config.question,
    }));

    const answers = await inquirer.prompt(questions);

    settings.forEach((config) => {
        const matchingAnswer = answers[config.name];

        if (matchingAnswer) {
            selectedConfigList.push(config);
        }
    });

    return selectedConfigList;
};

const createReactApp = (appName, appType, appLanguage, appManager) => {
    console.log("\n");
    const route = `${(process.cwd() + "\\" + appName).bold.cyan}`;
    const spinner = ora(
        `✨ Generating a ${appType.underline.brightGreen} in a directory called ${route}
    \n\nUsing:\n> ${appLanguage.cyan} as a programming language.\n> ${appManager.cyan} as package manager.\n`
    ).start();
    spinner.spinner = "dots";
    spinner.color = "cyan";
    const statement =
        appLanguage === "TypeScript" ? "--template typescript" : "";
    if (appType === "create-react-app (Default)") {
        if (appManager === "npm") {
            return new Promise((resolve, reject) => {
                sh.exec(
                    `npx create-react-app ${appName} --use-npm ${statement}`,
                    () => {
                        const redirect = sh.cd(appName);
                        if (redirect.code !== 0) {
                            console.log(
                                `❌ Error while searching for ${appName}`.red
                            );
                            reject();
                        }
                        if (resolve()) {
                            spinner.succeed();
                        } else {
                            spinner.fail();
                        }
                    }
                );
            });
        } else {
            return new Promise((resolve, reject) => {
                sh.exec(`npx create-react-app ${appName} ${statement} `, () => {
                    const redirect = sh.cd(appName);
                    if (redirect.code !== 0) {
                        console.log(
                            `❌ Error while searching for ${appName}`.red
                        );
                        reject();
                    }
                    if (resolve()) {
                        spinner.succeed();
                    } else {
                        spinner.fail();
                    }
                });
            });
        }
    } else if (appType === "create-react-app (Using webpack⚡)") {
        // Using the CRA template for now
        // @TODO: Using javascript webpack template for use on _mocks_
        return new Promise((resolve, reject) => {
            sh.exec(`npx create-react-app ${appName}`, () => {
                const redirect = sh.cd(appName);
                if (redirect.code !== 0) {
                    console.log(`❌ Error while searching for ${appName}`.red);
                    reject();
                }
                if (resolve()) {
                    spinner.succeed();
                } else {
                    spinner.fail();
                }
            });
        });
    }
};

const installDependencies = async (
    selectedConfigList,
    appLanguage,
    appManager
) => {
    let dependencies = [];
    let devDependencies = [];

    selectedConfigList.forEach((config) => {
        if (appLanguage === "JavaScript") {
            dependencies = [...dependencies, ...config.dependencies];
        } else {
            dependencies = [...dependencies, ...config.dependencies];
            devDependencies = [...devDependencies, ...config.devDependencies];
        }
    });

    await new Promise((resolve) => {
        const spinner = ora(
            `✨ Setting up the ${
                `dependencies`.underline.cyan
            } for your selected configuration.....\n`
        ).start();
        spinner.spinner = "dots";
        spinner.color = "cyan";
        if (appManager === "npm") {
            sh.exec(`npm i --save ${dependencies.join(" ")}`, () => {
                spinner.succeed();
                resolve();
            });
        } else {
            sh.exec(`yarn add ${dependencies.join(" ")}`, () => {
                spinner.succeed();
                resolve();
            });
        }
    });

    if (devDependencies !== []) {
        await new Promise((resolve) => {
            const spinner = ora(
                `✨ Setting up the ${
                    `dev dependencies`.underline.cyan
                } for your selected configuration.....\n`
            ).start();
            spinner.spinner = "dots";
            spinner.color = "cyan";
            if (appManager === "npm") {
                sh.exec(`npm i --save-dev ${devDependencies.join(" ")}`, () => {
                    spinner.succeed();
                    resolve();
                });
            } else {
                sh.exec(`yarn add -D ${devDependencies.join(" ")}`, () => {
                    spinner.succeed();
                    resolve();
                });
            }
        });
    }
};

exports.execute = async (
    appName,
    appDirectory,
    appType,
    appLanguage,
    appManager
) => {
    const preferedConfig = await mainQuestions();
    await createReactApp(appName, appType, appLanguage, appManager);
    await installDependencies(preferedConfig, appLanguage, appManager);

    console.log(`✅ Created ${appType} on ${appName}`);
    return true;
};

process.on("SIGINT", function () {
    console.log("\nCancelled the app generation (CTRL+C was pressed)".inverse);
    process.exit(1);
});
