#!/usr/bin/env node

const fs = require("fs/promises");
const os = require("os");
const path = require("path");

async function main() {
  const args = new Set(process.argv.slice(2));
  const wantsUpdate = args.has("--update");

  if (args.has("--help") || args.has("-h")) {
    printUsage(0);
    return;
  }

  if (!args.has("--claude") && !wantsUpdate) {
    console.error("Neuron installer currently supports only the Claude target.");
    printUsage(1);
    return;
  }

  const wantsGlobal = args.has("--global");
  const wantsLocal = args.has("--local");

  const packageRoot = path.resolve(__dirname, "..");
  const sourceClaudeRoot = path.join(packageRoot, ".claude");
  const sourceCommandsDir = path.join(sourceClaudeRoot, "commands");
  const sourceAgentsDir = path.join(sourceClaudeRoot, "agents");
  const globalClaudeRoot = path.join(os.homedir(), ".claude");
  const localClaudeRoot = path.join(process.cwd(), ".claude");

  await ensureDirectory(sourceCommandsDir);
  await ensureDirectory(sourceAgentsDir);

  const targetRoots = await resolveTargets({
    wantsUpdate,
    wantsGlobal,
    wantsLocal,
    globalClaudeRoot,
    localClaudeRoot,
  });

  const summaries = [];

  for (const targetClaudeRoot of targetRoots) {
    const targetCommandsDir = path.join(targetClaudeRoot, "commands");
    const targetAgentsDir = path.join(targetClaudeRoot, "agents");

    await fs.mkdir(targetCommandsDir, { recursive: true });
    await fs.mkdir(targetAgentsDir, { recursive: true });

    const installedCommands = await copyMarkdownFiles(sourceCommandsDir, targetCommandsDir);
    const installedAgents = await copyMarkdownFiles(sourceAgentsDir, targetAgentsDir);

    summaries.push({
      targetClaudeRoot,
      installedCommands,
      installedAgents,
    });
  }

  console.log("");
  console.log(`Neuron ${wantsUpdate ? "update" : "installation"} completed.`);

  for (const summary of summaries) {
    console.log("");
    console.log(`Target: ${summary.targetClaudeRoot}`);
    console.log("Commands installed:");
    summary.installedCommands.forEach((file) =>
      console.log(`- ${path.join(summary.targetClaudeRoot, "commands", file)}`),
    );
    console.log("");
    console.log("Agents installed:");
    summary.installedAgents.forEach((file) =>
      console.log(`- ${path.join(summary.targetClaudeRoot, "agents", file)}`),
    );
  }

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

async function resolveTargets({
  wantsUpdate,
  wantsGlobal,
  wantsLocal,
  globalClaudeRoot,
  localClaudeRoot,
}) {
  if (!wantsUpdate) {
    if (wantsGlobal === wantsLocal) {
      throw new Error("Choose exactly one install mode: --global or --local.");
    }

    return [wantsGlobal ? globalClaudeRoot : localClaudeRoot];
  }

  if (wantsGlobal || wantsLocal) {
    return [wantsGlobal && globalClaudeRoot, wantsLocal && localClaudeRoot].filter(Boolean);
  }

  const targets = [];

  if (await hasNeuronInstall(globalClaudeRoot)) {
    targets.push(globalClaudeRoot);
  }

  if (await hasNeuronInstall(localClaudeRoot)) {
    targets.push(localClaudeRoot);
  }

  if (targets.length > 0) {
    return targets;
  }

  console.log("No existing Neuron install found. Falling back to global install.");
  return [globalClaudeRoot];
}

async function hasNeuronInstall(claudeRoot) {
  const expectedFiles = [
    path.join(claudeRoot, "commands", "neuron.md"),
    path.join(claudeRoot, "commands", "neuron-analisar-reuniao.md"),
    path.join(claudeRoot, "agents", "project-evaluator.md"),
  ];

  for (const filePath of expectedFiles) {
    try {
      await fs.access(filePath);
      return true;
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  return false;
}

function printUsage(exitCode) {
  console.log("Usage:");
  console.log("  npx @kikompg/neuron-cc@latest --claude --global");
  console.log("  npx @kikompg/neuron-cc@latest --claude --local");
  console.log("  npx @kikompg/neuron-cc@latest --update");
  console.log("  npx @kikompg/neuron-cc@latest --update --global");
  console.log("  npx @kikompg/neuron-cc@latest --update --local");
  console.log("");
  console.log("Options:");
  console.log("  --claude   Install Neuron into the Claude Code command/agent structure");
  console.log("  --global   Copy to ~/.claude");
  console.log("  --local    Copy to ./.claude in the current project");
  console.log("  --update   Update an existing Neuron install. Without target flags, updates detected installs.");
  console.log("  --help     Show this message");
  process.exit(exitCode);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
