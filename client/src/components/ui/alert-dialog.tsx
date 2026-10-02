import { Dialog } from "@base-ui/react/dialog"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function AlertDialog(props: ComponentProps<typeof Dialog.Root>) {
	return <Dialog.Root {...props} />
}

function AlertDialogContent({
	className,
	...props
}: ComponentProps<typeof Dialog.Popup>) {
	return (
		<Dialog.Portal>
			<Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
			<Dialog.Popup
				role="alertdialog"
				className={cn(
					"fixed left-1/2 top-1/2 z-51 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-6 text-foreground shadow-2xl outline-none transition-all duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
					className,
				)}
				{...props}
			/>
		</Dialog.Portal>
	)
}

function AlertDialogHeader({ className, ...props }: ComponentProps<"div">) {
	return <div className={cn("space-y-2", className)} {...props} />
}

function AlertDialogTitle({
	className,
	...props
}: ComponentProps<typeof Dialog.Title>) {
	return (
		<Dialog.Title
			className={cn("text-lg font-bold tracking-tight", className)}
			{...props}
		/>
	)
}

function AlertDialogDescription({
	className,
	...props
}: ComponentProps<typeof Dialog.Description>) {
	return (
		<Dialog.Description
			className={cn("text-sm leading-6 text-foreground-muted", className)}
			{...props}
		/>
	)
}

function AlertDialogFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn("mt-6 flex justify-end gap-3", className)}
			{...props}
		/>
	)
}

export {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
}
