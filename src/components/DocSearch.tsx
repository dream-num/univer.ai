/* eslint-disable node/prefer-global/process */
import { DocSearch } from '@docsearch/react'
import '@docsearch/css'
import { useRouter } from 'next/router'

function DocSearchComponent() {
  const { locale } = useRouter()

  return (
    <DocSearch
      appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''}
      apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''}
      indexName="univer"
      searchParameters={{
        facetFilters: [[`lang:en`, `lang:${locale}`]],
      }}
    />
  )
}

export default DocSearchComponent
