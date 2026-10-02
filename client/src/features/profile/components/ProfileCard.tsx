import { CalendarDays, Mail, Pencil } from "lucide-react"

import { Link } from "@/components"
import Container from "@/components/ui/Container"

type ProfileUser = {
	fullName?: string
	email?: string
	photo?: string
	createdAt?: string
}

function formatJoined(value) {
	if (!value) return ""
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return ""
	return date.toLocaleDateString(undefined, {
		month: "long",
		year: "numeric",
	})
}

function ProfileCard({
	user,
	isLoading,
}: {
	user?: ProfileUser | null
	isLoading: boolean
}) {
	if (isLoading) {
		return (
			<div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
				<div className="h-32 animate-pulse bg-surface-muted" />
				<div className="space-y-3 px-6 pb-6 sm:px-8">
					<div className="-mt-12 size-24 animate-pulse rounded-full bg-surface-muted" />
					<div className="h-6 w-48 animate-pulse rounded-md bg-surface-muted" />
					<div className="h-4 w-64 animate-pulse rounded-md bg-surface-muted" />
				</div>
			</div>
		)
	}

	const joined = formatJoined(user?.createdAt)

	return (
		<section
			className="overflow-hidden w-3xl mx-auto rounded-3xl 
		border border-border bg-surface shadow-sm">
			<div className="h-32 bg-linear-to-r from-primary to-accent" />

			<div className="px-6 pb-6 sm:px-8">
				<div className="-mt-12 mb-4 size-24 overflow-hidden rounded-full border-4 border-surface bg-primary-subtle">
					<img
						src={user?.photo || "/img/png/default.jpg"}
						alt={`${user?.fullName ?? "User"} profile photo`}
						className="h-full  w-full object-cover"
					/>
				</div>

				<h2
					className="text-2xl font-extrabold 
				capitalize tracking-tight text-foreground">
					{user?.fullName ?? "Planner"}
				</h2>
				<p className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground-muted">
					<Mail className="size-4" />
					{user?.email}
				</p>
				{joined && (
					<p className="mt-1.5 flex items-center gap-1.5 text-sm text-foreground-muted">
						<CalendarDays className="size-4" />
						Joined {joined}
					</p>
				)}

				<div className="mt-6 flex flex-col gap-3 sm:flex-row">
					<Link to="/settings" variant="outline" size="lg">
						<Pencil className="size-4" />
						Edit profile
					</Link>
				</div>
			</div>
		</section>
	)
}

export default ProfileCard
