


CREATE TABLE tb_pm200_bs1_daily (
    id INT(11) NOT NULL AUTO_INCREMENT,
    pm_type VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_table VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    shift VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    shift_date DATE DEFAULT NULL,
    shift_start_datetime DATETIME DEFAULT NULL,
    shift_end_datetime DATETIME DEFAULT NULL,
    start_kwh DECIMAL(15,3) DEFAULT NULL,
    end_kwh DECIMAL(15,3) DEFAULT NULL,
    total_kwh DECIMAL(15,3) DEFAULT NULL,
    year INT(11) DEFAULT NULL,
    month INT(11) DEFAULT NULL,
    month_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    day INT(11) DEFAULT NULL,
    day_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE tb_pm200_bs1_monthly (
    id INT(11) NOT NULL AUTO_INCREMENT,
    pm_type VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_table VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    start_kwh DECIMAL(15,3) DEFAULT NULL,
    end_kwh DECIMAL(15,3) DEFAULT NULL,
    total_kwh DECIMAL(15,3) DEFAULT NULL,
    year INT(11) DEFAULT NULL,
    month INT(11) DEFAULT NULL,
    month_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    month_start_date DATE DEFAULT NULL,
    month_end_date DATE DEFAULT NULL,
    month_start_datetime DATETIME DEFAULT NULL,
    month_end_datetime DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;







CREATE TABLE tb_pm200_bs1_shiftly (
    id INT(11) NOT NULL AUTO_INCREMENT,
    pm_type VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_table VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    shift VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    shift_date DATE DEFAULT NULL,
    shift_start_datetime DATETIME DEFAULT NULL,
    shift_end_datetime DATETIME DEFAULT NULL,
    start_kwh DECIMAL(15,3) DEFAULT NULL,
    end_kwh DECIMAL(15,3) DEFAULT NULL,
    total_kwh DECIMAL(15,3) DEFAULT NULL,
    year INT(11) DEFAULT NULL,
    month INT(11) DEFAULT NULL,
    month_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    day INT(11) DEFAULT NULL,
    day_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE tb_pm200_bs1_weekly (
    id INT(11) NOT NULL AUTO_INCREMENT,
    pm_type VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_table VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    week INT(11) DEFAULT NULL,
    week_start_date DATE DEFAULT NULL,
    week_end_date DATE DEFAULT NULL,
    week_start_datetime DATETIME DEFAULT NULL,
    week_end_datetime DATETIME DEFAULT NULL,
    start_kwh DECIMAL(15,3) DEFAULT NULL,
    end_kwh DECIMAL(15,3) DEFAULT NULL,
    total_kwh DECIMAL(15,3) DEFAULT NULL,
    year INT(11) DEFAULT NULL,
    month INT(11) DEFAULT NULL,
    month_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE tb_pm200_bs1_yearly (
    id INT(11) NOT NULL AUTO_INCREMENT,
    pm_type VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_table VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    line_name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    shift VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    shift_date DATE DEFAULT NULL,
    shift_start_datetime DATETIME DEFAULT NULL,
    shift_end_datetime DATETIME DEFAULT NULL,
    start_kwh DECIMAL(15,3) DEFAULT NULL,
    end_kwh DECIMAL(15,3) DEFAULT NULL,
    total_kwh DECIMAL(15,3) DEFAULT NULL,
    year INT(11) DEFAULT NULL,
    month INT(11) DEFAULT NULL,
    month_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    day INT(11) DEFAULT NULL,
    day_name VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;







DELIMITER $$

DROP PROCEDURE IF EXISTS create_all_pm_rekap_tables$$

CREATE PROCEDURE create_all_pm_rekap_tables()
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE n INT DEFAULT 0;
    DECLARE v_base VARCHAR(100);

    DROP TEMPORARY TABLE IF EXISTS tmp_pm_base;

    CREATE TEMPORARY TABLE tmp_pm_base (
        id INT AUTO_INCREMENT PRIMARY KEY,
        base_name VARCHAR(100) NOT NULL
    ) ENGINE=MEMORY;

    INSERT INTO tmp_pm_base (base_name) VALUES
    ('tb_pm200_bs2'),
    ('tb_pm200_cc1'),
    ('tb_pm200_cc234'),
    ('tb_pm200_chab'),
    ('tb_pm200_chcd'),
    ('tb_pm200_chef'),
    ('tb_pm200_chsaa'),
    ('tb_pm200_chsab'),
    ('tb_pm200_chsac'),
    ('tb_pm200_conn'),
    ('tb_pm200_ct'),
    ('tb_pm200_hla'),
    ('tb_pm200_ra'),
    ('tb_pm200_ret'),
    ('tb_pm200_weng'),
    ('tb_pm200_cr1'),
    ('tb_pm200_cr2'),
    ('tb_pm200_cr3'),
    ('tb_pm200_cr4'),
    ('tb_pm200_cr5'),
    ('tb_pm200_cr6'),
    ('tb_pm200_cr7'),
    ('tb_pm200_cr8'),
    ('tb_pm200_cr9'),
    ('tb_pm200_cr10'),
    ('tb_pm200_cr11'),
    ('tb_pm200_cr12'),

    ('tb_pm220_bs1'),
    ('tb_pm220_bs2'),
    ('tb_pm220_cc1'),
    ('tb_pm220_cc234'),
    ('tb_pm220_chab'),
    ('tb_pm220_chcd'),
    ('tb_pm220_chef'),
    ('tb_pm220_chsaa'),
    ('tb_pm220_chsab'),
    ('tb_pm220_chsac'),
    ('tb_pm220_conn'),
    ('tb_pm220_ct'),
    ('tb_pm220_hla'),
    ('tb_pm220_lpf3'),
    ('tb_pm220_ra'),
    ('tb_pm220_ret'),
    ('tb_pm220_cr1'),
    ('tb_pm220_cr2'),
    ('tb_pm220_cr3'),
    ('tb_pm220_cr4'),
    ('tb_pm220_cr5'),
    ('tb_pm220_cr6'),
    ('tb_pm220_cr7'),
    ('tb_pm220_cr8'),
    ('tb_pm220_cr9'),
    ('tb_pm220_cr10'),
    ('tb_pm220_cr11'),
    ('tb_pm220_cr12');

    SELECT COUNT(*) INTO n FROM tmp_pm_base;

    WHILE i < n DO
        SET i = i + 1;

        SELECT base_name INTO v_base
        FROM tmp_pm_base
        WHERE id = i;

        SET @sql = CONCAT('CREATE TABLE IF NOT EXISTS `', v_base, '_shiftly` LIKE `tb_pm200_bs1_shiftly`');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

        SET @sql = CONCAT('CREATE TABLE IF NOT EXISTS `', v_base, '_daily` LIKE `tb_pm200_bs1_daily`');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

        SET @sql = CONCAT('CREATE TABLE IF NOT EXISTS `', v_base, '_weekly` LIKE `tb_pm200_bs1_weekly`');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

        SET @sql = CONCAT('CREATE TABLE IF NOT EXISTS `', v_base, '_monthly` LIKE `tb_pm200_bs1_monthly`');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

        SET @sql = CONCAT('CREATE TABLE IF NOT EXISTS `', v_base, '_yearly` LIKE `tb_pm200_bs1_yearly`');
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

    END WHILE;

END$$

DELIMITER ;

CALL create_all_pm_rekap_tables();

DROP PROCEDURE IF EXISTS create_all_pm_rekap_tables;
