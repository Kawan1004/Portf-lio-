---
title: Corporate calendar with WhatsApp reminders
summary: A calendar for assistants and supervisors that automatically sends appointment reminders over WhatsApp.
order: 6
draft: true # [PREENCHER] stack and differentiators before publishing
role: '[PREENCHER]'
mockup: agenda
stack: ['[PREENCHER]']
highlights:
  - Queues and scheduled sending
  - Persistent WhatsApp session with reconnection
  - Duplicate-send prevention
---

## Context

Assistants managed supervisors' calendars and reminded people of each appointment by hand, one message at a time.

## Problem

- Reminders forgotten or sent at the wrong time.
- Duplicate messages when someone resent "just in case".
- Assistants and supervisors need different permissions.

## Solution

A shared calendar where every appointment automatically schedules a WhatsApp reminder for the right time.

## Technical decisions

1. **Queues and scheduled sending.** Each reminder becomes a scheduled job, retried on failure.
2. **WhatsApp session persistence and reconnection.** The session survives server restarts and reconnects on its own, without re-pairing.
3. **Access profiles.** Assistants manage calendars; supervisors follow their own appointments.
4. **Duplicate-send prevention.** An idempotency key per appointment and time, so the same reminder is never sent twice.

## Outcome

[PREENCHER: outcome and usage]
