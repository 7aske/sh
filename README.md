# sh

## Description

Small web server that has only one purpose. Serving dotfiles and scripts from other repositories.

## Usage

Repositories and their respective path - url pairs are defined in `repos.json`.

```json

{
    "repos": [
        {
              "name": "bashrc",
              "url": "https://github.com/7aske/bashrc",
              "paths": [
                  {
                      "path": "bashrc.sh",
                      "pathname": "/"
                  },
                  {
                      "path": ".bashrc",
                      "pathname": "/bashrc"
                  }
              ]
        }
    ]
}
```

Repositories from the file will be updated once per day and their content will be served on at specified pathnames.

Example:

`curl sh.7aske.com/bashrc` serves the content of the `.bashrc` file from `bashrc` repository.

`curl sh.7aske.com/all` serves the list of all paths/files available on the server.
