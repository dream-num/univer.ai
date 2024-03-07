// clone univer to ./node_modules/.univer/
// and install dependencies

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

function warpExec(command, cwd = undefined) {
  execSync(command, { cwd }, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(stdout)
    console.error(stderr)
  })
}
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const workPath = path.join(__dirname, '../', 'node_modules/.univer/')
const univerRepoPath = path.join(workPath, './repo/')
const git = 'git'
const pnpm = 'pnpm'

if (!fs.existsSync(workPath)) {
  fs.mkdirSync(workPath, { recursive: true })
}

if (fs.existsSync(univerRepoPath)) {
  warpExec(`${git} pull`, univerRepoPath)
} else {
  warpExec(`${git} clone --depth 1 -b main git@github.com:dream-num/univer.git ${univerRepoPath}`)
}

warpExec(`${pnpm} install --ignore-scripts  `, univerRepoPath)
