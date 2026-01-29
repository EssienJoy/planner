function Image({ src = "" }) {
	return (
		<img
			src={src}
			className='object-cover w-10 h-10 rounded-full profile-shaadow'></img>
	);
}

export default Image;
