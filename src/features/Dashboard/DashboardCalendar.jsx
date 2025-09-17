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
import styled from "styled-components";

import BoxShadow from "../../ui/BoxShadow";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import { setDate } from "../../Slice/dateSlice";

const CalenderLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 1rem;
	padding: 1rem;
	font-weight: 600;

	p {
		text-align: center;
	}
`;

const Active = styled.p`
	box-shadow: inset -5px -5px 14px #ffffff, inset 5px 5px 14px #a8a8a8;
	padding: 0.25rem;
	box-sizing: border-box;
	border-radius: 3rem;
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
	outline: none;

	box-shadow: inset -5px -5px 14px #a8a8a8, inset 5px 5px 14px #ffffff;
`;

const weekdays = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

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

	return (
		<Row type='horizontal'>
			<BoxShadow>
				<Row type='horizontal'>
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

					<Row type='horizontal'>
						<Button
							onClick={() =>
								dispatch(setDate(subYears(currentDate, 1).toISOString()))
							}>
							<HiOutlineChevronLeft />
						</Button>
						<Button>
							{format(currentDate, "y")} <HiOutlineChevronDown />
						</Button>
						<Button
							onClick={() =>
								dispatch(setDate(addYears(currentDate, 1).toISOString()))
							}>
							<HiOutlineChevronRight />
						</Button>
					</Row>
				</Row>
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
		</Row>
	);
}

export default DashboardCalendar;
