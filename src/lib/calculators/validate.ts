import { parseList, parseNumber } from "./parse";

export type NumSpec = {
  label: string;
  min?: number;
  max?: number;
  /** strictly greater than */
  gt?: number;
  integer?: boolean;
  optional?: boolean;
};

export type Values = Record<string, string>;

/** Read and validate one numeric field, recording a message on failure. */
export function readNum(values: Values, id: string, spec: NumSpec, errors: Record<string, string>): number | null {
  const raw = (values[id] ?? "").trim();
  if (raw === "") {
    if (!spec.optional) errors[id] = `Enter a value for “${spec.label}”.`;
    return null;
  }
  const n = parseNumber(raw);
  if (n === null) {
    errors[id] = `“${raw}” is not a valid number.`;
    return null;
  }
  if (spec.integer && !Number.isInteger(n)) {
    errors[id] = `${spec.label} must be a whole number.`;
    return null;
  }
  if (spec.gt !== undefined && !(n > spec.gt)) {
    errors[id] = `${spec.label} must be greater than ${spec.gt}.`;
    return null;
  }
  if (spec.min !== undefined && n < spec.min) {
    errors[id] = `${spec.label} must be at least ${spec.min}.`;
    return null;
  }
  if (spec.max !== undefined && n > spec.max) {
    errors[id] = `${spec.label} must be at most ${spec.max}.`;
    return null;
  }
  return n;
}

export const hasErrors = (e: Record<string, string>) => Object.keys(e).length > 0;


/** Read a list of numbers from a text field. */
export function readList(
  values: Values,
  id: string,
  label: string,
  errors: Record<string, string>,
  opts: { min?: number; max?: number } = {},
): number[] | null {
  const raw = values[id] ?? "";
  const { values: nums, invalid } = parseList(raw);
  const min = opts.min ?? 1;
  const max = opts.max ?? 10000;
  if (invalid.length > 0) {
    errors[id] = `“${invalid[0]}” is not a valid number. ${label} must be numbers separated by commas, spaces or new lines.`;
    return null;
  }
  if (nums.length < min) {
    errors[id] = min === 1 ? `Enter at least one number in ${label}.` : `Enter at least ${min} numbers in ${label}.`;
    return null;
  }
  if (nums.length > max) {
    errors[id] = `${label} can hold up to ${max.toLocaleString("en-US")} numbers.`;
    return null;
  }
  return nums;
}
