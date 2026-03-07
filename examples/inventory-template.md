# Neuron Capability Inventory Template

Use this template to give Neuron a real inventory of what is available now, what is missing, and which fallbacks are acceptable.

## Inventory notes
- Workspace or repository:
- Date:
- Environment type: Claude Code / Desktop / mixed
- Confidence level of this inventory: high / medium / low

## AVAILABLE_NOW

### Agents
- Name:
- Purpose:
- Inputs accepted:
- Outputs produced:
- Use when:
- Avoid when:
- Dependencies:

### Skills
- Name:
- Purpose:
- Inputs accepted:
- Outputs produced:
- Use when:
- Avoid when:
- Dependencies:

### Plugins
- Name:
- Purpose:
- Commands included:
- Agents included:
- MCP servers included:
- Use when:
- Avoid when:

### Commands
- Name:
- Purpose:
- Arguments:
- Typical sequence:

### MCP tools / servers
- Name:
- Purpose:
- Input/output shape:
- Best for:
- Constraints / risks:

### Connectors / integrations
- Name:
- System connected:
- Purpose:
- Inputs:
- Outputs:
- Constraints / risks:

### Hooks or automations
- Name:
- Trigger:
- Action:
- Constraints:

## RECOMMENDED_TO_ADD

List capabilities that are not installed yet but would materially improve the work.

- Name:
- Category:
- Why it helps:
- What gap it closes:
- Cost / complexity:
- Priority: critical / recommended / optional

## FALLBACK_OUTPUTS

List outputs Neuron can still generate when ideal capabilities are missing.

- Need:
- Missing capability:
- Fallback output Neuron can generate now:
- Format: markdown / mermaid / json / csv / brief / checklist / other
- Main limitation:

## Example routing entry

- Need: AS-IS diagram
- AVAILABLE_NOW: none confirmed
- RECOMMENDED_TO_ADD: Excalidraw connector
- FALLBACK_OUTPUT: Mermaid flowchart plus JSON diagram specification
