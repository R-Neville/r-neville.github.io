export type Theme = 'primary' | 'secondary' | 'outline'

export type Variant = 'normal' | 'active'

const themes: Record<Theme, Record<Variant, string>> = {
    primary: {
        normal: 'bg-primary-500 hover:bg-primary-600 text-primary-50 cursor-pointer border-primary-100/70',
        active: 'bg-primary-600 text-primary-50 cursor-pointer border-primary-100/70',
    },
    secondary: {
        normal: 'bg-primary-50 hover:bg-primary-100 text-primary-800 cursor-pointer border-primary-100/70',
        active: 'bg-primary-100 text-primary-800 cursor-pointer border-primary-100/70',
    },
    outline: {
        normal: 'bg-inherit text-primary-800 border border-primary-600',
        active: 'bg-primary-100 text-primary-800 border border-primary-600',
    },
}

export { themes }
