import styled from "styled-components";

function Button({ children, disabled, onClick }) {
	return (
		<ButtonComponent disabled={disabled} onClick={onClick}>
			{children}
		</ButtonComponent>
	);
}

export default Button;

const ButtonComponent = styled.button`
	background-color: var(--color-primary);
	border: none;
	border-radius: 12px;
	padding: 0.5rem 1rem;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	font-weight: 600;
	font-size: 1rem;

	box-shadow: inset -5px -5px 14px #a8a8a8, inset 5px 5px 14px #ffffff;

	&:hover {
		box-shadow: inset -5px -5px 14px #ffffff,
			inset 5px 5px 14px rgb(168, 168, 168);
	}

	&:active {
		box-shadow: inset -5px -5px 14px #ffffff, inset 5px 5px 14px #a8a8a8;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		box-shadow: none;
		background-color: #ccc;
	}

	@media (max-width: 450px) {
		font-size: 0.85rem;
	}
`;
