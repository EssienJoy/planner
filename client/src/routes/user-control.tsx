function UserControl() {
	return (
		<section className="space-y-6">
			<header>
				<h2 className="text-xl font-extrabold tracking-tight text-foreground">
					User control
				</h2>
				<p className="mt-1 text-sm text-foreground-muted">
					Manage the status of your account.
				</p>
			</header>

			<div className="divide-y divide-border border-y border-border">
				<section className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h3 className="font-bold text-foreground">
							Deactivate account
						</h3>
						<p className="mt-1 text-sm text-foreground-muted">
							Temporarily disable access to your account.
						</p>
					</div>
					<button
						type="button"
						disabled
						className="w-fit cursor-not-allowed rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground-muted opacity-50">
						Deactivate account
					</button>
				</section>

				<section className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h3 className="font-bold text-foreground">
							Delete account
						</h3>
						<p className="mt-1 text-sm text-foreground-muted">
							Permanently remove your account and its data.
						</p>
					</div>
					<button
						type="button"
						disabled
						className="w-fit cursor-not-allowed rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground-muted opacity-50">
						Delete account
					</button>
				</section>
			</div>
		</section>
	)
}

export default UserControl
