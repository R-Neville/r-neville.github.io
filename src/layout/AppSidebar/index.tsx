import Button from '#/components/Button'
import Icon from '#/components/Icon'
import icons from '#/icons'
import { setSidebarState, useAppDispatch, useAppSelector } from '#/store'
import React, { FC, useCallback, useEffect, useState } from 'react'

const AppSidebar: FC = () => {
    const dispatch = useAppDispatch()

    const { sidebarState } = useAppSelector((state) => state.config)

    const [width, setWidth] = useState<number>(200)

    const resize = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const { pageX } = event
        const controller = new AbortController()
        const x = pageX

        const onMouseMove = (event: MouseEvent) => {
            const { pageX } = event
            setWidth(Math.min(Math.max(pageX, 200), 500))
        }

        const onMouseUp = () => {
            controller.abort()
        }

        document.addEventListener('mousemove', onMouseMove, controller)
        document.addEventListener('mouseup', onMouseUp, controller)
    }, [])

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            const width = document.body.clientWidth
            if (sidebarState.float && width > 700) {
                void dispatch(
                    setSidebarState({ ...sidebarState, float: false }),
                )
            } else if (!sidebarState.float && width <= 700) {
                void dispatch(setSidebarState({ ...sidebarState, float: true }))
            }
        })

        observer.observe(document.body)

        return () => {
            observer.disconnect()
        }
    }, [dispatch, sidebarState])

    if (!sidebarState.open) {
        return <></>
    }

    let dynamicClassNames = 'w-[200px]'
    if (sidebarState.float) {
        dynamicClassNames = 'absolute w-full z-[999]'
    }

    return (
        <div
            className={`relative flex flex-col h-full border-r border-r-primary-100 bg-primary-50 text-primary-800 ${dynamicClassNames} select-none`}
            style={{
                width: `${width}px`,
            }}
        >
            <div
                className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary-100"
                onMouseDown={resize}
            ></div>
            <div className="flex items-center justify-between p-4">
                <div className="text-lg">Projects</div>
                {sidebarState.float && (
                    <Button
                        theme="secondary"
                        variant="normal"
                        onClick={() => {
                            void dispatch(
                                setSidebarState({
                                    ...sidebarState,
                                    open: false,
                                }),
                            )
                        }}
                    >
                        <Icon icon={icons.times} />
                    </Button>
                )}
            </div>
            <div className="flex flex-col p-4">
                Nothing to show here yet... Stay tuned!
            </div>
        </div>
    )
}

export default AppSidebar
