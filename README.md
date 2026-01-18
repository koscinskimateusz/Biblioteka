
# 📚 Biblioteka - System Zarządzania Biblioteką

## 1. Wprowadzenie

### Opis projektu
**Biblioteka** to pełnostackowa aplikacja webowa do zarządzania biblioteką. System umożliwia katalogowanie książek, zarządzanie czytelnikami oraz śledzenie wypożyczeń.

### Cel aplikacji
Aplikacja ma na celu usprawnienie pracy biblioteki poprzez:
- Cyfrowe zarządzanie katalogiem książek
- Rejestrację i zarządzanie czytelnikami
- Automatyczne śledzenie wypożyczeń i zwrotów

### Kluczowe funkcje
- 📖 **Zarządzanie książkami** - dodawanie, edycja, usuwanie, paginacja
- 👥 **Zarządzanie czytelnikami** - rejestracja nowych czytelników
- 📋 **System wypożyczeń** - wypożyczanie i zwrot książek
- 🔐 **Autoryzacja JWT** - bezpieczny dostęp do systemu

---

## 2. Wykorzystane technologie

### Frontend
| Technologia | Wersja | Opis |
|-------------|--------|------|
| Vue.js | 3.5.x | Framework JavaScript |
| Vue Router | 4.6.x | Routing SPA |
| Axios | 1.13.x | Klient HTTP |
| Vite | 7.x | Build tool |
| TypeScript | 5.9.x | Typowanie statyczne |

### Backend
| Technologia | Wersja | Opis |
|-------------|--------|------|
| NestJS | 11.x | Framework Node.js |
| TypeORM | 0.3.x | ORM dla bazy danych |
| PostgreSQL | - | Baza danych |
| Passport + JWT | - | Autoryzacja |
| bcrypt | 6.x | Hashowanie haseł |

---

## 3. Wymagania i instalacja

### Wymagania wstępne
- **Node.js** v20.19.0+ lub v22.12.0+
- **PostgreSQL** (lokalnie lub Docker)
- **npm** lub **yarn**

### Klonowanie repozytorium
```
git clone https://github.com/koscinskimateusz/Biblioteka.git
cd Biblioteka
```

### Instalacja zależności

**Backend:**
```
cd backend
npm install
```

**Frontend:**
```
cd frontend
npm install
```

---

## 4. Instrukcje użytkowania

### Opcja A: Uruchomienie przez Docker

**Wymagania:**
- Docker Desktop zainstalowany i uruchomiony

**1. Utwórz plik `.env` w katalogu głównym projektu:**
```
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydatabase
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
DATABASE_NAME=mydatabase
```

**2. Uruchom wszystkie kontenery:**
```
docker-compose up --build
```

**3. Dostęp do aplikacji:**
- Aplikacja: `http://localhost` (port 80)
- API Backend: `http://localhost/api`

**Architektura Docker:**
| Serwis | Kontener | Port wewnętrzny | Opis |
|--------|----------|-----------------|------|
| postgres | my_project_db | 5432 | Baza danych PostgreSQL |
| backend | my_project_backend | 3000 | API NestJS |
| frontend | my_project_frontend | 5173 | Aplikacja Vue |
| nginx | my_project_gateway | 80 | Reverse proxy |

**Zatrzymanie kontenerów:**
```
docker-compose down
```

**Zatrzymanie z usunięciem danych:**
```
docker-compose down -v
```

---

### Opcja B: Uruchomienie bez Docker

**Wymagania:**
- Node.js v20.19.0+ lub v22.12.0+
- PostgreSQL zainstalowany lokalnie

### Konfiguracja bazy danych
Utwórz bazę PostgreSQL i skonfiguruj zmienne środowiskowe:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
DATABASE_NAME=mydatabase
```
Dodaj ręcznie użytkownika, aby móc się zalogować:
Dla Windows (PowerShell):

```
Invoke-RestMethod -Method Post -Uri "http://localhost/api/auth/register" -ContentType "application/json" -Body '{"username": "admin", "password": "admin123"}'
```

Dla Git Bash / Linux / Mac (cURL):

```
curl -X POST http://localhost/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"username": "admin", "password": "admin123"}'
```

---

**1. Backend (port 3000):**
```
cd backend
npm install
npm run start:dev
```

**2. Frontend (port 5173):**
```
cd frontend
npm install
npm run dev
```

**3. Dostęp do aplikacji:**
- Frontend: `http://localhost:5173`
- API Backend: `http://localhost:3000`

