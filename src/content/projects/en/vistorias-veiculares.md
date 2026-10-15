---
title: Multi-tenant vehicle inspection management system
summary: Inspection platform with scheduling, a field app, checklists built from official forms, PDF reports, payments and legacy ERP integration.
order: 2
role: Lead developer
mockup: inspection
stack: [React, Node.js, SQL Server, SQLite (WAL), Playwright]
highlights:
  - Conditional checklists derived from official forms
  - Two-way sync with outbox and change tracking
  - Multiple companies on one platform, with Master, Admin and Operator levels
---

## Context

Vehicle inspection companies work with long official forms, field teams and a legacy ERP that handles billing. Much of the process was done on paper and re-typed later.

## Problem

- Forms with dozens of items that change by vehicle and inspection type.
- The ERP had no API: only a SQL Server database and an old web interface.
- Inspectors, reviewers and managers need different views, and the same person can change roles.
- Several companies operate on the same platform, each with isolated data.
- Inspections are performed in the field by engineers and inspectors, away from the office.
- Billing and integration with other systems relied on manual work.

## Solution

A multi-tenant system covering the whole inspection lifecycle:

- **Scheduling** of inspections.
- **Multiple linked companies** on one platform, with Master, Admin and Operator access levels.
- **Field app** for the responsible engineer and inspector to carry out the inspection.
- **Conditional checklist** generated from the official form and a **PDF report**.
- **Payment gateway** integrated with billing.
- **APIs** for external systems and two-way sync with the ERP.

## Technical decisions

1. **RBAC based on active assignment.** Master, Admin and Operator levels apply per linked company, and permissions come from a person's current assignment; changing role or company does not require new users.
2. **ERP integration through SQL Server.** Writes run as a sequence of stored procedures with concurrency control and a correlation table between internal and ERP IDs.
3. **Two-way synchronization.** Outbox pattern for reliable delivery and SQL Server change tracking to capture edits made in the ERP.
4. **Playwright RPA** for steps that only exist in the legacy web UI, isolated behind the same interface as the other connectors.
5. **SQLite in WAL mode** for local storage, keeping reads concurrent during sync.

## Outcome

From scheduling to payment in a single flow: the inspection is recorded once in the field app, the report is generated on the spot and everything is reflected in the ERP without re-typing — even though the legacy system offers no API.
