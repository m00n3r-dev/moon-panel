# Moon Panel — Project Plan

## Planning Methodology: C4 Model

Top engineers use the **C4 Model** (Context → Container → Component → Code) by Simon Brown. It's the industry standard at companies like Amazon, Netflix, and Spotify for visualizing software architecture at different zoom levels.

Why C4:
- Forces you to think about **system boundaries** first
- Scales from whiteboard doodles to deployment diagrams
- Easy to communicate with both engineers and stakeholders
- Works with Mermaid natively

---

## 1. Context Diagram (System Scope)

An **admin panel** for managing Claude AI interactions — conversations, API keys, usage stats, and user access.

```mermaid
graph TD
  User["Platform User"]
  Admin["Admin"]
  Moon["Moon Panel"]
  Claude["Claude API"]
  Email["Email Service"]

  User -->|Chats, views history| Moon
  Admin -->|Manages config, users, keys| Moon
  Moon -->|Prompts and responses| Claude
  Moon -->|Invites and alerts| Email
```

---

## 2. Container Diagram (High-Level Architecture)

```
Browser
  |
  v
nginx --- serves static React build + reverse proxy
  |
  +--> /api/* --> NestJS (REST + WebSocket BFF)
  |                 |
  |                 +--> Go Auth Service
  |                 +--> Go Config Service (nginx config gen)
  |                 +--> Go Rate Limiter
  |                 +--> Go Billing Service
  |                 |
  |                 +--> PostgreSQL + Redis
```

```mermaid
graph TD
  User["User"]
  Admin["Admin"]
  React["React + Vite SPA"]
  Nginx["nginx - Reverse Proxy + Static Files"]
  NestJS["NestJS API / BFF"]
  PG[("PostgreSQL")]
  Redis[("Redis")]
  GoAuth["Go Auth Service"]
  GoConfig["Go Config Service"]
  GoRate["Go Rate Limiter"]
  GoBilling["Go Billing Service"]
  ClaudeApi["Claude API"]
  S3[("S3 / MinIO")]

  User -->|HTTPS| React
  Admin -->|HTTPS| React
  React -->|HTTP| Nginx
  Nginx -->|/api/*| NestJS

  NestJS -->|gRPC| GoAuth
  NestJS -->|gRPC| GoConfig
  NestJS -->|gRPC| GoRate
  NestJS -->|gRPC| GoBilling

  NestJS -->|SQL| PG
  NestJS -->|TCP| Redis
  NestJS -->|HTTPS| ClaudeApi
  NestJS -->|S3 API| S3

  GoConfig -->|SIGHUP reload| Nginx
```

---

## 3. Component Diagram (BFF + Go Services)

```mermaid
graph TD
  AuthGw["NestJS Auth Guard - Validates JWT"]
  ChatGw["NestJS Chat Gateway - WebSocket + Streaming"]
  ConfigGw["NestJS Config Controller"]
  UserCtrl["NestJS User Controller - CRUD users"]

  AuthSvc["Go Auth Service - JWT, bcrypt, OAuth2"]
  ConfigSvc["Go Config Service - nginx templates, TLS"]
  RateSvc["Go Rate Limiter - sliding window"]
  BillingSvc["Go Billing Service - token counting, quotas"]

  AuthGw -->|gRPC| AuthSvc
  ChatGw -->|gRPC| RateSvc
  ChatGw -->|gRPC| BillingSvc
  ConfigGw -->|gRPC| ConfigSvc
```

---

## 4. Stack Summary

| Layer | Technology | Role |
|-------|-----------|------|
| Frontend | React + Vite | SPA UI |
| Proxy | nginx | Static files, reverse proxy, TLS termination |
| BFF | NestJS | API gateway, orchestrates Go services |
| Microservices | Go | Auth, config gen, rate limiter, billing |
| Database | PostgreSQL | Primary store |
| Cache | Redis | Sessions, rate-limit counters |
| Object Store | S3 / MinIO | Exports, logs, backups |

**Communication:** NestJS to Go services via **gRPC** (preferred) or HTTP/REST.

