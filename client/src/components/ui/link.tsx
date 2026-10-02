import * as React from "react";
import { Link as NextLink } from "react-router";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

type LinkProps = React.ComponentProps<typeof NextLink> & {
	variant?: VariantProps<typeof buttonVariants>["variant"];
	size?: VariantProps<typeof buttonVariants>["size"];
	className?: string;
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ className, variant = "default", size = "default", ...props }, ref) => (
		<NextLink
			ref={ref}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	),
);
Link.displayName = "Link";

export { Link };
export type { LinkProps };
