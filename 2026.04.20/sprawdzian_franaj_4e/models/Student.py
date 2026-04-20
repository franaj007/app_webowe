__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "franaj 4e"

import datetime


class Student:
    def __init__(self, _id: int, first_name: str, last_name: str, birth_date: datetime.date) -> None:
        self._id: int = _id
        self.first_name: str = first_name
        self.last_name: str = last_name
        self.birth_date: datetime.date = birth_date

    @property
    def age(self) -> int:
        return datetime.date.today().year - self.birth_date.year

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name} ({self.age})"
