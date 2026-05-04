CREATE TABLE tb_pm200_bs1_shiftly (
    id INT(11) NOT NULL AUTO_INCREMENT,
    pm_type VARCHAR(50),
    line_table VARCHAR(100),
    line_name VARCHAR(100),
    shift VARCHAR(20),
    shift_date DATE,
    shift_start_datetime DATETIME,
    shift_end_datetime DATETIME,
    start_kwh DECIMAL(15,3),
    end_kwh DECIMAL(15,3),
    total_kwh DECIMAL(15,3),
    year INT(11),
    month INT(11),
    month_name VARCHAR(20),
    day INT(11),
    day_name VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_line_shiftdate_shift (line_table, shift_date, shift)
);

CREATE TABLE tb_pm200_bs2_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cc1_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cc234_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_chab_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_chcd_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_chef_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_chsaa_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_chsab_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_chsac_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_conn_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_ct_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_hla_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_ra_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_ret_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_weng_shiftly LIKE tb_pm200_bs1_shiftly;

CREATE TABLE tb_pm220_bs1_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_bs2_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cc1_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cc234_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_chab_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_chcd_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_chef_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_chsaa_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_chsab_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_chsac_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_conn_shiftly LIKE tb_pm200_bs1_shiftly;

CREATE TABLE tb_pm200_cr1_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr2_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr3_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr4_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr5_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr6_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr7_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr8_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr9_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr10_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr11_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm200_cr12_shiftly LIKE tb_pm200_bs1_shiftly;

CREATE TABLE tb_pm220_cr1_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr2_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr3_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr4_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr5_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr6_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr7_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr8_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr9_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr10_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr11_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_cr12_shiftly LIKE tb_pm200_bs1_shiftly;

CREATE TABLE tb_pm220_ct_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_hla_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_lpf3_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_ra_shiftly LIKE tb_pm200_bs1_shiftly;
CREATE TABLE tb_pm220_ret_shiftly LIKE tb_pm200_bs1_shiftly;
