import MobileNavigation from "../components/MobileNavigation";
import Container from "../components/ui/Container";
import SignUpForm from "../features/authentication/SignUpForm";

function Signup() {
	return (
		<Container>
			<SignUpForm />;
			<MobileNavigation />
		</Container>
	);
}

export default Signup;
