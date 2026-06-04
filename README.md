# task-timer

CLI-утилита для отслеживания времени, потраченного на задачи.
Написана на TypeScript и Node.js 22.

Пет-проект для изучения AI-driven методологий разработки.

---

## AI-Driven методологии разработки

### Что такое AI-Driven разработка?

AI-Driven разработка — это подход, при котором AI-агент (LLM) становится
активным участником цикла разработки, а не просто умным автодополнением.
Разработчик выступает как архитектор — формулирует намерение и контролирует результат.
AI выступает как исполнитель — реализует каждую задачу.

Ключевая проблема которую решает этот подход — **context rot** (деградация контекста):
чем длиннее диалог с AI, тем хуже результат, потому что контекстное окно модели
заполняется шумом. Все три методологии ниже решают эту проблему по-разному.

---

### GSD (Get Stuff Done)

**Суть:** Система мета-промптинга и контекстного инжиниринга для AI-агентов.
Организует работу в иерархии: Project → Milestone → Phase → Plan → Task.
Знания о проекте хранятся в файлах, а не в истории чата — так решается проблема context rot.

**Основная идея:** Спецификации — это промпты. Качество спека напрямую
определяет качество кода который сгенерирует AI.

**Плюсы:**
- Низкий порог входа, хорошо работает для соло-разработчиков
- Минимум церемоний, быстрый старт
- Используется инженерами Amazon, Google, Shopify

**Минусы:**
- Не подходит для командной работы
- Нет структурированных ролей агентов

**Когда применять:** Соло-проекты, быстрые прототипы, когда важна скорость старта.

---

### BMAD (Breakthrough Method for Agile AI-Driven Development)

**Суть:** Open-source фреймворк, который превращает AI в дисциплинированного
участника agile-процесса. Использует 21+ специализированных агентов
(PM, Architect, Developer, QA) с чёткими зонами ответственности.
Документация — единственный источник истины.

**Основная идея:** Перестань общаться с универсальным ассистентом.
Работай с Product Manager который пишет acceptance criteria,
Architect который проектирует систему, и Developer который реализует задачи.

**Четыре фазы:** Analysis → Planning → Solutioning → Implementation

**Плюсы:**
- Готов для enterprise, поддерживает аудит SOC 2 / HIPAA
- Сильное управление и трассируемость решений
- Контекст сохраняется между сессиями

**Минусы:**
- Высокий порог входа для соло-разработчика
- Избыточен для небольших проектов
- Требует изучения 21+ ролей агентов

**Когда применять:** Командные проекты, enterprise, когда важна аудируемость.

---

### spec-kit (GitHub)

**Суть:** Официальный GitHub-тулкит для Spec-Driven Development (SDD).
Ставит спецификации в центр AI-assisted разработки.
Агент-агностичный — работает с 30+ AI-агентами (Copilot, Claude, Codex).

**Основная идея:** Вместо того чтобы сразу писать код — опиши что строить,
уточни через структурированные фазы, и позволь AI реализовать.
Каждая фаза создаёт Markdown-артефакт который служит входом для следующей.

**Четыре фазы:** Spec → Plan → Tasks → Implement

**Плюсы:**
- Официальный проект GitHub — надёжный и хорошо задокументированный
- Агент-агностичный, работает с любым AI-инструментом
- Низкий порог входа, минимум настройки

**Минусы:**
- Молодой проект, активно меняется
- Требует Python/uv для CLI
- Менее подходит для крупных enterprise-процессов

**Когда применять:** Проекты любого размера, когда нужна структура без лишних накладных расходов.

---

### Сравнительная таблица

| | GSD | BMAD | spec-kit |
|---|---|---|---|
| **Автор** | Open-source сообщество | bmad-code-org | GitHub (официально) |
| **Фокус** | Context engineering | Agile + multi-agent | Spec-Driven Development |
| **Порог входа** | Низкий | Высокий | Низкий |
| **Для кого** | Соло-разработчики | Команды / enterprise | Любой уровень |
| **Роли агентов** | Нет | 21+ специализированных | Агент-агностик |
| **Когда применять** | Быстрые прототипы | Аудируемые процессы | Структурированная разработка |

---

### Выбранная методология: spec-kit

Этот проект следует методологии **spec-kit** по трём причинам:

1. **Надёжность** — официальный проект GitHub, без скандалов со сменой владельца
2. **Простота** — лёгкий процесс подходит для соло пет-проекта
3. **Прозрачный рабочий процесс** — этот README выступает в роли spec. Дорожная карта — это plan.
   Каждый коммит — это task. Код — это implement.

### Как применялся spec-kit

| Фаза spec-kit | В этом проекте |
|---|---|
| **Spec** | Определено: CLI-таймер с командами add / start / stop / report |
| **Plan** | Разбито на шаги: models → storage → commands → entry point |
| **Tasks** | Каждый шаг = один git-коммит с понятным сообщением |
| **Implement** | TypeScript-код написан инкрементально, протестирован вручную |

---

## Project: task-timer

A CLI tool to track time spent on tasks. Data is stored locally in `data.json`.

### Stack

- TypeScript
- Node.js 22
- No external runtime dependencies

### SOLID principles applied

**Single Responsibility (SRP)** — each class does one thing:
- `StorageService` — reads and writes JSON, nothing else
- `AddCommand` — adds a task, nothing else
- `StartCommand` — starts a timer, nothing else
- `StopCommand` — stops a timer, nothing else
- `ReportCommand` — prints a report, nothing else

**Dependency Injection** — `StorageService` is created once in `index.ts`
and injected into each command via constructor. Commands do not create
their own storage — they receive it.

### Project structure

src/  
---- commands/  
--------- AddCommand.ts  
--------- StartCommand.ts  
--------- StopCommand.ts  
--------- ReportCommand.ts  
---- models/  
--------- Task.ts  
--------- TimeEntry.ts  
---- services/  
--------- StorageService.ts  
---- index.ts

### Installation

```bash
npm install
```

### Usage

```bash
# Add a task
npx ts-node src/index.ts add "Task name"

# Start timer
npx ts-node src/index.ts start <task-id>

# Stop timer
npx ts-node src/index.ts stop <task-id>

# View report
npx ts-node src/index.ts report
```

### Example

```bash
$ npx ts-node src/index.ts add "Write documentation"
✅ Task added: "Write documentation" (id: 969883c6-...)

$ npx ts-node src/index.ts start 969883c6-...
▶️ Timer started for: "Write documentation"

$ npx ts-node src/index.ts stop 969883c6-...
⏹️ Timer stopped for: "Write documentation"

$ npx ts-node src/index.ts report
📊 Time Report

- Write documentation (969883c6-...)
  Total time: 0m 53s
```

---

## Git History

Each commit represents one step of the spec-kit workflow:

- `chore: init project with TypeScript and Node.js 22`
- `feat: add Task and TimeEntry models`
- `feat: add StorageService for JSON persistence`
- `feat: add CLI commands add, start, stop, report`
- `feat: add entry point with CLI argument parsing`
- `fix: update tsconfig for CommonJS and Node.js types`
- `docs: add README with methodology comparison`