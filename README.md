```markdown
# 📚 Biblioteka

> **Biblioteka** to nowoczesna pełnostackowa aplikacja webowa do zarządzania biblioteką, zbudowana z wykorzystaniem Vue.js 3 i NestJS. System umożliwia katalogowanie książek, zarządzanie czytelnikami oraz śledzenie wypożyczeń.

---

## 🚀 O Projekcie

Biblioteka to skalowalna platforma zaprojektowana do cyfrowego zarządzania zasobami bibliotecznymi. Aplikacja wykorzystuje najnowszy ekosystem Vue.js (wersja 3) oraz framework NestJS z TypeORM dla bezpiecznego i wydajnego zarządzania danymi.

### ✨ Kluczowe Funkcje

- 📖 **Zarządzanie Książkami** - Dodawanie, edycja, usuwanie książek z paginacją
- 👥 **Zarządzanie Czytelnikami** - Rejestracja i administracja czytelnikami
- 📋 **System Wypożyczeń** - Śledzenie wypożyczeń i zwrotów w czasie rzeczywistym
- 🔐 **Autoryzacja JWT** - Bezpieczny system logowania z tokenami
- 🎨 **Responsywny Interfejs** - Nowoczesny design działający na wszystkich urządzeniach
- ✅ **Walidacja Danych** - Dwupoziomowa walidacja (frontend + backend)
- 🐳 **Docker Ready** - Pełna konteneryzacja z Docker Compose

---

## 🛠️ Stos Technologiczny

### 🎨 Frontend

**Główne Technologie:**

- [Vue.js 3.5](https://vuejs.org/) - Progresywny framework JavaScript
- [TypeScript 5.9](https://www.typescriptlang.org/) - Typowanie statyczne
- [Vue Router 4.6](https://router.vuejs.org/) - Oficjalny router dla Vue (SPA)
- [Axios 1.13](https://axios-http.com/) - Klient HTTP z interceptorami

**Narzędzia Deweloperskie:**

- [Vite 7](https://vitejs.dev/) - Szybki build tool nowej generacji
- [Vitest](https://vitest.dev/) - Framework do testów jednostkowych
- [Playwright](https://playwright.dev/) - Testy E2E
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) - Linting i formatowanie kodu

### ⚙️ Backend

**Główne Technologie:**

- [NestJS 11](https://nestjs.com/) - Progresywny framework Node.js
- [TypeScript 5.x](https://www.typescriptlang.org/) - Typowanie statyczne
- [TypeORM 0.3](https://typeorm.io/) - ORM z pełnym wsparciem TypeScript
- [PostgreSQL 15](https://www.postgresql.org/) - Relacyjna baza danych
- [Docker](https://www.docker.com/) - Konteneryzacja

**Autoryzacja i Bezpieczeństwo:**

- [Passport.js](http://www.passportjs.org/) - Middleware autoryzacji
- [Passport-JWT](https://github.com/mikenicholson/passport-jwt) - Strategia JWT
- [@nestjs/jwt](https://docs.nestjs.com/security/authentication) - Generowanie tokenów
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Hashowanie haseł

**Walidacja:**

- [class-validator](https://github.com/typestack/class-validator) - Walidacja dekoratorowa
- [class-transformer](https://github.com/typestack/class-transformer) - Transformacja obiektów

**Infrastruktura:**

- [Nginx](https://nginx.org/) - Reverse proxy i load balancer
- [Docker Compose](https://docs.docker.com/compose/) - Orkiestracja kontenerów

---

## 📂 Struktura Projektu

### Architektura Backend (NestJS)

```
backend/
├── src/
│   ├── main.ts                    # Punkt wejścia aplikacji
│   ├── app.module.ts              # Główny moduł
│   ├── seed.service.ts            # Seeder danych początkowych
│   ├── auth/                      # Moduł autoryzacji
│   │   ├── auth.controller.ts     # Endpointy /auth/login, /auth/register
│   │   ├── auth.service.ts        # Logika autoryzacji
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts        # Strategia walidacji JWT
│   │   └── jwt-auth.guard.ts      # Guard chroniący endpointy
│   ├── users/                     # Moduł użytkowników
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── books/                     # Moduł książek
│   │   ├── books.controller.ts    # CRUD książek z paginacją
│   │   ├── books.service.ts       # Logika biznesowa
│   │   ├── books.module.ts
│   │   └── dto/
│   │       └── create-book.dto.ts # Walidacja danych wejściowych
│   ├── readers/                   # Moduł czytelników
│   │   ├── readers.controller.ts
│   │   ├── readers.service.ts
│   │   ├── readers.module.ts
│   │   └── dto/
│   │       └── create-reader.dto.ts
│   ├── loans/                     # Moduł wypożyczeń
│   │   ├── loans.controller.ts    # Wypożyczanie i zwroty
│   │   ├── loans.service.ts
│   │   ├── loans.module.ts
│   │   └── dto/
│   │       └── create-loan.dto.ts
│   └── entities/                  # Encje TypeORM (modele bazy)
│       ├── book.entity.ts
│       ├── reader.entity.ts
│       ├── loan.entity.ts
│       └── user.entity.ts
├── test/                          # Testy E2E
├── Dockerfile
└── package.json
```

### Architektura Frontend (Vue.js)

```
frontend/
├── public/                        # Statyczne zasoby
├── src/
│   ├── main.ts                    # Punkt wejścia + konfiguracja Axios
│   ├── App.vue                    # Główny komponent z nawigacją
│   ├── authState.js               # Stan autoryzacji
│   ├── router/
│   │   └── index.ts               # Konfiguracja routingu + guards
│   ├── views/                     # Komponenty stron
│   │   ├── BooksList.vue          # Lista książek z paginacją
│   │   ├── BookForm.vue           # Formularz dodawania/edycji
│   │   ├── ReadersList.vue        # Lista czytelników
│   │   ├── ReaderForm.vue         # Formularz czytelnika
│   │   ├── LoansList.vue          # Lista wypożyczeń
│   │   └── LoginView.vue          # Panel logowania
│   └── assets/
│       └── main.css               # Style globalne
├── Dockerfile
└── package.json
```

### Infrastruktura Docker

```
Biblioteka/
├── docker-compose.yml             # Orkiestracja wszystkich serwisów
├── nginx/
│   └── default.conf               # Konfiguracja reverse proxy
├── .env                           # Zmienne środowiskowe
├── backend/
│   └── Dockerfile                 # Multi-stage build backendu
└── frontend/
    └── Dockerfile                 # Multi-stage build frontendu
