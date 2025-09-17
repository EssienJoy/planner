import styled from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	gap: 1.5rem;
	text-align: center;
	background: linear-gradient(135deg, #f0f4ff, #e6fffa);

	h1 {
		font-size: 2rem;
		font-weight: bold;
		color: #2d3748;
	}
`;

const StyledLink = styled(Link)`
	padding: 0.75rem 1.5rem;
	border-radius: 2rem;
	background-color: #4f46e5;
	color: white;
	text-decoration: none;
	font-weight: 500;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease;

	&:hover {
		background-color: #4338ca;
		transform: translateY(-2px);
	}
`;

function SuccessfulSignup() {
	return (
		<Section>
			<h1>✅ Sign up successful!</h1>
			<StyledLink to='/login'>Go to Login</StyledLink>
		</Section>
	);
}

export default SuccessfulSignup;
