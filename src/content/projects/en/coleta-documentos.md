---
title: Document collection via secure link
summary: An individual, secure link for each recipient to upload documents, with receipt tracking and an audit trail.
order: 5
draft: true # [PREENCHER] stack and volume/usage before publishing
role: '[PREENCHER]'
mockup: documents
stack: ['[PREENCHER]']
highlights:
  - Single-use tokens with expiration
  - Upload validation by extension, MIME type and size
  - Private storage with an audit trail
---

## Context

Requesting documents from clients by email or chat left files scattered, versions lost and no record of who sent what.

## Problem

- Personal documents travelling through uncontrolled channels.
- No reliable way to know what had already been received.
- Open uploads are a classic attack vector.

## Solution

A secure, individual link generated for each recipient to upload the requested documents, with a dashboard tracking what has been received.

## Technical decisions

1. **Single-use, expiring tokens.** Random, unguessable tokens invalidated after use or once they expire.
2. **Layered upload validation.** Extension allowlist, verification of the file's real MIME type and a size limit, all enforced server-side.
3. **Private storage.** Files kept outside any public folder, reachable only by authorized users.
4. **Access control and audit trail.** Every link generation, upload and view is logged.

## Outcome

[PREENCHER: volume and usage]
