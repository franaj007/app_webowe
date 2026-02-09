export interface Post {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
}

export const BLOG_POSTS: Post[] = [
  {
    id: 1,
    title: "Przyszłość Frontendu w 2026 roku",
    category: "Technologia",
    date: "09.02.2026",
    excerpt:
      "Sztuczna inteligencja zmienia sposób, w jaki piszemy komponenty. Czy React nadal będzie królem?",
    content:
      "W 2026 roku granica między designem a kodem niemal zanikła. Dzięki nowym narzędziom AI, generowanie szkieletów aplikacji w React 19 stało się standardem. W tym artykule przyjrzymy się, jak ewoluowały Server Components...",
    author: "Jan Kowalski",
  },
  {
    id: 2,
    title: "Dlaczego minimalizm w UI to nie tylko moda?",
    category: "Design",
    date: "05.02.2026",
    excerpt:
      "Mniej znaczy więcej. Dowiedz się, jak ograniczenie elementów poprawia konwersję i satysfakcję użytkownika.",
    content:
      "Kiedy patrzymy na najpopularniejsze aplikacje dzisiejszych czasów, zauważamy jeden wspólny mianownik: przestrzeń. Whitespace przestał być 'pustym miejscem', a stał się kluczowym elementem nawigacji...",
    author: "Anna Nowak",
  },
  {
    id: 3,
    title: "SCSS vs CSS-in-JS: Ostateczne starcie",
    category: "Programowanie",
    date: "01.02.2026",
    excerpt:
      "Mimo upływu lat, SCSS trzyma się mocno. Sprawdzamy, dlaczego moduły SCSS są nadal świetnym wyborem.",
    content:
      "Złożoność nowoczesnych systemów designu wymaga narzędzi, które są przewidywalne i wydajne. SCSS oferuje złoty środek między czystym CSS a pełną dynamiką JavaScriptu...",
    author: "Piotr Programista",
  },
];
