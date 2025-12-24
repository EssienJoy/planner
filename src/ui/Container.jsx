function Container({ className = "", children }) {
	return (
		<section
			className={`max-w-5xl mx-auto ${className} rounded-2xl sm:rounded-4xl`}>
			{children}
		</section>
	);
}

export default Container;
