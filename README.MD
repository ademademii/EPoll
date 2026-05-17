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