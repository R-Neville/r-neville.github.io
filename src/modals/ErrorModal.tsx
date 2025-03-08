import { useAppDispatch, useAppSelector } from '#/store'
import { hideErrorModal } from '#/store/error/thunks/hideErrorModal'
import { FC } from 'react'
import BaseModal from '../components/BaseModal'
import Icon from '../components/shared/Icon'
import icons from '../icons'

const ErrorModal: FC = () => {
    const dispatch = useAppDispatch()

    const { errorModalState } = useAppSelector((state) => state.error)

    return (
        <BaseModal
            clickAwayable
            open={errorModalState.open}
            dialogClassName="w-[40%] h-[30%]"
            handleClose={() => {
                void dispatch(hideErrorModal())
            }}
            title={
                <div className="flex items-center gap-2 text-lg text-red-700">
                    <Icon icon={icons.warning} />
                    Error
                </div>
            }
        >
            {errorModalState.messages.length === 0 && (
                <div>An unknown error occured.</div>
            )}
            {errorModalState.messages.map((message, i) => {
                return <p key={i}>{message}</p>
            })}
        </BaseModal>
    )
}

export default ErrorModal
