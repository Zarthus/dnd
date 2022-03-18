# dnd

A website

## Install

```bash
npm install
npm build
```

## Running

A webserver pointing to the `public/` folder should do the trick. Here is a minimalistic Caddyfile:

```text
localhost:4443 {
    root * public/
    tls internal
}
```
