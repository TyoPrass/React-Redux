# Forum Discussion — Automation Testing & CI/CD

Project ini merupakan pengembangan dari aplikasi **Forum Discussion** pada submission sebelumnya di kelas **Menjadi React Web Developer Expert** — Dicoding Indonesia.

Pada submission ini, aplikasi dikembangkan dengan menerapkan **Automation Testing**, **CI/CD**, serta salah satu **React Ecosystem** sesuai dengan kriteria yang telah ditentukan.

## Tujuan

Submission ini bertujuan untuk:

* Menerapkan **Unit Testing** pada fungsi reducer dan thunk.
* Menerapkan **Component Testing** pada React Components.
* Menerapkan **End-to-End Testing** menggunakan Cypress.
* Menerapkan **Continuous Integration** menggunakan GitHub Actions.
* Menerapkan **Continuous Deployment** menggunakan Vercel.
* Memanfaatkan salah satu React Ecosystem yang sesuai dengan ketentuan submission (**react-select**).
* Mempertahankan fungsionalitas, bugs highlighting, dan arsitektur dari submission sebelumnya.

## Automation Testing

Pengujian otomatis yang diterapkan meliputi:

* **Reducer Testing** — `src/features/auth/__tests__/authSlice.test.js` & `src/features/threads/__tests__/threadsSlice.test.js`.
* **Thunk Function Testing** — `src/features/auth/__tests__/authThunks.test.js` & `src/features/threads/__tests__/threadsThunks.test.js`.
* **React Component Testing** — `src/components/thread/__tests__/VoteButton.test.jsx` & `src/components/comment/__tests__/CommentForm.test.jsx`.
* **End-to-End Testing** — `cypress/e2e/login.cy.js` untuk alur login aplikasi.

Setiap berkas pengujian dilengkapi dengan skenario pengujian yang menjelaskan perilaku yang ingin diverifikasi.

### Menjalankan Unit, Thunk, dan Component Test

```bash
npm test
```

### Menjalankan End-to-End Test

```bash
npm run e2e
```

## CI/CD

### Continuous Integration

Continuous Integration diterapkan menggunakan **GitHub Actions** (`.github/workflows/ci.yml`) untuk menjalankan automated test setiap kali terdapat perubahan (push / pull request) pada branch `main` atau `master`.

Alur CI:

```text
Push / Pull Request
        ↓
GitHub Actions (automation-test-job)
        ↓
Install Dependencies
        ↓
Run Tests (npm test)
        ↓
PASS / FAIL
```

### Continuous Deployment

Continuous Deployment diterapkan menggunakan **Vercel**. Aplikasi akan dideploy secara otomatis setelah perubahan berhasil melalui proses merge ke branch utama.

## React Ecosystem

Project ini memanfaatkan salah satu React Ecosystem dari daftar resmi Dicoding ([awesome-react-ecosystem#react-tools](https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools)):
- **`react-select`** (tercantum pada sub-kategori *React Awesome Components*).
- **Penggunaan Nyata:** Digunakan pada komponen [CategoryFilter.jsx](file:///src/components/common/CategoryFilter.jsx) sebagai dropdown filter kategori yang searchable, responsif, dan interaktif untuk memudahkan pengguna mencari dan menyaring diskusi berdasarkan kategori secara dinamis.

## Deployment

Aplikasi telah dideploy menggunakan Vercel.

**Production URL:**

> Masukkan URL Vercel aplikasi Anda di sini (contoh: https://react-redux-forum.vercel.app)

## Repository

Source code project tersedia pada repository GitHub:
https://github.com/TyoPrass/React-Redux

## Struktur Pengujian

Secara umum, pengujian pada project ini dikelompokkan menjadi:

```text
Testing
├── Reducer
│   ├── authSlice.test.js
│   └── threadsSlice.test.js
├── Thunk
│   ├── authThunks.test.js
│   └── threadsThunks.test.js
├── React Component
│   ├── VoteButton.test.jsx
│   └── CommentForm.test.jsx
└── End-to-End
    └── cypress/e2e/login.cy.js
```

## Submission Evidence

Bukti penerapan CI/CD dan branch protection disertakan dalam folder `screenshot/`:

```text
screenshot/
├── 1_ci_check_error.png
├── 2_ci_check_pass.png
└── 3_branch_protection.png
```

---

**Submission Dicoding — Menjadi React Web Developer Expert**
