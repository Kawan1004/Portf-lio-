---
title: Job platform with candidate–recruiter chat
summary: Job posting and search, applications, hiring-process tracking and direct conversation between candidates and recruiters.
order: 4
draft: true # [PREENCHER] stack and differentiators before publishing
role: '[PREENCHER]'
mockup: jobs
stack: ['[PREENCHER]']
highlights:
  - State machines for jobs and applications
  - Real-time messaging between candidates and recruiters
  - Candidate personal data protected under LGPD
---

## Context

Companies wanted their own channel to post jobs and talk to candidates, in the style of a professional network but focused exclusively on hiring.

## Problem

- Candidates did not know which stage of the process they were in.
- Conversations with recruiters happened outside the platform, with no history.
- Résumés and personal data circulated without access control.

## Solution

A platform for posting and searching jobs, applying, tracking the hiring-process status and chatting between candidate and recruiter.

## Technical decisions

1. **State machines for jobs and applications.** A job can only move through valid states (draft, published, closed) and each application follows the process stages, always with history.
2. **Real-time messaging** between candidate and recruiter, with history tied to the application.
3. **Role-based access control.** Candidates and companies have distinct permissions; a company only sees candidates for its own jobs.
4. **Personal data protection (LGPD).** Minimal exposure of candidate data, logged access and a defined purpose for each piece of information.

## Outcome

[PREENCHER: outcome and platform usage]
