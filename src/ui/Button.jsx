function Button({ children, disabled, onClick, className = "" }) {
	return (
		<button
			className={`py-2 px-4 ${className}
			 bg-primary border-none rounded-xl custom-button-shadow font-bold`}
			disabled={disabled}
			onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
