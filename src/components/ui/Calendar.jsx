import { useDispatch, useSelector } from "react-redux";
import {
	addYears,
	eachDayOfInterval,
	eachMonthOfInterval,
	endOfMonth,
	endOfYear,
	format,
	getDay,
	isSameDay,
	startOfMonth,
	startOfYear,
	subYears,
} from "date-fns";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

import Button from "./Button";
import { setDate } from "../../Slice/dateSlice";

const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Calendar
function Calendar({ children, className = "" }) {
	return (
		<section
			className={`bg-secondary text-primary p-4 rounded-2xl sm:rounded-4xl ${className}`}>
			{children}
		</section>
	);
}

// Months
function Months() {
	const dispatch = useDispatch();
	const { currentDate: currentDateString } = useSelector((store) => store.date);

	const currentDate = new Date(currentDateString);

	const allMonths = eachMonthOfInterval({
		start: startOfYear(currentDate),
		end: endOfYear(currentDate),
	});

	const reorderedMonths = [
		...allMonths.slice(currentDate.getMonth()),
		...allMonths.slice(0, currentDate.getMonth()),
	];

	return (
		<select
			className='bg-primary rounded-2xl custom-button-shadow font-bold border-none outline-none py-2 px-4'
			onChange={(e) => {
				const selectedMonth = new Date(e.target.value);
				dispatch(setDate(selectedMonth.toISOString()));
			}}>
			{reorderedMonths.map((month) => (
				<option
					key={format(month, "LLLL")}
					value={
						format(month, "LLL y") === format(new Date(), "LLL y")
							? new Date().toISOString()
							: month.toISOString()
					}>
					{format(month, "LLLL")}
				</option>
			))}
		</select>
	);
}

// Years
function Year() {
	const { currentDate } = useSelector((store) => store.date);

	return <Button>{format(currentDate, "y")}</Button>;
}

// Decrease Year
function NavLeft() {
	const dispatch = useDispatch();
	const { currentDate } = useSelector((store) => store.date);

	return (
		<Button
			onClick={() => dispatch(setDate(subYears(currentDate, 1).toISOString()))}>
			<HiOutlineChevronLeft size='1rem' />
		</Button>
	);
}

// Increase Year
function NavRight() {
	const dispatch = useDispatch();
	const { currentDate } = useSelector((store) => store.date);

	return (
		<Button
			onClick={() => dispatch(setDate(addYears(currentDate, 1).toISOString()))}>
			<HiOutlineChevronRight size='1rem' />
		</Button>
	);
}

// Displays Months days and Numbers
function Grid() {
	const { currentDate } = useSelector((store) => store.date);

	const firstDayOfMonth = startOfMonth(currentDate);
	const lastDayOfMonth = endOfMonth(currentDate);

	return (
		<div className=' grid grid-cols-7 gap-2 sm:gap-4 font-bold'>
			{weekdays.map((day) => (
				<p className='text-center text-sm sm:text-lg' key={day}>
					{day}
				</p>
			))}

			{Array.from({ length: getDay(firstDayOfMonth) || 7 }).map((_, index) => (
				<p className='text-center text-sm sm:text-lg' key={`empty-${index}`} />
			))}

			{eachDayOfInterval({
				start: firstDayOfMonth,
				end: lastDayOfMonth,
			}).map((day, index) =>
				isSameDay(
					format(currentDate, "LLL y") === format(new Date(), "LLL y") &&
						currentDate,
					day,
				) ? (
					<p className='sunken-shadow p-1 text-center rounded-2xl' key={index}>
						{format(day, "d")}
					</p>
				) : (
					<p className='text-center text-sm sm:text-lg' key={index}>
						{format(day, "d")}
					</p>
				),
			)}
		</div>
	);
}

Calendar.Months = Months;
Calendar.Year = Year;
Calendar.NavLeft = NavLeft;
Calendar.NavRight = NavRight;
Calendar.Grid = Grid;

export default Calendar;
