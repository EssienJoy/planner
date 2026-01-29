function Button({
	children,
	disabled,
	onClick,
	className = "",
	bg = "bg-secondary",
	text = "text-primary",
}) {
	return (
		<button
			className={`py-2 px-4 ${bg} ${text} ${className}
			  border-none rounded-xl  font-bold`}
			disabled={disabled}
			onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
