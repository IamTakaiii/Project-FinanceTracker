import { Input } from "@/global/components/ui/input";
import { Label } from "@/global/components/ui/label";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	labelPosition?: "side" | "top";
}

export const FormField = ({ label, id, error, labelPosition='top', ...props }: FormFieldProps) => {
	return (
		(
			labelPosition === "side" ? (
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor={id} className="col-span-1 text-right">
						{label}
					</Label>
					<Input id={id} className="col-span-3 placeholder:text-gray-300" {...props} />
					{error && (
						<div className="col-span-4 text-right text-sm text-red-500">
							{error}
						</div>
					)}
				</div>
			) : (
				<div className="mb-4">
					<Label htmlFor={id}>{label}</Label>
					<Input id={id} {...props} />
					{error && <p className="text-sm text-red-500 mt-2">{error}</p>}
				</div>
			)
		)

	);
};
