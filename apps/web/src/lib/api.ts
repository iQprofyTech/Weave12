// Simple API client utilities for the web app
export interface GenerateResponse { jobId: string; status: string; model: string; }
export interface JobStatusResponse { id: string; state: string; returnvalue?: any; failedReason?: string; }

const API_BASE = (import.meta as any).env?.VITE_API_BASE || '/api';

export async function generate(params: {
  model: string;
  prompt: string;
  canvasId: string;
  nodeId: string;
}): Promise<GenerateResponse> {
  const res = await fetch(`${API_BASE}/ai/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: params.model,
      prompt: params.prompt,
      canvasId: params.canvasId,
      target: { nodeId: params.nodeId },
      mode: 'single',
    }),
  });
  if (!res.ok) throw new Error(`Generate failed: ${res.status}`);
  return res.json();
}

export async function fetchJob(id: string): Promise<JobStatusResponse> {
  const res = await fetch(`${API_BASE}/jobs/${id}`);
  if (!res.ok) throw new Error('Job not found');
  return res.json();
}

export async function pollJob(id: string, opts: { intervalMs?: number; timeoutMs?: number } = {}) {
  const interval = opts.intervalMs ?? 1500;
  const timeout = opts.timeoutMs ?? 60_000;
  const start = Date.now();
  while (true) {
    const status = await fetchJob(id);
    if (status.state === 'completed' || status.state === 'failed') return status;
    if (Date.now() - start > timeout) throw new Error('Job polling timeout');
    await new Promise(r => setTimeout(r, interval));
  }
}
