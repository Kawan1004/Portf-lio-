---
title: Sales and commission management system
summary: Sales and commission tracking with rules frozen at the moment of sale and partial payments reconciled FIFO.
order: 7
role: Full stack developer
mockup: commissions
stack: [React, Node.js, PostgreSQL]
highlights:
  - Commission rule snapshot taken at the moment of sale
  - Partial payments reconciled FIFO
---

## Context

A sales operation calculated commissions in spreadsheets, with rules that changed over time and payments made in installments.

## Problem

- Changing a commission rule recalculated past sales, creating discrepancies.
- Partial payments made it unclear which commissions had already been settled.

## Solution

A web system in React, Node.js and PostgreSQL that records sales, calculates commissions and reconciles payments in an auditable way.

## Technical decisions

1. **Commission snapshot frozen at sale time.** Rates and rules are copied onto the sale when it happens; future changes never touch history.
2. **FIFO partial payments.** Each payment settles the oldest commissions first, tracking how much of each one has been paid.

## Outcome

Predictable, auditable commissions: a sale's value never changes after it is recorded, and any payment can be explained line by line.
