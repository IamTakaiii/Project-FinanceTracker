import { cn } from "@/global/lib/utils";

type DefaultLayoutProps = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
	backgroundImg?: string;
	backgroundColor?: string;
};

export const SingleFormLayout: React.FC<DefaultLayoutProps> = ({ children, className, backgroundImg }) => {
	return (
		<div
			className={cn(`flex min-h-screen flex-col items-center justify-center bg-cover bg-center"}`)}
			style={{
				...(backgroundImg ? { backgroundImage: `url(${backgroundImg})` } : {}),
			}}
		>
			<div className={cn("w-full max-w-sm md:max-w-3xl", className)}>{children}</div>
		</div>
	);
};
