# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2021-06-16

### 🔥 Added

- changed userRepo and route to return all necessary user fields, sort records by username and filter out admins

## [0.5.0] - 2021-06-15

### 🔥 Added

- logic for showing a RFQ on GET `/api/v1/rfq/:id` route
- logic for showing a RFQ's requirements on GET `/api/v1/rfq/:id/requirements` route
- tests for showing a RFQ on GET `/api/v1/rfq/:id` route
- tests for showing a RFQ's requirements on GET `/api/v1/rfq/:id/requirements` route

## [0.4.0] - 2021-06-12

### 🔥 Added

- requirementRepo db handler (orm style)
- logic for creating new requirement on POST `/api/v1/requirements` route
- tests for creating new requirement on POST `/api/v1/requirements` route

## [0.3.0] - 2021-06-11

### 🔥 Added

- logic for listing rfqs on GET `/api/v1/rfqs` route
- tests for listing rfqs on GET `/api/v1/rfqs` route

## [0.2.0] - 2021-06-10

### 🔥 Added

- db schema for the app
- schema migrations
- improved singup and login logic
- rfqRepo db handler (orm style)
- logic for creating new rfq on POST `/api/v1/rfqs` route
- tests for creating new rfq on POST `/api/v1/rfqs` route

## [0.0.1] - 2021-06-01

### 🔥 Added

- initial release
