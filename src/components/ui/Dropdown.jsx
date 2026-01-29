function Dropdown({ children }) {
	return (
		<ul
			className='absolute top-16 right-0 bg-secondary
		 text-primary rounded-2xl list-none z-[100] w-[120px] 
		 p-4 flex flex-col gap-2 text-sm'>
			{children}
		</ul>
	);
}

export default Dropdown;
