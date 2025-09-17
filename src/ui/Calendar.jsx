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
import styled from "styled-components";

import Button from "./Button";
import { setDate } from "../Slice/dateSlice";
import BoxShadow from "./BoxShadow";

const weekdays = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

// Calendar
function Calendar({ children }) {
	return <section>{children}</section>;
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
		<Select
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
		</Select>
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
			<HiOutlineChevronLeft />
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
			<HiOutlineChevronRight />
		</Button>
	);
}

// Displays Months days and Numbers
function Grid() {
	const { currentDate } = useSelector((store) => store.date);

	const firstDayOfMonth = startOfMonth(currentDate);
	const lastDayOfMonth = endOfMonth(currentDate);

	return (
		<BoxShadow>
			<CalenderLayout className='calendar-layout'>
				{weekdays.map((day) => (
					<p key={day}>{day}</p>
				))}

				{Array.from({ length: getDay(firstDayOfMonth) || 7 }).map(
					(_, index) => (
						<p key={`empty-${index}`} />
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
						<Active key={index}>{format(day, "d")}</Active>
					) : (
						<p key={index}>{format(day, "d")}</p>
					)
				)}
			</CalenderLayout>
		</BoxShadow>
	);
}

Calendar.Months = Months;
Calendar.Year = Year;
Calendar.NavLeft = NavLeft;
Calendar.NavRight = NavRight;
Calendar.Grid = Grid;

export default Calendar;

const CalenderLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 1rem;
	padding: 1rem;
	font-weight: 600;
	font-size: 1rem;

	@media (max-width: 450px) {
		font-size: 0.85rem;
		padding: 0;
		gap: 0.5rem;
		width: 100%;
	}

	p {
		text-align: center;
	}
`;

const Active = styled.p`
	box-shadow: inset -5px -5px 14px #ffffff, inset 5px 5px 14px #a8a8a8;
	padding: 0.25rem;
	box-sizing: border-box;
	border-radius: 1rem;
	text-align: center;
`;

const Select = styled.select`
	background-color: var(--color-primary);
	border: none;
	border-radius: 1rem;
	padding: 0.5rem 1rem;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	font-weight: 600;
	font-size: 1rem;
	outline: none;

	box-shadow: inset -5px -5px 14px #a8a8a8, inset 5px 5px 14px #ffffff;

	@media (max-width: 450px) {
		font-size: 0.85rem;
	}
`;
