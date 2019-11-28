Before('@before-passed-hook') do
end

After('@after-failed-hook') do
  raise 'Something went wrong'
end