<h1 align="center"> MaDev </h1>
All in one tool for Web3 developers for quickly and conveniently deploying EVM compatible blockchains with some additional services like Blockscout, The Graph and more.  

---

## ⚠️ Prerequisites

Before continuing to follow this guide, please make sure you have Docker installed locally.

## How to use it

### 1. Use release

Download the binary for you machine from the [latest releases](https://github.com/madz-lab/madev/releases).

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
## Usage
### Command Line
* Deploy all services `madev deploy`
* Destroy all service `madev destroy`

### WEB GUI
To start web interface, simply run `madev serve`.    
Your default browser should automagically open the app.