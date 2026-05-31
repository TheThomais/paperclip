import { describe, expect, it } from "vitest";
import { loadDefaultAgentInstructionsBundle } from "../services/default-agent-instructions.js";

describe("default agent instructions", () => {
  it("requires content deliverables to be saved as readable issue documents", async () => {
    const bundle = await loadDefaultAgentInstructionsBundle("default");
    const agentsMd = bundle["AGENTS.md"] ?? "";

    expect(agentsMd).toContain("save the actual readable deliverable as an issue document");
    expect(agentsMd).toContain("A registry ref, run summary, or comment saying the work exists is not enough");
    expect(agentsMd).toContain("Humans must be able to open the artifact from Paperclip before approving");
  });

  it("requires CEO handoffs to demand readable deliverables before approval", async () => {
    const bundle = await loadDefaultAgentInstructionsBundle("ceo");
    const agentsMd = bundle["AGENTS.md"] ?? "";

    expect(agentsMd).toContain("save the actual readable deliverable as an issue document");
    expect(agentsMd).toContain("Registry refs or status comments are not enough");
    expect(agentsMd).toContain("the board must be able to open the artifact from Paperclip");
  });
});
