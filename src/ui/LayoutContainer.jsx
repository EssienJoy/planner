import styled from "styled-components";

const LayoutContainer = styled.section`
	background-color: var(--color-primary);
	border-radius: 3rem;
	box-shadow: 10px 10px 20px #d4d3d3, -4px -4px 20px #ffffff;
	/* min-height: 100dvh; */
	max-width: 1000px;
	margin: 0 auto;
	padding: 1rem;

	@media (max-width: 550px) {
		padding: 0.15rem;
	}
`;

export default LayoutContainer;
