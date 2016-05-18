
json.array!(@chapters) do |chapters|
  json.extract! chapters, :id, :number
end
