import styled, { css } from "styled-components";

const Row = styled.section`
	display: flex;

	${(props) =>
		props.type === "horizontal" &&
		css`
			flex-direction: row;
			gap: 1rem;

			@media (max-width: 1000px) {
				flex-direction: column;
			}
		`}

	${(props) =>
		props.type === "vertical" &&
		css`
			flex-direction: column;
			gap: 1rem;
		`}
`;

Row.defaultProps = {
	type: "vertical",
};

export default Row;
