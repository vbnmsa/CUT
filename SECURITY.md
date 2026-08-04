# Security policy

## Reporting a vulnerability

Do not publish suspected vulnerabilities, credentials, personal data, or payment data in a public issue. Contact the repository owner privately and include only the minimum information needed to reproduce the problem safely.

## Secrets

This repository must not contain `.env` files, API keys, passwords, private keys, access tokens, production URLs containing credentials, or real personal/payment data. Use GitHub encrypted secrets for CI values and expose only explicitly public `VITE_*` values to frontend code.

If a secret is committed, removing it from the latest commit is not sufficient. Revoke or rotate it first, then clean Git history and review access logs.

## Payments and personal data

The current project is a frontend demonstration and must not collect card number/CVC or be treated as a payment processor. Real payments require a certified hosted provider and a trusted backend. Real appointment data requires server-side validation, authorization, retention rules, logging, and privacy documents.
