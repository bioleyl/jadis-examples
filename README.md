# jadis-examples

This repository is a monorepo containing various examples that demonstrate how to use the [jadis](https://github.com/bioleyl/jadis) framework.

## Structure

Each subdirectory contains a self-contained example project. You can explore different features and use-cases of jadis by browsing these folders.

```
jadis-examples/
└── packages/
    ├── todo-list/     <-- A simple todo-list example
    └── minesweeper/   <-- The Minesweeper game
```

## Testing the examples

Each example is deployed to github pages. You can test them individually.

- [Todo-list](https://bioleyl.github.io/jadis-examples/todo-list/)
- [Minesweeper](https://bioleyl.github.io/jadis-examples/minesweeper/)

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bioleyl/jadis-examples.git
    cd jadis-examples
    ```

2. **Install dependencies:**
    Each example has its own `package.json` but you can install all dependencies with pnpm:
    ```bash
    pnpm install
    ```

3. **Move in the example you want to test**
    ```bash
    cd packages/minesweeper/
    ```

3. **Run the example:**
    ```bash
    pnpm dev
    ```

## Contributing

Feel free to open issues or submit pull requests with new examples or improvements.

## License

This repository is licensed under the MIT License.