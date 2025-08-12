export interface IAIProvider {
  name: string;
  generate(params: Record<string, unknown>): Promise<unknown>;
}
