import { ONBOARDING_STARTER_CONTEXT_DOCUMENT_KEY } from "./constants.js";

export interface OnboardingStarterContext {
  key: typeof ONBOARDING_STARTER_CONTEXT_DOCUMENT_KEY;
  useCaseId: string;
  label: string;
  teamRoles: string[];
  optionalRefs: string[];
  approvalBoundary: string | null;
  fallbackBehavior: string;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);
}

function asOptionalString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function extractJsonBlock(body: string): string | null {
  const match = body.match(/```json\s*([\s\S]*?)\s*```/i);
  return match?.[1] ?? null;
}

export function parseOnboardingStarterContextDocument(body: string): OnboardingStarterContext | null {
  const jsonBlock = extractJsonBlock(body);
  if (!jsonBlock) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonBlock);
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== "object") return null;
  const record = parsed as Record<string, unknown>;
  const useCaseId = asOptionalString(record.useCaseId);
  const label = asOptionalString(record.label);
  const fallbackBehavior = asOptionalString(record.fallbackBehavior);
  if (!useCaseId || !label || !fallbackBehavior) return null;

  return {
    key: ONBOARDING_STARTER_CONTEXT_DOCUMENT_KEY,
    useCaseId,
    label,
    teamRoles: asStringArray(record.teamRoles),
    optionalRefs: asStringArray(record.optionalRefs),
    approvalBoundary: asOptionalString(record.approvalBoundary),
    fallbackBehavior,
  };
}
