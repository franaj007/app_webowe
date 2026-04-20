"""
Matura 2018 - Zadanie 4. WEGA
Plik wejściowy: sygnaly.txt (1000 wierszy, każdy to słowo z wielkich liter)
Plik wyjściowy: wyniki4.txt
"""

import sys

def wczytaj_slowa(nazwa_pliku):
    """Wczytuje słowa z pliku, jedno słowo na wiersz."""
    with open(nazwa_pliku, encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]


def zadanie_4_1(slowa):
    """
    Zadanie 4.1.
    Po złączeniu dziesiątych liter co czterdziestego słowa
    (zaczynając od słowa czterdziestego, indeksowanie od 1)
    otrzymujemy przesłanie.
    Każde co czterdzieste słowo ma co najmniej 10 znaków.
    """
    wynik = ""
    # Słowo czterdzieste = indeks 39 (0-based), następne: 79, 119, ...
    for i in range(39, len(slowa), 40):
        # dziesiąta litera = indeks 9 (0-based)
        wynik += slowa[i][9]
    return wynik


def zadanie_4_2(slowa):
    """
    Zadanie 4.2.
    Znajdź słowo z największą liczbą różnych liter.
    Przy remisie – pierwsze z pliku.
    Zwraca: (słowo, liczba_różnych_liter)
    """
    najlepsze_slowo = slowa[0]
    najlepsza_liczba = len(set(slowa[0]))

    for slowo in slowa[1:]:
        liczba = len(set(slowo))
        if liczba > najlepsza_liczba:
            najlepsza_liczba = liczba
            najlepsze_slowo = slowo

    return najlepsze_slowo, najlepsza_liczba


def zadanie_4_3(slowa):
    """
    Zadanie 4.3.
    Wypisz wszystkie słowa, w których każde dwie litery są oddalone
    w alfabecie co najwyżej o 10.
    Odległość = |ord(a) - ord(b)|.
    Słowa w kolejności z pliku.
    """
    wyniki = []
    for slowo in slowa:
        wartosci = [ord(c) for c in slowo]
        max_val = max(wartosci)
        min_val = min(wartosci)
        if max_val - min_val <= 10:
            wyniki.append(slowo)
    return wyniki


def main():
    # Można uruchomić z argumentem: python zadanie4.py przyklad.txt
    if len(sys.argv) > 1:
        plik_wejsciowy = sys.argv[1]
    else:
        plik_wejsciowy = "Dane_PR2/sygnaly.txt"

    slowa = wczytaj_slowa(plik_wejsciowy)

    wynik_4_1 = zadanie_4_1(slowa)
    wynik_4_2_slowo, wynik_4_2_liczba = zadanie_4_2(slowa)
    wynik_4_3 = zadanie_4_3(slowa)

    with open("wyniki4.txt", "w", encoding="utf-8") as out:
        out.write("4.1\n")
        out.write(wynik_4_1 + "\n")
        out.write("\n")

        out.write("4.2\n")
        out.write(f"{wynik_4_2_slowo} {wynik_4_2_liczba}\n")
        out.write("\n")

        out.write("4.3\n")
        for s in wynik_4_3:
            out.write(s + "\n")

    print("Gotowe! Wyniki zapisano do wyniki4.txt")
    print(f"\n4.1: {wynik_4_1}")
    print(f"4.2: {wynik_4_2_slowo} {wynik_4_2_liczba}")
    print(f"4.3: {len(wynik_4_3)} słów spełnia warunek")


if __name__ == "__main__":
    main()
