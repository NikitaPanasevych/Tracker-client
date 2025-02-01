import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { error } from 'console';

type AlertDialogProps = {
	handleResendConfirmation?: () => void;
	isLoading?: boolean;
	type: 'emailConfirmation' | 'passwordReset';
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
};

const AlertDialogComponent = ({
	handleResendConfirmation,
	isLoading = false,
	type,
	isOpen,
	onOpenChange,
}: AlertDialogProps) => {
	const getDialogContent = () => {
		const baseContent = {
			title: type === 'emailConfirmation' ? 'Confirm Your Email Address' : 'Password Reset Required',
			description:
				type === 'emailConfirmation'
					? "Please check your inbox and verify your email address to complete registration. If you didn't receive an email, you can resend it below."
					: "We've sent password reset instructions to your email. Please check your inbox and follow the link to set a new password.",
		};

		return {
			...baseContent,
			actionText: type === 'emailConfirmation' ? 'Resend Email' : 'Resend Instructions',
		};
	};

	const { title, description, actionText } = getDialogContent();

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>
					<AlertDialogDescription className="text-md">{description}</AlertDialogDescription>
				</AlertDialogHeader>

				{handleResendConfirmation && (
					<div className="flex flex-col gap-4">
						<Button variant="outline" onClick={handleResendConfirmation} disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Sending...
								</>
							) : (
								actionText
							)}
						</Button>
					</div>
				)}

				<AlertDialogFooter>
					<AlertDialogCancel>Close</AlertDialogCancel>
					{type === 'passwordReset' && (
						<AlertDialogAction onClick={() => onOpenChange(false)}>Continue</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AlertDialogComponent;
