import { cn } from "@/lib/utils"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center rounded-[var(--primitive-radius-12)] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-[var(--color-ring)] focus-visible:ring-3 focus-visible:ring-[var(--color-ring)]/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[var(--color-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--color-error)]/20 dark:aria-invalid:border-[var(--color-error)]/50 dark:aria-invalid:ring-[var(--color-error)]/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: `bg-primary text-foreground-inverse font-bold
					hover:bg-primary-hover`,
				outline: `border-primary bg-primary-subtle text-primary
					hover:bg-secondary-hover hover:text-primary-hover
					dark:border-border-primary dark:bg-transparent dark:text-foreground-primary dark:hover:bg-white/10 dark:hover:text-foreground-primary`,
				secondary: `bg-secondary text-secondary-foreground 
					hover:bg-secondary-hover`,
				ghost: `text-foreground hover:bg-surface-hover
				 hover:text-primary`,
				destructive: `bg-error text-foreground-inverse 
				hover:text-error-foreground 
					  dark:bg-error-foreground dark:hover:bg-error`,
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default:
					"h-8 gap-1.5 px-2.5 rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				xs: "h-6 gap-1 rounded-sm px-2 text-xs in-data-[slot=button-group]:rounded-[var(--primitive-radius-12)] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-7 gap-1 rounded-lg px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-[var(--primitive-radius-12)] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-9 gap-1.5 rounded-xl  px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				icon: "size-8",
				"icon-xs":
					"size-6 rounded-[min(var(--primitive-radius-8),0.625rem)] in-data-[slot=button-group]:rounded-[var(--primitive-radius-12)] [&_svg:not([class*='size-'])]:size-3",
				"icon-sm":
					"size-7 rounded-[min(var(--primitive-radius-8),0.75rem)] in-data-[slot=button-group]:rounded-[var(--primitive-radius-12)]",
				"icon-lg": "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
