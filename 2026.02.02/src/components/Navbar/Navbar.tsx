import styles from './Navbar.module.scss'
import {Link} from "react-router";

export default function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <ul className={styles.NavbarHolder}>
        <li>
          <Link to="/" className={styles.NavbarHolderLink}>Strona główna</Link>
        </li>
        <li>
          <Link to="/wpisy" className={styles.NavbarHolderLink}>Wpisy</Link>
        </li>
        <li>
          <Link to="/kontakt" className={styles.NavbarHolderLink}>Kontakt</Link>
        </li>
      </ul>
    </nav>
  )
}
