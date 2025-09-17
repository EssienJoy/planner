import styled, { css } from "styled-components";

const SunkenLayout = styled.p`
	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 1.5rem;
		`}

	${(props) =>
		props.as === "p" &&
		css`
			font-size: 1rem;
		`}
		
	${(props) =>
		props.as === "li" &&
		css`
			margin: 1rem 0;
			font-size: 1.2rem;
			list-style-type: circle;
			list-style-position: inside;

			@media (max-width: 450px) {
				font-size: 1rem;
			}
		`}

	background-color: var(--color-primary);
	box-shadow: inset -5px -5px 14px #ffffff, inset 5px 5px 14px #a8a8a8;
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	font-weight: bold;
`;

export default SunkenLayout;
