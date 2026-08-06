import type { ReactNode } from "react";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}
