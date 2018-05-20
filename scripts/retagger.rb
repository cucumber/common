require 'json'

# [x] `clone_subrepos`
# [x] create `retagger.rb > retagger.json` in each
# [x] git init new repo for each
# [x] push to these file:// with splitsh (no tags)
# run `retagger.rb < tags.json` to re-tag
# force push to existing remotes (with tags)
# 
# translate .gitrepo to just have remote
# script that can push all subrepos (reuse branches)
# set up CI to do on every push
# update dev docs

if STDIN.tty?
  tags = {}
  `git tag -n9`.split(/\n/).map do |line| 
    if line =~ /^([^\s]+)\s+(.*)/
      tags[$2] = $1
    end
  end

  puts JSON.pretty_generate(tags)
else
  stdin = STDIN.read
  puts "STDIN:#{stdin}"
  tags = JSON.parse(stdin)
  tags.each do |message, tag|
    commit = `git log --all --grep='#{message}' --pretty=format:"%H"`
    puts "git tag #{tag} #{commit}" 
    `git tag #{tag} #{commit}`
  end
end
