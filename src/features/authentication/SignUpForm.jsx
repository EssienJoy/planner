import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import LayoutContainer from "../../ui/LayoutContainer";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useCreateUser } from "../../hooks/useCreateUser";

function SignUpForm() {
	const navigate = useNavigate();

	const { addUser, isLoading } = useCreateUser();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		addUser(data);
	};

	return (
		<LayoutContainer>
			<StyledWrapper>
				<button type='button' onClick={() => navigate(-1)}>
					<IoIosArrowRoundBack size='2rem' />
				</button>

				<form className='form' onSubmit={handleSubmit}>
					<p id='heading'>Sign up</p>

					<input
						name='surname'
						placeholder='Surname'
						className='input-field'
						type='text'
						required
					/>

					<input
						name='name'
						placeholder='Name'
						className='input-field'
						type='text'
						required
					/>

					<input
						name='email'
						placeholder='Email'
						className='input-field'
						type='email'
						required
					/>

					<input
						name='password'
						placeholder='Password'
						className='input-field'
						type='password'
						required
					/>

					<Button type='submit' disabled={isLoading}>
						{isLoading ? "Signing up..." : "Sign Up"}
					</Button>
				</form>
			</StyledWrapper>
		</LayoutContainer>
	);
}

export default SignUpForm;

const StyledWrapper = styled.div`
	box-shadow: 10px 10px 20px #d4d3d3, -4px -4px 20px #ffffff;
	width: 50%;
	margin: 2rem auto;
	padding: 1rem;
	border-radius: 3rem;

	form {
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;

		input {
			border: none;
			display: block;
			background-color: transparent;
			border-bottom: 2px solid #cececf;
			border-radius: 1rem;
			padding: 0.5rem 1rem;
			outline: none;

			&:focus {
				border-bottom: 2px solid #999;
			}
		}

		button {
			align-self: center;
		}
	}

	#heading {
		text-align: center;
		font-size: 1.25rem;
	}

	@media screen and (max-width: 800px) {
		width: 70%;
	}
	@media screen and (max-width: 550px) {
		width: 98%;
	}
`;
