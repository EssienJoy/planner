function Container({ className = "", children }) {
	return (
		<section className={`max-w-5xl mx-auto ${className}  px-2`}>
			{children}
		</section>
	);
}

export default Container;
