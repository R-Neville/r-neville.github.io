import BaseModal from '#/components/BaseModal'
import Button from '#/components/Button'
import { useAppDispatch, useAppSelector } from '#/store'
import { setCalendarEventModalState } from '#/store/components/thunks/setCalendarEventModalState'
import { FC, useMemo } from 'react'

const CalendarEventModal: FC = () => {
    const dispatch = useAppDispatch()

    const { eventModalState } = useAppSelector(
        (state) => state.components.calendar,
    )

    const { mode, open, date, event } = eventModalState

    const titleText = useMemo(() => {
        if (mode === 'new') {
            return 'New Event'
        }

        return 'Edit Event'
    }, [mode])

    const editContent = useMemo(() => {
        if (event === null) {
            return null
        }

        return <div>Edit Event</div>
    }, [event])

    const newContent = useMemo(() => {
        if (date === null) {
            return null
        }

        return <div>New Event</div>
    }, [date])

    return (
        <>
            <BaseModal
                dialogClassName="flex flex-col w-full max-w-[600px] h-full max-h-[500px]"
                open={open}
                handleClose={() => {
                    void dispatch(
                        setCalendarEventModalState({
                            open: false,
                            date: null,
                            event: null,
                            mode: 'new',
                        }),
                    )
                }}
                title={<div>{titleText}</div>}
                footer={
                    <div className="flex items-center justify-end gap-2 p-4">
                        {mode === 'view' && (
                            <Button theme="secondary">Close</Button>
                        )}
                        {mode === 'new' && (
                            <>
                                <Button theme="secondary">Cancel</Button>
                                <Button theme="primary">Save</Button>
                            </>
                        )}
                        {mode === 'edit' && (
                            <>
                                <Button theme="secondary">Cancel</Button>
                                <Button theme="primary">Save</Button>
                            </>
                        )}
                    </div>
                }
            >
                <div className="flex flex-grow flex-col gap-2 w-full h-full">
                    {mode === 'new' && newContent}
                    {mode === 'edit' && editContent}
                </div>
            </BaseModal>
        </>
    )
}

export default CalendarEventModal
