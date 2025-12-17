-- Script per resettare le sequenze PostgreSQL
-- Esegui questo script se hai già dati nel database e le sequenze non sono sincronizzate

SELECT setval('tb_utenti_id_seq', COALESCE((SELECT MAX(id) FROM tb_utenti), 0) + 1, false);
SELECT setval('tb_clienti_id_seq', COALESCE((SELECT MAX(id) FROM tb_clienti), 0) + 1, false);
SELECT setval('tb_contratti_id_seq', COALESCE((SELECT MAX(id) FROM tb_contratti), 0) + 1, false);
SELECT setval('tb_incassi_id_seq', COALESCE((SELECT MAX(id) FROM tb_incassi), 0) + 1, false);
SELECT setval('tb_costi_studio_id_seq', COALESCE((SELECT MAX(id) FROM tb_costi_studio), 0) + 1, false);
SELECT setval('tb_costi_altri_id_seq', COALESCE((SELECT MAX(id) FROM tb_costi_altri), 0) + 1, false);
SELECT setval('tb_impostazioni_id_seq', COALESCE((SELECT MAX(id) FROM tb_impostazioni), 0) + 1, false);
SELECT setval('tb_centri_di_costo_id_seq', COALESCE((SELECT MAX(id) FROM tb_centri_di_costo), 0) + 1, false);
SELECT setval('tb_servizi_id_seq', COALESCE((SELECT MAX(id) FROM tb_servizi), 0) + 1, false);

