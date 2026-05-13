import type { AdapterExecutionContext, AdapterExecutionResult } from "../types.js";
import { asString, asNumber, parseObject } from "../utils.js";

export async function execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult> {
  const { config, runId, agent, context } = ctx;
  const url = asString(config.url, "");
  if (!url) throw new Error("HTTP adapter missing url");

  const method = asString(config.method, "POST");
  const timeoutMs = asNumber(config.timeoutMs, 0);
  const headers = parseObject(config.headers) as Record<string, string>;
  const payloadTemplate = parseObject(config.payloadTemplate);
  const body = { ...payloadTemplate, agentId: agent.id, runId, context };

  const controller = new AbortController();
  const timer = timeoutMs > 0 ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
      ...(timer ? { signal: controller.signal } : {}),
    });

    const contentType = res.headers.get("content-type") ?? "";
    const responseText = await res.text();
    let responseJson: Record<string, unknown> | null = null;
    if (contentType.includes("application/json") && responseText.trim()) {
      const parsed = JSON.parse(responseText) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        responseJson = parsed as Record<string, unknown>;
      }
    }

    if (!res.ok) {
      const detail = responseJson?.error ?? responseJson?.message ?? responseText.slice(0, 300);
      throw new Error(`HTTP invoke failed with status ${res.status}${detail ? `: ${String(detail)}` : ""}`);
    }

    const remoteSummary =
      typeof responseJson?.summary === "string" && responseJson.summary.trim().length > 0
        ? responseJson.summary.trim()
        : null;

    return {
      exitCode: 0,
      signal: null,
      timedOut: false,
      summary: remoteSummary ?? `HTTP ${method} ${url}`,
      resultJson: responseJson ?? (responseText ? { responseText } : null),
    };
  } catch (err) {
    if (timer && err instanceof Error && err.name === "AbortError") {
      return {
        exitCode: null,
        signal: null,
        timedOut: true,
        errorMessage: `HTTP ${method} ${url} timed out after ${timeoutMs}ms`,
        errorCode: "timeout",
      };
    }
    throw err;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
