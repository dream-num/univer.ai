import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Location', '/guides/sheet/features/thread-comment/introduction')
  res.statusCode = 302 // Temporary redirect
  res.end()

  return { props: {} }
}

export default function Redirect() {
  return null
}