---

### Interfejs użytkownika

| Widok | Ścieżka | Opis |
|-------|---------|------|
| Lista książek | `/` | Strona główna z listą książek |
<img width="2880" height="1475" alt="Zrzut ekranu 2026-01-18 135327" src="https://github.com/user-attachments/assets/cd9284c2-f6a6-4fa8-8b22-5cca70c004a9" />
| Formularz książki | `/books/new` | Dodawanie nowej książki |
<img width="2880" height="1475" alt="Zrzut ekranu 2026-01-18 135539" src="https://github.com/user-attachments/assets/4e4f43eb-c9db-41db-802f-77669b24fe05" />
| Edycja książki | `/books/:id/edit` | Edycja istniejącej książki |
<img width="2880" height="1475" alt="Zrzut ekranu 2026-01-18 135749" src="https://github.com/user-attachments/assets/e7e0dbd1-e435-4db1-8702-cfdfd25bb257" />
| Czytelnicy | `/readers` | Lista czytelników |
<img width="2880" height="1475" alt="Zrzut ekranu 2026-01-18 135839" src="https://github.com/user-attachments/assets/c37e504a-4f7e-453c-b345-540a3216b3bf" />
| Nowy czytelnik | `/readers/new` | Dodawanie czytelnika |
<img width="2879" height="1478" alt="Zrzut ekranu 2026-01-18 135909" src="https://github.com/user-attachments/assets/ee9d5697-0458-4736-8ec2-824140eec463" />
| Wypożyczenia | `/loans` | Lista wypożyczeń |
<img width="2879" height="1477" alt="Zrzut ekranu 2026-01-18 153930" src="https://github.com/user-attachments/assets/d05626b3-6e07-4950-9d62-06c7ad89005e" />
| Logowanie | `/login` | Panel logowania |
<img width="2880" height="1476" alt="Zrzut ekranu 2026-01-18 135129" src="https://github.com/user-attachments/assets/99912140-3746-4b37-a461-edaec591751a" />

## 5. Kod i konfiguracja

### Repozytorium GitHub
```
https://github.com/koscinskimateusz/Biblioteka

```

### Domyślna konfiguracja bazy danych
```
// backend/src/app.module.ts
TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'myuser',
    password: process.env.DATABASE_PASSWORD || 'mypassword',
    database: process.env.DATABASE_NAME || 'mydatabase',
    synchronize: true, // Tylko dla developmentu!
})
```

---

## 6. Funkcje

### Główne funkcjonalności

| Funkcja | Opis | Autoryzacja |
|---------|------|-------------|
| Przeglądanie książek | Lista z paginacją | ❌ Nie wymagana |
| Dodawanie książek | Formularz z walidacją ISBN | ✅ Wymagana |
| Edycja/Usuwanie książek | Modyfikacja katalogu | ✅ Wymagana |
| Zarządzanie czytelnikami | CRUD czytelników | ✅ Wymagana |
| Wypożyczenia | Rejestracja i zwrot | ✅ Wymagana |
| Logowanie | Autoryzacja JWT | - |

### Zaawansowane funkcje
- **Paginacja** - wydajne ładowanie dużych list
- **Walidacja ISBN** - unikalne numery ISBN
- **Automatyczne daty** - `createdAt`, `updatedAt`
- **Kaskadowe usuwanie** - relacje między encjami

---

## 7. Struktura kodu

### Model danych (ERD)


<img width="2192" height="893" alt="Zrzut ekranu 2026-01-18 154723" src="https://github.com/user-attachments/assets/91fb20f9-4f8d-40f1-8c5e-006e176b9dba" />



### Struktura katalogów

```
Biblioteka/
├── backend/
│   └── src/
│       ├── auth/              # Moduł autoryzacji
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── jwt.strategy.ts
│       │   └── jwt-auth.guard.ts
│       ├── books/             # Moduł książek
│       │   ├── books.controller.ts
│       │   ├── books.service.ts
│       │   └── dto/
│       ├── readers/           # Moduł czytelników
│       ├── loans/             # Moduł wypożyczeń
│       ├── users/             # Moduł użytkowników
│       ├── entities/          # Encje TypeORM
│       │   ├── book.entity.ts
│       │   ├── reader.entity.ts
│       │   ├── loan.entity.ts
│       │   └── user.entity.ts
│       └── app.module.ts      # Główny moduł
├── frontend/
│   └── src/
│       ├── views/             # Komponenty widoków
│       │   ├── BooksList.vue
│       │   ├── BookForm.vue
│       │   ├── ReadersList.vue
│       │   ├── LoansList.vue
│       │   └── LoginView.vue
│       ├── router/            # Konfiguracja routingu
│       ├── App.vue            # Główny komponent
│       └── main.ts            # Punkt wejścia
```

