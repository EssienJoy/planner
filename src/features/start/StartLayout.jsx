import React from "react";
import Container from "../../components/ui/Container";
// import { Link } from "react-router-dom";
import Link from "../../components/ui/Link";

export const StartLayout = () => {
	return (
		<section className='space-y-6'>
			<div className=' relative h-[486px] overflow-x-hidden'>
				{/* Ui styles */}
				<div
					className='w-18 h-18 bg-linear-to-t
				from-[#edf046] from-100% to-[#F0E946] to-15%  absolute
				-top-[4px] left-[275px] blur-3xl'></div>
				<div
					className='w-18 h-18 bg-linear-to-t
				from-[#46F080] from-100% to-[#46F08A] to-15%  absolute
				top-[126px] -left-[15px] blur-3xl'></div>
				<div
					className='w-15 h-15 bg-linear-to-t
				from-[#2555FF] from-100% to-[#2555FF] to-25%  absolute
				top-[232px] -left-[333px] blur-3xl'></div>
				<div
					className='w-14 h-14 bg-linear-to-t
				from-[#46BDF0] from-100% to-[#46B3F0] to-15%  absolute
				top-[424px] left-[76px] blur-3xl'></div>

				<div
					className='w-2 h-2 rounded-full bg-[#92DEFF]
				absolute top-[252px] left-[76px]'></div>

				<div
					className='w-2 h-2 rounded-full bg-[#EAED2A]
					absolute top-[383px] left-[250px]'></div>
				<div
					className='w-2 h-2 rounded-full bg-[#FFD7E4]
					absolute top-[391px] left-[198px]'></div>
				<div
					className='w-1 h-1 rounded-full bg-[#BE9FFF]
				absolute top-[92px] left-[202px]'></div>
				<div
					className='w-1 h-1 rounded-full bg-[#7FFCAA]
				absolute top-[362px] left-[281px]'></div>
				<div
					className='w-1 h-1 rounded-full bg-[#A4E7F9]
				absolute top-[405px] left-[176px]'></div>

				{/* Images */}
				<img
					src='/img/png/start1.png'
					className='w-8 h-6 
				object-contain absolute left-[276px] top-[136px]'
				/>
				<img
					src='/img/png/start2.png'
					className='w-10 h-10 object-contain
				absolute top-[104px] left-[69px]'
				/>
				<img
					src='/img/png/start3.png'
					className='w-4 h-5 
					absolute object-contain top-[310px] left-[67px]'
				/>
				<img
					src='/img/png/start4.png'
					className='w-45 h-49
						object-contain absolute top-[131px] left-[136px]'
				/>
				<img
					src='/img/png/start5.png'
					className='w-15 h-10 object-contain
				absolute left-[245px] top-[225px]'
				/>
				<img
					src='/img/png/start6.png'
					className='w-6 h-6
					object-contain absolute left-[84px] top-[180px]'
				/>
				<img
					src='/img/png/start7.png'
					className='w-9 h-13
						absolute object-contain left-[79px] top-[279px]'
				/>
			</div>
			<Container className=' mb-5'>
				<div className='flex flex-col gap-6'>
					<div className='w-[80%] mx-auto space-y-3'>
						<h1 className='font-semibold text-2xl text-center'>
							Task Management & To-Do List
						</h1>
						<p className='text-center text-sm'>
							This productive tool is designed to help you better manage your
							task project-wise conveniently!
						</p>
					</div>
					<Link
						to='/login'
						className='font-bold
				 shadow-[0_6px_40px_rgba(95,51,225,0.2)]'>
						<span className='text-lg mx-auto'>Let's Start</span>
						<span className='justify-self-end'>
							<svg
								width='18'
								height='12'
								viewBox='0 0 18 12'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M10.0586 12C9.7412 12 9.43748 11.9266 9.14844 11.7812C8.78735 11.5775 8.49911 11.2549 8.33984 10.876C8.23862 10.6139 8.07985 9.8304 8.0791 9.8125C7.93309 9.01839 7.84908 7.76483 7.83691 6.36035L7.83496 6.00684C7.83496 4.5352 7.92096 3.19297 8.05078 2.31836L8.16504 1.77441C8.22829 1.48651 8.31079 1.15858 8.39746 0.991211C8.71484 0.378905 9.33582 0.000175476 10 0H10.0586C10.4898 0.0144262 11.393 0.390695 11.4014 0.407227C12.8654 1.02151 15.6897 2.87561 16.9941 4.19727L17.373 4.59375C17.4722 4.70121 17.5841 4.82856 17.6533 4.92773C17.8846 5.23393 18 5.6133 18 5.99219C18 6.41504 17.8703 6.80829 17.625 7.12988L17.2354 7.55078L17.1484 7.64062C15.9648 8.9239 12.8735 11.0219 11.2568 11.6641L11.0127 11.7578C10.7191 11.863 10.308 11.9883 10.0586 12ZM1.50293 7.51758C0.673052 7.5174 0.000236511 6.83795 0 6C0 5.16185 0.672907 4.48162 1.50293 4.48145L5.20215 4.80859C5.85341 4.80859 6.38184 5.34239 6.38184 6C6.3816 6.65851 5.85327 7.19043 5.20215 7.19043L1.50293 7.51758Z'
									fill='white'
								/>
							</svg>
						</span>
					</Link>
				</div>
			</Container>
		</section>
	);
};
