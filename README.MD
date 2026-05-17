# ExitPoll System

A backend system built with ASP.NET Core using Clean Architecture principles for managing elections, voting, parties, polling places, projects, and results.

---

# Architecture Overview

This project follows Clean Architecture principles to ensure separation of concerns, scalability, maintainability, and testability.

The solution is divided into four main layers:

- ExitPoll.API
- ExitPoll.Application
- ExitPoll.Domain
- ExitPoll.Infrastructure

---

# Architecture Layers

## API Layer (ExitPoll.API)

The API layer is responsible for handling HTTP requests and responses.

Responsibilities:
- Controllers
- Routing
- Authentication entry points
- Request validation (basic)
- Calling Application services

Rules:
- No business logic
- No database access
- Only communicates with Application layer

---

## Application Layer (ExitPoll.Application)

This is the business logic layer of the system.

Responsibilities:
- Business use cases (services)
- DTOs (Data Transfer Objects)
- Service interfaces and implementations
- Workflow orchestration

Example responsibilities:
- Create vote
- Manage users
- Calculate election results
- Enforce business rules

This layer defines WHAT the system does.

---

## Domain Layer (ExitPoll.Domain)

This is the core of the system and contains pure business rules.

Responsibilities:
- Entities (Vote, User, Party, City, etc.)
- Repository interfaces
- Core business contracts

Rules:
- No dependency on frameworks (no EF Core, no ASP.NET)
- Must be independent of infrastructure
- Contains pure business model

This layer defines THE BUSINESS ITSELF.

---

## Infrastructure Layer (ExitPoll.Infrastructure)

This layer handles all external and technical concerns.

Responsibilities:
- Database access (EF Core)
- DbContext
- Repository implementations
- Migrations
- External integrations (if needed)

This layer defines HOW things are implemented.

---

# Request Flow

A typical request follows this flow:

Client → Controller → Service → Repository Interface → Repository Implementation → DbContext → Database

---

# Key Design Principles

- Separation of Concerns
- Dependency Inversion
- Single Responsibility Principle
- Clean separation between business and infrastructure
- High testability
- Easy maintainability

---

# Main Modules

The system includes the following modules:

- Authentication & Users
- Voting System
- Parties Management
- Polling Places
- Projects Management
- Results Calculation
- Cities Management
- States Management
- Reservation System

---

# Project Structure

## API Layer

Controllers:
- AuthController
- VotesController
- PartiesController
- CitiesController
- StatesController
- ResultsController
- PollingPlacesController
- ProjectsController

---

## Application Layer

Contains:
- DTOs
- Services
- Interfaces

DTO examples:
- VoteDto
- UserDto
- LoginDto
- CityDto
- PartyDto

Services examples:
- VoteService
- AuthService
- CityService
- PartyService

---

## Domain Layer

Contains:
- Entities
- Repository Interfaces

Entities:
- Vote
- User
- Party
- City
- State
- PollingPlace
- Project

Repositories:
- IVoteRepository
- IUserRepository
- ICityRepository
- IPartyRepository

---

## Infrastructure Layer

Contains:
- ApplicationDbContext
- Repository implementations
- EF Core configuration
- Migrations

Repositories:
- VoteRepository
- UserRepository
- CityRepository
- PartyRepository

---

# Example Feature Flow (Vote System)

1. Client sends request:
   POST /api/votes

2. Controller receives request

3. Controller calls Application service

4. Service processes business logic

5. Service calls repository interface

6. Infrastructure repository saves data using EF Core

7. Data is stored in SQL Server

---

# Dependency Rules

- API → Application
- Application → Domain
- Infrastructure → Domain
- Domain → No dependencies

---

# Technologies Used

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Dependency Injection
- Clean Architecture

---

# How to Run Project

## 1. Restore dependencies
dotnet restore

## 2. Apply migrations
dotnet ef database update --project ExitPoll.Infrastructure --startup-project ExitPoll.API

## 3. Run API
dotnet run --project ExitPoll.API

