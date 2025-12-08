=================Filter 1
DELETE FROM nama_tabel
WHERE col2 <> 'Main' OR col2 IS NULL;


=================Fitler 2
UPDATE nama_tabel
SET col5 = SUBSTRING_INDEX(col5, '*', 1)
WHERE col5 LIKE '%*%';

=================Fitler 3
UPDATE nama_tabel
SET 
    col6 = NULL,
    col7 = NULL,
    col8 = NULL;
