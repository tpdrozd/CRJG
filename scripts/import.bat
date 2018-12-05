export HEAP_SIZE=1G
neo4j-admin import --nodes:Locality=locality_xlsx.csv --database=crj.db --id-type=INTEGER --max-memory=1G --report-file=locality_xlsx.report
