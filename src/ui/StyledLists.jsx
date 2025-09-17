import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLists = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	text-decoration: none;
	color: var(--color-text-black);

	&:active {
		text-decoration: underline;
	}

	&:hover {
		text-decoration: underline;
	}
`;

export default StyledLists;
