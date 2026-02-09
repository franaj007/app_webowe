import styles from './Home.module.scss'

export default function Home() {
  return(
    <div className={styles.HomeStyle}>
        <h1>Epstein Island wita Cię użytkowniku!</h1>
        <h2>Zobacz naszą ofertę:</h2>
        <ul>
            <li>Wypoczynek na plaży</li>
            <li>Imprezy z dobrą muzyką</li>
            <li>Escape room w kuchni</li>
            <li>Masaże tajskie i polskie</li>
        </ul>

  </div>
  )
}
