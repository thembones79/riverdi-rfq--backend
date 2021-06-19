# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.0] - 2021-06-19

### 🔥 Added

- logic for creating new distributor on POST `/api/v1/distributors` route
- logic for listing all distributors on GET `/api/v1/distributors` route
- logic for updating requirement on PUT `/api/v1/requirements/:id` route
- logic for updating rfq on PUT `/api/v1/rfqs/:id` route
- logic for updating distributor on PUT `/api/v1/distributors/:id` route
- logic for deleting requirement on DELETE `/api/v1/requirements/:id` route
- logic for deleting rfq on DELETE `/api/v1/rfqs/:id` route
- logic for deleting distributor on DELETE `/api/v1/distributors/:id` route

## [0.7.0] - 2021-06-18

### 🔥 Added

- customerRepo db handler (orm style)
- distributorRepo db handler (orm style)
- logic for listing customers on GET `/api/v1/customers` route
- logic for listing distributors on GET `/api/v1/distributors` route

## [0.6.0] - 2021-06-16

### 💪 Updated

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
