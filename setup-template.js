#!/usr/bin/env node

/**
 * Template Setup Script
 * Helps initialize a new project from this template
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const prompts = [
  {
    name: "projectName",
    message: "Project name:",
    default: "my-electron-app",
  },
  {
    name: "description",
    message: "Project description:",
    default: "An Electron app built with React and Vite",
  },
  {
    name: "author",
    message: "Author name:",
    default: "Your Name <your.email@example.com>",
  },
  {
    name: "repositoryUrl",
    message: "Repository URL (optional):",
    default: "",
  },
];

function updatePackageJson(answers) {
  const packagePath = path.join(__dirname, "package.json");
  const rendererPackagePath = path.join(__dirname, "renderer", "package.json");

  // Update main package.json
  const mainPackage = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  mainPackage.name = answers.projectName;
  mainPackage.description = answers.description;
  mainPackage.author = answers.author;

  if (answers.repositoryUrl) {
    mainPackage.repository = {
      type: "git",
      url: answers.repositoryUrl,
    };
  }

  fs.writeFileSync(packagePath, JSON.stringify(mainPackage, null, 2));

  // Update renderer package.json
  const rendererPackage = JSON.parse(
    fs.readFileSync(rendererPackagePath, "utf8")
  );
  rendererPackage.name = `${answers.projectName}-renderer`;
  fs.writeFileSync(
    rendererPackagePath,
    JSON.stringify(rendererPackage, null, 2)
  );
}

function updateIndexHtml(answers) {
  const indexPath = path.join(__dirname, "renderer", "index.html");
  let content = fs.readFileSync(indexPath, "utf8");

  // Update title
  content = content.replace(
    /<title>.*<\/title>/,
    `<title>${answers.projectName}</title>`
  );

  fs.writeFileSync(indexPath, content);
}

function updateReadme(answers) {
  const readmePath = path.join(__dirname, "README.md");
  let content = fs.readFileSync(readmePath, "utf8");

  // Replace template references with actual project name
  content = content.replace(
    /electron-react-vite-template/g,
    answers.projectName
  );
  content = content.replace(
    /yourusername\/your-app-name/g,
    `yourusername/${answers.projectName}`
  );

  fs.writeFileSync(readmePath, content);
}

function cleanupTemplate() {
  // Remove template setup script
  const setupScriptPath = path.join(__dirname, "setup-template.js");
  if (fs.existsSync(setupScriptPath)) {
    fs.unlinkSync(setupScriptPath);
  }

  // Remove .git if it exists (for clean start)
  const gitPath = path.join(__dirname, ".git");
  if (fs.existsSync(gitPath)) {
    execSync("rmdir /s /q .git", { stdio: "inherit", cwd: __dirname });
  }
}

async function main() {
  console.log("🚀 Setting up your Electron + React + Vite project...\n");

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers = {};

  for (const prompt of prompts) {
    await new Promise((resolve) => {
      readline.question(`${prompt.message} (${prompt.default}): `, (answer) => {
        answers[prompt.name] = answer.trim() || prompt.default;
        resolve();
      });
    });
  }

  readline.close();

  console.log("\n⚙️ Updating project files...");

  updatePackageJson(answers);
  updateIndexHtml(answers);
  updateReadme(answers);

  console.log("🧹 Cleaning up template files...");
  cleanupTemplate();

  console.log("\n✅ Setup complete!");
  console.log("\nNext steps:");
  console.log("1. Run: npm run setup");
  console.log("2. Run: npm run dev");
  console.log("3. Start building your app! 🎉");
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { updatePackageJson, updateIndexHtml, updateReadme };
