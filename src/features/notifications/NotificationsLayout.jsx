import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { HiBell } from "react-icons/hi2";
import { useNotif } from "./hooks/useNotif";

export const NotificationsLayout = () => {
	const { notifs } = useNotif();
	console.log(notifs);
	// console.log(isLoading);
	const navigate = useNavigate();

	const notifications = [
		{
			id: 1,
			message: "Your goal 'Finish JavaScript Course' is due tomorrow.",
			time: "2 hours ago",
			read: false,
		},
		{
			id: 2,
			message: "You completed today's planner task 🎉",
			time: "Yesterday",
			read: true,
		},
	];

	// if (isLoading) return <p>...</p>;

	return (
		<div className='max-w-xl mx-auto p-6'>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center gap-3'>
					<button
						onClick={() => navigate(-1)}
						className='p-2 rounded-xl bg-secondary text-white hover:opacity-80'>
						<IoArrowBack size='1.2rem' />
					</button>

					<h1 className='text-xl font-semibold flex items-center gap-2'>
						<HiBell />
						Notifications
					</h1>
				</div>

				<button className='text-sm underline'>Mark all as read</button>
			</div>

			{/* Notifications */}
			<div className='flex flex-col gap-4'>
				{notifications.map((note) => (
					<div
						key={note.id}
						className={`bg-secondary text-white p-4 rounded-2xl flex flex-col gap-2 relative ${
							!note.read ? "ring-2 ring-white/30" : ""
						}`}>
						{/* unread dot */}
						{!note.read && (
							<span className='absolute top-3 right-3 w-2 h-2 rounded-full bg-white'></span>
						)}

						<p className='text-sm'>{note.message}</p>

						<span className='text-xs opacity-70'>{note.time}</span>
					</div>
				))}
			</div>

			{/* Empty state (optional) */}
			{notifications.length === 0 && (
				<div className='mt-16 text-center opacity-60'>
					<HiBell size='2rem' className='mx-auto mb-2' />
					<p>No notifications yet</p>
				</div>
			)}
		</div>
	);
};
