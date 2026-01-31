function Modal({ children, isOpen, close }) {
	return (
		<>
			<div
				onClick={close}
				className={`${isOpen ? "fixed" : "hidden"}
              top-0 left-0 inset-0
                 z-40 bg-black/30 backdrop-blur-sm`}
			/>

			<section
				className={`${isOpen ? "fixed" : "hidden"} 
                 z-50 top-1/2 left-1/2 w-[90%] max-w-sm
        -translate-x-1/2 -translate-y-1/2
        bg-primary rounded-xl p-6 shadow-xl`}>
				<div className='flex justify-end'>
					<button className='text-xl' onClick={close}>
						✖
					</button>
				</div>
				{children}
			</section>
		</>
	);
}

function ModalTitle({ children }) {
	return <h2 className='text-lg font-semibold mb-4 text-center'>{children}</h2>;
}

function ModalBody({ children }) {
	return <div className='mb-6 text-center'>{children}</div>;
}

function ModalActions({ children }) {
	return <div className='flex justify-between gap-4'>{children}</div>;
}

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Actions = ModalActions;

export default Modal;
