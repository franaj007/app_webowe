class Student {
    constructor(name, email, password, liczbaKolejek, isStudent) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.liczbaKolejek = liczbaKolejek;
        this.isStudent;
    }
}
let student = new Student("Ryszard", "ciuchcia@gej.pl", "Kocham dzieci i lokomotywy", 123, true);

function greet(userName) {
    console.log("Siemaneczko, " + userName + "!");
}
greet(student.name);
console.log(`Haslo uzytkownika ${student.name}: ${student.password}`);

for (let i = 1; i <= 5; i++) {
    if (student.liczbaKolejek < 1) {
        student.isStudent = false;
    }
    else if (student.liczbaKolejek > 5) {
        delete student.isStudent;
        student.isPrincipal = true
    }
}
console.log(`Czy ${student.name} jest studentem: ${student.isStudent}`);
console.log(`Czy ${student.name} jest dyrektorem: ${student.isPrincipal}`);