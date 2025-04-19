export type ModuleType = 'info' | 'components' | 'music'

export const componentViews = [
    'HorizontalVirtualiser',
    'VerticalVirtualiser',
    'Calendar',
    'MutliSelect',
    'Synth',
] as const

export type ComponentView = (typeof componentViews)[number]

export const infoViews = [] as const

export type InfoView = (typeof componentViews)[number]

export const musicViews = [] as const

export type MusicView = (typeof musicViews)[number]

export type ModuleView = 'index' | ComponentView | InfoView | MusicView

export default class ModuleDefinition {
    protected type: ModuleType
    protected view: ModuleView

    constructor(type: ModuleType, view: ModuleView) {
        this.type = type
        if (!this.isValidView(type, view)) {
            this.view = 'index'
        } else {
            this.view = view
        }
    }

    validViews(): ModuleView[] {
        return []
    }

    getType() {
        return this.type
    }

    getView() {
        return this.view
    }

    private isValidView(type: ModuleType, view: ModuleView): view is InfoView {
        switch (type) {
            case 'info':
                return this.checkViews(view, Array.from(infoViews))
            case 'components':
                return this.checkViews(view, Array.from(componentViews))
            case 'music':
                return this.checkViews(view, Array.from(musicViews))
            default:
                return false
        }
    }

    private checkViews(view: ModuleView, checkViews: ModuleView[]): boolean {
        return Object.values(checkViews).some((v) => {
            return typeof view === typeof v
        })
    }
}
