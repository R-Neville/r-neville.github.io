import BaseDrawer from '#/components/BaseDrawer'
import Button from '#/components/Button'
import DateInput from '#/components/DateInput'
import TextInput from '#/components/TextInput'
import TimePicker from '#/components/TimePicker'
import { useAppDispatch, useAppSelector } from '#/store'
import { setCalendarEventModalState } from '#/store/components/thunks/setCalendarEventModalState'
import { DateTime } from 'luxon'
import { FC, useEffect, useMemo, useState } from 'react'

const CalendarEventDrawer: FC = () => {
    const dispatch = useAppDispatch()

    const { eventModalState } = useAppSelector(
        (state) => state.components.calendar,
    )

    const { mode, open, date, event } = eventModalState

    console.log(date?.toFormat('DD'))

    const [title, setTitle] = useState<string>(event?.title ?? '')
    const [start, setStart] = useState<DateTime | null>(null)
    const [end, setEnd] = useState<DateTime | null>(null)

    const titleText = useMemo(() => {
        if (mode === 'new') {
            return 'New Event'
        }

        return 'Edit Event'
    }, [mode])

    const content = useMemo(() => {
        return (
            <div className="flex flex-col gap-2">
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(value) => {
                        setTitle(value)
                    }}
                />
                <DateInput
                    label="Date"
                    value={start ?? DateTime.now()}
                    onChange={(value) => {
                        const newStart = value.set({
                            hour: start?.hour,
                            minute: start?.minute,
                        })
                        setStart(newStart)
                        const newEnd = value.set({
                            hour: end?.hour,
                            minute: end?.minute,
                        })
                        setStart(newEnd)
                    }}
                />
                <TimePicker
                    label="Start"
                    value={start ?? DateTime.now()}
                    onChange={(value) => {
                        const newStart = start?.set({
                            hour: value?.hour,
                            minute: value?.minute,
                        })
                        setStart(newStart ?? null)
                    }}
                />
                <TimePicker
                    label="End"
                    value={start ?? DateTime.now()}
                    onChange={(value) => {
                        const newEnd = end?.set({
                            hour: value?.hour,
                            minute: value?.minute,
                        })
                        setStart(newEnd ?? null)
                    }}
                />
            </div>
        )
    }, [end, start, title])

    useEffect(() => {
        setStart(open ? (event?.start ?? date ?? null) : null)
        setEnd(open ? (event?.end ?? date ?? null) : null)
        console.log('wip')
    }, [open, date, event])

    const onClose = () => {
        setStart(null)
        setEnd(null)
        void dispatch(
            setCalendarEventModalState({
                open: false,
                date: null,
                event: null,
                mode: 'new',
            }),
        )
    }

    return (
        <BaseDrawer
            title={titleText}
            isOpen={open}
            side="right"
            onClose={onClose}
            footer={
                <div className="flex items-center justify-end gap-2 p-4 w-full">
                    {mode === 'view' && (
                        <Button theme="secondary" onClick={onClose}>
                            Close
                        </Button>
                    )}
                    {mode === 'new' && (
                        <>
                            <Button theme="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button theme="primary">Save</Button>
                        </>
                    )}
                    {mode === 'edit' && (
                        <>
                            <Button theme="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button theme="primary">Save</Button>
                        </>
                    )}
                </div>
            }
        >
            <div className="flex flex-grow flex-col gap-2 w-full h-full">
                {content}
            </div>
        </BaseDrawer>
    )
}

export default CalendarEventDrawer