### Opis głównych elementów

#### Encje (Models)

**Book Entity** - reprezentuje książkę w systemie:
```
// backend/src/entities/book.entity.ts
@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;                    // Unikalny identyfikator UUID

    @Column()
    title: string;                 // Tytuł książki

    @Column()
    author: string;                // Autor książki

    @Column({ unique: true })
    isbn: string;                  // Unikalny numer ISBN

    @Column({ default: 1 })
    availableCount: number;        // Liczba dostępnych egzemplarzy

    @OneToMany(() => Loan, loan => loan.book)
    loans: Loan[];                 // Relacja 1:N z wypożyczeniami
}
```

**Loan Entity** - reprezentuje wypożyczenie:
```
// backend/src/entities/loan.entity.ts
@Entity()
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    borrowedAt: Date;              // Data wypożyczenia

    @Column({ type: 'timestamp', nullable: true })
    returnedAt: Date;              // Data zwrotu (null = nie zwrócono)

    @ManyToOne(() => Book, book => book.loans, { onDelete: 'CASCADE' })
    book: Book;                    // Relacja N:1 z książką

    @ManyToOne(() => Reader, reader => reader.loans, { onDelete: 'CASCADE' })
    reader: Reader;                // Relacja N:1 z czytelnikiem
}
```

#### Kontrolery (Controllers)

**BooksController** - obsługuje żądania HTTP dla książek:
```
// backend/src/books/books.controller.ts
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    // GET /books - pobiera listę książek z paginacją
    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number) {
        return this.booksService.findAll(
            page ? Number(page) : 1,
            limit ? Number(limit) : 10
        );
    }

    // POST /books - tworzy nową książkę (wymaga autoryzacji)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    // DELETE /books/:id - usuwa książkę (wymaga autoryzacji)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.remove(id);
    }
}
```

#### Widoki (Views)

**LoginView** - komponent logowania:
```
<!-- frontend/src/views/LoginView.vue -->
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const router = useRouter();

// Obsługa logowania
const handleLogin = async () => {
  try {
    // Wysłanie żądania POST do API
    const res = await axios.post('/auth/login', {
      username: username.value,
      password: password.value
    });

    // Zapis tokenu JWT w localStorage
    localStorage.setItem('token', res.data.access_token);

    // Przekierowanie na stronę główną
    router.push('/');
  } catch (err) {
    error.value = "Błędny login lub hasło";
  }
};
</script>
```

#### Guard autoryzacji

**JwtAuthGuard** - chroni endpointy wymagające autoryzacji:
```
// Użycie w kontrolerze
@UseGuards(JwtAuthGuard)  // Dekorator sprawdzający token JWT
@Post()
create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
}
```

---

## 8. Wdrożenie

### Przygotowanie do produkcji

**Backend:**
```
cd backend
npm run build
npm run start:prod
```

**Frontend:**
```
cd frontend
npm run build
# Pliki statyczne w katalogu dist/
```

### Zmienne środowiskowe produkcyjne

```
# Backend
DATABASE_HOST=your-production-host
DATABASE_PORT=5432
DATABASE_USER=prod_user
DATABASE_PASSWORD=secure_password
DATABASE_NAME=biblioteca_prod
JWT_SECRET=your-secure-jwt-secret

# WAŻNE: Ustaw synchronize na false w produkcji!
```

### Konfiguracja produkcyjna TypeORM
```
TypeOrmModule.forRoot({
    // ...
    synchronize: false,  // Wyłącz automatyczną synchronizację!
    // Użyj migracji zamiast synchronize
})
```

### Deployment z Docker (opcjonalnie)

```
# Przykładowy Dockerfile dla backendu
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
CMD ["node", "dist/main"]
```

---

## Autor
**Mateusz Kościński**

## Licencja
UNLICENSED - Projekt prywatny
```
