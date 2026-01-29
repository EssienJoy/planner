import { usePlans } from "../../hooks/usePlans";
import { Link } from "react-router-dom";
import { TbEye } from "react-icons/tb";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDeletePlan } from "../../hooks/useDeletePlan";
import { format } from "date-fns";

function PlanList({ id }) {
	const { plans, isLoading } = usePlans(id);
	// console.log(plans);
	const { deletePlan } = useDeletePlan();
	// console.log(id);
	// console.log(plans);

	return (
		<section>
			{isLoading ? (
				<div className='spinner'></div>
			) : (
				<ul className='grid sm:grid-cols-2 gap-5'>
					{plans?.map((plan) => (
						<li
							className='bg-secondary text-white 
								p-4 rounded-2xl  '
							key={plan._id}>
							<div className='flex justify-between items-center'>
								<p className=''>{plan.plan}</p>
								<Link
									to={`/plans/${plan._id}`}
									className='p-1 sm:hover:scale-110'>
									<TbEye size='2rem' />
								</Link>
							</div>
							<p>2 tasks Completed</p>
							<div className='flex justify-between gap-2 items-center'>
								<p className='text-xs'>{format(plan.createdAt, "MMM yyyy")}</p>
								<div className='flex gap-2'>
									<button
										onClick={() => deletePlan(plan._id)}
										className='p-1 hover:text-red-500'>
										<MdOutlineDeleteForever size='1.5rem' />
									</button>
									<button className='p-1'>
										<FaRegEdit size='1.5rem' />
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default PlanList;
