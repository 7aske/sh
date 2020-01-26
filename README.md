# sh

## Description

Small web server that has only one purpose. Serving dotfiles and scripts from other repositories.

## Usage

Repositories and their respective path - url pairs are defined in `repos.yaml`.

```yaml
repos:
  - name: autosetup
    remote: https://github.com/7aske/autosetup
    files:
      - path: autoinstall.sh
        desc: installs basic cli packages and personal dotfiles
        url: /install
      - path: autoinstallcode.sh
        desc: installs programming related toolchains and editors
        url: /install-code
      - path: autoinstallgui.sh
        desc: installs i3 and other gui utilites
        url: /install-gui
      - path: autoinstallvbox.sh
        desc: installs vbox guest packages
        url: /install-vbox
```

Repositories from the file will be updated once per day and their content will be served on at specified pathnames.

Example:

`curl sh.7aske.com/bashrc` serves the content of the `.bashrc` file from `bashrc` repository.

`curl sh.7aske.com/all` serves the list of all paths/files available on the server.

## Config

Header link and first name last name combo can be changed using `NAME` and `SOCIAL` environmental variables.
