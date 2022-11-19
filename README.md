<h1 align="center"> MaDev </h1>
All in one tool for Web3 developers for a quick and convenient way of deploying an EVM compatible blockchains with some additional stuff like Blockscout and The Graph for example.  

---

```md
!!! Prerequisites
Before continuing to follow the guide, please make sure you have Docker installed locally
```

## How to use it
### 1. Use release
Download binary for you machine from [latest realise](https://github.com/madz-lab/madev/releases) 

## Manual build

1. Clone the repo

    ```bash
    git clone https://github.com/madz-lab/madev.git
    ```

2. Build Frontend

    ```bash
    cd web-ui && yarn build
    ```

3. Start an app

    ```bash
    cd backend && go run main.go serve
    ```
