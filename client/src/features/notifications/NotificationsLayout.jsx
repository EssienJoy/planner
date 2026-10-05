import { HiBell } from "react-icons/hi2";

export const NotificationsLayout = () => {

	return (
		<div className='mx-auto w-full max-w-xl'>
			<div className='mb-6 flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<h1 className='flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground'>
						<HiBell className='text-primary' />
						Notifications
					</h1>
				</div>
			</div>

			<div className='rounded-3xl border border-border bg-surface px-6 py-16 text-center shadow-sm'>
				<span className='mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-subtle text-primary'>
					<HiBell className='size-7' />
				</span>
				<h2 className='mt-5 text-xl font-extrabold tracking-tight text-foreground'>
					No notifications yet
				</h2>
				<p className='mx-auto mt-2 max-w-sm text-sm leading-6 text-foreground-muted'>
					When something needs your attention, it will show up
					here.
				</p>
			</div>
		</div>
	);
};
