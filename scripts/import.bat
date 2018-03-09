export HEAP_SIZE=1G
neo4j-admin import --nodes:Locality=locality_xlsx.csv --database=crj.db --additional-config=./import.conf
