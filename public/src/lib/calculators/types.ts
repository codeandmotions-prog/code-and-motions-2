import type { ReactNode } from "react";

/** Shared result shape rendered by the calculator form components. */
export type ResultStat = { label: string; value: string; hint?: string };
export type ResultTable = {
  title?: string;
  columns: string[];
  rows: string[][];
  caption?: string;
};

export type CalcOk = {
  ok: true;
  /** Optional diagram shown above the numbers. */
  figure?: ReactNode;
  /** Large, prominent primary result. */
  headline?: { label: string; value: string; sub?: string };
  stats?: ResultStat[];
  tables?: ResultTable[];
  /** Plain-text working shown as an ordered list. */
  steps?: string[];
  notes?: string[];
  warnings?: string[];
  /** Monospace block for very long output (big numbers, matrices as text). */
  block?: { label: string; text: string };
};

export type CalcFail = {
  ok: false;
  /** Field id -> message. */
  errors: Record<string, string>;
  message?: string;
};

export type CalcOutcome = CalcOk | CalcFail;

export const fail = (errors: Record<string, string>, message?: string): CalcFail => ({
  ok: false,
  errors,
  message,
});
