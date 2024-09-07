/// <reference types="@univerjs/webpack-plugin/types" />

module '*.mdx' {
  const content: React.FC
  export default content
}

module '*.txt' {
  const content: string
  export default content
}

interface Error {
}
