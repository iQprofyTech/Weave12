import { MODEL_REGISTRY, MODELS_BY_TASK } from './models';
import type { TaskType, ModelOption } from './types';

export function listModels(task?: TaskType): ModelOption[] { return task ? MODELS_BY_TASK[task] : MODEL_REGISTRY; }
export function getModel(id: string) { return MODEL_REGISTRY.find(m => m.id === id); }

export interface FilterParams { task?: TaskType; include?: string[]; exclude?: string[]; providers?: string[]; tagsAny?: string[]; }
export function filterModels(p: FilterParams) {
  return MODEL_REGISTRY.filter(m => {
    if (p.task && m.task !== p.task) return false;
    if (p.include && !p.include.includes(m.id)) return false;
    if (p.exclude && p.exclude.includes(m.id)) return false;
    if (p.providers && !p.providers.includes(m.provider)) return false;
    if (p.tagsAny && !m.tags?.some(t => p.tagsAny!.includes(t))) return false;
    return true;
  });
}
export function groupByTask() { return MODELS_BY_TASK; }
import { MODELS } from './models';
import { ModelOption, TaskType } from './types';

export function listModels(task?: TaskType): ModelOption[] {
  return task ? MODELS.filter(m => m.task === task) : MODELS;
}

export function getModel(id: string): ModelOption | undefined {
  return MODELS.find(m => m.id === id);
}

export function groupByTask(): Record<TaskType, ModelOption[]> {
  return MODELS.reduce((acc, m) => {
    (acc[m.task] ||= []).push(m);
    return acc;
  }, {} as Record<TaskType, ModelOption[]>);
}
