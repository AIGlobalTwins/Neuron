#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");

const NODE_STYLES = {
  start: { shape: "ellipse", width: 180, height: 80, backgroundColor: "#dbeafe", strokeColor: "#1d4ed8" },
  manual_task: { shape: "rectangle", width: 260, height: 110, backgroundColor: "#f8fafc", strokeColor: "#334155" },
  system_task: { shape: "rectangle", width: 260, height: 110, backgroundColor: "#ecfeff", strokeColor: "#0f766e" },
  automation: { shape: "rectangle", width: 260, height: 110, backgroundColor: "#dcfce7", strokeColor: "#166534" },
  decision: { shape: "diamond", width: 220, height: 140, backgroundColor: "#fef3c7", strokeColor: "#b45309" },
  approval: { shape: "diamond", width: 220, height: 140, backgroundColor: "#fde68a", strokeColor: "#92400e" },
  handoff: { shape: "rectangle", width: 240, height: 100, backgroundColor: "#ede9fe", strokeColor: "#6d28d9" },
  delay: { shape: "rectangle", width: 220, height: 90, backgroundColor: "#fee2e2", strokeColor: "#b91c1c" },
  output: { shape: "rectangle", width: 240, height: 100, backgroundColor: "#e0f2fe", strokeColor: "#0369a1" },
  exception: { shape: "rectangle", width: 240, height: 100, backgroundColor: "#ffe4e6", strokeColor: "#be123c" },
};

const ANNOTATION_COLORS = {
  pain_point: "#fecaca",
  benefit_note: "#dcfce7",
  control_note: "#dbeafe",
  risk_note: "#fee2e2",
  validation_note: "#fef3c7",
  exception_note: "#ffe4e6",
  open_question: "#f5f3ff",
};

const LANE_HEIGHT = 240;
const LANE_HEADER_HEIGHT = 48;
const STEP_SPACING = 320;
const START_X = 220;
const START_Y = 120;

async function main() {
  const [inputPath, outputPath] = process.argv.slice(2);

  if (!inputPath || !outputPath) {
    printUsage(1);
    return;
  }

  const spec = JSON.parse(await fs.readFile(path.resolve(inputPath), "utf8"));
  validateSpec(spec);

  const excalidrawDoc = buildExcalidraw(spec);
  await fs.writeFile(path.resolve(outputPath), `${JSON.stringify(excalidrawDoc, null, 2)}\n`, "utf8");

  console.log(`Generated ${outputPath}`);
}

function printUsage(exitCode) {
  console.log("Usage:");
  console.log("  node scripts/build-excalidraw.js <input-spec.json> <output.excalidraw.json>");
  process.exit(exitCode);
}

function validateSpec(spec) {
  if (!spec || typeof spec !== "object") {
    throw new Error("Input spec must be a JSON object.");
  }

  if (!spec.diagram_title || typeof spec.diagram_title !== "string") {
    throw new Error("Input spec must include diagram_title.");
  }

  if (!Array.isArray(spec.nodes) || spec.nodes.length === 0) {
    throw new Error("Input spec must include a non-empty nodes array.");
  }

  const nodeIds = new Set();
  for (const node of spec.nodes) {
    if (!node.id || !node.type || !node.label || !node.lane) {
      throw new Error("Each node must include id, type, label, and lane.");
    }
    if (!NODE_STYLES[node.type]) {
      throw new Error(`Unsupported node type: ${node.type}`);
    }
    if (nodeIds.has(node.id)) {
      throw new Error(`Duplicate node id: ${node.id}`);
    }
    nodeIds.add(node.id);
  }

  for (const edge of spec.edges || []) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      throw new Error(`Edge references unknown nodes: ${edge.from} -> ${edge.to}`);
    }
  }

  for (const annotation of spec.annotations || []) {
    if (!nodeIds.has(annotation.target)) {
      throw new Error(`Annotation references unknown node: ${annotation.target}`);
    }
  }
}

