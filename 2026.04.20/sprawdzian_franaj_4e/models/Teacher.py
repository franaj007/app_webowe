__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "franaj 4e"


class Teacher:
    def __init__(self, _id: int, name: str, surname: str) -> None:
        self._id: int = _id
        self.name: str = name
        self.surname: str = surname

    def __str__(self) -> str:
        return f"{self.name} {self.surname}"
