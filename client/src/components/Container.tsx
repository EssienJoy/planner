import React from "react"
import { cn } from "@/lib/utils"

function Container({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<section className={cn(`max-w-7xl mx-auto px-4`, className)}>
			{children}
		</section>
	)
}

export default Container
