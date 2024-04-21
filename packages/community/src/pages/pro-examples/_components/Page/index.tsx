import CardsContainer from './card/CardsContainer'
import styles from './index.module.less'
import MainContent from './main-content/MainContent'

export default function App() {
  return (
    <main className={styles.app}>
      <MainContent />
      <CardsContainer />
    </main>
  )
}
