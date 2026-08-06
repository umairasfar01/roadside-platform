import type { ComponentPropsWithoutRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  loading?: boolean;
}

/** Button that shows a spinner and disables itself while `loading`. */
export function LoadingButton({
  loading = false,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={loading || disabled} aria-busy={loading} {...props}>
      {loading ? <Loader2 className="animate-spin" /> : null}
      {children}
    </Button>
  );
}
