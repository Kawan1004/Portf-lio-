---
title: B2B SaaS platform for employee engagement and HR compliance
summary: Multi-tenant platform combining gamification, privacy-first wellbeing and payroll, time-tracking and ERP integrations — web and native apps.
order: 1
role: Lead developer and product owner
mockup: engagement
stack: [React, Node.js, PostgreSQL, Capacitor, AES-256-GCM]
highlights:
  - Immutable points ledger with parametric rules
  - Connector marketplace with encrypted credentials and SSRF protection
  - Wellbeing module with k-anonymity and LGPD consent
---

## Context

Mid-sized companies needed to engage employees while complying with Brazil's updated NR-1 regulation, which now requires managing psychosocial risks. Existing tools solved only part of the problem and did not talk to the HR systems already in place.

## Problem

- Every client has its own recognition and reward rules.
- Wellbeing data is sensitive: HR needs indicators but must never identify individual answers.
- Integrating payroll, time-tracking and ERP systems from dozens of vendors without writing bespoke code for each one.
- The same product had to be sold under partner brands.

## Solution

A multi-tenant platform with web and native Android/iOS apps (Capacitor), organized into modules: gamification, wellbeing, internal job board, forecasting and an integrations marketplace. Branding, colors and features of each white-label deployment are driven by environment variables, with no code forks.

## Technical decisions

1. **Immutable points ledger.** Balances are always derived from entries; no value is ever edited. Scoring rules are parametric per tenant, giving full auditability and traceable reversals.
2. **Reusable connector architecture.** Each integration is registered declaratively (credentials, endpoints, mapping). The shared core handles encrypted credentials, destination validation against SSRF, rate limiting and retries.
3. **Privacy in the wellbeing module.** Answers encrypted with AES-256-GCM, explicit LGPD consent and aggregated reports with k-anonymity: groups that are too small are never shown.
4. **Internal jobs driven by state machines.** Each application can only move through valid states, removing inconsistencies and simplifying the audit trail.
5. **Regression-based forecasting** to anticipate engagement and risk trends, presented as decision support rather than absolute truth.

## Outcome

A single product serving direct customers and white-label partners, with new integrations added through configuration instead of custom code, and a privacy model that delivers NR-1-compliant psychosocial indicators without exposing anyone.
