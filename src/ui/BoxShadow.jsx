import styled from "styled-components";

const BoxShadow = styled.section`
	background-color: var(--color-primary);
	border-radius: 2rem;
	box-shadow: 5px 5px 14px #c8c8c8, -5px -5px 14px #ffffff;
	padding: 1rem;

	@media screen and (max-width: 550px) {
		padding: 0.5rem;
	}
`;

export default BoxShadow;
