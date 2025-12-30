ALTER SYSTEM SET cpu_count = 6 SCOPE=SPFILE;

ALTER SYSTEM SET sga_target = 13G SCOPE=SPFILE;
ALTER SYSTEM SET sga_max_size = 13G SCOPE=SPFILE;
ALTER SYSTEM SET pga_aggregate_target = 5G SCOPE=SPFILE;

ALTER SYSTEM SET parallel_degree_policy = AUTO SCOPE=SPFILE;
ALTER SYSTEM SET parallel_threads_per_cpu = 1 SCOPE=SPFILE;
ALTER SYSTEM SET parallel_min_servers = 6 SCOPE=SPFILE;
ALTER SYSTEM SET parallel_max_servers = 48 SCOPE=SPFILE;