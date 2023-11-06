import { writable } from 'svelte/store';

export const accumulator = {}

export const removed = writable(new Set() as (Set<ID>))
export const updated = writable(new Set() as (Set<ID>))
export const created = writable(new Set() as (Set<ID>))