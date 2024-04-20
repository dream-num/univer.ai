// MainContent.tsx
import { GithubSingle24 } from '@univerjs/icons'
import React from 'react'
import './MainContent.css' // Make sure to create a corresponding CSS file

const MainContent: React.FC = () => {
  return (
    <div className="main-content">
      <h1 className="main-content__title">Univer <span className="main-content__title_center">Pro</span> Examples<span className="main-content__title_emoji"><img src="/pro-examples/game.png" alt="univer pro examples" /></span></h1>
      <p className="main-content__description">
        Pro subscribers have access to advanced examples and guides that can be used as a starting point or inspiration for building node-based UIs.
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

export default MainContent
