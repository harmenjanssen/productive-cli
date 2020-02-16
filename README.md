# Productive CLI

Commandline interface for [https://productive.io](https://productive.io).

## Installation

Install globally using yarn or npm:

```bash
$ npm install -g
```

```bash
$ yarn global add
```

## Usage

Set the environment variables to access the productive.io API
from user settings i.e. `https://app.productive.io/[123-org]/settings/me`

```bash
$ export PRODUCTIVE_OAUTH_TOKEN=...
$ export PRODUCTIVE_ORGANIZATION_ID=123
$ export PRODUCTIVE_PERSON_ID=42
```

Run the CLI:

```bash
$ productive
```

Or install and run the CLI locally:

```bash
$ npm install
$ ./index.js
```

### Time

This is currently the only aspect of Productive that's hashed out in this CLI tool.

#### Start a new timer

```bash
$ productive time start
```



Options:

- `-p` Projectname
- `-s` Servicename, defaults to last used service for this project.  

#### See time entries for today

```bash
$ productive time list
```

Options:

- `-d` View another day.
- `-v` View verbose output.


#### See single time entry

```bash
$ productive time view -i 12345
```

Options:

- `-i` Id of the time entry


#### Resume your last running timer

```bash
$ productive time resume
```

Options:

- `-i` Id of the time entry to resume (Defaults to last running timer)


#### Stop a running timer

```bash
$ productive time stop
```


