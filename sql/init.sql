CREATE TABLE analytics (
    uuid VARCHAR(36) PRIMARY KEY,
    analytics_event_type VARCHAR(100) NOT NULL,
    analytics_event_timestamp VARCHAR(100),
    analytics_data json NOT NULL
);