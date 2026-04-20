"""
Zadanie 2 – Import i mapowanie danych w języku Python
Pliki wejściowe: students.txt, courses.txt
Dla każdego studenta generowany jest plik imię_nazwisko.txt
"""

import os
import sys
from dataclasses import dataclass, field


@dataclass
class Course:
    name: str

    def __str__(self) -> str:
        return self.name


@dataclass
class Student:
    id: int
    first_name: str
    last_name: str
    age: int
    courses: list[Course] = field(default_factory=list)

    def __str__(self) -> str:
        kursy = ", ".join(str(c) for c in self.courses) if self.courses else "brak kursów"
        return f"{self.first_name} {self.last_name} ({self.age} lat): {kursy}"

    def save_courses_file(self, output_dir: str = ".") -> None:
        """Zapisuje listę kursów do pliku imię_nazwisko.txt"""
        filename = f"{self.first_name.lower()}_{self.last_name.lower()}.txt"
        filepath = os.path.join(output_dir, filename)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write("Kursy:\n")
            for i, course in enumerate(self.courses):
                if i < len(self.courses) - 1:
                    f.write(f"- {course.name},\n")
                else:
                    f.write(f"- {course.name}\n")


def load_students(filepath: str) -> dict[int, Student]:
    """Wczytuje studentów z pliku CSV: id,imię,nazwisko,wiek"""
    students: dict[int, Student] = {}
    with open(filepath, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(",")
            student_id = int(parts[0])
            first_name = parts[1].strip()
            last_name = parts[2].strip()
            age = int(parts[3])
            students[student_id] = Student(
                id=student_id,
                first_name=first_name,
                last_name=last_name,
                age=age,
            )
    return students


def load_courses(filepath: str, students: dict[int, Student]) -> None:
    """Wczytuje kursy z pliku CSV i przypisuje je do studentów: id_studenta,nazwa_kursu"""
    with open(filepath, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split(",", 1)
            student_id = int(parts[0])
            course_name = parts[1].strip()
            if student_id in students:
                students[student_id].courses.append(Course(name=course_name))


def main() -> None:
    # Domyślna ścieżka do folderu z danymi
    data_dir = "Python - zadanie 2"

    # Można podać jako argument: python zadanie2.py <ścieżka_do_folderu>
    if len(sys.argv) > 1:
        data_dir = sys.argv[1]

    students_file = os.path.join(data_dir, "students.txt")
    courses_file = os.path.join(data_dir, "courses.txt")
    output_dir = os.path.join(data_dir, "wyniki")

    os.makedirs(output_dir, exist_ok=True)

    # Wczytaj dane
    students = load_students(students_file)
    load_courses(courses_file, students)

    # Wypisz dane na ekran i generuj pliki
    print("=" * 50)
    print("Lista studentów i ich kursów:")
    print("=" * 50)
    for student in students.values():
        print(student)
        student.save_courses_file(output_dir=output_dir)

    print("=" * 50)
    print(f"Pliki kursów zapisano w folderze: {output_dir}/")


if __name__ == "__main__":
    main()
