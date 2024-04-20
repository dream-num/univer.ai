// CardsContainer.tsx
import React from 'react'
import Card from './Card'
import './CardsContainer.css' // Make sure to create a corresponding CSS file

const cardsData = [
  {
    title: 'Sheets',
    url: './sheets/',
    description: 'Create and edit spreadsheets with our Sheets feature.',
    img: '/examples/examples-sheets.gif',
  },
  {
    title: 'Sheets Multi',
    url: './sheets-multi/',
    description: 'Manage multiple sheets in one unified view with Sheets Multi.',
    img: '/examples/examples-sheets-multi.gif',
  },
  {
    title: 'Sheets Uniscript',
    url: './sheets-uniscript/',
    description: 'Powerful scripting capabilities with Sheets Uniscript.',
    img: '/examples/examples-sheets-uniscript.gif',
  },
  {
    title: 'Sheets Big Data',
    url: './sheets-big-data/',
    description: 'Large data volume Univer Sheets, a table containing 10,000,000 cell data.',
    img: '/examples/examples-sheets-big-data.gif',
  },
  {
    title: 'Docs',
    url: './docs/',
    description: 'Create and edit documents with our Docs feature.',
    img: '/examples/examples-docs.gif',
  },
  {
    title: 'Docs Multi',
    url: './docs-multi/',
    description: 'Manage multiple docs in one unified view with Docs Multi.',
    img: '/examples/examples-docs-multi.gif',
  },
  {
    title: 'Docs Uniscript',
    url: './docs-uniscript/',
    description: 'Powerful scripting capabilities with Docs Uniscript.',
    img: '/examples/examples-docs-uniscript.gif',
  },
  {
    title: 'Docs Big Data',
    url: './docs-big-data/',
    description: 'Large data volume Univer Docs, a document containing 1,000,000 characters.',
    img: '/examples/examples-docs-big-data.gif',
  },
  {
    title: 'Slides',
    url: './slides/',
    description: 'Create and edit presentations with our Slides feature.',
    img: '/examples/examples-slides.gif',
  },
]

const CardsContainer: React.FC = () => {
  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} url={card.url} img={card.img} />
      ))}
    </div>
  )
}

export default CardsContainer
