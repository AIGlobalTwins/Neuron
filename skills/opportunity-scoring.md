# Opportunity Scoring

## Purpose
Score each identified opportunity in a consistent way so Neuron can prioritize what to do now, what to plan next, and what to leave for later.

## Use when
- an agent identifies operational problems or improvement opportunities
- a shortlist of opportunities needs ordering
- the CEO agent needs comparable signals across departments

## Dimensions

### impact: low / medium / high
Evaluate the likely business value if the opportunity is addressed.

- `low`: small local improvement, limited downstream effect, or weak measurable value
- `medium`: meaningful improvement for one team or workflow, but not company-shaping
- `high`: material effect on revenue, margin, service quality, speed, visibility, or cross-functional execution

Use these signals:
- amount of wasted effort removed
- reduction in delay or rework
- effect on customer or internal delivery quality
- number of teams affected
- risk or error reduction

### complexity: low / medium / high
Evaluate the implementation effort and coordination required.

- `low`: can be implemented with limited coordination, simple process change, or light automation
- `medium`: needs moderate workflow redesign, stakeholder alignment, or system changes
- `high`: needs major process redesign, multiple dependencies, complex integrations, or heavy change management

Use these signals:
- number of teams involved
- system or integration effort
- process ambiguity
- policy or approval burden
- change-management effort

### urgency: low / medium / high
Evaluate how quickly the opportunity should be acted on.

- `low`: can wait without meaningful operational damage
- `medium`: should be addressed soon to avoid ongoing friction
- `high`: current pain is already costly, risky, or blocking execution

Use these signals:
- current operational pain
- escalation frequency
- delay or backlog severity
- compliance or trust exposure
- dependency on a fragile workaround or one person

## Decision guidance

- `fazer ja`: usually high impact with low or medium complexity, or high urgency
- `planear a seguir`: meaningful impact but needs more coordination, sequencing, or design
- `deixar para depois`: lower urgency, lower impact, or not yet ready because dependencies are unresolved

## Guardrails

- do not inflate scores to make work sound more important
- score based on current evidence, not aspiration
- if evidence is weak, stay conservative
- keep scoring comparable across departments
