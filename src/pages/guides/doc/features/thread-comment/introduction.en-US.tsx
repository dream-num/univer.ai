import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Location', '/guides/doc/features/thread-comment')
  res.statusCode = 302 // Temporary redirect
  res.end()

  return { props: {} }
}

export default function Redirect() {
  return null
}
