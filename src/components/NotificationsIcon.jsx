import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";

function NotificationIcon() {
	const unreadCount = 3;

	return (
		<Link to='/notifications' className='relative inline-block'>
			<IoIosNotificationsOutline size='2rem' />

			{unreadCount > 0 && (
				<span
					className='absolute -top-1 -right-1 
					bg-secondary text-white text-[10px] 
					w-4 h-4 flex items-center justify-center 
					rounded-full'>
					{unreadCount}
				</span>
			)}
		</Link>
	);
}

export default NotificationIcon;
