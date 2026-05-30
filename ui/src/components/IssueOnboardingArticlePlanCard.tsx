import type { OnboardingStarterContext } from "@paperclipai/shared";

function isArticleCreationStarter(context: OnboardingStarterContext) {
  return context.useCaseId === "draft-review-hlt-article";
}

function isHumanSafeLabel(value: string) {
  return value.trim().length > 0 && !/[a-z][a-z0-9_-]*:[a-z0-9_.-]+/i.test(value);
}

function humanApprovalBoundary(value: string | null) {
  if (!value || !isHumanSafeLabel(value)) return "Stops before publishing until a human approves.";
  return value;
}

export function IssueOnboardingArticlePlanCard({
  starterContext,
}: {
  starterContext: OnboardingStarterContext | null | undefined;
}) {
  if (!starterContext || !isArticleCreationStarter(starterContext)) return null;

  const teamRoles = starterContext.teamRoles.filter(isHumanSafeLabel);
  const visibleTeamRoles = teamRoles.length > 0
    ? teamRoles
    : ["Researcher", "Writer", "Media planner", "Editor"];

  return (
    <section className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm shadow-none">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">Article Creation</p>
        <h3 className="text-base font-semibold text-foreground">Article creation plan</h3>
        <p className="text-sm text-muted-foreground">
          Turn this starter into a useful student-facing article workflow without exposing the internal plumbing.
        </p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-background/80 p-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">What will happen</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground">
            <li>Find a student-valuable topic</li>
            <li>Draft and review the article</li>
            <li>Add useful media ideas</li>
            <li>Prepare edits for the human review surface</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-background/80 p-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Team</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {visibleTeamRoles.map((role) => (
              <span key={role} className="rounded-full border border-border bg-muted/40 px-2 py-1 text-xs text-foreground">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-border bg-background/80 p-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Approval boundary</h4>
        <p className="mt-1 text-sm text-foreground">
          {humanApprovalBoundary(starterContext.approvalBoundary)}
        </p>
      </div>
    </section>
  );
}
