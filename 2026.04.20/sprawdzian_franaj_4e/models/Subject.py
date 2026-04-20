__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "franaj 4e"

from .Teacher import Teacher


class Subject:
    def __init__(self, _id: int, name: str, teacher: Teacher) -> None:
        self._id: int = _id
        self.name: str = name
        self.teacher: Teacher = teacher

    def __str__(self) -> str:
        return f"{self.name} {self.teacher}"
