import fileDownload from "js-file-download";
import auth from "../api/auth";
import { AppContextType } from "../providers/AppProvider";
import errorHandler from "./errorHandler";

export async function downloadFile(name: string, link: string) {
	await fileDownload(link, name);
}

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const updateProfile = async (context: AppContextType, toast: any) => {
	try {
		const profile = await auth.getProfile(context.props.auth?.token || "");

		if (!profile) {
			toast({
				title: "Неизвестная ошибка",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		if (context.setProps) {
			context.setProps({
				...context.props,
				auth: { profile, token: context.props.auth?.token || "" },
			});
		}
	} catch (error) {
		errorHandler(error, toast);
	}
};
