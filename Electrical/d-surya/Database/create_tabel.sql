CREATE TABLE `nama_tabel` (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,

    `recorded_at` DATETIME NOT NULL,

    `otics_power` VARCHAR(100) NULL DEFAULT NULL,
    `otics_phase_1_inv1` VARCHAR(100) NULL DEFAULT NULL,
    `otics_phase_1_inv2` VARCHAR(100) NULL DEFAULT NULL,
    `otics_pv_energy_today` VARCHAR(100) NULL DEFAULT NULL,
    `otics_pv_energy_monthly` VARCHAR(100) NULL DEFAULT NULL,
    `otics_pv_energy_total` VARCHAR(100) NULL DEFAULT NULL,
    `otics_irradiation` VARCHAR(100) NULL DEFAULT NULL,
    `otics_pr` VARCHAR(100) NULL DEFAULT NULL,
    `otics_weather_temp` VARCHAR(100) NULL DEFAULT NULL,
    `otics_weather_date` VARCHAR(150) NULL DEFAULT NULL,
    `otics_co2_reduced` VARCHAR(100) NULL DEFAULT NULL,
    `otics_status` VARCHAR(100) NULL DEFAULT NULL,
    `otics_comm_monitoring_last` VARCHAR(150) NULL DEFAULT NULL,

    `huawei_temperature` VARCHAR(100) NULL DEFAULT NULL,
    `huawei_yield_today` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_supply_from_grid_today` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_total_yield` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_inverter_rated_power` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_installed_pv_capacity` VARCHAR(100) NULL DEFAULT NULL,
    `huawei_standard_coal_saved` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_co2_avoided` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_equivalent_trees_planted` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_pv_output_kw` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_mains_power_kw` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_irradiance_wm2` DECIMAL(20,3) NULL DEFAULT NULL,
    `huawei_consumed_by_appliances_kw` DECIMAL(20,3) NULL DEFAULT NULL,

    `raw_payload_json` LONGTEXT NOT NULL,

    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    KEY `idx_recorded_at` (`recorded_at`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
