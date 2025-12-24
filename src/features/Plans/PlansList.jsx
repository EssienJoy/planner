import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";

import Button from "../../ui/Button";
import DropdownMenuPlans from "./DropdownMenuPlans";

function PlansList({ plans }) {
	const [selectedId, setSelectedId] = useState(null);

	function handleToggleMenu(id) {
		setSelectedId((prevId) => (prevId === id ? null : id));
	}

	return (
		<ul className='sm:px-4 h-80  sm:h-120'>
			{plans?.map((plan) => (
				<li
					className='py-3 px-2 my-5 relative flex items-center gap-5 rounded-2xl border-b-2 border-b-[#cececf]'
					key={plan.id}>
					<p className='text-sm sm:text-lg grow'>{plan.title}</p>

					<Button className='' onClick={() => handleToggleMenu(plan.id)}>
						<HiOutlineDotsVertical />
					</Button>
					{selectedId === plan.id && <DropdownMenuPlans planId={plan.id} />}
				</li>
			))}
		</ul>
	);
}

export default PlansList;
