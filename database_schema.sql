-- AquaAI Intelligent Water Management System
-- Database Schema Version: 1.0.0
-- Target Engine: PostgreSQL

-- 1. USER PROFILES & PREFERENCES
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    portal_type VARCHAR(20) CHECK (portal_type IN ('resident', 'society_admin', 'commercial_admin', 'municipal')),
    
    -- User Preferences
    alert_threshold_daily INTEGER DEFAULT 1000, -- in Liters
    auto_shutoff_enabled BOOLEAN DEFAULT TRUE,
    dark_mode_enabled BOOLEAN DEFAULT TRUE,
    
    -- Economic State
    aqua_credits DECIMAL(10, 2) DEFAULT 0.00,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. IOT DEVICE REGISTRY
CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id),
    device_type VARCHAR(30) CHECK (device_type IN ('flow_meter', 'pressure_sensor', 'ultrasonic_level', 'smart_valve')),
    location_tag VARCHAR(50), -- e.g., 'Main Inlet', 'Block A Tank', 'Flat 402'
    mac_address VARCHAR(17) UNIQUE NOT NULL,
    firmware_version VARCHAR(20),
    status VARCHAR(20) DEFAULT 'online',
    last_ping TIMESTAMP WITH TIME ZONE
);

-- 3. RAW SENSOR READINGS (Telemetery - High Volume)
-- Optimized with Indexing on device_id and timestamp
CREATE TABLE IF NOT EXISTS sensor_telemetry (
    id BIGSERIAL PRIMARY KEY,
    device_id UUID REFERENCES devices(id),
    reading_type VARCHAR(20), -- 'flow_rate', 'pressure', 'level'
    value DECIMAL(12, 4) NOT NULL,
    unit VARCHAR(10), -- 'L/m', 'bar', '%'
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_telemetry_device_time ON sensor_telemetry (device_id, recorded_at DESC);

-- 4. HISTORICAL USAGE SUMMARIES (Aggregated)
-- For efficient graphing over weeks/months
CREATE TABLE IF NOT EXISTS usage_history (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    usage_date DATE NOT NULL,
    total_liters DECIMAL(12, 2) NOT NULL,
    peak_flow_rate DECIMAL(10, 2),
    leak_events_count INTEGER DEFAULT 0,
    UNIQUE(user_id, usage_date)
);

CREATE INDEX idx_usage_user_date ON usage_history (user_id, usage_date);

-- 5. INCIDENT & ALERT LOGS
CREATE TABLE IF NOT EXISTS system_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID REFERENCES devices(id),
    severity VARCHAR(10) CHECK (severity IN ('info', 'warning', 'critical')),
    alert_message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolution_notes TEXT,
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 6. AQUACREDIT TRANSACTION LEDGER (Blockchain Simulation)
CREATE TABLE IF NOT EXISTS credit_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES users(id),
    receiver_id UUID REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type VARCHAR(20) CHECK (transaction_type IN ('purchase', 'sale', 'reward', 'redemption')),
    blockchain_tx_hash VARCHAR(66), -- Placeholder for Web3 integration
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
