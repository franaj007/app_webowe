def read_graph(filename: str) -> tuple[list[list[int]], int]:
    """
    Odczytuje graf z pliku tekstowego.
    Zwraca listę sąsiedztwa oraz liczbę wierzchołków.
    """
    adjacency_list: list[list[int]] = []
    num_vertices: int = 0

    with open(filename, "r") as file:
        lines = file.read().splitlines()

    num_vertices = int(lines[0])

    for line in lines[1:]:
        if line.strip() == "":
            continue
        parts = list(map(int, line.split()))
        # Pierwszy element to numer wierzchołka, reszta to sąsiedzi
        neighbours = parts[1:]
        adjacency_list.append(neighbours)

    return adjacency_list, num_vertices


def write_neighbours_list(adjacency_list: list[list[int]]) -> None:
    """
    Wypisuje listę sąsiedztwa na ekran w formacie:
    'Sąsiadami wierzchołka X są: a, b, c'
    """
    print("=== Lista sąsiedztwa ===")
    for vertex, neighbours in enumerate(adjacency_list):
        neighbours_str = ", ".join(map(str, neighbours))
        print(f"Sąsiadami wierzchołka {vertex} są: {neighbours_str}")


def list_to_matrix(adjacency_list: list[list[int]]) -> list[list[int]]:
    """
    Przekształca listę sąsiedztwa w macierz sąsiedztwa.
    Zwraca macierz sąsiedztwa jako listę dwuwymiarową.
    """
    n: int = len(adjacency_list)
    matrix: list[list[int]] = [[0] * n for _ in range(n)]

    for vertex, neighbours in enumerate(adjacency_list):
        for neighbour in neighbours:
            matrix[vertex][neighbour] = 1

    return matrix


def write_matrix(matrix: list[list[int]]) -> None:
    """
    Wypisuje macierz sąsiedztwa na ekran.
    """
    n: int = len(matrix)
    print("\n=== Macierz sąsiedztwa ===")

    # Nagłówek kolumn
    header = "    " + "  ".join(str(i) for i in range(n))
    print(header)
    print("   " + "-" * (3 * n))

    # Wiersze macierzy
    for i, row in enumerate(matrix):
        row_str = "  ".join(map(str, row))
        print(f" {i} | {row_str}")


def main() -> None:
    filename: str = "graph.txt"

    adjacency_list, num_vertices = read_graph(filename)

    print(f"Liczba wierzchołków: {num_vertices}\n")

    write_neighbours_list(adjacency_list)

    matrix = list_to_matrix(adjacency_list)

    write_matrix(matrix)


if __name__ == "__main__":
    main()
