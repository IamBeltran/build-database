## DEFAULT TASKS

- **TASK: default**
```bash
gulp default
```

## ESLINT TASKS

- **TASK: eslint:src**
```bash
gulp eslint:src
```

- **TASK: quick:eslint**
```bash
gulp quick:eslint
```

- **TASK: eslint:fix**
```bash
gulp eslint:fix
```

- **TASK: eslint:fail**
```bash
gulp eslint:fail
```

- **TASK: eslint:file**
```bash
gulp eslint:file                                      // lint default target(s)
gulp eslint:file --fix                                // lint + fix all default target(s)
gulp eslint:file --file ./src/index.js --fix          // lint supplied file
gulp eslint:file --file ./src/index.js --fix --fix    // lint + fix supplied file
```

- **TASK: watch**
```bash
gulp watch
```

- **TASK: eslint:watch**
```bash
gulp eslint:watch
```

- **TASK: eslint:report**
```bash
gulp eslint:report
```

## UNIT-TEST TASKS


- **TASK: test:simple**
```bash
gulp test:simple
```

- **TASK: test:report**
```bash
gulp test:report
```