```

---

## 🏗️ Architektura i Szczegóły Kodu

### Architektura Backend (NestJS + TypeORM)

#### **Wzorce Implementacji**

- **Encje (Models)**: Definicje tabel w TypeORM (`entities/*.entity.ts`)
- **Kontrolery**: Obsługa żądań HTTP i routing do serwisów
- **Serwisy**: Logika biznesowa i operacje na bazie danych
- **Guards**: Implementacja autoryzacji i ochrony endpointów
- **DTO**: Definicje struktur żądań z walidacją

#### **Kluczowe Komponenty Backend**

##### **1. System Autoryzacji**

**JWT Strategy** (`auth/jwt.strategy.ts`):

```
// Waliduje tokeny JWT i ekstraktuje dane użytkownika
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'TAJNY_KLUCZ_DEV', // W produkcji użyj process.env.JWT_SECRET
        });
    }

    // Payload z tokenu jest przekazywany do request.user
    validate(payload: JwtPayload) {
        return { userId: payload.sub, username: payload.username };
    }
}
```

**Auth Controller** (`auth/auth.controller.ts`):

```
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // POST /api/auth/login - Logowanie użytkownika
    @Post('login')
    async login(@Body() body: LoginRequest) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new UnauthorizedException('Błędne dane logowania');
        }
        return this.authService.login(user); // Zwraca { access_token: "..." }
    }

    // POST /api/auth/register - Rejestracja (tylko development)
    @Post('register')
    async register(@Body() body: RegisterRequest) {
        return this.authService.register(body.username, body.password);
    }
}
```

**Auth Service** (`auth/auth.service.ts`):

```
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    // Walidacja użytkownika przy logowaniu
    async validateUser(username: string, pass: string): Promise<AuthUser | null> {
        const user = await this.usersService.findOne(username);
        
        // Porównanie hasła z hashem w bazie (bcrypt)
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user; // Nie zwracamy hasła
            return result as AuthUser;
        }
        return null;
    }

    // Generowanie tokenu JWT
    login(user: AuthUser) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // Rejestracja z hashowaniem hasła
    async register(username: string, pass: string) {
        const hashedPassword = await bcrypt.hash(pass, 10); // 10 rund salt
        return this.usersService.create({ username, password: hashedPassword });
    }
}
```

##### **2. Moduł Książek z Paginacją**

**Books Controller** (`books/books.controller.ts`):

```
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    // GET /api/books?page=1&limit=10 - Lista z paginacją (publiczna)
    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number) {
        return this.booksService.findAll(
            page ? Number(page) : 1,
            limit ? Number(limit) : 10
        );
    }

    // GET /api/books/:id - Szczegóły książki (publiczne)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.booksService.findOne(id);
    }

    // POST /api/books - Dodanie książki (wymaga JWT)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    // PUT /api/books/:id - Edycja książki (wymaga JWT)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Book>) {
        return this.booksService.update(id, body);
    }

    // DELETE /api/books/:id - Usunięcie książki (wymaga JWT)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.remove(id);
    }
}
```

**Books Service** (`books/books.service.ts`):

```
@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private booksRepo: Repository<Book>) { }

    // Paginacja z TypeORM
    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await this.booksRepo.findAndCount({
            skip: skip,
            take: limit,
            order: { createdAt: 'DESC' }, // Najnowsze pierwsze
        });

        return {
            data: data,
            total: total,
            page: page,
            lastPage: Math.ceil(total / limit),
            limit: limit
        };
    }

    // Tworzenie z obsługą duplikatu ISBN
    async create(data: CreateBookDto) {
        const book = this.booksRepo.create(data);
        try {
            return await this.booksRepo.save(book);
        } catch (error) {
            // Kod błędu Postgresa dla naruszenia unikatowości
            if (error.code === '23505') {
                throw new ConflictException('Książka o podanym ISBN już istnieje.');
            }
            throw new InternalServerErrorException();
        }
    }
}
```

##### **3. System Walidacji (DTO)**

**Create Book DTO** (`books/dto/create-book.dto.ts`):

```
import { IsString, IsNotEmpty, IsInt, Min, IsISBN, IsOptional } from 'class-validator';

export class CreateBookDto {
    @IsString({ message: 'Tytuł musi być ciągiem znaków' })
    @IsNotEmpty({ message: 'Tytuł nie może być pusty' })
    title: string;

    @IsString({ message: 'Autor musi być ciągiem znaków' })
    @IsNotEmpty({ message: 'Autor nie może być pusty' })
    author: string;

    @IsString({ message: 'ISBN musi być ciągiem znaków' })
    @IsISBN(undefined, { message: 'Nieprawidłowy format ISBN' })
    @IsNotEmpty({ message: 'ISBN jest wymagany' })
    isbn: string;

    @IsInt({ message: 'Liczba egzemplarzy musi być liczbą całkowitą' })
    @Min(0, { message: 'Liczba egzemplarzy nie może być ujemna' })
    @IsOptional()
    availableCount?: number;
}
```

**Create Loan DTO** (`loans/dto/create-loan.dto.ts`):

```
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateLoanDto {
    @IsUUID('4', { message: 'Nieprawidłowe ID książki' })
    @IsNotEmpty()
    bookId: string;

    @IsUUID('4', { message: 'Nieprawidłowe ID czytelnika' })
    @IsNotEmpty()
    readerId: string;
}
```

**Aktywacja walidacji** (`main.ts`):

```
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.setGlobalPrefix('api'); // Wszystkie endpointy pod /api
    
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,              // Usuwa nieznane pola z body
        forbidNonWhitelisted: true,   // Rzuca błąd dla nieznanych pól
    }));
    
    app.enableCors(); // Pozwala na cross-origin requests
    
    await app.listen(3000);
}
```

---

### Architektura Frontend (Vue.js 3)

#### **Zarządzanie Stanem i Autoryzacja**

##### **1. Konfiguracja Axios z Interceptorami**

**Main Entry Point** (`main.ts`):

```
import axios from 'axios';

// Bazowy URL dla wszystkich żądań
axios.defaults.baseURL = '/api';

// Interceptor Request - automatycznie dodaje token JWT
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor Response - obsługa wygaśnięcia tokenu
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token wygasł lub jest nieprawidłowy
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
```

##### **2. Routing z Route Guards**

**Router Configuration** (`router/index.ts`):

```
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: BooksList },           // Publiczna
        { path: '/books/new', component: BookForm },   // Chroniona
        { path: '/books/:id/edit', component: BookForm },
        { path: '/readers', component: ReadersList },  // Chroniona
        { path: '/readers/new', component: ReaderForm },
        { path: '/loans', component: LoansList },      // Chroniona
        { path: '/login', component: LoginView },
    ]
});

// Navigation Guard - ochrona tras
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/']; // Strony bez autoryzacji
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    // Przekierowanie do logowania jeśli brak tokenu
    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});

export default router;
```

##### **3. Komponent Logowania**

**Login View** (`views/LoginView.vue`):

```
<template>
  <div class="login-container">
    <div class="card">
      <h2>Zaloguj się</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Login:</label>
          <input v-model="username" type="text" required />
        </div>
        <div class="form-group">
          <label>Hasło:</label>
          <input v-model="password" type="password" required />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" class="btn-primary">Zaloguj</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
    try {
        // POST /api/auth/login
        const res = await axios.post('/auth/login', {
            username: username.value,
            password: password.value
        });

        // Zapisanie tokenu JWT w localStorage
        localStorage.setItem('token', res.data.access_token);

        // Przekierowanie na stronę główną
        router.push('/');
    } catch (err) {
        error.value = "Błędny login lub hasło";
    }
};
</script>
```

##### **4. Walidacja Formularzy**

**Book Form** (`views/BookForm.vue`):

```
// Walidacja lokalna (frontend) - szybki feedback
const validateLocal = () => {
    const errs = {};
    
    if (!form.value.title.trim()) {
        errs.title = "Tytuł jest wymagany.";
    }
    
    if (!form.value.author.trim()) {
        errs.author = "Autor jest wymagany.";
    }
    
    if (!form.value.isbn.trim()) {
        errs.isbn = "ISBN jest wymagany.";
    } else {
        // Walidacja formatu ISBN (10 lub 13 cyfr)
        const isbnClean = form.value.isbn.replace(/[-\s]/g, '');
        if (!/^\d{10}(\d{3})?$/.test(isbnClean)) {
            errs.isbn = "ISBN musi zawierać 10 lub 13 cyfr.";
        }
    }

    errors.value = errs;
    return Object.keys(errs).length === 0;
};

// Obsługa błędów z backendu
const saveBook = async () => {
    if (!validateLocal()) return;

    try {
        await axios.post('/books', form.value);
        router.push('/');
    } catch (err) {
        if (err.response) {
            const { status, data } = err.response;
            
            if (status === 409) {
                // Duplikat ISBN
                serverError.value = data.message;
            } else if (status === 400 && Array.isArray(data.message)) {
                // Błędy walidacji z backendu
                serverError.value = data.message.join(' • ');
            } else if (status === 401) {
                // Token wygasł
                serverError.value = "Sesja wygasła. Zaloguj się ponownie.";
                setTimeout(() => router.push('/login'), 2000);
            }
        }
    }
};
```

---

## 📸 Zrzuty Ekranu i Użytkowanie

### 🔐 Ekran Logowania

(./Screenshots/Ekran logowania.png)

Panel logowania z:
- **Walidacją formularza** - natychmiastowe komunikaty błędów
- **Autoryzacją JWT** - bezpieczne zarządzanie sesją
- **Responsywnym designem** - działa na wszystkich urządzeniach

### 📊 Lista Książek

(./Screenshots/Lista książek.png)

Główny widok katalogu:
- **Paginacja** - wydajne ładowanie dużych zbiorów
- **Akcje CRUD** - edycja i usuwanie książek
- **Informacja o dostępności** - liczba egzemplarzy
- **Responsywna tabela** - dostosowuje się do ekranu

### ✏️ Formularz Książki

(./Screenshots/Dodaj nową książkę.png)
(./Screenshots/Edycja książki.png)

Formularz dodawania/edycji z:
- **Walidacją w czasie rzeczywistym** - błędy przy polach
- **Walidacją ISBN** - sprawdzanie formatu (10/13 cyfr)
- **Blokadą ISBN przy edycji** - zapobieganie modyfikacji klucza
- **Obsługą duplikatów** - czytelny komunikat błędu

### 👥 Lista Czytelników

(./Screenshots/Lista czytelników.png)
(./Screenshots/Dodanie czytelnika.png)

Zarządzanie czytelnikami:
- **Dane kontaktowe** - imię, nazwisko, email
- **Akcje administracyjne** - dodawanie, usuwanie
- **Walidacja email** - poprawność adresu

### 📋 System Wypożyczeń

(./Screenshots/Wypożyczenie.png)

Śledzenie wypożyczeń:
- **Status wypożyczenia** - aktywne vs zwrócone
- **Daty** - wypożyczenia i zwrotu
- **Przycisk zwrotu** - jedno kliknięcie
- **Relacje** - widoczna książka i czytelnik

---

## 🎯 Główne Funkcjonalności

### Zarządzanie Książkami

| Funkcja | Endpoint | Autoryzacja |
|---------|----------|-------------|
| Lista z paginacją | `GET /api/books?page=1&limit=10` | ❌ Publiczna |
| Szczegóły książki | `GET /api/books/:id` | ❌ Publiczna |
| Dodanie książki | `POST /api/books` | ✅ JWT |
| Edycja książki | `PUT /api/books/:id` | ✅ JWT |
| Usunięcie książki | `DELETE /api/books/:id` | ✅ JWT |

### Zarządzanie Czytelnikami

| Funkcja | Endpoint | Autoryzacja |
|---------|----------|-------------|
| Lista czytelników | `GET /api/readers` | ✅ JWT |
| Szczegóły czytelnika | `GET /api/readers/:id` | ✅ JWT |
| Dodanie czytelnika | `POST /api/readers` | ✅ JWT |
| Usunięcie czytelnika | `DELETE /api/readers/:id` | ✅ JWT |

### System Wypożyczeń

| Funkcja | Endpoint | Autoryzacja |
|---------|----------|-------------|
| Lista wypożyczeń | `GET /api/loans` | ✅ JWT |
| Wypożyczenie książki | `POST /api/loans` | ✅ JWT |
| Zwrot książki | `PATCH /api/loans/:id/return` | ✅ JWT |

### Zaawansowane Funkcje

- **Paginacja** - wydajne ładowanie dużych list książek
- **Walidacja ISBN** - format 10 lub 13 cyfr (frontend + backend)
- **Automatyczne daty** - `createdAt`, `updatedAt` w każdej encji
- **Kaskadowe usuwanie** - usunięcie książki/czytelnika usuwa powiązane wypożyczenia
- **Kontrola dostępności** - blokada wypożyczenia gdy brak egzemplarzy
- **Obsługa duplikatów** - ISBN musi być unikalny

---

## 🗄️ Schemat Bazy Danych

Aplikacja używa **PostgreSQL** jako bazy danych z **TypeORM** dla bezpiecznego dostępu.

### Diagram Bazy Danych

(./Screenshots/Schemat ERD.png)

### Encje i Relacje

#### **User** (Autoryzacja)

Przechowuje dane logowania użytkowników systemu.

```
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;                    // UUID

    @Column({ unique: true })
    username: string;              // Unikalny login

    @Column()
    password: string;              // Hash bcrypt

    @CreateDateColumn()
    createdAt: Date;               // Data rejestracji
}
```

#### **Book** (Katalog)

Reprezentuje książki w bibliotece.

```
@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;                 // Tytuł książki

    @Column()
    author: string;                // Autor

    @Column({ unique: true })
    isbn: string;                  // Unikalny ISBN

    @Column({ default: 1 })
    availableCount: number;        // Dostępne egzemplarze

    @OneToMany(() => Loan, loan => loan.book)
    loans: Loan[];                 // Relacja 1:N z wypożyczeniami

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
```

#### **Reader** (Czytelnicy)

Przechowuje dane czytelników biblioteki.

```
@Entity()
export class Reader {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;             // Imię

    @Column()
    lastName: string;              // Nazwisko

    @Column({ unique: true })
    email: string;                 // Unikalny email

    @OneToMany(() => Loan, loan => loan.reader)
    loans: Loan[];                 // Relacja 1:N z wypożyczeniami

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
```

#### **Loan** (Wypożyczenia)

Tabela łącząca - śledzi wypożyczenia książek przez czytelników.

```

@Entity()
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    borrowedAt: Date;              // Data wypożyczenia

    @Column({ type: 'timestamp', nullable: true })
    returnedAt: Date;              // Data zwrotu (null = aktywne)

    @ManyToOne(() => Book, book => book.loans, { onDelete: 'CASCADE' })
    book: Book;                    // Relacja N:1 z książką

    @ManyToOne(() => Reader, reader => reader.loans, { onDelete: 'CASCADE' })
    reader: Reader;                // Relacja N:1 z czytelnikiem

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
```

### Kluczowe Cechy Bazy

- **UUID Primary Keys** - uniwersalne identyfikatory dla systemów rozproszonych
- **Cascade Deletes** - hierarchiczne usuwanie zachowuje spójność danych
- **Unique Constraints** - ISBN i email muszą być unikalne
- **Nullable Fields** - `returnedAt` jest null dla aktywnych wypożyczeń
- **Automatyczne Timestamps** - `createdAt` i `updatedAt` zarządzane przez TypeORM

---

## 🚀 Uruchomienie

### 📋 Wymagania Systemowe

#### **Metoda Docker (Zalecana):**

- **Docker Desktop** - [Pobierz tutaj](https://www.docker.com/products/docker-desktop/)
  - Zawiera Docker Engine i Docker Compose
  - Windows: wymaga WSL2
  - macOS: 10.15 lub nowszy
- **Git** - [Pobierz tutaj](https://git-scm.com/downloads)

#### **Metoda Lokalna:**

- **Node.js 20.19.0+** lub **22.12.0+** - [Pobierz tutaj](https://nodejs.org/)
- **PostgreSQL 14+** - [Pobierz tutaj](https://www.postgresql.org/download/)
- **Git** - [Pobierz tutaj](https://git-scm.com/downloads)

---

### 🐳 Szybki Start z Docker (Zalecane)

Docker Compose uruchomi automatycznie:
- PostgreSQL (port 5432 wewnętrzny, 5435 zewnętrzny)
- NestJS Backend (port 3000)
- Vue Frontend (port 5173)
- Nginx Reverse Proxy (port 80)

**1. Sklonuj repozytorium:**

```
git clone https://github.com/koscinskimateusz/Biblioteka.git
cd Biblioteka
```

**2. Utwórz plik `.env` (WYMAGANE):**

```

# Utwórz plik .env w katalogu głównym projektu
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydatabase
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
DATABASE_NAME=mydatabase
JWT_SECRET=TAJNY_KLUCZ
```

**3. Uruchom wszystkie serwisy:**

```
docker-compose up --build
```

**4. Dostęp do aplikacji:**

- **Frontend**: http://localhost (port 80)
- **API Backend**: http://localhost/api

**5. Sprawdź status kontenerów:**

```
docker-compose ps
```

**6. Zatrzymanie:**

```
# Zatrzymaj kontenery
docker-compose down

# Zatrzymaj i usuń dane (włącznie z bazą)
docker-compose down -v
```

---

### 💻 Uruchomienie Lokalne (Bez Docker)

**1. Backend:**

```
cd backend
npm install

# Uruchom w trybie development
npm run start:dev
```

Backend dostępny na: http://localhost:3000

**2. Frontend:**

```
cd frontend
npm install

# Uruchom Vite dev server
npm run dev
```

Frontend dostępny na: http://localhost:5173

**3. Konfiguracja bazy danych:**

Utwórz bazę PostgreSQL i skonfiguruj zmienne w `backend/.env`:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=myuser
DATABASE_PASSWORD=mypassword
DATABASE_NAME=mydatabase
```

---

## 🔧 Konfiguracja

### Zmienne Środowiskowe

| Zmienna | Opis | Domyślna wartość |
|---------|------|------------------|
| `DATABASE_HOST` | Host bazy danych | `localhost` / `postgres` (Docker) |
| `DATABASE_PORT` | Port bazy danych | `5432` |
| `DATABASE_USER` | Użytkownik bazy | `myuser` |
| `DATABASE_PASSWORD` | Hasło bazy | `mypassword` |
| `DATABASE_NAME` | Nazwa bazy | `mydatabase` |
| `JWT_SECRET` | Sekret do podpisywania tokenów | `TAJNY_KLUCZ_DEV` |

### Konfiguracja Produkcyjna

```
// backend/src/app.module.ts
TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,  // ⚠️ WYŁĄCZ w produkcji!
    // Użyj migracji zamiast synchronize
})
```

### Nginx Reverse Proxy

```
# nginx/default.conf
server {
    listen 80;

    # Kierowanie do API (NestJS)
    location /api {
        proxy_pass http://backend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Kierowanie do Frontendu (Vue + Vite)
    location / {
        proxy_pass http://frontend:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

---

## 📄 Licencja

UNLICENSED - Projekt prywatny / uczelniany

---

## 👨‍💻 Autor

**Mateusz Kościński**

- GitHub: [@koscinskimateusz](https://github.com/koscinskimateusz)
```
