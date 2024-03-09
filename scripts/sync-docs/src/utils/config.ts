const config = {
  docsPath: '',
}

export function setDocsPath(path: string) {
  config.docsPath = path
}

export function getDocsPath() {
  return config.docsPath
}
