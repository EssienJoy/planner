import { Button } from "./button.tsx";
import { cn } from "@/lib/utils";

function AppButton({ className = "", bg, text, ...props }) {
	return <Button className={cn(bg, text, className)} {...props} />;
}

export default AppButton;