function buildExcalidraw(spec) {
  const elements = [];
  const timestamp = Date.now();
  const lanes = collectLanes(spec);
  const orderedNodes = [...spec.nodes].sort((a, b) => (a.step || 9999) - (b.step || 9999));
  const maxStepIndex = Math.max(...orderedNodes.map((_, index) => index), 0);
  const canvasWidth = START_X + (maxStepIndex + 1) * STEP_SPACING + 260;

  lanes.forEach((lane, index) => {
    const laneTop = START_Y + index * LANE_HEIGHT;
    elements.push(
      createShape({
        id: `lane_${lane.id}`,
        type: "rectangle",
        x: 40,
        y: laneTop - 32,
        width: canvasWidth,
        height: LANE_HEIGHT - 24,
        strokeColor: "#cbd5e1",
        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
        roundness: { type: 3 },
        seedKey: `lane:${lane.id}`,
        timestamp,
      }),
    );

    elements.push(
      createText({
        id: `lane_label_${lane.id}`,
        x: 60,
        y: laneTop - 18,
        text: lane.label,
        width: 220,
        height: LANE_HEADER_HEIGHT,
        fontSize: 28,
        color: "#0f172a",
        seedKey: `lane-label:${lane.id}`,
        timestamp,
      }),
    );
  });

  const nodePositions = new Map();

  orderedNodes.forEach((node, index) => {
    const laneIndex = lanes.findIndex((lane) => lane.id === node.lane);
    const nodeStyle = NODE_STYLES[node.type];
    const x = START_X + index * STEP_SPACING;
    const y = START_Y + laneIndex * LANE_HEIGHT + 56;
    const width = node.width || nodeStyle.width;
    const height = node.height || nodeStyle.height;
    const nodeElementId = `shape_${node.id}`;
    const textElementId = `text_${node.id}`;

    nodePositions.set(node.id, { x, y, width, height, elementId: nodeElementId });

    elements.push(
      createShape({
        id: nodeElementId,
        type: nodeStyle.shape,
        x,
        y,
        width,
        height,
        strokeColor: nodeStyle.strokeColor,
        backgroundColor: nodeStyle.backgroundColor,
        roundness: nodeStyle.shape === "rectangle" ? { type: 3 } : null,
        seedKey: `shape:${node.id}`,
        timestamp,
      }),
    );

    const body = buildNodeBody(node);
    elements.push(
      createText({
        id: textElementId,
        x: x + 16,
        y: y + 16,
        text: body,
        width: width - 32,
        height: height - 32,
        fontSize: 20,
        color: "#0f172a",
        textAlign: "center",
        verticalAlign: "middle",
        seedKey: `text:${node.id}`,
        timestamp,
      }),
    );
  });

  (spec.edges || []).forEach((edge) => {
    const from = nodePositions.get(edge.from);
    const to = nodePositions.get(edge.to);
    const startX = from.x + from.width;
    const startY = from.y + from.height / 2;
    const endX = to.x;
    const endY = to.y + to.height / 2;
    const arrowId = `edge_${edge.from}_${edge.to}`;

    elements.push(
      createArrow({
        id: arrowId,
        x: startX,
        y: startY,
        points: [
          [0, 0],
          [endX - startX, endY - startY],
        ],
        seedKey: `arrow:${edge.from}:${edge.to}`,
        timestamp,
      }),
    );

    if (edge.label) {
      const labelX = startX + (endX - startX) / 2 - 50;
      const labelY = startY + (endY - startY) / 2 - 28;
      elements.push(
        createText({
          id: `edge_label_${edge.from}_${edge.to}`,
          x: labelX,
          y: labelY,
          text: edge.label,
          width: 100,
          height: 28,
          fontSize: 18,
          color: "#334155",
          seedKey: `edge-label:${edge.from}:${edge.to}`,
          timestamp,
        }),
      );
    }
  });

  (spec.annotations || []).forEach((annotation, index) => {
    const target = nodePositions.get(annotation.target);
    const x = target.x + 12;
    const y = target.y - 84 - index * 6;
    const noteId = annotation.id || `annotation_${index + 1}`;

    elements.push(
      createShape({
        id: `note_${noteId}`,
        type: "rectangle",
        x,
        y,
        width: 220,
        height: 68,
        strokeColor: "#64748b",
        backgroundColor: ANNOTATION_COLORS[annotation.type] || "#f8fafc",
        roundness: { type: 3 },
        seedKey: `note:${noteId}`,
        timestamp,
      }),
    );

    elements.push(
      createText({
        id: `note_text_${noteId}`,
        x: x + 12,
        y: y + 10,
        text: annotation.label,
        width: 196,
        height: 48,
        fontSize: 16,
        color: "#0f172a",
        seedKey: `note-text:${noteId}`,
        timestamp,
      }),
    );
  });

  return {
    type: "excalidraw",
    version: 2,
    source: "https://github.com/AIGlobalTwins/Neuron",
    elements,
    appState: {
      viewBackgroundColor: "#ffffff",
      gridSize: null,
    },
    files: {},
  };
}

