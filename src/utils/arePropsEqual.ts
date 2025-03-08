import { isEqual, omitBy } from 'lodash-es'

export default function arePropsEqual<IProps extends object>(
    ingoreProps: IProps[keyof IProps][],
) {
    return (prevProps: IProps, nextProps: IProps) => {
        let adjustedPrevProps: Partial<IProps> = prevProps
        let adjustedNextProps: Partial<IProps> = nextProps

        if (ingoreProps.length !== 0) {
            adjustedPrevProps = omitBy(prevProps, (key) => {
                return ingoreProps.includes(key)
            })
            adjustedNextProps = omitBy(prevProps, (key) => {
                return ingoreProps.includes(key)
            })
        }

        return isEqual(adjustedPrevProps, adjustedNextProps)
    }
}
