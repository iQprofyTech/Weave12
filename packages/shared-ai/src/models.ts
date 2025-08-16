import { ModelOption, TaskType } from './types';

export const MODEL_REGISTRY: ModelOption[] = [
  { id: 'gpt-4o-mini', label: 'GPT‑4o Mini', provider: 'openai', task: 'text', tags: ['chat','fast'], default: true },
  { id: 'gpt-4o', label: 'GPT‑4o', provider: 'openai', task: 'text', tags: ['chat','quality'] },
  { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'anthropic', task: 'text', tags: ['chat','quality'] },
  { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', provider: 'google', task: 'text', tags: ['chat','reasoning'] },
  { id: 'sdxl', label: 'Stable Diffusion XL', provider: 'stability', task: 'image', tags: ['image','quality'], default: true },
  { id: 'sdxl-turbo', label: 'SDXL Turbo', provider: 'stability', task: 'image', tags: ['image','fast'] },
  { id: 'flux-schnell', label: 'Flux Schnell', provider: 'black-forest-labs', task: 'image', tags: ['image','fast'] },
  { id: 'flux-pro', label: 'Flux Pro', provider: 'black-forest-labs', task: 'image', tags: ['image','quality'] },
  { id: 'stable-video-diffusion', label: 'Stable Video Diffusion', provider: 'stability', task: 'video', tags: ['video','quality'], default: true },
  { id: 'minimax-video', label: 'MiniMax Video', provider: 'minimax', task: 'video', tags: ['video'] },
  { id: 'veo-sora', label: 'Veo/Sora', provider: 'google-openai', task: 'video', tags: ['video','high-end'] }
];

export const MODELS_BY_TASK: Record<TaskType, ModelOption[]> = {
  text: MODEL_REGISTRY.filter(m => m.task === 'text'),
  image: MODEL_REGISTRY.filter(m => m.task === 'image'),
  video: MODEL_REGISTRY.filter(m => m.task === 'video'),
  audio: MODEL_REGISTRY.filter(m => m.task === 'audio'),
};

export const DEFAULT_MODEL: Record<TaskType, string | undefined> = Object.fromEntries(
  (['text','image','video','audio'] as TaskType[]).map(t => [t, MODELS_BY_TASK[t].find(m => m.default)?.id])
) as any;

export const MODELS = MODEL_REGISTRY.map(m => ({ ...m, modality: m.task }));
import type { ModelOption, TaskType } from './types';

/**
 * Единый реестр моделей.
 * Добавлены Veo, Sora, Imagen 4 (3 профиля), Flux, SDXL/SD3.5, Runway Frames,
 * Pika, Luma, Kling, Seedance, Suno, Gemini TTS, OpenAI TTS,
 * Arrexel/pattern-diffusion (T2I), MARS7 (TTS).
 */
export const MODEL_REGISTRY: ModelOption[] = [
  // TEXT
  { id: 'openai:gpt-4o-mini', label: 'GPT-4o mini', provider: 'OpenAI', task: 'text' },
  { id: 'openai:gpt-4.1', label: 'GPT-4.1', provider: 'OpenAI', task: 'text' },
  { id: 'anthropic:claude-3.7', label: 'Claude 3.7', provider: 'Anthropic', task: 'text' },
  { id: 'deepseek:deepseek-v3', label: 'DeepSeek V3', provider: 'DeepSeek', task: 'text' },
  { id: 'perplexity:sonar-large', label: 'Perplexity Sonar Large', provider: 'Perplexity', task: 'text' },
  { id: 'xai:grok-2', label: 'Grok-2', provider: 'xAI', task: 'text' },
  { id: 'google:gemini-1.5-pro', label: 'Gemini 1.5 Pro', provider: 'Google', task: 'text' },

  // IMAGE
  { id: 'google:imagen-4-ultra', label: 'Imagen 4 Ultra', provider: 'Google', task: 'image' },
  { id: 'google:imagen-4', label: 'Imagen 4', provider: 'Google', task: 'image' },
  { id: 'google:imagen-4-fast', label: 'Imagen 4 Fast', provider: 'Google', task: 'image' },
  { id: 'bfl:flux-1-dev', label: 'Flux.1-dev', provider: 'Black Forest Labs', task: 'image' },
  { id: 'bfl:flux-1-schnell', label: 'Flux.1-schnell', provider: 'Black Forest Labs', task: 'image' },
  { id: 'sd:sdxl', label: 'Stable Diffusion XL', provider: 'Stability', task: 'image' },
  { id: 'sd:sd3.5', label: 'Stable Diffusion 3.5', provider: 'Stability', task: 'image' },
  { id: 'modelscope:arrexel-pattern-diffusion', label: 'Arrexel / pattern-diffusion', provider: 'ModelScope', task: 'image' },

  // VIDEO
  { id: 'google:veo-2', label: 'Veo 2', provider: 'Google', task: 'video' },
  { id: 'openai:sora-1', label: 'Sora 1', provider: 'OpenAI', task: 'video' },
  { id: 'runway:gen3-frames', label: 'Runway Gen-3 Frames', provider: 'Runway', task: 'video' },
  { id: 'pika:pika-1.5', label: 'Pika 1.5', provider: 'Pika', task: 'video' },
  { id: 'luma:ray', label: 'Luma Ray', provider: 'Luma', task: 'video' },
  { id: 'kling:kling-v1', label: 'Kling v1', provider: 'Kuaishou', task: 'video' },
  { id: 'seedance:seedance-v1', label: 'Seedance v1', provider: 'Seedance', task: 'video' },
  { id: 'minimax:hailuo-video', label: 'Hailuo Video', provider: 'MiniMax', task: 'video' },

  // AUDIO
  { id: 'suno:v3.5', label: 'Suno v3.5', provider: 'Suno', task: 'audio' },
  { id: 'google:gemini-audio', label: 'Gemini TTS', provider: 'Google', task: 'audio' },
  { id: 'openai:tts-1', label: 'OpenAI TTS-1', provider: 'OpenAI', task: 'audio' },
  { id: 'mars7:tts', label: 'MARS7 (TTS)', provider: 'MARS7', task: 'audio' }
];

export const MODELS_BY_TASK: Record<TaskType, ModelOption[]> = {
  text: MODEL_REGISTRY.filter(m => m.task === 'text'),
  image: MODEL_REGISTRY.filter(m => m.task === 'image'),
  video: MODEL_REGISTRY.filter(m => m.task === 'video'),
  audio: MODEL_REGISTRY.filter(m => m.task === 'audio')
};

export const DEFAULT_MODEL: Record<TaskType, string> = {
  text: 'openai:gpt-4o-mini',
  image: 'bfl:flux-1-dev',
  video: 'google:veo-2',
  audio: 'suno:v3.5'
};

// Backward compatibility export
export const MODELS = MODEL_REGISTRY;
