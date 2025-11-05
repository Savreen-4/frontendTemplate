import { useIntl } from "react-intl";

/**
 * Custom hook for handling translations.
 * Simplifies the usage of formatMessage.
 */
const useTranslate = () => {
    const { formatMessage } = useIntl();

    return (id: string, values?: Record<string, any>) => formatMessage({ id }, values);
};

export default useTranslate;
