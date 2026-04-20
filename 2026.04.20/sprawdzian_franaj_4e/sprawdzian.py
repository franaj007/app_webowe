__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "franaj 4e"

import datetime
import json
import os

from models.Student import Student
from models.Teacher import Teacher
from models.Subject import Subject
from models.Grades import Grades
from year_grade import year_grade

# Ścieżka do katalogu pakietu (gdzie leżą pliki .txt)
BASE_DIR: str = os.path.dirname(os.path.abspath(__file__))


def load_teachers(filename: str) -> list[Teacher]:
    teachers: list[Teacher] = []
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            _id: int = int(parts[0])
            name: str = parts[1]
            surname: str = parts[2]
            teachers.append(Teacher(_id, name, surname))
    return teachers


def load_subjects(filename: str, teachers: list[Teacher]) -> list[Subject]:
    subjects: list[Subject] = []
    teacher_map: dict[int, Teacher] = {t._id: t for t in teachers}
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            _id: int = int(parts[0])
            name: str = parts[1]
            teacher_id: int = int(parts[2])
            if teacher_id not in teacher_map:
                continue
            subjects.append(Subject(_id, name, teacher_map[teacher_id]))
    return subjects


def load_students(filename: str) -> list[Student]:
    students: list[Student] = []
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            _id: int = int(parts[0])
            first_name: str = parts[1]
            last_name: str = parts[2]
            birthdate_from_file: str = parts[3]
            birth_date: datetime.date = datetime.datetime.strptime(
                birthdate_from_file, '%Y-%m-%d'
            ).date()
            students.append(Student(_id, first_name, last_name, birth_date))
    return students


def load_grades(filename: str, students: list[Student], subjects: list[Subject]) -> list[Grades]:
    grades_list: list[Grades] = []
    student_map: dict[int, Student] = {s._id: s for s in students}
    subject_map: dict[int, Subject] = {s._id: s for s in subjects}
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            student_id: int = int(parts[0])
            subject_id: int = int(parts[1])
            raw_grades: list[str] = parts[2].split(",")

            if student_id not in student_map or subject_id not in subject_map:
                continue

            g = Grades(student_map[student_id], subject_map[subject_id])
            for grade_str in raw_grades:
                g.add_grade(int(grade_str))
            grades_list.append(g)
    return grades_list


def main() -> None:
    teachers: list[Teacher] = load_teachers(os.path.join(BASE_DIR, "teachers.txt"))
    subjects: list[Subject] = load_subjects(os.path.join(BASE_DIR, "subjects.txt"), teachers)
    students: list[Student] = load_students(os.path.join(BASE_DIR, "students.txt"))
    grades: list[Grades] = load_grades(os.path.join(BASE_DIR, "grades.txt"), students, subjects)

    # ─────────────────────────────────────────────
    # Oceny i średnie poszczególnych uczniów
    # ─────────────────────────────────────────────
    print("Oceny i średnie poszczególnych uczniów")

    students_json: list[dict] = []

    for student in students:
        print(f"{student}:")
        student_data: dict = {str(student): {}}

        student_grades: list[Grades] = [g for g in grades if g.student._id == student._id]

        for g in student_grades:
            g_list: list[int] = g.get_grades()
            avg: float = g.get_average()
            final: int = year_grade(avg)
            grades_str: str = ", ".join(map(str, g_list))

            print(f"  {g.subject.name}:")
            print(f"    Oceny: {grades_str}")
            print(f"    Średnia: {avg}")
            print(f"    Ocena końcowa: {final}")

            student_data[str(student)][g.subject.name] = {
                "Oceny": grades_str,
                "Srednia": avg,
                "Ocena roczna": final,
            }

        students_json.append(student_data)
        print()

    # Eksport do students.json
    students_json_path: str = os.path.join(BASE_DIR, "students.json")
    with open(students_json_path, "w", encoding="utf-8") as f:
        json.dump(students_json, f, indent=4, ensure_ascii=False)

    # ─────────────────────────────────────────────
    # Dane przedmiotów
    # ─────────────────────────────────────────────
    print("=" * 50)
    print()

    subjects_json: list[dict] = []

    for subject in subjects:
        # Zbierz wszystkie oceny z tego przedmiotu
        all_grades_for_subject: list[int] = []
        for g in grades:
            if g.subject._id == subject._id:
                all_grades_for_subject.extend(g.get_grades())

        if not all_grades_for_subject:
            continue

        avg: float = round(sum(all_grades_for_subject) / len(all_grades_for_subject), 2)
        grades_str: str = ", ".join(map(str, all_grades_for_subject))

        print(f"{subject.name}:")
        print(f"Nauczyciel: {subject.teacher}")
        print(f"Oceny: {grades_str}")
        print(f"  Średnia: {avg}")
        print()

        subjects_json.append({
            subject.name: {
                "Nauczyciel": str(subject.teacher),
                "Oceny": all_grades_for_subject,
                "Srednia": avg,
            }
        })

    # Eksport do subjects.json
    subjects_json_path: str = os.path.join(BASE_DIR, "subjects.json")
    with open(subjects_json_path, "w", encoding="utf-8") as f:
        json.dump(subjects_json, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    main()
