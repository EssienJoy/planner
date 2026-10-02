import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Sheet(props: ComponentProps<typeof Dialog.Root>) {
	return <Dialog.Root {...props} />
}

function SheetTrigger({
	className,
	...props
}: ComponentProps<typeof Dialog.Trigger>) {
	return <Dialog.Trigger className={className} {...props} />
}

function SheetContent({
	className,
	children,
	...props
}: ComponentProps<typeof Dialog.Popup>) {
	return (
		<Dialog.Portal>
			<Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
			<Dialog.Popup
				className={cn(
					"fixed right-0 top-0 z-[70] flex h-full w-80 max-w-[85vw] flex-col bg-surface p-6 shadow-2xl transition-transform duration-300 ease-out data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
					className,
				)}
				{...props}>
				<Dialog.Title className="sr-only">Menu</Dialog.Title>
				<Dialog.Close
					aria-label="Close menu"
					className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-surface-hover hover:text-foreground">
					<X className="size-4" />
				</Dialog.Close>
				{children}
			</Dialog.Popup>
		</Dialog.Portal>
	)
}

export { Sheet, SheetContent, SheetTrigger }
