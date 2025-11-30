import { isEqual, omit } from 'lodash-es'

export default function arePropsEqual<IProps extends object>(
    ingoreProps: (keyof IProps)[],
) {
    return (prevProps: IProps, nextProps: IProps) => {
        return isEqual(
            omit(prevProps, ingoreProps),
            omit(nextProps, ingoreProps),
        )
    }
}
