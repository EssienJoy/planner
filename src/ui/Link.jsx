import { Link as RouterLink } from "react-router-dom";

function Link({ className = "", children, to }) {
	return (
		<RouterLink
			className={`${className} flex items-center gap-2 text-text-black`}
			to={to}>
			{children}
		</RouterLink>
	);
}

export default Link;
