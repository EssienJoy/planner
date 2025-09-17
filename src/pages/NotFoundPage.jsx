import styled from "styled-components";

const StyledPageNotFound = styled.section`
	height: 100dvh;
	display: grid;
	place-items: center;
	font-weight: 600;
	font-size: 3rem;
`;

function NotFoundPage() {
	return (
		<StyledPageNotFound>
			<p>This site does not exist 😒</p>
		</StyledPageNotFound>
	);
}

export default NotFoundPage;
