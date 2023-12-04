#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE [IF NOT EXISTS] analytics (
        uuid VARCHAR(36) PRIMARY KEY,
        analytics_event_type VARCHAR(100) NOT NULL,
        analytics_event_timestamp VARCHAR(100),
        analytics_data json NOT NULL
    );
EOSQL