import { setToasterState } from "@/redux/reducers/homepageReducer";
import { useAppDispatch } from ".";

const useShowToaster = () => {
    const dispatch = useAppDispatch();
    const hideFirst = async () => {
        await dispatch(setToasterState({
            openToaster: false,
            toasterMessage: '',
            buttonText: '',
            redirectButtonUrl: '',
        }));
    }
    const showToaster = async ({ message, buttonText = '', redirectButtonUrl = '', severity = 'info' }: { message: string, buttonText?: string, redirectButtonUrl?: string, severity?: 'info' | 'error' | 'success' | 'warning' }): Promise<void> => {
        await hideFirst()
        await dispatch(setToasterState({
            openToaster: true,
            toasterMessage: message,
            buttonText,
            redirectButtonUrl,
            severity
        }));
    }

    return { showToaster }
}

export default useShowToaster