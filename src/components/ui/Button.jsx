function Button({
	children,
	disabled,
	onClick,
	className = "",
	bg = "bg-secondary",
	text = "text-primary",
	type = "button",
}) {
	return (
		<button
			className={`py-2 px-4 ${bg} ${text} ${className}
			  border-none rounded-xl  font-bold`}
			disabled={disabled}
			onClick={onClick}
			type={type}>
			{children}
		</button>
	);
}

export default Button;
