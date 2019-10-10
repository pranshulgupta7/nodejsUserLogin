-- mysql--
mysql -u root -p
password - 'root'

--Do following commands as root-- 
create database 'databaseName';
create user 'userName' identified by 'password';
use databaseName;
grant all privileges on databaseName to userName;
grant all privileges on databaseName.* to userName;