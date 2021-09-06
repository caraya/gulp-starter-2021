@results = {}
def search_files_in_dir_for(dir, strings)
  Dir.foreach(dir) do |file|
    complete_path = File.join(dir, file)
    next if file == '.' or file == '..'
    if File.file?(complete_path)
      puts "TEST: Testing '#{complete_path}'"
      line_number = 0
      IO.foreach(complete_path) do |line|
        line_number = line_number + 1
        if strings.any? { |string| line.include?(string) }
          string = strings.detect { |string| line.include?(string) }
          source = complete_path + ":" + line_number.to_s
          @results[source] = string
        end
      end
    else
      # Search child directories
      search_files_in_dir_for(complete_path, strings)
    end
  end
end

search_files_in_dir_for(..., [..., ...])

p @results
