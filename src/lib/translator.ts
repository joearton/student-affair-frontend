// src/lib/utils.ts
import { get } from "svelte/store";
import { _ } from "svelte-i18n"; 

export function translate(key: string, params: Record<string, any> = {}) {
  return get(_)(key, params);
}
