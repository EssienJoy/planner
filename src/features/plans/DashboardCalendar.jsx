import {
	HiOutlineChevronLeft,
	HiOutlineChevronRight,
	HiOutlineChevronDown,
} from "react-icons/hi2";
import {
	eachDayOfInterval,
	format,
	getDay,
	eachMonthOfInterval,
	startOfYear,
	endOfYear,
	addYears,
	subYears,
	isSameDay,
	startOfMonth,
	endOfMonth,
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../Slice/dateSlice";

function DashboardCalendar() {
	const dispatch = useDispatch();
	const { currentDate: currentDateString } = useSelector((store) => store.date);
	const currentDate = new Date(currentDateString);
	const firstDayOfMonth = startOfMonth(currentDate);
	const lastDayOfMonth = endOfMonth(currentDate);

	const allMonths = eachMonthOfInterval({
		start: startOfYear(currentDate),
		end: endOfYear(currentDate),
	});

	const reorderedMonths = [
		...allMonths.slice(currentDate.getMonth()),
		...allMonths.slice(0, currentDate.getMonth()),
	];

	const weekdays = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

	return (
		<div>
			<div className='flex items-center justify-center gap-4 mb-4'>
				<select
					className='bg-[var(--color-primary)] border-none rounded-2xl px-4 py-2 cursor-pointer transition-all duration-200 ease-in-out font-semibold outline-none shadow-[inset_-5px_-5px_14px_#a8a8a8,inset_5px_5px_14px_#ffffff]'
					value={format(currentDate, "yyyy-MM-dd")}
					onChange={(e) => {
						const selectedMonth = new Date(e.target.value);
						dispatch(setDate(selectedMonth.toISOString()));
					}}>
					{reorderedMonths.map((month) => (
						<option key={month} value={format(month, "yyyy-MM-dd")}>
							{format(month, "LLLL")}
						</option>
					))}
				</select>

				<div className='flex items-center gap-2'>
					<button
						className='p-2 cursor-pointer'
						onClick={() =>
							dispatch(setDate(subYears(currentDate, 1).toISOString()))
						}>
						<HiOutlineChevronLeft />
					</button>
					<span className='font-semibold'>{format(currentDate, "y")}</span>
					<button
						className='p-2 cursor-pointer'
						onClick={() =>
							dispatch(setDate(addYears(currentDate, 1).toISOString()))
						}>
						<HiOutlineChevronRight />
					</button>
				</div>
			</div>

			<div className='grid grid-cols-7 gap-4 p-4 font-semibold'>
				{weekdays.map((day) => (
					<p key={day} className='text-center'>
						{day}
					</p>
				))}

				{Array.from({ length: getDay(firstDayOfMonth) || 7 }).map(
					(_, index) => (
						<div key={`empty-${index}`}></div>
					)
				)}

				{eachDayOfInterval({
					start: firstDayOfMonth,
					end: lastDayOfMonth,
				}).map((day, index) =>
					isSameDay(
						format(currentDate, "LLL y") === format(new Date(), "LLL y") &&
							currentDate,
						day
					) ? (
						<p
							key={index}
							className='shadow-[inset_-5px_-5px_14px_#ffffff,inset_5px_5px_14px_#a8a8a8] p-1 box-border rounded-[3rem] text-center'>
							{format(day, "d")}
						</p>
					) : (
						<p key={index} className='text-center'>
							{format(day, "d")}
						</p>
					)
				)}
			</div>
		</div>
	);
}

export default DashboardCalendar;
