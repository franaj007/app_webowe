__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "franaj 4e"

from .Student import Student
from .Subject import Subject


class Grades:
    def __init__(self, student: Student, subject: Subject) -> None:
        self.grades: list[int] = []
        self.student: Student = student
        self.subject: Subject = subject

    def add_grade(self, grade: int) -> None:
        if grade < 1 or grade > 6:
            raise ValueError("Grade must be between 1 and 6")
        self.grades.append(grade)

    def get_grades(self) -> list[int]:
        return self.grades

    def get_average(self) -> float:
        if not self.grades:
            return 0.0
        return round(sum(self.grades) / len(self.grades), 2)
