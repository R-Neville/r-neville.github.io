import ButtonLink from '#/components/ButtonLink'
import ViewWrapper from '#/components/ViewWrapper'
import { FC } from 'react'

const IndexView: FC = () => {
    return (
        <ViewWrapper>
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="text-[50px]">hi 👋</div>
                <div className="text-xl">
                    It's R-Neville here, and this is my portfolio site!
                </div>
                <div className="text-xl">
                    I'm a full-stack TypeScript and PHP developer based in
                    Brisbane.
                </div>
                <ButtonLink
                    newTab
                    theme="secondary"
                    href="https://www.linkedin.com/in/r-neville/"
                >
                    <div className="px-1">Wanna Connect?</div>
                </ButtonLink>
            </div>
        </ViewWrapper>
    )
}

export default IndexView
