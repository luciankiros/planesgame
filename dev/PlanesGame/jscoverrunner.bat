@echo off
SET project_path=%1
cd %project_path%

SET jscover=%2

SET jscover_output=%3
SET jscover_no_instrument=%4

start "" java -Dfile.encoding=UTF-8 -jar %jscover% -ws --document-root=%project_path% --report-dir=%jscover_output% --no-instrument-reg=(%jscover_no_instrument%).+\.js$

SET phantomjs=%5
SET qunit=%6
SET tests_host=%7

%phantomjs% %qunit% http://localhost:8080/%tests_host%

SET coverage_output=%3
start "" java -cp %jscover% jscover.report.Main --format=COBERTURAXML %coverage_output% %project_path%

SET jscover_stop=%8%

%phantomjs% %jscover_stop%
