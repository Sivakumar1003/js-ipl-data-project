# IPL Data Processing Project (Master Branch)

This branch contains core functionality to process IPL (Indian Premier League) data using JavaScript.

## Project Structure
    ```
    ├── src 
    │ ├── data # Raw IPL data files 
    │ ├── public/output # Output folder for results 
    │ ├── server # Server logic and API handling 
    │ └── util.js # Utility functions 
    ├── index.js # Main entry point for the application 
    ├── .gitignore # Ignore unnecessary files 
    ├── package.json # Project dependencies and metadata 
    └── package-lock.json # Locked dependency versions
    ```


## How to Run

1. **Clone the repository**:
   ```bash
   git clone -b master https://github.com/Sivakumar1003/js-ipl-data-project.git
   ```
2. **Navigate to the directory**:
    ```
    cd js-ipl-data-project
    ```
3. **Install dependencies**:
    ```
    npm install
    ```
4. **Run the project**:
    ```
    node matchWonPerTeamPerYear.js
    ```
    Replace `matchWonPerTeamPerYear.js` with any other test file (`numberOfMatchPerYear`, `playerDismissedByOther`, etc.) to test the respective problem.

## Features
* Data analysis from IPL records.
* Server API for querying processed data.
* Summarized match statistics and performance insights.


## Contributing
Contributions are welcome! If you have improvements or additional exercises, please fork the repository and submit a pull request.

## 🏆 Author
Developed by [Sivakumar Nanchappan]