---

## 5. Feature Roadmap (Basic v1)

| Layer | Feature | Priority |
|-------|---------|----------|
| Auth | Email + password login | P0 |
| Auth | JWT session management | P0 |
| Chat | Send prompt to Claude | P0 |
| Chat | Stream response to UI | P0 |
| Config | Go generates nginx upstreams | P0 |
| Chat | Conversation history | P1 |
| Users | Admin CRUD for users | P1 |
| Keys | Create and revoke API keys | P1 |
| Billing | Token usage counter | P2 |
| Export | Download conversation | P2 |

Only P0 is required for v1. P1 and P2 can ship later.

---

## 6. Data Model (Core Entities)

```mermaid
erDiagram
  User ||--o{ ApiKey : has
  User ||--o{ Conversation : owns
  User ||--o{ UsageLog : generates
  Conversation ||--o{ Message : contains
  Conversation ||--o{ Export : exported_as

  User {
    uuid id PK
    string email UK
    string password_hash
    string role "admin | member"
    timestamp created_at
  }

  ApiKey {
    uuid id PK
    uuid user_id FK
    string key_hash
    string label
    timestamp expires_at
    timestamp created_at
  }

  Conversation {
    uuid id PK
    uuid user_id FK
    string title
    string model
    int token_count
    timestamp created_at
  }

  Message {
    uuid id PK
    uuid conversation_id FK
    string role "user | assistant"
    text content
    int tokens
    timestamp created_at
  }

  UsageLog {
    uuid id PK
    uuid user_id FK
    uuid conversation_id FK
    int prompt_tokens
    int completion_tokens
    timestamp created_at
  }

  Export {
    uuid id PK
    uuid conversation_id FK
    string format "json | pdf"
    string s3_key
    timestamp created_at
  }
```

---

## 7. User Flow (Login + Chat)

```mermaid
sequenceDiagram
  actor U as User
  participant W as React SPA
  participant N as nginx
  participant B as NestJS BFF
  participant A as Go Auth
  participant R as Go Rate Limit
  participant C as Cache
  participant D as DB
  participant CLAUDE as Claude API

  U->>W: Login (email + password)
  W->>N: POST /api/auth/login
  N->>B: Forward request
  B->>A: gRPC VerifyCredentials
  A->>D: Query user
  D-->>A: User row
  A->>C: Store session
  A-->>B: JWT token
  B-->>W: JWT
  W-->>U: Logged in

  U->>W: Send message
  W->>N: POST /api/chat (JWT + prompt)
  N->>B: Forward request
  B->>A: gRPC ValidateJWT
  A-->>B: User ID
  B->>R: gRPC CheckRateLimit
  R-->>B: OK
  B->>D: Create conversation (if new)
  B->>D: Store user message
  B->>CLAUDE: POST /v1/messages
  CLAUDE-->>B: Stream response
  B->>D: Store assistant message
  B->>D: Log token usage
  B-->>W: Stream response chunks
  W-->>U: Display response
```

---

## 8. Go Config Service (nginx config gen flow)

```mermaid
sequenceDiagram
  participant A as Admin
  participant B as NestJS BFF
  participant G as Go Config Service
  participant N as nginx
  participant F as Filesystem

  A->>B: Updates upstream config
  B->>G: gRPC UpdateConfig(newUpstreams)
  G->>G: Template nginx.conf
  G->>F: Write /etc/nginx/conf.d/moon.conf
  G->>N: nginx -s reload (SIGHUP)
  N-->>F: Reads new config
  N-->>G: Reload success
  G-->>B: OK
  B-->>A: Config applied
```

---

## Next Steps

1. Set up monorepo: /web (React), /bff (NestJS), /services (Go), /docs
2. Initialize React + Vite frontend
3. Scaffold NestJS BFF
4. Write Go auth microservice
5. Set up nginx with reverse proxy
6. Create PostgreSQL schema (5 tables above)
7. Implement auth flow (P0)
8. Implement chat flow + streaming (P0)
9. Write Go config service for nginx reloads (P0)
