import { GithubSingle24 } from '@univerjs/icons'
import './MainContent.css' // Make sure to create a corresponding CSS file

export default function MainContent() {
  return (
    <div className="main-content">
      <h1 className="main-content__title">Univer Examples<span className="main-content__title_emoji"><img src="/examples/game.png" alt="univer examples" /></span></h1>
      <p className="main-content__description">
      Rich Examples and guidance demonstrate Univer&apos;s various powerful capabilities, helping you quickly find the functions you want.
      </p>
      <div className="main-content__buttons">
      <a className="main-content__button main-content__button--started" href="https://univer.ai/guides/introduction/" title="get started">Get started</a>
        <a className="main-content__button main-content__button--github" href="https://github.com/dream-num/univer" title="github">
        <GithubSingle24 className="main-content__github-icon" />
          <span className="main-content__github-content">GitHub</span>
        </a>
      </div>
    </div>
  )
}
