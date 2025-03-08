import ButtonLink from '#/components/shared/ButtonLink'
import { FC } from 'react'

const SplashView: FC = () => {
    return (
        <div className="flex flex-col items-center gap-4 w-full p-4 text-center text-primary-800">
            <div className="text-[50px]">hi 👋</div>
            <div className="text-xl">
                It's R-Neville here, and this is my portfolio site!
            </div>
            <div className="text-xl">
                I'm a full-stack TypeScript and PHP developer based in Brisbane.
            </div>
            <ButtonLink href="https://www.linkedin.com/in/r-neville/">
                Wanna Connect?
            </ButtonLink>
        </div>
    )
}

export default SplashView
