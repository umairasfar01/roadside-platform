import type { ComponentType, ReactNode } from "react";
import type { WithChildren } from "@/types";

type ProviderComponent = ComponentType<WithChildren>;

export function composeProviders(...providers: ProviderComponent[]) {
  return function ComposedProviders({ children }: WithChildren): ReactNode {
    return providers.reduceRight<ReactNode>(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children,
    );
  };
}
