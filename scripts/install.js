#!/usr/bin/env node

const fs = require("fs/promises");
const os = require("os");
const path = require("path");

async function main() {
  const args = new Set(process.argv.slice(2));

  if (args.has("--help") || args.has("-h")) {
    printUsage(0);
    return;
  }

  if (!args.has("--claude")) {
    console.error("Neuron installer currently supports only the Claude target.");
    printUsage(1);
    return;
  }

  const wantsGlobal = args.has("--global");
  const wantsLocal = args.has("--local");

  if (wantsGlobal === wantsLocal) {
    console.error("Choose exactly one install mode: --global or --local.");
    printUsage(1);
    return;
  }

  const packageRoot = path.resolve(__dirname, "..");
  const sourceClaudeRoot = path.join(packageRoot, ".claude");
  const sourceCommandsDir = path.join(sourceClaudeRoot, "commands");
  const sourceAgentsDir = path.join(sourceClaudeRoot, "agents");
  const targetClaudeRoot = wantsGlobal
    ? path.join(os.homedir(), ".claude")
    : path.join(process.cwd(), ".claude");

  const targetCommandsDir = path.join(targetClaudeRoot, "commands");
  const targetAgentsDir = path.join(targetClaudeRoot, "agents");

  await ensureDirectory(sourceCommandsDir);
  await ensureDirectory(sourceAgentsDir);
  await fs.mkdir(targetCommandsDir, { recursive: true });
  await fs.mkdir(targetAgentsDir, { recursive: true });

  const installedCommands = await copyMarkdownFiles(sourceCommandsDir, targetCommandsDir);
  const installedAgents = await copyMarkdownFiles(sourceAgentsDir, targetAgentsDir);

  console.log("");
  console.log("Neuron installation completed.");
  console.log(`Target: ${targetClaudeRoot}`);
  console.log(`Mode: ${wantsGlobal ? "global" : "local"}`);
  console.log("");
  console.log("Commands installed:");
  installedCommands.forEach((file) => console.log(`- ${path.join(targetCommandsDir, file)}`));
  console.log("");
  console.log("Agents installed:");
  installedAgents.forEach((file) => console.log(`- ${path.join(targetAgentsDir, file)}`));
  console.log("");
  console.log("Claude Code entrypoints:");
  console.log("- /neuron");
  console.log("- /neuron-avaliar-projeto");
  console.log("- /neuron-analisar-reuniao");
}

async function ensureDirectory(dirPath) {
  try {
    const stat = await fs.stat(dirPath);
    if (!stat.isDirectory()) {
      throw new Error(`${dirPath} exists but is not a directory.`);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Missing required directory: ${dirPath}`);
    }
    throw error;
  }
}

async function copyMarkdownFiles(sourceDir, targetDir) {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }

    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    await fs.copyFile(sourcePath, targetPath);
    files.push(entry.name);
  }

  files.sort();
  return files;
}

function printUsage(exitCode) {
  console.log("Usage:");
  console.log("  npx @kikompg/neuron-cc@latest --claude --global");
  console.log("  npx @kikompg/neuron-cc@latest --claude --local");
  console.log("");
  console.log("Options:");
  console.log("  --claude   Install Neuron into the Claude Code command/agent structure");
  console.log("  --global   Copy to ~/.claude");
  console.log("  --local    Copy to ./.claude in the current project");
  console.log("  --help     Show this message");
  process.exit(exitCode);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
