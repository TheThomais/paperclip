---
title: HTTP Adapter
summary: Call remote agent bridges and webhook-style agent runtimes
---

The `http` adapter sends one JSON request to a remote agent endpoint and records the endpoint response as the Paperclip run result. It is the right adapter for durable agent bridges such as Thomas/Hermes when the agent runtime lives outside the Paperclip server process.

## When to Use

- The agent runs as an external service, VPS daemon, cloud function, or bridge endpoint.
- Paperclip should trigger the run and capture a concise response payload.
- The remote service owns long-running execution, logs, billing controls, and writeback.

## When Not to Use

- If the agent runs locally on the same machine, prefer the matching local adapter (`claude_local`, `codex_local`, `hermes_local`, `process`).
- If you need true token-by-token stdout viewing from the child process. The HTTP adapter captures the final HTTP response; streaming bridges should keep a JSON/complete mode for Paperclip until a stream-aware adapter is used.
- If the endpoint cannot return within the configured `timeoutMs`.

## Configuration

- `url`: required webhook URL.
- `method`: HTTP method. Defaults to `POST`.
- `timeoutMs`: request timeout in milliseconds. Defaults to `15000`; maximum is `900000`.
- `headers`: JSON object of string headers. Sensitive headers must use `${env:NAME}` templates.
- `env`: JSON object of env bindings resolved by the server at execution time.
- `payloadTemplate`: JSON object merged into the request body before Paperclip adds standard run fields.

## Secret-safe headers

Do not paste bridge tokens directly into adapter config. Put the token in an env binding / secret reference and reference it from headers:

```json
{
  "X-Bridge-Token": "${env:BRIDGE_TOKEN}",
  "Content-Type": "application/json"
}
```

`Authorization`, cookies, common API-token headers, and `X-Bridge-Token` are treated as sensitive. `Authorization` may use `Bearer ${env:NAME}`; `X-Bridge-Token` must be exactly `${env:NAME}` because Thomas-style bridges expect the raw token value.

## Request Body

The adapter sends:

```json
{
  "...payloadTemplate": "values",
  "agentId": "agent-id",
  "runId": "run-id",
  "context": {
    "taskId": "...",
    "wakeReason": "...",
    "commentId": "..."
  }
}
```

The remote endpoint should return JSON when possible:

```json
{
  "ok": true,
  "run_id": "run-id",
  "summary": "Operator-facing run summary",
  "result": {
    "propose_status": "done"
  }
}
```

If the response has a top-level `summary`, Paperclip uses it as the run summary and stores the full JSON as `resultJson`.

## Thomas/Hermes bridge profile

For Thomas's Hermes bridge, use the bridge endpoint's `/v1/runs` URL, `POST`, a long enough `timeoutMs` for agent work, and a payload template like:

```json
{
  "profile": "thomas",
  "timeoutSec": 420
}
```

Keep `stream` unset or `false` for Paperclip HTTP runs. The Thomas bridge can expose opt-in SSE for direct probes, but the current Paperclip HTTP adapter is a complete-response contract, not an SSE relay.
