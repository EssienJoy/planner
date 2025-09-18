import styled from "styled-components";
import Button from "../../ui/Button";
import BoxShadow from "../../ui/BoxShadow";
import Image from "../../ui/Image";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";

import logo from "../../../public/calendar-logo.avif";

function UserLoginForm() {
	const [email, setEmail] = useState("ejojo@gmail.com");
	const [password, setPassword] = useState("sleep123#");

	const { login, loading } = useAuth();

	return (
		<section
			style={{
				display: "grid",
				placeItems: "center",
				height: "100dvh",
			}}>
			<UserFormLayout>
				<Image src={logo} alt='logo' />
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const formData = new FormData(e.target);
						const email = formData.get("email");
						const password = formData.get("password");

						await login(email, password);
					}}>
					<input
						type='email'
						name='email'
						value={email}
						placeholder='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						name='password'
						value={password}
						placeholder='password'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button disabled={loading}>
						{loading ? "Logging..." : "Log in"}
					</Button>
				</form>
				<div>
					<Link className='underline' to='#'>
						forgot password{" "}
					</Link>
					or{" "}
					<Link className='underline' to='/signup'>
						sign up
					</Link>
				</div>
			</UserFormLayout>
		</section>
	);
}

export default UserLoginForm;

const UserFormLayout = styled(BoxShadow)`
	width: 60%;
	display: grid;
	place-items: center;
	gap: 3rem;

	img {
		justify-self: center;
	}

	Link {
		text-decoration: underline;
	}

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
				border: none;
				outline: none;
				border-bottom: 2px solid #cececf;
				border-radius: 1rem;
			}

			&:active {
				border: none;
				outline: none;
				border-bottom: 2px solid #cececf;
				border-radius: 1rem;
			}
		}

		button {
			align-self: center;
		}
	}

	@media screen and (max-width: 800px) {
		width: 70%;
	}
	@media screen and (max-width: 550px) {
		width: 98%;
	}
`;
