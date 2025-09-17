import { Link } from "react-router-dom";
import styled from "styled-components";

function Footer() {
	return (
		<StyledFooter>
			<div className='brand'>
				<h4>Planner — cc@planner</h4>
				<p>Plan smarter.</p>
			</div>

			<div className='links'>
				<Link to='#'>Contact</Link>
				<Link to='#'>Settings</Link>
				<Link to='#'>Help</Link>
			</div>

			<div className='small'>© {new Date().getFullYear()} Planner</div>
		</StyledFooter>
	);
}

export default Footer;

const StyledFooter = styled.footer`
	padding: 1rem 2rem;
	box-shadow: 5px 5px 14px #c8c8c8, -5px -5px 14px #ffffff;
	border-radius: 3rem;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-between;
	font-weight: 500;
	margin-top: 2rem;
	font-size: 1rem;
	gap: 0.5rem;

	* .brand {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.links {
		display: flex;
		gap: 1rem;
		font-size: 0.85rem;
	}
`;
