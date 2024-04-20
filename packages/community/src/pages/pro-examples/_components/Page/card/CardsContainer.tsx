// CardsContainer.tsx
import React from 'react'
import type { CardProps } from './Card'
import Card from './Card'
import './CardsContainer.css' // Make sure to create a corresponding CSS file

interface CardContainerProps {
  title: string
  data: CardProps[]
}

const cardsDataSheets = [
  {
    title: 'Sheets Collaboration',
    url: './sheets-collaboration/',
    description: 'Create and share spreadsheets with our Sheets feature.',
    img: '/pro-examples/pro-examples-sheets-collaboration.gif',
  },
  {
    title: 'Sheets Collaboration Playground',
    url: './sheets-collaboration-playground/',
    description: 'An interesting playground to demonstrate the process of Sheets Collaboration.',
    img: '/pro-examples/pro-examples-sheets-collaboration-playground.gif',
  },
  {
    title: 'Sheets Import/Export',
    url: './sheets-exchange/',
    description: 'Powerful import and export service, supports xlsx files.',
    img: '/pro-examples/pro-examples-sheets-exchange.gif',
  },
  {
    title: 'Sheets Print',
    url: './sheets-print/',
    description: 'Experience high-definition printing capabilities.',
    img: '/pro-examples/pro-examples-sheets-print.gif',
  },
]

const cardsDataDocs = [
  {
    title: 'Docs Collaboration',
    url: './docs-collaboration/',
    description: 'Create and share documents with our Docs feature.',
    img: '/pro-examples/pro-examples-docs-collaboration.gif',
  },
  {
    title: 'Docs Collaboration Playground',
    url: './docs-collaboration-playground/',
    description: 'An interesting playground to demonstrate the process of Docs Collaboration.',
    img: '/pro-examples/pro-examples-docs-collaboration-playground.gif',
  },
]

const CardsContainer: React.FC<CardContainerProps> = ({ title, data }) => {
  return (
    <div className="cards-container-content">
      <h2 className="cards-title">{title}</h2>

      <div className="cards-container">
        {data.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} url={card.url} img={card.img} />
        ))}
      </div>
    </div>

  )
}
const CardsContainerContent: React.FC = () => {
  return (
    <div className="cards-container-outer">
      <CardsContainer title="Univer Sheets" data={cardsDataSheets} />
      <CardsContainer title="Univer Docs" data={cardsDataDocs} />
    </div>

  )
}

export default CardsContainerContent
