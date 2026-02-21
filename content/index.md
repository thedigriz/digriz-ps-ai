---
title: Welcome
description: Notes, practical advice on information security, and links that work in full incognito—from James Bolivar Digriz.
---

# Welcome

James Bolivar Digriz here.

This is where I collect notes, practical advice on information security, and links to resources that work in full incognito mode. Nothing elaborate—just what holds up under use.

## Temporary phone numbers

[https://smstome.com/](https://smstome.com/)

Useful for one-off signups. I’ve had it work with @proton.me and Cursor without fuss. Your mileage may vary; the point is you’re not tying your real number to the account.

## Routing all Mac traffic through Tor

The aim is simple: everything from the machine goes over Tor. Below is one way to do it with Docker and the system proxy.

**1. Run Tor in Docker**

```yml
# docker-compose.yml
version: "3.8"

services:
  tor:
    image: alpine:latest
    container_name: tor-proxy
    restart: unless-stopped
    ports:
      - "9050:9050"   # SOCKS5
      - "9051:9051"   # control port
    command: >
      sh -c "
      apk add --no-cache tor &&
      echo 'SOCKSPort 0.0.0.0:9050' > /etc/tor/torrc &&
      echo 'Log notice stdout' >> /etc/tor/torrc &&
      tor"
    network_mode: bridge
```

**2. Point macOS at the proxy**

System Settings → Network → select your network (e.g. Wi‑Fi) at the top → Details … → configure the proxy: enable SOCKS5, host `localhost`, port `9050`.

Once that’s set, traffic from the system goes through the Tor container. Not ideal for every workflow, but for the right use case it’s straightforward.
