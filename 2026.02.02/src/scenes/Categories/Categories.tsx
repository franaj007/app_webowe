import styles from "./Posts.module.scss";
import { useEffect, useState } from "react";
import type { Post } from "../../types/Post/Post.ts";
import { Link } from "react-router";

export default function Posts() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setPosts(json as Array<Post>);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.Posts}>
      {isLoading && <div className={styles.PostsError}>Trwa ładowanie...</div>}
      {isError && (
        <div className={styles.PostsError}>Wystąpił nieoczekiwany błąd!</div>
      )}
      {!isLoading && !isError && (
        <>
          {posts.length === 0 && (
            <div className={styles.PostsError}>Brak wpisów 😭</div>
          )}
          {posts.map((p) => (
            <div className={styles.PostsElement} key={p.id}>
              <h5 className={styles.PostsElementTitle}>{p.title}</h5>
              <p className={styles.PostsElementBody}>
                {p.body.substring(0, 50)}...
              </p>
              <Link
                to={"/wpisy/wpis/" + p.id}
                className={styles.PostsElementLink}
              >
                Przejdź do wpisu
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
