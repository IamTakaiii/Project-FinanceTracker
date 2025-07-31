import { Input } from "@/global/components/ui/input";
import { Label } from "@/global/components/ui/label";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
}

export const FormField = ({ label, id, error, ...props }: FormFieldProps) => {
	return (
		<div className="">
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} {...props} />
			{error && <p className="text-sm text-red-500 mt-2">{error}</p>}
		</div>
	);
};
