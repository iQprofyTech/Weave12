export type TaskType = 'text' | 'image' | 'video' | 'audio';

export interface ModelOption {
  id: string;
  label: string;
  provider: string;
  task: TaskType;
  tags?: string[];
  context?: number;
  resolution?: string;
  mode?: 'fast' | 'quality' | 'balanced';
  default?: boolean;
}

export type Modality = TaskType; // backward alias
export interface BaseModelInfo extends ModelOption { modality: TaskType; }
export type TaskType = 'text' | 'image' | 'video' | 'audio';

export type ModelId = string;

export type ModelOption = {
  id: ModelId;
  label: string; // Человекочитаемое имя модели
  provider: string; // Провайдер (openai, sdxl, flux, runway, suno и т.д.)
  task: TaskType; // Тип задачи (модальность)
  notes?: string; // Доп. пометки / ограничения
};

// Backward compatibility aliases (если где-то ещё используются старые названия)
export type Modality = TaskType;
export interface BaseModelInfo extends ModelOption { label: string; task: TaskType; }
