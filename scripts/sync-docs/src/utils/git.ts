// clone univer to ./node_modules/.univer/

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

function warpExec(command: string, cwd?: string) {
  execSync(command, { cwd })
}

const git = 'git'

export function syncRepo(univerRepoPath: string) {
  const workPath = path.join(univerRepoPath, '../')

  if (!fs.existsSync(workPath)) {
    fs.mkdirSync(workPath, { recursive: true })
  }

  if (fs.existsSync(univerRepoPath)) {
    warpExec(`${git} pull`, univerRepoPath)
  } else {
    warpExec(`${git} clone --depth 1 -b main git@github.com:dream-num/univer.git ${univerRepoPath}`)
  }
}

export function getCommitHash(univerRepoPath: string) {
  return execSync(`${git} rev-parse HEAD`, { cwd: univerRepoPath }).toString().trim()
}

export function getLastCommitMessage(univerRepoPath: string) {
  return execSync(`${git} log -1 `, { cwd: univerRepoPath }).toString().trim()
}
