# Diagrams

## Use Case

```mermaid
usecaseDiagram
    actor User
    actor TelegramBot
    actor AIProvider

    User --> (Auth via Telegram)
    User --> (Create Job)
    User --> (Pay Subscription)
    TelegramBot --> (Auth via Telegram)
    TelegramBot --> (Pay Subscription)
    AIProvider --> (Process Job)
```

## Sequence

```mermaid
sequenceDiagram
    participant TG as Telegram Mini App
    participant API
    participant Queue
    participant Worker
    participant Provider
    TG->>API: initData
    API->>TG: JWT
    TG->>API: create job
    API->>Queue: enqueue
    Worker->>Provider: call generate
    Provider-->>Worker: result
    Worker-->>API: webhook
    API-->>TG: status update
```

## ER Diagram

```mermaid
erDiagram
    USER ||--o{ PROJECT : has
    USER ||--o{ SUBSCRIPTION : has
    USER ||--o{ ASSET : owns
    USER ||--o| QUOTA : has
    PROJECT ||--o{ NODE : contains
    PROJECT ||--o{ EDGE : contains
    NODE ||--o{ JOB : has
```

## Component Diagram

```mermaid
graph LR
  Web-->API
  API-->Worker
  Worker-->AIProviders
  API-->Postgres
  Worker-->Redis
  API-->Redis
  Worker-->S3
  API-->S3
  Web-->TelegramBot
  Nginx-->Web
  Nginx-->API
```

## Activity

```mermaid
flowchart TD
  A[Start] --> B[Create Job]
  B --> C[Enqueue]
  C --> D[Worker Processes]
  D --> E{Success?}
  E -- Yes --> F[Store Result]
  E -- No --> G[Error]
  F --> H[Notify Client]
  G --> H
  H --> I[End]
```
