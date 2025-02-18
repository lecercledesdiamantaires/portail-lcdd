mysqldump -u debian-sys-maint -p portail_lcdd > /var/www/portail-lcdd/sauvegarde.sql

cd /var/www/portail-lcdd
git add sauvegarde.sql
git commit -m "Sauvegarde automatique"
git push origin main
