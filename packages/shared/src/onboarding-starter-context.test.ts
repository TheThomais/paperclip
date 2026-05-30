import { describe, expect, it } from "vitest";
import {
  ONBOARDING_STARTER_CONTEXT_DOCUMENT_KEY,
  parseOnboardingStarterContextDocument,
} from "./index.js";

const articleStarterBody = [
  "# Starter context",
  "",
  "This document stores the selected onboarding starter so future context providers can enrich the issue without changing the operator-facing task copy.",
  "",
  "- Use case: Draft and review an HLT article",
  "- Use case id: draft-review-hlt-article",
  "- Team roles: Researcher, Writer, Media planner, Editor",
  "- Approval boundary: Stops before publishing to MasteryPublishing until a human approves.",
  "- Fallback behavior: Keep drafting locally if extra context is unavailable.",
  "",
  "```json",
  JSON.stringify(
    {
      useCaseId: "draft-review-hlt-article",
      label: "Draft and review an HLT article",
      teamRoles: ["Researcher", "Writer", "Media planner", "Editor"],
      optionalRefs: ["playbook:make-article", "schema:article_v2"],
      approvalBoundary: "Stops before publishing to MasteryPublishing until a human approves.",
      fallbackBehavior: "Keep drafting locally if extra context is unavailable.",
    },
    null,
    2,
  ),
  "```",
].join("\n");

describe("parseOnboardingStarterContextDocument", () => {
  it("extracts normalized article starter metadata from the hidden system document", () => {
    expect(parseOnboardingStarterContextDocument(articleStarterBody)).toEqual({
      key: ONBOARDING_STARTER_CONTEXT_DOCUMENT_KEY,
      useCaseId: "draft-review-hlt-article",
      label: "Draft and review an HLT article",
      teamRoles: ["Researcher", "Writer", "Media planner", "Editor"],
      optionalRefs: ["playbook:make-article", "schema:article_v2"],
      approvalBoundary: "Stops before publishing to MasteryPublishing until a human approves.",
      fallbackBehavior: "Keep drafting locally if extra context is unavailable.",
    });
  });

  it("returns null when the body does not contain valid starter metadata", () => {
    expect(parseOnboardingStarterContextDocument("# Starter context\n\nNo JSON block yet.")).toBeNull();
    expect(parseOnboardingStarterContextDocument("```json\n{ bad json\n```")).toBeNull();
  });
});