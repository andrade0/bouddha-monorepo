<p align="center">
  <img width="724" src="https://res.cloudinary.com/dhgmytqop/image/upload/v1722428555/Capture_d_e%CC%81cran_2024-07-31_a%CC%80_13.13.07_njudua.png" alt="Project Logo">
</p>

`bouddha-monorepo` is a Node.js utility for managing shared libraries across frontend and backend projects in a monorepo setup. It automates the process of copying and processing library files, ensuring that only the necessary parts are included in each type of project (frontend or backend). This monotrepo tool is designed to simplify the management of shared codebases and reduce the risk of backend-specific code leaking into frontend projects `by copying libs ( directory should be ignored and then then in the CI bouddha-monorepo should be called ) in each package of the monorepo`. `This is made for project using React, NestJs and Typeorm`.

## Features

- **Automatic Library Management**: Copies shared libraries to designated project folders based on project type.
- **Decorator and Import Cleaning**: Removes backend-specific decorators and imports from frontend projects.
- **Configuration Validation**: Ensures the configuration file is properly set up.
- **File Watching**: Optionally watches the `libs` directory for changes and automatically reprocesses projects.

## Installation

Install the module using npm:

```bash
npm install bouddha-monorepo --save-dev
```

## Configuration

Create a `.bouddha-monorepo` file in the root of your project to configure the module. This file should be a JSON file with the following structure:

```json
{
  "libsPath": "./libs",
  "packagesPath": "./apps",
  "packages": [
    {
      "name": "project-name",
      "libsPath": "src/libs",
      "type": "backend"
    }
  ],
  "libs": [
    {
      "name": "library-name",
      "type": "backend"
    }
  ]
}
```

### Configuration Details

- **`libsPath`**: The path to the shared libraries directory.
- **`packagesPath`**: The path to the directory containing the individual projects.
- **`packages`**: An array of objects, each describing a project.
  - **`name`**: The name of the project directory.
  - **`libsPath`**: The path within the project where the libraries should be copied.
  - **`type`**: The type of project (`frontend` or `backend`).
- **`libs`**: An array of objects, each describing a library.
  - **`name`**: The name of the library directory.
  - **`type`**: The type of the library (`frontend`, `backend`, or `agnostic`).

### Example Configuration

```json
{
  "libsPath": "./libs",
  "packagesPath": "./apps",
  "packages": [
    { "name": "core-service", "libsPath": "src/libs", "type": "backend" },
    { "name": "react-web-front", "libsPath": "src/app/libs", "type": "frontend" }
  ],
  "libs": [
    { "name": "api", "type": "frontend" },
    { "name": "helpers", "type": "agnostic" },
    { "name": "helpers-backend", "type": "backend" },
    { "name": "helpers-frontend", "type": "frontend" }
  ]
}
```

## Usage

After configuring the `.bouddha-monorepo` file, you can run the module using:

```bash
npx bouddha-monorepo
```

This command will read the configuration, copy the libraries, and process the files according to the project type.

### Watching for Changes


By default, the tool watches the `libs` directory for changes and reprocesses the projects automatically. To disable watching, use the `exec` argument:

```bash
npx bouddha-monorepo exec
```

### Important Considerations

- **Git Ignore Check**: The tool checks if the `libsPath` specified in each package is present in `.gitignore`. This ensures that copied files do not accidentally get committed.
- **Configuration Validation**: The tool validates the `.bouddha-monorepo` configuration file for required fields and correct structure. If any issues are found, the tool will exit with an error message.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
```

### Notes:
1. **Installation**: Instructs users on how to install the module.
2. **Configuration**: Details the configuration file structure and provides an example.
3. **Usage**: Explains how to run the module, including options for watching or running once.
4. **Considerations**: Highlights important checks like the `.gitignore` check.
5. **Contributing and License**: Standard sections for open-source projects.

Feel free to adjust any section to better fit your project's specifics or policies.