function collectLanes(spec) {
  const lanes = [];
  const laneMap = new Map();

  for (const lane of spec.lanes || []) {
    const normalized = { id: lane.id, label: lane.label || lane.id };
    lanes.push(normalized);
    laneMap.set(normalized.id, normalized);
  }

  for (const node of spec.nodes) {
    if (!laneMap.has(node.lane)) {
      const normalized = { id: node.lane, label: node.owner || node.lane };
      lanes.push(normalized);
      laneMap.set(normalized.id, normalized);
    }
  }

  return lanes;
}

function buildNodeBody(node) {
  const heading = node.step ? `${node.step}. ${node.label}` : node.label;
  const extraLines = [];

  if (node.owner) {
    extraLines.push(`Owner: ${node.owner}`);
  }
  if (node.system) {
    extraLines.push(`System: ${node.system}`);
  }
  if (node.details) {
    extraLines.push(node.details);
  }

  return [heading, ...extraLines].join("\n");
}

function createShape({
  id,
  type,
  x,
  y,
  width,
  height,
  strokeColor,
  backgroundColor,
  roundness,
  seedKey,
  timestamp,
}) {
  return {
    id,
    type,
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor,
    backgroundColor,
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness,
    seed: seedFrom(seedKey),
    version: 1,
    versionNonce: seedFrom(`${seedKey}:nonce`),
    isDeleted: false,
    boundElements: [],
    updated: timestamp,
    link: null,
    locked: false,
  };
}

function createText({
  id,
  x,
  y,
  text,
  width,
  height,
  fontSize,
  color,
  textAlign = "left",
  verticalAlign = "top",
  seedKey,
  timestamp,
}) {
  return {
    id,
    type: "text",
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: color,
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: seedFrom(seedKey),
    version: 1,
    versionNonce: seedFrom(`${seedKey}:nonce`),
    isDeleted: false,
    boundElements: [],
    updated: timestamp,
    link: null,
    locked: false,
    fontSize,
    fontFamily: 1,
    text,
    textAlign,
    verticalAlign,
    containerId: null,
    originalText: text,
    autoResize: false,
    lineHeight: 1.25,
    baseline: Math.round(fontSize * 0.8),
  };
}

function createArrow({ id, x, y, points, seedKey, timestamp }) {
  return {
    id,
    type: "arrow",
    x,
    y,
    width: Math.abs(points[1][0]),
    height: Math.abs(points[1][1]),
    angle: 0,
    strokeColor: "#475569",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: seedFrom(seedKey),
    version: 1,
    versionNonce: seedFrom(`${seedKey}:nonce`),
    isDeleted: false,
    boundElements: [],
    updated: timestamp,
    link: null,
    locked: false,
    points,
    lastCommittedPoint: points[points.length - 1],
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: "arrow",
    elbowed: false,
  };
}

function seedFrom(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash) + 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
