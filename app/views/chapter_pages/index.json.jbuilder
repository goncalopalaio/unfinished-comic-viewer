
json.chapter_info @chapter, :id, :prev, :next, :number
json.series @chapter.series.id
json.pages @pages do |page|
  json.url page.url
  json.number page.number
end