---

# Database Approach

- Code First (EF Core)
- Migrations located in Infrastructure
- DbContext: ApplicationDbContext

---

# Future Improvements

- Add CQRS pattern
- Add MediatR
- Add FluentValidation
- Improve JWT Authentication
- Add Redis caching
- Add logging (Serilog)
- Add unit tests
- Add integration tests
- Add Docker support

---

# Summary

This project is structured to be scalable, maintainable, and enterprise-ready using Clean Architecture principles.
Business logic is fully separated from infrastructure and presentation layers.


# Project Structure
ExitPoll
│   .gitattributes
│   .gitignore
│   ExitPoll.sln
│
├── .github
│   └── workflows
│
├── ExitPoll.API
│   │   appsettings.Development.json
│   │   appsettings.json
│   │   ExitPoll.API.csproj
│   │   Program.cs
│   │
│   ├── Controllers
│   │       AuthController.cs
│   │       CitiesController.cs
│   │       FushaPadelsController.cs
│   │       PartiesController.cs
│   │       PollingPlacesController.cs
│   │       ProjectsController.cs
│   │       ResultsController.cs
│   │       RezervimiFushesController.cs
│   │       StatesController.cs
│   │       VotesController.cs
│   │
│   └── Properties
│           launchSettings.json
│
├── ExitPoll.Application
│   │   ExitPoll.Application.csproj
│   │
│   ├── DTOs
│   │       CityDto.cs
│   │       CreateUserDto.cs
│   │       FushaPadelDto.cs
│   │       LoginDto.cs
│   │       PartyDto.cs
│   │       PartyVoteDto.cs
│   │       PartyVotesResultDto.cs
│   │       PollingPlaceDto.cs
│   │       ProjectDto.cs
│   │       RezervimiFushesDto.cs
│   │       StateDto.cs
│   │       UserDto.cs
│   │       VoteDto.cs
│   │
│   ├── Interfaces
│   │       IAuthService.cs
│   │       ICityService.cs
│   │       IFushaPadelService.cs
│   │       IPartyService.cs
│   │       IPollingPlaceService.cs
│   │       IProjectService.cs
│   │       IResultsService.cs
│   │       IRezervimiFushesService.cs
│   │       IStateService.cs
│   │       IVoteService.cs
│   │
│   └── Services
│           AuthService.cs
│           CityService.cs
│           FushaPadelService.cs
│           PartyService.cs
│           PollingPlaceService.cs
│           ProjectService.cs
│           ResultsService.cs
│           RezervimiFushesService.cs
│           StateService.cs
│           VoteService.cs
│
├── ExitPoll.Domain
│   │   ExitPoll.Domain.csproj
│   │
│   ├── Entities
│   │       City.cs
│   │       FushaPadel.cs
│   │       LoginModel.cs
│   │       Party.cs
│   │       PollingPlace.cs
│   │       Project.cs
│   │       RezervimiFushes.cs
│   │       State.cs
│   │       User.cs
│   │       Vote.cs
│   │
│   └── Interfaces
│           ICityRepository.cs
│           IFushaPadelRepository.cs
│           IPartyRepository.cs
│           IPartyVoteResultRepository.cs
│           IPollingPlaceRepository.cs
│           IProjectRepository.cs
│           IRezervimiFushesRepository.cs
│           IStateRepository.cs
│           IUserRepository.cs
│           IVoteRepository.cs
│
└── ExitPoll.Infrastructure
    │   ExitPoll.Infrastructure.csproj
    │
    ├── Data
    │       ApplicationDbContext.cs
    │
    ├── Migrations
    │      {Your Migrations}
    │
    └── Repositories
            CityRepository.cs
            FushaPadelRepository.cs
            PartyRepository.cs
            PartyVoteResultRepository.cs
            PollingPlaceRepository.cs
            ProjectRepository.cs
            RezervimiFushesRepository.cs
            StateRepository.cs
            UserRepository.cs
            VoteRepository.cs