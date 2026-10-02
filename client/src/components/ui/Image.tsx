import { cn } from "@/lib/utils"

function Image({
	src,
	alt,
	className,
}: {
	src: string
	alt: string
	className?: string
}) {
	return (
		<img
			src={src}
			alt={alt}
			className={cn(
				`object-cover w-10 h-10
				 rounded-full profile-shaadow`,
				className,
			)}
		/>
	)
}

export default Image
