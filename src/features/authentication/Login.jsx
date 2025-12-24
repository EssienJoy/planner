import Container from "../../ui/Container";
import NavBar from "../../ui/NavBar";
import UserLoginForm from "./UserForm";

function Login() {
	return (
		<Container>
			<NavBar />
			<UserLoginForm />
		</Container>
	);
}

export default Login;
