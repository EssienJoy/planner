import styled from "styled-components";

// Neumorphic Dropdown
const StyledDropdown = styled.ul`
	position: absolute;
	top: 4rem;
	right: 0;
	background: var(--color-primary);
	box-shadow: inset -5px -5px 14px #ffffff, inset 5px 5px 14px #a8a8a8;
	border-radius: 1rem;
	list-style: none;
	z-index: 100;
	width: 120px;

	li {
		/* margin: 1rem 0; */
		cursor: pointer;
		transition: background 0.2s ease;
		border: none;
	}
`;

function Dropdown({ children }) {
	return <StyledDropdown>{children}</StyledDropdown>;
}

export default Dropdown;
