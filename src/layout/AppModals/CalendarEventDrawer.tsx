import BaseDrawer from '#/components/BaseDrawer'
import Button from '#/components/Button'
import DateInput from '#/components/DateInput'
import TextInput from '#/components/TextInput'
import TimePicker from '#/components/TimePicker'
import { useAppDispatch, useAppSelector } from '#/store'
import {
    addCalendarEvent,
    setEventEnd,
    setEventStart,
    setEventTitle,
} from '#/store/components'
import { setCalendarEventDrawerState } from '#/store/components/thunks/setCalendarEventDrawerState'
import { DateTime } from 'luxon'
import { FC, useMemo } from 'react'

const CalendarEventDrawer: FC = () => {
    const dispatch = useAppDispatch()

    const { eventModalState } = useAppSelector(
        (state) => state.components.calendar,
    )

    const { mode, open, event } = eventModalState

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
                    value={event?.title}
                    onChange={(value) => {
                        void dispatch(setEventTitle(value))
                    }}
                />
                <DateInput
                    label="Date"
                    value={event?.start ?? DateTime.now()}
                    onChange={(value) => {
                        const newStart = value.set({
                            hour: event?.start?.hour,
                            minute: event?.start?.minute,
                        })
                        void dispatch(setEventStart(newStart))
                        const newEnd = value.set({
                            hour: event?.end?.hour,
                            minute: event?.end?.minute,
                        })
                        void dispatch(setEventEnd(newEnd))
                    }}
                />
                <TimePicker
                    label="Start"
                    value={event?.start ?? DateTime.now()}
                    onChange={(value) => {
                        const newStart = event?.start?.set({
                            hour: value?.hour,
                            minute: value?.minute,
                        })
                        if (newStart) {
                            void dispatch(setEventStart(newStart))
                        }
                    }}
                />
                <TimePicker
                    label="End"
                    value={event?.end ?? DateTime.now()}
                    onChange={(value) => {
                        const newEnd = event?.end?.set({
                            hour: value?.hour,
                            minute: value?.minute,
                        })
                        if (newEnd) {
                            void dispatch(setEventEnd(newEnd))
                        }
                    }}
                />
            </div>
        )
    }, [dispatch, event?.end, event?.start, event?.title])

    const onClose = () => {
        void dispatch(
            setCalendarEventDrawerState({
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
                    <>
                        <Button theme="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            theme="primary"
                            onClick={() => {
                                if (
                                    event?.start &&
                                    event?.end &&
                                    event?.start < event?.end
                                ) {
                                    void dispatch(addCalendarEvent(event)).then(
                                        () => {
                                            onClose()
                                        },
                                    )
                                }
                            }}
                        >
                            Save
                        </Button>
                    </>
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
