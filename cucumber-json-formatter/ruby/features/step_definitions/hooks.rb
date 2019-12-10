Before('@before-passed') do
end

After('@after-failed') do
  raise 'Something went wrong'
end