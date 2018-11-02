sharepoint-cli
==============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sharepoint-cli.svg)](https://npmjs.org/package/sharepoint-cli)
[![Downloads/week](https://img.shields.io/npm/dw/sharepoint-cli.svg)](https://npmjs.org/package/sharepoint-cli)
[![License](https://img.shields.io/npm/l/sharepoint-cli.svg)](https://github.com/KalleV/sharepoint-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sharepoint-cli
$ sharepoint-cli COMMAND
running command...
$ sharepoint-cli (-v|--version|version)
sharepoint-cli/0.0.0 darwin-x64 node-v8.11.2
$ sharepoint-cli --help [COMMAND]
USAGE
  $ sharepoint-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sharepoint-cli export`](#sharepoint-cli-export)
* [`sharepoint-cli help [COMMAND]`](#sharepoint-cli-help-command)

## `sharepoint-cli export`

Exports all items from a SharePoint list into a CSV file

```
USAGE
  $ sharepoint-cli export

OPTIONS
  -h, --help               show CLI help
  -l, --list=list          (required) SharePoint list name to export
  -o, --output=output      (required) Path to output file
  -p, --password=password  Password for the SharePoint site login.

  -t, --top=top            [default: 100] Max number of items to get from the list. It corresponds to the SharePoint
                           REST API "top" query parameter.

  -u, --username=username  Login name for the SharePoint site.

  --delimiter=tab|csv      [default: csv] The delimiter to use for the output file items.

  --format=csv|xml|json    [default: csv] Output format

  --site=site              [default: https://myrtb.nih.gov] SharePoint root site

  --subsite=subsite        [default: microarray] SharePoint subsite to access

EXAMPLES
  $ sharepoint-cli export --list 'Bio Samples' --subsite microarray --site https://myrtb.nih.gov --output list-items.csv 
  --top 200
  Outputs a CSV containing the item properties from the first 200 entries from the "Bio Samples" list
```

_See code: [src/commands/export.ts](https://github.com/KalleV/sharepoint-cli/blob/v0.0.0/src/commands/export.ts)_

## `sharepoint-cli help [COMMAND]`

display help for sharepoint-cli

```
USAGE
  $ sharepoint-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.3/src/commands/help.ts)_
<!-- commandsstop -->
