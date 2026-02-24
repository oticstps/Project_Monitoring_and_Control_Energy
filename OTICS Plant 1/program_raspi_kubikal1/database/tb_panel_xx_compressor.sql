CREATE TABLE tb_panel_24_compressor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    current_avg_ext FLOAT,
    frequency_ext FLOAT,
    
    -- Phase A
    apparent_power_a_ext FLOAT,
    active_power_a_ext FLOAT,
    reactive_power_a_ext FLOAT,
    power_factor_a_ext FLOAT,
    voltage_ab_ext FLOAT,
    voltage_an_ext FLOAT,
    current_a_ext FLOAT,
    
    -- Phase B
    apparent_power_b_ext FLOAT,
    active_power_b_ext FLOAT,
    reactive_power_b_ext FLOAT,
    power_factor_b_ext FLOAT,
    voltage_bc_ext FLOAT,
    voltage_bn_ext FLOAT,
    current_b_ext FLOAT,
    
    -- Phase C
    apparent_power_c_ext FLOAT,
    active_power_c_ext FLOAT,
    reactive_power_c_ext FLOAT,
    power_factor_c_ext FLOAT,
    voltage_ca_ext FLOAT,
    voltage_cn_ext FLOAT,
    current_c_ext FLOAT,
    
    -- Energy counters
    fwdVAh_ext BIGINT,
    fwdWh_ext BIGINT,
    fwdVARh_ind_ext BIGINT,
    fwdVARh_cap_ext BIGINT,
    revVAh_ext BIGINT,
    revWh_ext BIGINT,
    revVARh_ind_ext BIGINT,
    revVARh_cap_ext FLOAT,
    
    -- Demand
    present_demand_ext FLOAT,
    rising_demand_ext FLOAT,
    
    INDEX idx_recorded_at (recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE tb_panel_21_compressor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    current_avg_ext FLOAT,
    frequency_ext FLOAT,
    
    -- Phase A
    apparent_power_a_ext FLOAT,
    active_power_a_ext FLOAT,
    reactive_power_a_ext FLOAT,
    power_factor_a_ext FLOAT,
    voltage_ab_ext FLOAT,
    voltage_an_ext FLOAT,
    current_a_ext FLOAT,
    
    -- Phase B
    apparent_power_b_ext FLOAT,
    active_power_b_ext FLOAT,
    reactive_power_b_ext FLOAT,
    power_factor_b_ext FLOAT,
    voltage_bc_ext FLOAT,
    voltage_bn_ext FLOAT,
    current_b_ext FLOAT,
    
    -- Phase C
    apparent_power_c_ext FLOAT,
    active_power_c_ext FLOAT,
    reactive_power_c_ext FLOAT,
    power_factor_c_ext FLOAT,
    voltage_ca_ext FLOAT,
    voltage_cn_ext FLOAT,
    current_c_ext FLOAT,
    
    -- Energy counters
    fwdVAh_ext BIGINT,
    fwdWh_ext BIGINT,
    fwdVARh_ind_ext BIGINT,
    fwdVARh_cap_ext BIGINT,
    revVAh_ext BIGINT,
    revWh_ext BIGINT,
    revVARh_ind_ext BIGINT,
    revVARh_cap_ext FLOAT,
    
    -- Demand
    present_demand_ext FLOAT,
    rising_demand_ext FLOAT,
    
    INDEX idx_recorded_at (recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tb_panel_19_compressor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    current_avg_ext FLOAT,
    frequency_ext FLOAT,
    
    -- Phase A
    apparent_power_a_ext FLOAT,
    active_power_a_ext FLOAT,
    reactive_power_a_ext FLOAT,
    power_factor_a_ext FLOAT,
    voltage_ab_ext FLOAT,
    voltage_an_ext FLOAT,
    current_a_ext FLOAT,
    
    -- Phase B
    apparent_power_b_ext FLOAT,
    active_power_b_ext FLOAT,
    reactive_power_b_ext FLOAT,
    power_factor_b_ext FLOAT,
    voltage_bc_ext FLOAT,
    voltage_bn_ext FLOAT,
    current_b_ext FLOAT,
    
    -- Phase C
    apparent_power_c_ext FLOAT,
    active_power_c_ext FLOAT,
    reactive_power_c_ext FLOAT,
    power_factor_c_ext FLOAT,
    voltage_ca_ext FLOAT,
    voltage_cn_ext FLOAT,
    current_c_ext FLOAT,
    
    -- Energy counters
    fwdVAh_ext BIGINT,
    fwdWh_ext BIGINT,
    fwdVARh_ind_ext BIGINT,
    fwdVARh_cap_ext BIGINT,
    revVAh_ext BIGINT,
    revWh_ext BIGINT,
    revVARh_ind_ext BIGINT,
    revVARh_cap_ext FLOAT,
    
    -- Demand
    present_demand_ext FLOAT,
    rising_demand_ext FLOAT,
    
    INDEX idx_recorded_at (recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
