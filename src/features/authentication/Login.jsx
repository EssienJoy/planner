import LayoutContainer from "../../ui/LayoutContainer";
import NavBar from "../../ui/NavBar";
import UserLoginForm from "./UserForm";

function Login() {
	return (
		<LayoutContainer>
			<NavBar />
			<UserLoginForm />
		</LayoutContainer>
	);
}

export default Login;
