# frozen_string_literal: true

app_root = '/home/ruby/data/www/mblog/current'
pidfile "#{app_root}/tmp/pids/puma.pid"
state_path "#{app_root}/tmp/pids/puma.state"
bind "unix://#{app_root}/tmp/sockets/puma.sock"
activate_control_app "unix://#{app_root}/tmp/sockets/pumactl.sock"
daemonize true
workers 6
threads 5, 5
prune_bundler
stdout_redirect "#{app_root}/log/puma_access.log", "#{app_root}/log/puma_error.log", true