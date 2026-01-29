import Container from "../../components/ui/Container";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import CreatePlanForm from "./CreatePlanForm";
// import HarmburgerMenu from "../../components/HarmburgerMenu";
import PlanList from "./PlanList";
import { useTogglePlan } from "../../components/TogglePlanForm";

function PlanLayout() {
	const { user } = useGetCurrentUser();
	const { showForm } = useTogglePlan();
	// console.log(user._id);
	return (
		<>
			<Container className=' flex flex-col   gap-5'>
				<section className='flex items-center justify-between my-5'>
					<div className='w-12 h-12 rounded-full overflow-hidden sunken-shadow'>
						<img
							src={`/img/png/calendar-logo.avif`}
							alt='User profile'
							className='w-full h-full object-cover'
						/>
					</div>

					<div className='flex items-center gap-3'>
						<button>
							<IoIosNotificationsOutline size='2rem' />
						</button>

						<button>
							<CiSearch size='2rem' />
						</button>
					</div>
				</section>

				<div className='flex justify-between items-center'>
					<h2
						className='font-bold 
					text-lg sm:text-2xl'>
						Welcome back {user?.fullName.split(" ")[0]}
					</h2>

					{/* <HarmburgerMenu /> */}
				</div>

				<PlanList id={user?._id} />
				{showForm && <CreatePlanForm user={user} />}
			</Container>
		</>
	);
}

export default PlanLayout;
